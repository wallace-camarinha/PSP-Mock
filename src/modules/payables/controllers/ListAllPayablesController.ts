import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllPayablesService from '../services/ListOnePayableService';

export class ListAllPayableController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listOnePayablesService = container.resolve(ListAllPayablesService);

    const { id } = req.params;
    const payable = await listOnePayablesService.execute(id);

    return res.json(payable);
  }
}
