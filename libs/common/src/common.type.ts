import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'
import { Request } from 'express'
import { BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm'

export interface IRequestWithToken extends Request {
  userId: string
  realIp?: string
}

export enum Role {
  USER = 'user',
  GUESS = 'guess',
}

export enum EValidationError {
  REQUIRED = 'validation.required',
  EXISTED = 'validation.existed',
  IS_ENUM = 'validation.isEnum',
  IS_NUMBER = 'validation.isNumber',
  MIN = 'validation.min',
}

export const TokenError = {
  INVALID: { code: 42001, message: 'TOKEN.INVALID' },
  EXPIRED: { code: 42002, message: 'TOKEN.EXPIRED' },
}

export interface IRetryOptions {
  delay: number
  maxRetries: number
}

export class CustomBaseEntity {
  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @ApiProperty()
  @Expose()
  @Column()
  @Type(() => Number)
  createdAt: number

  @BeforeInsert()
  beforeInsert() {
    if (!this.createdAt) this.createdAt = Date.now()
  }
}

export class BaseFilterDto {
  @ApiPropertyOptional({ name: 'sort_field' })
  @Expose({ name: 'sort_field' })
  sortField?: string

  @ApiPropertyOptional({ name: 'sort_type' })
  @Expose({ name: 'sort_type' })
  sortType?: string

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value && value > 100 ? 100 : value))
  @IsNumber()
  limit?: number
}

export interface IBaseFilter {
  sortField?: string
  sortType?: string
  page?: number
  limit?: number
}

export class Pagination {
  @Expose()
  page: number

  @Expose()
  size: number

  @Expose()
  total: number
}

export const DEFAULT_PAGINATE_LIMIT = 25
