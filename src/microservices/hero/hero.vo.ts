import { ApiProperty } from "@nestjs/swagger";
import { ResponseCommon } from "../../common/common.vo";
import { Hero } from "./interfaces/hero.interface";

export class HeroResponse extends ResponseCommon {
    @ApiProperty({})
    data: Hero;
}