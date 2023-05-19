import { Controller, UploadedFile, UseInterceptors, Post, Body, Logger, UploadedFiles, ParseFilePipeBuilder, HttpStatus, Get, Res, StreamableFile } from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './file.dto';
import { Express, Response } from 'express';
import { AuthPublic } from 'src/common/auth/auth.decorator';
import { utilWriteFile, utilReadFile } from 'src/utils/wrapFilesystem';

@Controller('file')
export class FileController {
  constructor(private readonly logger:Logger) {}

  @AuthPublic()
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(
    @Body() body:SampleDto,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'image/*'})
      .addMaxSizeValidator({ maxSize: 1024 * 1024})
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })) file: Express.Multer.File,
  ) {
    this.logger.log('file body', body);
    utilWriteFile(this.logger, file.originalname, file.buffer);
    return file.originalname;
  }

  @AuthPublic()
  @UseInterceptors(AnyFilesInterceptor())
  @Post('uploadList')
  uploadFiles(
    @Body() body:SampleDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const nameList = files.map(e=>({filename:e.originalname}));
    this.logger.log('file body', body);
    this.logger.log('file buffer', nameList);
    return nameList;
  }

  @AuthPublic()
  @Get('package1')
  getFile(@Res() res: Response) {
    const file = utilReadFile(this.logger, 'package.json', ['..','..']);
    file.pipe(res);
  }

  @AuthPublic()
  @Get('package2')
  getFile2(@Res({passthrough: true}) res: Response):StreamableFile {
    const file = utilReadFile(this.logger, 'package.json', ['..','..']);
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // })
    return new StreamableFile(file);
  }
}
