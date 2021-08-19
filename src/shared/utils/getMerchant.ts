import { getCustomRepository } from 'typeorm';
import Merchant from '@modules/merchants/infra/typeorm/entities/Merchant';
import MerchantsRepository from '@modules/merchants/infra/typeorm/repositories/MerchantsRepository';

async function getMerchant(merchantId: string): Promise<Merchant> {
  const merchantsRepository = getCustomRepository(MerchantsRepository);
  const merchant = merchantsRepository.findById(merchantId);

  return merchant;
}

export default getMerchant;
