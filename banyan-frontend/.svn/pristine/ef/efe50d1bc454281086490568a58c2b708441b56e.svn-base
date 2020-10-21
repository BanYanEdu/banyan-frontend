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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9yZW1vdGUtbW9kdWxlL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLW1vZGFsL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRbEQsTUFBTSxPQUFPLHdCQUF3Qjs7OztJQStCakMsWUFDVyxFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQS9CaEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUV6QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQVk1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVV4QyxDQUFDOzs7OztJQXBCRCxJQUFhLElBQUksQ0FBQyxJQUFpQjtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7O0lBY0QsUUFBUTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU1RCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQyxFQUFDLENBQUE7SUFDTixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLEdBQVE7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7O0lBRU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFVO1FBQ2pDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDMUIsT0FBTyxFQUFFLENBQUM7U0FDYjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEY7SUFDTCxDQUFDOzs7WUF4RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLGttQkFBaUQ7O2FBRXBEOzs7O1lBUmtCLFVBQVU7Ozt3QkFVeEIsS0FBSzt1QkFDTCxLQUFLO2tCQUNMLEtBQUs7a0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7bUJBRUwsS0FBSzt1QkFVTCxNQUFNO3lCQUNOLFNBQVMsU0FBQyxZQUFZOzs7O0lBeEJ2Qiw2Q0FBbUM7O0lBQ25DLDRDQUE4Qjs7SUFDOUIsdUNBQW1COztJQUNuQix1Q0FBbUI7O0lBQ25CLDhDQUFpQzs7SUFDakMsOENBQW9DOztJQUNwQyxpREFBd0M7O0lBQ3hDLCtDQUFrQzs7SUFDbEMsZ0RBQStCOztJQUMvQiwrQ0FBcUM7O0lBQ3JDLCtDQUE4Qjs7SUFDOUIsZ0RBQXNDOztJQVl0Qyw0Q0FBd0M7O0lBQ3hDLDhDQUF5RDs7SUFDekQsMkNBQWdCOztJQUNoQiwwQ0FBWTs7SUFDWixpREFBbUI7Ozs7O0lBQ25CLDZDQUF3Qjs7SUFHcEIsc0NBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RpbWVwaWNrZXJDb21wb25lbnR9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5kZWNsYXJlIGxldCAkOmFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aW1lLXBpY2tlci1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci1tb2RhbC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlck1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGFycm93a2V5czogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgaG91clN0ZXA6IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgbWF4OiBEYXRlO1xuICAgIEBJbnB1dCgpIG1pbjogRGF0ZTtcbiAgICBASW5wdXQoKSBtaW51dGVTdGVwOiBudW1iZXIgPSAxNTtcbiAgICBASW5wdXQoKSBtb3VzZXdoZWVsOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSByZWFkb25seUlucHV0OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2Vjb25kc1N0ZXA6IG51bWJlciA9IDEwO1xuICAgIEBJbnB1dCgpIHNob3dNZXJpZGlhbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93TWludXRlczogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1NlY29uZHM6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hvd1NwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB0aW1lKGRhdGU6IERhdGUgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3RpbWVEYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy50aW1lU3RyID0gVGltZVBpY2tlck1vZGFsQ29tcG9uZW50Ll9mb3JtYXREYXRlKGRhdGUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy50aW1lU3RyKTtcbiAgICB9XG5cbiAgICBnZXQgdGltZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVEYXRlO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAVmlld0NoaWxkKCd0aW1lUGlja2VyJykgdGltZVBpY2tlcjogVGltZXBpY2tlckNvbXBvbmVudDtcbiAgICB0aW1lU3RyOiBzdHJpbmc7XG4gICAgJG1vZGFsOiBhbnk7XG4gICAgJG1vZGFsQ29udGVudDogYW55O1xuICAgIHByaXZhdGUgX3RpbWVEYXRlOiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy5lbC5uYXRpdmVFbGVtZW50KS5kZXRhY2goKS5hZGRDbGFzcygnbW9kYWwnKTtcbiAgICAgICAgdGhpcy4kbW9kYWxDb250ZW50ID0gdGhpcy4kbW9kYWwuZmluZCgnLnRpbWUtcGlja2VyLW1vZGFsJyk7XG5cbiAgICAgICAgLy8gVG91Y2hlZCBjbG9zZVxuICAgICAgICB0aGlzLiRtb2RhbC5vbignbW91c2Vkb3duIGNsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5pc1NhbWVOb2RlKHRoaXMuJG1vZGFsWzBdKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsLmRldGFjaCgpO1xuICAgIH1cblxuICAgIG9wZW4oY3NzOiBhbnkpIHtcbiAgICAgICAgdGhpcy4kbW9kYWxDb250ZW50LmNzcyhjc3MpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuJG1vZGFsWzBdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfZm9ybWF0RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIGlmICghZGF0ZSB8fCAhZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoJzAnICsgZGF0ZS5nZXRIb3VycygpKS5zbGljZSgtMikgKyAnOicgKyAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==