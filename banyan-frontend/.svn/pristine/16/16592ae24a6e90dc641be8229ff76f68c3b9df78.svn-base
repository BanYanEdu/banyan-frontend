import { HttpClientService } from "./http-client.service";
export declare class SecurityService {
    private http;
    static instance: SecurityService;
    private roles;
    constructor(http: HttpClientService);
    load(): Promise<any>;
    private parserRoleFrom;
    private uniqueArray;
    private append;
    hasRole(v: string): boolean;
    /**
     * Check session timeout when system is idle
     */
    ping(): void;
}
