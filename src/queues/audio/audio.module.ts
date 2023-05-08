import { Module, Logger } from "@nestjs/common";
import { AudioProducerService } from "./audio.producer";
import { AudioConsumerService } from "./audio.consumer";
import { AudioController } from "./audio.controller";
import { BullModule } from "@nestjs/bull";
import { queueNameAudio } from "../constants";

@Module({
    imports: [
        BullModule.registerQueue({
            name: queueNameAudio,
        }),
    ],
    controllers: [AudioController],
    providers: [
        Logger,
        AudioProducerService, AudioConsumerService
    ],
})
export class AudioModule {}