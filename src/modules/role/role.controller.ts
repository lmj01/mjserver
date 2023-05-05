import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { RoleDtoCreate } from "./role.create.dto";
import { RoleService } from "./role.service";
import { RoleDtoUpdate } from "./role.update.dto";

@Controller('role')
export class RoleController {
    constructor(private readonly roleService:RoleService) {}

    @Post()
    create(@Body() dto: RoleDtoCreate) {
        return this.roleService.create(dto);
    }

    @Get()
    findAll() {
        // return this.roleService.findOne.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: RoleDtoUpdate) {
        // return this.roleService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(+id);
    }
}