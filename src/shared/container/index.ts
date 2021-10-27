import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import { CustomersRepository } from '@modules/customers/infra/prisma/CustomersRepository';

import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import { MerchantsRepository } from '@modules/merchants/infra/prisma/MerchantsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import { OrdersRepository } from '@modules/orders/infra/prisma/OrdersRepository';

import IPayablesRepository from '@modules/payables/repositories/IPayablesRepository';
import { PayablesRepository } from '@modules/payables/infra/prisma/PayablesRepository';

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
