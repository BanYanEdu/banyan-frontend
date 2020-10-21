import { NavigationExtras, Router } from '@angular/router';
import { HttpClientService } from "inet-core";
import { ViewerComponent } from "../viewer/viewer.component";
import { FileFormatService } from "./file-format.service";
export declare class ViewerService {
    private router;
    private formatService;
    private http;
    static instance: ViewerService;
    private static files;
    private routerPath;
    private downloadUrl;
    private emitLoadSource;
    loadEmitted: import("rxjs/internal/Observable").Observable<any>;
    constructor(router: Router, formatService: FileFormatService, http: HttpClientService);
    setRouterPath(v: string): void;
    getRouterPath(): string;
    setDownloadUrl(v: string): void;
    getDownloadUrl(): string;
    open(ext: string, docId: string, extras?: NavigationExtras): void;
    hasNameInPlugin(name: string): boolean;
    hasViewerInBrowser(): boolean;
    hasEdit(ext: string): boolean;
    hasView(ext: string): boolean;
    downloadById(docId: string): void;
    setFiles(v: any): void;
    getFiles(): any[];
    /**
     * Returns true if this url is viewer module, false otherwise
     * @param url - the give URL
     */
    isViewerModuleByUrl(url: string): boolean;
    /**
     * Fire event when document loaded
     * */
    sendEvent($event: any, viewer: ViewerComponent): void;
}
