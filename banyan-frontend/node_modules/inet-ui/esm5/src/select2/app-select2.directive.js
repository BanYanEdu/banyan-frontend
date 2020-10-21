/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Directive } from '@angular/core';
var AppSelect2Directive = /** @class */ (function () {
    function AppSelect2Directive(_el) {
        this._el = _el;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AppSelect2Directive.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.element = $(this._el.nativeElement).select2(this.options).change((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onChange.emit(e.target.value);
        }));
        this.updateSelect();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AppSelect2Directive.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.options) {
            this.updateSelect();
        }
        if (changes.initValue) {
            this.updateValue();
        }
    };
    /**
     * @return {?}
     */
    AppSelect2Directive.prototype.updateSelect = /**
     * @return {?}
     */
    function () {
        if (this.element && this.options) {
            this.element.empty().select2(this.options);
            this.updateValue();
        }
    };
    /**
     * @return {?}
     */
    AppSelect2Directive.prototype.updateValue = /**
     * @return {?}
     */
    function () {
        if (this.element && this.initValue) {
            this.element.val(this.initValue).trigger('change');
        }
    };
    AppSelect2Directive.decorators = [
        { type: Directive, args: [{
                    selector: 'select[appSelect2]'
                },] }
    ];
    /** @nocollapse */
    AppSelect2Directive.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AppSelect2Directive.propDecorators = {
        initValue: [{ type: Input }],
        options: [{ type: Input }],
        onChange: [{ type: Output }]
    };
    return AppSelect2Directive;
}());
export { AppSelect2Directive };
if (false) {
    /** @type {?} */
    AppSelect2Directive.prototype.initValue;
    /** @type {?} */
    AppSelect2Directive.prototype.options;
    /** @type {?} */
    AppSelect2Directive.prototype.onChange;
    /** @type {?} */
    AppSelect2Directive.prototype.element;
    /**
     * @type {?}
     * @private
     */
    AppSelect2Directive.prototype._el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNlbGVjdDIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9zZWxlY3QyL2FwcC1zZWxlY3QyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJeEM7SUFVSSw2QkFDWSxHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUxqQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQU83QyxDQUFDOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsQ0FBQztZQUNwRSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQseUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7OztJQUVELDBDQUFZOzs7SUFBWjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7O2dCQTFDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtpQkFDakM7Ozs7Z0JBVk8sVUFBVTs7OzRCQVliLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxNQUFNOztJQXNDWCwwQkFBQztDQUFBLEFBNUNELElBNENDO1NBekNZLG1CQUFtQjs7O0lBQzVCLHdDQUEyQjs7SUFDM0Isc0NBQXNCOztJQUN0Qix1Q0FBNkM7O0lBRTdDLHNDQUFhOzs7OztJQUdULGtDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnc2VsZWN0W2FwcFNlbGVjdDJdJ1xufSlcbmV4cG9ydCBjbGFzcyBBcHBTZWxlY3QyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGluaXRWYWx1ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGVsZW1lbnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSAkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpLnNlbGVjdDIodGhpcy5vcHRpb25zKS5jaGFuZ2UoKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdCgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlcy5pbml0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCAmJiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5lbXB0eSgpLnNlbGVjdDIodGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICYmIHRoaXMuaW5pdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmFsKHRoaXMuaW5pdFZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19