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
export class Hide {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._prevCondition = null;
    }
    /**
     * @param {?} newCondition
     * @return {?}
     */
    set hide(newCondition) {
        this.initDisplayStyle();
        if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
            this._prevCondition = true;
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
        }
        else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
            this._prevCondition = false;
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', this._displayStyle);
        }
    }
    /**
     * @private
     * @return {?}
     */
    initDisplayStyle() {
        if (this._displayStyle === undefined) {
            /** @type {?} */
            let displayStyle = this._elementRef.nativeElement.style.display;
            if (displayStyle && displayStyle !== 'none') {
                this._displayStyle = displayStyle;
            }
        }
    }
}
Hide.decorators = [
    { type: Directive, args: [{ selector: '[hide]', inputs: ['hide'] },] }
];
/** @nocollapse */
Hide.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC91dGlscy9oaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRzlELFNBQVMsT0FBTyxDQUFDLEdBQVE7SUFDckIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDN0MsQ0FBQztBQUdELE1BQU0sT0FBTyxJQUFJOzs7OztJQUtiLFlBQW9CLFdBQXVCLEVBQVUsU0FBbUI7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBSGhFLG1CQUFjLEdBQVksSUFBSSxDQUFDO0lBSXZDLENBQUM7Ozs7O0lBRUQsSUFBSSxJQUFJLENBQUMsWUFBcUI7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyRjthQUFNLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMvRSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pHO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTs7Z0JBQzlCLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTztZQUMvRCxJQUFJLFlBQVksSUFBSSxZQUFZLEtBQUssTUFBTSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQzs7O1lBNUJKLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7Ozs7WUFQOUIsVUFBVTtZQUFFLFFBQVE7Ozs7Ozs7SUFVbkMsOEJBQXVDOzs7OztJQUN2Qyw2QkFBOEI7Ozs7O0lBRWxCLDJCQUErQjs7Ozs7SUFBRSx5QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmZ1bmN0aW9uIGlzQmxhbmsob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1toaWRlXScsIGlucHV0czogWydoaWRlJ119KVxuZXhwb3J0IGNsYXNzIEhpZGUge1xuXG4gICAgcHJpdmF0ZSBfcHJldkNvbmRpdGlvbjogYm9vbGVhbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZGlzcGxheVN0eWxlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHtcbiAgICB9XG5cbiAgICBzZXQgaGlkZShuZXdDb25kaXRpb246IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pbml0RGlzcGxheVN0eWxlKCk7XG5cbiAgICAgICAgaWYgKG5ld0NvbmRpdGlvbiAmJiAoaXNCbGFuayh0aGlzLl9wcmV2Q29uZGl0aW9uKSB8fCAhdGhpcy5fcHJldkNvbmRpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZDb25kaXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2UgaWYgKCFuZXdDb25kaXRpb24gJiYgKGlzQmxhbmsodGhpcy5fcHJldkNvbmRpdGlvbikgfHwgdGhpcy5fcHJldkNvbmRpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZDb25kaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgdGhpcy5fZGlzcGxheVN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERpc3BsYXlTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3BsYXlTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgZGlzcGxheVN0eWxlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICBpZiAoZGlzcGxheVN0eWxlICYmIGRpc3BsYXlTdHlsZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxheVN0eWxlID0gZGlzcGxheVN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19