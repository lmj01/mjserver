import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Photo, PhotoMeta } from "./photo.entity";
import { PhotoDtoCreate } from "./photo.dto";

@Injectable()
export class PhotoService {
    constructor(@InjectRepository(Photo) private photoRepo: Repository<Photo>) {}

    create(dto:PhotoDtoCreate): Promise<Photo> {
        const photo = new Photo();
        photo.url = dto.url;
        return this.photoRepo.save(photo);
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

@Injectable()
export class PhotoMetaService {
    constructor(@InjectRepository(PhotoMeta) private metaRepo: Repository<PhotoMeta>) {}

    async findOneById(userId:number):Promise<PhotoMeta> {        
        return this.metaRepo.findOneById(userId);
    }
    // async findOne(username: string): Promise<Photo> {
    //     return this.photoRepo.findOneBy({name: username});
    // }
    async findAll(): Promise<PhotoMeta[]> {
        return this.metaRepo.find();
    }
    async remove(id: number):Promise<void> {
        await this.metaRepo.delete(id);
    }
}