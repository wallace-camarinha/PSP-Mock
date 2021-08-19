import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('transactions')
class Transactions {
  @PrimaryColumn()
  id: string;

  @Column()
  merchant_id: string;

  @Column()
  customer_id?: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  payment_method: string;

  @Column()
  card_number: string;

  @Column()
  cardholder_name: string;

  @Column()
  exp_date: string;

  @Column()
  cvv: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Transactions;
