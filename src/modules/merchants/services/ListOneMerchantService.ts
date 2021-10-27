import { inject, injectable } from 'tsyringe';

import { Merchant } from '@shared/infra/prisma/prismaClient';
import IMerchantsRepository from '../repositories/IMerchantsRepository';

@injectable()
class ListOneMerchantService {
  constructor(
    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,
  ) {}

  async execute(arg: string): Promise<Merchant | undefined> {
    const merchant = await this.merchantsRepository.findOne(arg);

    return merchant;
  }
}

export default ListOneMerchantService;
