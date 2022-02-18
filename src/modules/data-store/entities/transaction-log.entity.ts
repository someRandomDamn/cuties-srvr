import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class TransactionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ type: 'json' })
  topics: string;

  @Column({ type: 'longtext' })
  data: string;

  @Column()
  logIndex: number;

  @Column()
  removed: boolean;

  @Column()
  hashId: string;

  @ManyToOne(type => Transaction, transaction => transaction.logs)
  transaction: Transaction;
}
