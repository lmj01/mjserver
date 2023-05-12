import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from "./role.entity";
import { Permission } from "../permission/permission.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, Permission]),
        UserModule,
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