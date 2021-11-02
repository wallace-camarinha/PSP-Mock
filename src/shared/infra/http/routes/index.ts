import { Router } from 'express';

import ordersRouter from '@shared/infra/http/routes/orders.routes';
import customersRouter from '@shared/infra/http/routes/customers.routes';
import merchantsRouter from '@shared/infra/http/routes/merchants.routes';
import payablesRouter from '@shared/infra/http/routes/payables.routes';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/customers', customersRouter);
routes.use('/merchants', merchantsRouter);
routes.use('/payables', payablesRouter);

export { routes };
