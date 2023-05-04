import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { User } from "src/user/User";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {

    }
    
    /**
     * http://localhost:9200/user?userId=2
     * @param userId 
     */
    @Get()
    async getUser(@Query('userId') userId:number):Promise<User> {
        return this.userService.getUserById(userId);
    }
}