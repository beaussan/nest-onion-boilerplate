import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerExceptionInterceptor } from './logger-exception.interceptor';
import { loggerProviders } from './logger.providers';

@Global()
@Module({
  providers: [...loggerProviders, LoggerService, LoggerExceptionInterceptor],
  exports: [LoggerService, LoggerExceptionInterceptor],
})
export class LoggerModule {}
