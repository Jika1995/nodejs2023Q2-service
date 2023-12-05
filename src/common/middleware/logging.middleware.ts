/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body, url, method, params } = req;

    JSON.stringify(body);

    res.on('finish', () => {
      const { statusCode } = res;

      console.log(
        `body: ${ body }, url: ${ method } ${ url }, params: ${ Object.entries(params).map(
          (item) => `${ item }, `,
        ) }, statusCode: ${ statusCode } `,
      );
    });
    next();
  }
}
