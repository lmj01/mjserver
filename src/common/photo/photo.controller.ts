import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, BadRequestException, Logger } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { Photo } from "./photo.entity";
import { PhotoDtoCreate } from "./photo.dto";
import { UserService } from "../user/user.service";
import { UserDto } from "../user/user.dto";

@Controller('photo')
export class PhotoController {
    
    constructor(
        private readonly logger:Logger,
        private readonly photoService: PhotoService,
        private readonly userService:UserService,
    ) {}
    
    @Post('test')
    async test(@Body() dto: UserDto) {
        this.logger.log('photoTest', dto)
        let id = -1;
        const user = await this.userService.findById(dto.id);
        if (user) {
            const dto1 = new PhotoDtoCreate();
            dto1.name = 'photo1';
            dto1.url = 'path/1.jpg';
            dto1.width = 300;
            dto1.height = 300;
            dto1.description = 'test';
            id = await this.photoService.create(user, dto1);
        } else {
            this.logger.log('noUser', `id: ${dto.id}, name: ${dto.name} does not exist!!!`);
        }
        return id;
    }

    @Post('new')
    async create(@Body() dto: PhotoDtoCreate) {
        const user = await this.userService.findById(dto.userId);
        if (user) {
            return await this.photoService.create(user, dto);
        }
        throw new BadRequestException();
    }

    @Get()
    findAll():Promise<Photo[]> {
        return this.photoService.findAll();
    }

    /**
     * http://localhost:9200/api/user?id=2
     * @param id 
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number):Promise<Photo> {
        return this.photoService.findOneById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number):Promise<void> {
        return this.photoService.remove(id);
    }
    
}