import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Merchant from '@modules/merchants/infra/typeorm/entities/Merchant';

@Entity('payables')
class Payable {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  order_id: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  order_amount: number;

  @Column()
  payment_method: string;

  @Column()
  merchant_id: string;

  @ManyToOne(() => Merchant)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

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
