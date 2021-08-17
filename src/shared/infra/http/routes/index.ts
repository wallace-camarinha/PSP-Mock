import { Router } from 'express';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import merchantsRouter from '@modules/merchants/infra/http/routes/merchants.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/customers', customersRouter);
routes.use('/merchants', merchantsRouter);

export default routes;
