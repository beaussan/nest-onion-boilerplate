import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { RolesRepository } from './roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, RolesRepository])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
