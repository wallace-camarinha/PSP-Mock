import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import CreatePayableService from './CreatePayableService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakePayablesRepository: FakePayablesRepository;
let createPayable: CreatePayableService;

describe('CreatePayable', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();
    createPayable = new CreatePayableService(fakePayablesRepository);
  });

  it('Should be able to create a payable', async () => {
    const transaction = await fakeTransactionsRepository.create({
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

    const payable = await createPayable.execute(transaction);

    expect(payable).toHaveProperty('id');
  });
});
