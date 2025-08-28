import { getLoggingDatabaseByLevel, SECURITY_PARKING_DB } from '@lib/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { databaseConfig } from 'config/database.config'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  ConfigModule.forFeature(databaseConfig),
  TypeOrmModule.forRootAsync({
    name: SECURITY_PARKING_DB,
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      logging: getLoggingDatabaseByLevel(
        configService.get('common.app_logging_level'),
      ),
      replication: {
        master: {
          url: configService.get('database.griff_finance.url'),
        },
        slaves: [{ url: configService.get('database.griff_finance.url') }],
      },
      autoLoadEntities: true,
      synchronize: false,
      cache: {
        type: 'ioredis',
        options: {
          host: configService.get<string>('database.redis.host'),
          port: configService.get<number>('database.redis.port'),
          database: configService.get<number>('database.redis.queryCacheDb'),
          keyPrefix: 'griff_finance:db:',
        },
      },
      extra: {
        connectionLimit: 100,
      },
    }),
    inject: [ConfigService],
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize()
      return dataSource
    },
  }),
]
