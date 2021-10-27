import { inject, injectable } from 'tsyringe';

import { Merchant } from '@shared/infra/prisma/prismaClient';
import IMerchantsRepository from '../repositories/IMerchantsRepository';

@injectable()
class ListAllMerchantsService {
  constructor(
    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,
  ) {}

  async execute(): Promise<Merchant[] | undefined> {
    const merchants = await this.merchantsRepository.findAll();
    return merchants;
  }
}

export default ListAllMerchantsService;
