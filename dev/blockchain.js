const sha256 = require('sha256');

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function (nonce, prevBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timeStamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: prevBlockHash,
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (
  amount,
  sender,
  recipient
) {
  const NewTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
  };

  this.pendingTransactions.push(NewTransaction);

  return this.getLastBlock()['index'] + 1; // return index of the last block.
};

Blockchain.prototype.hashBlock = function (
  prevBlockHash,
  currentBlockData,
  nonce
) {
  const dataAsString =
    prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);

  return hash;
};

Blockchain.prototype.proofOfWork = function (prevBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    console.log(hash);
    nonce++;
    hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
  }
  console.log(hash);
  return nonce;
};

module.exports = Blockchain;
