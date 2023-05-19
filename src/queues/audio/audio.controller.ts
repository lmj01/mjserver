import { Controller, Post, Get, Query, Logger } from "@nestjs/common";
import { AuthPublic } from "../../common/auth/auth.decorator";
import { AudioProducerService } from "./audio.producer";

@Controller('audio')
export class AudioController {
    constructor(private readonly producerService: AudioProducerService, private readonly logger:Logger) {}

    @AuthPublic()
    @Get('transcode')
    async getTranscode(@Query('filename') filename: string) {
        this.logger.log('transcode', filename);
        this.producerService.transcode(filename);
        return filename;
    }

    @AuthPublic()
    @Post('transcode')
    async transcode() {
        this.producerService.transcode('audio.mp3');
        return {filename: 'audio.mp3'};
    }
}