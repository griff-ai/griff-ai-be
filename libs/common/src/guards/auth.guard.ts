import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { isNumberString } from 'class-validator'
import { Observable } from 'rxjs'

import { BCE_HEADER_UID } from '../common.const'
import { ThrowError } from '../exception-filters'
import { USER_ROLE } from '../enums'
import { IAccessTokenPayload } from 'src/middlewares/validate-access-token.middleware'

@Injectable()
export class AuthAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    // Allow only Admin
    const info: IAccessTokenPayload = request['accessTokenInfo']
    if (info && info.role !== USER_ROLE.ADMIN) {
      ThrowError('Permission denied!')
    }
    return true
  }
}

@Injectable()
export class AuthProviderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    // Allow only Admin
    const info: IAccessTokenPayload = request['accessTokenInfo']
    if (
      info &&
      info.role !== USER_ROLE.ADMIN &&
      info.role !== USER_ROLE.PROVIDER
    ) {
      ThrowError('Permission denied!')
    }
    return true
  }
}
