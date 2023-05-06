import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
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