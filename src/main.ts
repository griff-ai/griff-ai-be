import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ValidationError } from 'class-validator'
import {
  ApiValidationExceptionFilter,
  BusinessExceptionFilter,
  ValidationException,
} from '@lib/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TypeOrmExceptionFilter } from '@lib/common/exception-filters/typeorm.exception.filter'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  const configService = app.get(ConfigService)
  const PORT = configService.get('API_PORT') || 3000
  const ENV = configService.get('global.env')
  const URL_PREFIX = configService.get('URL_PREFIX')

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      transform: true,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(validationErrors)
      },
    }),
  )

  app.useGlobalFilters(
    new ApiValidationExceptionFilter(),
    new BusinessExceptionFilter(),
    new TypeOrmExceptionFilter(),
  )

  if (ENV == 'local' || ENV == 'dev') {
    const config = new DocumentBuilder()
      .setTitle('API Public')
      .addServer(URL_PREFIX || '')
      .addBearerAuth({
        type: 'http',
        description: 'Access token',
      })
      .setDescription('API Public')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('document', app, document)
  }

  await app.listen(PORT)

  logger.debug(`API Public started in ENV ${ENV}, port ${PORT}`)
}
bootstrap()
