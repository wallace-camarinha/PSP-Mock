import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import ICreateMerchant from '../dtos/ICreateMerchant';
import Merchant from '../infra/typeorm/entities/Merchant';
import MerchantsRepository from '../infra/typeorm/repositories/MerchantsRepository';

class CreateMerchantService {
  async execute(payload: ICreateMerchant): Promise<Merchant> {
    const merchantsRepository = getCustomRepository(MerchantsRepository);

    if (!payload.name) {
      throw new AppError('Please enter a valid merchant name!', 402);
    }

    const merchantExists = await merchantsRepository.findByName(payload.name);
    if (merchantExists) {
      throw new AppError('Merchant already exists!', 402);
    }

    const merchant = await merchantsRepository.create(payload);

    return merchant;
  }
}

export default CreateMerchantService;
