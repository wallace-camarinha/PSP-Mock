import ICreateTransaction from '@modules/transactions/dtos/ICreateTransaction';
import ITransaction from '@modules/transactions/dtos/ITransaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

class TransactionsRepository implements ITransactionsRepository {
  private transactions: ITransaction[] = [];

  public async create(payload: ICreateTransaction): Promise<ITransaction> {
    const transaction = {
      transaction_id: '123456',
      merchant_id: '654321',
      amount: payload.amount,
      description: payload.description,
      payment_method: payload.payment_method,
      payment: {
        card_number: payload.payment.card_number,
        cardholder_name: payload.payment.cardholder_name,
        exp_date: payload.payment.exp_date,
        cvv: payload.payment.cvv,
      },
      customer: {
        name: payload.customer.name,
        email: payload.customer.email,
        type: payload.customer.type,
        document: payload.customer.document,
      },
      status: 'approved',
      created_date: new Date(),
      updated_date: new Date(),
    };

    this.transactions.push(transaction);

    return transaction;
  }

  public async findAll() {}

  public async findById() {}
}

export default TransactionsRepository;
