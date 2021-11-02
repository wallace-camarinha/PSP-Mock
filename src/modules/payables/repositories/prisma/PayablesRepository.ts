import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';
import {
  Payable,
  Order,
  prismaClient,
} from '@shared/infra/prisma/prismaClient';

import calculateFee from '@modules/payables/utils/calculateFee';
import calculatePaymentDate from '@modules/payables/utils/calculatePaylmentDate';

class PayablesRepository implements IPayablesRepository {
  async create(order: Order): Promise<Payable> {
    const paymentMethod = order.payment_method;

    const payable = prismaClient.payable.create({
      data: {
        amount: calculateFee(order.amount, paymentMethod),
        order_id: order.id,
        order_amount: order.amount,
        payment_method: order.payment_method,
        merchant_id: order.merchant_id,
        status: paymentMethod === 'credit_card' ? 'waiting_funds' : 'paid',
        fee: paymentMethod === 'credit_card' ? 0.05 : 0.03,
        payment_date: calculatePaymentDate(paymentMethod, order.created_at),
        created_at: new Date(),
      },
      include: {
        merchant: true,
      },
    });

    return payable;
  }

  async findAll(merchantId: string): Promise<Payable[]> {
    const payables = await prismaClient.payable.findMany({
      where: {
        merchant_id: merchantId,
      },
      include: {
        merchant: true,
      },
    });

    return payables;
  }

  async findByOrderId(orderId: string): Promise<Payable | undefined> {
    const payable =
      (await prismaClient.payable.findFirst({
        where: {
          order_id: orderId,
        },
        include: {
          merchant: true,
        },
      })) || undefined;

    return payable;
  }
}

export { PayablesRepository };
