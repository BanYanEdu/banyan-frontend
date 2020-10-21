import { Observable } from 'rxjs/Observable';
import { HttpClientService, NotifyParams } from "inet-core";
import { ToastrService } from "./toastr/toastr.service";
import { ToastContainerDirective } from "./toastr/toast.directive";
export declare class NotifyService {
    private http;
    private toastService;
    toastContainer: ToastContainerDirective;
    private url;
    constructor(http: HttpClientService, toastService: ToastrService);
    count(): Observable<Object>;
    getMessage(params: NotifyParams): Observable<Object>;
    showMessage(msg: string, type?: string, title?: string, config?: any): void;
    getNotifyService(): ToastrService;
}
