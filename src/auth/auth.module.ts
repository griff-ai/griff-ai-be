import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TokenModule } from '@lib/token'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GRIFF_AI_DB } from '@lib/common'
import { UserEntity } from 'shared/database/entities'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], GRIFF_AI_DB), TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
