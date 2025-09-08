import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePortfolioCoinDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  coinId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profitLoss: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profitLossChange: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalHoldings: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalCost: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalMarketValue: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  averageNetCost: string
}

export class UpdatePortfolioCoinDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profitLoss?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profitLossChange?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalHoldings?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalCost?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalMarketValue?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  averageNetCost?: string
}

export class ListPortfolioCoinsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coinId?: number
}