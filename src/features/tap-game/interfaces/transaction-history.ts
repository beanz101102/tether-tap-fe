export interface ITransferTransactionHistory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  from: string;
  to: string;
  value: number;
  tokenID: number;
  type: TransactionType;
  status: TransactionStatus;
  txHash: string;
}
enum  TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

enum  TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  DISTRIBUTE = 'distribute'
}