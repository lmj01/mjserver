import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Delete } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";

@ApiTags('user')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {

    }
    
    /**
     * http://localhost:9200/api/user?userId=2
     * @param userId 
     */
    @Get()
    async getUser(@Query('userId') userId:number):Promise<User> {
        return this.userService.findOneById(userId);
    }

    @Post()
    create(@Body() userDto: UserDto):Promise<User> {
        return this.userService.create(userDto);
    }

    @Get()
    findAll():Promise<User[]> {
        return this.userService.findAll();
    }

    /**
     * http://localhost:9200/api/user?id=2
     * @param id 
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number):Promise<User> {
        return this.userService.findOneById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number):Promise<void> {
        return this.userService.remove(id);
    }
    
}