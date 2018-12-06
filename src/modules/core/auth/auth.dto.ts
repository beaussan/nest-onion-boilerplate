import { IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {
  token: string;
}

export class LoginDto {
  @MinLength(1)
  @IsEmail()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @MinLength(1)
  @ApiModelProperty({ example: 'azerty' })
  password: string;
}
