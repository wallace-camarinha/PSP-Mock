import { inject, injectable } from 'tsyringe';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Payable from '../infra/typeorm/entities/Payable';
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
