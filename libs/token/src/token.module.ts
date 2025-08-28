import { RedisModule } from '@lib/redis'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'
import { globalConfig } from 'config'

@Module({
  imports: [ConfigModule.forFeature(globalConfig), JwtModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
