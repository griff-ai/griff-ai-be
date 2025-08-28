import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import * as Redis from 'ioredis'
import { Cluster } from 'ioredis'

// export type Redis = Redis.Redis

export interface RedisModuleOptions {
  config: Redis.RedisOptions & { url?: string }
}

export interface RedisModuleOptionsFactory {
  createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions
}

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<RedisModuleOptionsFactory>
  useExisting?: Type<RedisModuleOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions
}

export type RedisCheckSettings =
  | {
      type: 'redis'
      client: Redis.Redis
      timeout?: number
      memoryThreshold?: number
    }
  | {
      type: 'cluster'
      client: Cluster
    }

export const MISSING_CLIENT = 'Argument `client` is missing.'
export const MISSING_TYPE = 'Argument `type` is missing.'
export const NOT_RESPONSIVE = `The client is not responsive.`
export const ABNORMALLY_MEMORY_USAGE = `The client is using abnormally high memory.`
export const CANNOT_BE_READ = `Info cluster cannot be read.`
export const FAILED_CLUSTER_STATE = `Info cluster is not in OK state.`
export const OPERATIONS_TIMEOUT = (timeout: number) =>
  `Operations timed out after ${String(timeout)}ms.`
