import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

class ListAllTransactionsService {
  async execute(merchantId: string): Promise<Transaction[] | undefined> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!merchantId) {
      throw new AppError('Invalid merchant id', 402);
    }
    const transactions = await transactionsRepository.findAll(merchantId);
    return transactions;
  }
}

export default ListAllTransactionsService;
