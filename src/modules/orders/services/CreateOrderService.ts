import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrder from '../dtos/IOrder';
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

  async execute(payload: ICreateOrder): Promise<IOrder> {
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

    const merchantName = merchant.name;

    const orderPayload = {
      ...payload,
      customer,
      merchant,
      merchant_name: merchantName,
    };
    const order = await this.ordersRepository.create(orderPayload);

    this.payablesRepository.create(order);

    const responseOrder: IOrder = {
      id: order.id,
      amount: order.amount,
      description: order.description,
      payment_method: order.payment_method,
      status: order.status,
      payment: {
        card_number: order.card_number,
        cardholder_name: order.cardholder_name,
        exp_date: order.exp_date,
        cvv: order.cvv,
      },
      customer: { ...customer },
      merchant: { ...merchant },
      created_date: order.created_at,
    };

    return responseOrder;
  }
}

export default CreateOrderService;
