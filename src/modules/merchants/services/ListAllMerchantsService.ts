import { getCustomRepository } from 'typeorm';
import Merchant from '../infra/typeorm/entities/Merchant';
import MerchantsRepository from '../infra/typeorm/repositories/MerchantsRepository';

class ListAllMerchantsService {
  async execute(): Promise<Merchant[] | undefined> {
    const merchantsRepository = getCustomRepository(MerchantsRepository);
    const merchants = await merchantsRepository.findAll();
    return merchants;
  }
}

export default ListAllMerchantsService;
