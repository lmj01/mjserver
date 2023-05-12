import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Photo } from "./photo.entity";
import { PhotoDtoCreate } from "./photo.dto";
import { Meta } from "./meta.entity";
import { User } from "../user/user.entity";

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo) private photoRepo: Repository<Photo>,
        @InjectRepository(Meta) private metaRepo: Repository<Meta>
    ) {}

    async create(user: User, dto:PhotoDtoCreate) {
        const meta = new Meta();
        meta.width = dto.width;
        meta.height = dto.height;
        meta.orientation = dto.orientation;
        meta.comment = dto.comment;
        meta.compressed = dto.compressed;
        
        const photo = new Photo();
        photo.name = dto.name;
        photo.url = dto.url;
        photo.user = user;
        photo.meta = meta;
        meta.photo = photo;
        if (Array.isArray(user.photos)) user.photos.push(photo);
        else user.photos = [photo];
        await this.metaRepo.save(meta);
        await this.photoRepo.save(photo);
        return user.id;
    }

    async findOneById(userId:number):Promise<Photo> {        
        return this.photoRepo.findOneById(userId);
    }
    // async findOne(username: string): Promise<Photo> {
    //     return this.photoRepo.findOneBy({name: username});
    // }
    async findAll(): Promise<Photo[]> {
        return this.photoRepo.find();
    }
    async remove(id: number):Promise<void> {
        await this.photoRepo.delete(id);
    }
}
