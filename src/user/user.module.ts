import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from 'shared/database/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SECURITY_PARKING_DB } from '@lib/common'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], SECURITY_PARKING_DB)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
