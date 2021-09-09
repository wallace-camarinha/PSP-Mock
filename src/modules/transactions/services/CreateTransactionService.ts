import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';

import ITransactionsRepository from '../repositories/ITransactionsRepository';
import ITransaction from '../dtos/ITransaction';
import ICreateTransaction from '../dtos/ICreateTransaction';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,

    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(payload: ICreateTransaction): Promise<ITransaction> {
    let { customer } = payload;

    const customerExists = await this.customersRepository.findOne(
      payload.customer_id || customer.email,
    );

    if (customerExists) {
      customer = customerExists;
    } else {
      customer = await this.customersRepository.create(customer);
    }

    const merchant = await this.merchantsRepository.findOne(
      payload.merchant_id,
    );

    if (!merchant) {
      throw new AppError('Invalid Merchant', 400);
    }

    const merchantName = merchant.name;

    const transactionPayload = {
      ...payload,
      customer,
      merchant,
      merchant_name: merchantName,
    };
    const transaction = await this.transactionsRepository.create(
      transactionPayload,
    );

    this.payablesRepository.create(transaction);

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
      customer: { ...customer },
      merchant: { ...merchant },
      created_date: transaction.created_at,
    };

    return responseTransaction;
  }
}

export default CreateTransactionService;
