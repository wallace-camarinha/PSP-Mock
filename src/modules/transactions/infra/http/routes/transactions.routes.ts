import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.post('/', transactionsController.create);
transactionsRouter.get('/list', transactionsController.listAll);
transactionsRouter.get('/:id', transactionsController.listOne);

export default transactionsRouter;
