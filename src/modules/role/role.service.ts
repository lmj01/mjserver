import { Injectable } from "@nestjs/common";
import { Role } from "./role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleDtoCreate } from "./role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepo : Repository<Role>) {}

    create(createDto:RoleDtoCreate) {
        const role = new Role()
        role.name = createDto.name;
        this.roleRepo.save(role);
    }

    async findOne(id:number) {
        return this.roleRepo.findOneOrFail({
            where: {id,},
            relations: ['permissions'],
        });
    }

    findOneByName(name:string) {
        return this.roleRepo.findOneBy({name: name});
    }

    remove(id:number) {
        this.roleRepo.delete(id);
    }
}