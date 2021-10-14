export default interface IPayable {
  id: string;
  amount: number;
  order_id: string;
  order_amount: number;
  payment_method: string;
  merchant_id: string;
  merchant_name: string;
  status: string;
  fee: number;
  payment_date: Date;
  created_at: Date;
}
