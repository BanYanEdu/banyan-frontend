import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector } from '@angular/core';
import { Photo } from './model/photo';
import { Router } from '@angular/router';
export declare class PhotoSwipe {
    private componentFactoryResolver;
    private injector;
    private appRef;
    private router;
    private photoSwipeFactory;
    private photoSwipeComponentRef;
    private routerSubscribe;
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef, router: Router);
    open(items: Photo[], options?: any, container?: ElementRef): void;
    private subscribeRouterChange;
    private closeOpening;
}
