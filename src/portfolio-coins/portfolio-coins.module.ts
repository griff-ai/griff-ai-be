import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PortfolioCoinEntity } from 'shared/database/entities/portfolio-coin.entity'
import { SECURITY_PARKING_DB } from '@lib/common'
import { PortfolioCoinsController } from './portfolio-coins.controller'
import { PortfolioCoinsService } from './portfolio-coins.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioCoinEntity], SECURITY_PARKING_DB),
  ],
  controllers: [PortfolioCoinsController],
  providers: [PortfolioCoinsService],
  exports: [PortfolioCoinsService],
})
export class PortfolioCoinsModule {}