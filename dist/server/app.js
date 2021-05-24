"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var app = express_1.default();
const blockchain_1 = require("../blockchain");
const uuid_1 = require("uuid");
const crypto = new blockchain_1.Blockchain();
const nodeAddress = uuid_1.v1().split('-').join('');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.json({
        Hello: `Hi From Server, ${Date.now().toString()}`,
    });
});
app.post('/transaction', function (req, res) {
    const blockIndex = crypto.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
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
    const nonce = crypto.proofOfWork(prevBlockHash, currentBlockData);
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
        lastBlock: crypto.getLastBlock,
    });
});
app.listen(3000, () => {
    console.log('Server up at 3000');
});
//# sourceMappingURL=app.js.map