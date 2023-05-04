import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { FileController } from '../controller/file';
import { AppService } from '../service/app.service';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';
import { HeroModule } from 'src/microservices/hero/hero.module';


@Module({
  imports: [ HeroModule ],
  controllers: [AppController, FileController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
