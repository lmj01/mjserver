import { Controller, Post, Get, Query } from "@nestjs/common";
import { AuthPublic } from "../../modules/auth/auth.decorator";
import { AudioProducerService } from "./audio.producer";

@Controller('audio')
export class AudioController {
    constructor(private readonly producerService: AudioProducerService) {}

    @AuthPublic()
    @Get('transcode')
    async getTranscode(@Query('filename') filename: string) {
        this.producerService.transcode(filename);
        return filename;
    }

    @AuthPublic()
    @Post('transcode')
    async transcode() {
        this.producerService.transcode('audio.mp3');
        return {}
    }
}