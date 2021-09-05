import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import CreateMerchantService from '@modules/merchants/services/CreateMerchantService';
import ListOneMerchantService from '@modules/merchants/services/ListOneMerchantService';
import ListAllMerchantsService from '@modules/merchants/services/ListAllMerchantsService';

export default class MerchantsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createMerchantService = container.resolve(CreateMerchantService);

    const payload: ICreateMerchant = req.body;
    const merchant = await createMerchantService.execute(payload);

    return res.json(merchant);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const listOneMerchantService = container.resolve(ListOneMerchantService);

    const { id, cnpj: documentNumber } = req.body;
    const merchant = await listOneMerchantService.execute(id, documentNumber);

    return res.json(merchant);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllMerchantsService = container.resolve(ListAllMerchantsService);

    const merchants = await listAllMerchantsService.execute();

    return res.json(merchants);
  }
}
