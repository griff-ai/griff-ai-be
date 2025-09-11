import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator'
import { Type, Expose } from 'class-transformer'

export class CreateCoinDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'id' })
  id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'symbol' })
  symbol: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'name' })
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'slug' })
  slug: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'image_url' })
  imageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'current_price' })
  currentPrice?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'market_cap' })
  marketCap?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Expose({ name: 'market_cap_rank' })
  marketCapRank?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_volume' })
  totalVolume?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'circulating_supply' })
  circulatingSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_supply' })
  totalSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'max_supply' })
  maxSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'price_change_24h' })
  priceChange24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'price_change_percentage_24h' })
  priceChangePercentage24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @Expose({ name: 'last_updated' })
  lastUpdated?: Date
}

export class UpdateCoinDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'symbol' })
  symbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'name' })
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'slug' })
  slug?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'image_url' })
  imageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'current_price' })
  currentPrice?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'market_cap' })
  marketCap?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Expose({ name: 'market_cap_rank' })
  marketCapRank?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_volume' })
  totalVolume?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'circulating_supply' })
  circulatingSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'total_supply' })
  totalSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'max_supply' })
  maxSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'price_change_24h' })
  priceChange24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'price_change_percentage_24h' })
  priceChangePercentage24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @Expose({ name: 'last_updated' })
  lastUpdated?: Date
}

export class ListCoinsRequestDto {
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
  @IsString()
  @Expose({ name: 'symbol' })
  symbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'name' })
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'slug' })
  slug?: string
}
