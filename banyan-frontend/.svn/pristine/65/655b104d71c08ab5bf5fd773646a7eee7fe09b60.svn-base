import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
export declare class CoreService {
    private http;
    static instance: CoreService;
    private static environment;
    private $appCache;
    private applications;
    constructor(http: HttpClientService);
    logout(): void;
    getAvatar(usercode: string, thumbnail?: number): string;
    isExternalUser(): boolean;
    isCommunity(): boolean;
    getOrg(): Observable<Object>;
    searchOrgan(params?: any): Observable<Object>;
    getSystemApplication(): Observable<Object>;
    searchFirmAccount(params: any, callback: Function): void;
    updateLanguage(lang: string, callback?: Function): void;
    /**
     * Get the Image URL for the current app
     * @param fileName - the file name
     */
    getImageUrl(fileName: string): string;
    /**
     * Build the file URL for the file server request
     * @param fileName - the given file name
     */
    getFileUrl(fileName: string): string;
    getSsoRedirect(data: SsoRedirectData): string;
    convergePlugins(): Observable<any>;
    convergeSearch(params: any): Observable<any>;
    setEnvironment(v?: any): void;
    getEnvironment(): any;
    private getPath;
    /**
     * Gets File server path
     */
    getFileServerPath(): string;
    /**
     * Gets assets path of current app
     */
    getAssetsPath(): string;
}
export interface LogoutData {
    uuid: string;
}
export interface SsoRedirectData {
    url: string;
    application: string;
    redirect?: boolean;
}
export interface PathRedirectData {
    path: string;
    application: string;
    organId?: string;
    firmPrefix?: string;
}
