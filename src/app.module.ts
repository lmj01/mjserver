import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app/app.controller';
import { FileController } from './app/file';
import { AppService } from './app/app.service';
import { HeroModule } from 'src/microservices/hero/hero.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RoleModule } from 'src/modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configGlobal from './config/global';
import configDatabase from './config/database';
import configRedis from './config/redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { User } from './modules/user/user.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { logger } from './middlewares/logger.middleware';
import { AllExceptionFilter } from './filters/allException.filter';
import { AudioModule } from './queues/audio/audio.module';
import { MessageModule } from './queues/message/message.module';

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
        // url: `http://${configService.get('redis.host')}:${configService.get('redis.port')}`,
        // redis: `://${configService.get('redis.host')}:${configService.get('redis.port')}`,
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
    AudioModule,
    MessageModule,
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
