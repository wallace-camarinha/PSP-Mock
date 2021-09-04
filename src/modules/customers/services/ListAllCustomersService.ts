import { inject, injectable } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(): Promise<Customer[] | undefined> {
    const customers = await this.customersRepository.findAll();
    return customers;
  }
}

export default ListAllCustomersService;
