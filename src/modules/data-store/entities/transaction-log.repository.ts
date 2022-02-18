import { EntityRepository, Repository } from 'typeorm';
import { Block } from './block.entity';
import { TransactionLog } from './transaction-log.entity';

@EntityRepository(Block)
export class TransactionLogRepository extends Repository<Block> {

  public initEntity(web3TransactionLog: any): TransactionLog {

    const transactionLog = new TransactionLog();
    transactionLog.address = web3TransactionLog.address;
    transactionLog.topics = JSON.stringify(web3TransactionLog.topics);
    transactionLog.data = web3TransactionLog.data;
    transactionLog.logIndex = web3TransactionLog.logIndex;
    transactionLog.removed = web3TransactionLog.removed;
    transactionLog.hashId = web3TransactionLog.id;

    return transactionLog;
  }
}
