/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { TimePickerModalComponent } from "./time-picker-modal/time-picker-modal.component";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
/** @type {?} */
export const DEFAULT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => TimePickerModalDirective)),
    multi: true
};
export class TimePickerModalDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.open();
        this.onChange();
    }
    /**
     * @return {?}
     */
    onChange() {
        this.timePickerModal.time = this.getDateInput();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.timePickerModal) {
            console.error('[TimePickerModalDirective] Missing timePickerModal');
        }
        this.timePickerModal.onChange.subscribe((/**
         * @param {?} timeStr
         * @return {?}
         */
        (timeStr) => {
            this.writeValue(timeStr);
            if (this.propagateChange) {
                this.propagateChange(timeStr);
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.el.nativeElement.value = value;
        this.valueChange.emit(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @return {?}
     */
    open() {
        /** @type {?} */
        let bounding = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        let css = {
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
    }
    /**
     * @return {?}
     */
    close() {
        this.timePickerModal.close();
    }
    /**
     * @private
     * @return {?}
     */
    getDateInput() {
        /** @type {?} */
        let value = this.getValue();
        if (!value) {
            return null;
        }
        /** @type {?} */
        let date = new Date();
        date.setMinutes(0);
        // HH:mm:ss format
        /** @type {?} */
        let times;
        if (value.indexOf(':') > -1) {
            times = value.split(':');
        }
        else {
            times = [];
            for (let i = 0; i < value.length + 1; i += 2) {
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
    }
    /**
     * @private
     * @return {?}
     */
    getValue() {
        return this.el.nativeElement.value.trim();
    }
}
TimePickerModalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[timePicker]',
                providers: [DEFAULT_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
TimePickerModalDirective.ctorParameters = () => [
    { type: ElementRef }
];
TimePickerModalDirective.propDecorators = {
    valueChange: [{ type: Output }],
    timePickerModal: [{ type: Input }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onChange: [{ type: HostListener, args: ['change',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9yZW1vdGUtbW9kdWxlL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLW1vZGFsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXZFLE1BQU0sT0FBTyxzQkFBc0IsR0FBUTtJQUN6QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsRUFBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBTUQsTUFBTSxPQUFPLHdCQUF3Qjs7OztJQVduQyxZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQVZ4QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFVYixDQUFDOzs7O0lBUmhCLE9BQU87UUFDNUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFDdUIsUUFBUTtRQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQzs7OztJQUlELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7U0FDckU7UUFD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QUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFTyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7O1lBM0ZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDcEM7Ozs7WUFia0IsVUFBVTs7OzBCQWUxQixNQUFNOzhCQUNOLEtBQUs7c0JBQ0wsWUFBWSxTQUFDLE9BQU87dUJBSXBCLFlBQVksU0FBQyxRQUFROzs7O0lBTnRCLCtDQUFtRDs7SUFDbkQsbURBQW1EOzs7OztJQVFuRCxtREFBd0I7Ozs7O0lBQ1osc0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lUGlja2VyTW9kYWxDb21wb25lbnR9IGZyb20gXCIuL3RpbWUtcGlja2VyLW1vZGFsL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVBpY2tlck1vZGFsRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0aW1lUGlja2VyXScsXG4gIHByb3ZpZGVyczogW0RFRkFVTFRfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgdGltZVBpY2tlck1vZGFsOiBUaW1lUGlja2VyTW9kYWxDb21wb25lbnQ7XG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgb25Gb2N1cygpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJykgb25DaGFuZ2UoKSB7XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwudGltZSA9IHRoaXMuZ2V0RGF0ZUlucHV0KCk7XG4gIH1cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy50aW1lUGlja2VyTW9kYWwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmVdIE1pc3NpbmcgdGltZVBpY2tlck1vZGFsJyk7XG4gICAgfVxuICAgIHRoaXMudGltZVBpY2tlck1vZGFsLm9uQ2hhbmdlLnN1YnNjcmliZSgodGltZVN0cikgPT4ge1xuICAgICAgdGhpcy53cml0ZVZhbHVlKHRpbWVTdHIpO1xuICAgICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRpbWVTdHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgXG4gIH1cblxuICBvcGVuKCkge1xuICAgIGxldCBib3VuZGluZyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgY3NzID0ge1xuICAgICAgbGVmdDogYm91bmRpbmcubGVmdFxuICAgIH07XG4gICAgaWYgKGJvdW5kaW5nLnRvcCArIDE1MCA8IGlubmVySGVpZ2h0KSB7XG4gICAgICAvLyBTaG93IGJvdHRvbVxuICAgICAgY3NzWyd0b3AnXSA9IGJvdW5kaW5nLnRvcCArIGJvdW5kaW5nLmhlaWdodCArIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNob3cgdG9wXG4gICAgICBjc3NbJ2JvdHRvbSddID0gYm91bmRpbmcudG9wIC0gMjtcbiAgICB9XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwub3Blbihjc3MpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy50aW1lUGlja2VyTW9kYWwuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZUlucHV0KCk6IERhdGUgfCBudWxsIHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgLy8gSEg6bW06c3MgZm9ybWF0XG4gICAgbGV0IHRpbWVzOiBhbnlbXTtcbiAgICBpZiAodmFsdWUuaW5kZXhPZignOicpID4gLTEpIHtcbiAgICAgIHRpbWVzID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGltZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoICsgMTsgaSArPSAyKSB7XG4gICAgICAgIHRpbWVzLnB1c2godmFsdWUuc3Vic3RyKGksIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGltZXNbMF0gPSBOdW1iZXIodGltZXNbMF0pO1xuICAgIHRpbWVzWzFdID0gTnVtYmVyKHRpbWVzWzFdKSB8fCAwO1xuICAgIC8vIEludmFsaWQgdGltZVxuICAgIGlmICghdGltZXNbMF0gJiYgdGltZXNbMF0gIT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkYXRlLnNldEhvdXJzKHRpbWVzWzBdKTtcbiAgICBkYXRlLnNldE1pbnV0ZXModGltZXNbMV0pO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgfVxufVxuIl19