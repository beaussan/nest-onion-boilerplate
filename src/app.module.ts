import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/core/logger/logger.module';

@Module({
  imports: [
    LoggerModule, // Global
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
