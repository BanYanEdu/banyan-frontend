import { HttpClientService } from "inet-core";
import { Observable } from "rxjs";
export declare class SharingInformationService {
    private http;
    private url;
    constructor(http: HttpClientService);
    getApplicationList(params: any): Observable<any>;
    getApplicationRights(params: any): Observable<any>;
    getUserRights(params: any): Observable<any>;
    updateUserRight(params: any): Observable<any>;
    deleteUserRight(params: any): Observable<any>;
    getSuggestUser(params: any): Observable<any>;
}
