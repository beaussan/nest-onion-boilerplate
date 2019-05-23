import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Role')
@Controller()
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Role.',
    type: Role,
    isArray: true,
  })
  getAll(): Promise<Role[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Role with the matching id',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Role> {
    return (await this.rolesService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }
}
