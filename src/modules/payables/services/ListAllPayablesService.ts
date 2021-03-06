import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import { Payable } from '@shared/infra/prisma/prismaClient';
import IPayablesRepository from '../repositories/IPayablesRepository';

@injectable()
class ListAllPayablesService {
  constructor(
    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(merchantId: string): Promise<Payable[]> {
    if (!merchantId) {
      throw new AppError('Invalid merchant id', 400);
    }
    const payables = await this.payablesRepository.findAll(merchantId);
    return payables;
  }
}

export default ListAllPayablesService;
