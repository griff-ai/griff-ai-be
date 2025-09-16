import { GRIFF_AI_DB } from '@lib/common'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'shared/database/entities'
import { In, Repository } from 'typeorm'

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(UserEntity, GRIFF_AI_DB)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleInOutCron() {
    console.log(`[${new Date()}][handleInOutCron]: BEGINNING ....`)
    console.log(`[${new Date()}][handleInOutCron]: END`)
    return
  }
}
