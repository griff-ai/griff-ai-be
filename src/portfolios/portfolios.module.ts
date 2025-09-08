import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PortfolioEntity } from 'shared/database/entities/portfolio.entity'
import { SECURITY_PARKING_DB } from '@lib/common'
import { PortfoliosController } from './portfolios.controller'
import { PortfoliosService } from './portfolios.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity], SECURITY_PARKING_DB),
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}