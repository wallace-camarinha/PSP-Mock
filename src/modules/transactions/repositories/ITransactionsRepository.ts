import ICreateTransaction from '../dtos/ICreateTransaction';
import ITransaction from '../dtos/ITransaction';

export default interface ITransactionsRepository {
  create(data: ICreateTransaction): Promise<ITransaction>;
  findAll(merchantKey: string): Promise<ITransaction[]>;
  findById(transactionId: string): Promise<ITransaction>;
}
