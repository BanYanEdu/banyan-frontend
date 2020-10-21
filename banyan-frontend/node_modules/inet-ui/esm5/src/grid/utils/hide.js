/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer } from '@angular/core';
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj === undefined || obj === null;
}
var Hide = /** @class */ (function () {
    function Hide(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._prevCondition = null;
    }
    Object.defineProperty(Hide.prototype, "hide", {
        set: /**
         * @param {?} newCondition
         * @return {?}
         */
        function (newCondition) {
            this.initDisplayStyle();
            if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
                this._prevCondition = true;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
            }
            else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
                this._prevCondition = false;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', this._displayStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    Hide.prototype.initDisplayStyle = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._displayStyle === undefined) {
            /** @type {?} */
            var displayStyle = this._elementRef.nativeElement.style.display;
            if (displayStyle && displayStyle !== 'none') {
                this._displayStyle = displayStyle;
            }
        }
    };
    Hide.decorators = [
        { type: Directive, args: [{ selector: '[hide]', inputs: ['hide'] },] }
    ];
    /** @nocollapse */
    Hide.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    return Hide;
}());
export { Hide };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._prevCondition;
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._displayStyle;
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC91dGlscy9oaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRzlELFNBQVMsT0FBTyxDQUFDLEdBQVE7SUFDckIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDN0MsQ0FBQztBQUVEO0lBTUksY0FBb0IsV0FBdUIsRUFBVSxTQUFtQjtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFIaEUsbUJBQWMsR0FBWSxJQUFJLENBQUM7SUFJdkMsQ0FBQztJQUVELHNCQUFJLHNCQUFJOzs7OztRQUFSLFVBQVMsWUFBcUI7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEIsSUFBSSxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUN4RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3JGO2lCQUFNLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDakc7UUFDTCxDQUFDOzs7T0FBQTs7Ozs7SUFFTywrQkFBZ0I7Ozs7SUFBeEI7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFOztnQkFDOUIsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQy9ELElBQUksWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1NBQ0o7SUFDTCxDQUFDOztnQkE1QkosU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQzs7OztnQkFQOUIsVUFBVTtnQkFBRSxRQUFROztJQW9DdkMsV0FBQztDQUFBLEFBN0JELElBNkJDO1NBNUJZLElBQUk7Ozs7OztJQUViLDhCQUF1Qzs7Ozs7SUFDdkMsNkJBQThCOzs7OztJQUVsQiwyQkFBK0I7Ozs7O0lBQUUseUJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5mdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbaGlkZV0nLCBpbnB1dHM6IFsnaGlkZSddfSlcbmV4cG9ydCBjbGFzcyBIaWRlIHtcblxuICAgIHByaXZhdGUgX3ByZXZDb25kaXRpb246IGJvb2xlYW4gPSBudWxsO1xuICAgIHByaXZhdGUgX2Rpc3BsYXlTdHlsZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG4gICAgfVxuXG4gICAgc2V0IGhpZGUobmV3Q29uZGl0aW9uOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaW5pdERpc3BsYXlTdHlsZSgpO1xuXG4gICAgICAgIGlmIChuZXdDb25kaXRpb24gJiYgKGlzQmxhbmsodGhpcy5fcHJldkNvbmRpdGlvbikgfHwgIXRoaXMuX3ByZXZDb25kaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2Q29uZGl0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIGlmICghbmV3Q29uZGl0aW9uICYmIChpc0JsYW5rKHRoaXMuX3ByZXZDb25kaXRpb24pIHx8IHRoaXMuX3ByZXZDb25kaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2Q29uZGl0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsIHRoaXMuX2Rpc3BsYXlTdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREaXNwbGF5U3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaXNwbGF5U3R5bGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGRpc3BsYXlTdHlsZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKGRpc3BsYXlTdHlsZSAmJiBkaXNwbGF5U3R5bGUgIT09ICdub25lJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlTdHlsZSA9IGRpc3BsYXlTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==