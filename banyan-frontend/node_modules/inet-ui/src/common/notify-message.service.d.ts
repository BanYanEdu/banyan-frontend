import { HttpClientService } from 'inet-core';
import { Observable } from 'rxjs/Rx';
export declare class NotifyMessageService {
    private http;
    static instance: NotifyMessageService;
    private url;
    constructor(http: HttpClientService);
    getMessages(params?: any): Observable<any>;
    count(params?: any): Promise<number>;
    clearAll(params?: any): Observable<any>;
    loadNotify(app: string, activityId: string): Observable<any>;
    clearByActivityId(activityId: string): Observable<any>;
}
