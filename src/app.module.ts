import { Module, NestModule, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { HeroModule } from 'src/microservices/hero/hero.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RoleModule } from 'src/modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configGlobal from './config/global';
import configDatabase from './config/database';
import configRedis from './config/redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { User } from './modules/user/user.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionFilter } from './common/filters/allException.filter';
import { AudioModule } from './queues/audio/audio.module';
import { MessageModule } from './queues/message/message.module';
import { FileModule } from './queues/file/file.module';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { MathModule } from './microservices/math/math.module';
import { EventModule } from './modules/event/event.module';
// import { ArticleModule } from './modules/article/article.module';
// import { PhotoModule } from './modules/photo/photo.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      load: [configGlobal, configDatabase, configRedis],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService)=>({
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: +configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule, 
    UserModule,    
    // PhotoModule,
    HeroModule, 
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    RoleModule,
    PermissionModule,
    AudioModule,
    MessageModule,
    FileModule,
    MathModule,
    EventModule,
    // ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
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
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
      // .forRoutes({ path:'hero', method:RequestMethod.GET});
  }
}
