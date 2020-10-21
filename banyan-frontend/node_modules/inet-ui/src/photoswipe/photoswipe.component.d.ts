import { ElementRef, EventEmitter } from '@angular/core';
import { Photo } from './model/photo';
import { PhotoSwipeOptions } from './model/option';
/**
 * Use PhotoSwipe http://photoswipe.com/documentation/api.html
 */
export declare class PhotoSwipeComponent {
    onDestroy: EventEmitter<any>;
    photoSwipe: ElementRef;
    private gallery;
    constructor();
    open(items: Photo[], options?: PhotoSwipeOptions): void;
    destroy(): void;
}
