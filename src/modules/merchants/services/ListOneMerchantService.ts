import { inject, injectable } from 'tsyringe';

import { Merchant } from '@shared/infra/prisma/prismaClient';
import AppError from '@shared/errors/AppError';
import IMerchantsRepository from '../repositories/IMerchantsRepository';

@injectable()
class ListOneMerchantService {
  constructor(
    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,
  ) {}

  async execute(arg: string | undefined): Promise<Merchant | undefined> {
    if (!arg) {
      throw new AppError('Please provide a merchantId or a cnpj!');
    }
    const merchant = await this.merchantsRepository.findOne(arg);

    return merchant;
  }
}

export default ListOneMerchantService;
