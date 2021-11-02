import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOneMerchantService from '@modules/merchants/services/ListOneMerchantService';

export class ListOneMerchantsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listOneMerchantService = container.resolve(ListOneMerchantService);

    const { merchantId, cnpj: documentNumber } = req.query;

    const merchant = await listOneMerchantService.execute(
      merchantId?.toString() || documentNumber?.toString(),
    );

    return res.json(merchant);
  }
}
