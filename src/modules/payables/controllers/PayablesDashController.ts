import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PayableDashService from '../services/PayablesDashService';

export class PayablesDashController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const payableDashService = container.resolve(PayableDashService);

    const { merchant_id } = req.body;
    const payableDash = await payableDashService.execute(merchant_id);

    return res.json(payableDash);
  }
}
