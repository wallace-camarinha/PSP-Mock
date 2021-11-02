import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllMerchantsService from '@modules/merchants/services/ListAllMerchantsService';

export class ListAllMerchantsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllMerchantsService = container.resolve(ListAllMerchantsService);

    const merchants = await listAllMerchantsService.execute();

    return res.json(merchants);
  }
}
