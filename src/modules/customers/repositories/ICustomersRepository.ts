import { Customer } from '@shared/infra/prisma/prismaClient';
import ICreateCustomer from '../dtos/ICreateCustomer';

export default interface ICustomersRepository {
  create(payload: ICreateCustomer): Promise<Customer>;
  findAll(): Promise<Customer[] | undefined>;
  findOne(customerId: string): Promise<Customer | undefined>;
}
