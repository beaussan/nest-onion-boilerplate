import { Get, Controller } from '@nestjs/common';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Get('ping')
  @Public()
  root(): string {
    return 'pong';
  }
}
