import { Module, Logger } from "@nestjs/common";
import { EventGateway } from "./event.gateway";

@Module({
    imports: [],
    providers: [
        Logger,
        EventGateway
    ],
})
export class EventModule {}