import { inject, injectable } from 'tsyringe';

import Payable from '../infra/typeorm/entities/Payable';
import IPayablesRepository from '../repositories/IPayablesRepository';

@injectable()
class ListOnePayablesService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(payableId: string): Promise<Payable | undefined> {
    const payable = await this.payablesRepository.findById(payableId);
    return payable;
  }
}

export default ListOnePayablesService;
