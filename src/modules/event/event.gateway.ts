import { WebSocketGateway, WebSocketServer, SubscribeMessage, WsResponse, MessageBody } from "@nestjs/websockets";
import { Server } from "ws";
import { Observable, map, from} from 'rxjs';
import { Logger } from "@nestjs/common";

@WebSocketGateway(9210)
export class EventGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly logger:Logger) {}

    @SubscribeMessage('events')
    onEvent(client: any, data:any) : Observable<WsResponse<number>> {
        return from([1,2,3]).pipe(map(e => {
            this.logger.log('eventGateway', e);
            return ({ event: 'events', data: e})
        }));
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number):Promise<number> {
        this.logger.log('eventIdentity', data);
        return data;
    }
}