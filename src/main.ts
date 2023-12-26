import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingService } from './common/middleware/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const httpAdapter = app.get(HttpAdapterHost);
  const logger = await app.resolve(LoggingService);

  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter, logger));

  await app.listen(4000);

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (error: Error) => {
    logger.error('Unhandled Rejection', error.message);
  });
}
bootstrap();
