import { Controller, Get, Param, Patch, Delete, Body } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { Permission } from "./permission.entity";
import { PermissionDtoUpdate } from "./permission.update.dto";

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService:PermissionService) {}

    @Get()
    findAll(): Promise<Permission[]> {
        return this.permissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.permissionService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: PermissionDtoUpdate) {
        return this.permissionService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.permissionService.remove(+id);
    }
}