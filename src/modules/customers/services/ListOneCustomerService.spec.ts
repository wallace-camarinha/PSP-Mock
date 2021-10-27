import 'reflect-metadata';

import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ListOneCustomerService from './ListOneCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let listOneCustomer: ListOneCustomerService;

describe('ListOneCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listOneCustomer = new ListOneCustomerService(fakeCustomersRepository);
  });

  it('Should be able to list one customer passing the id', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Test Example',
      email: 'test@example.com',
      type: null,
      document: null,
    });

    const findCustomer = await listOneCustomer.execute(customer.id);

    expect(findCustomer).toEqual(customer);
  });

  it('Should be able to list one customer passing the e-mail', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Test Example',
      email: 'test@example.com',
      type: null,
      document: null,
    });

    const findCustomer = await listOneCustomer.execute(customer.email);

    expect(findCustomer).toEqual(customer);
  });
});
