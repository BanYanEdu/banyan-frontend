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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci1tb2RhbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUV2RSxNQUFNLE9BQU8sc0JBQXNCLEdBQVE7SUFDekMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLEVBQUM7SUFDdkQsS0FBSyxFQUFFLElBQUk7Q0FDWjtBQU1ELE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFXbkMsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFWeEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBVWIsQ0FBQzs7OztJQVJoQixPQUFPO1FBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBQ3VCLFFBQVE7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7Ozs7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FB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QUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRU8sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVDLENBQUM7OztZQTNGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ3BDOzs7O1lBYmtCLFVBQVU7OzswQkFlMUIsTUFBTTs4QkFDTixLQUFLO3NCQUNMLFlBQVksU0FBQyxPQUFPO3VCQUlwQixZQUFZLFNBQUMsUUFBUTs7OztJQU50QiwrQ0FBbUQ7O0lBQ25ELG1EQUFtRDs7Ozs7SUFRbkQsbURBQXdCOzs7OztJQUNaLHNDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGltZVBpY2tlck1vZGFsQ29tcG9uZW50fSBmcm9tIFwiLi90aW1lLXBpY2tlci1tb2RhbC90aW1lLXBpY2tlci1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGltZVBpY2tlcl0nLFxuICBwcm92aWRlcnM6IFtERUZBVUxUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBJbnB1dCgpIHRpbWVQaWNrZXJNb2RhbDogVGltZVBpY2tlck1vZGFsQ29tcG9uZW50O1xuICBASG9zdExpc3RlbmVyKCdmb2N1cycpIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gICAgdGhpcy5vbkNoYW5nZSgpO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpIG9uQ2hhbmdlKCkge1xuICAgIHRoaXMudGltZVBpY2tlck1vZGFsLnRpbWUgPSB0aGlzLmdldERhdGVJbnB1dCgpO1xuICB9XG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudGltZVBpY2tlck1vZGFsKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbVGltZVBpY2tlck1vZGFsRGlyZWN0aXZlXSBNaXNzaW5nIHRpbWVQaWNrZXJNb2RhbCcpO1xuICAgIH1cbiAgICB0aGlzLnRpbWVQaWNrZXJNb2RhbC5vbkNoYW5nZS5zdWJzY3JpYmUoKHRpbWVTdHIpID0+IHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aW1lU3RyKTtcbiAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZUNoYW5nZSkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aW1lU3RyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIFxuICB9XG5cbiAgb3BlbigpIHtcbiAgICBsZXQgYm91bmRpbmcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGNzcyA9IHtcbiAgICAgIGxlZnQ6IGJvdW5kaW5nLmxlZnRcbiAgICB9O1xuICAgIGlmIChib3VuZGluZy50b3AgKyAxNTAgPCBpbm5lckhlaWdodCkge1xuICAgICAgLy8gU2hvdyBib3R0b21cbiAgICAgIGNzc1sndG9wJ10gPSBib3VuZGluZy50b3AgKyBib3VuZGluZy5oZWlnaHQgKyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTaG93IHRvcFxuICAgICAgY3NzWydib3R0b20nXSA9IGJvdW5kaW5nLnRvcCAtIDI7XG4gICAgfVxuICAgIHRoaXMudGltZVBpY2tlck1vZGFsLm9wZW4oY3NzKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMudGltZVBpY2tlck1vZGFsLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldERhdGVJbnB1dCgpOiBEYXRlIHwgbnVsbCB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZS5zZXRNaW51dGVzKDApO1xuICAgIC8vIEhIOm1tOnNzIGZvcm1hdFxuICAgIGxldCB0aW1lczogYW55W107XG4gICAgaWYgKHZhbHVlLmluZGV4T2YoJzonKSA+IC0xKSB7XG4gICAgICB0aW1lcyA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aCArIDE7IGkgKz0gMikge1xuICAgICAgICB0aW1lcy5wdXNoKHZhbHVlLnN1YnN0cihpLCAyKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRpbWVzWzBdID0gTnVtYmVyKHRpbWVzWzBdKTtcbiAgICB0aW1lc1sxXSA9IE51bWJlcih0aW1lc1sxXSkgfHwgMDtcbiAgICAvLyBJbnZhbGlkIHRpbWVcbiAgICBpZiAoIXRpbWVzWzBdICYmIHRpbWVzWzBdICE9PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGF0ZS5zZXRIb3Vycyh0aW1lc1swXSk7XG4gICAgZGF0ZS5zZXRNaW51dGVzKHRpbWVzWzFdKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZS50cmltKCk7XG4gIH1cbn1cbiJdfQ==