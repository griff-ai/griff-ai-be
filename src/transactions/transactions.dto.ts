import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator'
import { Type, Expose } from 'class-transformer'

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
  TRANSFER = 'TRANSFER',
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'coin_id' })
  coinId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'fees' })
  fees: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'price' })
  price: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'proceeds' })
  proceeds: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'cost' })
  cost: string

  @ApiProperty({ enum: TransactionType })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  @Expose({ name: 'transaction_type' })
  transactionType: TransactionType

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'profit_loss' })
  profitLoss: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'quantity' })
  quantity: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'currency' })
  currency?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Expose({ name: 'transaction_timestamp' })
  transactionTimestamp: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'notes' })
  notes?: string
}

export class UpdateTransactionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Expose({ name: 'coin_id' })
  coinId?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'fees' })
  fees?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'price' })
  price?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'proceeds' })
  proceeds?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'cost' })
  cost?: string

  @ApiProperty({ enum: TransactionType, required: false })
  @IsOptional()
  @IsEnum(TransactionType)
  @Expose({ name: 'transaction_type' })
  transactionType?: TransactionType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'profit_loss' })
  profitLoss?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'quantity' })
  quantity?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'currency' })
  currency?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  @Expose({ name: 'transaction_timestamp' })
  transactionTimestamp?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'notes' })
  notes?: string
}

export class ListTransactionsRequestDto {
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

  @ApiProperty({ enum: TransactionType, required: false })
  @IsOptional()
  @IsEnum(TransactionType)
  @Expose({ name: 'transaction_type' })
  transactionType?: TransactionType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  @Expose({ name: 'date_from' })
  dateFrom?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  @Expose({ name: 'date_to' })
  dateTo?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose({ name: 'coin_id' })
  coinId?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'transaction_hash' })
  transactionHash?: string
}
