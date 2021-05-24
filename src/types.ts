export type transaction = {
  amount: number;
  sender: string;
  recipient: string;
};

export const newBlock = {
  index: 1,
  timeStamp: Date.now(),
  transactions: [
    {
      amount: 4,
      sender: 'string',
      recipient: 'string',
    },
  ],
  nonce: 4,
  hash: 'dsdf',
  prevBlockHash: 'ddd',
};
