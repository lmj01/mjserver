import { Module, Logger, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { RoleModule } from '../role/role.module';
import { Gender } from './gender.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Profile, Gender]), forwardRef(() => RoleModule)],
	controllers: [UserController],
	providers: [Logger, UserService],
	exports: [
		TypeOrmModule, // 导出user repository给其他地方使用
		//
		UserService,
	],
})
export class UserModule {}
