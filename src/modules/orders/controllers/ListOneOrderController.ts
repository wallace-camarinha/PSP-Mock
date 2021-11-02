import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOneOrdersService from '../services/ListOneOrderService';

export class ListOneOrderController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listOneOrderService = container.resolve(ListOneOrdersService);

    const { id } = req.params;
    const order = await listOneOrderService.execute(id);

    return res.json(order);
  }
}
