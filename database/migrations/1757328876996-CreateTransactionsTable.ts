import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTransactionsTable1757328876996
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'bigint',
          },
          {
            name: 'fees',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 20,
            scale: 10,
          },
          {
            name: 'proceeds',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'cost',
            type: 'numeric',
            precision: 20,
            scale: 10,
          },
          {
            name: 'transaction_type',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'profit_loss',
            type: 'numeric',
            precision: 20,
            scale: 10,
          },
          {
            name: 'quantity',
            type: 'numeric',
            precision: 20,
            scale: 10,
          },
          {
            name: 'currency',
            type: 'varchar',
            length: '10',
            default: "'usd'",
          },
          {
            name: 'transaction_timestamp',
            type: 'timestamp',
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'idx_transactions_user_id',
            columnNames: ['user_id'],
          },
          {
            name: 'idx_transactions_type',
            columnNames: ['transaction_type'],
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
