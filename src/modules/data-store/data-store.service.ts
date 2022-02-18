import { Injectable } from '@nestjs/common';
import { Block } from './entities/block.entity';
import { BlockRepository } from './entities/block.repository';
import { TransactionLog } from './entities/transaction-log.entity';
import { TransactionLogRepository } from './entities/transaction-log.repository';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './entities/transaction.repository';

@Injectable()
export class DataStoreService {

  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionLogRepository: TransactionLogRepository,
    private readonly blockRepository: BlockRepository,
  ) {
  }

  initTransactionEntity(web3Transaction: any): Transaction {
    return this.transactionRepository.initEntity(web3Transaction);
  }

  initTransactionLogEntity(web3TransactionLog: any): TransactionLog {
    return this.transactionLogRepository.initEntity(web3TransactionLog);
  }

  initBlockEntity(web3Block: any): Block {
    return this.blockRepository.initEntity(web3Block);
  }

  async saveBlock(block: Block): Promise<Block> {
    return this.blockRepository.save(block);
  }

  async findBlockByHash(blockHash: string): Promise<Block> {
    return this.blockRepository.findOne(blockHash);
  }
}
