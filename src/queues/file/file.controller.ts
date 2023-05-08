import { Controller, UploadedFile, UseInterceptors, Post, Body, Logger, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './file.dto';
import { Express } from 'express';
import { AuthPublic } from 'src/modules/auth/auth.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly logger:Logger) {}

  @AuthPublic()
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(
    @Body() body:SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.logger.log('file body', body);
    this.logger.log('file buffer', file.originalname);
    return file.filename;
  }

  @AuthPublic()
  @UseInterceptors(AnyFilesInterceptor())
  @Post('uploadList')
  uploadFiles(
    @Body() body:SampleDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const nameList = files.map(e=>({filename:e.filename}));
    this.logger.log('file body', body);
    this.logger.log('file buffer', nameList);
    return nameList;
  }
}
