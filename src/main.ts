import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { LoggerExceptionInterceptor } from './modules/core/logger/logger-exception.interceptor';
import { LoggerModule } from './modules/core/logger/logger.module';
import { ValidatorPipe } from './modules/core/validation/validator.pipe';
import { LoggerService } from './modules/core/logger/logger.service';
import { RolesGuard } from './guards/roles.guard';
import { ConfigService } from './modules/core/config/config.service';
import { ConfigModule } from './modules/core/config/config.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { InboundMiddleware } from './modules/core/metrics/middleware/inbound.middleware';
import { PromModule } from './modules/core/metrics/metrics.module';
import { MetricsInterceptor } from './modules/core/metrics/interceptors/metrics.interceptor';
import { AuthGuard } from './modules/core/auth/auth.guard';

async function bootstrap() {
  // Use .env to configure environment variables (process.env)
  config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set logger
  app.useLogger(app.get(LoggerService));

  // Enable cors
  app.enableCors();

  // Interceptors
  const loggerInterceptor = app
    .select(LoggerModule)
    .get(LoggerExceptionInterceptor);
  const classSerializer = app.select(AppModule).get(ClassSerializerInterceptor);
  const metricsInterceptor = app.select(AppModule).get(MetricsInterceptor);
  app.useGlobalInterceptors(
    metricsInterceptor,
    loggerInterceptor, // Log exceptions
    classSerializer,
  );

  const connfigService = app.select(ConfigModule).get(ConfigService);

  // Guards
  const reflector = app.get(Reflector);
  const rolesGuard = app.select(AppModule).get(RolesGuard);
  app.useGlobalGuards(new AuthGuard(reflector), rolesGuard);

  // Validators
  app.useGlobalPipes(
    new ValidatorPipe(), // Validate inputs
  );

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Boilerplate nest')
    .setDescription('The boilerplate API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const server = await app.listen(connfigService.port);
  app
    .get(LoggerService)
    .info(`Application is listening on port ${connfigService.port}.`);
  return server;
}
bootstrap();
