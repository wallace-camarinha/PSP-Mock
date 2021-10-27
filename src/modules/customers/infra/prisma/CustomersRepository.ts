import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import { prismaClient, Customer } from '@shared/infra/prisma/prismaClient';
import { validate } from 'uuid';

class CustomersRepository implements ICustomersRepository {
  async create({
    email,
    name,
    document,
    type,
  }: ICreateCustomer): Promise<Customer> {
    const customer = await prismaClient.customer.create({
      data: {
        email,
        name,
        document,
        type,
      },
    });

    return customer;
  }

  async findAll(): Promise<Customer[] | undefined> {
    const customers = await prismaClient.customer.findMany();

    return customers;
  }

  async findOne(arg: string): Promise<Customer | undefined> {
    let customer: Customer | undefined;

    const isUuid = validate(arg);

    if (isUuid) {
      customer =
        (await prismaClient.customer.findFirst({
          where: { id: arg },
        })) || undefined;

      return customer;
    }

    customer =
      (await prismaClient.customer.findFirst({
        where: { email: arg },
      })) || undefined;

    return customer;
  }
}

export { CustomersRepository };
