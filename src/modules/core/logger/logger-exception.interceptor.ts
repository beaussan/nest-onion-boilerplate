import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerExceptionInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      catchError(exception => {
        if (exception instanceof HttpException) {
          // If 500, log as error
          if (500 <= exception.getStatus())
            this.loggerService.error(
              'HttpException ' + exception.getStatus(),
              request.path,
              exception.getResponse(),
            );
          // Else log as debug (we don't want 4xx errors in production)
          else {
            this.loggerService.debug(
              'HttpException ' + exception.getStatus(),
              request.path,
              exception.getResponse(),
            );
          }
        } else {
          this.loggerService.error('Unexpected error', request.path, exception);
        }
        throw exception;
      }),
    );
  }
}
