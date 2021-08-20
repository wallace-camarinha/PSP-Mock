import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Payable from '../entities/Payable';

@EntityRepository(Payable)
class PayablesRepository implements ITransactionsRepository {
  private ormRepository: Repository<Payable>;

  constructor() {
    this.ormRepository = getRepository(Payable);
  }

  public async create(transaction: Transaction): Promise<Payable> {
    const payable = this.ormRepository.create({
      id: uuid(),
      merchant_id: payload.merchant_id,
      amount: 1230,
      payment_method: payload.payment_method,
      card_number: maskedCardNumber,
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
