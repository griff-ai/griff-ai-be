import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePortfoliosTable1757331890446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'portfolios',
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
            name: 'name',
            type: 'varchar',
            length: '100',
            default: "'Default Portfolio'",
          },
          {
            name: 'total_holdings_value',
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
            name: 'past_holdings_value',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'holdings_change',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'holdings_change_percentage',
            type: 'numeric',
            precision: 8,
            scale: 4,
            default: '0.0',
          },
          {
            name: 'profit_loss',
            type: 'numeric',
            precision: 20,
            scale: 10,
            default: '0.0',
          },
          {
            name: 'profit_loss_change_percentage',
            type: 'numeric',
            precision: 8,
            scale: 4,
            default: '0.0',
          },
          {
            name: 'has_inactive_coins',
            type: 'boolean',
            default: false,
          },
          {
            name: 'top_gainer_page_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'top_gainer_image_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'top_gainer_name',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'top_gainer_symbol',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'top_gainer_profit_loss',
            type: 'numeric',
            precision: 20,
            scale: 10,
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
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('portfolios')
  }
}
