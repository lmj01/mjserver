import { MessageProducerService } from "./message.producer";
import { Controller, Get, Query } from "@nestjs/common";
import { AuthPublic } from "src/common/auth/auth.decorator";

@Controller('message')
export class MessageController {
    constructor(private readonly msgProducer:MessageProducerService) {}

    @AuthPublic()
    @Get('send')
    sendMessage(@Query('msg') msg: string) {
        this.msgProducer.sendMessage(msg);
        return msg;  
    }
}