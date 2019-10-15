import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: string | object | any) {
    super(
      HttpException.createBody(
        errors,
        'VALIDATION_EXCEPTION',
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
