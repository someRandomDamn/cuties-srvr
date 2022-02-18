import { EntityRepository, Repository } from 'typeorm';
import { Block } from './block.entity';
import { Transaction } from './transaction.entity';

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {

  public initEntity(web3Block: any): Block {
    const block = new Block();
    block.dateCreated = new Date(web3Block.timestamp);
    block.difficulty = web3Block.difficulty;
    block.extraData = web3Block.extraData;
    block.gasLimit = web3Block.gasLimit;
    block.gasUsed = web3Block.gasUsed;
    block.hash = web3Block.hash;
    block.logsBloom = web3Block.logsBloom;
    block.miner = web3Block.miner;
    block.mixHash = web3Block.mixHash;
    block.nonce = web3Block.nonce;
    block.blockHeight = web3Block.number;
    block.parentHash = web3Block.parentHash;
    block.receiptsRoot = web3Block.receiptsRoot;
    block.sha3Uncles = web3Block.sha3Uncles;
    block.size = web3Block.size;
    block.stateRoot = web3Block.stateRoot;
    block.totalDifficulty = web3Block.totalDifficulty;
    block.transactionsList = JSON.stringify(web3Block.transactions);
    block.transactionsRoot = web3Block.transactionsRoot;
    block.uncles = JSON.stringify(web3Block.uncles);
    block.transactions = [];

    return block;
  }
}
