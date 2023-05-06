import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { queueNameAudio, queueAudioTranscode } from "../constants";

@Injectable()
export class AudioProducerService {
    constructor(@InjectQueue(queueNameAudio) private queue:Queue) {}

    async transcode(filename:string) {
        console.log('to transcode', filename)
        await this.queue.add(queueAudioTranscode, {
            file: filename,
        });
    }
}