import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCustomersService from '../services/ListAllCustomersService';

export class ListAllCustomersController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllCustomers = container.resolve(ListAllCustomersService);

    const customers = await listAllCustomers.execute();

    return res.json(customers);
  }
}
