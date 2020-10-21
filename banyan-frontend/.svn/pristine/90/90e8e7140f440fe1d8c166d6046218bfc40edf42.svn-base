/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { CalendarService } from "../calendar.service";
import { DateUtils } from "../utils/common/DateUtils";
var CalendarTodayComponent = /** @class */ (function () {
    function CalendarTodayComponent(calendarService) {
        var _this = this;
        this.calendarService = calendarService;
        this.onChange = new EventEmitter();
        this.events = [];
        this.colors = [
            // '#438EB9',
            '#007bff',
            '#3CA54A',
            '#FF9800',
            '#EF5B49',
            '#77901B',
            '#7D5392',
            '#808080'
        ];
        this._date = new Date();
        this.calendarService.ready((/**
         * @return {?}
         */
        function () { return _this.loadTodayEvents(); }));
    }
    /**
     * @return {?}
     */
    CalendarTodayComponent.prototype.loadTodayEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._date) {
            return;
        }
        this.calendarService.loadEvents({
            day: DateUtils.dayOfYear(this._date),
            year: this._date.getFullYear()
        }, (/**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            events.forEach((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this._initEventStatus(e); }));
            _this.events = events.slice(0, 3); // Maximum 3 events
        }));
    };
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} targetEl
     * @return {?}
     */
    CalendarTodayComponent.prototype.onViewEvent = /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} targetEl
     * @return {?}
     */
    function (event, jsEvent, targetEl) {
        var _this = this;
        this.calendarService.viewEvent(event, jsEvent, targetEl, (/**
         * @return {?}
         */
        function () {
            _this.loadTodayEvents();
            _this.onChange.emit(true);
        }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    CalendarTodayComponent.prototype._initEventStatus = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var now = new Date();
        event.progressing = event.start < now && event.end > now;
        event.ended = event.end < now;
        event.pending = event.start > now;
        if (event.progressing) {
            event.statusText = 'Đang diễn ra';
            event.statusColor = this.colors[0];
        }
        else if (event.pending) {
            event.statusText = 'Chưa diễn ra';
            event.statusColor = this.colors[5];
        }
        else {
            event.statusText = 'Kết thúc';
            event.statusColor = this.colors[6];
        }
        event.style = {
            'background-color': this.colors[event.mode]
        };
    };
    CalendarTodayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'calendar-widget-today',
                    template: "<div #viewToggle class=\"calendar-body\">\n    <div *ngFor=\"let event of events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"\n         class=\"calendar-event\">\n        <div class=\"calendar-event__state\" [ngStyle]=\"event['style']\"></div>\n        <div class=\"calendar-event__content\">\n            <div class=\"calendar-event__title\">\n                {{event.subject}}\n                <div class=\"calendar-event__progress\" [style.color]=\"event['statusColor']\">{{event['statusText']}}</div>\n            </div>\n            <div class=\"calendar-event__text\">\n                <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                {{event['hourStr']}}\n            </div>\n            <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                {{event.location}}\n            </div>\n        </div>\n    </div>\n</div>\n",
                    styles: [".calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:80%;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:90%;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
                }] }
    ];
    /** @nocollapse */
    CalendarTodayComponent.ctorParameters = function () { return [
        { type: CalendarService }
    ]; };
    CalendarTodayComponent.propDecorators = {
        onChange: [{ type: Output }]
    };
    return CalendarTodayComponent;
}());
export { CalendarTodayComponent };
if (false) {
    /** @type {?} */
    CalendarTodayComponent.prototype.onChange;
    /** @type {?} */
    CalendarTodayComponent.prototype.events;
    /** @type {?} */
    CalendarTodayComponent.prototype.colors;
    /**
     * @type {?}
     * @private
     */
    CalendarTodayComponent.prototype._date;
    /**
     * @type {?}
     * @private
     */
    CalendarTodayComponent.prototype.calendarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9kYXkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9jYWxlbmRhci10b2RheS9jYWxlbmRhci10b2RheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXBEO0lBcUJJLGdDQUFvQixlQUFnQztRQUFwRCxpQkFFQztRQUZtQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFmMUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDN0MsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQUc7WUFDTCxhQUFhO1lBQ2IsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztTQUNaLENBQUM7UUFFTSxVQUFLLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUc3QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxFQUFFLEVBQXRCLENBQXNCLEVBQUMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBRUQsZ0RBQWU7OztJQUFmO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQzVCLEdBQUcsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1NBQ2pDOzs7O1FBQUUsVUFBQyxNQUFNO1lBQ04sTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFDekQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRUQsNENBQVc7Ozs7OztJQUFYLFVBQVksS0FBZSxFQUFFLE9BQW1CLEVBQUUsUUFBcUI7UUFBdkUsaUJBS0M7UUFKRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVE7OztRQUFFO1lBQ3JELEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLGlEQUFnQjs7Ozs7SUFBeEIsVUFBeUIsS0FBSzs7WUFDdEIsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFO1FBRXBCLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDekQsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM5QixLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBRWxDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNuQixLQUFLLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztZQUNsQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDdEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7WUFDbEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDSCxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM5QixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFFRCxLQUFLLENBQUMsS0FBSyxHQUFHO1lBQ1Ysa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQzlDLENBQUM7SUFDTixDQUFDOztnQkFsRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLDQ4QkFBOEM7O2lCQUVqRDs7OztnQkFSTyxlQUFlOzs7MkJBVWxCLE1BQU07O0lBNkRYLDZCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0E5RFksc0JBQXNCOzs7SUFDL0IsMENBQTZDOztJQUM3Qyx3Q0FBd0I7O0lBQ3hCLHdDQVNFOzs7OztJQUVGLHVDQUFpQzs7Ozs7SUFFckIsaURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FsZW5kYXJTZXJ2aWNlfSBmcm9tIFwiLi4vY2FsZW5kYXIuc2VydmljZVwiO1xuaW1wb3J0IHtDYWxFdmVudH0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEV2ZW50XCI7XG5pbXBvcnQge0RhdGVVdGlsc30gZnJvbSBcIi4uL3V0aWxzL2NvbW1vbi9EYXRlVXRpbHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjYWxlbmRhci13aWRnZXQtdG9kYXknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci10b2RheS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItdG9kYXkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9kYXlDb21wb25lbnQge1xuICAgIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIGV2ZW50czogQ2FsRXZlbnRbXSA9IFtdO1xuICAgIGNvbG9ycyA9IFtcbiAgICAgICAgLy8gJyM0MzhFQjknLFxuICAgICAgICAnIzAwN2JmZicsXG4gICAgICAgICcjM0NBNTRBJyxcbiAgICAgICAgJyNGRjk4MDAnLFxuICAgICAgICAnI0VGNUI0OScsXG4gICAgICAgICcjNzc5MDFCJyxcbiAgICAgICAgJyM3RDUzOTInLFxuICAgICAgICAnIzgwODA4MCdcbiAgICBdO1xuXG4gICAgcHJpdmF0ZSBfZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyU2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnJlYWR5KCgpID0+IHRoaXMubG9hZFRvZGF5RXZlbnRzKCkpO1xuICAgIH1cblxuICAgIGxvYWRUb2RheUV2ZW50cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UubG9hZEV2ZW50cyh7XG4gICAgICAgICAgICBkYXk6IERhdGVVdGlscy5kYXlPZlllYXIodGhpcy5fZGF0ZSksXG4gICAgICAgICAgICB5ZWFyOiB0aGlzLl9kYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgfSwgKGV2ZW50cykgPT4ge1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goKGUpID0+IHRoaXMuX2luaXRFdmVudFN0YXR1cyhlKSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cy5zbGljZSgwLCAzKTsgLy8gTWF4aW11bSAzIGV2ZW50c1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblZpZXdFdmVudChldmVudDogQ2FsRXZlbnQsIGpzRXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldEVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS52aWV3RXZlbnQoZXZlbnQsIGpzRXZlbnQsIHRhcmdldEVsLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRUb2RheUV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0RXZlbnRTdGF0dXMoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgZXZlbnQucHJvZ3Jlc3NpbmcgPSBldmVudC5zdGFydCA8IG5vdyAmJiBldmVudC5lbmQgPiBub3c7XG4gICAgICAgIGV2ZW50LmVuZGVkID0gZXZlbnQuZW5kIDwgbm93O1xuICAgICAgICBldmVudC5wZW5kaW5nID0gZXZlbnQuc3RhcnQgPiBub3c7XG5cbiAgICAgICAgaWYgKGV2ZW50LnByb2dyZXNzaW5nKSB7XG4gICAgICAgICAgICBldmVudC5zdGF0dXNUZXh0ID0gJ8SQYW5nIGRp4buFbiByYSc7XG4gICAgICAgICAgICBldmVudC5zdGF0dXNDb2xvciA9IHRoaXMuY29sb3JzWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnBlbmRpbmcpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0YXR1c1RleHQgPSAnQ2jGsGEgZGnhu4VuIHJhJztcbiAgICAgICAgICAgIGV2ZW50LnN0YXR1c0NvbG9yID0gdGhpcy5jb2xvcnNbNV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5zdGF0dXNUZXh0ID0gJ0vhur90IHRow7pjJztcbiAgICAgICAgICAgIGV2ZW50LnN0YXR1c0NvbG9yID0gdGhpcy5jb2xvcnNbNl07XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zdHlsZSA9IHtcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5jb2xvcnNbZXZlbnQubW9kZV1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=