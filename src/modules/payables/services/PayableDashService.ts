import { container, inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ListOneMerchantService from '@modules/merchants/services/ListOneMerchantService';
import IPayablesDash from '../dtos/IPayablesDash';
import IPayablesRepository from '../repositories/IPayablesRepository';
import sumAmounts from '../utils/sumAmounts';

@injectable()
class PayableDashService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(merchantId: string): Promise<IPayablesDash> {
    const listOneMerchant = container.resolve(ListOneMerchantService);

    const payables = await this.payablesRepository.findAll(merchantId);
    const merchant = await listOneMerchant.execute(merchantId);

    if (!merchant) {
      throw new AppError('Invalid merchant', 400);
    }

    if (!payables) {
      throw new AppError('There are no payables for this Merchant', 200);
    }

    const amounts = sumAmounts(payables);

    const payableDash: IPayablesDash = {
      merchant_id: merchant.id,
      merchant_name: merchant.name,
      payables: {
        available: {
          amount: amounts.paidAmount,
          transactions_count: amounts.paidCount,
        },
        waiting_funds: {
          amount: amounts.waitingAmount,
          transactions_count: amounts.waitingCount,
        },
      },
    };

    return payableDash;
  }
}

export default PayableDashService;
