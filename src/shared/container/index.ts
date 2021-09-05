import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IMerchantsRepository from '@modules/merchants/repositories/IMerchantsRepository';
import MerchantsRepository from '@modules/merchants/infra/typeorm/repositories/MerchantsRepository';

container.register<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.register<IMerchantsRepository>(
  'MerchantsRepository',
  MerchantsRepository,
);
