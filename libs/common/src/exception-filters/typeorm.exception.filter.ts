import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { QueryFailedError, EntityNotFoundError } from 'typeorm'

@Catch(QueryFailedError, EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(
    exception: QueryFailedError | EntityNotFoundError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'

    if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST
      message = exception.message
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    response.status(status).json({
      error_code: status,
      timestamp: new Date().getTime().toString(),
      path: request.url,
      message: message,
      error: exception.name,
    })
  }
}
