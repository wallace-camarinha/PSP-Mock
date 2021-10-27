import 'reflect-metadata';

import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import CreatePayableService from './CreatePayableService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakePayablesRepository: FakePayablesRepository;
let createPayable: CreatePayableService;

describe('CreatePayable', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    createPayable = new CreatePayableService(fakePayablesRepository);
  });

  it('Should be able to create a payable', async () => {
    const order = await fakeOrdersRepository.create({
      merchant_id: '123',
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
        document: null,
        type: null,
      },
    });

    const payable = await createPayable.execute(order);

    expect(payable).toHaveProperty('id');
  });
});
