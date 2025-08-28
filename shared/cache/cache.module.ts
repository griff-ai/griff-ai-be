import { RedisModule } from '@lib/redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from 'config/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          host: configService.get<string>('database.redis.host'),
          port: configService.get<number>('database.redis.port'),
          db: configService.get<number>('database.redis.cacheDb'),
          maxRetriesPerRequest: 10,
        },
      }),
    }),
  ],
  exports: [RedisModule],
})
export class CacheModule {}
