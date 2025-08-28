import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { Request, Response } from 'express'

import { camelToUnderscore } from '../common.helper'
import { ValidationException } from '../exceptions'

type ResponseBody = {
  timestamp: number
  path: string
  msg: string | string[]
  error_code: number
  errors: any[]
}

export interface CustomValidationError {
  error_code: number
  property: string
  msg: string
  msg_values: Record<string, unknown>
}

@Catch(ValidationException)
export class ApiValidationExceptionFilter implements ExceptionFilter {
  async catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const msg = exception.message
    const status = exception.getStatus()
    const flattenedErrors = this.flattenErrors(exception.errors)
    const body: ResponseBody = {
      error_code: status,
      msg: msg,
      errors: flattenedErrors,
      timestamp: new Date().getTime(),
      path: request.url,
    }
    response.status(exception.getStatus()).json(body)
  }

  protected flattenErrors(
    validationErrors: ValidationError[],
    prefix = '',
  ): CustomValidationError[] {
    const initialValue: CustomValidationError[] = []
    return validationErrors.reduce(
      (flattened, { property, constraints, children, value }) => {
        let item: CustomValidationError
        const arrayCode = Object.values(constraints)
        if (arrayCode.length) {
          for (const messageCode of arrayCode) {
            const propertyConvert = camelToUnderscore(property)
            const msgValidate = messageCode.replace(
              `${property}`,
              `${propertyConvert}`,
            )
            const errorCode = 1000
            item = {
              error_code: errorCode,
              property: propertyConvert,
              msg: msgValidate,
              msg_values: undefined,
            }
          }
        }
        if (value && typeof value === 'object') {
          item.msg_values = value
        }
        flattened.push(item)
        if (children && children.length) {
          flattened = flattened.concat(this.flattenErrors(children, property))
        }
        return flattened
      },
      initialValue,
    )
  }
}
