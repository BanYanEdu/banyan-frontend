/**
 * Inspired from: https://stevepapa.com/ng-autosize/
 */
import { AfterViewInit, ElementRef } from '@angular/core';
export declare class AutoSizeDirective implements AfterViewInit {
    element: ElementRef;
    private el;
    private _minHeight;
    private _maxHeight;
    private _lastHeight;
    private _clientWidth;
    minHeight: string;
    maxHeight: string;
    onResize(): void;
    onInput(): void;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    adjust(): void;
    updateMinHeight(): void;
    updateMaxHeight(): void;
}
