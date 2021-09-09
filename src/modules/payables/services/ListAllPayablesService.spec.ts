import AppError from '@shared/errors/AppError';

import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import ListAllPayablesService from './ListAllPayablesService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakePayablesRepository: FakePayablesRepository;
let listAllPayables: ListAllPayablesService;

describe('ListAllPayables', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();
    listAllPayables = new ListAllPayablesService(fakePayablesRepository);
  });

  it('Should be able to list all payable from a Merchant', async () => {
    const transaction1 = await fakeTransactionsRepository.create({
      merchant_id: '123',
      merchant_name: 'Test Store',
      customer_id: '321',
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
    const payable1 = await fakePayablesRepository.create(transaction1);

    const transaction2 = await fakeTransactionsRepository.create({
      merchant_id: '123',
      merchant_name: 'Test Store',
      customer_id: '321',
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
    const payable2 = await fakePayablesRepository.create(transaction2);

    const payables = await listAllPayables.execute('123');

    expect(payables).toEqual([payable1, payable2]);
  });

  it('Should not be able to list payables passing an invalid "merchant_id"', async () => {
    await expect(listAllPayables.execute('')).rejects.toBeInstanceOf(AppError);
  });
});
