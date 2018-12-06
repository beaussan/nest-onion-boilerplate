import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDtoRegister {
  @IsEmail()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @IsString()
  @ApiModelProperty({ example: 'foo' })
  firstName: string;

  @IsString()
  @ApiModelProperty({ example: 'bar' })
  lastName: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  password: string;
}

export class UserDtoUpdateInfo {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UserDtoUpdatePassword {
  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  newPassword: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  newPasswordBis: string;
}
