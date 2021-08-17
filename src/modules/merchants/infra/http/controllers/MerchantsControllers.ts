import { Request, Response } from 'express';

import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import CreateMerchantService from '@modules/merchants/services/CreateMerchantService';
import ListOneMerchantService from '@modules/merchants/services/ListOneMerchantService';
import ListAllMerchantsService from '@modules/merchants/services/ListAllMerchantsService';

const createMerchantService = new CreateMerchantService();
const listOneMerchantService = new ListOneMerchantService();
const listAllMerchantsService = new ListAllMerchantsService();

export default class MerchantsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const payload: ICreateMerchant = req.body;
    const merchant = await createMerchantService.execute(payload);

    return res.json(merchant);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const merchant = await listOneMerchantService.execute(id);

    return res.json(merchant);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const merchants = await listAllMerchantsService.execute();

    return res.json(merchants);
  }
}
