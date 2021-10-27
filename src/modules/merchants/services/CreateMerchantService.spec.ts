import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMerchantsRepository from '../repositories/fakes/FakeMerchantsRepository';
import CreateMerchantService from './CreateMerchantService';

let fakeMerchantsRepository: FakeMerchantsRepository;
let createMerchant: CreateMerchantService;

describe('CreateMerchant', () => {
  beforeEach(() => {
    fakeMerchantsRepository = new FakeMerchantsRepository();
    createMerchant = new CreateMerchantService(fakeMerchantsRepository);
  });

  it('Should be able to create a merchant', async () => {
    const merchant = await createMerchant.execute({
      name: 'Merchant Test',
      cnpj: '1234',
    });

    expect(merchant).toHaveProperty('id');
  });

  it('Should not be able to create a merchant with an existing document_number', async () => {
    const merchant = await createMerchant.execute({
      name: 'Merchant Test',
      cnpj: '1234',
    });

    await expect(
      createMerchant.execute({
        name: 'Merchant Test',
        cnpj: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a merchant without a name and e-mail', async () => {
    await expect(
      createMerchant.execute({
        name: 'Merchant Test',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createMerchant.execute({
        name: '',
        cnpj: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
