import { Router } from 'express';

import { ListOnePayableController } from '@modules/payables/controllers/ListOnePayableController';
import { ListAllPayableController } from '@modules/payables/controllers/ListAllPayablesController';
import { PayablesDashController } from '@modules/payables/controllers/PayablesDashController';

const payablesRouter = Router();

const listOnePayable = new ListOnePayableController();
const listAllPayables = new ListAllPayableController();
const payablesDash = new PayablesDashController();

payablesRouter.get('/:id', listOnePayable.handle);
payablesRouter.get('/list', listAllPayables.handle);
payablesRouter.get('/dash', payablesDash.handle);

export default payablesRouter;
