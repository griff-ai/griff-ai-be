import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = exception.message;

    response.status(status).json({
      error_code: status,
      msg: msg,
      timestamp: new Date().getTime().toString(),
      path: request.url,
    });
  }
}

export const ThrowError = (error?: any, statusCode?: HttpStatus) => {
  let errorMessage: string;
  if (error && error.response && error.response.error) {
    errorMessage = error.response.error;
  } else if (error && error.message) {
    errorMessage = error.message;
  } else {
    errorMessage = error;
  }
  throw new HttpException(
    {
      status: statusCode ? statusCode : HttpStatus.BAD_REQUEST,
      error: errorMessage,
    },
    statusCode ? statusCode : HttpStatus.BAD_REQUEST,
  );
};
