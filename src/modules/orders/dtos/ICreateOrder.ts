export default interface ICreateOrder {
  merchant_id: string;
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
    id?: string;
    name: string;
    email: string;
    type: string | null;
    document: string | null;
  };
}
