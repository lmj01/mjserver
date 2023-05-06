import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app/app.controller';
import { FileController } from './app/file';
import { AppService } from './app/app.service';
import { HeroModule } from 'src/microservices/hero/hero.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
// import { RoleGuard } from 'src/modules/role/role.guard';
import { RoleModule } from 'src/modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configGlobal from './config/global';
import configDatabase from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { logger } from './middlewares/logger.middleware';
import { AllExceptionFilter } from './filters/allException.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      load: [configGlobal, configDatabase],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService:ConfigService)=>({
        type: configService.get('database.type') as any,
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.db') as string,
        entities: [
          User,
        ],
        // no-production
        synchronize: true, // 注意这个，同步时容易丢失数据，
        autoLoadEntities: true, // 默认加载，就是直接创建表格
      }),
      inject: [ConfigService],
    }), 
    AuthModule, 
    UserModule,
    HeroModule, 
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes({path: '*', method: RequestMethod.GET});
      // .forRoutes({ path:'hero', method:RequestMethod.GET});
  }
}
