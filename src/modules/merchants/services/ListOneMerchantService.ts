import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';
import Merchant from '../infra/typeorm/entities/Merchant';
import IMerchantsRepository from '../repositories/IMerchantsRepository';

@injectable()
class ListOneMerchantService {
  constructor(
    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,
  ) {}

  async execute(
    merchantId?: string,
    documentNumber?: string,
  ): Promise<Merchant | undefined> {
    let arg = merchantId;
    if (!arg) {
      arg = documentNumber;
    }

    if (merchantId) {
      const isUuid = validate(merchantId);
      if (!isUuid) {
        throw new AppError('Invalid merchant_id!', 400);
      }
    }

    const merchant = await this.merchantsRepository.findOne(arg);

    return merchant;
  }
}

export default ListOneMerchantService;
