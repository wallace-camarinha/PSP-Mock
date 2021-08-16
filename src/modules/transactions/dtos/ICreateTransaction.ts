export default interface ICreateTransaction {
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
}
