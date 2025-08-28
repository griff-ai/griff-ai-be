import { applyDecorators } from '@nestjs/common'
import {
  Transform,
  TransformationType,
  TransformOptions,
} from 'class-transformer'

import BigNumberHelper from '../bignumber.helper'

export function TransformBigNumber(options?: TransformOptions) {
  return applyDecorators(
    Transform(({ type, value }) => {
      return type == TransformationType.CLASS_TO_PLAIN
        ? value?.toString()
        : new BigNumberHelper(value || 0)
    }, options),
  )
}
