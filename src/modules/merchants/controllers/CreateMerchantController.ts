import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import CreateMerchantService from '@modules/merchants/services/CreateMerchantService';

export class CreateMerchantController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const createMerchantService = container.resolve(CreateMerchantService);

    const payload: ICreateMerchant = req.body;
    const merchant = await createMerchantService.execute(payload);

    return res.json(merchant);
  }
}
