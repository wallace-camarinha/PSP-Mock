import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

import { getCustomerByEmail, getCustomerById } from '@shared/utils/getCustomer';
import getMerchant from '@shared/utils/getMerchant';
import AppError from 'errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ITransaction from '@modules/transactions/dtos/ITransaction';
import Transaction from '../entities/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(payload: ICreateTransaction): Promise<ITransaction> {
    let customer: Customer;
    if (!payload.customer_id) {
      customer = await getCustomerByEmail(payload.customer);
    } else {
      customer = await getCustomerById(payload.customer_id);
    }

    if (!payload.merchant_id) {
      throw new AppError('Invalid Merchant', 400);
    }
    const merchant = await getMerchant(payload.merchant_id);

    const transaction = this.ormRepository.create({
      id: uuid(),
      customer_id: customer.id,
      merchant_id: merchant.id,
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

    const responseTransaction: ITransaction = {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      payment_method: transaction.payment_method,
      status: transaction.status,
      payment: {
        card_number: transaction.card_number,
        cardholder_name: transaction.cardholder_name,
        exp_date: transaction.exp_date,
        cvv: transaction.cvv,
      },
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        type: customer?.type,
        document: customer?.document,
      },
      merchant: {
        id: merchant.id,
        name: merchant.name,
      },
      created_date: transaction.created_at,
    };
    return responseTransaction;
  }

  public async findAll(merchantId: string): Promise<Transaction[] | undefined> {
    const merchantTransactions = this.ormRepository.find({ where: merchantId });

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
