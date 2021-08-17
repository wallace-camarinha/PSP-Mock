export default interface ITransaction {
  id?: string;
  merchant_id?: string;
  customer_id?: string;
  amount: number;
  description: string;
  payment_method: string;
  payment: {
    card_number: string;
    cardholder_name: string;
    exp_date: string;
    cvv: number;
  };
  customer: {
    name: string;
    email: string;
    type: string;
    document: string;
  };
  status: string;
  created_date: Date;
}
