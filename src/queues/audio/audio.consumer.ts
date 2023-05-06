import { Processor, Process, OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Job } from "bull";
import { queueNameAudio, queueAudioTranscode } from "../constants";

@Processor(queueNameAudio)
export class AudioConsumerService {
    
    @Process(queueAudioTranscode)
    async transcode(job: Job<unknown>) {
        console.log('transcode')
        console.debug('Start transcoding...');
        console.debug(job.data);
        console.debug('Transcoding completed');
        return {}
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        console.debug(`job ${job.id} completed, and result is ${result}`)
    }
}