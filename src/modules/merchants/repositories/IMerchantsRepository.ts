import ICreateMerchant from '../dtos/ICreateMerchant';
import Merchant from '../infra/typeorm/entities/Merchant';

export default interface IMerchantsRepository {
  create(payload: ICreateMerchant): Promise<Merchant>;
  findAll(): Promise<Merchant[] | undefined>;
  findOne(arg: string | undefined): Promise<Merchant | undefined>;
}
