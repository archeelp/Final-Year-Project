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
  private _tokenContractAddress: string = "0x222aFBa0D2660De486f8E33CCa7beFe965649476";

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
      if(accounts.length != 0){
        this._account = accounts[0];
        this._web3.eth.defaultAccount = this._account;
        console.log(this._account);
      }
      
    }

    return this._account;
  }

  public async getUserBalance(): Promise<number> {
    let account = await this.getAccount();
    let _web3 = this._web3;
    let result = await this._tokenContract.methods.balanceOf(account, 0).call();
    console.log(result);
    return result;
    return new Promise((resolve, reject) => {
      
    }) as Promise<number>;
  }


}