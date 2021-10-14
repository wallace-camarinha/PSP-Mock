import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import ICreateOrder from '@modules/orders/dtos/ICreateOrder';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import Order from '../entities/Order';

@EntityRepository(Order)
class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(payload: ICreateOrder): Promise<Order> {
    const cardNumber = payload.payment.card_number;
    const maskedCardNumber = `${cardNumber.slice(
      0,
      6,
    )}********${cardNumber.slice(-4)}`;

    const order = this.ormRepository.create({
      id: uuid(),
      customer_id: payload.customer.id,
      merchant_id: payload.merchant_id,
      merchant_name: payload.merchant_name,
      amount: payload.amount,
      description: payload.description,
      payment_method: payload.payment_method,
      card_number: maskedCardNumber,
      cardholder_name: payload.payment.cardholder_name,
      exp_date: payload.payment.exp_date,
      cvv: payload.payment.cvv,
      status: 'approved',
      created_at: new Date(),
    });
    await this.ormRepository.save(order);

    return order;
  }

  public async findAll(merchantId: string): Promise<Order[] | undefined> {
    const merchantOrders = this.ormRepository.find({
      where: { merchant_id: merchantId },
    });

    return merchantOrders;
  }

  public async findById(orderId: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(orderId);

    return order;
  }
}

export default OrdersRepository;
