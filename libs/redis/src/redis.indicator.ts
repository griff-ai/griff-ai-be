import { Injectable } from '@nestjs/common'
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus'

import {
  CANNOT_BE_READ,
  FAILED_CLUSTER_STATE,
  MISSING_CLIENT,
  MISSING_TYPE,
  NOT_RESPONSIVE,
  RedisCheckSettings,
} from './redis.interfaces'

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  /**
   * Checks a redis/cluster client.
   *
   * @param key - The key which will be used for the result object
   * @param options - The extra options for check
   *
   * @example
   * ```
   * import IORedis from 'ioredis';
   *
   * const client = new IORedis({ host: 'localhost', port: 6380 });
   * indicator.checkHealth('redis', { type: 'redis', client });
   * ```
   *
   * @example
   * ```
   * import IORedis from 'ioredis';
   *
   * const client = new IORedis.Cluster([{ host: 'localhost', port: 16380 }]);
   * indicator.checkHealth('cluster', { type: 'cluster', client });
   * ```
   */
  async checkHealth(
    key: string,
    options: RedisCheckSettings,
  ): Promise<HealthIndicatorResult> {
    const { type } = options
    let isHealthy = false

    try {
      if (!type) throw new Error(MISSING_TYPE)
      if (!options.client) throw new Error(MISSING_CLIENT)

      if (type === 'redis') {
        const pong = await options.client.ping()
        if (pong !== 'PONG') throw new Error(NOT_RESPONSIVE)
      } else {
        const clusterInfo = await options.client.cluster('INFO')

        if (clusterInfo && typeof clusterInfo === 'string') {
          if (!String(clusterInfo).includes('cluster_state:ok'))
            throw new Error(FAILED_CLUSTER_STATE)
        } else {
          throw new Error(CANNOT_BE_READ)
        }
      }

      isHealthy = true
    } catch (error) {
      throw new HealthCheckError(
        error.message,
        this.getStatus(key, isHealthy, { message: error.message }),
      )
    }

    return this.getStatus(key, isHealthy)
  }
}
