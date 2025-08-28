import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {
  ChangePasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  UpdateProfileDto,
} from './auth.dto'
import { IRequestWithAccessToken } from 'src/middlewares/validate-access-token.middleware'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() request: LoginDto) {
    return this.authService.login(request)
  }

  @Post('/refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto)
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto)
  }

  @Post('/change-password')
  @ApiBearerAuth('access-token')
  async changePassword(
    @Req() request: IRequestWithAccessToken,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const tokenInfo = request['accessTokenInfo']
    return await this.authService.changePassword(
      tokenInfo['uid'],
      changePasswordDto,
    )
  }

  @Post('/update-profile')
  @ApiBearerAuth('access-token')
  async updateProfile(
    @Req() request: IRequestWithAccessToken,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const tokenInfo = request['accessTokenInfo']
    return await this.authService.updateProfile(
      tokenInfo['uid'],
      updateProfileDto,
    )
  }

  @Get('/get-profile')
  @ApiBearerAuth('access-token')
  async getProfile(@Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return await this.authService.getProfile(tokenInfo['uid'])
  }
}
