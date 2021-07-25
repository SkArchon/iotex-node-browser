import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeUserAccount, NodeUserAccountDocument } from '../schemas/node-user-account.schema';
const Web3 = require('web3');
import * as ethUtil from 'ethereumjs-util'
import { Web3Service } from './web3.service';
const { DateTime } = require('luxon');
import { Request, Response } from 'express';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(NodeUserAccount.name) private nodeUserAccount: Model<NodeUserAccountDocument>,
    private readonly web3Service: Web3Service
  ) { }

  async create(signedData: any, response: Response) {
    const web3 = this.web3Service.getWeb3();
    const { nonce, signature } = signedData;
    const userAddress = await web3.eth.accounts.recover(nonce, signature);

    const user = await this.nodeUserAccount.findOne({ 'userAddress': userAddress }).exec();

    if (user == null) {
      const nodeUserAccount = {
        userAddress: userAddress,
        createdDate: DateTime.now().millisecond
      }

      const createNodeUserAccount = new this.nodeUserAccount(nodeUserAccount);
      await createNodeUserAccount.save();
      return { userAddress: userAddress, isAdmin: true };
    }

    response.cookie("Authorization", JSON.stringify({ signedResult: signature, signedData: nonce }), {
      // secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 4,
      //maxAge: 1440000
    });

    return { userAddress: userAddress, isAdmin: !!user.isAdmin };
  }

  async findAll(page: number, limit: number) {
    const processedPage = page - 1;
    const skipAmount = processedPage * limit;
    return await this.nodeUserAccount.find()
      .sort({ "drawNumber": -1 })
      .limit(limit)
      .skip(skipAmount)
      .exec();
  }

}
