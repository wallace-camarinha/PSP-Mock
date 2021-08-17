import { Router } from 'express';
import CustomersController from '../controllers/CustomersControllers';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post('/', customersController.create);
customersRouter.get('/:id', customersController.listOne);
customersRouter.get('/', customersController.listAll);

export default customersRouter;