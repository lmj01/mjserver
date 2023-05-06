import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { AudioProducerService } from "./audio.producer";
import { AudioConsumerService } from "./audio.consumer";
import { nameAudio } from "./constants";
import { AudioController } from "./audio.controller";

@Module({
    imports: [
        BullModule.registerQueue({
            name: nameAudio,
        }),
    ],
    controllers: [AudioController],
    providers: [AudioConsumerService, AudioProducerService],
})
export class AudioModule {}