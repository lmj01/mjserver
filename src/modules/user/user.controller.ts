import { Controller, Get, Query, Post, Body, Param, Delete, Logger, Inject, forwardRef } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { UserDtoCreate, eGender } from "./user.dto";
import { AuthPublic } from "../auth/auth.decorator";
import { RoleService } from "../role/role.service";
import { eRole } from "../role/role.dto";

@ApiTags('user')
@Controller('user')
export class UserController {
    
    constructor(
        private readonly userService: UserService, 
        private readonly logger:Logger,
        @Inject(forwardRef(()=>RoleService))
        private readonly roleService: RoleService,
    ) {}
    
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

        // 先创建角色
        await this.roleService.init();

        // 获取对应的角色
        const roleAdmin = await this.roleService.findOneByName(eRole.ADMIN);
        const dto1 = new UserDtoCreate();
        dto1.age = 1;
        dto1.name = 'admin';
        dto1.password = '123456';
        dto1.gender = eGender.male;
        const exitUser1 = await this.userService.findOne(dto1.name);
        // 没有这个用户才注册
        if (!exitUser1) {
            await this.userService.create(dto1, roleAdmin);
            res.push(dto1.name);
        }        
        const roleUser = await this.roleService.findOneByName(eRole.USER);
        const dto2 = new UserDtoCreate();
        dto2.age = 2;
        dto2.name = 'meijie';
        dto2.password = '123456';
        dto2.gender = eGender.unknown;
        const exitUser2 = await this.userService.findOne(dto2.name);
        if (!exitUser2) {
            await this.userService.create(dto2, roleUser);
            res.push(dto2.name);
        }
        return res;
    }

    @Post()
    async create(@Body() dto: UserDtoCreate):Promise<User> {
        const role = await this.roleService.findOneByName(dto.role);
        return this.userService.create(dto, role);
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