import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AppInfoResponse } from './app.vo';
import { AuthPublic } from 'src/modules/auth/auth.decorator';

@ApiTags('App')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({description: '返回问候语', type: AppInfoResponse})
  @AuthPublic()
  @Get()
  @Render('index')
  root() {
    return {
      myTitle: 'Index',
    }
  }
}
