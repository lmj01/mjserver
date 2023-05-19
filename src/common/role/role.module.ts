import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from "./role.entity";
import { Permission } from "../permission/permission.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { UserModule } from "../user/user.module";
import { PermissionModule } from "../permission/permission.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, Permission]),
        forwardRef(() => UserModule),
        forwardRef(() => PermissionModule),
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
    ],
    exports: [
        TypeOrmModule,
        RoleService,
    ],
})
export class RoleModule {}