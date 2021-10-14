import AppError from '@shared/errors/AppError';

import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import ListAllPayablesService from './ListAllPayablesService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakePayablesRepository: FakePayablesRepository;
let listAllPayables: ListAllPayablesService;

describe('ListAllPayables', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    listAllPayables = new ListAllPayablesService(fakePayablesRepository);
  });

  it('Should be able to list all payable from a Merchant', async () => {
    const order1 = await fakeOrdersRepository.create({
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
    const order2 = await fakeOrdersRepository.create({
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

    const payable1 = await fakePayablesRepository.create(order1);
    const payable2 = await fakePayablesRepository.create(order2);

    const payables = await listAllPayables.execute('123');

    expect(payables).toEqual([payable1, payable2]);
  });

  it('Should not be able to list payables passing an invalid "merchant_id"', async () => {
    await expect(listAllPayables.execute('')).rejects.toBeInstanceOf(AppError);
  });
});
