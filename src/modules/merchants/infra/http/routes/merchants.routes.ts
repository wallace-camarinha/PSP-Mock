import { Router } from 'express';

import CustomersController from '../controllers/MerchantsControllers';

const merchantsRouter = Router();
const customersController = new CustomersController();

merchantsRouter.post('/', customersController.create);
merchantsRouter.get('/', customersController.listOne);
merchantsRouter.get('/list', customersController.listAll);

export default merchantsRouter;
