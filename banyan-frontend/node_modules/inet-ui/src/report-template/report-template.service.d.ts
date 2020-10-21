import { HttpClientService } from "inet-core";
import { Observable } from "rxjs";
export declare class ReportTemplateService {
    private http;
    private url;
    constructor(http: HttpClientService);
    list(params: any): Observable<any>;
    delete(uuid: string): Observable<any>;
    view(uuid: string): Observable<any>;
    add(params: FormData): Observable<any>;
    update(params: FormData): Observable<any>;
    application(): Observable<any>;
    organId(): Observable<any>;
    modules(application: string): Observable<any>;
    downloadFile(contentUuid: string): void;
}
