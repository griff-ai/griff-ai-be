import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { DatabaseModule } from 'shared/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { databaseConfig, globalConfig } from 'config'
import { AuthModule } from './auth/auth.module'
import { ValidateAccessTokenMiddleware } from './middlewares/validate-access-token.middleware'
import { TokenModule } from '@lib/token'
import { CacheModule } from 'shared/cache/cache.module'
import { MediaModule } from './media/media.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { CoinsModule } from './coins/coins.module'
import { TransactionsModule } from './transactions/transactions.module'
import { PortfolioCoinsModule } from './portfolio-coins/portfolio-coins.module'
import { PortfoliosModule } from './portfolios/portfolios.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [globalConfig, databaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    DatabaseModule,
    CacheModule,
    TokenModule,
    AuthModule,
    MediaModule,
    UserModule,
    CoinsModule,
    TransactionsModule,
    PortfolioCoinsModule,
    PortfoliosModule,
    ScheduleModule.forRoot(),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer
      .apply(ValidateAccessTokenMiddleware)
      .exclude(
        '/auth/login',
        '/auth/refresh-token',
        '/auth/forgot-password',
        '/auth/reset-password',
        '/auth/verify-token',
        '/auth/register',
        '/token',
        '/uploads/(.*)',
      )
      .forRoutes('*')
  }
}
