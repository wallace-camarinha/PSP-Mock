export default interface IPayable {
  id: string;
  amount: number;
  transaction_id: string;
  transaction_amount: number;
  payment_method: string;
  merchant_id: string;
  merchant_name: string;
  status: string;
  fee: number;
  payment_date: Date;
  created_at: Date;
}
