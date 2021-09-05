import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class ListAllTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(merchantId: string): Promise<Transaction[] | undefined> {
    if (!merchantId) {
      throw new AppError('Invalid merchant id', 402);
    }
    const transactions = await this.transactionsRepository.findAll(merchantId);
    return transactions;
  }
}

export default ListAllTransactionsService;
