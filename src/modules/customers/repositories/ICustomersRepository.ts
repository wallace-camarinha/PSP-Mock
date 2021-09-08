import ICreateCustomer from '../dtos/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
  create(payload: ICreateCustomer): Promise<Customer>;
  findAll(): Promise<Customer[] | undefined>;
  findOne(customerId: string | undefined): Promise<Customer | undefined>;
}
