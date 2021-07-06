import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeUserAccount, NodeUserAccountDocument } from '../schemas/node-user-account.schema';
const Web3 = require('web3');
import * as ethUtil from 'ethereumjs-util'
import { Web3Service } from './web3.service';
const { DateTime } = require('luxon');

@Injectable()
export class MongoService {

  constructor(
    @InjectModel(NodeUserAccount.name) private nodeUserAccount: Model<NodeUserAccountDocument>,
    private readonly web3Service: Web3Service
  ) {}

  async validateAndGetUser(authorizationString: string) {
    const { signedResult, signedData } = JSON.parse(authorizationString);
    
    if(!signedResult || !signedData) {
        throw "Invalid Params Passed";
    }

    const web3 = this.web3Service.getWeb3();
    const userAddress = await web3.eth.accounts.recover(signedData, signedResult);

    const user = await this.nodeUserAccount.findOne({ 'userAddress': userAddress }).exec();
    if(user == null) {
      throw `The user account ${userAddress} was not found`;
    }

    return user;
  }

  // async validateVerisonAndSave(model: Model<any>, saveEntry) {
  //   const result = await model.findOne({ 'id': saveEntry.id }).exec();
  //   if(result && result.version !== saveEntry.version) {
  //     throw `The version id does not match`;
  //   }
  //   if(!result && saveEntry.version && saveEntry.version > 0) {
  //     throw `Invalid version passed for new entry`;
  //   }
  //   // TODO : Mongoose has optimisticConcurrency, to enable https://mongoosejs.com/docs/guide.html#optimisticConcurrency
  //   // Update version by 1
  //   saveEntry.version = (!result)
  //     ? 0
  //     : (result.version + 1);
  //   return await saveEntry.save();
  // }

}
