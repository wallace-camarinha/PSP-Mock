import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOnePayableService from '../services/ListOnePayableService';

export class ListOnePayableController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listOnePayableService = container.resolve(ListOnePayableService);

    const { id } = req.params;
    const payable = await listOnePayableService.execute(id);

    return res.json(payable);
  }
}
