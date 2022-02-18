import { Column, EntityRepository, Index, JoinColumn, ManyToOne, OneToMany, Repository } from 'typeorm';
import { Block } from './block.entity';
import { TransactionLog } from './transaction-log.entity';
import { Transaction } from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async findBookingByRbsSessionId(
    sessionId: string,
    rbsSessionId: string,
    searchId?: string,
  ): Promise<Transaction> {
    return searchId
      ? await this.createQueryBuilder('booking')
          .innerJoinAndSelect('booking.itineraries', 'itineraries')
          .innerJoinAndSelect('booking.activeItinerary', 'activeItinerary')
          .leftJoinAndSelect('booking.bookingProp', 'bookingProp')
          .leftJoinAndSelect('booking.flightExtras', 'flightExtras')
          .leftJoinAndSelect('flightExtras.flightExtra', 'flightExtra')
          .leftJoinAndSelect('booking.passengers', 'passengers')
          .where('booking.sessionId = :sessionId', { sessionId })
          .andWhere('booking.searchId = :searchId', { searchId })
          .andWhere('activeItinerary.rbsSessionId = :rbsSessionId', { rbsSessionId })
          .getOne()
      : await this.createQueryBuilder('booking')
          .innerJoinAndSelect('booking.itineraries', 'itineraries')
          .innerJoinAndSelect('booking.activeItinerary', 'activeItinerary')
          .leftJoinAndSelect('booking.bookingProp', 'bookingProp')
          .leftJoinAndSelect('booking.flightExtras', 'flightExtras')
          .leftJoinAndSelect('flightExtras.flightExtra', 'flightExtra')
          .leftJoinAndSelect('booking.passengers', 'passengers')
          .where('booking.sessionId = :sessionId', { sessionId })
          .andWhere('activeItinerary.rbsSessionId = :rbsSessionId', { rbsSessionId })
          .getOne();
  }

  initEntity(web3Transaction: any): Transaction {
    const transaction = new Transaction();
    transaction.hash = web3Transaction.hash;
    transaction.from = web3Transaction.from;
    transaction.to = web3Transaction.to;
    transaction.gas = web3Transaction.gas;
    transaction.gasPrice = web3Transaction.gasPrice;
    transaction.gasUsed = web3Transaction.gasUsed;
    transaction.input = web3Transaction.input;
    transaction.nonce = web3Transaction.nonce;
    transaction.transactionIndex = web3Transaction.transactionIndex;
    transaction.value = web3Transaction.value;
    transaction.type = web3Transaction.type;
    transaction.logs = [];

    return transaction;
  }

}
