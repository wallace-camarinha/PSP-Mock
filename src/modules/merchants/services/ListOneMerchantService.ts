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
    documentNumber?: string,
    merchantId?: string,
  ): Promise<Merchant | undefined> {
    let isUuid: boolean;

    if (merchantId !== undefined) {
      isUuid = validate(merchantId);
      if (!isUuid) {
        throw new AppError('Invalid merchant_id!', 400);
      }
    }

    let arg = merchantId;
    if (!arg) {
      arg = documentNumber;
    }

    const merchant = await this.merchantsRepository.findOne(arg);

    if (!merchant) {
      throw new AppError('Merchant not found!', 404);
    }

    return merchant;
  }
}

export default ListOneMerchantService;
