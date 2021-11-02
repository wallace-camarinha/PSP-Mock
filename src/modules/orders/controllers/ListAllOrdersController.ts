import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllOrdersService from '../services/ListAllOrdersService';

export class ListAllOrdersController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllOrdersService = container.resolve(ListAllOrdersService);

    const { merchant_id } = req.body;
    const orders = await listAllOrdersService.execute(merchant_id);

    return res.json(orders);
  }
}
