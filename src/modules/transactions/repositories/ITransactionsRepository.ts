import ICreateTransaction from '../dtos/ICreateTransaction';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransaction from '../dtos/ITransaction';

export default interface ITransactionsRepository {
  create(payload: ICreateTransaction): Promise<ITransaction>;
  findAll(merchantId: string): Promise<Transaction[] | undefined>;
  findById(transactionId: string): Promise<Transaction | undefined>;
}
