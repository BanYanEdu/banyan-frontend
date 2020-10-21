/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimepickerComponent } from "ngx-bootstrap";
export class TimePickerModalComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.arrowkeys = true;
        this.hourStep = 1;
        this.minuteStep = 15;
        this.mousewheel = true;
        this.readonlyInput = false;
        this.secondsStep = 10;
        this.showMinutes = true;
        this.showSpinners = true;
        this.onChange = new EventEmitter();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set time(date) {
        this._timeDate = date;
        this.timeStr = TimePickerModalComponent._formatDate(date);
        this.onChange.emit(this.timeStr);
    }
    /**
     * @return {?}
     */
    get time() {
        return this._timeDate;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.$modal = $(this.el.nativeElement).detach().addClass('modal');
        this.$modalContent = this.$modal.find('.time-picker-modal');
        // Touched close
        this.$modal.on('mousedown click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.target.isSameNode(this.$modal[0])) {
                this.close();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.$modal.remove();
    }
    /**
     * @return {?}
     */
    close() {
        this.$modal.detach();
    }
    /**
     * @param {?} css
     * @return {?}
     */
    open(css) {
        this.$modalContent.css(css);
        document.body.appendChild(this.$modal[0]);
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    static _formatDate(date) {
        if (!date || !date.getTime()) {
            return '';
        }
        else {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    }
}
TimePickerModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker-modal',
                template: "<div class=\"time-picker-modal\">\n    <timepicker #timePicker [(ngModel)]=\"time\"\n                [arrowkeys]=\"arrowkeys\"\n                [max]=\"max\"\n                [min]=\"min\"\n                [minuteStep]=\"minuteStep\"\n                [mousewheel]=\"mousewheel\"\n                [readonlyInput]=\"readonlyInput\"\n                [secondsStep]=\"secondsStep\"\n                [showMeridian]=\"showMeridian\"\n                [showMinutes]=\"showMinutes\"\n                [showSeconds]=\"showSeconds\"\n                [showSpinners]=\"showSpinners\">\n\n    </timepicker>\n</div>",
                styles: [":host(.modal){display:block;z-index:1101}.time-picker-modal{position:absolute;border:1px solid rgba(0,0,0,.2);background:#fff;border-radius:4px;padding:10px}"]
            }] }
];
/** @nocollapse */
TimePickerModalComponent.ctorParameters = () => [
    { type: ElementRef }
];
TimePickerModalComponent.propDecorators = {
    arrowkeys: [{ type: Input }],
    hourStep: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    minuteStep: [{ type: Input }],
    mousewheel: [{ type: Input }],
    readonlyInput: [{ type: Input }],
    secondsStep: [{ type: Input }],
    showMeridian: [{ type: Input }],
    showMinutes: [{ type: Input }],
    showSeconds: [{ type: Input }],
    showSpinners: [{ type: Input }],
    time: [{ type: Input }],
    onChange: [{ type: Output }],
    timePicker: [{ type: ViewChild, args: ['timePicker',] }]
};
if (false) {
    /** @type {?} */
    TimePickerModalComponent.prototype.arrowkeys;
    /** @type {?} */
    TimePickerModalComponent.prototype.hourStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.max;
    /** @type {?} */
    TimePickerModalComponent.prototype.min;
    /** @type {?} */
    TimePickerModalComponent.prototype.minuteStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.mousewheel;
    /** @type {?} */
    TimePickerModalComponent.prototype.readonlyInput;
    /** @type {?} */
    TimePickerModalComponent.prototype.secondsStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.showMeridian;
    /** @type {?} */
    TimePickerModalComponent.prototype.showMinutes;
    /** @type {?} */
    TimePickerModalComponent.prototype.showSeconds;
    /** @type {?} */
    TimePickerModalComponent.prototype.showSpinners;
    /** @type {?} */
    TimePickerModalComponent.prototype.onChange;
    /** @type {?} */
    TimePickerModalComponent.prototype.timePicker;
    /** @type {?} */
    TimePickerModalComponent.prototype.timeStr;
    /** @type {?} */
    TimePickerModalComponent.prototype.$modal;
    /** @type {?} */
    TimePickerModalComponent.prototype.$modalContent;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalComponent.prototype._timeDate;
    /** @type {?} */
    TimePickerModalComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci1tb2RhbC90aW1lLXBpY2tlci1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBUWxELE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUErQmpDLFlBQ1csRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUEvQmhCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFZNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFVeEMsQ0FBQzs7Ozs7SUFwQkQsSUFBYSxJQUFJLENBQUMsSUFBaUI7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7OztJQWNELFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFNUQsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQjs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsRUFBQyxDQUFBO0lBQ04sQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxHQUFRO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBVTtRQUNqQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hGO0lBQ0wsQ0FBQzs7O1lBeEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixrbUJBQWlEOzthQUVwRDs7OztZQVJrQixVQUFVOzs7d0JBVXhCLEtBQUs7dUJBQ0wsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO21CQUVMLEtBQUs7dUJBVUwsTUFBTTt5QkFDTixTQUFTLFNBQUMsWUFBWTs7OztJQXhCdkIsNkNBQW1DOztJQUNuQyw0Q0FBOEI7O0lBQzlCLHVDQUFtQjs7SUFDbkIsdUNBQW1COztJQUNuQiw4Q0FBaUM7O0lBQ2pDLDhDQUFvQzs7SUFDcEMsaURBQXdDOztJQUN4QywrQ0FBa0M7O0lBQ2xDLGdEQUErQjs7SUFDL0IsK0NBQXFDOztJQUNyQywrQ0FBOEI7O0lBQzlCLGdEQUFzQzs7SUFZdEMsNENBQXdDOztJQUN4Qyw4Q0FBeUQ7O0lBQ3pELDJDQUFnQjs7SUFDaEIsMENBQVk7O0lBQ1osaURBQW1COzs7OztJQUNuQiw2Q0FBd0I7O0lBR3BCLHNDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lcGlja2VyQ29tcG9uZW50fSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuZGVjbGFyZSBsZXQgJDphbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZS1waWNrZXItbW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLXBpY2tlci1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBhcnJvd2tleXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGhvdXJTdGVwOiBudW1iZXIgPSAxO1xuICAgIEBJbnB1dCgpIG1heDogRGF0ZTtcbiAgICBASW5wdXQoKSBtaW46IERhdGU7XG4gICAgQElucHV0KCkgbWludXRlU3RlcDogbnVtYmVyID0gMTU7XG4gICAgQElucHV0KCkgbW91c2V3aGVlbDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcmVhZG9ubHlJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNlY29uZHNTdGVwOiBudW1iZXIgPSAxMDtcbiAgICBASW5wdXQoKSBzaG93TWVyaWRpYW46IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hvd01pbnV0ZXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dTZWNvbmRzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dTcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZXQgdGltZShkYXRlOiBEYXRlIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl90aW1lRGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMudGltZVN0ciA9IFRpbWVQaWNrZXJNb2RhbENvbXBvbmVudC5fZm9ybWF0RGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMudGltZVN0cik7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lRGF0ZTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQFZpZXdDaGlsZCgndGltZVBpY2tlcicpIHRpbWVQaWNrZXI6IFRpbWVwaWNrZXJDb21wb25lbnQ7XG4gICAgdGltZVN0cjogc3RyaW5nO1xuICAgICRtb2RhbDogYW55O1xuICAgICRtb2RhbENvbnRlbnQ6IGFueTtcbiAgICBwcml2YXRlIF90aW1lRGF0ZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMuZWwubmF0aXZlRWxlbWVudCkuZGV0YWNoKCkuYWRkQ2xhc3MoJ21vZGFsJyk7XG4gICAgICAgIHRoaXMuJG1vZGFsQ29udGVudCA9IHRoaXMuJG1vZGFsLmZpbmQoJy50aW1lLXBpY2tlci1tb2RhbCcpO1xuXG4gICAgICAgIC8vIFRvdWNoZWQgY2xvc2VcbiAgICAgICAgdGhpcy4kbW9kYWwub24oJ21vdXNlZG93biBjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLiRtb2RhbFswXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLiRtb2RhbC5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBvcGVuKGNzczogYW55KSB7XG4gICAgICAgIHRoaXMuJG1vZGFsQ29udGVudC5jc3MoY3NzKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLiRtb2RhbFswXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2Zvcm1hdERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICBpZiAoIWRhdGUgfHwgIWRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpICsgJzonICsgKCcwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=