import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from 'shared/database/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GRIFF_AI_DB } from '@lib/common'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], GRIFF_AI_DB)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
