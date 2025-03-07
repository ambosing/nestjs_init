import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/exception/http-expcetion.filter';
import { AllExceptionsFilter } from './common/exception/all-expcetion.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const documentOptions = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api-docs', app, document);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
