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
    const { id } = req.body;
    const transaction = await listOneTransactionService.execute(id);

    return res.json(transaction);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const { merchant_id } = req.body;
    const transactions = await listAllTransactionsService.execute(merchant_id);

    return res.json(transactions);
  }
}
