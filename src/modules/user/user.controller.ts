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
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { UserDto } from './user.dto';

@ApiUseTags('User')
@Controller()
// @ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all User.',
    type: User,
    isArray: true,
  })
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The User has been created.',
    type: User,
  })
  saveNew(@Body() userDto: UserDto): Promise<User> {
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
    @Body() userDto: UserDto,
  ): Promise<User> {
    return this.userService.update(id, userDto);
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
