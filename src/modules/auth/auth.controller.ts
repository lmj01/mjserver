import { Controller, Body, HttpCode, HttpStatus, Post, Get, Request, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPublic } from './auth.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly logger:Logger){}

    @AuthPublic()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string,any>) {
        this.logger.log('login', signInDto);
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return request.user;
    }
}
