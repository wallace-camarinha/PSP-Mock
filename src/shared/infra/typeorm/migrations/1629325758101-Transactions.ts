import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Transactions1629325758101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'merchant_id',
            type: 'uuid',
          },
          {
            name: 'merchant_name',
            type: 'varchar',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'payment_method',
            type: 'varchar',
          },
          {
            name: 'card_number',
            type: 'varchar',
          },
          {
            name: 'cardholder_name',
            type: 'varchar',
          },
          {
            name: 'exp_date',
            type: 'varchar',
          },
          {
            name: 'cvv',
            type: 'int',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_merchant',
            referencedTableName: 'merchants',
            referencedColumnNames: ['id'],
            columnNames: ['merchant_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_customer',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
