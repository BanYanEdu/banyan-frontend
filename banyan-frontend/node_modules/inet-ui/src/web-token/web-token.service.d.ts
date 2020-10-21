import { CertData } from "./lib/model/CertData";
import { MessageSignHash } from "./lib/model/MessageSignHash";
import { ReplyData } from "./lib/model/ReplyData";
import { Observable } from "rxjs";
export declare class WebTokenService {
    private _signer;
    initForDevMode(): void;
    ready(): Observable<boolean>;
    selectCert(forceSelect?: boolean): Observable<CertData>;
    getCertBySerial(serial: string): Observable<CertData>;
    selectCertUnlock(serial?: string): Observable<CertData>;
    private _unlockCert;
    unlockCert(cert: CertData): Observable<boolean>;
    loadCerts(): Observable<CertData[]>;
    signHash(data: MessageSignHash): Observable<ReplyData>;
}
