import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import { RedisHealthIndicator } from './redis.indicator'
import {
  RedisModuleAsyncOptions,
  RedisModuleOptions,
  RedisModuleOptionsFactory,
} from './redis.interfaces'
import {
  createRedisConnection,
  getRedisConnectionToken,
  getRedisOptionsToken,
} from './redis.utils'

@Module({})
export class RedisModule {
  public static forRoot(
    options: RedisModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options, connection)],
      exports: [RedisCoreModule],
    }
  }

  public static forRootAsync(
    options: RedisModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options, connection)],
      exports: [RedisCoreModule],
    }
  }
}

@Global()
@Module({
  providers: [RedisHealthIndicator],
  exports: [RedisHealthIndicator],
})
export class RedisCoreModule {
  /* forRoot */
  public static forRoot(
    options: RedisModuleOptions,
    connection?: string,
  ): DynamicModule {
    const redisOptionsProvider: Provider = {
      provide: getRedisOptionsToken(connection),
      useValue: options,
    }

    const redisConnectionProvider: Provider = {
      provide: getRedisConnectionToken(connection),
      useValue: createRedisConnection(options),
    }

    return {
      module: RedisCoreModule,
      providers: [redisOptionsProvider, redisConnectionProvider],
      exports: [redisOptionsProvider, redisConnectionProvider],
    }
  }

  /* forRootAsync */
  public static forRootAsync(
    options: RedisModuleAsyncOptions,
    connection: string,
  ): DynamicModule {
    const redisConnectionProvider: Provider = {
      provide: getRedisConnectionToken(connection),
      useFactory(options: RedisModuleOptions) {
        return createRedisConnection(options)
      },
      inject: [getRedisOptionsToken(connection)],
    }

    return {
      module: RedisCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        redisConnectionProvider,
      ],
      exports: [redisConnectionProvider],
    }
  }

  /* createAsyncProviders */
  public static createAsyncProviders(
    options: RedisModuleAsyncOptions,
    connection?: string,
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      )
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)]
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ]
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(
    options: RedisModuleAsyncOptions,
    connection?: string,
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      )
    }

    if (options.useFactory) {
      return {
        provide: getRedisOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: getRedisOptionsToken(connection),
      async useFactory(
        optionsFactory: RedisModuleOptionsFactory,
      ): Promise<RedisModuleOptions> {
        return await optionsFactory.createRedisModuleOptions()
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
