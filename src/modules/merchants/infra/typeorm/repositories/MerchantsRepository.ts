import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuid, validate } from 'uuid';

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
      id: uuid(),
      name: payload.name,
      document_number: payload.cnpj,
    });

    await this.ormRepository.save(merchant);

    return merchant;
  }

  public async findAll(): Promise<Merchant[] | undefined> {
    const merchants = await this.ormRepository.find();

    return merchants;
  }

  public async findOne(arg: string): Promise<Merchant | undefined> {
    let merchant: Merchant | undefined;
    const isUuid = validate(arg);

    if (isUuid) {
      merchant = await this.ormRepository.findOne({
        where: { id: arg },
      });
      return merchant;
    }

    merchant = await this.ormRepository.findOne({
      where: { document_number: arg },
    });

    return merchant;
  }
}

export default MerchantsRepository;
