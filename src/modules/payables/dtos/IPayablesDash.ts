export default interface IPayablesDash {
  merchant_id: string;
  merchant_name: string;
  payables: {
    available: {
      amount: number;
      orders_count: number;
    };
    waiting_funds: {
      amount: number;
      orders_count: number;
    };
  };
}
