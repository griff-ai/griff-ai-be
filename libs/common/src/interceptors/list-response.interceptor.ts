import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { map, Observable } from 'rxjs'

export interface Response<T> {
  data: T
  pagination?: any
}
@Injectable()
export class ListResponseInterceptor<T>
  implements NestInterceptor<T, Response<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    return next.handle().pipe(
      map((data) => ({
        data: data
          ? instanceToPlain(data.data || data, {
              enableImplicitConversion: true,
            })
          : null,
        pagination: data?.pagination,
      })),
    )
  }
}
