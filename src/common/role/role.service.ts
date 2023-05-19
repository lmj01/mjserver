import { Injectable } from "@nestjs/common";
import { Role } from "./role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { eRole, RoleDtoUpdate } from "./role.dto";
import { ReturnMessage } from "src/common/common.vo";
import { PermissionService } from "../permission/permission.service";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepo : Repository<Role>,
        private readonly permissionService: PermissionService,
    ) {}

    /**
     * 内部调用，不通过接口设置角色
     */
    async init() {
        
        await this.permissionService.init();

        for (let name in eRole) {
            const role = new Role();
            role.name = name;
            role.description = `Role name is ${name}`;
            role.users = [];
            role.permissions = [];
            await this.roleRepo.save(role);
        }
    }
    async update(id: number, dto: RoleDtoUpdate) {
        const role = await this.findOne(id);
        if (role) {
            role.name = dto.name;
            role.description = dto.description;
            await this.roleRepo.save(role);
        }
        return ReturnMessage.OK;
    }

    async findOne(id:number) {
        return this.roleRepo.findOneOrFail({
            where: {id,},
            relations: ['permissions'],
        });
    }

    async findAll() {
        return await this.roleRepo.find();
    }

    findOneByName(name:eRole) {
        return this.roleRepo.findOneBy({name: name});
    }

    remove(id:number) {
        this.roleRepo.delete(id);
    }
}