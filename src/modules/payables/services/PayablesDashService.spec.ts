import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeMerchantsRepository from '@modules/merchants/repositories/fakes/FakeMerchantsRepository';
import FakePayablesRepository from '../repositories/fakes/FakePayablesRepository';
import PayablesDashService from './PayablesDashService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeMerchantsRepository: FakeMerchantsRepository;
let fakePayablesRepository: FakePayablesRepository;
let payablesDash: PayablesDashService;

describe('PayablesDashService', () => {
  beforeEach(() => {
    fakePayablesRepository = new FakePayablesRepository();
    fakeMerchantsRepository = new FakeMerchantsRepository();
    fakeOrdersRepository = new FakeOrdersRepository();

    payablesDash = new PayablesDashService(
      fakePayablesRepository,
      fakeMerchantsRepository,
    );
  });

  it('Should be able to show the Payable dash', async () => {
    const merchant = await fakeMerchantsRepository.create({
      name: 'Test Store',
      cnpj: '123',
    });

    const order1 = await fakeOrdersRepository.create({
      merchant_id: merchant.id,
      customer_id: '321',
      amount: 100000,
      description: 'Test',
      payment_method: 'credit_card',
      payment: {
        card_number: '4000000000000099',
        cardholder_name: 'Test Example',
        exp_date: '09-29',
        cvv: 123,
      },
      customer: {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        document: null,
        type: null,
      },
    });
    const order2 = await fakeOrdersRepository.create({
      merchant_id: merchant.id,
      customer_id: '321',
      amount: 100000,
      description: 'Test',
      payment_method: 'credit_card',
      payment: {
        card_number: '4000000000000099',
        cardholder_name: 'Test Example',
        exp_date: '09-29',
        cvv: 123,
      },
      customer: {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        document: null,
        type: null,
      },
    });

    const payable1 = await fakePayablesRepository.create(order1);
    const payable2 = await fakePayablesRepository.create(order2);

    const sumOfAmounts = payable1.amount + payable2.amount;

    const payableDash = await payablesDash.execute(merchant.id);

    expect(payableDash.payables.waiting_funds.amount).toBe(sumOfAmounts);
  });

  it('Should not be able to show the Payable dash if there are no Payables', async () => {
    const merchant = await fakeMerchantsRepository.create({
      name: 'Test Store',
      cnpj: '123',
    });

    await expect(payablesDash.execute(merchant.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should not be able to show the Payable dash passing an invalid "merchant_id"', async () => {
    await expect(payablesDash.execute('')).rejects.toBeInstanceOf(AppError);
  });
});
