import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Payable from '../infra/typeorm/entities/Payable';

export default interface IPayablesRepository {
  create(transaction: Transaction): Promise<Payable>;
  findAll(merchantId: string): Promise<Payable[]>;
  findById(transactionId: string): Promise<Payable | undefined>;
}
