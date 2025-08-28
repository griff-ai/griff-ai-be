import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { TokenService } from '@lib/token'
import { Request } from 'express'
import { BusinessException, TOKEN_ERROR } from '@lib/common'

export interface IAccessTokenPayload {
  username: string
  uid: string
  role: number
}

export interface IRequestWithAccessToken extends Request {
  accessTokenInfo: IAccessTokenPayload
}

@Injectable()
export class ValidateAccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: IRequestWithAccessToken, res: Response, next: () => void) {
    const authorization = req.header('Authorization') || ''
    const accessToken = authorization.split(' ')[1]

    const decoded = await this.tokenService.validateToken(accessToken)
    if (!decoded) {
      throw new BusinessException(
        TOKEN_ERROR.ACCESS_DENIED,
        '',
        HttpStatus.UNAUTHORIZED,
      )
    }

    const now = new Date().getTime()
    if (decoded && decoded.exp * 1000 < now) {
      throw new BusinessException(
        TOKEN_ERROR.EXPIRED,
        '',
        HttpStatus.UNAUTHORIZED,
      )
    }
    req.accessTokenInfo = decoded
    next()
  }
}
