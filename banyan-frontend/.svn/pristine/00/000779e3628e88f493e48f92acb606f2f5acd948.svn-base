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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci1tb2RhbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUV2RSxNQUFNLEtBQU8sc0JBQXNCLEdBQVE7SUFDekMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixFQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ1o7QUFFRDtJQWVFLGtDQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQVZ4QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFVYixDQUFDOzs7O0lBUmhCLDBDQUFPOzs7SUFBOUI7UUFDRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUN1QiwyQ0FBUTs7O0lBQWhDO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7Ozs7SUFJRCwyQ0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztTQUNyRTtR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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVPLDJDQUFROzs7O0lBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Z0JBM0ZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ3BDOzs7O2dCQWJrQixVQUFVOzs7OEJBZTFCLE1BQU07a0NBQ04sS0FBSzswQkFDTCxZQUFZLFNBQUMsT0FBTzsyQkFJcEIsWUFBWSxTQUFDLFFBQVE7O0lBaUZ4QiwrQkFBQztDQUFBLEFBNUZELElBNEZDO1NBeEZZLHdCQUF3Qjs7O0lBQ25DLCtDQUFtRDs7SUFDbkQsbURBQW1EOzs7OztJQVFuRCxtREFBd0I7Ozs7O0lBQ1osc0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lUGlja2VyTW9kYWxDb21wb25lbnR9IGZyb20gXCIuL3RpbWUtcGlja2VyLW1vZGFsL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVBpY2tlck1vZGFsRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0aW1lUGlja2VyXScsXG4gIHByb3ZpZGVyczogW0RFRkFVTFRfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgdGltZVBpY2tlck1vZGFsOiBUaW1lUGlja2VyTW9kYWxDb21wb25lbnQ7XG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgb25Gb2N1cygpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJykgb25DaGFuZ2UoKSB7XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwudGltZSA9IHRoaXMuZ2V0RGF0ZUlucHV0KCk7XG4gIH1cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy50aW1lUGlja2VyTW9kYWwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmVdIE1pc3NpbmcgdGltZVBpY2tlck1vZGFsJyk7XG4gICAgfVxuICAgIHRoaXMudGltZVBpY2tlck1vZGFsLm9uQ2hhbmdlLnN1YnNjcmliZSgodGltZVN0cikgPT4ge1xuICAgICAgdGhpcy53cml0ZVZhbHVlKHRpbWVTdHIpO1xuICAgICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRpbWVTdHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgXG4gIH1cblxuICBvcGVuKCkge1xuICAgIGxldCBib3VuZGluZyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgY3NzID0ge1xuICAgICAgbGVmdDogYm91bmRpbmcubGVmdFxuICAgIH07XG4gICAgaWYgKGJvdW5kaW5nLnRvcCArIDE1MCA8IGlubmVySGVpZ2h0KSB7XG4gICAgICAvLyBTaG93IGJvdHRvbVxuICAgICAgY3NzWyd0b3AnXSA9IGJvdW5kaW5nLnRvcCArIGJvdW5kaW5nLmhlaWdodCArIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNob3cgdG9wXG4gICAgICBjc3NbJ2JvdHRvbSddID0gYm91bmRpbmcudG9wIC0gMjtcbiAgICB9XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwub3Blbihjc3MpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZUlucHV0KCk6IERhdGUgfCBudWxsIHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgLy8gSEg6bW06c3MgZm9ybWF0XG4gICAgbGV0IHRpbWVzOiBhbnlbXTtcbiAgICBpZiAodmFsdWUuaW5kZXhPZignOicpID4gLTEpIHtcbiAgICAgIHRpbWVzID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGltZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoICsgMTsgaSArPSAyKSB7XG4gICAgICAgIHRpbWVzLnB1c2godmFsdWUuc3Vic3RyKGksIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGltZXNbMF0gPSBOdW1iZXIodGltZXNbMF0pO1xuICAgIHRpbWVzWzFdID0gTnVtYmVyKHRpbWVzWzFdKSB8fCAwO1xuICAgIC8vIEludmFsaWQgdGltZVxuICAgIGlmICghdGltZXNbMF0gJiYgdGltZXNbMF0gIT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkYXRlLnNldEhvdXJzKHRpbWVzWzBdKTtcbiAgICBkYXRlLnNldE1pbnV0ZXModGltZXNbMV0pO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgfVxufVxuIl19