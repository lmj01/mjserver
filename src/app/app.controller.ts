import { Controller, Get, Header, Render, Sse, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AppInfoResponse } from './app.vo';
import { AuthPublic } from 'src/common/auth/auth.decorator';
import { Observable, interval, map } from 'rxjs';

@ApiTags('App')
@Controller('/')
export class AppController {
	constructor(private readonly appService: AppService, private readonly logger: Logger) {}

	@ApiOkResponse({ description: '返回问候语', type: AppInfoResponse })
	@AuthPublic()
	@Header('Cross-Origin-Embedder-Policy', 'require-corp')
	@Header('Cross-Origin-Opener-Policy', 'same-origin')
	@Get()
	@Render('index')
	root() {
		return {
			pageTitle: this.appService.getTitle(),
			pageCss: './index.css',
		};
	}

	@AuthPublic()
	@Header('Cross-Origin-Embedder-Policy', 'require-corp')
	@Header('Cross-Origin-Opener-Policy', 'same-origin')
	@Get('app1')
	@Render('app1')
	app1() {
		return {
			pageTitle: 'App1',
			pageCss: './index.css',
		};
	}

	@AuthPublic()
	@Get('register')
	@Render('register')
	register() {
		return {
			pageTitle: '注册',
			pageCss: './index.css',
		};
	}

	@AuthPublic()
	@Get('admin')
	@Render('admin/index')
	admin() {
		return {
			pageTitle: '管理',
			pageCss: './admin.css',
		};
	}

	@AuthPublic()
	@Sse('sse')
	sse(): Observable<MessageEvent> {
		return interval(1000 * 3).pipe(
			map(
				(_) =>
					({
						data: { timestamp: Date.now() },
						type: 'sse', // 默认是message，指定后前端也要监听这个字段
					} as MessageEvent),
			),
		);
	}
}
