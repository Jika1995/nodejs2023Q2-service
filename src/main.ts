import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingService } from './common/middleware/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception', error.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (error: Error) => {
    console.error('Unhandled Rejection', error.message);
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library App')
    .setDescription('The App API description')
    .setVersion('1.0')
    .addTag('home-library')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
