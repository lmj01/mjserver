import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Inject, Logger } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { getReqMainInfo } from "src/utils/utilRequest";
import { Request, Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger, private readonly httpAdapterHost:HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost) {

        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;
        
        const ctx = host.switchToHttp();
        console.log('exception', exception)
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let msg = httpStatus > 500 ? 'Service Error' : 'Client Error';
        const response = exception instanceof HttpException ? ctx.getResponse<Response>() : {};
        // if (Object.prototype.toString.call(response) === ['object Object'] && response.message) {
        //     msg = response.message;
        // }
        this.logger.error(msg, {
            httpStatus,
            req: ctx ? getReqMainInfo(ctx.getRequest<Request>()) : {},
            stack: exception.stack,
        })
        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest<Request>()),
        }
        
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}