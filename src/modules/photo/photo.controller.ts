import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Delete } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { Photo } from "./photo.entity";
import { PhotoDtoCreate } from "./photo.dto";

@Controller('photo')
export class PhotoController {
    
    constructor(private readonly photoService: PhotoService) {}
    
    /**
     * http://localhost:9200/api/user?userId=2
     * @param userId 
     */
    @Get()
    async getUser(@Query('userId') userId:number):Promise<Photo> {
        return this.photoService.findOneById(userId);
    }

    @Post()
    create(@Body() userDto: PhotoDtoCreate):Promise<Photo> {
        return this.photoService.create(userDto);
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