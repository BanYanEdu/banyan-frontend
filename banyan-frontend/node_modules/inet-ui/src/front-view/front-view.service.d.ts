import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
export declare class FrontViewService {
    private componentFactoryResolver;
    private injector;
    private appRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    viewInline(url: string): void;
}
