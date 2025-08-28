import { registerAs } from '@nestjs/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

process.env.TZ = 'UTC'

export const globalConfig = registerAs('global', () => ({
  env: process.env.ENV || 'dev',
  jwt: {
    exp: parseInt(process.env.JWT_TOKEN_EXPIRE) || 600,
    exp_refresh: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE) || 60 * 60,
    secret: process.env.JWT_SECRET_KEY,
    secret_refresh: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRE,
  },
  api_url: process.env.API_URL,
  http: {
    http_timeout: 60000,
    http_max_redirects: 5,
    detect_api_url_endpoint: 'http://127.0.0.1:5000',
  },
}))
