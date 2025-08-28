import { applyDecorators } from '@nestjs/common'
import {
  instanceToPlain,
  plainToInstance,
  Transform,
  TransformOptions,
} from 'class-transformer'
import { ValueTransformer } from 'typeorm'

interface IJsonColumnTransformerOptions {
  type?: any
  isArray?: boolean
}

export function JsonColumnTransformer(
  options?: IJsonColumnTransformerOptions,
): ValueTransformer {
  const { isArray, type } = options || {}
  return {
    to: (value) => {
      if (type) {
        value = instanceToPlain(
          plainToInstance(type, value, { ignoreDecorators: true }),
        )
      }
      return JSON.stringify(value || (isArray ? [] : {}))
    },
    from: (value) => {
      let result = JSON.parse(value || (isArray ? '[]' : '{}'))
      if (type) {
        result = plainToInstance(type, result)
      }
      return result
    },
  }
}

export function ExcludeWithGroup(group: string, options?: TransformOptions) {
  return applyDecorators(
    Transform(({ value, options }) => {
      return options.groups?.length && options.groups.includes(group)
        ? undefined
        : value
    }, options),
  )
}
