import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';

import { Order } from '@shared/infra/prisma/prismaClient';
import IOrdersRepository from '../repositories/IOrdersRepository';
import ICreateOrder from '../dtos/ICreateOrder';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MerchantsRepository')
    private merchantsRepository: IMerchantsRepository,

    @inject('PayablesRepository')
    private payablesRepository: IPayablesRepository,
  ) {}

  async execute(payload: ICreateOrder): Promise<Order> {
    let { customer } = payload;

    const customerExists = await this.customersRepository.findOne(
      payload.customer_id || customer.email,
    );

    if (customerExists) {
      customer = customerExists;
    } else {
      customer = await this.customersRepository.create(customer);
    }

    const merchant = await this.merchantsRepository.findOne(
      payload.merchant_id,
    );

    if (!merchant) {
      throw new AppError('Invalid Merchant', 400);
    }

    const orderPayload = {
      ...payload,
      customer,
      merchant,
    };
    const order = await this.ordersRepository.create(orderPayload);

    this.payablesRepository.create(order);

    return order;
  }
}

export default CreateOrderService;
