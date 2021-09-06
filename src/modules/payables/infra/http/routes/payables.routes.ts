import { Router } from 'express';
import TransactionsController from '../controllers/PayablesController';

const payablesRouter = Router();
const payablesController = new TransactionsController();

payablesRouter.get('/list', payablesController.listAll);
payablesRouter.get('/dash', payablesController.payablesDash);
payablesRouter.get('/:id', payablesController.listOne);

export default payablesRouter;
