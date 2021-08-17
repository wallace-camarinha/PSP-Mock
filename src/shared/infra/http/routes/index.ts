import { Router } from 'express';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/customers', customersRouter);

export default routes;
