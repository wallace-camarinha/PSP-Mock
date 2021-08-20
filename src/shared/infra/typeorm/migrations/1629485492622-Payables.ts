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
            name: 'transaction_id',
            type: 'uuid',
          },
          {
            name: 'transaction_amount',
            type: 'int',
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
          },
          {
            name: 'FK_transaction',
            referencedTableName: 'transactions',
            referencedColumnNames: ['id'],
            columnNames: ['transaction_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('payables');
  }
}
