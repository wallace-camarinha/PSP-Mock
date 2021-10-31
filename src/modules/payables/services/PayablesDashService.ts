import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import IPayablesDash from '../dtos/IPayablesDash';
import IPayablesRepository from '../repositories/IPayablesRepository';
import sumAmounts from '../utils/sumAmounts';

@injectable()
class PayableDashService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,

    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,
  ) {}

  async execute(merchantId: string): Promise<IPayablesDash> {
    const merchant = await this.merchantsRepository.findOne(merchantId);

    if (!merchant) {
      throw new AppError('Merchant not found!', 400);
    }

    const payables = await this.payablesRepository.findAll(merchantId);

    const amounts = sumAmounts(payables);

    const payableDash: IPayablesDash = {
      merchant_id: merchant.id,
      merchant_name: merchant.name,
      payables: {
        available: {
          amount: amounts.paidAmount,
          orders_count: amounts.paidCount,
        },
        waiting_funds: {
          amount: amounts.waitingAmount,
          orders_count: amounts.waitingCount,
        },
      },
    };

    return payableDash;
  }
}

export default PayableDashService;
