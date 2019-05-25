import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  idUser: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<string> {
    const userFound = (await this.usersService.getOnWithEmail(
      email,
    )).orElseThrow(() => new UnauthorizedException());
    if (!(await this.usersService.doPasswordMatch(userFound, password))) {
      throw new UnauthorizedException();
    }
    const user: JwtPayload = { idUser: userFound.id };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return (await this.usersService.getOneById(payload.idUser)).orElseThrow(
      () => new UnauthorizedException(),
    );
  }
}
