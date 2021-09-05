import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import ListOneTransactionsService from '@modules/transactions/services/ListOneTransactionService';
import ListAllTransactionsService from '@modules/transactions/services/ListAllTransactionsService';

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createTransactionService = container.resolve(
      CreateTransactionService,
    );

    const payload: ICreateTransaction = req.body;
    const transaction = await createTransactionService.execute(payload);

    return res.json(transaction);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const listOneTransactionService = container.resolve(
      ListOneTransactionsService,
    );
    const { id } = req.params;
    const transaction = await listOneTransactionService.execute(id);

    return res.json(transaction);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllTransactionsService = container.resolve(
      ListAllTransactionsService,
    );

    const { merchant_id } = req.body;
    const transactions = await listAllTransactionsService.execute(merchant_id);

    return res.json(transactions);
  }
}
