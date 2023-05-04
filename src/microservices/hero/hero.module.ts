import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { grpcClientOptions } from "../grpcClient.options";
import { HeroController } from "./hero.controller";
import { HERO_PACKAGE } from "../constants";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: HERO_PACKAGE,
                ...grpcClientOptions,
            },
        ]),
    ],
    controllers: [HeroController],
})
export class HeroModule {

}