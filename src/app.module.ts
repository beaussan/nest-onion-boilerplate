import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    LoggerModule, // Global
    RouterModule.forRoutes(appRoutes),
    AuthModule,
    UserModule,
    RolesModule,
    // needle-module-includes
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
