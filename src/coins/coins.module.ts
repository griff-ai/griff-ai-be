import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoinEntity } from 'shared/database/entities/coin.entity'
import { SECURITY_PARKING_DB } from '@lib/common'
import { CoinsController } from './coins.controller'
import { CoinsService } from './coins.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinEntity], SECURITY_PARKING_DB),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
  exports: [CoinsService],
})
export class CoinsModule {}