import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AbiItem } from 'web3-utils';
import * as abi from '../contract/contract.json';
import { DataStoreService } from '../data-store/data-store.service';
import { getLatestBlockFromEvents } from './helpers';

const Web3 = require("web3");

@Injectable()
export class DataGatheringService implements OnModuleInit, OnModuleDestroy{

  private web3: typeof Web3;

  constructor(
      private dataStoreService: DataStoreService,
  ) {}

  async onModuleInit() {
    console.log(process.env.API_KEY);
    const web3Provider = new Web3.providers.WebsocketProvider('wss://bsc.getblock.io/testnet/?api_key=' + process.env.API_KEY);
    this.web3 = new Web3(web3Provider);

    const latestFetchedBlockNumber = await this.fetchHistoricalBlocks();
    this.subscribeToEvents(latestFetchedBlockNumber);

    // const abiDecoder = require('abi-decoder'); // NodeJS
    // abiDecoder.addABI(abi);
    // console.log(abiDecoder.decodeMethod('0x55fbc3b00000000000000000000000009f11c83606fe28542f0278797c78cb66488d7eef0000000000000000000000009f11c83606fe28542f0278797c78cb66488d7eef0000000000000000000000000000000000000000000000000000000061ddd3830000000000000000000000000000000000000000000000000000000061de48b3000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000000000000'));
    // const decodedLogs = abiDecoder.decodeLogs(transactionData[0].logs);
    // console.log(JSON.stringify(decodedLogs));
  }

  async onModuleDestroy() {
    this.web3.currentProvider.disconnect(1000, 'disconnect');
  }

  subscribeToEvents(startBlockNumber: number) {
    const subscription = this.web3.eth.subscribe('logs', {
      fromBlock: startBlockNumber,
      address: '0x9f11c83606fe28542f0278797c78cb66488d7eef',
      topics: [],
    });
    subscription.on('data', async (event) => {
      const block = await this.fetchAndSaveBlockInfo(event.blockHash, [event.transactionHash]);
      console.log(`Updated block information ${block.hash}`);
    })
    subscription.on('error', err => console.log(`Event subscription error: ${err.message}`, err.stack))
  }

  async fetchHistoricalBlocks(): Promise<number> {
    const myContract = new this.web3.eth.Contract(abi as AbiItem[], '0x9f11c83606fe28542f0278797c78cb66488d7eef');

    const eventList = await myContract.getPastEvents('Transfer',  {
      fromBlock: 0,
      toBlock: 'latest'
    });

    const blockTransactionHashes = eventList.reduce((hashList, event) => {
      if (!hashList[event.blockHash]) {
        hashList[event.blockHash] = [];
      }
      if (!hashList[event.blockHash].includes(event.transactionHash)) {
        hashList[event.blockHash].push(event.transactionHash);
      }
      return hashList;
    }, {});


    const blockEntityList = [];
    for (const [blockHash, transactionHashList] of Object.entries<string[]>(blockTransactionHashes)) {
      blockEntityList.push(this.fetchAndSaveBlockInfo(blockHash, transactionHashList))
    }
    await Promise.all(blockEntityList);

    return getLatestBlockFromEvents(eventList);
  }

  async fetchAndSaveBlockInfo(blockHash: string, blockTransactionHashes: string[]) {

    let blockEntity = await this.dataStoreService.findBlockByHash(blockHash);
    if (!blockEntity) {
      const block = await this.web3.eth.getBlock(blockHash);
      blockEntity = this.dataStoreService.initBlockEntity(block);
    }

    const transactionPromiseList = blockTransactionHashes.map(async transactionHash => {
      const transaction = await this.web3.eth.getTransaction(transactionHash);
      const transactionEntity = this.dataStoreService.initTransactionEntity(transaction);

      const transactionReceipt = await this.web3.eth.getTransactionReceipt(transactionHash);
      transactionReceipt.logs.forEach(transactionLog => {
        transactionEntity.logs.push(this.dataStoreService.initTransactionLogEntity(transactionLog));
      })
      transactionEntity.cumulativeGasUsed = transactionReceipt.cumulativeGasUsed;
      transactionEntity.gasUsed = transactionReceipt.gasUsed;

      return transactionEntity;
    })

    blockEntity.transactions = [...blockEntity.transactions, ...await Promise.all(transactionPromiseList)];

    return this.dataStoreService.saveBlock(blockEntity);
  }
}
