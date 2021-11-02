import { validate } from 'uuid';
import ICreateMerchant from '@modules/merchants/dtos/ICreateMerchant';
import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';

import { prismaClient, Merchant } from '@shared/infra/prisma/prismaClient';

class MerchantsRepository implements IMerchantsRepository {
  async create({ cnpj, name }: ICreateMerchant): Promise<Merchant> {
    const merchant = await prismaClient.merchant.create({
      data: {
        name,
        document_number: cnpj,
      },
    });

    return merchant;
  }

  async findAll(): Promise<Merchant[] | undefined> {
    const merchants = await prismaClient.merchant.findMany();

    return merchants;
  }

  async findOne(arg: string): Promise<Merchant | undefined> {
    let merchant: Merchant | undefined;

    const isUuid = validate(arg);

    if (isUuid) {
      merchant =
        (await prismaClient.merchant.findFirst({
          where: { id: arg },
        })) || undefined;

      return merchant;
    }

    merchant =
      (await prismaClient.merchant.findFirst({
        where: { document_number: arg },
      })) || undefined;

    return merchant;
  }
}

export { MerchantsRepository };
