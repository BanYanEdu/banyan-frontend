import { Subject } from 'rxjs';
export declare abstract class WebSocketAbstract {
    onMessage: Subject<EnvelopBody>;
    onStateChange: Subject<number>;
    stateChange(): void;
    constructor(options: any, username: string);
    abstract readyState: number;
    abstract connect(options: any, username: string): any;
    abstract close(): any;
    abstract send(envelop: WebSocketEnvelop): Promise<boolean>;
}
export declare enum WebSocketType {
    SEND = "send",
    PUBLISH = "publish"
}
export declare class WebSocketEnvelop {
    type: WebSocketType | string;
    address: string;
    body: EnvelopBody;
}
export declare class EnvelopBody {
    uuid: string;
    application: string;
    message: EnvelopMessage;
    sender: string;
    alias: string[];
    sent: number;
}
export declare class EnvelopMessage {
    sender: string;
    alert: string;
    content: string;
    joins: string;
    duration: string;
    constructor(sender: string, content: string, joins?: string, duration?: string);
}
