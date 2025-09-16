import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PortfolioCoinEntity } from 'shared/database/entities/portfolio-coin.entity'
import { TransactionEntity } from 'shared/database/entities/transaction.entity'
import { CoinEntity } from 'shared/database/entities/coin.entity'
import { GRIFF_AI_DB } from '@lib/common'
import { PortfolioCoinsController } from './portfolio-coins.controller'
import { PortfolioCoinsService } from './portfolio-coins.service'
import { PortfolioCalculationService } from './portfolio-calculation.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioCoinEntity, TransactionEntity, CoinEntity], GRIFF_AI_DB)
  ],
  controllers: [PortfolioCoinsController],
  providers: [PortfolioCoinsService, PortfolioCalculationService],
  exports: [PortfolioCoinsService, PortfolioCalculationService],
})
export class PortfolioCoinsModule {}
