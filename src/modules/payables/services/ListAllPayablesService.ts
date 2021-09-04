import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Payable from '../infra/typeorm/entities/Payable';
import PayablesRepository from '../infra/typeorm/repositories/PayablesRepository';

class ListAllPayablesService {
  async execute(merchantId: string): Promise<Payable[] | undefined> {
    const payablesRepository = getCustomRepository(PayablesRepository);

    if (!merchantId) {
      throw new AppError('Invalid merchant id', 402);
    }
    const payables = await payablesRepository.findAll(merchantId);
    return payables;
  }
}

export default ListAllPayablesService;
