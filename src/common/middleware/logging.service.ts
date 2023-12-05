import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  logError(error: any) {
    // eslint-disable-next-line prettier/prettier
    this.log(`error ${ error }`);
  }
}
