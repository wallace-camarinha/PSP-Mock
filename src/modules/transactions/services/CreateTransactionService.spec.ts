import AppError from '@shared/errors/AppError';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import FakeMerchantsRepository from '@modules/merchants/repositories/fakes/FakeMerchantsRepository';
import FakePayablesRepository from '@modules/payables/repositories/fakes/FakePayablesRepository';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';

import CreateTransactionService from './CreateTransactionService';

let fakeCustomersRepository: FakeCustomersRepository;
let fakeMerchantsRepository: FakeMerchantsRepository;
let fakePayablesRepository: FakePayablesRepository;
let fakeTransactionsRepository: FakeTransactionsRepository;

let createTransaction: CreateTransactionService;

describe('CreateTransaction', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeMerchantsRepository = new FakeMerchantsRepository();
    fakePayablesRepository = new FakePayablesRepository();

    createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
      fakeCustomersRepository,
      fakeMerchantsRepository,
      fakePayablesRepository,
    );
  });

  it('Should be able to create a transaction', async () => {
    fakeMerchantsRepository.create({
      name: 'Test Store',
      cnpj: '123',
    });

    const transaction = await createTransaction.execute({
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

    expect(transaction).toHaveProperty('id');
  });

  it('Should not be able to create a transaction with an invalid "merchant_id"', async () => {
    await expect(
      createTransaction.execute({
        merchant_id: '',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
