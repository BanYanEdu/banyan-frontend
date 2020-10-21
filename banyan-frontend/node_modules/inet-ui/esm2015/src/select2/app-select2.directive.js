/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Directive } from '@angular/core';
export class AppSelect2Directive {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.element = $(this._el.nativeElement).select2(this.options).change((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onChange.emit(e.target.value);
        }));
        this.updateSelect();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateSelect();
        }
        if (changes.initValue) {
            this.updateValue();
        }
    }
    /**
     * @return {?}
     */
    updateSelect() {
        if (this.element && this.options) {
            this.element.empty().select2(this.options);
            this.updateValue();
        }
    }
    /**
     * @return {?}
     */
    updateValue() {
        if (this.element && this.initValue) {
            this.element.val(this.initValue).trigger('change');
        }
    }
}
AppSelect2Directive.decorators = [
    { type: Directive, args: [{
                selector: 'select[appSelect2]'
            },] }
];
/** @nocollapse */
AppSelect2Directive.ctorParameters = () => [
    { type: ElementRef }
];
AppSelect2Directive.propDecorators = {
    initValue: [{ type: Input }],
    options: [{ type: Input }],
    onChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNlbGVjdDIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9zZWxlY3QyL2FwcC1zZWxlY3QyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPeEMsTUFBTSxPQUFPLG1CQUFtQjs7OztJQU81QixZQUNZLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBTGpCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBTzdDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNSLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDOzs7WUExQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7YUFDakM7Ozs7WUFWTyxVQUFVOzs7d0JBWWIsS0FBSztzQkFDTCxLQUFLO3VCQUNMLE1BQU07Ozs7SUFGUCx3Q0FBMkI7O0lBQzNCLHNDQUFzQjs7SUFDdEIsdUNBQTZDOztJQUU3QyxzQ0FBYTs7Ozs7SUFHVCxrQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3NlbGVjdFthcHBTZWxlY3QyXSdcbn0pXG5leHBvcnQgY2xhc3MgQXBwU2VsZWN0MkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBpbml0VmFsdWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBlbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gJCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KS5zZWxlY3QyKHRoaXMub3B0aW9ucykuY2hhbmdlKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXMuaW5pdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgJiYgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZW1wdHkoKS5zZWxlY3QyKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCAmJiB0aGlzLmluaXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnZhbCh0aGlzLmluaXRWYWx1ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==