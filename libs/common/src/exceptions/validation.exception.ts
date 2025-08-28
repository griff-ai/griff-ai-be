import { BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

import { VALIDATION_ERROR } from '../common.const'

export class ValidationException extends BadRequestException {
  errors: ValidationError[]

  constructor(errors: ValidationError[]) {
    super(VALIDATION_ERROR)
    this.errors = errors
  }
}
