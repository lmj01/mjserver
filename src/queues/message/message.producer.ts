import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { queueNameMessage, queueMessageSend } from "../constants";
import { Queue } from "bull";

@Injectable()
export class MessageProducerService {
    constructor(@InjectQueue(queueNameMessage) private queue: Queue) {}

    async sendMessage(message:string) {
        await this.queue.add(queueMessageSend, {
            text: message,
        });
    }
}