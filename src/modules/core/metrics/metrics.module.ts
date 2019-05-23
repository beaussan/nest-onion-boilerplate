import {
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
  Inject,
  RequestMethod,
} from '@nestjs/common';
import { PromCoreModule } from './metrics-core.module';
import {
  createPromCounterProvider,
  createPromGaugeProvider,
  createPromHistogramProvider,
  createPromSummaryProvider,
} from './metrics.providers';
import * as client from 'prom-client';
import { InboundMiddleware } from './middleware/inbound.middleware';
import { DEFAULT_PROM_OPTIONS } from './metrics.constants';
import { PromModuleOptions } from './interfaces/prom-options.interface';
import {
  MetricType,
  MetricTypeConfigurationInterface,
} from './interfaces/metric.type';
import { PromController } from './metrics.constroller';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({})
export class PromModule {
  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    const { withDefaultController, ...promOptions } = options;

    // @ts-ignore
    const moduleForRoot: Required<DynamicModule> = {
      module: PromModule,
      imports: [PromCoreModule.forRoot(options)],
      controllers: [PromController],
      exports: [],
      providers: [InboundMiddleware, MetricsInterceptor],
    };

    // if want to use the http counter
    /*
    if (useHttpCounterMiddleware) {
      const inboundProvider = createPromCounterProvider({
        name: 'http_requests_total',
        help: 'http_requests_total Number of inbound request',
        labelNames: ['method'],
      });

      moduleForRoot.providers = [...moduleForRoot.providers, inboundProvider];
      moduleForRoot.exports = [...moduleForRoot.exports, inboundProvider];
    }
    */

    const requestProvider = createPromHistogramProvider({
      name: 'http_request_duration_seconds',
      help:
        'duration histogram of http responses labeled with: method, status_code and path',
      labelNames: ['method', 'status_code', 'path'],
      buckets: [0.003, 0.03, 0.1, 0.3, 1.5, 10],
    });

    const inboundProvider = createPromCounterProvider({
      name: 'http_requests_total',
      help: 'http_requests_total Number of inbound request',
      labelNames: ['method'],
    });

    moduleForRoot.providers = [
      ...moduleForRoot.providers,
      requestProvider,
      inboundProvider,
    ];

    moduleForRoot.exports = [
      ...moduleForRoot.exports,
      requestProvider,
      inboundProvider,
    ];

    return moduleForRoot;
  }

  static forMetrics(
    metrics: MetricTypeConfigurationInterface[],
  ): DynamicModule {
    const providers = metrics.map(entry => {
      switch (entry.type) {
        case MetricType.Counter:
          return createPromCounterProvider(entry.configuration);
        case MetricType.Gauge:
          return createPromGaugeProvider(entry.configuration);
        case MetricType.Histogram:
          return createPromHistogramProvider(entry.configuration);
        case MetricType.Summary:
          return createPromSummaryProvider(entry.configuration);
        default:
          throw new ReferenceError(`The type ${entry.type} is not supported`);
      }
    });

    return {
      providers,
      module: PromModule,
      exports: providers,
    };
  }

  static forCounter(configuration: client.CounterConfiguration): DynamicModule {
    const provider = createPromCounterProvider(configuration);
    return {
      module: PromModule,
      providers: [provider],
      exports: [provider],
    };
  }

  static forGauge(configuration: client.GaugeConfiguration): DynamicModule {
    const provider = createPromGaugeProvider(configuration);
    return {
      module: PromModule,
      providers: [provider],
      exports: [provider],
    };
  }

  static forHistogram(
    configuration: client.HistogramConfiguration,
  ): DynamicModule {
    const provider = createPromHistogramProvider(configuration);
    return {
      module: PromModule,
      providers: [provider],
      exports: [provider],
    };
  }

  static forSummary(configuration: client.SummaryConfiguration): DynamicModule {
    const provider = createPromSummaryProvider(configuration);
    return {
      module: PromModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
