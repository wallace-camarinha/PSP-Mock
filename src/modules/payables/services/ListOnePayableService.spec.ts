import 'reflect-metadata';

import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import ListOnePayableService from './ListOnePayableService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakePayablesRepository: FakePayablesRepository;
let listOnePayableService: ListOnePayableService;

describe('ListOnePayable', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    listOnePayableService = new ListOnePayableService(fakePayablesRepository);
  });

  it('Should be able to list one payable passing the "payable_id"', async () => {
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
    const payable = await fakePayablesRepository.create(order);

    const foundPayable = await listOnePayableService.execute(payable.id);

    expect(foundPayable).toEqual(payable);
  });
});
