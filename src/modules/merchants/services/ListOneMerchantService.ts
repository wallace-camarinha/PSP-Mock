import { inject, injectable } from 'tsyringe';

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
    cnpj?: string,
    merchantId?: string,
  ): Promise<Merchant | undefined> {
    let arg = merchantId;
    if (!arg) {
      arg = cnpj;
    }

    const merchant = await this.merchantsRepository.findOne(arg);

    if (!merchant) {
      throw new AppError('Merchant not found!', 404);
    }

    return merchant;
  }
}

export default ListOneMerchantService;
