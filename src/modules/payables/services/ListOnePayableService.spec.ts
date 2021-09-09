import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import ListOnePayableService from './ListOnePayableService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakePayablesRepository: FakePayablesRepository;
let listOnePayableService: ListOnePayableService;

describe('ListOnePayable', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();
    listOnePayableService = new ListOnePayableService(fakePayablesRepository);
  });

  it('Should be able to list one payable passing the "payable_id"', async () => {
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
    const payable = await fakePayablesRepository.create(transaction);

    const foundPayable = await listOnePayableService.execute(payable.id);

    expect(foundPayable).toEqual(payable);
  });
});
