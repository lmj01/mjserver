import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "./permission.entity";
import { PermissionDtoUpdate } from "./permission.update.dto";

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly permissionRepo:Repository<Permission>) {}

    async findAll():Promise<Permission[]> {
        return this.permissionRepo.find();
    }

    findOne(id:number) {
        
    }

    update(id:number, dto:PermissionDtoUpdate) {

    }

    remove(id:number) {
        this.permissionRepo.delete(id);
    }
}