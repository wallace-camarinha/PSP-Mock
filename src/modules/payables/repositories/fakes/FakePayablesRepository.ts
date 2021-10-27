import { v4 as uuid } from 'uuid';

import calculatePaymentDate from '@modules/payables/utils/calculatePaylmentDate';
import calculateFee from '@modules/payables/utils/calculateFee';

import { Payable, Order } from '@shared/infra/prisma/prismaClient';
import IPayablesRepository from '../IPayablesRepository';

class FakePayablesRepository implements IPayablesRepository {
  private payables: Payable[] = [];

  public async create(payload: Order): Promise<Payable> {
    const paymentMethod = payload.payment_method;

    const payable: Payable = {
      id: uuid(),
      amount: calculateFee(payload.amount, payload.payment_method),
      order_id: payload.id,
      order_amount: payload.amount,
      payment_method: payload.payment_method,
      merchant_id: payload.merchant_id,
      status: paymentMethod === 'credit_card' ? 'waiting_funds' : 'paid',
      fee: paymentMethod === 'credit_card' ? 0.05 : 0.03,
      payment_date: calculatePaymentDate(paymentMethod, payload.created_at),
      created_at: new Date(),
    };

    this.payables.push(payable);

    return payable;
  }

  public async findAll(merchantId: string): Promise<Payable[]> {
    const payables = this.payables.filter(
      payable => payable.merchant_id === merchantId,
    );

    return payables;
  }

  public async findByOrderId(id: string): Promise<Payable | undefined> {
    const findPayable = this.payables.find(payable => payable.id === id);

    return findPayable;
  }
}

export default FakePayablesRepository;
