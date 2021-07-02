import { Injectable } from '@nestjs/common';
const Web3 = require('web3');

@Injectable()
export class Web3Service {

  private web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/94678990504444e9a99275e787dcddb8"));
  }

  getWeb3() {
    return this.web3;    
  }

}
