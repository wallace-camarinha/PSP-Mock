import AppError from '@shared/errors/AppError';

import FakeMerchantsRepository from '@modules/merchants/repositories/fakes/FakeMerchantsRepository';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import ListAllTransactionsService from './ListAllTransactionsService';

let fakeMerchantsRepository: FakeMerchantsRepository;
let fakeTransactionsRepository: FakeTransactionsRepository;
let listAllTransactionsService: ListAllTransactionsService;

describe('ListAllTransactions', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeMerchantsRepository = new FakeMerchantsRepository();

    listAllTransactionsService = new ListAllTransactionsService(
      fakeTransactionsRepository,
    );
  });

  it('Should be able to list all transactions from a Merchant', async () => {
    const merchant = await fakeMerchantsRepository.create({
      name: 'Test Store',
      cnpj: '123',
    });
    const transaction1 = await fakeTransactionsRepository.create({
      merchant_id: merchant.id,
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

    const transaction2 = await fakeTransactionsRepository.create({
      merchant_id: merchant.id,
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

    const transactions = await listAllTransactionsService.execute(merchant.id);

    expect(transactions).toEqual([transaction1, transaction2]);
  });

  it('Should not be able to list all transactions with an invalid "merchant_id"', async () => {
    await expect(listAllTransactionsService.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
