import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import calculatePaymentDate from '@modules/payables/utils/calculatePaylmentDate';
import calculateFee from '@modules/payables/utils/calculateFee';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';
import Payable from '../entities/Payable';

@EntityRepository(Payable)
class PayablesRepository implements IPayablesRepository {
  private ormRepository: Repository<Payable>;

  constructor() {
    this.ormRepository = getRepository(Payable);
  }

  public async create(order: Order): Promise<Payable> {
    const paymentMethod = order.payment_method;
    const payable = this.ormRepository.create({
      id: uuid(),
      amount: calculateFee(order.amount, order.payment_method),
      order_id: order.id,
      order_amount: order.amount,
      payment_method: order.payment_method,
      merchant_id: order.merchant_id,
      merchant_name: order.merchant_name,
      status: paymentMethod === 'credit_card' ? 'waiting_funds' : 'paid',
      fee: paymentMethod === 'credit_card' ? 0.05 : 0.03,
      payment_date: calculatePaymentDate(paymentMethod, order.created_at),
      created_at: new Date(),
    });
    await this.ormRepository.save(payable);

    return payable;
  }

  public async findAll(merchantId: string): Promise<Payable[]> {
    const merchantPayables = this.ormRepository.find({
      where: { merchant_id: merchantId },
    });

    return merchantPayables;
  }

  public async findById(payableId: string): Promise<Payable | undefined> {
    const payable = this.ormRepository.findOne(payableId);

    return payable;
  }
}

export default PayablesRepository;
