import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import { inject, injectable } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class ListOneTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(merchantId: string): Promise<Transaction | undefined> {
    const transaction = await this.transactionsRepository.findById(merchantId);
    return transaction;
  }
}

export default ListOneTransactionsService;
