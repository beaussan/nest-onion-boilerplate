import { Controller, Get, Res } from '@nestjs/common';
import * as client from 'prom-client';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from '../../../decorators/public.decorator';

@Controller('metrics')
export class PromController {
  @Public()
  @ApiExcludeEndpoint()
  @Get()
  index(@Res() res) {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  }
}
