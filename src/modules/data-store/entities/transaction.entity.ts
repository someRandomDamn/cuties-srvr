import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Block } from './block.entity';
import { TransactionLog } from './transaction-log.entity';

@Entity()
export class Transaction {
  @PrimaryColumn()
  hash: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  gas: number;

  @Column()
  gasPrice: string;

  @Column()
  cumulativeGasUsed: number;

  @Column()
  gasUsed: number;

  @Column({ type: 'longtext' })
  input: string;

  @Column()
  nonce: number;

  @Index()
  @Column()
  transactionIndex: number;

  @Column()
  value: string;

  @Column()
  type: string;

  @ManyToOne(type => Block, block => block.transactions)
  block: Block;

  @OneToMany(type => TransactionLog, transactionLog => transactionLog.transaction, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  logs: TransactionLog[];
}

