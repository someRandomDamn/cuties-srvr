import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataStoreService } from './data-store.service';
import { BlockRepository } from './entities/block.repository';
import { TransactionLogRepository } from './entities/transaction-log.repository';
import { TransactionRepository } from './entities/transaction.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionRepository,
      BlockRepository,
      TransactionLogRepository,
    ]),
  ],
  exports: [DataStoreService],
  providers: [DataStoreService],
})
export class DataStoreModule {}
