import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator'
import { Type, Expose } from 'class-transformer'

export class CreatePortfolioDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'user_id' })
  userId: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'name' })
  name?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'total_holdings_value' })
  totalHoldingsValue: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'total_cost' })
  totalCost: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'past_holdings_value' })
  pastHoldingsValue: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'holdings_change' })
  holdingsChange: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'holdings_change_percentage' })
  holdingsChangePercentage: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'profit_loss' })
  profitLoss: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'profit_loss_change_percentage' })
  profitLossChangePercentage: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Expose({ name: 'has_inactive_coins' })
  hasInactiveCoins: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_page_url' })
  topGainerPageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_image_url' })
  topGainerImageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_name' })
  topGainerName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_symbol' })
  topGainerSymbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_profit_loss' })
  topGainerProfitLoss?: string
}

export class UpdatePortfolioDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'name' })
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_holdings_value' })
  totalHoldingsValue?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_cost' })
  totalCost?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'past_holdings_value' })
  pastHoldingsValue?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'holdings_change' })
  holdingsChange?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'holdings_change_percentage' })
  holdingsChangePercentage?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'profit_loss' })
  profitLoss?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'profit_loss_change_percentage' })
  profitLossChangePercentage?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'has_inactive_coins' })
  hasInactiveCoins?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_page_url' })
  topGainerPageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_image_url' })
  topGainerImageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_name' })
  topGainerName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_symbol' })
  topGainerSymbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'top_gainer_profit_loss' })
  topGainerProfitLoss?: string
}

export class ListPortfoliosRequestDto {
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
  @Expose({ name: 'user_id' })
  userId?: number
}