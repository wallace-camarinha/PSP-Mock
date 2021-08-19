export default interface ITransaction {
  id: string;
  amount: number;
  description: string;
  payment_method: string;
  status: string;
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
    type?: string;
    document?: string;
  };
  merchant: {
    id: string;
    name: string;
  };
  created_date: Date;
}
