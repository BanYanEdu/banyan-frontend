import { CertSubject } from "./CertSubject";
export interface CertData {
    subject?: string;
    issuer?: string;
    validFrom?: string;
    validTo?: string;
    serial?: string;
    cert?: string;
    subjectData?: CertSubject;
    issuerData?: CertSubject;
    unlocked?: boolean;
    [propName: string]: string | any;
}
