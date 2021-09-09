import AppError from '@shared/errors/AppError';

import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import ListOneTransactionService from './ListOneTransactionService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let listOneTransactionService: ListOneTransactionService;

describe('ListOneTransactions', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();

    listOneTransactionService = new ListOneTransactionService(
      fakeTransactionsRepository,
    );
  });

  it('Should be able to list one transactions passing the "id"', async () => {
    const transaction = await fakeTransactionsRepository.create({
      merchant_id: '123',
      merchant_name: 'Test Store',
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

    const foundTransaction = await listOneTransactionService.execute(
      transaction.id,
    );

    expect(foundTransaction).toEqual(transaction);
  });
});
