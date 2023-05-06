import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context:ExecutionContext, next:CallHandler):Observable<any> {
        console.log('Before...');
        const http = context.switchToHttp();
        if (http) {
            const request = http.getRequest();
            console.log('http path', request.url)
        }
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}