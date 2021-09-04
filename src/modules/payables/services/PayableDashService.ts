import getMerchant from '@shared/utils/getMerchant';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IPayablesDash from '../dtos/IPayablesDash';
import PayablesRepository from '../infra/typeorm/repositories/PayablesRepository';
import sumAmounts from '../utils/sumAmounts';

class PayableDashService {
  async execute(merchantId: string): Promise<IPayablesDash> {
    const payablesRepository = getCustomRepository(PayablesRepository);
    const payables = await payablesRepository.findAll(merchantId);
    const merchant = await getMerchant(merchantId);

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
