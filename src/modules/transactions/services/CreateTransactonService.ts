import { getCustomRepository } from 'typeorm';
import ICreateTransaction from '../dtos/ICreateTransaction';
import ITransaction from '../dtos/ITransaction';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

class CreateTransactionService {
  async execute(payload: ICreateTransaction): Promise<ITransaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionsRepository.create(payload);

    return transaction;
  }
}

export default CreateTransactionService;
