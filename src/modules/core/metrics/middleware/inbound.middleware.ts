import { Injectable, NestMiddleware } from '@nestjs/common';
import { Counter } from 'prom-client';
import { Request, Response } from 'express';
import { InjectCounterMetric } from '../common/prom.decorators';

@Injectable()
export class InboundMiddleware implements NestMiddleware {
  constructor(
    @InjectCounterMetric('http_requests_total')
    private readonly _counter: Counter,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    const url = req.baseUrl;
    const method = req.method;

    // ignore favicon
    if (url.endsWith('/favicon.ico')) {
      next();
      return;
    }

    // ignore metrics itself
    if (url.match(/\/metrics(\?.*?)?$/)) {
      next();
      return;
    }

    this._counter.labels(method).inc(1, new Date());
    next();
  }
}
