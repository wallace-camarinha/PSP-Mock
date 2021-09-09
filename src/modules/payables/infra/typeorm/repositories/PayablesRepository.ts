import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import calculatePaymentDate from '@modules/payables/utils/calculatePaylmentDate';
import calculateFee from '@modules/payables/utils/calculateFee';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';
import Payable from '../entities/Payable';

@EntityRepository(Payable)
class PayablesRepository implements IPayablesRepository {
  private ormRepository: Repository<Payable>;

  constructor() {
    this.ormRepository = getRepository(Payable);
  }

  public async create(transaction: Transaction): Promise<Payable> {
    const paymentMethod = transaction.payment_method;
    const payable = this.ormRepository.create({
      id: uuid(),
      amount: calculateFee(transaction.amount, transaction.payment_method),
      transaction_id: transaction.id,
      transaction_amount: transaction.amount,
      payment_method: transaction.payment_method,
      merchant_id: transaction.merchant_id,
      merchant_name: transaction.merchant_name,
      status: paymentMethod === 'credit_card' ? 'waiting_funds' : 'paid',
      fee: paymentMethod === 'credit_card' ? 0.05 : 0.03,
      payment_date: calculatePaymentDate(paymentMethod, transaction.created_at),
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
