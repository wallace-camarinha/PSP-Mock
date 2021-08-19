import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('customers')
class Customer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  type?: string;

  @Column()
  document?: string;

  @CreateDateColumn()
  created_at?: Date;
}

export default Customer;
