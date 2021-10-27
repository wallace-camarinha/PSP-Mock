import { v4 as uuid } from 'uuid';

import { Customer } from '@shared/infra/prisma/prismaClient';
import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import ICustomersRepository from '../ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create(payload: ICreateCustomer): Promise<Customer> {
    const customer: Customer = {
      id: uuid(),
      name: payload.name,
      email: payload.email,
      document: null,
      type: null,
      created_at: new Date(),
    };

    this.customers.push(customer);

    return customer;
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findOne(arg: string): Promise<Customer | undefined> {
    let findCustomer =
      this.customers.find(customer => customer.id === arg) || undefined;

    if (!findCustomer) {
      findCustomer =
        this.customers.find(customer => customer.email === arg) || undefined;
    }

    return findCustomer;
  }
}

export default FakeCustomersRepository;
