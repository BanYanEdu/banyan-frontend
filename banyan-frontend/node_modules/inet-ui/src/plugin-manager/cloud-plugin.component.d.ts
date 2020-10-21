import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { PluginManagerService } from "./plugin-manager.service";
import { CoreService } from "inet-core";
export declare class CloudPluginComponent implements OnInit, OnDestroy {
    private coreService;
    private pluginManagerService;
    pluginId: string;
    url: string;
    params: any;
    autoHeight: boolean;
    load: EventEmitter<void>;
    constructor(coreService: CoreService, pluginManagerService: PluginManagerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getContentWindow;
    reload(): void;
    resize(): void;
    onLoad($event: any): void;
}
