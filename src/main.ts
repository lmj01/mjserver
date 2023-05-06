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
  app.useGlobalFilters(new AllExceptionFilter(adapterHost.httpAdapter.getInstance())); // 
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
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // swagger - end

  await app.listen(configService.get('global.port'));
  app.getUrl().then(res=>{
    console.log('listen to', res)
  })
}
bootstrap();
