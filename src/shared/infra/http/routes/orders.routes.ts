import { Router } from 'express';

import { CreateOrderController } from '@modules/orders/controllers/CreateOrderController';
import { ListOneOrderController } from '@modules/orders/controllers/ListOneOrderController';
import { ListAllOrdersController } from '@modules/orders/controllers/ListAllOrdersController';

const ordersRouter = Router();

const createOrder = new CreateOrderController();
const listOneOrder = new ListOneOrderController();
const listAllOrders = new ListAllOrdersController();

ordersRouter.post('/', createOrder.handle);
ordersRouter.get('/list', listOneOrder.handle);
ordersRouter.get('/:id', listAllOrders.handle);

export default ordersRouter;
