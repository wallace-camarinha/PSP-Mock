import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('payables')
class Payable {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  transaction_id: string;

  @Column()
  transaction_amount: number;

  @Column()
  payment_method: string;

  @Column()
  merchant_id: string;

  @Column()
  merchant_name: string;

  @Column()
  status: string;

  @Column()
  fee: number;

  @CreateDateColumn()
  payment_date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default Payable;
