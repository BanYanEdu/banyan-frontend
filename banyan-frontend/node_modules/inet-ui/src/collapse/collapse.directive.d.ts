import { ElementRef, OnInit } from '@angular/core';
export declare class CollapseDirective implements OnInit {
    private _el;
    expanded: boolean;
    toggleEl: HTMLElement;
    private _element;
    constructor(_el: ElementRef);
    ngOnInit(): void;
    show(): void;
    hide(): void;
    toggle(): void;
}
