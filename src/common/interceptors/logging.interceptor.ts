import { NestInterceptor, Injectable, ExecutionContext, CallHandler, Inject, Logger } from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';
import { Request, Response } from 'express';
import { getReqMainInfo } from 'src/utils/utilRequest';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(private readonly logger: Logger) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		this.logger.log('Before');
		const http = context.switchToHttp();
		if (http) {
			const request = http.getRequest<Request>();

			/**
			 * SharedArrayBuffer
			 */
			const response = http.getRequest<Response>();
			response.set('Cross-Origin-Embedder-Policy', 'require-corp');
			response.set('Cross-Origin-Opener-Policy', 'same-origin');

			response.header('Cross-Origin-Embedder-Policy', 'require-corp');
			response.header('Cross-Origin-Opener-Policy', 'same-origin');
			this.logger.log('header', response);

			this.logger.log('httpRequestPath', request.url);
		}
		const now = Date.now();
		return next.handle().pipe(
			map((data) => {
				this.logger.log('response', {
					responseData: data,
					req: getReqMainInfo(http.getRequest<Request>()),
				});
				return data;
			}),
			tap(() => this.logger.log('After', `${Date.now() - now}ms`)),
		);
	}
}
