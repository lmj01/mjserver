import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { grpcClientOptions } from './microservices/grpcClient.options';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './common/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { loggerInstance } from './config/configWinston';
import { FileModule } from './queues/file/file.module';
import { WsAdapter } from './common/adapters/ws.adapter';
import { UserModule } from './common/user/user.module';
import { Response } from 'express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger:
			process.env.NODE_ENV === 'development'
				? ['log', 'error', 'warn', 'debug', 'verbose']
				: WinstonModule.createLogger({
						instance: loggerInstance,
				  }),
		forceCloseConnections: true, //
	});
	const configService = app.get(ConfigService);
	app.useStaticAssets(join(__dirname, '..', 'public'), {
		setHeaders: (res: Response, path: string, stat: any) => {
			/**
			 * SharedArrayBuffer
			 */
			res.header('Cross-Origin-Embedder-Policy', 'require-corp');
			res.header('Cross-Origin-Opener-Policy', 'same-origin');
			return res;
		},
	});
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	// 必须手动设置
	app.setViewEngine('pug');
	app.enableCors();

	app.setGlobalPrefix('api', {
		exclude: ['/', '/register', '/admin', '/app1'],
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
		},
	});

	// gRPC
	app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

	await app.startAllMicroservices();

	app.useWebSocketAdapter(new WsAdapter(app));

	// swagger - begin
	const options = new DocumentBuilder()
		.setTitle('api-doc')
		.setDescription('接口文档')
		.setVersion('1.0.0')
		// .addBearerAuth()
		// .addOAuth2()
		.build();
	const document = SwaggerModule.createDocument(app, options, {
		include: [UserModule, FileModule],
	});
	SwaggerModule.setup('api-doc/user', app, document);

	const options1 = new DocumentBuilder().setTitle('api-doc-1').setDescription('接口文档').setVersion('1.0.0').build();
	const document1 = SwaggerModule.createDocument(app, options1, {
		include: [AuthModule, AppModule],
	});
	SwaggerModule.setup('api-doc/auth', app, document1);
	// swagger - end

	app.enableShutdownHooks();

	await app.listen(configService.get('global.port'));
	app.getUrl().then((res) => {
		console.log('listen to', res);
	});
}
bootstrap();
