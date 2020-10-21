/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { fromEvent } from "rxjs";
/**
 * @record
 */
function ScrollPosition() { }
if (false) {
    /** @type {?} */
    ScrollPosition.prototype.sH;
    /** @type {?} */
    ScrollPosition.prototype.sT;
    /** @type {?} */
    ScrollPosition.prototype.cH;
}
/** @type {?} */
const DEFAULT_SCROLL_POSITION = {
    sH: 0,
    sT: 0,
    cH: 0
};
export class InfiniteScrollerDirective {
    /**
     * @param {?} elm
     */
    constructor(elm) {
        this.elm = elm;
        this.scrollPercent = 70;
        this.isSubmit = false;
        this.isUserScrollingDown = (/**
         * @param {?} positions
         * @return {?}
         */
        (positions) => {
            return positions[0].sT < positions[1].sT;
        });
        this.isScrollExpectedPercent = (/**
         * @param {?} position
         * @return {?}
         */
        (position) => {
            return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.registerScrollEvent();
        this.streamScrollEvents();
        this.requestCallbackOnScroll();
    }
    /**
     * @private
     * @return {?}
     */
    registerScrollEvent() {
        this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
    }
    /**
     * @private
     * @return {?}
     */
    streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$
            .map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => ({
            sH: e.target.scrollHeight,
            sT: e.target.scrollTop,
            cH: e.target.clientHeight
        })))
            .pairwise()
            .filter((/**
         * @param {?} positions
         * @return {?}
         */
        positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])));
    }
    /**
     * @private
     * @return {?}
     */
    requestCallbackOnScroll() {
        this.requestOnScroll$ = this.userScrolledDown$;
        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
        }
        this.requestOnScroll$
            .exhaustMap((/**
         * @return {?}
         */
        () => {
            return this.scrollCallback();
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => { console.log(data); }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => console.log(err)));
    }
    /**
     * @private
     * @return {?}
     */
    isScrollSubmit() {
        return this.isSubmit;
    }
    ;
}
InfiniteScrollerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInfiniteScroller]'
            },] }
];
/** @nocollapse */
InfiniteScrollerDirective.ctorParameters = () => [
    { type: ElementRef }
];
InfiniteScrollerDirective.propDecorators = {
    scrollCallback: [{ type: Input }],
    immediateCallback: [{ type: Input }],
    scrollPercent: [{ type: Input }],
    isSubmit: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.scrollEvent$;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.userScrolledDown$;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.requestOnScroll$;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.scrollCallback;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.immediateCallback;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.scrollPercent;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.isSubmit;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.isUserScrollingDown;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.isScrollExpectedPercent;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.elm;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2luZmluaXRlLXNjcm9sbGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7O0FBRS9CLDZCQUlDOzs7SUFIQyw0QkFBVzs7SUFDWCw0QkFBVzs7SUFDWCw0QkFBVzs7O01BR1AsdUJBQXVCLEdBQW1CO0lBQzlDLEVBQUUsRUFBRSxDQUFDO0lBQ0wsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsQ0FBQztDQUNOO0FBS0QsTUFBTSxPQUFPLHlCQUF5Qjs7OztJQWtCcEMsWUFBb0IsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFMbkMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFHbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQTRDVCx3QkFBbUI7Ozs7UUFBRyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNDLENBQUMsRUFBQztRQUVNLDRCQUF1Qjs7OztRQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0MsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNsRixDQUFDLEVBQUM7SUFoRHFDLENBQUM7Ozs7SUFFeEMsZUFBZTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBRWpDLENBQUM7Ozs7O0lBRU8sbUJBQW1CO1FBRXpCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWxFLENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWTthQUN2QyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFNLEVBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVk7WUFDekIsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUztZQUN0QixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZO1NBQzFCLENBQUMsRUFBQzthQUNGLFFBQVEsRUFBRTthQUNWLE1BQU07Ozs7UUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQTtJQUMzRyxDQUFDOzs7OztJQUVPLHVCQUF1QjtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCO2lCQUMxQyxTQUFTLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLENBQUMsZ0JBQWdCO2FBQ2xCLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9CLENBQUMsRUFBQzthQUNELFNBQVM7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7Ozs7UUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO0lBRTNFLENBQUM7Ozs7O0lBVU8sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUFBLENBQUM7OztZQXpFSCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjthQUNsQzs7OztZQWpCa0MsVUFBVTs7OzZCQXdCMUMsS0FBSztnQ0FHTCxLQUFLOzRCQUdMLEtBQUs7dUJBR0wsS0FBSzs7Ozs7OztJQWJOLGlEQUFxQjs7Ozs7SUFDckIsc0RBQTBCOzs7OztJQUMxQixxREFBeUI7O0lBRXpCLG1EQUNlOztJQUVmLHNEQUNrQjs7SUFFbEIsa0RBQ21COztJQUVuQiw2Q0FDaUI7Ozs7O0lBNENqQix3REFFRTs7Ozs7SUFFRiw0REFFRTs7Ozs7SUFoRFUsd0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gXCJyeGpzXCI7XG5cbmludGVyZmFjZSBTY3JvbGxQb3NpdGlvbiB7XG4gIHNIOiBudW1iZXI7XG4gIHNUOiBudW1iZXI7XG4gIGNIOiBudW1iZXI7XG59XG5cbmNvbnN0IERFRkFVTFRfU0NST0xMX1BPU0lUSU9OOiBTY3JvbGxQb3NpdGlvbiA9IHtcbiAgc0g6IDAsXG4gIHNUOiAwLFxuICBjSDogMFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEluZmluaXRlU2Nyb2xsZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbGVyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudCQ7XG4gIHByaXZhdGUgdXNlclNjcm9sbGVkRG93biQ7XG4gIHByaXZhdGUgcmVxdWVzdE9uU2Nyb2xsJDtcblxuICBASW5wdXQoKVxuICBzY3JvbGxDYWxsYmFjaztcblxuICBASW5wdXQoKVxuICBpbW1lZGlhdGVDYWxsYmFjaztcblxuICBASW5wdXQoKVxuICBzY3JvbGxQZXJjZW50ID0gNzA7XG5cbiAgQElucHV0KClcbiAgaXNTdWJtaXQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsbTogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucmVnaXN0ZXJTY3JvbGxFdmVudCgpO1xuICAgIHRoaXMuc3RyZWFtU2Nyb2xsRXZlbnRzKCk7XG4gICAgdGhpcy5yZXF1ZXN0Q2FsbGJhY2tPblNjcm9sbCgpO1xuXG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyU2Nyb2xsRXZlbnQoKSB7XG5cbiAgICB0aGlzLnNjcm9sbEV2ZW50JCA9IGZyb21FdmVudCh0aGlzLmVsbS5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RyZWFtU2Nyb2xsRXZlbnRzKCkge1xuICAgIHRoaXMudXNlclNjcm9sbGVkRG93biQgPSB0aGlzLnNjcm9sbEV2ZW50JFxuICAgICAgLm1hcCgoZTogYW55KTogU2Nyb2xsUG9zaXRpb24gPT4gKHtcbiAgICAgICAgc0g6IGUudGFyZ2V0LnNjcm9sbEhlaWdodCxcbiAgICAgICAgc1Q6IGUudGFyZ2V0LnNjcm9sbFRvcCxcbiAgICAgICAgY0g6IGUudGFyZ2V0LmNsaWVudEhlaWdodFxuICAgICAgfSkpXG4gICAgICAucGFpcndpc2UoKVxuICAgICAgLmZpbHRlcihwb3NpdGlvbnMgPT4gdGhpcy5pc1VzZXJTY3JvbGxpbmdEb3duKHBvc2l0aW9ucykgJiYgdGhpcy5pc1Njcm9sbEV4cGVjdGVkUGVyY2VudChwb3NpdGlvbnNbMV0pKVxuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0Q2FsbGJhY2tPblNjcm9sbCgpIHtcbiAgICB0aGlzLnJlcXVlc3RPblNjcm9sbCQgPSB0aGlzLnVzZXJTY3JvbGxlZERvd24kO1xuXG4gICAgaWYgKHRoaXMuaW1tZWRpYXRlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMucmVxdWVzdE9uU2Nyb2xsJCA9IHRoaXMucmVxdWVzdE9uU2Nyb2xsJFxuICAgICAgICAuc3RhcnRXaXRoKFtERUZBVUxUX1NDUk9MTF9QT1NJVElPTiwgREVGQVVMVF9TQ1JPTExfUE9TSVRJT05dKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3RPblNjcm9sbCRcbiAgICAgIC5leGhhdXN0TWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsQ2FsbGJhY2soKTtcbiAgICAgIH0pXG4gICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGRhdGEpIH0sIChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xuXG4gIH1cblxuICBwcml2YXRlIGlzVXNlclNjcm9sbGluZ0Rvd24gPSAocG9zaXRpb25zKSA9PiB7XG4gICAgcmV0dXJuIHBvc2l0aW9uc1swXS5zVCA8IHBvc2l0aW9uc1sxXS5zVDtcbiAgfTtcblxuICBwcml2YXRlIGlzU2Nyb2xsRXhwZWN0ZWRQZXJjZW50ID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgcmV0dXJuICgocG9zaXRpb24uc1QgKyBwb3NpdGlvbi5jSCkgLyBwb3NpdGlvbi5zSCkgPiAodGhpcy5zY3JvbGxQZXJjZW50IC8gMTAwKTtcbiAgfTtcblxuICBwcml2YXRlIGlzU2Nyb2xsU3VibWl0KCkge1xuICAgIHJldHVybiB0aGlzLmlzU3VibWl0O1xuICB9O1xuXG59XG4iXX0=