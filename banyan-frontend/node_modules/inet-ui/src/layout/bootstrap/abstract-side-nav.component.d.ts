import { ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
export declare class AbstractSideNavComponent implements OnChanges, OnDestroy {
    elementRef: ElementRef;
    opened: boolean;
    onClose: EventEmitter<boolean>;
    onClear: EventEmitter<boolean>;
    onLoad: EventEmitter<boolean>;
    private overflowCls;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    open(): void;
    close(): void;
    ngOnDestroy(): void;
    clickOut(event: any): void;
    clickInside(event: any): void;
}
