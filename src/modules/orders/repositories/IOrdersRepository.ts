import { Order } from '@shared/infra/prisma/prismaClient';
import ICreateOrder from '../dtos/ICreateOrder';

export default interface IOrdersRepository {
  create(payload: ICreateOrder): Promise<Order>;
  findAll(merchantId: string): Promise<Order[] | undefined>;
  findById(orderId: string): Promise<Order | undefined>;
}
