import { Order, Payable } from '@shared/infra/prisma/prismaClient';

export default interface IPayablesRepository {
  create(order: Order): Promise<Payable>;
  findAll(merchantId: string): Promise<Payable[]>;
  findByOrderId(orderId: string): Promise<Payable | undefined>;
}
