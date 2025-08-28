import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateUserTable1721276658842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birthday',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'smallint',
            unsigned: true,
            default: 0,
          },
          {
            name: 'status',
            type: 'smallint',
            unsigned: true,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'bigint',
          },
          {
            name: 'updated_at',
            type: 'bigint',
          },
        ],
      }),
      true,
    )

    await queryRunner.createIndices('users', [
      new TableIndex({
        name: 'IDX_USERNAME_USER_UNIQUE_KEY',
        isUnique: true,
        columnNames: ['username'],
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
