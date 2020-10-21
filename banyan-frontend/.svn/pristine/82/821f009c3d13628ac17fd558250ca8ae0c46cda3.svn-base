/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
var FrontViewDirective = /** @class */ (function () {
    function FrontViewDirective(_el) {
        this._el = _el;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.isShow = false;
    }
    /**
     * @return {?}
     */
    FrontViewDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._$el = $(this._el.nativeElement);
        this._$el.click((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.target.isSameNode(_this._el.nativeElement)) {
                _this.hide();
            }
        }));
        document.body.appendChild(this._el.nativeElement);
    };
    /**
     * @return {?}
     */
    FrontViewDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._el.nativeElement.remove();
    };
    /**
     * @return {?}
     */
    FrontViewDirective.prototype.show = /**
     * @return {?}
     */
    function () {
        this.isShow = true;
        this._$el.show();
        this.onShow.emit();
    };
    /**
     * @return {?}
     */
    FrontViewDirective.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.isShow = false;
        this._$el.hide();
        this.onHide.emit();
    };
    FrontViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appFrontView]',
                    exportAs: 'appFrontView'
                },] }
    ];
    /** @nocollapse */
    FrontViewDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FrontViewDirective.propDecorators = {
        onShow: [{ type: Output }],
        onHide: [{ type: Output }]
    };
    return FrontViewDirective;
}());
export { FrontViewDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnQtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2Zyb250LXZpZXcvZnJvbnQtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBcUIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzdGO0lBV0UsNEJBQ1MsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFQZCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzQyxXQUFNLEdBQVksS0FBSyxDQUFDO0lBS3BCLENBQUM7Ozs7SUFFTCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLOzs7O1FBQUMsVUFBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDL0MsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxpQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELGlDQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOztnQkF2Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjs7OztnQkFOa0IsVUFBVTs7O3lCQVExQixNQUFNO3lCQUNOLE1BQU07O0lBa0NULHlCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0FwQ1ksa0JBQWtCOzs7SUFDN0Isb0NBQTJDOztJQUMzQyxvQ0FBMkM7O0lBRTNDLG9DQUF3Qjs7Ozs7SUFFeEIsa0NBQWE7O0lBRVgsaUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBGcm9udFZpZXddJyxcbiAgZXhwb3J0QXM6ICdhcHBGcm9udFZpZXcnXG59KVxuZXhwb3J0IGNsYXNzIEZyb250Vmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIG9uU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25IaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgaXNTaG93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfJGVsO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2VsOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fJGVsID0gJCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl8kZWwuY2xpY2soKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5pc1NhbWVOb2RlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnJlbW92ZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgdGhpcy5fJGVsLnNob3coKTtcbiAgICB0aGlzLm9uU2hvdy5lbWl0KCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgdGhpcy5fJGVsLmhpZGUoKTtcbiAgICB0aGlzLm9uSGlkZS5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==