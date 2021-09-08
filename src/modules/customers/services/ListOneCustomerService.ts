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
    customerId?: string,
    email?: string,
  ): Promise<Customer | undefined> {
    let arg = customerId;
    if (!arg) {
      arg = email;
    }

    const customer = await this.customersRepository.findOne(arg);

    return customer;
  }
}

export default ListOneCustomerService;
