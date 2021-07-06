import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, interval, of, throwError, timer } from 'rxjs';
import { catchError, concatMap, delay, filter, map, mergeMap, retryWhen, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { NodeEntry, NodeEntryDocument } from 'src/schemas/node-entry.schema';
import { NodeProcessedEntry } from 'src/schemas/node-processed-entry.schema';

import * as _ from 'lodash';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { MailService } from './mail.service';
import { NodeRequestDetailsProcessorService } from './node-request-details-processor.service';
import { BadgesService } from './badges.service';

@Injectable()
export class SchedulerService {

  private readonly logger = new Logger(SchedulerService.name);


  constructor(
    private nodeRequestDetailsProcessorService: NodeRequestDetailsProcessorService,
    private mailService: MailService,
    @InjectModel(NodeEntry.name) private nodeEntry: Model<NodeEntryDocument>,
    @InjectModel(NodeProcessedEntry.name) private nodeProcessedEntry: Model<NodeProcessedEntry>,
  ) {}

  onApplicationBootstrap() {
    this.setupScheduler();
  }

  private setupScheduler() {
    this.logger.log("Starting pinging scheduler");
    // Every N seconds get all approved nodes
    timer(0, 20000).pipe(
      switchMap(_ => 
        from(this.nodeEntry.find({ "status": "approved" }).exec()).pipe(mergeMap(result => from(result)))
      ),
      mergeMap(nodeEntry => {
        const currentTimestamp = (+ new Date());
        this.logger.log(`Pinging ${nodeEntry.address} at ${currentTimestamp}`);

        return this.nodeRequestDetailsProcessorService.processNodeEntry(nodeEntry, currentTimestamp).pipe(
          tap(_ => {
            this.logger.log(`Node pinging process completed for ${nodeEntry.address}`);
          })
        );
      }),
    ).subscribe();
  }

  



}