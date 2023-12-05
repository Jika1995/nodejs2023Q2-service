import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from '../middleware/logging.service';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> {
  private readonly loggingService: LoggingService;

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
    });

    this.loggingService.error(error);
  }
}
