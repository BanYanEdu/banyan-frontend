import { HttpClientService } from 'inet-core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
export declare class DictionaryService {
    private http;
    static instance: DictionaryService;
    private url;
    private $findObservableCache;
    private store;
    private inventory;
    constructor(http: HttpClientService);
    findByKeys(keyStr: string): Observable<Object>;
    getSex(params?: any): Observable<any>;
}
