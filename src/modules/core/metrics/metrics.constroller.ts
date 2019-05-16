import { Controller, Get, Res } from '@nestjs/common';
import * as client from 'prom-client';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('metrics')
export class PromController {
  @ApiExcludeEndpoint()
  @Get()
  index(@Res() res) {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  }
}
