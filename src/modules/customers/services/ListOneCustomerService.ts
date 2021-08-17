import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class ListOneCustomerService {
  async execute(customerId: string): Promise<Customer | undefined> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(customerId);
    return customer;
  }
}

export default ListOneCustomerService;
