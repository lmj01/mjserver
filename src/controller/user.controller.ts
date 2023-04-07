import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "src/service/user.service";
import { UserDto } from "src/dto/User";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    
    @Get()
    async getUser(@Query('userId') userId:string):Promise<UserDto> {
        return this.userService.getUserById(userId);
    }
}