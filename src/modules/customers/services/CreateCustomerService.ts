import { getCustomRepository } from 'typeorm';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICreateCustomer from '../dtos/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';

class CreateCustomerService {
  async execute(payload: ICreateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.create(payload);

    return customer;
  }
}

export default CreateCustomerService;
