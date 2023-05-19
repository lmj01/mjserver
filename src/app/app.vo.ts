import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommon } from '../common/common.vo';

class Info {
  @ApiProperty({ description: '返回问候语', example: 'hello' })
  greeting: string;
}

export class AppInfoResponse extends ResponseCommon {
  @ApiProperty({})
  data: Info;
}
