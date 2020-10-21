import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingIndicatorService } from "./loading-indicator.service";
export declare class HttpClientService extends HttpClient {
    private loadingService;
    private headers;
    constructor(handler: HttpHandler, loadingService: LoadingIndicatorService);
    convertToHttpParams(obj: any): HttpParams;
    getJSON(url: string, body?: any | null): Observable<any>;
    postJSON(url: string, body?: any | null): Observable<any>;
    putJSON(url: string, body?: any | null): Observable<any>;
    deleteJSON(url: string, body?: any | null): Observable<any>;
    convertToFormData(obj: any): FormData;
    downloadFile(url: string, obj?: any): void;
    showLoading(message?: string): void;
    hideLoading(): void;
}
