import { Module, Logger } from "@nestjs/common";
import { MessageProducerService } from "./message.producer";
import { MessageConsumerService } from "./message.consumer";
import { MessageController } from "./message.controller";
import { queueNameMessage } from "../constants";
import { BullModule } from "@nestjs/bull";

@Module({
    imports: [
        BullModule.registerQueue({
            name: queueNameMessage,
        }),
    ],
    controllers: [MessageController],
    providers: [
        Logger,
        MessageProducerService, MessageConsumerService
    ],
})
export class MessageModule {}