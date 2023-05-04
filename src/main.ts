import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './microservices/grpcClient.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
