import { NestInterceptor, Injectable, ExecutionContext, CallHandler, Inject, Logger } from "@nestjs/common";
import { Observable, tap, map } from 'rxjs';
import { Request } from "express";
import { getReqMainInfo } from "src/utils/utilRequest";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: Logger) {}

    intercept(context:ExecutionContext, next:CallHandler): Observable<any> {
        console.log('Before...');
        const http = context.switchToHttp();
        if (http) {
            const request = http.getRequest<Request>();
            console.log('http path', request.url)
        }
        const now = Date.now();
        return next
            .handle()
            .pipe(
                map((data)=>{
                    console.log('map data', data);
                    this.logger.log('response', {
                        responseData: data,
                        req: getReqMainInfo(http.getRequest<Request>()),
                    })
                    return data;
                }),
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}