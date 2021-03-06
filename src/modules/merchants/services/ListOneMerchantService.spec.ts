import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMerchantsRepository from '../repositories/fakes/FakeMerchantsRepository';
import ListOneMerchantService from './ListOneMerchantService';

let fakeMerchantsRepository: FakeMerchantsRepository;
let listOneMerchant: ListOneMerchantService;

describe('ListOneMerchant', () => {
  beforeEach(() => {
    fakeMerchantsRepository = new FakeMerchantsRepository();
    listOneMerchant = new ListOneMerchantService(fakeMerchantsRepository);
  });

  it('Should be able to list one merchant passing the "merchant_id"', async () => {
    const merchant = await fakeMerchantsRepository.create({
      name: 'Merchant',
      cnpj: '321',
    });

    const findMerchant = await listOneMerchant.execute(merchant.id);

    expect(findMerchant).toEqual(merchant);
  });

  it('Should be able to list one merchant passing the "document_number"', async () => {
    const merchant = await fakeMerchantsRepository.create({
      name: 'Merchant2',
      cnpj: '321',
    });

    const findMerchant = await listOneMerchant.execute(
      merchant.document_number,
    );

    expect(findMerchant).toEqual(merchant);
  });
});
