import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import { getCustomRepository } from 'typeorm';
import { container } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import AppError from '@shared/errors/AppError';

// const createCustomerService = container.resolve(CreateCustomerService);

export async function getCustomerByEmail(
  payload: ICreateCustomer,
): Promise<Customer> {
  const customersRepository = getCustomRepository(CustomersRepository);
  let customer = await customersRepository.findByEmail(payload.email);
  if (!customer) {
    customer = await createCustomerService.execute(payload);
  }
  const { created_at, ...responseCustomer } = customer;

  return responseCustomer;
}

export async function getCustomerById(customerId: string): Promise<Customer> {
  const customersRepository = getCustomRepository(CustomersRepository);
  const customer = await customersRepository.findById(customerId);
  if (!customer) {
    throw new AppError('Customer not found!', 405);
  }

  const { created_at, ...responseCustomer } = customer;

  return responseCustomer;
}
