import sha256 from 'sha256';
import { transaction, newBlock } from './types';

export const blockType = () => {
  return typeof newBlock;
};

export class Blockchain {
  private chain: typeof newBlock[] | [] = [];
  private pendingTransactions: transaction[] | [] = [];

  constructor() {
    this.chain = [];
    this.pendingTransactions = [];

    this.createNewBlock(100, '0', '0');
  }

  createNewBlock(
    nonce: number,
    prevBlockHash: string,
    hash: string
  ): typeof newBlock {
    const newBlock = {
      index: this.chain.length + 1,
      timeStamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      prevBlockHash,
    };
    this.pendingTransactions = [];
    (this.chain as typeof newBlock[]).push(newBlock);

    return newBlock;
  }

  get getLastBlock(): typeof newBlock {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction = (
    amount: number,
    sender: string,
    recipient: string
  ): number => {
    const NewTransaction: transaction = {
      amount,
      sender,
      recipient,
    };

    (this.pendingTransactions as transaction[]).push(NewTransaction);
    return this.getLastBlock['index'] + 1;
  };

  hashBlock = (
    prevBlockHash: string,
    currentBlockData: typeof newBlock,
    nonce: number
  ): string => {
    const dataAsAString =
      prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash: string = sha256(dataAsAString);
    return hash;
  };

  proofOfWork = (
    prevBlockHash: string,
    currentBlockData: typeof newBlock
  ): number => {
    let nonce = 0;
    let hash: string = this.hashBlock(prevBlockHash, currentBlockData, nonce);

    while (hash.substring(0, 4) !== '0101') {
      console.log(hash);
      nonce++;
      hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
    }
    console.log(hash);
    return nonce;
  };
}

// Blockchain.prototype.proofOfWork = function (prevBlockHash, currentBlockData) {
//   let nonce = 0;
//   let hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
//   while (hash.substring(0, 2) !== '55') {
//     console.log(hash);
//     nonce++;
//     hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
//   }
//   console.log(hash);
//   return nonce;
// };

// Blockchain.prototype.hashBlock = function (
//   prevBlockHash,
//   currentBlockData,
//   nonce
// ) {
//   const dataAsString =
//     prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
//   const hash = sha256(dataAsString);

//   return hash;
// };

// Blockchain.prototype.createNewTransaction = function (
//   amount,
//   sender,
//   recipient
// ) {
//   const NewTransaction = {
//     amount: amount,
//     sender: sender,
//     recipient: recipient,
//   };

//   this.pendingTransactions.push(NewTransaction);

//   return this.getLastBlock()['index'] + 1; // return index of the last block.
// };

// Blockchain.prototype.createNewBlock = function (nonce, prevBlockHash, hash) {
//   const newBlock = {
//     index: this.chain.length + 1,
//     timeStamp: Date.now(),
//     transactions: this.pendingTransactions,
//     nonce: nonce,
//     hash: hash,
//     previousBlockHash: prevBlockHash,
//   };

//   this.pendingTransactions = [];
//   this.chain.push(newBlock);

//   return newBlock;
// };

// Blockchain.prototype.getLastBlock = function () {
//   return this.chain[this.chain.length - 1];
// };
