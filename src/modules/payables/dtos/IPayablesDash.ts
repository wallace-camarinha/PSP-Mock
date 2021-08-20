export default interface IPayablesDash {
  merchant_id: string;
  merchant_name: string;
  payables: {
    available: {
      amount: number;
      transactions_count: number;
    };
    waiting_funds: {
      amount: number;
      transactions_count: number;
    };
  };
}
