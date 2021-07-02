import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeUserAccount, NodeUserAccountDocument } from '../schemas/node-user-account.schema';
import { MongoService } from './mongo.service';
import { NodeEntry, NodeEntryDocument } from 'src/schemas/node-entry.schema';
import * as _ from 'lodash';
import { NodeProcessedEntry, NodeProcessedEntryDocument } from 'src/schemas/node-processed-entry.schema';
import { map } from 'rxjs/operators';

@Injectable()
export class NodeProcessedService {

  constructor(
    @InjectModel(NodeUserAccount.name) private nodeUserAccount: Model<NodeUserAccountDocument>,
    @InjectModel(NodeEntry.name) private nodeEntry: Model<NodeEntryDocument>,
    @InjectModel(NodeProcessedEntry.name) private nodeProcessedEntry: Model<NodeProcessedEntryDocument>,
    private readonly mongoService: MongoService,
  ) {}

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

    return filteredList.map(entry => {
      return _.omit(entry.toObject(), ['email', 'twitter', 'facebook', 'telegram'])
    });
  }

  async getPrimaryNode() {
    const nodes = await this.nodeProcessedEntry.find({ primarySource: true }).exec();
    return nodes[0];
  }

  private getQueryJson(searchCriteria) {
    const baseJson = { status: "approved", firstPingTimestamp: { $ne: null } };

    if(searchCriteria.countryCode) {
      return { ...baseJson, nodeCountry: searchCriteria.countryCode };
    }

    return baseJson;
  }
  
}
