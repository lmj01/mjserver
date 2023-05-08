import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { grpcClientOptions } from './microservices/grpcClient.options';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './filters/allException.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { loggerInstance } from './config/configWinston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // 直接替换默认的logger
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    })
  });
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 必须手动设置
  app.setViewEngine('pug');
  app.enableCors();
  
  const adapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionFilter(app.get('Logger'), adapterHost.httpAdapter.getInstance())); // 对一些会报错
  // app.useGlobalInterceptors(new LoggingInterceptor(app.get('Logger'))); // 

  app.setGlobalPrefix('api', {
    exclude:['/']
  });

  // Hybrid application

  // TCP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });

  // Redis
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configService.get('redis.host'),
      port: +configService.get('redis.port'),
    }
  })

  // gRPC
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  
  // swagger - begin
  const options = new DocumentBuilder()
    .setTitle('api-doc')
    .setDescription('接口文档')
    .setVersion('1.0.0')
    // .addBearerAuth()
    // .addOAuth2()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include:[UserModule]
  });
  SwaggerModule.setup('api-doc/user', app, document);

  const options1 = new DocumentBuilder()
    .setTitle('api-doc-1')
    .setDescription('接口文档')
    .setVersion('1.0.0')
    .build();
  const document1 = SwaggerModule.createDocument(app, options1, {
    include:[AuthModule]
  });
  SwaggerModule.setup('api-doc/auth', app, document1);
  // swagger - end

  await app.listen(configService.get('global.port'));
  app.getUrl().then(res=>{
    console.log('listen to', res)
  })
}
bootstrap();
