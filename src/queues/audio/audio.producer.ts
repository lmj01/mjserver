import { Post, Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { nameAudio, audioTranscode } from "./constants";

@Injectable()
export class AudioProducerService {
    constructor(@InjectQueue(nameAudio) private readonly audioQueue:Queue) {}

    async transcode(filename:string) {
        console.log('to transcode', filename)
        await this.audioQueue.add(audioTranscode, {
            file: filename,
        });
    }
}