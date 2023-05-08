import { Module } from "@nestjs/common";
import { MathController } from "./math.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MATH_SERVICE } from "../constants";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: MATH_SERVICE, 
                transport: Transport.TCP,
            },
        ]),
    ],
    controllers: [MathController],
})
export class MathModule {}