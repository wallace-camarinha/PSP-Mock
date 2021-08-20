export default interface ITransaction {
  id: string;
  amount: number;
  transaction_id: string;
  transaction_amount: number;
  merchant_id: string;
  merchant_name: string;
  status: string;
  fee: number;
  payment_date: Date;
  created_at: Date;
}
