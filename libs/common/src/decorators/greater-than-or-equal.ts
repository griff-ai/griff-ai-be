import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

import BigNumberHelper from '../bignumber.helper'

export function GreaterThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'gte',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedPropertyValue = (args.object as any)[relatedPropertyName]
          return !BigNumberHelper.from(value)
            .sub(relatedPropertyValue)
            .isNegative()
        },
      },
    })
  }
}
