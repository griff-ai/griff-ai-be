import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()
export default new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [],
  migrations: ['database/migrations/*.ts'],
})
