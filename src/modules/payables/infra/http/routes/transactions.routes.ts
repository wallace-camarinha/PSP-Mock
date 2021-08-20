import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.post('/', transactionsController.create);
transactionsRouter.get('/:id', transactionsController.listOne);
transactionsRouter.get('/', transactionsController.listAll);

export default transactionsRouter;
