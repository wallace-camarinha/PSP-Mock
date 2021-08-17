import { getCustomRepository } from 'typeorm';
import Merchant from '../infra/typeorm/entities/Merchant';
import MerchantsRepository from '../infra/typeorm/repositories/MerchantsRepository';

class ListOneMerchantService {
  async execute(merchantId: string): Promise<Merchant | undefined> {
    const merchantsRepository = getCustomRepository(MerchantsRepository);
    const merchants = await merchantsRepository.findById(merchantId);
    return merchants;
  }
}

export default ListOneMerchantService;
