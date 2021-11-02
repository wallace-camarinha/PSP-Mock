import { Router } from 'express';

import { CreateMerchantController } from '@modules/merchants/controllers/CreateMerchantController';
import { ListOneMerchantsController } from '@modules/merchants/controllers/ListOneMerchantController';
import { ListAllMerchantsController } from '@modules/merchants/controllers/ListAllMerchantsController';

const merchantsRouter = Router();

const createMerchant = new CreateMerchantController();
const listOneMerchant = new ListOneMerchantsController();
const listAllMerchants = new ListAllMerchantsController();

merchantsRouter.post('/', createMerchant.handle);
merchantsRouter.get('/', listOneMerchant.handle);
merchantsRouter.get('/list', listAllMerchants.handle);

export default merchantsRouter;
