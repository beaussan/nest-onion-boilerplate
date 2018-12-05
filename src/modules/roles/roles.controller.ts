import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { RolesDto } from './roles.dto';

@ApiUseTags('Roles')
@Controller()
// @ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Roles.',
    type: Roles,
    isArray: true,
  })
  getAll(): Promise<Roles[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Roles with the matching id',
    type: Roles,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Roles> {
    return (await this.rolesService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }
}
