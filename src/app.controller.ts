import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AppInfoVo } from './vo/app.vo';

@ApiTags('App主模块')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({description: '返回问候语', type: AppInfoVo})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
