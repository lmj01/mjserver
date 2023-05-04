import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './microservices/grpcClient.options';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 必须手动设置
  app.setViewEngine('pug');
  
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

  await app.listen(9200);
}
bootstrap();
