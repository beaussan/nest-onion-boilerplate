import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './modules/core/logger/logger.module';
import { RouterModule } from 'nest-router';
import { appRoutes } from './app.routes';
import { ConfigModule } from './modules/core/config/config.module';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './modules/core/config/config.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { PromModule } from './modules/core/metrics/metrics.module';
import { InboundMiddleware } from './modules/core/metrics/middleware/inbound.middleware';
// needle-module-import

@Module({
  imports: [
    ConfigModule, // Global
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        url: configService.databaseUrl,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: configService.isLoggingDb ? 'all' : false,
      }),
      inject: [ConfigService],
    }),
    PromModule.forRoot({
      defaultLabels: {
        app: 'v1.0.0',
      },
    }),
    LoggerModule, // Global
    RouterModule.forRoutes(appRoutes),
    AuthModule,
    UserModule,
    RolesModule,
    // needle-module-includes
  ],
  controllers: [AppController],
  providers: [RolesGuard, ClassSerializerInterceptor],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(InboundMiddleware).forRoutes('*');
  }
}
