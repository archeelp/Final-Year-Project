import tokenAbi from '../assets/contracts/MyToken.json';
import { tokenContractAddress } from "../constants";

var web3, contract, account;

export const init = async () => {
  if (typeof window.web3 !== 'undefined') {
    web3 = new window.Web3(window.web3.currentProvider);
    window.ethereum.on("accountsChanged", (new_accounts) => {
      let accounts = new_accounts;
      account = accounts[0];
    });
    contract = new web3.eth.Contract(
      tokenAbi.abi,
      tokenContractAddress
    );
    if (account == null) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length !== 0) {
        account = accounts[0];
        web3.eth.defaultAccount = account;
      }
    }
  } else {
    console.warn(
      'Please use a dapp browser like mist or MetaMask plugin for chrome'
    );
  }
}

export const getUserBalance = async (tokenID) => {
  let result = await contract.methods
    .balanceOf(account, tokenID)
    .call();
  return result;
}

export const getBalanceOf = async (tokenID, account) => {
  let result = await contract.methods
    .balanceOf(account, tokenID)
    .call();
  return result;
}

export const getUserBalances = async (tokens) => {
  let result = await contract.methods
    .balanceOfBatch(tokens.map(() => account), tokens.map(token => token.tokenIndex))
    .call();
  return result;
}

export const getAdminBalances = async (tokens) => {
  let result = await contract.methods
    .balanceOfBatch(tokens.map((token) => token.ethereumAddress), tokens.map(token => token.tokenIndex))
    .call();
  return result;
}

export const buyToken = async (tokenID, amount) => {
  let result = await contract.methods.buyToken(tokenID).send({
    from: account,
    gas: 3000000,
    gasPrice: '20000000000',
    value: amount,
  });
  return result;
}

export const vote = async (
  tokenID,
  pollID,
  option
) => {
  let result = await contract.methods
    .vote(tokenID, pollID, option)
    .send({
      from: account,
      gas: 3000000,
      gasPrice: '20000000000',
    });
  return result;
}

export const getPolls = async (tokenID) => {
  let result = await contract.methods.getPolls(tokenID).call();
  return result;
}

export const transfer = async (
  to,
  tokenID,
  amount
) => {
  let result = await contract.methods
    .safeTransferFrom(account, to, tokenID, amount, '0x00')
    .send({
      from: account,
      gas: 3000000,
      gasPrice: '20000000000',
    });
  return result;
}

export const totalSupply = async (tokenID) => {
  let result = await contract.methods.totalSupply(tokenID).call();
  return result;
}

export const createPoll = async (
  tokenID,
  question,
  options
) => {
  let result = await contract.methods
    .createPoll(tokenID, question, options)
    .send({
      from: account,
      gas: 3000000,
      gasPrice: '20000000000',
    });
  return result;
}

export const disburse = async (tokenID, amountToSend) => {
  let result = await contract.methods.disburse(tokenID).send({
    from: account,
    gas: 3000000,
    gasPrice: '20000000000',
    value: amountToSend,
  });
  return result;
}

const SC = {
  init,
  getUserBalance,
  getBalanceOf,
  getUserBalances,
  getAdminBalances,
  buyToken,
  vote,
  getPolls,
  transfer,
  totalSupply,
  createPoll,
  disburse,
};
export default SC;