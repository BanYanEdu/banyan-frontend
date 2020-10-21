/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { TimePickerModalComponent } from "./time-picker-modal/time-picker-modal.component";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
/** @type {?} */
export var DEFAULT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return TimePickerModalDirective; })),
    multi: true
};
var TimePickerModalDirective = /** @class */ (function () {
    function TimePickerModalDirective(el) {
        this.el = el;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TimePickerModalDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.open();
        this.onChange();
    };
    /**
     * @return {?}
     */
    TimePickerModalDirective.prototype.onChange = /**
     * @return {?}
     */
    function () {
        this.timePickerModal.time = this.getDateInput();
    };
    /**
     * @return {?}
     */
    TimePickerModalDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.timePickerModal) {
            console.error('[TimePickerModalDirective] Missing timePickerModal');
        }
        this.timePickerModal.onChange.subscribe((/**
         * @param {?} timeStr
         * @return {?}
         */
        function (timeStr) {
            _this.writeValue(timeStr);
            if (_this.propagateChange) {
                _this.propagateChange(timeStr);
            }
        }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerModalDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.el.nativeElement.value = value;
        this.valueChange.emit(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimePickerModalDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimePickerModalDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @return {?}
     */
    TimePickerModalDirective.prototype.open = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bounding = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var css = {
            left: bounding.left
        };
        if (bounding.top + 150 < innerHeight) {
            // Show bottom
            css['top'] = bounding.top + bounding.height + 2;
        }
        else {
            // Show top
            css['bottom'] = bounding.top - 2;
        }
        this.timePickerModal.open(css);
    };
    /**
     * @return {?}
     */
    TimePickerModalDirective.prototype.close = /**
     * @return {?}
     */
    function () {
        this.timePickerModal.close();
    };
    /**
     * @private
     * @return {?}
     */
    TimePickerModalDirective.prototype.getDateInput = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getValue();
        if (!value) {
            return null;
        }
        /** @type {?} */
        var date = new Date();
        date.setMinutes(0);
        // HH:mm:ss format
        /** @type {?} */
        var times;
        if (value.indexOf(':') > -1) {
            times = value.split(':');
        }
        else {
            times = [];
            for (var i = 0; i < value.length + 1; i += 2) {
                times.push(value.substr(i, 2));
            }
        }
        times[0] = Number(times[0]);
        times[1] = Number(times[1]) || 0;
        // Invalid time
        if (!times[0] && times[0] !== 0) {
            return null;
        }
        date.setHours(times[0]);
        date.setMinutes(times[1]);
        return date;
    };
    /**
     * @private
     * @return {?}
     */
    TimePickerModalDirective.prototype.getValue = /**
     * @private
     * @return {?}
     */
    function () {
        return this.el.nativeElement.value.trim();
    };
    TimePickerModalDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[timePicker]',
                    providers: [DEFAULT_VALUE_ACCESSOR]
                },] }
    ];
    /** @nocollapse */
    TimePickerModalDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TimePickerModalDirective.propDecorators = {
        valueChange: [{ type: Output }],
        timePickerModal: [{ type: Input }],
        onFocus: [{ type: HostListener, args: ['focus',] }],
        onChange: [{ type: HostListener, args: ['change',] }]
    };
    return TimePickerModalDirective;
}());
export { TimePickerModalDirective };
if (false) {
    /** @type {?} */
    TimePickerModalDirective.prototype.valueChange;
    /** @type {?} */
    TimePickerModalDirective.prototype.timePickerModal;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalDirective.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9yZW1vdGUtbW9kdWxlL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLW1vZGFsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXZFLE1BQU0sS0FBTyxzQkFBc0IsR0FBUTtJQUN6QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsd0JBQXdCLEVBQXhCLENBQXdCLEVBQUM7SUFDdkQsS0FBSyxFQUFFLElBQUk7Q0FDWjtBQUVEO0lBZUUsa0NBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVnhCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVViLENBQUM7Ozs7SUFSaEIsMENBQU87OztJQUE5QjtRQUNFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBQ3VCLDJDQUFROzs7SUFBaEM7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQzs7OztJQUlELDJDQUFROzs7SUFBUjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvREFB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Q0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRU8sMkNBQVE7Ozs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QyxDQUFDOztnQkEzRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDcEM7Ozs7Z0JBYmtCLFVBQVU7Ozs4QkFlMUIsTUFBTTtrQ0FDTixLQUFLOzBCQUNMLFlBQVksU0FBQyxPQUFPOzJCQUlwQixZQUFZLFNBQUMsUUFBUTs7SUFpRnhCLCtCQUFDO0NBQUEsQUE1RkQsSUE0RkM7U0F4Rlksd0JBQXdCOzs7SUFDbkMsK0NBQW1EOztJQUNuRCxtREFBbUQ7Ozs7O0lBUW5ELG1EQUF3Qjs7Ozs7SUFDWixzQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RpbWVQaWNrZXJNb2RhbENvbXBvbmVudH0gZnJvbSBcIi4vdGltZS1waWNrZXItbW9kYWwvdGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RpbWVQaWNrZXJdJyxcbiAgcHJvdmlkZXJzOiBbREVGQVVMVF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlck1vZGFsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBASW5wdXQoKSB0aW1lUGlja2VyTW9kYWw6IFRpbWVQaWNrZXJNb2RhbENvbXBvbmVudDtcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKSBvbkZvY3VzKCkge1xuICAgIHRoaXMub3BlbigpO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKSBvbkNoYW5nZSgpIHtcbiAgICB0aGlzLnRpbWVQaWNrZXJNb2RhbC50aW1lID0gdGhpcy5nZXREYXRlSW5wdXQoKTtcbiAgfVxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLnRpbWVQaWNrZXJNb2RhbCkge1xuICAgICAgY29uc29sZS5lcnJvcignW1RpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZV0gTWlzc2luZyB0aW1lUGlja2VyTW9kYWwnKTtcbiAgICB9XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwub25DaGFuZ2Uuc3Vic2NyaWJlKCh0aW1lU3RyKSA9PiB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGltZVN0cik7XG4gICAgICBpZiAodGhpcy5wcm9wYWdhdGVDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGltZVN0cik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICBcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgbGV0IGJvdW5kaW5nID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBjc3MgPSB7XG4gICAgICBsZWZ0OiBib3VuZGluZy5sZWZ0XG4gICAgfTtcbiAgICBpZiAoYm91bmRpbmcudG9wICsgMTUwIDwgaW5uZXJIZWlnaHQpIHtcbiAgICAgIC8vIFNob3cgYm90dG9tXG4gICAgICBjc3NbJ3RvcCddID0gYm91bmRpbmcudG9wICsgYm91bmRpbmcuaGVpZ2h0ICsgMjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2hvdyB0b3BcbiAgICAgIGNzc1snYm90dG9tJ10gPSBib3VuZGluZy50b3AgLSAyO1xuICAgIH1cbiAgICB0aGlzLnRpbWVQaWNrZXJNb2RhbC5vcGVuKGNzcyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnRpbWVQaWNrZXJNb2RhbC5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREYXRlSW5wdXQoKTogRGF0ZSB8IG51bGwge1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGUuc2V0TWludXRlcygwKTtcbiAgICAvLyBISDptbTpzcyBmb3JtYXRcbiAgICBsZXQgdGltZXM6IGFueVtdO1xuICAgIGlmICh2YWx1ZS5pbmRleE9mKCc6JykgPiAtMSkge1xuICAgICAgdGltZXMgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGggKyAxOyBpICs9IDIpIHtcbiAgICAgICAgdGltZXMucHVzaCh2YWx1ZS5zdWJzdHIoaSwgMikpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aW1lc1swXSA9IE51bWJlcih0aW1lc1swXSk7XG4gICAgdGltZXNbMV0gPSBOdW1iZXIodGltZXNbMV0pIHx8IDA7XG4gICAgLy8gSW52YWxpZCB0aW1lXG4gICAgaWYgKCF0aW1lc1swXSAmJiB0aW1lc1swXSAhPT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRhdGUuc2V0SG91cnModGltZXNbMF0pO1xuICAgIGRhdGUuc2V0TWludXRlcyh0aW1lc1sxXSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwcml2YXRlIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUudHJpbSgpO1xuICB9XG59XG4iXX0=