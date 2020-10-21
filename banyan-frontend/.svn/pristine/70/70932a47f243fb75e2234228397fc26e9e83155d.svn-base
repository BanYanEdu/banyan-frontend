import { WebSocketAbstract, WebSocketEnvelop } from './websocket-abstract';
export declare class WebSocketJboss extends WebSocketAbstract {
    private _socket;
    readonly readyState: number;
    stateChange(): void;
    connect(options: string, username: string): void;
    close(): void;
    send(envelop: WebSocketEnvelop): Promise<boolean>;
    private _ping;
}
