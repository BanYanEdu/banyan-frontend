import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PluginManagerService } from "./plugin-manager.service";
import { Subscription } from "rxjs";
import { CoreService, NotificationService } from "inet-core";
export declare class PluginToolbarDirective implements OnInit, OnDestroy {
    private el;
    private renderer;
    private coreService;
    private notifyService;
    private pluginManagerService;
    message: any;
    subscription: Subscription;
    idProperty: string;
    constructor(el: ElementRef, renderer: Renderer2, coreService: CoreService, notifyService: NotificationService, pluginManagerService: PluginManagerService);
    ngOnInit(): void;
    private notificationDetectByData;
    getIdProperty(): string;
    clear(): void;
    initContainerById(pluginId: string): ToolbarContainer;
    generateToolbar(container: ToolbarContainer, buttons?: any[]): void;
    ngOnDestroy(): void;
}
export declare class ToolbarContainer {
    pluginId: string;
    element: any;
    prefix: string;
    exists: boolean;
    constructor(prefix: string, pluginId: string, element: any, exists: boolean);
}
