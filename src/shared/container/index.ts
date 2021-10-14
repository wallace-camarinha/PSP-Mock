import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import MerchantsRepository from '@modules/merchants/infra/typeorm/repositories/MerchantsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';
import PayablesRepository from '@modules/payables/infra/typeorm/repositories/PayablesRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IMerchantsRepository>(
  'MerchantsRepository',
  MerchantsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IPayablesRepository>(
  'PayablesRepository',
  PayablesRepository,
);
