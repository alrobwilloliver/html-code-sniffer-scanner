import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async scan(@Query() query): Promise<any> {
    const ret: Array<any> = await this.appService.scan(query.url);
    return ret.join('<br>');
  }
}
