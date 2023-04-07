import { ApiProperty } from "@nestjs/swagger";

export class Pagination {
    @ApiProperty({description:'当前页数', example: 1})
    page:number;

    @ApiProperty({description:'每页的数量',default:10})
    pageSize:number;

    @ApiProperty({description:'总页数',example: 10})
    pageTotal:number;

    @ApiProperty({description:'总数量',example: 100})
    total:number;
}

export class ResponseCommon {
    @ApiProperty({description:'状态码',example: 200})
    code:number;
    
    @ApiProperty({description:'文字描述',default:'Success'})
    message:string;
}
