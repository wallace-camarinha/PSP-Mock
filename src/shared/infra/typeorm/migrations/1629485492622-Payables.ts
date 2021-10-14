import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Payables1629485492622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payables',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'order_amount',
            type: 'int',
          },
          {
            name: 'payment_method',
            type: 'varchar',
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
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'fee',
            type: 'float',
          },
          {
            name: 'payment_date',
            type: 'timestamp',
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
            name: 'FK_order',
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            columnNames: ['order_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payables');
  }
}
