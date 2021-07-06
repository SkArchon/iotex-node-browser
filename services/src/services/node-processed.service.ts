import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { CONTRACT_ADDRESS, IOTEX_ACCOUNT_PRIVATE_KEY, IOTEX_ADDRESS } from 'src/app.constants';
import { NODE_PROCESSED_PICK_ATTRIBUTES } from 'src/common.constants';
import { NodeEntry, NodeEntryDocument } from 'src/schemas/node-entry.schema';
import { NodeProcessedEntry, NodeProcessedEntryDocument } from 'src/schemas/node-processed-entry.schema';
import * as IotexApiGatewayBadge from '../contracts/IotexApiGatewayBadge.json';
import { NodeUserAccount, NodeUserAccountDocument } from '../schemas/node-user-account.schema';
import { MongoService } from './mongo.service';
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');

@Injectable()
export class NodeProcessedService {

  private web3 = null;
  private gatewayBadgeContract = null;

  constructor(
    @InjectModel(NodeUserAccount.name) private nodeUserAccount: Model<NodeUserAccountDocument>,
    @InjectModel(NodeEntry.name) private nodeEntry: Model<NodeEntryDocument>,
    @InjectModel(NodeProcessedEntry.name) private nodeProcessedEntry: Model<NodeProcessedEntryDocument>,
    private readonly mongoService: MongoService,
  ) {
    const provider = new Provider(IOTEX_ACCOUNT_PRIVATE_KEY, IOTEX_ADDRESS);
    this.web3 = new Web3(provider);
    this.gatewayBadgeContract = new this.web3.eth.Contract(IotexApiGatewayBadge.abi, CONTRACT_ADDRESS);
  }

  async findAll(requestBody: any) {
    const processedPage = (requestBody.page)
      ? (requestBody.page - 1)
      : 0;
    const limit = (requestBody.limit)
      ? requestBody.limit
      : 100;

    const skipAmount = processedPage * limit;

    const filteredList = await this.nodeProcessedEntry.find(
      this.getQueryJson(requestBody)
    )
      .sort({ uptimePercentage: -1, responseTime: 1 })
      .limit(limit)
      .skip(skipAmount)
      .exec();

    const nodeAddresses = filteredList.map(node => node.address);
    const account = this.web3.eth.accounts.privateKeyToAccount(IOTEX_ACCOUNT_PRIVATE_KEY);

    const nodeBadges = await this.gatewayBadgeContract
      .methods
      .getNodeBadges(nodeAddresses)
      .call({ from: account.address });


    const getBadges = (badges) => {
      return (badges?.length)
        ? badges.map(({ badgeType }) => badgeType)
        : [];
    };

    return filteredList.map((entry, index) => {
      return {
        ...(_.pick(entry.toObject(), NODE_PROCESSED_PICK_ATTRIBUTES)),
        badges: getBadges(nodeBadges[index])
      }
    });
  }

  async getPrimaryNode() {
    const nodes = await this.nodeProcessedEntry.find({ primarySource: true }).exec();
    return nodes[0];
  }

  private getQueryJson(searchCriteria) {
    const baseJson = { status: "approved", firstPingTimestamp: { $ne: null } };

    if (searchCriteria.countryCode) {
      return { ...baseJson, nodeCountry: searchCriteria.countryCode };
    }

    return baseJson;
  }


}
