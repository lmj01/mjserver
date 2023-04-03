import { ApiProperty } from "@nestjs/swagger";

class Info {
    @ApiProperty({description:'23'})
    id:number;
}
export class AppInfoVo {
    @ApiProperty({})
    info: Info;
}
