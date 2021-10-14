import Order from '@modules/orders/infra/typeorm/entities/Order';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
class ListOneOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(merchantId: string): Promise<Order | undefined> {
    const order = await this.ordersRepository.findById(merchantId);
    return order;
  }
}

export default ListOneOrdersService;
