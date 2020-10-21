import { ElementRef, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSideNavComponent } from "../abstract-side-nav.component";
import { SystemApplication } from "../../../model";
import { Router } from "@angular/router";
import { CoreService } from "inet-core";
export declare class AppSideNavComponent extends AbstractSideNavComponent implements OnInit, OnDestroy {
    private coreService;
    private router;
    elementRef: ElementRef;
    private _router;
    applications: Array<SystemApplication>;
    widgetApps: Array<SystemApplication>;
    systemUrl: string;
    SYSTEM_APPS: string[];
    constructor(coreService: CoreService, router: Router, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private listApp;
    openApp(app: string): void;
    private getUrlByContext;
}
