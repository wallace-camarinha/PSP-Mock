import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validate } from 'uuid';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListAllCustomersService from '@modules/customers/services/ListAllCustomersService';
import ListOneCustomerService from '@modules/customers/services/ListOneCustomerService';

import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import AppError from '@shared/errors/AppError';

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);

    const payload: ICreateCustomer = req.body;
    const customer = await createCustomer.execute(payload);

    return res.json(customer);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const listOneCustomer = container.resolve(ListOneCustomerService);

    const { customer_id: id, email } = req.body;
    const isUuid = validate(id);
    if (id !== undefined && !isUuid) {
      throw new AppError('Invalid customer_id!', 400);
    }

    const customer = await listOneCustomer.execute(id, email);

    if (!customer) {
      throw new AppError('Customer not found!', 404);
    }

    return res.json(customer);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllCustomers = container.resolve(ListAllCustomersService);

    const customers = await listAllCustomers.execute();

    return res.json(customers);
  }
}
