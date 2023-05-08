import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Inject, Logger, BadRequestException } from "@nestjs/common";
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
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let msg = httpStatus > 500 ? 'Service Error' : 'Client Error';
        const isHttpException = exception instanceof HttpException;
        if (isHttpException) {
            msg = ctx.getResponse<Response>().statusMessage;
        }
        this.logger.error(msg, {
            httpStatus,
            req: isHttpException ? getReqMainInfo(ctx.getRequest<Request>()) : {},
            stack: exception.stack,
        })
        const responseBody = {
            statusCode: httpStatus,
            message: msg,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest<Request>()),
        }
        
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}