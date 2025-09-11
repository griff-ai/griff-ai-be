import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class ListCommonRequestDto {
  @ApiProperty({
    example: '1',
    description: 'current page index',
    required: false,
  })
  @IsOptional()
  @Expose({ name: 'page' })
  page?: number

  @ApiProperty({
    example: '20',
    description: 'current page limit',
    required: false,
  })
  @IsOptional()
  @Expose({ name: 'limit' })
  limit?: number

  @ApiProperty({ name: 'search_field', required: false })
  @Expose({ name: 'search_field' })
  searchField: string

  @ApiProperty({ name: 'search_text', required: false })
  @Expose({ name: 'search_text' })
  searchText: string
}
