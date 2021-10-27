import { v4 as uuid } from 'uuid';

import { Order } from '@shared/infra/prisma/prismaClient';
import ICreateOrder from '@modules/orders/dtos/ICreateOrder';
import IOrdersRepository from '../IOrdersRepository';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create(payload: ICreateOrder): Promise<Order> {
    const cardNumber = payload.payment.card_number;
    const maskedCardNumber = `${cardNumber.slice(
      0,
      6,
    )}********${cardNumber.slice(-4)}`;

    const order: Order = {
      id: uuid(),
      customer_id: payload.customer.id!,
      merchant_id: payload.merchant_id,
      amount: payload.amount,
      description: payload.description,
      payment_method: payload.payment_method,
      card_number: maskedCardNumber,
      cardholder_name: payload.payment.cardholder_name,
      exp_date: payload.payment.exp_date,
      cvv: payload.payment.cvv,
      status: 'approved',
      created_at: new Date(),
    };

    this.orders.push(order);

    return order;
  }

  public async findAll(merchantId: string): Promise<Order[] | undefined> {
    const orders = this.orders.filter(
      order => order.merchant_id === merchantId,
    );

    return orders;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = this.orders.find(order => order.id === id);

    return findOrder;
  }
}

export default FakeOrdersRepository;
