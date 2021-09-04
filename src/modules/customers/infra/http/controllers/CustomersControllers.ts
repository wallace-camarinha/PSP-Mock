import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListAllCustomersService from '@modules/customers/services/ListAllCustomersService';
import ListOneCustomerService from '@modules/customers/services/ListOneCustomerService';

import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';

const createCustomer = container.resolve(CreateCustomerService);
// const listOneCustomer = container.resolve(ListOneCustomerService);
// const listAllCustomers = container.resolve(ListAllCustomersService);

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const payload: ICreateCustomer = req.body;
    const customer = await createCustomer.execute(payload);

    return res.json(customer);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.body;
    const customer = await listOneCustomer.execute(id, email);

    return res.json(customer);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const customers = await listAllCustomers.execute();

    return res.json(customers);
  }
}
