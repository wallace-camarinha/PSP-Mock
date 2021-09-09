import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICreateCustomer from '../dtos/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(payload: ICreateCustomer): Promise<Customer> {
    if (!payload.name || !payload.email) {
      throw new AppError('Please enter a valid customer name and e-mail!', 402);
    }

    const userExists = await this.customersRepository.findOne(payload.email);
    if (userExists) {
      throw new AppError('User already exists!', 401);
    }

    const customer = await this.customersRepository.create(payload);

    return customer;
  }
}

export default CreateCustomerService;
