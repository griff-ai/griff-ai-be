import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { ListCommonRequestDto } from 'src/common.dto'

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
  })
  @Expose({ name: 'username' })
  username: string

  @ApiProperty({
    description: 'Fullname of the user',
  })
  @Expose({ name: 'fullname' })
  fullname: string

  @ApiProperty({
    description: 'Email of the user',
  })
  @Expose({ name: 'email' })
  email: string

  @ApiProperty({
    description: 'birthday of the user',
  })
  @Expose({ name: 'birthday' })
  birthday: string

  @ApiProperty({
    description: 'Phone of the user',
  })
  @Expose({ name: 'phone' })
  @IsOptional()
  phone: string

  @ApiProperty({
    description: 'CCCD of the user',
  })
  @Expose({ name: 'cccd' })
  @IsOptional()
  cccd: string

  @ApiProperty({
    description: 'password of the user',
  })
  @Expose({ name: 'password' })
  password: string

  @ApiProperty()
  @Expose({ name: 'avatar' })
  avatar: string

  @ApiProperty()
  @Expose({ name: 'role' })
  role: number

  @ApiProperty()
  @Expose({ name: 'status' })
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
  @Expose({ name: 'fullname' })
  @IsOptional()
  fullname: string

  @ApiProperty({
    description: 'Email of the user',
  })
  @Expose({ name: 'email' })
  @IsOptional()
  email: string

  @ApiProperty({
    description: 'password of the user',
  })
  @Expose({ name: 'password' })
  password: string

  @ApiProperty({
    description: 'birthday of the user',
  })
  @Expose({ name: 'birthday' })
  @IsOptional()
  birthday: string

  @ApiProperty({
    description: 'Phone of the user',
  })
  @Expose({ name: 'phone' })
  @IsOptional()
  phone: string

  @ApiProperty({
    description: 'CCCD of the user',
  })
  @Expose({ name: 'cccd' })
  @IsOptional()
  cccd: string

  @ApiProperty()
  @Expose({ name: 'avatar' })
  @IsOptional()
  avatar: string

  @ApiProperty()
  @Expose({ name: 'role' })
  @IsOptional()
  role: number

  @ApiProperty()
  @Expose({ name: 'status' })
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
  @Expose({ name: 'username' })
  @IsOptional()
  username: string

  @ApiProperty({
    description: 'Fullname of the user',
  })
  @Expose({ name: 'fullname' })
  @IsOptional()
  fullname: string

  @ApiProperty({
    description: 'Email of the user',
  })
  @Expose({ name: 'email' })
  @IsOptional()
  email: string

  @ApiProperty({
    description: 'birthday of the user',
  })
  @Expose({ name: 'birthday' })
  @IsOptional()
  birthday: string

  @ApiProperty({
    description: 'Phone of the user',
  })
  @Expose({ name: 'phone' })
  @IsOptional()
  phone: string

  @ApiProperty({
    description: 'CCCD of the user',
  })
  @Expose({ name: 'cccd' })
  @IsOptional()
  cccd: string

  @ApiProperty()
  @Expose({ name: 'role' })
  @IsOptional()
  role: number

  @ApiProperty()
  @Expose({ name: 'status' })
  @IsOptional()
  status: number
}
