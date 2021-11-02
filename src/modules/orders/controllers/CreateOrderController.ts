import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateOrder from '../dtos/ICreateOrder';
import CreateOrderService from '../services/CreateOrderService';

export class CreateOrderController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const createOrderService = container.resolve(CreateOrderService);

    const payload: ICreateOrder = req.body;
    const order = await createOrderService.execute(payload);

    return res.json(order);
  }
}
