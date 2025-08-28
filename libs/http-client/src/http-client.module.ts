import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpClientService } from './http-client.service'
import { HttpModule } from '@nestjs/axios'
import { globalConfig } from 'config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('global.http.http_timeout'),
        maxRedirects: configService.get('global.http.http_max_redirects'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
