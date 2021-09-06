import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ListAllCustomersService from './ListAllCustomersService';

let fakeCustomersRepository: FakeCustomersRepository;
let listAllCustomers: ListAllCustomersService;

describe('ListAllCustomers', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listAllCustomers = new ListAllCustomersService(fakeCustomersRepository);
  });

  it('Should be able to list all customers', async () => {
    const customer1 = await fakeCustomersRepository.create({
      name: 'Test Example 1',
      email: 'test1@example.com',
    });

    const customer2 = await fakeCustomersRepository.create({
      name: 'Test Example 2',
      email: 'test2@example.com',
    });

    const customers = await listAllCustomers.execute();

    expect(customers).toEqual([customer1, customer2]);
  });
});
