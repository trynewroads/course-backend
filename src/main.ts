import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ApiConfigService } from './config/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const apiConfigService = app.get(ApiConfigService);

  if (apiConfigService.debugRequest) {
    app.useGlobalInterceptors(new LoggingInterceptor(apiConfigService));
  }

  const config = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('API para manejar tareas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(apiConfigService.port);
}
void bootstrap();
