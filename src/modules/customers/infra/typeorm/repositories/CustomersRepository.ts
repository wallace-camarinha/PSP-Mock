import { getRepository, Repository } from 'typeorm';
import { v4 as uuid, validate } from 'uuid';

import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create(payload: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      id: uuid(),
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

  public async findOne(arg: string): Promise<Customer | undefined> {
    let customer: Customer | undefined;
    const isUuid = validate(arg);

    if (isUuid) {
      customer = await this.ormRepository.findOne({ where: { id: arg } });
      return customer;
    }

    customer = await this.ormRepository.findOne({ where: { email: arg } });
    return customer;
  }
}

export default CustomersRepository;
