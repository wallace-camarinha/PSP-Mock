import AppError from '@shared/errors/AppError';

import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListOneOrderService from './ListOneOrderService';

let fakeOrdersRepository: FakeOrdersRepository;
let listOneOrderService: ListOneOrderService;

describe('ListOneOrders', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();

    listOneOrderService = new ListOneOrderService(fakeOrdersRepository);
  });

  it('Should be able to list one orders passing the "id"', async () => {
    const order = await fakeOrdersRepository.create({
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

    const foundOrder = await listOneOrderService.execute(order.id);

    expect(foundOrder).toEqual(order);
  });
});
