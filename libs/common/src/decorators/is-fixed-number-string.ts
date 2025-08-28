import {
  isDecimal,
  notContains,
  registerDecorator,
  ValidationOptions,
} from 'class-validator'

import { MAX_NUMBER_DECIMALS } from '../common.const'

export function IsFixedNumberString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isFixedNumberString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            isDecimal(value, { decimal_digits: '0,' + MAX_NUMBER_DECIMALS }) &&
            notContains(value, '+')
          )
        },
      },
    })
  }
}
