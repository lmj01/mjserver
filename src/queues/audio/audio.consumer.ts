import { Logger } from "@nestjs/common";
import { Processor, Process, OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Job } from "bull";
import { nameAudio, audioTranscode } from "./constants";

@Processor(nameAudio)
export class AudioConsumerService {
    private readonly logger = new Logger(AudioConsumerService.name);

    @Process(audioTranscode)
    async transcode(job: Job<unknown>) {
        console.log('transcode')
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        this.logger.debug('Transcoding completed');
        return {}
    }

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        this.logger.debug(`job ${job.id} completed, and result is ${result}`)
    }
}