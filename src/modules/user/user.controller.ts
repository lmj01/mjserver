import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Delete, Logger } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { UserDtoCreate, eGender } from "./user.dto";
import { AuthPublic } from "../auth/auth.decorator";

@ApiTags('user')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService, private readonly logger:Logger) {

    }
    
    /**
     * http://localhost:9200/api/user?userId=2
     * @param userId 
     */
    @Get()
    async getUser(@Query('userId') userId:number):Promise<User> {
        return this.userService.findById(userId);
    }

    @AuthPublic()
    @Get('init')
    async createByDefault():Promise<string[]> {
        const res = new Array<string>();
        const dto1 = new UserDtoCreate();
        dto1.age = 1;
        dto1.name = 'admin';
        dto1.password = '123456';
        dto1.gender = eGender.male;
        await this.userService.create(dto1);
        res.push(dto1.name);
        const dto2 = new UserDtoCreate();
        dto2.age = 2;
        dto2.name = 'meijie';
        dto2.password = '123456';
        dto2.gender = eGender.unknown;
        await this.userService.create(dto2);
        res.push(dto2.name);
        return res;
    }

    @Post()
    create(@Body() dto: UserDtoCreate):Promise<User> {
        return this.userService.create(dto);
    }

    @Get('all')
    async findAll():Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string):Promise<User> {
        return this.userService.findById(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: number):Promise<void> {
        return this.userService.remove(id);
    }
    
}