import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import MerchantsRepository from '@modules/merchants/infra/typeorm/repositories/MerchantsRepository';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';

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

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IPayablesRepository>(
  'PayablesRepository',
  PayablesRepository,
);
