import { HttpStatus } from '@nestjs/common'

export interface IResponse {
  code: number
  message: string
}
export class BusinessException extends Error {
  private readonly response: IResponse
  private readonly status: number
  private readonly httpStatus: number

  constructor(
    response: IResponse,
    detail: string = '',
    httpStatus: number = HttpStatus.BAD_REQUEST,
  ) {
    super()
    this.response = response || null
    this.status = this.response['code']
    this.message = detail
      ? `${this.response.message} === ${detail}`
      : this.response.message
    this.httpStatus = httpStatus
    this.initName()
  }

  initName() {
    this.name = this.constructor.name
  }

  getResponse() {
    return this.response
  }

  getMessage() {
    return this.message
  }

  getStatus() {
    return this.status
  }

  getHttpStatus() {
    return this.httpStatus
  }
}
