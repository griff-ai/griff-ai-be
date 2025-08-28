import { InjectRedis } from '@lib/redis'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Redis } from 'ioredis'
import { UserEntity } from 'shared/database/entities'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Crypto = require('crypto')

@Injectable()
export class TokenService {
  secretKey = process.env.TOKEN_SECRET_KEY
  secretIv = process.env.TOKEN_SECRET_IV
  encryptionMethod = process.env.TOKEN_ENCRYPTION_METHOD
  key: string
  iv: string
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,

    @InjectRedis()
    private readonly redis: Redis,
  ) {
    this.key = Crypto.createHash('sha512')
      .update(this.secretKey, 'utf-8')
      .digest('hex')
      .substr(0, 32)
    this.iv = Crypto.createHash('sha512')
      .update(this.secretIv, 'utf-8')
      .digest('hex')
      .substr(0, 16)
  }

  async checkDeviceLogin(uid: string, token: string) {
    let check = await this.redis.get(uid)
    if (check) {
      check = JSON.parse(String(check))
      if (check !== token) {
        new BadRequestException('User login in another device!')
      }
    } else {
      await this.redis.set(uid, JSON.stringify(token))
    }
  }

  async setToken(uid: string, token: string, expire = null) {
    await this.deleteToken(uid)
    await this.redis.set(
      `token_${uid}`,
      JSON.stringify(token),
      'EX',
      expire ? expire : this.configService.get<number>('global.jwt.exp'),
    )
  }

  async getToken(uid: string) {
    const check = await this.redis.get(`token_${uid}`)
    if (check) {
      return JSON.parse(String(check))
    }
    return null
  }

  async deleteToken(uid: string) {
    await this.redis.set(`token_${uid}`, '')
  }

  async generateToken(user: UserEntity, expire = null) {
    const payload = {
      username: user.username,
      uid: user.id,
      role: user.role,
    }

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('global.jwt.secret'),
      expiresIn: expire
        ? expire
        : this.configService.get<number>('global.jwt.exp'),
    })

    await this.setToken(user.id, token, expire)

    return token
  }

  async validateToken(token: string, isOneTime = false) {
    try {
      const info = this.jwtService.verify(token, {
        secret: this.configService.get('global.jwt.secret'),
      })
      if (!isOneTime) {
        const saveToken = await this.getToken(info['uid'])
        if (saveToken !== token) {
          return null
        }
      }

      return info
    } catch (e) {
      return null
    }
  }

  async generateRefreshToken(user: UserEntity, expire = null) {
    const payload = {
      username: user.username,
      uid: user.id,
      role: user.role,
    }

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('global.jwt.secret_refresh'),
      expiresIn: this.configService.get<number>('global.jwt.exp_refresh'),
    })
    await this.setToken(
      `refresh_${user.id}`,
      token,
      this.configService.get<number>('global.jwt.exp_refresh'),
    )
    return token
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const info = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('global.jwt.secret_refresh'),
      })
      const saveToken = await this.getToken(`refresh_${info['uid']}`)
      if (saveToken !== refreshToken) {
        return null
      }

      return info
    } catch (e) {
      return null
    }
  }

  encryptKey(key: string, secret: string) {
    const payload = {
      key,
    }
    return this.jwtService.sign(payload, {
      secret,
      expiresIn: '70000d',
    })
  }

  decryptKey(token: string, secret: string) {
    try {
      return this.jwtService.verify(token, {
        secret,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return null
    }
  }

  encryptKeyHash(plainText: string) {
    const encryption = Crypto.createCipheriv(
      this.encryptionMethod,
      this.key,
      this.iv,
    )
    const aes_encrypted =
      encryption.update(plainText, 'utf8', 'base64') +
      encryption.final('base64')
    return Buffer.from(aes_encrypted).toString('base64')
  }

  decryptKeyHash(encryptedMessage: string) {
    const buff = Buffer.from(encryptedMessage, 'base64')
    encryptedMessage = buff.toString('utf-8')
    const decryption = Crypto.createDecipheriv(
      this.encryptionMethod,
      this.key,
      this.iv,
    )
    return (
      decryption.update(encryptedMessage, 'base64', 'utf8') +
      decryption.final('utf8')
    )
  }
}
