import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

import { BusinessException } from '../exceptions/business.exception'

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  async catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const httpStatus = exception.getHttpStatus()
    const msg = exception.getMessage()
    const splitMsg = msg.split('===')

    response.status(httpStatus).json({
      error_code: status,
      msg: String(splitMsg[0]).trim(),
      detail: String(splitMsg[1] || '').trim(),
      timestamp: new Date().getTime().toString(),
      path: request.url,
      error: exception.name,
    })
  }
}
