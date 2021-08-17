import ICreateCustomer from '../dtos/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
  create(payload: ICreateCustomer): Promise<Customer>;
  findAll(): Promise<Customer[] | undefined>;
  findById(customerId: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
}
