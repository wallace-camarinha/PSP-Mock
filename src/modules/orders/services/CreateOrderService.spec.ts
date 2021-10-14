import AppError from '@shared/errors/AppError';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import FakeMerchantsRepository from '@modules/merchants/repositories/fakes/FakeMerchantsRepository';
import FakePayablesRepository from '@modules/payables/repositories/fakes/FakePayablesRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';

import CreateOrderService from './CreateOrderService';

let fakeCustomersRepository: FakeCustomersRepository;
let fakeMerchantsRepository: FakeMerchantsRepository;
let fakePayablesRepository: FakePayablesRepository;
let fakeOrdersRepository: FakeOrdersRepository;

let createOrder: CreateOrderService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeMerchantsRepository = new FakeMerchantsRepository();
    fakePayablesRepository = new FakePayablesRepository();

    createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeMerchantsRepository,
      fakePayablesRepository,
    );
  });

  it('Should be able to create a order', async () => {
    fakeMerchantsRepository.create({
      name: 'Test Store',
      cnpj: '123',
    });

    const order = await createOrder.execute({
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

    expect(order).toHaveProperty('id');
  });

  it('Should not be able to create a order with an invalid "merchant_id"', async () => {
    await expect(
      createOrder.execute({
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
