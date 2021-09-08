import { v4 as uuid } from 'uuid';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import ITransactionsRepository from '../ITransactionsRepository';

class FakeTransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async create(payload: ICreateTransaction): Promise<Transaction> {
    const transaction: Transaction = new Transaction();

    const cardNumber = payload.payment.card_number;
    const maskedCardNumber = `${cardNumber.slice(
      0,
      6,
    )}********${cardNumber.slice(-4)}`;

    Object.assign(transaction, {
      id: uuid(),
      customer_id: payload.customer.id,
      merchant_id: payload.merchant_id,
      merchant_name: payload.merchant_name,
      amount: payload.amount,
      description: payload.description,
      payment_method: payload.payment_method,
      card_number: maskedCardNumber,
      cardholder_name: payload.payment.cardholder_name,
      exp_date: payload.payment.exp_date,
      cvv: payload.payment.cvv,
      status: 'approved',
      created_at: new Date(),
    });

    this.transactions.push(transaction);

    return transaction;
  }

  public async findAll(merchantId: string): Promise<Transaction[] | undefined> {
    const transactions = this.transactions.filter(
      transaction => transaction.merchant_id === merchantId,
    );

    return transactions;
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const findTransaction = this.transactions.find(
      transaction => transaction.id === id,
    );

    return findTransaction;
  }
}

export default FakeTransactionsRepository;
