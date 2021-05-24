import express from 'express';

var app = express();
import { Blockchain } from '../blockchain';
import { v1 as uuidv1 } from 'uuid';

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
  const lastBlock = crypto.getLastBlock;
  const prevBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: crypto.getPendingTransactions,
    index: lastBlock['index'] + 1,
  };

  const nonce = crypto.proofOfWork(
    prevBlockHash,
    currentBlockData as typeof newBlock
  );
  const blockHash = crypto.hashBlock(
    prevBlockHash,
    currentBlockData as typeof newBlock,
    nonce
  );

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
    lastBlock: crypto.getLastBlock,
  });
});

app.listen(3000, () => {
  console.log('Server up at 3000');
});
