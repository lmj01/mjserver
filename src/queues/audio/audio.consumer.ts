import { Processor, Process, OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Job } from "bull";
import { queueNameAudio, queueAudioTranscode } from "../constants";
import { Logger } from "@nestjs/common";

@Processor(queueNameAudio)
export class AudioConsumerService {
    constructor(private readonly logger:Logger) {}
    
    @Process(queueAudioTranscode)
    async transcode(job: Job<unknown>) {
        this.logger.log('do transcode', job.data);
        return {}
    }

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.log('onActive', `Processing job ${job.id} of type ${job.name}`);
        this.logger.log('data', job.data);
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        this.logger.log('onCompleted', `job ${job.id} completed`);
        this.logger.log('data', result);
    }
}