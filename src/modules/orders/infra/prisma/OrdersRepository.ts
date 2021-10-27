import ICreateOrder from '@modules/orders/dtos/ICreateOrder';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import { Order, prismaClient } from '@shared/infra/prisma/prismaClient';

class OrdersRepository implements IOrdersRepository {
  async create(payload: ICreateOrder): Promise<Order> {
    const cardNumber = payload.payment.card_number;
    const maskedCardNumber = `${cardNumber.slice(
      0,
      6,
    )}********${cardNumber.slice(-4)}`;

    const order = await prismaClient.order.create({
      include: {
        merchant: true,
        customer: true,
      },
      data: {
        amount: payload.amount,
        description: payload.description,
        payment_method: payload.payment_method,
        card_number: maskedCardNumber,
        cardholder_name: payload.payment.cardholder_name,
        exp_date: payload.payment.exp_date,
        cvv: payload.payment.cvv,
        status: 'approved',
        customer_id: payload.customer.id!,
        merchant_id: payload.merchant_id,
      },
    });

    return order;
  }

  async findAll(merchantId: string): Promise<Order[] | undefined> {
    const orders = await prismaClient.order.findMany({
      where: { merchant_id: merchantId },
      include: {
        merchant: true,
        customer: true,
      },
    });

    return orders;
  }

  async findById(orderId: string): Promise<Order | undefined> {
    const order =
      (await prismaClient.order.findFirst({
        where: { id: orderId },
        include: {
          merchant: true,
          customer: true,
        },
      })) || undefined;

    return order;
  }
}

export { OrdersRepository };
