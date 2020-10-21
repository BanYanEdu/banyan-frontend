import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
export declare class FrontViewDirective implements OnInit, OnDestroy {
    _el: ElementRef;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    isShow: boolean;
    private _$el;
    constructor(_el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
}
