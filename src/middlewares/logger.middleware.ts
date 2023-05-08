import { NestMiddleware, Injectable, Inject, Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { getReqMainInfo } from "src/utils/utilRequest";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger:Logger) {}
    use(req: Request, res: Response, next: NextFunction) {
        console.log('logger middleware', this.logger)
        this.logger.log('route', {
            req: getReqMainInfo(req),
        })
        next();
    }
}

/**
 * 推荐使用这个方法
 * @param req 
 * @param res 
 * @param next 
 */
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
}