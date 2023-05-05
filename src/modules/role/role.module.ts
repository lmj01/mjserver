import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/modules/user/user.entity";
import { Role } from "./role.entity";
import { Permission } from "../permission/permission.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission])],
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