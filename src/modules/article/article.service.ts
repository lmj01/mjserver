import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { Repository } from "typeorm";
import { ArticleDtoCreate, ArticleDtoUpdate } from "./article.dto";

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private articleRepo:Repository<Article>) {}

    async create(dto:ArticleDtoCreate) {
        dto.createTime = dto.updateTime = new Date();
        dto.isDelete = false;
        dto.isPublish = false;
        return await this.articleRepo.save(dto);
    }

    async findAll() {
        return await this.articleRepo.find();
    }

    async findOne(id: number) {
        return await this.articleRepo.findByIds([id]);
    }

    async update(id: number, dto: ArticleDtoUpdate) {
        dto.updateTime = new Date();
        return await this.articleRepo.update(id, dto);
    }

    async remove(id:number) {
        return await this.articleRepo.delete(id);
    }
}