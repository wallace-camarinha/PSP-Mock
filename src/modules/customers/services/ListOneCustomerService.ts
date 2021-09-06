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
    let customer: Customer | undefined;

    if (customerId) {
      customer = await this.customersRepository.findById(customerId);
    }

    if (email) {
      customer = await this.customersRepository.findByEmail(email);
    }

    return customer;
  }
}

export default ListOneCustomerService;
