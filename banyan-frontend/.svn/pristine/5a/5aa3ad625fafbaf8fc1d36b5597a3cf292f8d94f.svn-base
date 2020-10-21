import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CloudPluginComponent } from "./cloud-plugin.component";
export declare class PluginManagerService {
    static instance: PluginManagerService;
    private loaded;
    pluginManager: any;
    private plugins;
    private subject;
    constructor();
    register(pluginId: string, component: any): void;
    destroyById(pluginId: string): void;
    getPlugins(): {};
    hasPluginId(pluginId: string): boolean;
    getPluginById(pluginId: string): CloudPluginComponent;
    sendMessageTo(message: any, contentWindow: any): void;
    listen(): void;
    getMessage(): Observable<any>;
    clearMessage(): void;
    getContentWindowById(pluginId: string): Promise<Window | Document>;
    private sendMessage;
    convertToHttpParams(obj: Object): HttpParams;
    testCreatePluginTemplate(pluginId: string, targetId: string): void;
}
