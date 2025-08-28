import { registerDecorator, ValidationOptions } from 'class-validator'

import BigNumberHelper from '../bignumber.helper'

export function FixedNumberIsPositive(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'fixedNumberIsPositive',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return BigNumberHelper.from(value).isPositive()
        },
      },
    })
  }
}
