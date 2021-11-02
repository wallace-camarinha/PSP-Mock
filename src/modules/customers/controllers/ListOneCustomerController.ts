import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOneCustomerService from '../services/ListOneCustomerService';

interface ListOneRequest {
  customerId?: string;
  email?: string;
}

export class ListOneCustomerController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listOneCustomer = container.resolve(ListOneCustomerService);

    const { customerId: id, email } = req.query as ListOneRequest;

    const customer = await listOneCustomer.execute(id || email);
    return res.json(customer);
  }
}
