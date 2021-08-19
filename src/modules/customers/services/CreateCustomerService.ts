import { getCustomRepository } from 'typeorm';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import AppError from 'errors/AppError';
import ICreateCustomer from '../dtos/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';

class CreateCustomerService {
  async execute(payload: ICreateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    if (!payload.name) {
      throw new AppError('Please enter a valid name!', 402);
    }

    if (!payload.email) {
      throw new AppError('Please enter a valid e-mail!', 402);
    }

    const userExists = await customersRepository.findByEmail(payload.email);
    if (userExists) {
      throw new AppError('User already exists!', 402);
    }

    const customer = await customersRepository.create(payload);

    return customer;
  }
}

export default CreateCustomerService;
