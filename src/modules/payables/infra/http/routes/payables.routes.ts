import { Router } from 'express';
import PayablesController from '../controllers/PayablesController';

const payablesRouter = Router();
const payablesController = new PayablesController();

payablesRouter.get('/list', payablesController.listAll);
payablesRouter.get('/dash', payablesController.payablesDash);
payablesRouter.get('/:id', payablesController.listOne);

export default payablesRouter;
