import { TypeOrmModule } from '@nestjs/typeorm'
import { SchedulerService } from './scheduler.service'
import { Module } from '@nestjs/common'
import { UserEntity } from 'shared/database/entities'
import { ScheduleModule } from '@nestjs/schedule'
import { GRIFF_AI_DB } from '@lib/common'
import { RedisModule } from '@lib/redis'
import { TokenModule } from '@lib/token'
import { MediaModule } from 'src/media/media.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity], GRIFF_AI_DB),
    RedisModule,
    TokenModule,
    MediaModule,
  ],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
