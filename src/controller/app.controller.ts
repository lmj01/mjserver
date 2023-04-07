import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AppInfoResponse } from '../vo/app.vo';

@ApiTags('App')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({description: '返回问候语', type: AppInfoResponse})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
