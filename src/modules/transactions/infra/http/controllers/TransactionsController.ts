import { Request, Response } from 'express';
import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import CreateTransactionService from '@modules/transactions/services/CreateTransactonService';

const createTransactionService = new CreateTransactionService();

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const payload: ICreateTransaction = req.body;
    const transaction = await createTransactionService.execute(payload);

    return res.json(transaction);
  }

  // public async list(req: Request, res: Response): Promise<Response> {
  // return res.json(transaction);
  // }
}
