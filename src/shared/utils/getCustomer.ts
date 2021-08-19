import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import AppError from 'errors/AppError';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

const createCustomerService = new CreateCustomerService();

export async function getCustomerByEmail(
  payload: ICreateCustomer,
): Promise<Customer> {
  const customersRepository = getCustomRepository(CustomersRepository);
  let customer = await customersRepository.findByEmail(payload.email);
  if (!customer) {
    customer = await createCustomerService.execute(payload);
  }

  return customer;
}

export async function getCustomerById(customerId: string): Promise<Customer> {
  const customersRepository = getCustomRepository(CustomersRepository);
  const customer = await customersRepository.findById(customerId);
  if (!customer) {
    throw new AppError('Customer not found!', 405);
  }

  return customer;
}
