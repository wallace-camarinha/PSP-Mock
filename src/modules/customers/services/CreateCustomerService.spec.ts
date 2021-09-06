import AppError from '@shared/errors/AppError';

import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('Should be able to create a customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Test Example',
      email: 'test@example.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create a customer with an existing e-mail', async () => {
    const customer = await createCustomer.execute({
      name: 'Test Example',
      email: 'test@example.com',
    });

    await expect(
      createCustomer.execute({
        name: 'Test Example',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a customer without a name and e-mail', async () => {
    await expect(
      createCustomer.execute({
        name: '',
        email: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
