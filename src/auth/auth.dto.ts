import { IsNotEmpty, IsNumberString, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'

export class RegisterDto {
  @ApiProperty({
    description: 'Username of user',
  })
  @Expose()
  username: string

  @ApiProperty({
    description: 'Fullname of user',
  })
  @Expose()
  fullname: string

  @ApiProperty({
    description: 'Password',
  })
  @Expose()
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
  @Expose()
  token: string
}

export class VerifyTokenDto {
  @ApiProperty({
    description: 'Token verify',
  })
  @Expose()
  token: string
}

export class SetPasswordDto {
  @ApiProperty({
    description: 'Password',
  })
  @Expose()
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
  @Expose()
  username: string
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token',
  })
  @Expose()
  token: string

  @ApiProperty({
    description: 'New Password',
  })
  @Expose()
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
  @Expose()
  old_password: string

  @ApiProperty({
    description: 'New Password',
  })
  @Expose()
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
  @Expose()
  username: string

  @ApiProperty({
    description: 'Password',
  })
  @Expose()
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
  @Expose()
  fullname: string

  @ApiProperty({
    description: 'Birthday of user',
  })
  @Expose()
  birthday: string

  @ApiProperty({
    description: 'Phone of user',
  })
  @Expose()
  phone: string

  @ApiProperty({
    description: 'Cccd of user',
  })
  @Expose()
  cccd: string

  @ApiProperty({
    description: 'Avatar of user',
  })
  @Expose()
  avatar: string
}
