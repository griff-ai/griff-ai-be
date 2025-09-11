import { IsNotEmpty, IsNumberString, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'

export class RegisterDto {
  @ApiProperty({
    description: 'Username of user',
  })
  @Expose({ name: 'username' })
  username: string

  @ApiProperty({
    description: 'Fullname of user',
  })
  @Expose({ name: 'fullname' })
  fullname: string

  @ApiProperty({
    description: 'Password',
  })
  @Expose({ name: 'password' })
  password: string

  @ApiProperty({
    description: 'Confirm Password',
  })
  @Expose()
  confirm_password: string
}

export class VerifyRegisterDto {
  @ApiProperty({
    description: 'Token verify register',
  })
  @Expose({ name: 'token' })
  token: string
}

export class VerifyTokenDto {
  @ApiProperty({
    description: 'Token verify',
  })
  @Expose({ name: 'token' })
  token: string
}

export class SetPasswordDto {
  @ApiProperty({
    description: 'Password',
  })
  @Expose({ name: 'password' })
  password: string

  @ApiProperty({
    description: 'Confirm Password',
  })
  @Expose()
  confirm_password: string
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Username',
  })
  @Expose({ name: 'username' })
  username: string
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token',
  })
  @Expose({ name: 'token' })
  token: string

  @ApiProperty({
    description: 'New Password',
  })
  @Expose({ name: 'password' })
  password: string

  @ApiProperty({
    description: 'Confirm New Password',
  })
  @Expose()
  confirm_password: string
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old Password',
  })
  @Expose({ name: 'old_password' })
  old_password: string

  @ApiProperty({
    description: 'New Password',
  })
  @Expose({ name: 'password' })
  password: string

  @ApiProperty({
    description: 'Confirm New Password',
  })
  @Expose()
  confirm_password: string
}

export class LoginDto {
  @ApiProperty({
    description: 'Username of user',
  })
  @Expose({ name: 'username' })
  username: string

  @ApiProperty({
    description: 'Password',
  })
  @Expose({ name: 'password' })
  password: string
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh Token Google',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string
}

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Fullname of user',
  })
  @Expose({ name: 'fullname' })
  fullname: string

  @ApiProperty({
    description: 'Birthday of user',
  })
  @Expose({ name: 'birthday' })
  birthday: string

  @ApiProperty({
    description: 'Avatar of user',
  })
  @Expose({ name: 'avatar' })
  avatar: string
}
