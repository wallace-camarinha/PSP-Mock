import { inject, injectable } from 'tsyringe';

import { Customer } from '@shared/infra/prisma/prismaClient';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListOneCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(arg: string | undefined): Promise<Customer | undefined> {
    if (!arg) {
      throw new AppError('A customerId or email must be provided!');
    }

    const customer = await this.customersRepository.findOne(arg);

    return customer;
  }
}

export default ListOneCustomerService;
