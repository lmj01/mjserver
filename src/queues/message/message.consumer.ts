import { Processor, Process } from "@nestjs/bull";
import { queueNameMessage, queueMessageSend } from "../constants";
import { Job } from "bull";

@Processor(queueNameMessage)
export class MessageConsumerService {

    @Process(queueMessageSend)
    readMessage(job: Job<unknown>) {
        console.log('read message', job.data);
    }
}