import { Router } from 'express';
import CustomersController from '../controllers/MerchantsControllers';

const merchantsRouter = Router();
const customersController = new CustomersController();

merchantsRouter.post('/', customersController.create);
merchantsRouter.get('/:id', customersController.listOne);
merchantsRouter.get('/', customersController.listAll);

export default merchantsRouter;
