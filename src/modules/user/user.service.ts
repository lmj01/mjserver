import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private readonly dataSource:DataSource) {}

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
    create(userDto:UserDto): Promise<User> {
        const user = new User();
        user.name = userDto.name;
        user.password = userDto.password;
        user.age = userDto.age;
        return this.userRepo.save(user);
    }
    async findOneById(userId:number):Promise<User> {        
        return this.userRepo.findOneById(userId);
    }
    async findOne(username: string): Promise<User> {
        return this.userRepo.findOneBy({name: username});
    }
    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }
    async remove(id: number):Promise<void> {
        await this.userRepo.delete(id);
    }
}