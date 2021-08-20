import { Router } from 'express';
import TransactionsController from '../controllers/PayablesController';

const payablesRouter = Router();
const payablesController = new TransactionsController();

payablesRouter.get('/:id', payablesController.listOne);
payablesRouter.get('/', payablesController.listAll);

export default payablesRouter;
