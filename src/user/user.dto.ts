import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { ListCommonRequestDto } from 'src/common.dto'

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
  })
  @Expose()
  username: string

  @ApiProperty({
    description: 'Fullname of the user',
  })
  @Expose()
  fullname: string

  @ApiProperty({
    description: 'Email of the user',
  })
  @Expose()
  email: string

  @ApiProperty({
    description: 'birthday of the user',
  })
  @Expose()
  birthday: string

  @ApiProperty({
    description: 'Phone of the user',
  })
  @Expose()
  @IsOptional()
  phone: string

  @ApiProperty({
    description: 'CCCD of the user',
  })
  @Expose()
  @IsOptional()
  cccd: string

  @ApiProperty({
    description: 'password of the user',
  })
  @Expose()
  password: string

  @ApiProperty()
  @Expose()
  avatar: string

  @ApiProperty()
  @Expose()
  role: number

  @ApiProperty()
  @Expose()
  status: number

  @ApiProperty({ name: 'provider_id', required: false })
  @Expose({ name: 'provider_id' })
  providerId: string

  @ApiProperty({ name: 'project_id', required: false })
  @Expose({ name: 'project_id' })
  projectId: string
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Fullname of the user',
  })
  @Expose()
  @IsOptional()
  fullname: string

  @ApiProperty({
    description: 'Email of the user',
  })
  @Expose()
  @IsOptional()
  email: string

  @ApiProperty({
    description: 'password of the user',
  })
  @Expose()
  password: string

  @ApiProperty({
    description: 'birthday of the user',
  })
  @Expose()
  @IsOptional()
  birthday: string

  @ApiProperty({
    description: 'Phone of the user',
  })
  @Expose()
  @IsOptional()
  phone: string

  @ApiProperty({
    description: 'CCCD of the user',
  })
  @Expose()
  @IsOptional()
  cccd: string

  @ApiProperty()
  @Expose()
  @IsOptional()
  avatar: string

  @ApiProperty()
  @Expose()
  @IsOptional()
  role: number

  @ApiProperty()
  @Expose()
  @IsOptional()
  status: number

  @ApiProperty({ name: 'provider_id', required: false })
  @Expose({ name: 'provider_id' })
  @IsOptional()
  providerId: string

  @ApiProperty({ name: 'project_id', required: false })
  @Expose({ name: 'project_id' })
  projectId: string
}

export class ListUserRequestDto extends ListCommonRequestDto {
  @ApiProperty({
    description: 'Username of the user',
  })
  @Expose()
  @IsOptional()
  username: string

  @ApiProperty({
    description: 'Fullname of the user',
  })
  @Expose()
  @IsOptional()
  fullname: string

  @ApiProperty({
    description: 'Email of the user',
  })
  @Expose()
  @IsOptional()
  email: string

  @ApiProperty({
    description: 'birthday of the user',
  })
  @Expose()
  @IsOptional()
  birthday: string

  @ApiProperty({
    description: 'Phone of the user',
  })
  @Expose()
  @IsOptional()
  phone: string

  @ApiProperty({
    description: 'CCCD of the user',
  })
  @Expose()
  @IsOptional()
  cccd: string

  @ApiProperty()
  @Expose()
  @IsOptional()
  role: number

  @ApiProperty()
  @Expose()
  @IsOptional()
  status: number
}
