import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { FrontViewDirective } from "../front-view.directive";
export declare class FrontViewComponent implements AfterViewInit {
    onDestroy: EventEmitter<any>;
    viewer: FrontViewDirective;
    iframe: ElementRef;
    viewUrl: string;
    constructor();
    ngAfterViewInit(): void;
    setViewUrl(viewUrl: any): void;
    onHide(): void;
}
