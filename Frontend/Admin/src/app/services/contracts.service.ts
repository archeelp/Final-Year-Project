import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../assets/contracts/MyToken.json');

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private _account: string = null;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string = "0x02B1e199651Ff19A8c5BCE823a709D09193C104C";

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);
      console.log(this._web3.version);
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }
    this._tokenContract = new this._web3.eth.Contract(tokenAbi.abi, this._tokenContractAddress);
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      }) as string;
      if (accounts.length != 0) {
        this._account = accounts[0];
        this._web3.eth.defaultAccount = this._account;
        console.log(this._account);
      }
    }
    return this._account;
  }

  public async getUserBalance(): Promise<number> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods.balanceOf(account, 0).call();
    return result;
  }

  public async createNewToken(tokenAdmin: string, amount: string, rate: string): Promise<void> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods.addNewToken(tokenAdmin, amount, rate).send({
      from: account,
      gas: 3000000,
      gasPrice: '20000000000'
    });
    return result;
  }

}