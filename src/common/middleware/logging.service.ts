import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  log(message: string) {
    this.writeToFile('📢 ' + message);
  }

  error(message: string | unknown, trace: string) {
    this.writeToFile('❌ ' + message);
    this.writeToFile('🔍 Stack Trace: ' + trace);
  }

  warn(message: string) {
    this.writeToFile('⚠️ ' + message);
  }

  debug(message: string) {
    this.writeToFile('🐞 ' + message);
  }

  private writeToFile(message: string) {
    const logStream = fs.createWriteStream('logs.txt', { flags: 'a' });

    // eslint-disable-next-line prettier/prettier
    logStream.write(`${ message }\n`);
    logStream.end();
  }
}
