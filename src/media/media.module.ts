import { RedisModule } from '@lib/redis'
import { TokenModule } from '@lib/token'
import { Module } from '@nestjs/common'
import { MediaController } from './media.controller'
import { MulterModule } from '@nestjs/platform-express'
import { MediaService } from './media.service'
import { HttpClientModule } from '@lib/http-client'

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    RedisModule,
    TokenModule,
    HttpClientModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
