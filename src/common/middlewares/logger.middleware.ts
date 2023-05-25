import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getReqMainInfo } from 'src/utils/utilRequest';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private readonly logger: Logger) {}
	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log('route', {
			req: getReqMainInfo(req),
		});
		next();
	}
}
