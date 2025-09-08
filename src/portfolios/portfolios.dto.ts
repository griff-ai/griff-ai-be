import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePortfolioDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalHoldingsValue: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalCost: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pastHoldingsValue: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  holdingsChange: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  holdingsChangePercentage: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profitLoss: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profitLossChangePercentage: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  hasInactiveCoins: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerPageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerImageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerSymbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerProfitLoss?: string
}

export class UpdatePortfolioDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalHoldingsValue?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalCost?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pastHoldingsValue?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  holdingsChange?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  holdingsChangePercentage?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profitLoss?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profitLossChangePercentage?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hasInactiveCoins?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerPageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerImageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerSymbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topGainerProfitLoss?: string
}

export class ListPortfoliosRequestDto {
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
  userId?: number
}