import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { GenderDto, UserDtoCreate, eGender } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Role } from '../role/role.entity';
import { ConfigService } from '@nestjs/config';
import { Gender } from './gender.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		@InjectRepository(Profile) private profileRepo: Repository<Profile>,
		@InjectRepository(Gender) private genderRepo: Repository<Gender>,
		private readonly dataSource: DataSource,
		private readonly logger: Logger,
		private readonly configService: ConfigService,
	) {}

	async createMany(users: User[]) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			for (let i = 0; i < users.length; i++) {
				await queryRunner.manager.save(users[i]);
			}
			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
	async create(dto: UserDtoCreate, role: Role): Promise<User> {
		const profile = new Profile();
		profile.age = dto.age;
		profile.gender = dto.gender;
		profile.update = profile.create = new Date();

		const user = new User();
		user.name = dto.name;
		user.password = dto.password;
		user.profile = profile;
		if (this.configService.get('global:production')) user.isActive = false;
		else user.isActive = ['admin'].includes(dto.name);
		if (Array.isArray(user.roles)) user.roles.push(role);
		else user.roles = [role];
		if (Array.isArray(role.users)) role.users.push(user);
		else role.users = [user];
		profile.user = user;

		await this.profileRepo.save(profile);
		await this.userRepo.save(user);
		return;
	}
	async findById(userId: number): Promise<User> {
		return this.userRepo.findOne({
			relations: ['profile'],
			select: {
				id: true,
				name: true,
			},
			where: {
				id: userId,
			},
		});
	}

	async findOne(userName: string): Promise<User> {
		return this.userRepo.findOneBy({ name: userName });
	}

	async findAll(): Promise<User[]> {
		return this.userRepo.find({
			select: {
				name: true,
				id: true,
				isActive: true,
			},
		});
	}
	async remove(id: number): Promise<void> {
		await this.userRepo.delete(id);
	}

	async initGender() {
		for (const k in eGender) {
			const dto = new GenderDto();
			dto.name = k;
			await this.genderRepo.save(dto);
		}
	}

	async getAllGender() {
		return this.genderRepo.find();
	}
}
