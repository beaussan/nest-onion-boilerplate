import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto, TokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { UserDtoRegister } from '../../user/user.dto';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { Public } from '../../../decorators/public.decorator';

@ApiUseTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() userLogin: LoginDto): Promise<TokenDto> {
    const token = await this.authService.signIn(
      userLogin.email,
      userLogin.password,
    );
    return { token };
  }

  @Public()
  @Post('register')
  async registerUser(@Body() userRegister: UserDtoRegister): Promise<User> {
    return this.userService.saveNew(userRegister);
  }

  @Get('me')
  @ApiBearerAuth()
  async getMe(@CurrentUser() loggedUser: User) {
    return loggedUser;
  }
}
