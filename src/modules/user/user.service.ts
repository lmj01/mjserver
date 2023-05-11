import { Injectable, Logger } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { UserDtoCreate } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./profile.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>, 
        @InjectRepository(Profile) private profileRepo: Repository<Profile>,
        private readonly dataSource:DataSource,
        private readonly logger:Logger,
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
        } catch(err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
    async create(dto:UserDtoCreate): Promise<User> {
        
        const profile = new Profile();
        profile.age = dto.age;
        profile.gender = dto.gender;

        const user = new User();
        user.name = dto.name;
        user.password = dto.password;
        user.profile = profile;
        user.isActive = ['admin'].includes(dto.name);
        profile.user = user;

        await this.profileRepo.save(profile);
        await this.userRepo.save(user);
        return;
    }
    async findById(userId:number):Promise<User> {        
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
    async findOne(username: string): Promise<User> {
        return this.userRepo.findOneBy({name: username});
    }
    async findAll(): Promise<User[]> {
        return this.userRepo.find({
            select: {
                name: true,
                id: true,
                isActive: true,
            }
        });
    }
    async remove(id: number):Promise<void> {
        await this.userRepo.delete(id);
    }
}