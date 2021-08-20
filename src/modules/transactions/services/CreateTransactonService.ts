import AppError from 'errors/AppError';
import { getCustomRepository } from 'typeorm';

import { getCustomerByEmail, getCustomerById } from '@shared/utils/getCustomer';
import getMerchant from '@shared/utils/getMerchant';
import CreatePayableService from '@modules/payables/services/CreatePayableService';
import ICreateTransaction from '../dtos/ICreateTransaction';
import ITransaction from '../dtos/ITransaction';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

const createPayableService = new CreatePayableService();

class CreateTransactionService {
  async execute(payload: ICreateTransaction): Promise<ITransaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    let { customer } = payload;
    if (!payload.customer_id) {
      customer = await getCustomerByEmail(customer);
    } else {
      customer = await getCustomerById(payload.customer_id);
    }

    if (!payload.merchant_id) {
      throw new AppError('Invalid Merchant', 400);
    }
    const merchant = await getMerchant(payload.merchant_id);

    const transactionPayload = { ...payload, customer, merchant };
    const transaction = await transactionsRepository.create(transactionPayload);

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
