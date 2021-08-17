import ICreateMerchant from '../dtos/ICreateMerchant';
import Merchant from '../infra/typeorm/entities/Merchant';

export default interface IMerchantsRepository {
  create(payload: ICreateMerchant): Promise<Merchant>;
  findAll(): Promise<Merchant[] | undefined>;
  findById(merchantId: string): Promise<Merchant | undefined>;
  findByName(name: string): Promise<Merchant | undefined>;
}
