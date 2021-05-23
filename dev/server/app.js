var express = require('express');
var app = express();
const Blockchain = require('../blockchain');
const { v1: uuidv1 } = require('uuid');

const crypto = new Blockchain();

const nodeAddress = uuidv1().split('-').join('');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.json({
    Hello: `Hi From Server, ${Date.now().toString()}`,
  });
});

app.post('/transaction', function (req, res) {
  const blockIndex = crypto.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );

  res.json({
    note: `transaction will be added in block ${blockIndex}`,
  });
});

app.get('/mine', function (req, res) {
  const lastBlock = crypto.getLastBlock();
  const prevBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: crypto.pendingTransactions,
    index: lastBlock['index'] + 1,
  };

  const nonce = crypto.proofOfWork(prevBlockHash, newBlock);
  const blockHash = crypto.hashBlock(prevBlockHash, currentBlockData, nonce);

  crypto.createNewTransaction(12.5, '00', nodeAddress);

  const newBlock = crypto.createNewBlock(nonce, prevBlockHash, blockHash);

  res.json({
    note: `New Block mined`,
    block: newBlock,
  });
});

app.get('/blockchain', function (req, res) {
  res.json({
    crypto,
    lastBlock: crypto.getLastBlock(),
  });
});

app.listen(3000, () => {
  console.log('Server up at 3000');
});
