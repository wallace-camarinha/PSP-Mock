import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '../entities/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(payload: ICreateTransaction): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      id: uuid(),
      customer_id: payload.customer.id,
      merchant_id: payload.merchant_id,
      amount: payload.amount,
      description: payload.description,
      payment_method: payload.payment_method,
      card_number: payload.payment.card_number,
      cardholder_name: payload.payment.cardholder_name,
      exp_date: payload.payment.exp_date,
      cvv: payload.payment.cvv,
      status: 'approved',
      created_at: new Date(),
    });
    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async findAll(merchantId: string): Promise<Transaction[] | undefined> {
    const merchantTransactions = this.ormRepository.find({
      where: { merchant_id: merchantId },
    });

    return merchantTransactions;
  }

  public async findById(
    transactionId: string,
  ): Promise<Transaction | undefined> {
    const transaction = this.ormRepository.findOne(transactionId);

    return transaction;
  }
}

export default TransactionsRepository;
