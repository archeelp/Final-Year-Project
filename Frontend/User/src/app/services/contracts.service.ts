import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../assets/contracts/MyToken.json');

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private _account: string = null;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string =
    '0x399862D51D66ED10060AB486a4a0B1687f10a4c7';

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
    this._tokenContract = new this._web3.eth.Contract(
      tokenAbi.abi,
      this._tokenContractAddress
    );
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string;
      if (accounts.length != 0) {
        this._account = accounts[0];
        this._web3.eth.defaultAccount = this._account;
        console.log(this._account);
      }
    }
    return this._account;
  }

  public async getUserBalance(tokenID: number): Promise<number> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods
      .balanceOf(account, tokenID)
      .call();
    return result;
  }

  public async buyToken(tokenID: number, amount: string): Promise<any> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods
      .buyToken(tokenID)
      .send({
        from: account,
        gas: 3000000,
        gasPrice: '20000000000',
        value: amount,
      });
    return result;
  }

  public async vote(tokenID: number, pollID: string, option: string): Promise<any> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods
      .vote(tokenID, pollID, option)
      .send({
        from: account,
        gas: 3000000,
        gasPrice: '20000000000',
      });
    return result;
  }

  public async getPolls(tokenID: number): Promise<Array<any>> {
    let result = await this._tokenContract.methods.getPolls(tokenID).call();
    return result;
  }

  public async transfer(to: string, tokenID: number, amount: string): Promise<any> {
    let from = await this.getAccount();
    let result = await this._tokenContract.methods
      .safeTransferFrom(from, to, tokenID, amount, "0x00")
      .send({
        from: from,
        gas: 3000000,
        gasPrice: '20000000000',
      });
    return result;
  }

  public async totalSupply(tokenID: number): Promise<number> {
    let result = await this._tokenContract.methods.totalSupply(tokenID).call();
    return result;
  }

  public async createPoll(
    tokenID: number,
    question: string,
    options: Array<string>
  ): Promise<void> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods
      .createPoll(tokenID, question, options)
      .send({
        from: account,
        gas: 3000000,
        gasPrice: '20000000000',
      });
    return result;
  }

  public async disburse(tokenID: number, amountToSend: number): Promise<void> {
    let account = await this.getAccount();
    let result = await this._tokenContract.methods.disburse(tokenID).send({
      from: account,
      gas: 3000000,
      gasPrice: '20000000000',
      value: amountToSend,
    });
    return result;
  }
}
