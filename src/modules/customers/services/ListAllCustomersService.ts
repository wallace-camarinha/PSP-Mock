import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class ListAllCustomersService {
  async execute(): Promise<Customer[] | undefined> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = await customersRepository.findAll();
    return customers;
  }
}

export default ListAllCustomersService;
