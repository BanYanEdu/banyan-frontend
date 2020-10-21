import { EXT_ACTION } from "./Constants";
import { ReplyData } from "./model/ReplyData";
import { CertData } from "./model/CertData";
import { MessageSignHash } from "./model/MessageSignHash";
export declare class TokenSimulator {
    static _certs: CertData[];
    static postToExtension(action: EXT_ACTION, data?: any): Promise<ReplyData>;
    static _sign(data: MessageSignHash, resolve: any): void;
    static _getCert(serial: any): CertData;
    static _base64toHEX(base64: any): string;
}
