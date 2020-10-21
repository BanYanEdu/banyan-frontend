import { HttpClientService } from 'inet-core';
import { Observable } from "rxjs/Observable";
import { TranslateService } from "@ngx-translate/core";
export declare class CloudTranslateService {
    private http;
    private translate;
    static LANGUAGE_KEY: string;
    static GRID_KEY: string;
    private url;
    constructor(http: HttpClientService, translate: TranslateService);
    getAllMessage(): Observable<any>;
    getMessageByApp(appName: string): Observable<any>;
    getCurrentLang(): string;
    setCurrentLang(lang: string): void;
}
