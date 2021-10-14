import { v4 as uuid } from 'uuid';

import calculatePaymentDate from '@modules/payables/utils/calculatePaylmentDate';
import calculateFee from '@modules/payables/utils/calculateFee';

import Payable from '@modules/payables/infra/typeorm/entities/Payable';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IPayablesRepository from '../IPayablesRepository';

class FakePayablesRepository implements IPayablesRepository {
  private payables: Payable[] = [];

  public async create(payload: Order): Promise<Payable> {
    const payable: Payable = new Payable();
    const paymentMethod = payload.payment_method;

    Object.assign(payable, {
      id: uuid(),
      amount: calculateFee(payload.amount, payload.payment_method),
      order_id: payload.id,
      order_amount: payload.amount,
      payment_method: payload.payment_method,
      merchant_id: payload.merchant_id,
      merchant_name: payload.merchant_name,
      status: paymentMethod === 'credit_card' ? 'waiting_funds' : 'paid',
      fee: paymentMethod === 'credit_card' ? 0.05 : 0.03,
      payment_date: calculatePaymentDate(paymentMethod, payload.created_at),
      created_at: new Date(),
    });

    this.payables.push(payable);

    return payable;
  }

  public async findAll(merchantId: string): Promise<Payable[]> {
    const payables = this.payables.filter(
      payable => payable.merchant_id === merchantId,
    );

    return payables;
  }

  public async findById(id: string): Promise<Payable | undefined> {
    const findPayable = this.payables.find(payable => payable.id === id);

    return findPayable;
  }
}

export default FakePayablesRepository;
