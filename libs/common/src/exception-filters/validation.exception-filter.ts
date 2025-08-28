import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { camelToUnderscore, flattenErrors } from '../common.helper';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  async catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = exception.message;
    let errors = exception.errors;
    if (errors && errors.length > 0) {
      const tempResponseErrors = flattenErrors(errors);
      errors = errors.map((err) => {
        const property = camelToUnderscore(err.property);
        return {
          property: property,
          error_code: '400001',
          msg: tempResponseErrors[err.property]
            .replace(`${err.property}`, `${property}`)
            .toLocaleUpperCase(),
        };
      });
    }

    response.status(status).json({
      error_code: status,
      msg: msg,
      errors: errors,
      timestamp: new Date().getTime().toString(),
      path: request.url,
    });
  }
}
