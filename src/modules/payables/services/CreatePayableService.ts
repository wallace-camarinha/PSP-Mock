import { inject, injectable } from 'tsyringe';

import { Payable, Order } from '@shared/infra/prisma/prismaClient';
import IPayablesRepository from '../repositories/IPayablesRepository';

@injectable()
class CreatePayableService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(order: Order): Promise<Payable> {
    const payable = await this.payablesRepository.create(order);

    return payable;
  }
}

export default CreatePayableService;
