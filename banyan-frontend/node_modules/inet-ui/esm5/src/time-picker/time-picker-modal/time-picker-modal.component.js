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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci1tb2RhbC90aW1lLXBpY2tlci1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2xEO0lBb0NJLGtDQUNXLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBL0JoQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRXpCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBWTVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBVXhDLENBQUM7SUFwQkQsc0JBQWEsMENBQUk7Ozs7UUFNakI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7Ozs7UUFSRCxVQUFrQixJQUFpQjtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7Ozs7SUFrQkQsMkNBQVE7OztJQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFNUQsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQjs7OztRQUFFLFVBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQyxFQUFDLENBQUE7SUFDTixDQUFDOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsd0NBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELHVDQUFJOzs7O0lBQUosVUFBSyxHQUFRO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUVjLG9DQUFXOzs7OztJQUExQixVQUEyQixJQUFVO1FBQ2pDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDMUIsT0FBTyxFQUFFLENBQUM7U0FDYjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEY7SUFDTCxDQUFDOztnQkF4RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLGttQkFBaUQ7O2lCQUVwRDs7OztnQkFSa0IsVUFBVTs7OzRCQVV4QixLQUFLOzJCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzt1QkFFTCxLQUFLOzJCQVVMLE1BQU07NkJBQ04sU0FBUyxTQUFDLFlBQVk7O0lBMkMzQiwrQkFBQztDQUFBLEFBekVELElBeUVDO1NBcEVZLHdCQUF3Qjs7O0lBQ2pDLDZDQUFtQzs7SUFDbkMsNENBQThCOztJQUM5Qix1Q0FBbUI7O0lBQ25CLHVDQUFtQjs7SUFDbkIsOENBQWlDOztJQUNqQyw4Q0FBb0M7O0lBQ3BDLGlEQUF3Qzs7SUFDeEMsK0NBQWtDOztJQUNsQyxnREFBK0I7O0lBQy9CLCtDQUFxQzs7SUFDckMsK0NBQThCOztJQUM5QixnREFBc0M7O0lBWXRDLDRDQUF3Qzs7SUFDeEMsOENBQXlEOztJQUN6RCwyQ0FBZ0I7O0lBQ2hCLDBDQUFZOztJQUNaLGlEQUFtQjs7Ozs7SUFDbkIsNkNBQXdCOztJQUdwQixzQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGltZXBpY2tlckNvbXBvbmVudH0gZnJvbSBcIm5neC1ib290c3RyYXBcIjtcbmRlY2xhcmUgbGV0ICQ6YW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RpbWUtcGlja2VyLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lUGlja2VyTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgYXJyb3drZXlzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBob3VyU3RlcDogbnVtYmVyID0gMTtcbiAgICBASW5wdXQoKSBtYXg6IERhdGU7XG4gICAgQElucHV0KCkgbWluOiBEYXRlO1xuICAgIEBJbnB1dCgpIG1pbnV0ZVN0ZXA6IG51bWJlciA9IDE1O1xuICAgIEBJbnB1dCgpIG1vdXNld2hlZWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzZWNvbmRzU3RlcDogbnVtYmVyID0gMTA7XG4gICAgQElucHV0KCkgc2hvd01lcmlkaWFuOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dNaW51dGVzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93U2Vjb25kczogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93U3Bpbm5lcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHRpbWUoZGF0ZTogRGF0ZSB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fdGltZURhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLnRpbWVTdHIgPSBUaW1lUGlja2VyTW9kYWxDb21wb25lbnQuX2Zvcm1hdERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLnRpbWVTdHIpO1xuICAgIH1cblxuICAgIGdldCB0aW1lKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZURhdGU7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBWaWV3Q2hpbGQoJ3RpbWVQaWNrZXInKSB0aW1lUGlja2VyOiBUaW1lcGlja2VyQ29tcG9uZW50O1xuICAgIHRpbWVTdHI6IHN0cmluZztcbiAgICAkbW9kYWw6IGFueTtcbiAgICAkbW9kYWxDb250ZW50OiBhbnk7XG4gICAgcHJpdmF0ZSBfdGltZURhdGU6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLmRldGFjaCgpLmFkZENsYXNzKCdtb2RhbCcpO1xuICAgICAgICB0aGlzLiRtb2RhbENvbnRlbnQgPSB0aGlzLiRtb2RhbC5maW5kKCcudGltZS1waWNrZXItbW9kYWwnKTtcblxuICAgICAgICAvLyBUb3VjaGVkIGNsb3NlXG4gICAgICAgIHRoaXMuJG1vZGFsLm9uKCdtb3VzZWRvd24gY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy4kbW9kYWxbMF0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRtb2RhbC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgb3Blbihjc3M6IGFueSkge1xuICAgICAgICB0aGlzLiRtb2RhbENvbnRlbnQuY3NzKGNzcyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kbW9kYWxbMF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIF9mb3JtYXREYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgaWYgKCFkYXRlIHx8ICFkYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICgnMCcgKyBkYXRlLmdldEhvdXJzKCkpLnNsaWNlKC0yKSArICc6JyArICgnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19