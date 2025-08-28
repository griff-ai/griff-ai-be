import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export function RequiredIf(
  condition: (object: any, value: any) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'requiredIf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [condition],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [condition] = args.constraints
          if (condition(args.object, value)) {
            if (Array.isArray(value)) {
              return value.length > 0
            }
            return !!value
          }
          return true
        },
      },
    })
  }
}
