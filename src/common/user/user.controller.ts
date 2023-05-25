import { Controller, Get, Query, Post, Body, Param, Delete, Logger, Inject, forwardRef } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserDtoCreate, eGender } from './user.dto';
import { AuthPublic } from '../auth/auth.decorator';
import { RoleService } from '../role/role.service';
import { eRole } from '../role/role.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly logger: Logger,
		@Inject(forwardRef(() => RoleService))
		private readonly roleService: RoleService,
	) {}

	/**
	 * http://localhost:9200/api/user?userId=2
	 * @param userId
	 */
	@Get()
	async getUser(@Query('userId') userId: number): Promise<User> {
		return this.userService.findById(userId);
	}

	@Get('gender')
	async getGender() {
		return this.userService.getAllGender();
	}

	@AuthPublic()
	@Get('init')
	async createByDefault(): Promise<string[]> {
		const res = new Array<string>();

		// 性别类型
		await this.userService.initGender();
		// 先创建角色
		await this.roleService.init();

		// 获取对应的角色
		const roleAdmin = await this.roleService.findOneByName(eRole.ADMIN);
		const dto1 = new UserDtoCreate();
		dto1.age = 1;
		dto1.name = 'admin';
		dto1.password = '123456';
		dto1.gender = eGender.male;
		const exitUser1 = await this.userService.findOne(dto1.name);
		// 没有这个用户才注册
		if (!exitUser1) {
			await this.userService.create(dto1, roleAdmin);
			res.push(dto1.name);
		}
		return res;
	}

	@Post()
	async create(@Body() dto: UserDtoCreate): Promise<User> {
		const role = await this.roleService.findOneById(dto.idRole);
		return this.userService.create(dto, role);
	}

	@Post('new')
	async new(@Body() dto: UserDtoCreate): Promise<User> {
		const role = await this.roleService.findOneById(+dto.idRole);
		return this.userService.create(dto, role);
	}

	@Get('all')
	async findAll(): Promise<User[]> {
		return await this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<User> {
		return this.userService.findById(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.userService.remove(id);
	}
}
