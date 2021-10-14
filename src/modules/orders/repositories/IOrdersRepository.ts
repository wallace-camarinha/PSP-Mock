import ICreateOrder from '../dtos/ICreateOrder';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersRepository {
  create(payload: ICreateOrder): Promise<Order>;
  findAll(merchantId: string): Promise<Order[] | undefined>;
  findById(orderId: string): Promise<Order | undefined>;
}
