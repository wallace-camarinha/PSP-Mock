import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Merchant from '@modules/merchants/infra/typeorm/entities/Merchant';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

@Entity('orders')
class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  merchant_id: string;

  @ManyToOne(() => Merchant)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @Column()
  merchant_name: string;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'merchant_id' })
  customer: Customer;

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

export default Order;
