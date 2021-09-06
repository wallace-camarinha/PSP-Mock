import FakeMerchantsRepository from '../repositories/fakes/FakeMerchantsRepository';
import ListAllMerchantsService from './ListAllMerchantsService';

let fakeMerchantsRepository: FakeMerchantsRepository;
let listAllMerchants: ListAllMerchantsService;

describe('CreateMerchant', () => {
  beforeEach(() => {
    fakeMerchantsRepository = new FakeMerchantsRepository();
    listAllMerchants = new ListAllMerchantsService(fakeMerchantsRepository);
  });

  it('Should be able to list all merchants', async () => {
    const merchant1 = await fakeMerchantsRepository.create({
      name: 'Merchant1',
      cnpj: '123',
    });

    const merchant2 = await fakeMerchantsRepository.create({
      name: 'Merchant2',
      cnpj: '321',
    });

    const merchants = await listAllMerchants.execute();

    expect(merchants).toEqual([merchant1, merchant2]);
  });
});
