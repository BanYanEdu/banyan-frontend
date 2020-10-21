import { ComponentFactoryResolver, ComponentRef, EventEmitter, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
export declare class NavigationTab implements OnInit, OnDestroy {
    private componentFactoryResolver;
    private router;
    tabs: NavigationData[];
    viewContainerRef: ViewContainerRef;
    prefix: string;
    onChange: EventEmitter<any>;
    onLoad: EventEmitter<any>;
    tabActive: NavigationData;
    componentRef: ComponentRef<any>;
    private _router;
    constructor(componentFactoryResolver: ComponentFactoryResolver, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    activeTab(tab: NavigationData): void;
    getTabByPath(path: string): NavigationData;
    getFullPath(tab: NavigationData): string;
    private _loadComponent;
    private _activeTab;
}
export interface NavigationData {
    name: string;
    component: any;
    path: string;
    active?: boolean;
}
