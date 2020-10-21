/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
var CalendarViewerComponent = /** @class */ (function () {
    function CalendarViewerComponent() {
        this.dateFormat = 'MMMM/YYYY';
        this.locale = 'vi';
        this.firstDay = 1;
        this.limitEvent = 3;
        this.view = CalendarViewerMode.MONTH;
        this.onChange = new EventEmitter();
        this.onActive = new EventEmitter();
        this.dates = [];
        this.weekDates = [];
    }
    Object.defineProperty(CalendarViewerComponent.prototype, "date", {
        get: /**
         * @return {?}
         */
        function () {
            return new Date(this._date);
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var _date;
            if (!date || !date.getTime()) {
                _date = new Date();
            }
            else {
                _date = new Date(date);
            }
            _date.setHours(0, 0, 0, 0);
            if (this.view === CalendarViewerMode.MONTH) {
                // Set date start month
                _date.setDate(1);
            }
            // current date view
            if (this._date && _date.getTime() === this._date.getTime()) {
                return;
            }
            this._date = _date;
            this._render();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CalendarViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this._date) {
            this.date = new Date();
        }
    };
    /**
     * @param {?} events
     * @param {?} date
     * @return {?}
     */
    CalendarViewerComponent.prototype.setEvents = /**
     * @param {?} events
     * @param {?} date
     * @return {?}
     */
    function (events, date) {
        /** @type {?} */
        var dateViewer = this._getDateViewer(date);
        if (dateViewer) {
            dateViewer.events = events;
        }
    };
    /**
     * @return {?}
     */
    CalendarViewerComponent.prototype.clearEvents = /**
     * @return {?}
     */
    function () {
        this.dates.forEach((/**
         * @param {?} dateViewer
         * @return {?}
         */
        function (dateViewer) { return dateViewer.events = null; }));
    };
    /**
     * @return {?}
     */
    CalendarViewerComponent.prototype.toDay = /**
     * @return {?}
     */
    function () {
        this.date = new Date();
    };
    /**
     * @return {?}
     */
    CalendarViewerComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
        if (this.view === CalendarViewerMode.MONTH) {
            this._prevMonth();
        }
        else {
            this._prevWeek();
        }
        this._render();
    };
    /**
     * @return {?}
     */
    CalendarViewerComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        if (this.view === CalendarViewerMode.MONTH) {
            this._nextMonth();
        }
        else {
            this._nextWeek();
        }
        this._render();
    };
    /**
     * @param {?} dateViewer
     * @return {?}
     */
    CalendarViewerComponent.prototype.activeDate = /**
     * @param {?} dateViewer
     * @return {?}
     */
    function (dateViewer) {
        this.dateActive = dateViewer;
        // Move to target month
        if (dateViewer.outOfRange) {
            this.date = dateViewer.date;
        }
        this.onActive.emit(dateViewer);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarViewerComponent.prototype.focusDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var dateViewer = this._getDateViewer(date);
        if (dateViewer) {
            this.activeDate(dateViewer);
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._nextMonth = /**
     * @private
     * @return {?}
     */
    function () {
        this._date.setMonth(this._date.getMonth() + 1);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._prevMonth = /**
     * @private
     * @return {?}
     */
    function () {
        this._date.setMonth(this._date.getMonth() - 1);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._nextWeek = /**
     * @private
     * @return {?}
     */
    function () {
        this._date.setDate(this._date.getDate() + 7);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._prevWeek = /**
     * @private
     * @return {?}
     */
    function () {
        this._date.setDate(this._date.getDate() - 7);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._render = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.view === CalendarViewerMode.MONTH) {
            this._renderMonth();
        }
        else {
            this._renderWeek();
        }
        this.onChange.emit(this.date);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._renderMonth = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = this._getDateStartWeek();
        this.dates = [];
        this.weekDates = [];
        while (this.weekDates.length <= 6) {
            this.weekDates.push(this._createWeekDate(date));
            // detect date is end month
            if (date.getMonth() !== this._date.getMonth()) {
                break;
            }
        }
        this._renderTitle();
        this._renderWeekTitle(this.weekDates[0]);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._renderWeek = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = this._getDateStartWeek();
        this.dates = [];
        this.weekDates = [this._createWeekDate(date)];
        this.weekDates[0].forEach((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return date.outOfRange = false; }));
        this._renderTitle();
        this._renderWeekTitle(this.weekDates[0]);
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    CalendarViewerComponent.prototype._createWeekDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var weekDates = [];
        for (var i = 0; i < 7; i++) {
            /** @type {?} */
            var dateViewer = {
                date: new Date(date),
                time: date.getTime(),
                outOfRange: this._date.getMonth() !== date.getMonth(),
                today: this._isToday(date)
            };
            weekDates.push(dateViewer);
            this.dates.push(dateViewer);
            date.setDate(date.getDate() + 1);
        }
        return weekDates;
    };
    /**
     * @private
     * @param {?} weekDates
     * @return {?}
     */
    CalendarViewerComponent.prototype._renderWeekTitle = /**
     * @private
     * @param {?} weekDates
     * @return {?}
     */
    function (weekDates) {
        var _this = this;
        this.weekTitles = [];
        weekDates.forEach((/**
         * @param {?} viewerDate
         * @return {?}
         */
        function (viewerDate) {
            _this.weekTitles.push(moment(viewerDate.date).locale(_this.locale).format('dd'));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._renderTitle = /**
     * @private
     * @return {?}
     */
    function () {
        this.dateTitle = moment(this._date).locale(this.locale).format(this.dateFormat);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarViewerComponent.prototype._getDateStartWeek = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = new Date(this._date);
        /** @type {?} */
        var startWeekFromNow = date.getDay() - this.firstDay;
        if (date.getDay() < this.firstDay) {
            startWeekFromNow += 7;
        }
        // Set date start week
        date.setDate(date.getDate() - startWeekFromNow);
        return date;
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    CalendarViewerComponent.prototype._isToday = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var now = new Date();
        return now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear();
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    CalendarViewerComponent.prototype._getDateViewer = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var _date = new Date(date);
        _date.setHours(0, 0, 0, 0);
        for (var i = 0; i < this.dates.length; i++) {
            if (this.dates[i].time === _date.getTime()) {
                return this.dates[i];
            }
        }
    };
    CalendarViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'calendar-viewer',
                    template: "<div class=\"calendar-viewer\">\n\n  <div role=\"row\" class=\"calendar-viewer__head\">\n    <i (click)=\"next()\" class=\"calendar-viewer__button fa fa-chevron-right\"></i>\n    <i (click)=\"toDay()\" class=\"calendar-viewer__button fa fa-circle\" style=\"font-size:10px\"></i>\n    <i (click)=\"prev()\" class=\"calendar-viewer__button fa fa-chevron-left\"></i>\n    <div class=\"calendar-viewer__title\">{{dateTitle}}</div>\n  </div>\n\n  <div role=\"grid\" class=\"calendar-viewer__body\">\n    <div role=\"row\" class=\"calendar-viewer__row\">\n      <div class=\"calendar-viewer__th\" *ngFor=\"let title of weekTitles\">{{title}}</div>\n    </div>\n    <div *ngFor=\"let week of weekDates\" role=\"row\" class=\"calendar-viewer__row\">\n      <div *ngFor=\"let dateViewer of week\"\n           [ngClass]=\"{'light-cell': dateViewer.outOfRange, 'today-cell': dateViewer.today}\" class=\"calendar-viewer__td\">\n        <div (click)=\"activeDate(dateViewer)\" class=\"calendar-viewer__date\" [ngClass]=\"{'active': dateViewer.time === dateActive?.time}\">\n          <span>{{dateViewer.date.getDate()}}</span>\n          <div *ngIf=\"dateViewer.events\" class=\"calendar-viewer__events\">\n            <div *ngFor=\"let event of dateViewer.events\" [ngStyle]=\"event.style\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n",
                    styles: [".calendar-viewer{padding:10px 0}.calendar-viewer__head{font-size:14px;padding:0 5px 0 15px;height:40px;color:#757575}.calendar-viewer__title{overflow:hidden;line-height:40px;font-weight:700;text-transform:uppercase}.calendar-viewer__button{float:right;margin:2px 0;text-align:center}.calendar-viewer__body{display:table;table-layout:fixed;width:100%;text-align:center;color:#212121;font-size:14px}.calendar-viewer__row{display:table-row}.calendar-viewer__th{display:table-cell;vertical-align:middle;height:24px;font-size:12px;color:#757575;font-weight:700}.calendar-viewer__td{display:table-cell;vertical-align:middle;height:44px}.calendar-viewer__td.light-cell{opacity:.2}.calendar-viewer__td.today-cell .calendar-viewer__button,.calendar-viewer__td.today-cell .calendar-viewer__date{color:#dc3545}.calendar-viewer__button,.calendar-viewer__date{height:36px;width:36px;line-height:36px;border-radius:50%;cursor:pointer;display:inline-block;position:relative}.calendar-viewer__button:hover,.calendar-viewer__date:hover{background-color:rgba(0,0,0,.1)}.active.calendar-viewer__button,.calendar-viewer__date.active{background-color:#438eb9!important;color:#fff!important}.active.calendar-viewer__button .calendar-viewer__events div,.calendar-viewer__date.active .calendar-viewer__events div{background-color:#fff!important}.calendar-viewer__events{position:absolute;left:5px;right:5px;bottom:4px;text-align:center;overflow:hidden;line-height:0;height:6px}.calendar-viewer__events div{width:4px;height:4px;border-radius:50%;margin:0 1px;background-color:#438eb9;display:inline-block}"]
                }] }
    ];
    /** @nocollapse */
    CalendarViewerComponent.ctorParameters = function () { return []; };
    CalendarViewerComponent.propDecorators = {
        dateFormat: [{ type: Input }],
        locale: [{ type: Input }],
        firstDay: [{ type: Input }],
        limitEvent: [{ type: Input }],
        view: [{ type: Input }],
        date: [{ type: Input }],
        onChange: [{ type: Output }],
        onActive: [{ type: Output }]
    };
    return CalendarViewerComponent;
}());
export { CalendarViewerComponent };
if (false) {
    /** @type {?} */
    CalendarViewerComponent.prototype.dateFormat;
    /** @type {?} */
    CalendarViewerComponent.prototype.locale;
    /** @type {?} */
    CalendarViewerComponent.prototype.firstDay;
    /** @type {?} */
    CalendarViewerComponent.prototype.limitEvent;
    /** @type {?} */
    CalendarViewerComponent.prototype.view;
    /** @type {?} */
    CalendarViewerComponent.prototype.onChange;
    /** @type {?} */
    CalendarViewerComponent.prototype.onActive;
    /** @type {?} */
    CalendarViewerComponent.prototype.dateTitle;
    /** @type {?} */
    CalendarViewerComponent.prototype.dates;
    /** @type {?} */
    CalendarViewerComponent.prototype.weekDates;
    /** @type {?} */
    CalendarViewerComponent.prototype.weekTitles;
    /** @type {?} */
    CalendarViewerComponent.prototype.dateActive;
    /**
     * @type {?}
     * @private
     */
    CalendarViewerComponent.prototype._date;
}
/**
 * @record
 */
export function CalendarViewerDate() { }
if (false) {
    /** @type {?} */
    CalendarViewerDate.prototype.date;
    /** @type {?} */
    CalendarViewerDate.prototype.time;
    /** @type {?} */
    CalendarViewerDate.prototype.outOfRange;
    /** @type {?} */
    CalendarViewerDate.prototype.today;
    /** @type {?|undefined} */
    CalendarViewerDate.prototype.events;
}
/** @enum {string} */
var CalendarViewerMode = {
    MONTH: 'month',
    WEEK: 'week',
};
export { CalendarViewerMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvY2FsZW5kYXItdmlld2VyL2NhbGVuZGFyLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBQzVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBMERJO1FBbkRTLGVBQVUsR0FBVyxXQUFXLENBQUM7UUFFakMsV0FBTSxHQUFXLElBQUksQ0FBQztRQUV0QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsU0FBSSxHQUF1QixrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUEyQm5ELGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3BDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQVE1RCxVQUFLLEdBQXlCLEVBQUUsQ0FBQztRQUNqQyxjQUFTLEdBQTJCLEVBQUUsQ0FBQztJQVF2QyxDQUFDO0lBM0NELHNCQUFhLHlDQUFJOzs7O1FBNEJqQjtZQUNJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7Ozs7O1FBOUJELFVBQWtCLElBQVU7O2dCQUNwQixLQUFLO1lBQ1QsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDMUIsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7YUFDdEI7aUJBQU07Z0JBQ0gsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FB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MUMseUNBQStCOztJQUUvQiwyQ0FBOEI7O0lBRTlCLDZDQUFnQzs7SUFFaEMsdUNBQTZEOztJQTJCN0QsMkNBQThDOztJQUM5QywyQ0FBNEQ7O0lBTTVELDRDQUFrQjs7SUFFbEIsd0NBQWlDOztJQUNqQyw0Q0FBdUM7O0lBQ3ZDLDZDQUFxQjs7SUFDckIsNkNBQStCOzs7OztJQUUvQix3Q0FBb0I7Ozs7O0FBOEt4Qix3Q0FNQzs7O0lBTEcsa0NBQVc7O0lBQ1gsa0NBQWE7O0lBQ2Isd0NBQW9COztJQUNwQixtQ0FBZTs7SUFDZixvQ0FBZTs7OztJQUlmLE9BQVEsT0FBTztJQUNmLE1BQU8sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NhbGVuZGFyLXZpZXdlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLXZpZXdlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItdmlld2VyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0OiBzdHJpbmcgPSAnTU1NTS9ZWVlZJztcblxuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nID0gJ3ZpJztcblxuICAgIEBJbnB1dCgpIGZpcnN0RGF5OiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgbGltaXRFdmVudDogbnVtYmVyID0gMztcblxuICAgIEBJbnB1dCgpIHZpZXc6IENhbGVuZGFyVmlld2VyTW9kZSA9IENhbGVuZGFyVmlld2VyTW9kZS5NT05USDtcblxuICAgIEBJbnB1dCgpIHNldCBkYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgbGV0IF9kYXRlO1xuICAgICAgICBpZiAoIWRhdGUgfHwgIWRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICBfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3ZXJNb2RlLk1PTlRIKSB7XG4gICAgICAgICAgICAvLyBTZXQgZGF0ZSBzdGFydCBtb250aFxuICAgICAgICAgICAgX2RhdGUuc2V0RGF0ZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGN1cnJlbnQgZGF0ZSB2aWV3XG4gICAgICAgIGlmICh0aGlzLl9kYXRlICYmIF9kYXRlLmdldFRpbWUoKSA9PT0gdGhpcy5fZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RhdGUgPSBfZGF0ZTtcblxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgQE91dHB1dCgpIG9uQWN0aXZlID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhclZpZXdlckRhdGU+KCk7XG5cbiAgICBnZXQgZGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuX2RhdGUpO1xuICAgIH1cblxuICAgIGRhdGVUaXRsZTogc3RyaW5nO1xuXG4gICAgZGF0ZXM6IENhbGVuZGFyVmlld2VyRGF0ZVtdID0gW107XG4gICAgd2Vla0RhdGVzOiBDYWxlbmRhclZpZXdlckRhdGVbXVtdID0gW107XG4gICAgd2Vla1RpdGxlczogc3RyaW5nW107XG4gICAgZGF0ZUFjdGl2ZTogQ2FsZW5kYXJWaWV3ZXJEYXRlO1xuXG4gICAgcHJpdmF0ZSBfZGF0ZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEV2ZW50cyhldmVudHMsIGRhdGU6IERhdGUpIHtcbiAgICAgICAgbGV0IGRhdGVWaWV3ZXIgPSB0aGlzLl9nZXREYXRlVmlld2VyKGRhdGUpO1xuICAgICAgICBpZiAoZGF0ZVZpZXdlcikge1xuICAgICAgICAgICAgZGF0ZVZpZXdlci5ldmVudHMgPSBldmVudHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5kYXRlcy5mb3JFYWNoKGRhdGVWaWV3ZXIgPT4gZGF0ZVZpZXdlci5ldmVudHMgPSBudWxsKTtcbiAgICB9XG5cbiAgICB0b0RheSgpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBwcmV2KCkge1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXdlck1vZGUuTU9OVEgpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZNb250aCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJldldlZWsoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXdlck1vZGUuTU9OVEgpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRNb250aCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dFdlZWsoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBhY3RpdmVEYXRlKGRhdGVWaWV3ZXI6IENhbGVuZGFyVmlld2VyRGF0ZSkge1xuICAgICAgICB0aGlzLmRhdGVBY3RpdmUgPSBkYXRlVmlld2VyO1xuXG4gICAgICAgIC8vIE1vdmUgdG8gdGFyZ2V0IG1vbnRoXG4gICAgICAgIGlmIChkYXRlVmlld2VyLm91dE9mUmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVWaWV3ZXIuZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25BY3RpdmUuZW1pdChkYXRlVmlld2VyKTtcbiAgICB9XG5cbiAgICBmb2N1c0RhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgZGF0ZVZpZXdlciA9IHRoaXMuX2dldERhdGVWaWV3ZXIoZGF0ZSk7XG4gICAgICAgIGlmIChkYXRlVmlld2VyKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUoZGF0ZVZpZXdlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9uZXh0TW9udGgoKSB7XG4gICAgICAgIHRoaXMuX2RhdGUuc2V0TW9udGgodGhpcy5fZGF0ZS5nZXRNb250aCgpICsgMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJldk1vbnRoKCkge1xuICAgICAgICB0aGlzLl9kYXRlLnNldE1vbnRoKHRoaXMuX2RhdGUuZ2V0TW9udGgoKSAtIDEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX25leHRXZWVrKCkge1xuICAgICAgICB0aGlzLl9kYXRlLnNldERhdGUodGhpcy5fZGF0ZS5nZXREYXRlKCkgKyA3KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmV2V2VlaygpIHtcbiAgICAgICAgdGhpcy5fZGF0ZS5zZXREYXRlKHRoaXMuX2RhdGUuZ2V0RGF0ZSgpIC0gNyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXdlck1vZGUuTU9OVEgpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck1vbnRoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJXZWVrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy5kYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZW5kZXJNb250aCgpIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLl9nZXREYXRlU3RhcnRXZWVrKCk7XG5cbiAgICAgICAgdGhpcy5kYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLndlZWtEYXRlcyA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy53ZWVrRGF0ZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICAgIHRoaXMud2Vla0RhdGVzLnB1c2godGhpcy5fY3JlYXRlV2Vla0RhdGUoZGF0ZSkpO1xuICAgICAgICAgICAgLy8gZGV0ZWN0IGRhdGUgaXMgZW5kIG1vbnRoXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXRNb250aCgpICE9PSB0aGlzLl9kYXRlLmdldE1vbnRoKCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlclRpdGxlKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcldlZWtUaXRsZSh0aGlzLndlZWtEYXRlc1swXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVuZGVyV2VlaygpIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLl9nZXREYXRlU3RhcnRXZWVrKCk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy53ZWVrRGF0ZXMgPSBbdGhpcy5fY3JlYXRlV2Vla0RhdGUoZGF0ZSldO1xuICAgICAgICB0aGlzLndlZWtEYXRlc1swXS5mb3JFYWNoKGRhdGUgPT4gZGF0ZS5vdXRPZlJhbmdlID0gZmFsc2UpO1xuICAgICAgICB0aGlzLl9yZW5kZXJUaXRsZSgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJXZWVrVGl0bGUodGhpcy53ZWVrRGF0ZXNbMF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVdlZWtEYXRlKGRhdGU6IERhdGUpOiBDYWxlbmRhclZpZXdlckRhdGVbXSB7XG4gICAgICAgIHZhciB3ZWVrRGF0ZXM6IENhbGVuZGFyVmlld2VyRGF0ZVtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkYXRlVmlld2VyID0ge1xuICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIHRpbWU6IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIG91dE9mUmFuZ2U6IHRoaXMuX2RhdGUuZ2V0TW9udGgoKSAhPT0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIHRvZGF5OiB0aGlzLl9pc1RvZGF5KGRhdGUpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2Vla0RhdGVzLnB1c2goZGF0ZVZpZXdlcik7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnB1c2goZGF0ZVZpZXdlcik7XG4gICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3ZWVrRGF0ZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVuZGVyV2Vla1RpdGxlKHdlZWtEYXRlczogQ2FsZW5kYXJWaWV3ZXJEYXRlW10pIHtcbiAgICAgICAgdGhpcy53ZWVrVGl0bGVzID0gW107XG4gICAgICAgIHdlZWtEYXRlcy5mb3JFYWNoKCh2aWV3ZXJEYXRlOiBDYWxlbmRhclZpZXdlckRhdGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2Vla1RpdGxlcy5wdXNoKG1vbWVudCh2aWV3ZXJEYXRlLmRhdGUpLmxvY2FsZSh0aGlzLmxvY2FsZSkuZm9ybWF0KCdkZCcpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVuZGVyVGl0bGUoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVRpdGxlID0gbW9tZW50KHRoaXMuX2RhdGUpLmxvY2FsZSh0aGlzLmxvY2FsZSkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RGF0ZVN0YXJ0V2VlaygpOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLl9kYXRlKTtcbiAgICAgICAgbGV0IHN0YXJ0V2Vla0Zyb21Ob3cgPSBkYXRlLmdldERheSgpIC0gdGhpcy5maXJzdERheTtcblxuICAgICAgICBpZiAoZGF0ZS5nZXREYXkoKSA8IHRoaXMuZmlyc3REYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0V2Vla0Zyb21Ob3cgKz0gNztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBkYXRlIHN0YXJ0IHdlZWtcbiAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gc3RhcnRXZWVrRnJvbU5vdyk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNUb2RheShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gbm93LmdldERhdGUoKSA9PT0gZGF0ZS5nZXREYXRlKCkgJiYgbm93LmdldE1vbnRoKCkgPT09IGRhdGUuZ2V0TW9udGgoKSAmJiBub3cuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERhdGVWaWV3ZXIoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgX2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXNbaV0udGltZSA9PT0gX2RhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJWaWV3ZXJEYXRlIHtcbiAgICBkYXRlOiBEYXRlO1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICBvdXRPZlJhbmdlOiBib29sZWFuO1xuICAgIHRvZGF5OiBib29sZWFuO1xuICAgIGV2ZW50cz86IGFueVtdO1xufVxuXG5leHBvcnQgZW51bSBDYWxlbmRhclZpZXdlck1vZGUge1xuICAgIE1PTlRIID0gJ21vbnRoJyxcbiAgICBXRUVLID0gJ3dlZWsnXG59XG4iXX0=