import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeProcessedEntry, NodeProcessedEntryDocument } from 'src/schemas/node-processed-entry.schema';
import { MailService } from './mail.service';
import { BehaviorSubject, EMPTY, forkJoin, from, interval, of, throwError, timer } from 'rxjs';
import { catchError, concatMap, delay, filter, map, mergeMap, retryWhen, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { GrpcPromiseUtil } from 'src/util/grpc-promise.util';
import * as _ from 'lodash';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

@Injectable()
export class NodeRequestDetailsProcessorService {

  private readonly PROTO_DIR = __dirname + '/../grpc';
  private readonly API_PROTO_PATH = this.PROTO_DIR + '/proto/api/api.proto';
  private readonly BLOCK_OUTDATED_BUFFER = 100;
  private readonly DEFAULT_PROTO_CONFIGS = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }

  private readonly logger = new Logger(NodeRequestDetailsProcessorService.name);

  private currentBlockHeight$ = new BehaviorSubject<number>(0);

  private iotexapi;

  constructor(
    @InjectModel(NodeProcessedEntry.name) private nodeProcessedEntry: Model<NodeProcessedEntryDocument>,
    private httpService: HttpService,
    private mailService: MailService,
  ) {}

  onApplicationBootstrap() {
    this.bootstrapApplication();
    this.setBlockHeightOnLoad();
  }

  private setBlockHeightOnLoad() {
    from(this.nodeProcessedEntry.find({ primarySource: true }).exec()).pipe(
      filter(results => results.length > 0),
      map(results => results[0].blockHeight),
      take(1),
      tap(blockHeight => {
        this.currentBlockHeight$.next(Number(blockHeight));
      })
    )
    .subscribe();
  }

  private getRetryLogicWhenUnableToReachApi(address){
    let index = 1;
    return retryWhen(errors => errors.pipe(
        delay(2000), 
        tap(_ => { 
          this.logger.warn(`Retrying count ${index} calling API at ${address}`);
          index++;
        }),
        // TODO : Bug, it seems like retry is not called three times though
        take(3), 
        concatMap(errors => throwError(errors))
      )
    );
  }

  private getIsSecure(address: string) {
    const protocolIncluded = address.includes('://');
    if(!protocolIncluded) {
      const useSecure = address.includes(':443');
      return [useSecure, address];
    }
    const addressAsUrl = new URL(address);
    const useSecure = addressAsUrl.protocol == 'https:';
    const urlWithoutProtocol = address.slice((addressAsUrl.protocol + '//').length);
    return [useSecure, urlWithoutProtocol];
  }

  private createRequestToApiNode(address: string) {
    try {
      const [useSecure, useAddress] = this.getIsSecure(address);
      const client = (useSecure)
        ? new this.iotexapi.APIService(useAddress, grpc.credentials.createSsl())
        : new this.iotexapi.APIService(useAddress, grpc.credentials.createInsecure());

      const serverMeta$ = from(GrpcPromiseUtil.getServerMeta(client));
      const chainMeta$ = from(GrpcPromiseUtil.getChainMeta(client));
      return forkJoin([serverMeta$, chainMeta$]);
    }
    catch(e) {
      this.logger.error(e);
      return throwError(e);
    }
  }

  private confirmErrorByCheckingOutsideAccess(currentTimestamp, nodeAddress) {
    return catchError(_error => {
      this.logger.error(`An error occurred while pinging the api node ${nodeAddress}`, _error);
      // TODO : To find a reliable API
      return this.httpService.get("https://api.coindesk.com/v1/bpi/currentprice.json").pipe(
        map(_ => [null, null, currentTimestamp, _error, false]),
        catchError(_verifyConnectivityError => of([null, null, currentTimestamp, _error, true]))
      );
    });
  }

  private createNodeProcessedResponse(nodeEntry, saveCall) {
    return mergeMap(([serverMeta, chainMeta, currentTimestamp, error, internetAccessNotPresent]) => {
      if(internetAccessNotPresent) {
        this.logger.log("Internet access was not detected, skipping");
        return of(false);
      }
      if(error && !saveCall) {
        this.logger.log("Sending server down email to the user");
        this.mailService.sendServerDownEmail(nodeEntry.email, { address: nodeEntry.address, name: nodeEntry.name });  
      }

      const existingDocRequest = (saveCall)
        ? of(null)
        : this.nodeProcessedEntry.findOne({ 'id': nodeEntry.id }).exec();
      
      return from(existingDocRequest).pipe(
        filter((existingDoc) => !existingDoc || existingDoc.status === 'approved'),
        withLatestFrom(this.currentBlockHeight$),
        switchMap(([existingDoc, currentBlockHeight]) => {
          const saveEntry = (existingDoc)
            ? existingDoc
            : new this.nodeProcessedEntry((_.omit(nodeEntry.toJSON(), ['version', '_id', '__v'])));

          if(!error) {
            this.calculateDowntimeIfApplicable(existingDoc, saveEntry, currentTimestamp);
            this.updateOnSuccessfulPingOfApiNode(existingDoc, saveEntry, currentTimestamp, serverMeta, chainMeta, currentBlockHeight, nodeEntry.primarySource);

            // Primary source is the primary node used to compare other data against
            if(nodeEntry.primarySource) {
              this.currentBlockHeight$.next(Number(saveEntry.blockHeight));
            }
          }

          saveEntry.lastPingFailed = !!error;
          saveEntry.lastAttemptedPingTimestamp = currentTimestamp;
          
          if(saveCall && error) {
              return of(false);
          }
          return from(saveEntry.save()).pipe(map(_ => true));
        }),
      );
    });
  }

  private updateOnSuccessfulPingOfApiNode(existingDoc, saveEntry, currentTimestamp, serverMeta, chainMeta, currentBlockHeight, isPrimary) {
    saveEntry.packageVersion = serverMeta.response.serverMeta.packageVersion;
    saveEntry.packageCommitID = serverMeta.response.serverMeta.packageCommitID;
    saveEntry.blockHeight = chainMeta.response.chainMeta.height;
    saveEntry.lastKnownUpTimestamp = currentTimestamp;

    saveEntry.outdated = (!isPrimary)
      ? currentBlockHeight > (Number(saveEntry.blockHeight) + this.BLOCK_OUTDATED_BUFFER)
      : false;

    const avgResponseTime = Math.round((serverMeta.requestDuration + chainMeta.requestDuration) / 2);
    saveEntry.responseTime = avgResponseTime;

    if(!existingDoc || !saveEntry.firstPingTimestamp) {
      saveEntry.firstPingTimestamp = currentTimestamp;
    }
  }

  private calculateDowntimeIfApplicable(existingDoc, saveEntry, currentTimestamp) {
    // We make sure the last ping has failed and this is success (i.e. server came back up)
    // We make sure that there is a last known up timestamp (i.e. we calculate downtime after server has been detected up at least once)
    if(existingDoc && saveEntry.lastPingFailed && saveEntry.lastKnownUpTimestamp) {
      saveEntry.downtimeSeconds += currentTimestamp - saveEntry.lastKnownUpTimestamp;
      const totalRunningDuration = currentTimestamp - saveEntry.firstPingTimestamp;
      const downtimePercentage = (saveEntry.downtimeSeconds / totalRunningDuration) * 100;
      saveEntry.uptimePercentage = 100.0000 - parseFloat(downtimePercentage.toFixed(4));
    }
  }
  
  public processNodeEntry(nodeEntry: any, currentTimestamp: number, saveCall = false) {
    return this.createRequestToApiNode(nodeEntry.address).pipe(
      map(([serverMeta, chainMeta]) => [serverMeta, chainMeta, currentTimestamp, null, null]),
      // TODO : check errors variable in concatMap && TODO : Move into confirm error method
      this.getRetryLogicWhenUnableToReachApi(nodeEntry.address),
      this.confirmErrorByCheckingOutsideAccess(currentTimestamp, nodeEntry.address),
      this.createNodeProcessedResponse(nodeEntry, saveCall),
      catchError(error => {
        this.logger.error(error);
        return of(false);
      })
    );
  }

  private bootstrapApplication() {
    const protoConfig = {
      includeDirs: [this.PROTO_DIR, 'proto'],
      ...this.DEFAULT_PROTO_CONFIGS
    };
    const packageResult = protoLoader.loadSync(this.API_PROTO_PATH, protoConfig);
    this.iotexapi = grpc.loadPackageDefinition(packageResult).iotexapi;
  }
}
