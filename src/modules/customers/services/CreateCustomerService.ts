import { inject, injectable } from 'tsyringe';

import { Customer } from '@shared/infra/prisma/prismaClient';

import AppError from '@shared/errors/AppError';
import ICreateCustomer from '../dtos/ICreateCustomer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({
    email,
    name,
    type,
    document,
  }: ICreateCustomer): Promise<Customer> {
    if (!name || !email) {
      throw new AppError('Please enter a valid customer name and e-mail!', 400);
    }

    const userExists = await this.customersRepository.findOne(email);

    if (userExists) {
      throw new AppError('This e-mail is already in use!', 409);
    }

    const customer = await this.customersRepository.create({
      email,
      name,
      type,
      document,
    });

    return customer;
  }
}

export default CreateCustomerService;
