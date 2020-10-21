import { VertxMessage, VertxOnlineData, VertxSocketState } from "./VertxSocket";
import { Observable, Subject } from "rxjs";
export declare class VertxSocketManager {
    headers: any;
    sendTimeout: number;
    connectTimeout: number;
    onStateChange: Subject<{}>;
    onMessage: Subject<VertxMessage>;
    onMessageOnline: Subject<VertxOnlineData>;
    readyState: VertxSocketState;
    message: string;
    private _socket;
    private _queue;
    private _username;
    private _reconnectTimer;
    private _reconnectTime;
    private _reconnectMax;
    private _reconnectCount;
    readonly connecting: boolean;
    readonly connected: boolean;
    readonly closed: boolean;
    readonly reconnecting: boolean;
    readonly unavailable: boolean;
    constructor(headers?: any, connectTimeout?: number, sendTimeout?: number);
    send(address: string, message: string): Observable<boolean>;
    close(): void;
    reconnect(): void;
    private _send;
    private _addOnQueue;
    private _onConnected;
    private _stateChange;
    private _connect;
    private _socketStateChange;
    private _reconnect;
    private _stopReconnect;
    private _loadVertxInfo;
    private _loadUserInfo;
    private _loadVertxRegisterInfo;
}
export declare enum VertxSocketError {
    LOAD_USER = "LOAD_USER_FAILED",
    REGISTER_USER = "REGISTER_USER_FAILED"
}
