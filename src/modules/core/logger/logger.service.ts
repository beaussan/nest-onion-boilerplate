import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { LOGGER_LEVEL, LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { Logger } from 'winston';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(LOGGER_WINSTON_PROVIDER) private readonly winston: Logger,
    private readonly configService: ConfigService,
  ) {
    winston.transports[0].level = this.configService.loggerLevel;
  }

  private logMessage(level: LOGGER_LEVEL, msg: string, ...meta): void {
    this.winston.log(level, msg, ...meta);
  }

  public log(msg: string, ...meta): void {
    this.logMessage(LOGGER_LEVEL.INFO, msg, ...meta);
  }

  public debug(msg: string, ...meta): void {
    this.logMessage(LOGGER_LEVEL.DEBUG, msg, ...meta);
  }

  public error(msg: string, ...meta): void {
    this.logMessage(LOGGER_LEVEL.ERROR, msg, ...meta);
  }

  public warn(msg: string, ...meta): void {
    this.logMessage(LOGGER_LEVEL.WARNING, msg, ...meta);
  }

  public info(msg: string, ...meta): void {
    this.logMessage(LOGGER_LEVEL.INFO, msg, ...meta);
  }

  public silly(msg: string, ...meta): void {
    this.logMessage(LOGGER_LEVEL.SILLY, msg, ...meta);
  }
}
