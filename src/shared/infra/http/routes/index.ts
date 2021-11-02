import { Router } from 'express';

import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import customersRouter from '@shared/infra/http/routes/customers.routes';
import merchantsRouter from '@modules/merchants/infra/http/routes/merchants.routes';
import payablesRouter from '@modules/payables/infra/http/routes/payables.routes';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/customers', customersRouter);
routes.use('/merchants', merchantsRouter);
routes.use('/payables', payablesRouter);

export { routes };
