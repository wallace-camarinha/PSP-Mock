import { Request, Response } from 'express';
import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import CreateTransactionService from '@modules/transactions/services/CreateTransactonService';
import ListOneTransactionsService from '@modules/transactions/services/ListOneTransactionService';
import ListAllTransactionsService from '@modules/transactions/services/ListAllTransactionsService';

const createTransactionService = new CreateTransactionService();
const listOneTransactionService = new ListOneTransactionsService();
const listAllTransactionsService = new ListAllTransactionsService();

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const payload: ICreateTransaction = req.body;
    const transaction = await createTransactionService.execute(payload);

    return res.json(transaction);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const transaction = await listOneTransactionService.execute(id);

    return res.json(transaction);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const { merchantId } = req.params;
    const transactions = await listAllTransactionsService.execute(merchantId);

    return res.json(transactions);
  }
}
