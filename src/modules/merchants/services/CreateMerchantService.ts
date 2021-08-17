import { getCustomRepository } from 'typeorm';
import AppError from 'errors/AppError';
import ICreateMerchant from '../dtos/ICreateMerchant';
import Merchant from '../infra/typeorm/entities/Merchant';
import MerchantsRepository from '../infra/typeorm/repositories/MerchantsRepository';

class CreateMerchantService {
  async execute(payload: ICreateMerchant): Promise<Merchant> {
    const merchantsRepository = getCustomRepository(MerchantsRepository);

    const merchantExists = await merchantsRepository.findByName(payload.name);

    if (merchantExists) {
      throw new AppError('Merchant already exists!', 402);
    }

    const merchant = await merchantsRepository.create(payload);

    return merchant;
  }
}

export default CreateMerchantService;
