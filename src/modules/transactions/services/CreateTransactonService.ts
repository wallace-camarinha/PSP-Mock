import ICreateTransaction from '../dtos/ICreateTransaction';
import ITransaction from '../dtos/ITransaction';
import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

const transactionsRepository = new TransactionsRepository();

class CreateTransactionService {
  async execute(payload: ICreateTransaction): Promise<ITransaction> {
    const createdTransaction = transactionsRepository.create(payload);
    return createdTransaction;
  }
}

export default CreateTransactionService;
