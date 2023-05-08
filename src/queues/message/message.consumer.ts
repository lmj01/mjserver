import { Processor, Process } from "@nestjs/bull";
import { queueNameMessage, queueMessageSend } from "../constants";
import { Job } from "bull";
import { Logger } from "@nestjs/common";

@Processor(queueNameMessage)
export class MessageConsumerService {
    constructor(private readonly logger:Logger) {}

    @Process(queueMessageSend)
    readMessage(job: Job<unknown>) {
        this.logger.log('consumerMessage', job.data);
    }
}