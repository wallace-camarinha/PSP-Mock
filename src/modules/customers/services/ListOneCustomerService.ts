import { inject, injectable } from 'tsyringe';

import { Customer } from '@shared/infra/prisma/prismaClient';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListOneCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(arg: string): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findOne(arg);

    return customer;
  }
}

export default ListOneCustomerService;
