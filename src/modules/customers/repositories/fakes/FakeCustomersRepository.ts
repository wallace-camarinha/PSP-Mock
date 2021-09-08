import { v4 as uuid } from 'uuid';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import ICustomersRepository from '../ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create(payload: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, {
      id: uuid(),
      name: payload.name,
      email: payload.email,
    });

    this.customers.push(customer);

    return customer;
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findOne(arg: string): Promise<Customer | undefined> {
    let findCustomer = this.customers.find(customer => customer.id === arg);

    if (!findCustomer) {
      findCustomer = this.customers.find(customer => customer.email === arg);
    }

    return findCustomer;
  }
}

export default FakeCustomersRepository;
