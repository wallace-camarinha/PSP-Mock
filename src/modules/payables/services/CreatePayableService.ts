import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Payable from '../infra/typeorm/entities/Payable';
import IPayablesRepository from '../repositories/IPayablesRepository';

@injectable()
class CreatePayableService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(transaction: Transaction): Promise<Payable> {
    if (!transaction.merchant_id) {
      throw new AppError('Invalid Merchant', 400);
    }

    const payable = await this.payablesRepository.create(transaction);

    return payable;
  }
}

export default CreatePayableService;
