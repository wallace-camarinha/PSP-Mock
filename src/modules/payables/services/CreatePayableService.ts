import AppError from 'errors/AppError';
import { getCustomRepository } from 'typeorm';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Payable from '../infra/typeorm/entities/Payable';
import PayablesRepository from '../infra/typeorm/repositories/PayablesRepository';

class CreatePayableService {
  async execute(transaction: Transaction): Promise<Payable> {
    const payablesRepository = getCustomRepository(PayablesRepository);

    if (!transaction.merchant_id) {
      throw new AppError('Invalid Merchant', 400);
    }

    const payable = await payablesRepository.create(transaction);

    return payable;
  }
}

export default CreatePayableService;
