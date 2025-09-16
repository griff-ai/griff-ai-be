import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { CoinEntity } from 'shared/database/entities/coin.entity'
import { GRIFF_AI_DB } from '@lib/common'
import { CoinsController } from './coins.controller'
import { CoinsService } from './coins.service'
import { CoinPriceSyncService } from './coin-price-sync.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinEntity], GRIFF_AI_DB),
    HttpModule,
  ],
  controllers: [CoinsController],
  providers: [CoinsService, CoinPriceSyncService],
  exports: [CoinsService, CoinPriceSyncService],
})
export class CoinsModule {}
