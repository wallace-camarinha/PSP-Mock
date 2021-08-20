import { getCustomRepository } from 'typeorm';
import Payable from '../infra/typeorm/entities/Payable';
import PayablesRepository from '../infra/typeorm/repositories/PayablesRepository';

class ListOnePayablesService {
  async execute(merchantId: string): Promise<Payable | undefined> {
    const payablesRepository = getCustomRepository(PayablesRepository);

    const payable = await payablesRepository.findAll(merchantId);
    return payable;
  }
}

export default ListOnePayablesService;
