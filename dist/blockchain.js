"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = exports.blockType = void 0;
const sha256_1 = __importDefault(require("sha256"));
const types_1 = require("./types");
const blockType = () => {
    return typeof types_1.newBlock;
};
exports.blockType = blockType;
class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.createNewTransaction = (amount, sender, recipient) => {
            const NewTransaction = {
                amount,
                sender,
                recipient,
            };
            this.pendingTransactions.push(NewTransaction);
            return this.getLastBlock['index'] + 1;
        };
        this.hashBlock = (prevBlockHash, currentBlockData, nonce) => {
            const dataAsAString = prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
            const hash = sha256_1.default(dataAsAString);
            return hash;
        };
        this.proofOfWork = (prevBlockHash, currentBlockData) => {
            let nonce = 0;
            let hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
            while (hash.substring(0, 4) !== '0101') {
                console.log(hash);
                nonce++;
                hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
            }
            console.log(hash);
            return nonce;
        };
        this.chain = [];
        this.pendingTransactions = [];
        this.createNewBlock(100, '0', '0');
    }
    createNewBlock(nonce, prevBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timeStamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            hash,
            prevBlockHash,
        };
        this.pendingTransactions = [];
        this.chain.push(newBlock);
        return newBlock;
    }
    get getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=blockchain.js.map