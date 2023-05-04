import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { FileController } from '../app/file';
import { AppService } from '../app/app.service';
import { HeroModule } from 'src/microservices/hero/hero.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ 
    AuthModule, 
    UserModule,
    HeroModule, 
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
