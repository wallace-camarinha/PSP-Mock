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

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(customer => customer.id === id);

    return findCustomer;
  }

  public async findByEmail(cnpj: string): Promise<Customer | undefined> {
    const findMerchant = this.customers.find(
      customer => customer.email === cnpj,
    );

    return findMerchant;
  }
}

export default FakeCustomersRepository;
