import { Module, Logger } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Meta } from './meta.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Photo, Meta]),
        UserModule,
    ],
    controllers: [PhotoController],
    providers: [
        Logger,
        PhotoService,
    ],
})
export class PhotoModule {}
