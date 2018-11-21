import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/core/logger/logger.module';
import { RouterModule } from 'nest-router';
import { appRoutes } from './app.routes';
import { ConfigModule } from './modules/core/config/config.module';
import { RolesGuard } from './guards/roles.guard';
import { DbModule } from './modules/core/db/db.module';
// needle-module-import

@Module({
  imports: [
    ConfigModule, // Global
    DbModule, // Global
    LoggerModule, // Global
    // needle-module-includes
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
