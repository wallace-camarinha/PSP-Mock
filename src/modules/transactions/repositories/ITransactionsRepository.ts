import ICreateTransaction from '../dtos/ICreateTransaction';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionsRepository {
  create(payload: ICreateTransaction): Promise<Transaction>;
  findAll(merchantId: string): Promise<Transaction[] | undefined>;
  findById(transactionId: string): Promise<Transaction | undefined>;
}
