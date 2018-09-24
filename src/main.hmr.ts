import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { LoggerExceptionInterceptor } from './modules/core/logger/logger-exception.interceptor';
import { LoggerModule } from './modules/core/logger/logger.module';
import { ValidatorPipe } from './modules/core/validation/validator.pipe';
import { LoggerService } from './modules/core/logger/logger.service';
import { RolesGuard } from './guards/roles.guard';

declare const module: any;

async function bootstrap() {
  // Use .env to configure environment variables (process.env)
  config();

  const app = await NestFactory.create(AppModule);
  // Set logger
  app.useLogger(app.get(LoggerService));

  // Enable cors
  app.enableCors();

  // Interceptors
  const loggerInterceptor = app
    .select(LoggerModule)
    .get(LoggerExceptionInterceptor);
  app.useGlobalInterceptors(
    loggerInterceptor, // Log exceptions
  );

  // Guards
  const rolesGuard = app.select(AppModule).get(RolesGuard);
  app.useGlobalGuards(rolesGuard);

  // Validators
  app.useGlobalPipes(
    new ValidatorPipe(), // Validate inputs
  );

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Boilerplate nest')
    .setDescription('The boilerplate API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const server = await app.listen(parseInt(process.env.API_PORT || '3000', 10));
  app
    .get(LoggerService)
    .info(`Application is listening on port ${process.env.API_PORT || 3000}.`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
