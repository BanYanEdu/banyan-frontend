/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { CalendarService } from "../calendar.service";
import { DateUtils } from "../utils/common/DateUtils";
export class CalendarTodayComponent {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
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
        () => this.loadTodayEvents()));
    }
    /**
     * @return {?}
     */
    loadTodayEvents() {
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
        (events) => {
            events.forEach((/**
             * @param {?} e
             * @return {?}
             */
            (e) => this._initEventStatus(e)));
            this.events = events.slice(0, 3); // Maximum 3 events
        }));
    }
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} targetEl
     * @return {?}
     */
    onViewEvent(event, jsEvent, targetEl) {
        this.calendarService.viewEvent(event, jsEvent, targetEl, (/**
         * @return {?}
         */
        () => {
            this.loadTodayEvents();
            this.onChange.emit(true);
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _initEventStatus(event) {
        /** @type {?} */
        let now = new Date();
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
    }
}
CalendarTodayComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-widget-today',
                template: "<div #viewToggle class=\"calendar-body\">\n    <div *ngFor=\"let event of events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"\n         class=\"calendar-event\">\n        <div class=\"calendar-event__state\" [ngStyle]=\"event['style']\"></div>\n        <div class=\"calendar-event__content\">\n            <div class=\"calendar-event__title\">\n                {{event.subject}}\n                <div class=\"calendar-event__progress\" [style.color]=\"event['statusColor']\">{{event['statusText']}}</div>\n            </div>\n            <div class=\"calendar-event__text\">\n                <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                {{event['hourStr']}}\n            </div>\n            <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                {{event.location}}\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: [".calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:80%;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:90%;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
            }] }
];
/** @nocollapse */
CalendarTodayComponent.ctorParameters = () => [
    { type: CalendarService }
];
CalendarTodayComponent.propDecorators = {
    onChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9kYXkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9jYWxlbmRhci10b2RheS9jYWxlbmRhci10b2RheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBT3BELE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFnQi9CLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWYxQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3QyxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBQ3hCLFdBQU0sR0FBRztZQUNMLGFBQWE7WUFDYixTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1NBQ1osQ0FBQztRQUVNLFVBQUssR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRzdCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLENBQUM7SUFDN0QsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQzVCLEdBQUcsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1NBQ2pDOzs7O1FBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFDekQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWUsRUFBRSxPQUFtQixFQUFFLFFBQXFCO1FBQ25FLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUTs7O1FBQUUsR0FBRyxFQUFFO1lBQzFELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLGdCQUFnQixDQUFDLEtBQUs7O1lBQ3RCLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRTtRQUVwQixLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDOUIsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUVsQyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDbkIsS0FBSyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7WUFDbEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0gsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDOUIsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsS0FBSyxDQUFDLEtBQUssR0FBRztZQUNWLGtCQUFrQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUM5QyxDQUFDO0lBQ04sQ0FBQzs7O1lBbEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw0OEJBQThDOzthQUVqRDs7OztZQVJPLGVBQWU7Ozt1QkFVbEIsTUFBTTs7OztJQUFQLDBDQUE2Qzs7SUFDN0Msd0NBQXdCOztJQUN4Qix3Q0FTRTs7Ozs7SUFFRix1Q0FBaUM7Ozs7O0lBRXJCLGlEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSBcIi4uL2NhbGVuZGFyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2FsRXZlbnR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtEYXRlVXRpbHN9IGZyb20gXCIuLi91dGlscy9jb21tb24vRGF0ZVV0aWxzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FsZW5kYXItd2lkZ2V0LXRvZGF5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItdG9kYXkuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLXRvZGF5LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclRvZGF5Q29tcG9uZW50IHtcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBldmVudHM6IENhbEV2ZW50W10gPSBbXTtcbiAgICBjb2xvcnMgPSBbXG4gICAgICAgIC8vICcjNDM4RUI5JyxcbiAgICAgICAgJyMwMDdiZmYnLFxuICAgICAgICAnIzNDQTU0QScsXG4gICAgICAgICcjRkY5ODAwJyxcbiAgICAgICAgJyNFRjVCNDknLFxuICAgICAgICAnIzc3OTAxQicsXG4gICAgICAgICcjN0Q1MzkyJyxcbiAgICAgICAgJyM4MDgwODAnXG4gICAgXTtcblxuICAgIHByaXZhdGUgX2RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5yZWFkeSgoKSA9PiB0aGlzLmxvYWRUb2RheUV2ZW50cygpKTtcbiAgICB9XG5cbiAgICBsb2FkVG9kYXlFdmVudHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmxvYWRFdmVudHMoe1xuICAgICAgICAgICAgZGF5OiBEYXRlVXRpbHMuZGF5T2ZZZWFyKHRoaXMuX2RhdGUpLFxuICAgICAgICAgICAgeWVhcjogdGhpcy5fZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICAgIH0sIChldmVudHMpID0+IHtcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKChlKSA9PiB0aGlzLl9pbml0RXZlbnRTdGF0dXMoZSkpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMgPSBldmVudHMuc2xpY2UoMCwgMyk7IC8vIE1heGltdW0gMyBldmVudHNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25WaWV3RXZlbnQoZXZlbnQ6IENhbEV2ZW50LCBqc0V2ZW50OiBNb3VzZUV2ZW50LCB0YXJnZXRFbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uudmlld0V2ZW50KGV2ZW50LCBqc0V2ZW50LCB0YXJnZXRFbCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkVG9kYXlFdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50U3RhdHVzKGV2ZW50KSB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGV2ZW50LnByb2dyZXNzaW5nID0gZXZlbnQuc3RhcnQgPCBub3cgJiYgZXZlbnQuZW5kID4gbm93O1xuICAgICAgICBldmVudC5lbmRlZCA9IGV2ZW50LmVuZCA8IG5vdztcbiAgICAgICAgZXZlbnQucGVuZGluZyA9IGV2ZW50LnN0YXJ0ID4gbm93O1xuXG4gICAgICAgIGlmIChldmVudC5wcm9ncmVzc2luZykge1xuICAgICAgICAgICAgZXZlbnQuc3RhdHVzVGV4dCA9ICfEkGFuZyBkaeG7hW4gcmEnO1xuICAgICAgICAgICAgZXZlbnQuc3RhdHVzQ29sb3IgPSB0aGlzLmNvbG9yc1swXTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5wZW5kaW5nKSB7XG4gICAgICAgICAgICBldmVudC5zdGF0dXNUZXh0ID0gJ0NoxrBhIGRp4buFbiByYSc7XG4gICAgICAgICAgICBldmVudC5zdGF0dXNDb2xvciA9IHRoaXMuY29sb3JzWzVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuc3RhdHVzVGV4dCA9ICdL4bq/dCB0aMO6Yyc7XG4gICAgICAgICAgICBldmVudC5zdGF0dXNDb2xvciA9IHRoaXMuY29sb3JzWzZdO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3R5bGUgPSB7XG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuY29sb3JzW2V2ZW50Lm1vZGVdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19