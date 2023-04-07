import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { FileController } from '../controller/file';
import { AppService } from '../service/app.service';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [],
  controllers: [AppController, FileController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
