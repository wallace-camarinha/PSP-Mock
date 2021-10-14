import Order from '@modules/orders/infra/typeorm/entities/Order';
import Payable from '../infra/typeorm/entities/Payable';

export default interface IPayablesRepository {
  create(order: Order): Promise<Payable>;
  findAll(merchantId: string): Promise<Payable[]>;
  findById(orderId: string): Promise<Payable | undefined>;
}
