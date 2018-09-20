import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { LOGGER_LEVEL, LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {

  constructor(@Inject(LOGGER_WINSTON_PROVIDER) private readonly winston: Logger) {}

  public log(level: LOGGER_LEVEL, msg: string, ...meta): void {
    this.winston.log(level, msg, ...meta);
  }

  public debug(msg: string, ...meta): void {
    this.log(LOGGER_LEVEL.DEBUG, msg, ...meta);
  }

  public error(msg: string, ...meta): void {
    this.log(LOGGER_LEVEL.ERROR, msg, ...meta);
  }

  public warn(msg: string, ...meta): void {
    this.log(LOGGER_LEVEL.WARNING, msg, ...meta);
  }

  public info(msg: string, ...meta): void {
    this.log(LOGGER_LEVEL.INFO, msg, ...meta);
  }

  public silly(msg: string, ...meta): void {
    this.log(LOGGER_LEVEL.SILLY, msg, ...meta);
  }
}
