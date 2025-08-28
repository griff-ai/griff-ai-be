import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import * as Sentry from '@sentry/minimal'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { BusinessException } from '../exceptions/business.exception'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        error: (exception: Error) => {
          const ignoreExceptions = [
            BusinessException,
            ValidationException,
            HttpException,
          ]
          if (!ignoreExceptions.some((type) => exception instanceof type)) {
            Sentry.captureException(exception)
          }
        },
      }),
    )
  }
}
