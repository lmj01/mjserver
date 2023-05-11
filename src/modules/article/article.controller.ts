import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleDtoCreate, ArticleDtoUpdate } from "./article.dto";

@Controller('article')
export class ArticleController {
    constructor(private readonly articelService: ArticleService) {}

    @Post()
    async create(@Body() dto:ArticleDtoCreate) {
        return await this.articelService.create(dto);
    }

    @Get()
    async findAll() {
        return await this.articelService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.articelService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id')id:string, @Body() dto:ArticleDtoUpdate) {
        return await this.articelService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id')id: string) {
        return await this.articelService.remove(+id);
    }
}