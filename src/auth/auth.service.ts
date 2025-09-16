import { TokenService } from '@lib/token'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'shared/database/entities'
import { Repository } from 'typeorm'
import {
  ChangePasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  SetPasswordDto,
  UpdateProfileDto,
} from './auth.dto'
import {
  BUSINESS_ERROR,
  BusinessException,
  checkPasswordRegex,
  currentMilliTime,
  encryptPassword,
  GRIFF_AI_DB,
  ThrowError,
} from '@lib/common'
import { USER_ROLE, USER_STATUS } from '@lib/common/enums'
import { instanceToPlain, plainToInstance } from 'class-transformer'

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity, GRIFF_AI_DB)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    if (loginDto.password.length < 8) {
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'Password must be at least 8 characters',
      )
    }
    const checkUser = await this.userRepository.findOne({
      where: {
        username: loginDto.username,
      },
    })

    if (!checkUser) {
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'Invalid username or password',
      )
    }

    if (checkUser.status !== USER_STATUS.ACTIVATED) {
      // return {
      //   user: instanceToPlain(checkUser),
      //   access_token: null,
      //   refresh_token: null,
      // }
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'User is NOT Activated!!',
      )
    }

    const user = await this.checkPasswordByUsername(
      loginDto.username,
      loginDto.password,
    )
    if (!user) {
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'Invalid username or password',
      )
    }

    return {
      user: instanceToPlain(user),
      access_token: await this.tokenService.generateToken(user),
      refresh_token: await this.tokenService.generateRefreshToken(user),
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const decoded = await this.tokenService.validateRefreshToken(
      refreshTokenDto.refresh_token,
    )
    // eslint-disable-next-line no-console
    if (!decoded) {
      throw new BusinessException(BUSINESS_ERROR.PERMISSION, 'Access denied')
    }

    const { uid } = decoded
    const user = await this.userRepository.findOne({ where: { id: uid } })
    if (!user) {
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'Invalid email or password',
      )
    }

    return {
      user: {
        id: user.id,
        username: user.username,
        status: user.status,
      },
      access_token: await this.tokenService.generateToken(user),
      refresh_token: await this.tokenService.generateRefreshToken(user),
    }
  }

  async register(registerDto: RegisterDto) {
    this.checkPassword(registerDto.password, registerDto.confirm_password)

    const user = await this.userRepository.findOne({
      where: { username: registerDto.username },
    })
    if (user && user.status !== USER_STATUS.ACTIVATED) {
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'An user with this email already exists on our system. Please Log In instead.',
      )
    }

    if (user) {
      throw new BusinessException(
        BUSINESS_ERROR.DATA_INVALID,
        'An user with this username already exists on our system. Please Log In instead.',
      )
    }

    const dataSave = plainToInstance(UserEntity, registerDto)
    const encryptPasswordUser = encryptPassword(
      registerDto.password,
      this.configService.get('global.jwt.secret'),
    )

    dataSave.password = encryptPasswordUser
    dataSave.status = USER_STATUS.ACTIVATED
    dataSave.role = USER_ROLE.NORMAL

    dataSave.createdAt = currentMilliTime()
    dataSave.updatedAt = currentMilliTime()
    const resultUser = await this.userRepository.save(dataSave)
    return {
      user: instanceToPlain(resultUser, { excludeExtraneousValues: true }),
      access_token: await this.tokenService.generateToken(resultUser, 900),
    }
  }

  async setPassword(uid: string, setPasswordDto: SetPasswordDto) {
    if (setPasswordDto.password !== setPasswordDto.confirm_password) {
      ThrowError('Password is NOT same confirm password!')
    }
    const user = await this.userRepository.findOne({ where: { id: uid } })
    if (!user) {
      ThrowError('User is NOT existed!')
    }

    if (user.password !== 'unknow') {
      ThrowError('Password already existed. You cannot set password!')
    }

    const encryptPasswordUser = encryptPassword(
      setPasswordDto.password,
      this.configService.get('global.jwt.secret'),
    )
    user.password = encryptPasswordUser
    user.updatedAt = currentMilliTime()
    const resultUser = await this.userRepository.save(user)
    return instanceToPlain(resultUser, { excludeExtraneousValues: true })
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (!resetPasswordDto.token) {
      ThrowError('Token is required!')
    }
    if (resetPasswordDto.password !== resetPasswordDto.confirm_password) {
      ThrowError('Password is NOT same confirm password!')
    }
    const dataToken = await this.tokenService.validateToken(
      resetPasswordDto.token,
    )
    const user = await this.userRepository.findOne({
      where: { id: dataToken['uid'] },
    })
    if (!user) {
      ThrowError('User is NOT existed!')
    }

    const encryptPasswordUser = encryptPassword(
      resetPasswordDto.password,
      this.configService.get('global.jwt.secret'),
    )
    user.password = encryptPasswordUser
    user.updatedAt = currentMilliTime()
    await this.userRepository.save(user)
    await this.tokenService.deleteToken(user.id)
    return true
  }

  async changePassword(uid: string, changePasswordDto: ChangePasswordDto) {
    if (changePasswordDto.password !== changePasswordDto.confirm_password) {
      ThrowError('Password is NOT same confirm password!')
    }
    const user = await this.userRepository.findOne({ where: { id: uid } })
    if (!user) {
      ThrowError('User is NOT existed!')
    }
    const isCorrectPassword = await this.checkPasswordById(
      uid,
      changePasswordDto.old_password,
    )
    if (!isCorrectPassword) {
      ThrowError('Old Password invalid!')
    }
    const encryptPasswordUser = encryptPassword(
      changePasswordDto.password,
      this.configService.get('global.jwt.secret'),
    )
    user.password = encryptPasswordUser
    user.updatedAt = currentMilliTime()
    const resultUser = await this.userRepository.save(user)
    return instanceToPlain(resultUser, { excludeExtraneousValues: true })
  }

  async updateProfile(uid: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: uid } })
    if (!user) {
      ThrowError('User is NOT existed!')
    }

    user.fullname = updateProfileDto.fullname || user.fullname
    user.birthday = updateProfileDto.birthday || user.birthday
    user.avatar = updateProfileDto.avatar || user.avatar
    user.updatedAt = currentMilliTime()
    const resultUser = await this.userRepository.save(user)
    return instanceToPlain(resultUser, { excludeExtraneousValues: true })
  }

  async getProfile(uid: string) {
    const user = await this.userRepository.findOne({
      where: { id: uid },
    })
    if (!user) {
      ThrowError('User is NOT existed!')
    }
    return instanceToPlain(user)
  }

  checkPassword(password: string, confirm_password: string) {
    if (password.length < 8) {
      ThrowError('Password must be at least 8 characters')
    }

    if (password !== confirm_password) {
      ThrowError('Password is not the same as confirm password!')
    }

    if (password.length >= 8) {
      if (!checkPasswordRegex(password)) {
        ThrowError(
          'Password must contain at least one uppercase letter and one digit',
        )
      }
    }
  }

  async checkPasswordByUsername(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    })
    if (!user) {
      return null
    }

    const encryptedPassword = encryptPassword(
      password,
      this.configService.get('global.jwt.secret'),
    )
    if (user.password === encryptedPassword) {
      return user
    }

    return null
  }

  async checkPasswordById(id: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { id, status: USER_STATUS.ACTIVATED },
    })
    if (!user) {
      return null
    }

    const encryptedPassword = encryptPassword(
      password,
      this.configService.get('global.jwt.secret'),
    )
    if (user.password === encryptedPassword) {
      return user
    }

    return null
  }
}
