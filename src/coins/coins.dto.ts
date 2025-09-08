import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateCoinDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  symbol: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currentPrice?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  marketCap?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  marketCapRank?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalVolume?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  circulatingSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  maxSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priceChange24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priceChangePercentage24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  lastUpdated?: Date
}

export class UpdateCoinDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  symbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currentPrice?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  marketCap?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  marketCapRank?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalVolume?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  circulatingSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  maxSupply?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priceChange24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priceChangePercentage24h?: string

  @ApiProperty({ required: false })
  @IsOptional()
  lastUpdated?: Date
}

export class ListCoinsRequestDto {
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
  @IsString()
  symbol?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string
}