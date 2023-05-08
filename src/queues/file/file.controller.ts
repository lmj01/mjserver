import { Controller, UploadedFile } from '@nestjs/common';

@Controller('file')
export class FileController {
  constructor() {}

  singleFile(@UploadedFile() file): string {
    console.log('single file', file.name)
    return file.name;
  }
}
