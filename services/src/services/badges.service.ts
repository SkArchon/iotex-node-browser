import { HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NodeBadgeMetadata, NodeBadgeMetadataDocument, OnARollAwardDays } from "src/schemas/node-badge-metadata";
const { DateTime } = require('luxon');
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider')
import { CONTRACT_ADDRESS, IOTEX_ACCOUNT_PRIVATE_KEY, IOTEX_ADDRESS, RECAPTCHA_SECRET } from 'src/app.constants';
import * as IotexApiGatewayBadge from '../contracts/IotexApiGatewayBadge.json';
import { NodeProcessedEntryDocument } from "src/schemas/node-processed-entry.schema";

@Injectable()
export class BadgesService {

  constructor(
    @InjectModel(NodeBadgeMetadata.name) private nodeBadgeMetadata: Model<NodeBadgeMetadataDocument>,
    private httpService: HttpService,
  ) {}

  async processBadges(savedEntry: NodeProcessedEntryDocument) {
    const nodeBadgeMetadata = await this.getNodeBadgeMetadata(savedEntry.id);
    await this.processOnARollBadge(nodeBadgeMetadata, savedEntry);
    await this.processUptimeBadge(nodeBadgeMetadata, savedEntry.address);
  }

  private async processUptimeBadge(nodeBadgeMetadata: NodeBadgeMetadataDocument, urlNodeAddress: string) {
    const minRequiredDateExceeded = nodeBadgeMetadata.lastAchievedOnARollBadgeCount >= OnARollAwardDays.ThreeMonths;
    
    if (nodeBadgeMetadata.uptimeBadgeAwarded) return;
    //if (!minRequiredDateExceeded) return;
    
    await this.createBadge('Uptime99Percent', urlNodeAddress);

    console.log(nodeBadgeMetadata);
    nodeBadgeMetadata.uptimeBadgeAwarded = true;
    await nodeBadgeMetadata.save();

    console.log(`Successfully saved data for Uptime badge for ${urlNodeAddress}`);
  }

  private async processOnARollBadge(nodeBadgeMetadata: NodeBadgeMetadataDocument, savedEntry: NodeProcessedEntryDocument) {
    const days = this.getNumberOfDaysAfterPreviousPing(nodeBadgeMetadata, savedEntry)

    // In case there are 0 days or null both are falsy then
    if(days < 1) return;

    // If day is greater than one that means the service was down for more than 24 hours
    const isOnARollResetApplicable = (days >= 2);

    if(isOnARollResetApplicable) {
      console.log(`Resetting uptime badge for ${savedEntry.address}`);
      nodeBadgeMetadata.rollStartDate = Date.now();
      nodeBadgeMetadata.successfulPingDates = [Date.now()];
      return nodeBadgeMetadata.save();
    }

    nodeBadgeMetadata.successfulPingDates.push(Date.now());
    const nodeDatesPingedOnARoll = nodeBadgeMetadata.successfulPingDates.length;
    const hasPassedPreviousUnlockedOnARoll = nodeDatesPingedOnARoll > nodeBadgeMetadata.lastAchievedOnARollBadgeCount;

    // Contract Call Logic
    if(hasPassedPreviousUnlockedOnARoll) {
      const [key] = Object.entries(OnARollAwardDays).find(([_key, value]) => value == nodeDatesPingedOnARoll);
      if(key) {
        await this.createBadge(`OnARoll_${key}`, savedEntry.address);
        nodeBadgeMetadata.lastAchievedOnARollBadgeCount = nodeDatesPingedOnARoll;
      }
    }

    return nodeBadgeMetadata.save();
  }

  private getNumberOfDaysAfterPreviousPing(nodeBadgeMetadata, savedEntry: NodeProcessedEntryDocument) {
    if(savedEntry.lastPingFailed) return null;
    if(nodeBadgeMetadata.successfulPingDates.length == 0) return 1;

    const successfulPingDates = nodeBadgeMetadata.successfulPingDates;
    const lastSuccessfulPingTimestamp = successfulPingDates[successfulPingDates.length - 1];
    const lastSuccessfulPingDate = DateTime.fromSeconds(lastSuccessfulPingTimestamp);

    const currentPingDate = DateTime.fromSeconds(savedEntry.lastKnownUpTimestamp);

    const { days } = currentPingDate.diff(lastSuccessfulPingDate, ["days"]).toObject();
    return Math.trunc(days);
  }

  private async getNodeBadgeMetadata(savedEntryId: string) {
    const nodeBadgeMetadata = await this.nodeBadgeMetadata.findOne({ id: savedEntryId }).exec();
    
    const createNodeBadgeMetadata = (savedEntryId) => {
      const newMetadata = new this.nodeBadgeMetadata();
      newMetadata.id = savedEntryId;
      return newMetadata;
    };

    return (!nodeBadgeMetadata)
      ? createNodeBadgeMetadata(savedEntryId)
      : nodeBadgeMetadata
  }

  private async createBadge(badgeKey: string, serviceUrl) {
    try {
      const provider = new Provider(IOTEX_ACCOUNT_PRIVATE_KEY, IOTEX_ADDRESS); 
      const web3 = new Web3(provider);

      const account = web3.eth.accounts.privateKeyToAccount(IOTEX_ACCOUNT_PRIVATE_KEY);
      const gatewayBadgeContract = new web3.eth.Contract(IotexApiGatewayBadge.abi, CONTRACT_ADDRESS);

      console.log(`creating badge ${badgeKey} : ${account.address} : ${serviceUrl}`);
      
      await gatewayBadgeContract
        .methods
        .mintBadge(badgeKey, account.address, serviceUrl)
        .send( { from: account.address });

      console.log('successfully sent transaction');
    }
    catch(e) {
      console.log('error');
      console.error(e);
    }
  }

}