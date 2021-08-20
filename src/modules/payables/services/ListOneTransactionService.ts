import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

class ListOneTransactionsService {
  async execute(merchantId: string): Promise<Transaction | undefined> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionsRepository.findById(merchantId);
    return transaction;
  }
}

export default ListOneTransactionsService;
