import { inject, injectable } from 'tsyringe';

import { Payable } from '@shared/infra/prisma/prismaClient';
import IPayablesRepository from '../repositories/IPayablesRepository';

@injectable()
class ListOnePayablesService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(payableId: string): Promise<Payable | undefined> {
    const payable = await this.payablesRepository.findByOrderId(payableId);
    return payable;
  }
}

export default ListOnePayablesService;
