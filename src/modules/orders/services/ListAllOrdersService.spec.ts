import AppError from '@shared/errors/AppError';

import FakeMerchantsRepository from '@modules/merchants/repositories/fakes/FakeMerchantsRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListAllOrdersService from './ListAllOrdersService';

let fakeMerchantsRepository: FakeMerchantsRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let listAllOrdersService: ListAllOrdersService;

describe('ListAllOrders', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeMerchantsRepository = new FakeMerchantsRepository();

    listAllOrdersService = new ListAllOrdersService(fakeOrdersRepository);
  });

  it('Should be able to list all orders from a Merchant', async () => {
    const merchant = await fakeMerchantsRepository.create({
      name: 'Test Store',
      cnpj: '123',
    });
    const order1 = await fakeOrdersRepository.create({
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

    const order2 = await fakeOrdersRepository.create({
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

    const orders = await listAllOrdersService.execute(merchant.id);

    expect(orders).toEqual([order1, order2]);
  });

  it('Should not be able to list all orders with an invalid "merchant_id"', async () => {
    await expect(listAllOrdersService.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
