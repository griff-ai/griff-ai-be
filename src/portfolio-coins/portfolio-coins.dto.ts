import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator'
import { Type, Expose } from 'class-transformer'

export class CreatePortfolioCoinDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'id' })
  id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'coin_id' })
  coinId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'profit_loss' })
  profitLoss: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'profit_loss_change' })
  profitLossChange: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'total_holdings' })
  totalHoldings: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'total_cost' })
  totalCost: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'total_market_value' })
  totalMarketValue: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'average_net_cost' })
  averageNetCost: string
}

export class UpdatePortfolioCoinDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'profit_loss' })
  profitLoss?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'profit_loss_change' })
  profitLossChange?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_holdings' })
  totalHoldings?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_cost' })
  totalCost?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_market_value' })
  totalMarketValue?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'average_net_cost' })
  averageNetCost?: string
}

export class ListPortfolioCoinsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose({ name: 'page' })
  page?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose({ name: 'limit' })
  limit?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose({ name: 'coin_id' })
  coinId?: number
}