import { AfterViewInit, ElementRef } from '@angular/core';
export declare class InfiniteScrollerDirective implements AfterViewInit {
    private elm;
    private scrollEvent$;
    private userScrolledDown$;
    private requestOnScroll$;
    scrollCallback: any;
    immediateCallback: any;
    scrollPercent: number;
    isSubmit: boolean;
    constructor(elm: ElementRef);
    ngAfterViewInit(): void;
    private registerScrollEvent;
    private streamScrollEvents;
    private requestCallbackOnScroll;
    private isUserScrollingDown;
    private isScrollExpectedPercent;
    private isScrollSubmit;
}
