import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { map, Observable } from 'rxjs'

export interface Response<T> {
  result: boolean
  item: T
  message: string
}
@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, Response<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    return next.handle().pipe(
      map((data) => ({
        message: '',
        item: data ? instanceToPlain(data) : null,
        result: true,
      })),
    )
  }
}
