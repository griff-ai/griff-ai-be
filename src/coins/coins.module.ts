import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoinEntity } from 'shared/database/entities/coin.entity'
import { GRIFF_AI_DB } from '@lib/common'
import { CoinsController } from './coins.controller'
import { CoinsService } from './coins.service'

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity], GRIFF_AI_DB)],
  controllers: [CoinsController],
  providers: [CoinsService],
  exports: [CoinsService],
})
export class CoinsModule {}
