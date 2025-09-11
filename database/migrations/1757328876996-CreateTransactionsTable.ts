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
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
          },
          {
            name: 'coin_id',
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
            name: 'transaction_hash',
            type: 'varchar',
            length: '64',
            isUnique: true,
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
          {
            columnNames: ['coin_id'],
            referencedTableName: 'coins',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
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
