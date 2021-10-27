import { Merchant } from '@shared/infra/prisma/prismaClient';
import ICreateMerchant from '../dtos/ICreateMerchant';

export default interface IMerchantsRepository {
  create(payload: ICreateMerchant): Promise<Merchant>;
  findAll(): Promise<Merchant[] | undefined>;
  findOne(arg: string): Promise<Merchant | undefined>;
}
