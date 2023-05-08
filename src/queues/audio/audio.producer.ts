import { Injectable, Logger } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { queueNameAudio, queueAudioTranscode } from "../constants";

@Injectable()
export class AudioProducerService {
    constructor(@InjectQueue(queueNameAudio) private queue:Queue, private readonly logger:Logger) {}

    async transcode(filename:string) {
        this.logger.log('transcode', filename)
        await this.queue.add(queueAudioTranscode, {
            file: filename,
        });
    }
}