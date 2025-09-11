import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePortfolioCoinsTable1757331403734
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'portfolio_coins',
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
            name: 'coin_id',
            type: 'bigint',
          },
          {
            name: 'profit_loss',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'profit_loss_change',
            type: 'numeric',
            precision: 8,
            scale: 4,
            default: '0.0',
          },
          {
            name: 'total_holdings',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'total_cost',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'total_market_value',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'average_net_cost',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
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
    await queryRunner.dropTable('portfolio_coins')
  }
}
