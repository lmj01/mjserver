import { Controller, Inject, Get } from "@nestjs/common";
import { MATH_SERVICE } from "../constants";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { Observable } from 'rxjs';
import { AuthPublic } from "src/modules/auth/auth.decorator";

@Controller('math')
export class MathController {
    constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

    @AuthPublic()
    @Get()
    execute(): Observable<number> {
        const pattern = {cmd: 'sum'};
        const data = [1,2,3,4,5];
        return this.client.send<number>(pattern, data);
    }

    @MessagePattern({cmd: 'sum'})
    sum(data:number[]):number {
        const res = (data || []).reduce((a, b) => a + b);
        // this.logger.log(`the data ${data} sum is ${res}`);
        return res;
    }
}