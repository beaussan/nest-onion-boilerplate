import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Counter, Histogram } from 'prom-client';
import { InjectHistogramMetric } from '../common/prom.decorators';
import * as UrlValueParser from 'url-value-parser';
import { parse } from 'url';

@Injectable()
export class MetricsInterceptor implements NestInterceptor<any, any> {
  parser: any;

  constructor(
    @InjectHistogramMetric('http_request_duration_seconds')
    private readonly httpRequests: Histogram,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const path = req.originalUrl || req.url;

    if (path.match(/\/metrics(\?.*?)?$/)) {
      return next.handle();
    }

    const labels: any = {};
    const timer = this.httpRequests.startTimer({
      path: this.getPath(req),
      method: req.method,
    });

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        timer({ status_code: this.getStatusCode(res) });
      }),
      catchError(err => {
        const statusCode = err.status ? err.status : '500';
        timer({ status_code: statusCode });
        return throwError(err);
      }),
    );
  }

  getStatusCode(res: any): number {
    return res.status_code || res.statusCode;
  }

  getPath(req: any): string {
    const path = parse(req.originalUrl || req.url).pathname;

    if (!this.parser) {
      this.parser = new UrlValueParser();
    }

    return this.parser.replacePathValues(path);
  }
}
