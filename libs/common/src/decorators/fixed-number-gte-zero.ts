import { registerDecorator, ValidationOptions } from 'class-validator'

import BigNumberHelper from '../bignumber.helper'

export function FixedNumberGteZero(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'FixedNumberGteZero',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return BigNumberHelper.from(value).isPositiveOrZero()
        },
      },
    })
  }
}
