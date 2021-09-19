import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeUserAccount, NodeUserAccountDocument } from '../schemas/node-user-account.schema';
const Web3 = require('web3');
import * as ethUtil from 'ethereumjs-util'
import { MongoService } from './mongo.service';
import { NodeEntry, NodeEntryDocument } from 'src/schemas/node-entry.schema';
const { DateTime } = require('luxon');
import { v4 as uuidv4 } from 'uuid';
import { SignedRequest } from 'src/models/signed-request';
import { from, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, filter, retry, retryWhen, switchMap, take, tap } from 'rxjs/operators';
import { NodeProcessedEntry, NodeProcessedEntryDocument } from 'src/schemas/node-processed-entry.schema';
import { CONTRACT_ADDRESS, IOTEX_ACCOUNT_PRIVATE_KEY, IOTEX_ADDRESS, RECAPTCHA_SECRET } from 'src/app.constants';
import * as _ from 'lodash';
import { IpLocationService } from './ip-location.service';
import { NodeRequestDetailsProcessorService } from './node-request-details-processor.service';
import { logger } from 'handlebars';
const Provider = require('@truffle/hdwallet-provider');
import * as IotexApiGatewayBadge from '../contracts/IotexApiGatewayBadge.json';
import Antenna from "iotex-antenna";

@Injectable()
export class NodeService {

  private readonly primarySourceAddress = 'https://api.iotex.one:443';

  constructor(
    @InjectModel(NodeUserAccount.name) private nodeUserAccount: Model<NodeUserAccountDocument>,
    @InjectModel(NodeEntry.name) private nodeEntry: Model<NodeEntryDocument>,
    @InjectModel(NodeProcessedEntry.name) private nodeProcessedEntry: Model<NodeProcessedEntryDocument>,
    private readonly httpService: HttpService,
    private readonly mongoService: MongoService,
    private readonly ipLocationService: IpLocationService,
    private readonly nodeRequestDetailsProcessorService: NodeRequestDetailsProcessorService
  ) {}

  private async validateRecaptcha(token: string) {
    const response = await this.httpService.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`).toPromise();

    if(!response.data?.success) {
      throw new Error("The captcha was invalid");
    }
  }

  async createOrUpdateNode(requestBody: any, authorization: string = "{}") {
    const user = await this.mongoService.validateAndGetUser(authorization);
    await this.validateRecaptcha(requestBody.token);

    const existingNode = (requestBody.id)
      ? await this.nodeEntry.findOne({ 'id': requestBody.id }).exec()
      : null;
    
    await this.createNodeInTransaction(requestBody, existingNode, user.userAddress);
  }
  
  private async createNodeInTransaction(requestBody, existingNode, userAddress) {
    const session = await this.nodeEntry.db.startSession();
    session.startTransaction();

    try {
      const nodeEntryCreated = await this.getSafeProcessedRequest(requestBody, userAddress, existingNode);
      await nodeEntryCreated.validate();
  
      // If the node exists we want to make sure to hide the public details
      // until the admins can reapprove
      if(existingNode) {
        await this.saveNewStatusOnProcessedData('pending', existingNode.id);
      }
  
      const savedResult = await nodeEntryCreated.save({ session });

      const hasIpChanged = !requestBody.id || requestBody.address != existingNode.address;
      if(!hasIpChanged) {
        await session.commitTransaction();
        return savedResult;
      }

      const currentTimestamp = (+ new Date());
      const nodeProcessedSuccessfully = await this.nodeRequestDetailsProcessorService.processNodeEntry(savedResult, currentTimestamp, true).toPromise();

      if(!nodeProcessedSuccessfully) {
        throw new Error("Unable to process the node details");
      } 

      await session.commitTransaction();
    }
    catch(e) {
      console.error(e);
      await session.abortTransaction();
    }
    finally {
      session.endSession();
    }
  }

  // Do an upsert document creation
  private async getSafeProcessedRequest(requestBody, userAddress, existingNode) {
    const document = (existingNode == null)
      ? new this.nodeEntry({})
      : existingNode;
      
    document.id = (!requestBody.id) ? uuidv4() : existingNode.id;
    document.name = requestBody.name;
    document.address = requestBody.address;
    document.email = requestBody.email;
    document.twitter = requestBody.twitter;
    document.facebook = requestBody.facebook;
    document.telegram = requestBody.telegram;
    document.createdDate = (!requestBody.id) ? (+ new Date()) : existingNode.createdDate;
    document.nodeOwnerAddress = (!requestBody.id) ? userAddress : existingNode.nodeOwnerAddress;
    document.primarySource = (requestBody.address === this.primarySourceAddress);
    document.status = (!requestBody.id && existingNode?.status === 'rejected') ? 'rejected' : 'pending'; // Any update will make this pending

    if(existingNode) {
      document.__v = requestBody.__v;
    }

    // Whenever the ip changes we attempt to repopulate geo data
    const hasIpChanged = !requestBody.id || requestBody.address != existingNode.address;
    this.updateNodeLocation(hasIpChanged, requestBody.address, document);

    return document;
  }

  private async updateNodeLocation(hasIpChanged, address, document) {
    if (hasIpChanged) {
      const result = await this.ipLocationService.getIpAddressLocationFromMultipleSources(address);
      if (result) {
        document.nodeCountry = result.countryCode;
        document.nodeCity = result.regionName;
      }
    }
  }

  async findById(nodeId: string, authorization: string = "{}") {
    const user = await this.mongoService.validateAndGetUser(authorization);
    const node = await this.nodeEntry.findOne({ 'id': nodeId }).exec();
    
    if(!user.isAdmin && node.nodeOwnerAddress !== user.userAddress) {
      throw "You cannot access a different users node specifically";
    }
    return node;
  }
  
  async findAll(requestBody: any, authorization: string = "{}") {
    const user = await this.mongoService.validateAndGetUser(authorization);

    if (!user.isAdmin) {
      throw "Normal users are not allowed to view pending requests";
    }

    const processedPage = (requestBody.page)
      ? (requestBody.page - 1) 
      : 0;
    const limit = (requestBody.limit)
      ? requestBody.limit 
      : 100;
      
    const skipAmount = processedPage * limit;
    
    return await this.getFilteredQuery(requestBody, user.userAddress)
      .sort({ "createdDate": -1 })
      .limit(limit)
      .skip(skipAmount)
      .exec();
  }

  private getFilteredQuery(requestBody, userAddress) {
    if(requestBody.userAddress) {
      return this.nodeEntry.find({ "nodeOwnerAddress": userAddress });
    }
    return (requestBody.showPendingOnly)
      ? this.nodeEntry.find({ "status": "pending" })
      : this.nodeEntry.find();
  }

  async processNodeApproval(requestBody: any, approvalStatus: "approve" | "reject", authorization: string = "{}") {
    const user = await this.mongoService.validateAndGetUser(authorization);

    if(!user.isAdmin) {
      throw "User needs to be an admin";
    }
    if(approvalStatus !== "approve" && approvalStatus !== "reject") {
      throw "Invalid approval status string";
    }

    await this.changeNodeStatus(requestBody.nodeId, approvalStatus);
  }

  private async changeNodeStatus(nodeId: string, approvalStatus: string){
    const statusChangeNode = await this.nodeEntry.findOne({ 'id': nodeId }).exec();

    if(!statusChangeNode) {
      throw "Invalid node passed";
    }

    const newStatus = (approvalStatus === "reject")
      ? "rejected"
      : "approved";


    await this.saveNewStatusOnProcessedData(newStatus, nodeId);

    statusChangeNode.status = newStatus;
    return await statusChangeNode.save();

  }

  private async saveNewStatusOnProcessedData(newStatus, nodeId) {
    const saveObs$ = of({}).pipe(
      switchMap(_ => {
        return from(this.nodeProcessedEntry.findOne({ 'id': nodeId }).exec())
      }),
      filter(result => !!result),
      switchMap(result => {
        result.status = newStatus;
        return result.save();
      }),
      tap(result => {
        console.log(result);
      }),
      retry(3)
    );
    
    return await saveObs$.toPromise();
  }

  // public async testSomething() {
  //   const provider = new Provider(IOTEX_ACCOUNT_PRIVATE_KEY, IOTEX_ADDRESS); 
  //   const web3 = new Web3(provider);

  //   const account = web3.eth.accounts.privateKeyToAccount(IOTEX_ACCOUNT_PRIVATE_KEY);
  //   const gatewayBadgeContract = new web3.eth.Contract(IotexApiGatewayBadge.abi, CONTRACT_ADDRESS);

  //   const responseUpdate = await gatewayBadgeContract
  //     .methods
  //     .mintBadge('abcde', account.address)
  //     .send( { from: account.address });

  //   console.log(responseUpdate);

  //   const response = await gatewayBadgeContract
  //     .methods
  //     .getDetails()
  //     .call({ from: account.address });

  //   console.log(response);
  //   return response;
  // }

}
