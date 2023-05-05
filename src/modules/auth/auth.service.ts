import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService: JwtService) {}

    async signIn(name: string, pwd: string) {
        const user = await this.userService.findOne(name);
        if (user.password !== pwd) {
            throw new UnauthorizedException();
        }
        // 除去password都传给前端
        const { password, ...result } = user;
        const payload = {
            username: user.name,
            sub: user.id,
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
            ...result,
        };
    }
}
