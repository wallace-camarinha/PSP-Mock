import { getCustomRepository } from 'typeorm';
import ICreateTransaction from '../dtos/ICreateTransaction';
import ITransaction from '../dtos/ITransaction';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

class CreateTransactionService {
  async execute(payload: ICreateTransaction): Promise<ITransaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const createdTransaction = await transactionsRepository.create(payload);

    const responseTransaction = {
      merchant_id: createdTransaction.merchant_id,
      customer_id: createdTransaction.customer_id,
      amount: createdTransaction.amount,
      description: createdTransaction.description,
      payment_method: createdTransaction.payment_method,
      payment: {
        card_number: createdTransaction.card_number,
        cardholder_name: createdTransaction.cardholder_name,
        exp_date: createdTransaction.exp_date,
        cvv: createdTransaction.cvv,
      },
      customer: {
        name: 'John Doe',
        email: 'john.doe@test.com',
        type: 'individual',
        document: '01234567890',
      },
      status: createdTransaction.status,
      created_date: createdTransaction.created_at,
    };

    return responseTransaction;
  }
}

export default CreateTransactionService;
