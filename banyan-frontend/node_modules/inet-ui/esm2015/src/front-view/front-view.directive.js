/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
export class FrontViewDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.isShow = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._$el = $(this._el.nativeElement);
        this._$el.click((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.target.isSameNode(this._el.nativeElement)) {
                this.hide();
            }
        }));
        document.body.appendChild(this._el.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._el.nativeElement.remove();
    }
    /**
     * @return {?}
     */
    show() {
        this.isShow = true;
        this._$el.show();
        this.onShow.emit();
    }
    /**
     * @return {?}
     */
    hide() {
        this.isShow = false;
        this._$el.hide();
        this.onHide.emit();
    }
}
FrontViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appFrontView]',
                exportAs: 'appFrontView'
            },] }
];
/** @nocollapse */
FrontViewDirective.ctorParameters = () => [
    { type: ElementRef }
];
FrontViewDirective.propDecorators = {
    onShow: [{ type: Output }],
    onHide: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    FrontViewDirective.prototype.onShow;
    /** @type {?} */
    FrontViewDirective.prototype.onHide;
    /** @type {?} */
    FrontViewDirective.prototype.isShow;
    /**
     * @type {?}
     * @private
     */
    FrontViewDirective.prototype._$el;
    /** @type {?} */
    FrontViewDirective.prototype._el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnQtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2Zyb250LXZpZXcvZnJvbnQtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBcUIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTzdGLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFPN0IsWUFDUyxHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQVBkLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFLcEIsQ0FBQzs7OztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQXZDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7YUFDekI7Ozs7WUFOa0IsVUFBVTs7O3FCQVExQixNQUFNO3FCQUNOLE1BQU07Ozs7SUFEUCxvQ0FBMkM7O0lBQzNDLG9DQUEyQzs7SUFFM0Msb0NBQXdCOzs7OztJQUV4QixrQ0FBYTs7SUFFWCxpQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEZyb250Vmlld10nLFxuICBleHBvcnRBczogJ2FwcEZyb250Vmlldydcbn0pXG5leHBvcnQgY2xhc3MgRnJvbnRWaWV3RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCkgb25TaG93ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbkhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBpc1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF8kZWw7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZWw6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl8kZWwgPSAkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuXyRlbC5jbGljaygoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcbiAgICB0aGlzLl8kZWwuc2hvdygpO1xuICAgIHRoaXMub25TaG93LmVtaXQoKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICB0aGlzLl8kZWwuaGlkZSgpO1xuICAgIHRoaXMub25IaWRlLmVtaXQoKTtcbiAgfVxufVxuIl19