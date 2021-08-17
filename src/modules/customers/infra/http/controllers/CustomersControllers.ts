import ICreateCustomer from '@modules/customers/dtos/ICreateCustomer';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListAllCustomersService from '@modules/customers/services/ListAllCustomersService';
import ListOneCustomerService from '@modules/customers/services/ListOneCustomerService';
import { Request, Response } from 'express';

const createCustomerService = new CreateCustomerService();
const listOneCustomerService = new ListOneCustomerService();
const listAllCustomerService = new ListAllCustomersService();

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const payload: ICreateCustomer = req.body;
    const customer = await createCustomerService.execute(payload);

    return res.json(customer);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const customer = await listOneCustomerService.execute(id);

    return res.json(customer);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const customers = await listAllCustomerService.execute();

    return res.json(customers);
  }
}
