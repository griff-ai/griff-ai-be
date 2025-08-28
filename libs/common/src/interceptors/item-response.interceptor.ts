import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { map, Observable } from 'rxjs'

@Injectable()
export class ItemResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        ...(data
          ? instanceToPlain(data.data || data, {
              enableImplicitConversion: true,
            })
          : null),
      })),
    )
  }
}
