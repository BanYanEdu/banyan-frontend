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
var DEFAULT_SCROLL_POSITION = {
    sH: 0,
    sT: 0,
    cH: 0
};
var InfiniteScrollerDirective = /** @class */ (function () {
    function InfiniteScrollerDirective(elm) {
        var _this = this;
        this.elm = elm;
        this.scrollPercent = 70;
        this.isSubmit = false;
        this.isUserScrollingDown = (/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) {
            return positions[0].sT < positions[1].sT;
        });
        this.isScrollExpectedPercent = (/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            return ((position.sT + position.cH) / position.sH) > (_this.scrollPercent / 100);
        });
    }
    /**
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.registerScrollEvent();
        this.streamScrollEvents();
        this.requestCallbackOnScroll();
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.registerScrollEvent = /**
     * @private
     * @return {?}
     */
    function () {
        this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.streamScrollEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.userScrolledDown$ = this.scrollEvent$
            .map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return ({
            sH: e.target.scrollHeight,
            sT: e.target.scrollTop,
            cH: e.target.clientHeight
        }); }))
            .pairwise()
            .filter((/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) { return _this.isUserScrollingDown(positions) && _this.isScrollExpectedPercent(positions[1]); }));
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.requestCallbackOnScroll = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.requestOnScroll$ = this.userScrolledDown$;
        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
        }
        this.requestOnScroll$
            .exhaustMap((/**
         * @return {?}
         */
        function () {
            return _this.scrollCallback();
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { console.log(data); }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return console.log(err); }));
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.isScrollSubmit = /**
     * @private
     * @return {?}
     */
    function () {
        return this.isSubmit;
    };
    ;
    InfiniteScrollerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appInfiniteScroller]'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    InfiniteScrollerDirective.propDecorators = {
        scrollCallback: [{ type: Input }],
        immediateCallback: [{ type: Input }],
        scrollPercent: [{ type: Input }],
        isSubmit: [{ type: Input }]
    };
    return InfiniteScrollerDirective;
}());
export { InfiniteScrollerDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2luZmluaXRlLXNjcm9sbGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7O0FBRS9CLDZCQUlDOzs7SUFIQyw0QkFBVzs7SUFDWCw0QkFBVzs7SUFDWCw0QkFBVzs7O0lBR1AsdUJBQXVCLEdBQW1CO0lBQzlDLEVBQUUsRUFBRSxDQUFDO0lBQ0wsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsQ0FBQztDQUNOO0FBRUQ7SUFxQkUsbUNBQW9CLEdBQWU7UUFBbkMsaUJBQXdDO1FBQXBCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFMbkMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFHbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQTRDVCx3QkFBbUI7Ozs7UUFBRyxVQUFDLFNBQVM7WUFDdEMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0MsQ0FBQyxFQUFDO1FBRU0sNEJBQXVCOzs7O1FBQUcsVUFBQyxRQUFRO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEYsQ0FBQyxFQUFDO0lBaERxQyxDQUFDOzs7O0lBRXhDLG1EQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBRWpDLENBQUM7Ozs7O0lBRU8sdURBQW1COzs7O0lBQTNCO1FBRUUsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFbEUsQ0FBQzs7Ozs7SUFFTyxzREFBa0I7Ozs7SUFBMUI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWTthQUN2QyxHQUFHOzs7O1FBQUMsVUFBQyxDQUFNLElBQXFCLE9BQUEsQ0FBQztZQUNoQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZO1lBQ3pCLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDdEIsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWTtTQUMxQixDQUFDLEVBSitCLENBSS9CLEVBQUM7YUFDRixRQUFRLEVBQUU7YUFDVixNQUFNOzs7O1FBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFqRixDQUFpRixFQUFDLENBQUE7SUFDM0csQ0FBQzs7Ozs7SUFFTywyREFBdUI7Ozs7SUFBL0I7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFL0MsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0I7aUJBQzFDLFNBQVMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQztTQUNsRTtRQUVELElBQUksQ0FBQyxnQkFBZ0I7YUFDbEIsVUFBVTs7O1FBQUM7WUFDVixPQUFPLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQixDQUFDLEVBQUM7YUFDRCxTQUFTOzs7O1FBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7Ozs7UUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLEVBQUMsQ0FBQztJQUUzRSxDQUFDOzs7OztJQVVPLGtEQUFjOzs7O0lBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFBQSxDQUFDOztnQkF6RUgsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDOzs7O2dCQWpCa0MsVUFBVTs7O2lDQXdCMUMsS0FBSztvQ0FHTCxLQUFLO2dDQUdMLEtBQUs7MkJBR0wsS0FBSzs7SUF5RFIsZ0NBQUM7Q0FBQSxBQTNFRCxJQTJFQztTQXhFWSx5QkFBeUI7Ozs7OztJQUVwQyxpREFBcUI7Ozs7O0lBQ3JCLHNEQUEwQjs7Ozs7SUFDMUIscURBQXlCOztJQUV6QixtREFDZTs7SUFFZixzREFDa0I7O0lBRWxCLGtEQUNtQjs7SUFFbkIsNkNBQ2lCOzs7OztJQTRDakIsd0RBRUU7Ozs7O0lBRUYsNERBRUU7Ozs7O0lBaERVLHdDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tIFwicnhqc1wiO1xuXG5pbnRlcmZhY2UgU2Nyb2xsUG9zaXRpb24ge1xuICBzSDogbnVtYmVyO1xuICBzVDogbnVtYmVyO1xuICBjSDogbnVtYmVyO1xufVxuXG5jb25zdCBERUZBVUxUX1NDUk9MTF9QT1NJVElPTjogU2Nyb2xsUG9zaXRpb24gPSB7XG4gIHNIOiAwLFxuICBzVDogMCxcbiAgY0g6IDBcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBJbmZpbml0ZVNjcm9sbGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnQkO1xuICBwcml2YXRlIHVzZXJTY3JvbGxlZERvd24kO1xuICBwcml2YXRlIHJlcXVlc3RPblNjcm9sbCQ7XG5cbiAgQElucHV0KClcbiAgc2Nyb2xsQ2FsbGJhY2s7XG5cbiAgQElucHV0KClcbiAgaW1tZWRpYXRlQ2FsbGJhY2s7XG5cbiAgQElucHV0KClcbiAgc2Nyb2xsUGVyY2VudCA9IDcwO1xuXG4gIEBJbnB1dCgpXG4gIGlzU3VibWl0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbG06IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsRXZlbnQoKTtcbiAgICB0aGlzLnN0cmVhbVNjcm9sbEV2ZW50cygpO1xuICAgIHRoaXMucmVxdWVzdENhbGxiYWNrT25TY3JvbGwoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclNjcm9sbEV2ZW50KCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudCQgPSBmcm9tRXZlbnQodGhpcy5lbG0ubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcpO1xuXG4gIH1cblxuICBwcml2YXRlIHN0cmVhbVNjcm9sbEV2ZW50cygpIHtcbiAgICB0aGlzLnVzZXJTY3JvbGxlZERvd24kID0gdGhpcy5zY3JvbGxFdmVudCRcbiAgICAgIC5tYXAoKGU6IGFueSk6IFNjcm9sbFBvc2l0aW9uID0+ICh7XG4gICAgICAgIHNIOiBlLnRhcmdldC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIHNUOiBlLnRhcmdldC5zY3JvbGxUb3AsXG4gICAgICAgIGNIOiBlLnRhcmdldC5jbGllbnRIZWlnaHRcbiAgICAgIH0pKVxuICAgICAgLnBhaXJ3aXNlKClcbiAgICAgIC5maWx0ZXIocG9zaXRpb25zID0+IHRoaXMuaXNVc2VyU2Nyb2xsaW5nRG93bihwb3NpdGlvbnMpICYmIHRoaXMuaXNTY3JvbGxFeHBlY3RlZFBlcmNlbnQocG9zaXRpb25zWzFdKSlcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdENhbGxiYWNrT25TY3JvbGwoKSB7XG4gICAgdGhpcy5yZXF1ZXN0T25TY3JvbGwkID0gdGhpcy51c2VyU2Nyb2xsZWREb3duJDtcblxuICAgIGlmICh0aGlzLmltbWVkaWF0ZUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnJlcXVlc3RPblNjcm9sbCQgPSB0aGlzLnJlcXVlc3RPblNjcm9sbCRcbiAgICAgICAgLnN0YXJ0V2l0aChbREVGQVVMVF9TQ1JPTExfUE9TSVRJT04sIERFRkFVTFRfU0NST0xMX1BPU0lUSU9OXSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0T25TY3JvbGwkXG4gICAgICAuZXhoYXVzdE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbENhbGxiYWNrKCk7XG4gICAgICB9KVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4geyBjb25zb2xlLmxvZyhkYXRhKSB9LCAoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBpc1VzZXJTY3JvbGxpbmdEb3duID0gKHBvc2l0aW9ucykgPT4ge1xuICAgIHJldHVybiBwb3NpdGlvbnNbMF0uc1QgPCBwb3NpdGlvbnNbMV0uc1Q7XG4gIH07XG5cbiAgcHJpdmF0ZSBpc1Njcm9sbEV4cGVjdGVkUGVyY2VudCA9IChwb3NpdGlvbikgPT4ge1xuICAgIHJldHVybiAoKHBvc2l0aW9uLnNUICsgcG9zaXRpb24uY0gpIC8gcG9zaXRpb24uc0gpID4gKHRoaXMuc2Nyb2xsUGVyY2VudCAvIDEwMCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBpc1Njcm9sbFN1Ym1pdCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1N1Ym1pdDtcbiAgfTtcblxufVxuIl19