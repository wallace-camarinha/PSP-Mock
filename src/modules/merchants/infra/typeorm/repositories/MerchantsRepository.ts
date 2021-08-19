import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';

import AppError from 'errors/AppError';
import Merchant from '../entities/Merchant';

@EntityRepository(Merchant)
class MerchantsRepository implements IMerchantsRepository {
  private ormRepository: Repository<Merchant>;

  constructor() {
    this.ormRepository = getRepository(Merchant);
  }

  public async create(payload: ICreateMerchant): Promise<Merchant> {
    const merchant = this.ormRepository.create({
      id: uuid(),
      name: payload.name,
    });

    await this.ormRepository.save(merchant);

    return merchant;
  }

  public async findAll(): Promise<Merchant[] | undefined> {
    const merchants = await this.ormRepository.find();

    return merchants;
  }

  public async findById(merchantId: string): Promise<Merchant> {
    const merchant = await this.ormRepository.findOne(merchantId);
    if (!merchant) {
      throw new AppError('Merchant not found', 404);
    }

    const { created_at, ...responseMerchant } = merchant;

    return responseMerchant;
  }

  public async findByName(name: string): Promise<Merchant | undefined> {
    const merchant = await this.ormRepository.findOne({ where: { name } });

    return merchant;
  }
}

export default MerchantsRepository;
