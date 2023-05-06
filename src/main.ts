import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './microservices/grpcClient.options';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { logger } from './middlewares/logger.middleware';
import { AllExceptionFilter } from './filters/allException.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 必须手动设置
  app.setViewEngine('pug');
  app.enableCors();
  
  // app.use(logger); // 函数时可用于全局
  const adapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionFilter(adapterHost.httpAdapter.getInstance())); // 对一些会报错
  app.useGlobalInterceptors(new LoggingInterceptor()); // 

  app.setGlobalPrefix('api', {
    exclude:['/']
  });
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
