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
    merchantId: string,
    documentNumber: string,
  ): Promise<Merchant | undefined> {
    if (merchantId) {
      const merchant = await this.merchantsRepository.findById(merchantId);
      return merchant;
    }

    if (documentNumber) {
      const merchant = await this.merchantsRepository.findByDocument(
        documentNumber,
      );
      return merchant;
    }

    throw new AppError('Please enter a document number or merchant_id!');
  }
}

export default ListOneMerchantService;
