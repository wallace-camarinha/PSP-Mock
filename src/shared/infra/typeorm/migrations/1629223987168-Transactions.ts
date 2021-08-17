import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1629168677460
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'merchant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: false,
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
          },
          {
            name: 'FK_customer',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
