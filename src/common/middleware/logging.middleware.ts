/* eslint-disable prettier/prettier */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { body, originalUrl, method, params } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const message = `body: ${ JSON.stringify(body) }, url: ${ method }${ originalUrl }, params: ${ Object.entries(params).map(
        (item) => `${ item }, `,
      ) }, statusCode: ${ statusCode }`
      if (statusCode >= 500) {
        return this.logger.error(message)
      }
      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    next();
  }
}
