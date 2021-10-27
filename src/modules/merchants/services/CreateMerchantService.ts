import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Merchant } from '@shared/infra/prisma/prismaClient';
import ICreateMerchant from '../dtos/ICreateMerchant';
import IMerchantsRepository from '../repositories/IMerchantsRepository';

@injectable()
class CreateMerchantService {
  constructor(
    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,
  ) {}

  async execute(payload: ICreateMerchant): Promise<Merchant> {
    if (!payload.cnpj || !payload.name) {
      throw new AppError(
        'Please enter a valid document number and a name!',
        400,
      );
    }

    const merchantExists = await this.merchantsRepository.findOne(payload.cnpj);
    if (merchantExists) {
      throw new AppError(
        'Merchant already exists with this document number!',
        401,
      );
    }

    const merchant = await this.merchantsRepository.create(payload);

    return merchant;
  }
}

export default CreateMerchantService;
