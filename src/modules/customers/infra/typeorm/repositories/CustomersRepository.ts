import { EntityRepository, getRepository, Repository } from 'typeorm';

import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create(payload: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name: payload.name,
      email: payload.email,
      type: payload.type,
      document: payload.document,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async findAll(): Promise<Customer[] | undefined> {
    const merchantTransactions = await this.ormRepository.find();

    return merchantTransactions;
  }

  public async findById(customerId: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne(customerId);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { email } });

    return customer;
  }
}

export default CustomersRepository;
