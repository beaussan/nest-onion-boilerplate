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

export class UserDto {
  @IsEmail()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  password: string;
}
