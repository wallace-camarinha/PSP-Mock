import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateCustomer from '../dtos/ICreateCustomer';
import CreateCustomerService from '../services/CreateCustomerService';

export class CreateCustomerController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);

    const payload: ICreateCustomer = req.body;
    const customer = await createCustomer.execute(payload);

    return res.json(customer);
  }
}
