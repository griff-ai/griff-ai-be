import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fees: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  price: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  proceeds: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cost: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transactionType: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profitLoss: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quantity: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  transactionTimestamp: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string
}

export class UpdateTransactionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fees?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  price?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  proceeds?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cost?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transactionType?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profitLoss?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  quantity?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  transactionTimestamp?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string
}

export class ListTransactionsRequestDto {
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
  transactionType?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateFrom?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateTo?: string
}