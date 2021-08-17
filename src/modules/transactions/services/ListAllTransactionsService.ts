import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

class ListAllTransactionsService {
  async execute(merchantId: string): Promise<Transaction[] | undefined> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const createdTransaction = await transactionsRepository.findAll(merchantId);
    return createdTransaction;
  }
}

export default ListAllTransactionsService;
