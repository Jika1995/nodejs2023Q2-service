import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

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
    console.log(message);
  }
}
