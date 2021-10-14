import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
class ListAllOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(merchantId: string): Promise<Order[] | undefined> {
    if (!merchantId) {
      throw new AppError('Invalid merchant id', 402);
    }
    const orders = await this.ordersRepository.findAll(merchantId);
    return orders;
  }
}

export default ListAllOrdersService;
