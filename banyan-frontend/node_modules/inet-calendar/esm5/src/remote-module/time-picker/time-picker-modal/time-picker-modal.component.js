/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimepickerComponent } from "ngx-bootstrap";
var TimePickerModalComponent = /** @class */ (function () {
    function TimePickerModalComponent(el) {
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
    Object.defineProperty(TimePickerModalComponent.prototype, "time", {
        get: /**
         * @return {?}
         */
        function () {
            return this._timeDate;
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._timeDate = date;
            this.timeStr = TimePickerModalComponent._formatDate(date);
            this.onChange.emit(this.timeStr);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimePickerModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.$modal = $(this.el.nativeElement).detach().addClass('modal');
        this.$modalContent = this.$modal.find('.time-picker-modal');
        // Touched close
        this.$modal.on('mousedown click', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.target.isSameNode(_this.$modal[0])) {
                _this.close();
            }
        }));
    };
    /**
     * @return {?}
     */
    TimePickerModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.$modal.remove();
    };
    /**
     * @return {?}
     */
    TimePickerModalComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.$modal.detach();
    };
    /**
     * @param {?} css
     * @return {?}
     */
    TimePickerModalComponent.prototype.open = /**
     * @param {?} css
     * @return {?}
     */
    function (css) {
        this.$modalContent.css(css);
        document.body.appendChild(this.$modal[0]);
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    TimePickerModalComponent._formatDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date || !date.getTime()) {
            return '';
        }
        else {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    };
    TimePickerModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-picker-modal',
                    template: "<div class=\"time-picker-modal\">\n    <timepicker #timePicker [(ngModel)]=\"time\"\n                [arrowkeys]=\"arrowkeys\"\n                [max]=\"max\"\n                [min]=\"min\"\n                [minuteStep]=\"minuteStep\"\n                [mousewheel]=\"mousewheel\"\n                [readonlyInput]=\"readonlyInput\"\n                [secondsStep]=\"secondsStep\"\n                [showMeridian]=\"showMeridian\"\n                [showMinutes]=\"showMinutes\"\n                [showSeconds]=\"showSeconds\"\n                [showSpinners]=\"showSpinners\">\n\n    </timepicker>\n</div>",
                    styles: [":host(.modal){display:block;z-index:1101}.time-picker-modal{position:absolute;border:1px solid rgba(0,0,0,.2);background:#fff;border-radius:4px;padding:10px}"]
                }] }
    ];
    /** @nocollapse */
    TimePickerModalComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return TimePickerModalComponent;
}());
export { TimePickerModalComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9yZW1vdGUtbW9kdWxlL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLW1vZGFsL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHbEQ7SUFvQ0ksa0NBQ1csRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUEvQmhCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFZNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFVeEMsQ0FBQztJQXBCRCxzQkFBYSwwQ0FBSTs7OztRQU1qQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7OztRQVJELFVBQWtCLElBQWlCO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTs7OztJQWtCRCwyQ0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU1RCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCOzs7O1FBQUUsVUFBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyQyxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEI7UUFDTCxDQUFDLEVBQUMsQ0FBQTtJQUNOLENBQUM7Ozs7SUFFRCw4Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCx3Q0FBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsdUNBQUk7Ozs7SUFBSixVQUFLLEdBQVE7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7O0lBRWMsb0NBQVc7Ozs7O0lBQTFCLFVBQTJCLElBQVU7UUFDakMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMxQixPQUFPLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RjtJQUNMLENBQUM7O2dCQXhFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0Isa21CQUFpRDs7aUJBRXBEOzs7O2dCQVJrQixVQUFVOzs7NEJBVXhCLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLO3VCQUVMLEtBQUs7MkJBVUwsTUFBTTs2QkFDTixTQUFTLFNBQUMsWUFBWTs7SUEyQzNCLCtCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0FwRVksd0JBQXdCOzs7SUFDakMsNkNBQW1DOztJQUNuQyw0Q0FBOEI7O0lBQzlCLHVDQUFtQjs7SUFDbkIsdUNBQW1COztJQUNuQiw4Q0FBaUM7O0lBQ2pDLDhDQUFvQzs7SUFDcEMsaURBQXdDOztJQUN4QywrQ0FBa0M7O0lBQ2xDLGdEQUErQjs7SUFDL0IsK0NBQXFDOztJQUNyQywrQ0FBOEI7O0lBQzlCLGdEQUFzQzs7SUFZdEMsNENBQXdDOztJQUN4Qyw4Q0FBeUQ7O0lBQ3pELDJDQUFnQjs7SUFDaEIsMENBQVk7O0lBQ1osaURBQW1COzs7OztJQUNuQiw2Q0FBd0I7O0lBR3BCLHNDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lcGlja2VyQ29tcG9uZW50fSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuZGVjbGFyZSBsZXQgJDphbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZS1waWNrZXItbW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLXBpY2tlci1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBhcnJvd2tleXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGhvdXJTdGVwOiBudW1iZXIgPSAxO1xuICAgIEBJbnB1dCgpIG1heDogRGF0ZTtcbiAgICBASW5wdXQoKSBtaW46IERhdGU7XG4gICAgQElucHV0KCkgbWludXRlU3RlcDogbnVtYmVyID0gMTU7XG4gICAgQElucHV0KCkgbW91c2V3aGVlbDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcmVhZG9ubHlJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNlY29uZHNTdGVwOiBudW1iZXIgPSAxMDtcbiAgICBASW5wdXQoKSBzaG93TWVyaWRpYW46IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hvd01pbnV0ZXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dTZWNvbmRzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dTcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZXQgdGltZShkYXRlOiBEYXRlIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl90aW1lRGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMudGltZVN0ciA9IFRpbWVQaWNrZXJNb2RhbENvbXBvbmVudC5fZm9ybWF0RGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMudGltZVN0cik7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lRGF0ZTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQFZpZXdDaGlsZCgndGltZVBpY2tlcicpIHRpbWVQaWNrZXI6IFRpbWVwaWNrZXJDb21wb25lbnQ7XG4gICAgdGltZVN0cjogc3RyaW5nO1xuICAgICRtb2RhbDogYW55O1xuICAgICRtb2RhbENvbnRlbnQ6IGFueTtcbiAgICBwcml2YXRlIF90aW1lRGF0ZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMuZWwubmF0aXZlRWxlbWVudCkuZGV0YWNoKCkuYWRkQ2xhc3MoJ21vZGFsJyk7XG4gICAgICAgIHRoaXMuJG1vZGFsQ29udGVudCA9IHRoaXMuJG1vZGFsLmZpbmQoJy50aW1lLXBpY2tlci1tb2RhbCcpO1xuXG4gICAgICAgIC8vIFRvdWNoZWQgY2xvc2VcbiAgICAgICAgdGhpcy4kbW9kYWwub24oJ21vdXNlZG93biBjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLiRtb2RhbFswXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLiRtb2RhbC5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBvcGVuKGNzczogYW55KSB7XG4gICAgICAgIHRoaXMuJG1vZGFsQ29udGVudC5jc3MoY3NzKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLiRtb2RhbFswXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2Zvcm1hdERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICBpZiAoIWRhdGUgfHwgIWRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpICsgJzonICsgKCcwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=