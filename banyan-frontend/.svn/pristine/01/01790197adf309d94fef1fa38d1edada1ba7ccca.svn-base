import { Observable, Subject } from 'rxjs';
import { VertxMessage, VertxOnlineData, VertxSocketState } from "./VertxSocket";
export declare class SocketService {
    onStateChange: Subject<VertxSocketState>;
    onMessage: Subject<VertxMessage>;
    onMemberStateChange: Subject<VertxOnlineData>;
    readonly readyState: VertxSocketState;
    readonly status: VertxSocketState;
    readonly connecting: boolean;
    readonly connected: boolean;
    readonly closed: boolean;
    readonly reconnecting: boolean;
    readonly unavailable: boolean;
    private socket;
    constructor();
    init(): void;
    connect(): void;
    disconnect(): void;
    publish(address: string, message: any): Observable<boolean>;
    send(address: string, message: any): Observable<boolean>;
    createMessagePackage(app: string, message: string): {
        message: {
            application: string;
            alert: string;
            sender: any;
            content: string;
        };
        application: string;
        sender: any;
        sent: number;
    };
    sendGroup(groupCode: string, message: any): void;
}
