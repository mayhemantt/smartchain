import { Blockchain } from './blockchain';
const crypto = new Blockchain();

const prevBlockHash = crypto.getLastBlock['hash'];
const currentBlockData = [
  {
    amount: 200,
    recipient: 'wfsjnffvc',
  },
  {
    amount: 400,
    recipient: 'rmjfdn',
  },
  {
    amount: 5493,
    recipient: 'dcicimimd',
  },
];

const nonce = crypto.proofOfWork(prevBlockHash, currentBlockData);
const newHash = crypto.hashBlock(prevBlockHash, currentBlockData, nonce);

const newBlock = crypto.createNewBlock(nonce, prevBlockHash, nonce);

console.log(`🎉🎉New Block Added to the Blockchain🚀🎉🎉`);

console.log(`Here is the data for newly added block hash: ${newBlock.hash}`);
