import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { ePermission, PermissionDtoUpdate } from './permission.dto';

@Injectable()
export class PermissionService {
	constructor(
		@InjectRepository(Permission)
		private readonly permissionRepo: Repository<Permission>,
	) {}

	async init() {
		for (const code in ePermission) {
			// 这里会返回key和value，要去掉key
			const rightCode = parseInt(code);
			if (!Number.isNaN(rightCode)) {
				const permission = new Permission();
				permission.code = rightCode;
				permission.label = ePermission[code];
				permission.description = `init by system, code is ${code}, label is ${ePermission[code]}`;
				permission.roles = [];
				await this.permissionRepo.save(permission);
			}
		}
	}
	async findAll(): Promise<Permission[]> {
		return this.permissionRepo.find();
	}

	findOne(id: number) {}

	update(id: number, dto: PermissionDtoUpdate) {}

	remove(id: number) {
		this.permissionRepo.delete(id);
	}
}