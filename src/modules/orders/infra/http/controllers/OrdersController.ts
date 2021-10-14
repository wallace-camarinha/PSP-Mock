import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateOrder from '@modules/orders/dtos/ICreateOrder';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOneOrdersService from '@modules/orders/services/ListOneOrderService';
import ListAllOrdersService from '@modules/orders/services/ListAllOrdersService';

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createOrderService = container.resolve(CreateOrderService);

    const payload: ICreateOrder = req.body;
    const order = await createOrderService.execute(payload);

    return res.json(order);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const listOneOrderService = container.resolve(ListOneOrdersService);
    const { id } = req.params;
    const order = await listOneOrderService.execute(id);

    return res.json(order);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllOrdersService = container.resolve(ListAllOrdersService);

    const { merchant_id } = req.body;
    const orders = await listAllOrdersService.execute(merchant_id);

    return res.json(orders);
  }
}
