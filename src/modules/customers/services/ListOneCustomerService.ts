import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListOneCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(
    customerId: string,
    email: string,
  ): Promise<Customer | undefined> {
    if (customerId) {
      const customer = await this.customersRepository.findById(customerId);
      return customer;
    }

    if (email) {
      const customer = await this.customersRepository.findByEmail(email);
      return customer;
    }

    throw new AppError('Please, provide a "customer_id" or an "e-mail"!');
  }
}

export default ListOneCustomerService;
