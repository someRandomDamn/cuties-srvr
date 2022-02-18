import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Block {

  @PrimaryColumn()
  hash: string;

  @Index()
  @Column({ type: 'timestamp' })
  dateCreated: Date;

  @Column()
  difficulty: string;

  @Column()
  extraData: string;

  @Column()
  gasLimit: number;

  @Column()
  gasUsed: number;

  @Column({ type: 'longtext' })
  logsBloom: string;

  @Column()
  miner: string;

  @Column()
  mixHash: string;

  @Column()
  nonce: string;

  @Column()
  blockHeight: number;

  @Column()
  parentHash: string;

  @Column()
  receiptsRoot: string;

  @Column()
  sha3Uncles: string;

  @Column()
  size: number;

  @Column()
  stateRoot: string;

  @Column()
  totalDifficulty: string;

  @Column({ type: 'json', nullable: true })
  transactionsList: string;

  @Column()
  transactionsRoot: string;

  @Column({ type: 'json', nullable: true })
  uncles: string;

  @OneToMany(type => Transaction, user => user.block, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  transactions: Transaction[];
}
