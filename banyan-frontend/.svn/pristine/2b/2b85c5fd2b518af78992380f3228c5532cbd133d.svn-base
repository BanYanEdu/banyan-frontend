import * as EventBus from 'vertx3-eventbus-client';
import { Subject } from "rxjs";
export declare class VertxSocket {
    url: string;
    headers: any;
    username: string;
    socket: EventBus;
    onStateChange: Subject<{}>;
    onMessage: Subject<VertxMessage>;
    onMessageOnline: Subject<VertxOnlineData>;
    readyState: VertxSocketState;
    message: string;
    readonly unset: boolean;
    readonly closed: boolean;
    readonly connecting: boolean;
    readonly connected: boolean;
    constructor(username: string, url: string, headers: any);
    connect(): void;
    send(address: string, message: string): void;
    close(): void;
    private _stateChange;
    private _close;
}
export declare enum VertxSocketState {
    UNAVAILABLE = "UNAVAILABLE",
    UNSET = "UNSET",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    CLOSED = "CLOSED",
    RE_CONNECTING = "RE_CONNECTING"
}
export interface VertxReceiveData {
    type: string;
    address: string;
    body: VertxMessage;
}
export interface VertxMessage {
    uuid?: string;
    application?: string;
    message?: VertxMessageContent;
    sender?: string;
    sent?: number;
    type?: string;
}
export interface VertxMessageContent {
    application?: string;
    alert?: string;
    sender?: string;
    content?: string;
}
export interface VertxOnlineData {
    type: VertxOnlineType;
    address: string;
}
export declare enum VertxOnlineType {
    register = "register",
    unregister = "unregister"
}
