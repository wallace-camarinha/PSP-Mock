import { Router } from 'express';

import { CreateCustomerController } from '@modules/customers/controllers/CreateCustomerController';
import { ListOneCustomerController } from '@modules/customers/controllers/ListOneCustomerController';
import { ListAllCustomersController } from '@modules/customers/controllers/ListAllCustomersController';

const customersRouter = Router();

const createCustomer = new CreateCustomerController();
const listOneCustomer = new ListOneCustomerController();
const listAllCustomers = new ListAllCustomersController();

customersRouter.post('/', createCustomer.handle);
customersRouter.get('/', listOneCustomer.handle);
customersRouter.get('/list', listAllCustomers.handle);

export default customersRouter;
