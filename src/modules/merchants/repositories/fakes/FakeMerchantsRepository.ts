import { v4 as uuid } from 'uuid';

import Merchant from '@modules/merchants/infra/typeorm/entities/Merchant';
import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import IMerchantsRepository from '../IMerchantsRepository';

class FakeMerchantsRepository implements IMerchantsRepository {
  private merchants: Merchant[] = [];

  public async create(payload: ICreateMerchant): Promise<Merchant> {
    const merchant = new Merchant();
    Object.assign(merchant, {
      id: uuid(),
      name: payload.name,
      document_number: payload.cnpj,
    });

    this.merchants.push(merchant);

    return merchant;
  }

  public async findAll(): Promise<Merchant[] | undefined> {
    return this.merchants;
  }

  public async findOne(arg: string): Promise<Merchant | undefined> {
    let findMerchant = this.merchants.find(merchant => merchant.id === arg);

    if (!findMerchant) {
      findMerchant = this.merchants.find(
        merchant => merchant.document_number === arg,
      );
    }

    return findMerchant;
  }
}

export default FakeMerchantsRepository;
