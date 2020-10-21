import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { CoreService, HttpClientService, NotificationService, SecurityService } from "inet-core";
export declare class HttpsRequestInterceptor implements HttpInterceptor {
    private securityService;
    private coreService;
    private httpClientService;
    private notifyService;
    static instance: HttpsRequestInterceptor;
    constructor(securityService: SecurityService, coreService: CoreService, httpClientService: HttpClientService, notifyService: NotificationService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
export declare class InterceptorModule {
}
