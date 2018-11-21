import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/core/logger/logger.module';
import { RouterModule } from 'nest-router';
import { appRoutes } from './app.routes';
// needle-module-import

@Module({
  imports: [
    LoggerModule, // Global
    // needle-module-includes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
