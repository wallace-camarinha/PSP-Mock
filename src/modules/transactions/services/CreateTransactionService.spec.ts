import AppError from '@shared/errors/AppError';

import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import CreateTransactionService from './CreateTransactionService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let createTransaction: CreateTransactionService;

describe('CreateTransaction', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
    );
  });

  it('Should be able to create a transaction', async () => {
    const transaction = await createTransaction.execute({
      merchant_id: '123',
      merchant_name: 'Merchant Test',
      customer_id: '',
      amount: 100000,
      description: 'Test',
      payment_method: 'credit_card',
      payment: {
        card_number: '4000000000000099',
        cardholder_name: 'Test Example',
        exp_date: '09-29',
        cvv: 123,
      },
      customer: {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });

    expect(transaction).toHaveProperty('id');
  });
});
