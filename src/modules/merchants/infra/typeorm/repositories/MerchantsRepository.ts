import { EntityRepository, getRepository, Repository } from 'typeorm';

import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';

import Merchant from '../entities/Merchant';

@EntityRepository(Merchant)
class MerchantsRepository implements IMerchantsRepository {
  private ormRepository: Repository<Merchant>;

  constructor() {
    this.ormRepository = getRepository(Merchant);
  }

  public async create(payload: ICreateMerchant): Promise<Merchant> {
    const merchant = this.ormRepository.create({
      name: payload.name,
    });

    await this.ormRepository.save(merchant);

    return merchant;
  }

  public async findAll(): Promise<Merchant[] | undefined> {
    const merchants = await this.ormRepository.find();

    return merchants;
  }

  public async findById(merchantId: string): Promise<Merchant | undefined> {
    const merchant = await this.ormRepository.findOne(merchantId);

    return merchant;
  }

  public async findByName(name: string): Promise<Merchant | undefined> {
    const merchant = await this.ormRepository.findOne({ where: { name } });

    return merchant;
  }
}

export default MerchantsRepository;
