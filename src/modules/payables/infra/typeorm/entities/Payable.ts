import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('payables')
class Payables {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  transaction_id: string;

  @Column()
  transaction_amount: string;

  @Column()
  merchant_id: string;

  @Column()
  description: string;

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
