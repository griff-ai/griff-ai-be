import { registerAs } from '@nestjs/config'

export const databaseConfig = registerAs('database', () => ({
  griff_finance: {
    url: process.env.DB_URL,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: +process.env.REDIS_PORT || 6379,
    queryCacheDb: +process.env.REDIS_QUERY_CACHE_DB || 0,
    queueDb: +process.env.REDIS_QUEUE_DB || 1,
    testDb: +process.env.REDIS_TEST_DB || 2,
    cacheDb: +process.env.REDIS_CACHE_DB || 3,
  },
}))
