import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCoinsTable1757331352192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coins',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'symbol',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'current_price',
            type: 'numeric',
            precision: 20,
            scale: 10,
            isNullable: true,
          },
          {
            name: 'market_cap',
            type: 'numeric',
            precision: 20,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'market_cap_rank',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'total_volume',
            type: 'numeric',
            precision: 20,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'circulating_supply',
            type: 'numeric',
            precision: 20,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'total_supply',
            type: 'numeric',
            precision: 20,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'max_supply',
            type: 'numeric',
            precision: 20,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'price_change_24h',
            type: 'numeric',
            precision: 20,
            scale: 10,
            isNullable: true,
          },
          {
            name: 'price_change_percentage_24h',
            type: 'numeric',
            precision: 8,
            scale: 4,
            isNullable: true,
          },
          {
            name: 'last_updated',
            type: 'timestamp',
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
        indices: [
          {
            name: 'idx_coins_symbol',
            columnNames: ['symbol'],
          },
          {
            name: 'idx_coins_slug',
            columnNames: ['slug'],
            isUnique: true,
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coins')
  }
}
