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
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UserDtoRegister,
  UserDtoUpdateInfo,
  UserDtoUpdatePassword,
} from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../decorators/roles.decorator';
import { ADMIN_ROLE } from '../roles/roles.constants';

@ApiUseTags('User')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all User.',
    type: User,
    isArray: true,
  })
  @Roles(ADMIN_ROLE)
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The User has been created.',
    type: User,
  })
  @Roles(ADMIN_ROLE)
  saveNew(@Body() userDto: UserDtoRegister): Promise<User> {
    return this.userService.saveNew(userDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return (await this.userService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDto: UserDtoUpdateInfo,
  ): Promise<User> {
    return this.userService.update(id, userDto);
  }

  @Put(':id/password')
  @ApiResponse({
    status: 200,
    description: 'The updated User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOnePassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDto: UserDtoUpdatePassword,
  ): Promise<User> {
    return this.userService.updatePassword(id, userDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The User with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.userService.deleteById(id);
  }
}
