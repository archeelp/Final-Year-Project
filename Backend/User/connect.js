// web3 is an Ethereum client library
import Web3 from "web3";
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));

// This file is generated by the Solidity compiler to easily interact with
// the contract using the web3 library.
import MyToken from './contracts/MyToken.json';

const MyTokenAbi = MyToken.abi;
const MyTokenContract = web3.eth.contract(MyTokenAbi);

export default MyTokenContract;