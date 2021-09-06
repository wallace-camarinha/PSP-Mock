import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';

import ListOneCustomerService from '@modules/customers/services/ListOneCustomerService';
import ListOneMerchantService from '@modules/merchants/services/ListOneMerchantService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import CreatePayableService from '@modules/payables/services/CreatePayableService';

import ITransaction from '../dtos/ITransaction';
import ICreateTransaction from '../dtos/ICreateTransaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(payload: ICreateTransaction): Promise<ITransaction> {
    const listOneCustomer = container.resolve(ListOneCustomerService);
    const createCustomer = container.resolve(CreateCustomerService);
    const listOneMerchant = container.resolve(ListOneMerchantService);
    const createPayableService = container.resolve(CreatePayableService);

    let { customer } = payload;

    const customerExists = await listOneCustomer.execute(
      payload.customer_id,
      customer.email,
    );

    if (customerExists) {
      customer = customerExists;
    } else {
      customer = await createCustomer.execute(customer);
    }

    const merchant = await listOneMerchant.execute(payload.merchant_id);
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

    createPayableService.execute(transaction);

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
