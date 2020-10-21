/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { CalendarViewerComponent } from "../calendar-viewer/calendar-viewer.component";
import { xCalendar } from "../utils/xCalendar";
import { CalendarService } from "../calendar.service";
export class CalendarWidgetComponent {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.locale = 'vi';
        this.dateFormat = 'dddd, D/M/YYYY';
        this.colors = [
            '#438EB9',
            '#3CA54A',
            '#FF9800',
            '#EF5B49',
            '#77901B',
            '#7D5392',
            '#808080'
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadEvents();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    changeMonth(date) {
        this._date = date;
        this.calendarViewer.clearEvents();
        this.loadEvents();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    activeDate(e) {
        this.activeDateViewer = e;
        this.activeDateTitle = xCalendar.formatDate(e.date, this.dateFormat);
    }
    /**
     * @return {?}
     */
    loadEvents() {
        if (!this._date) {
            return;
        }
        this.calendarService.loadMonthEvents(this._date, (/**
         * @param {?} events
         * @return {?}
         */
        (events) => {
            events.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return a.day - b.day;
            }));
            this._groupEventByDate(events).forEach((/**
             * @param {?} group
             * @return {?}
             */
            (group) => {
                this.calendarViewer.setEvents(group.events, group.date);
            }));
            // Focus today
            if (!this.activeDateViewer) {
                this.calendarViewer.focusDate(new Date());
            }
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
        () => this.loadEvents()));
    }
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    _groupEventByDate(events) {
        /** @type {?} */
        let groups = [];
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            let group;
            /** @type {?} */
            let date = new Date(event.from);
            date.setHours(0, 0, 0, 0);
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].date.getTime() === date.getTime()) {
                    group = groups[i];
                    break;
                }
            }
            if (!group) {
                group = {
                    events: [],
                    date: date
                };
                groups.push(group);
            }
            this._initEventStatus(event);
            group.events.push(event);
        }));
        // sort event by time
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            group.events.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.startTime - b.startTime));
        }));
        return groups;
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
CalendarWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-widget',
                template: "<calendar-viewer #calendarViewer [locale]=\"locale\" (onChange)=\"changeMonth($event)\" (onActive)=\"activeDate($event)\"></calendar-viewer>\n<div class=\"calendar-container\" *ngIf=\"activeDateViewer?.events?.length\">\n    <div class=\"calendar-event__date\">{{activeDateTitle}}</div>\n    <div #viewToggle class=\"calendar-body\">\n        <div *ngFor=\"let event of activeDateViewer.events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"  class=\"calendar-event\">\n            <div  class=\"calendar-event__state\" [ngStyle]=\"event.style\"></div>\n            <div class=\"calendar-event__content\">\n                <div class=\"calendar-event__title\">\n                    {{event.subject}}\n                    <div class=\"calendar-event__progress\" [style.color]=\"event.statusColor\">{{event.statusText}}</div>\n                </div>\n                <div class=\"calendar-event__text\">\n                    <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                    {{event.hourStr}}\n                </div>\n                <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                    <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                    {{event.location}}\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [".calendar-container{padding-bottom:15px}.calendar-event__date{font-size:12px;color:#757575;font-weight:700;margin:0 15px 5px;padding-top:15px;text-transform:uppercase;border-top:1px solid #ddd}.calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background-color:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{font-size:14px;line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:11px;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:12px;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
            }] }
];
/** @nocollapse */
CalendarWidgetComponent.ctorParameters = () => [
    { type: CalendarService }
];
CalendarWidgetComponent.propDecorators = {
    calendarViewer: [{ type: ViewChild, args: ['calendarViewer',] }],
    viewToggle: [{ type: ViewChild, args: ['viewToggle',] }],
    locale: [{ type: Input }],
    dateFormat: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CalendarWidgetComponent.prototype.calendarViewer;
    /** @type {?} */
    CalendarWidgetComponent.prototype.viewToggle;
    /** @type {?} */
    CalendarWidgetComponent.prototype.locale;
    /** @type {?} */
    CalendarWidgetComponent.prototype.dateFormat;
    /** @type {?} */
    CalendarWidgetComponent.prototype.activeDateViewer;
    /** @type {?} */
    CalendarWidgetComponent.prototype.activeDateTitle;
    /** @type {?} */
    CalendarWidgetComponent.prototype.colors;
    /**
     * @type {?}
     * @private
     */
    CalendarWidgetComponent.prototype._date;
    /**
     * @type {?}
     * @private
     */
    CalendarWidgetComponent.prototype.calendarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvY2FsZW5kYXItd2lkZ2V0L2NhbGVuZGFyLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsU0FBUyxFQUFFLEtBQUssRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHVCQUF1QixFQUFxQixNQUFNLDhDQUE4QyxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFRcEQsTUFBTSxPQUFPLHVCQUF1Qjs7OztJQWtCaEMsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBZjNDLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFDdEIsZUFBVSxHQUFXLGdCQUFnQixDQUFDO1FBRy9DLFdBQU0sR0FBRztZQUNMLFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULFNBQVM7U0FDWixDQUFDO0lBR3FELENBQUM7Ozs7SUFFeEQsUUFBUTtRQUNKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxJQUFVO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLENBQXFCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxT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Q0FBK0I7O0lBQy9CLDZDQUErQzs7SUFDL0MsbURBQXFDOztJQUNyQyxrREFBd0I7O0lBQ3hCLHlDQVFFOzs7OztJQUNGLHdDQUFvQjs7Ozs7SUFFUixrREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYWxlbmRhclZpZXdlckNvbXBvbmVudCwgQ2FsZW5kYXJWaWV3ZXJEYXRlfSBmcm9tIFwiLi4vY2FsZW5kYXItdmlld2VyL2NhbGVuZGFyLXZpZXdlci5jb21wb25lbnRcIjtcbmltcG9ydCB7eENhbGVuZGFyfSBmcm9tIFwiLi4vdXRpbHMveENhbGVuZGFyXCI7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSBcIi4uL2NhbGVuZGFyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2FsRXZlbnR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NhbGVuZGFyLXdpZGdldCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLXdpZGdldC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItd2lkZ2V0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnY2FsZW5kYXJWaWV3ZXInKSBjYWxlbmRhclZpZXdlcjogQ2FsZW5kYXJWaWV3ZXJDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZCgndmlld1RvZ2dsZScpIHZpZXdUb2dnbGU6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmcgPSAndmknO1xuICAgIEBJbnB1dCgpIGRhdGVGb3JtYXQ6IHN0cmluZyA9ICdkZGRkLCBEL00vWVlZWSc7XG4gICAgYWN0aXZlRGF0ZVZpZXdlcjogQ2FsZW5kYXJWaWV3ZXJEYXRlO1xuICAgIGFjdGl2ZURhdGVUaXRsZTogc3RyaW5nO1xuICAgIGNvbG9ycyA9IFtcbiAgICAgICAgJyM0MzhFQjknLFxuICAgICAgICAnIzNDQTU0QScsXG4gICAgICAgICcjRkY5ODAwJyxcbiAgICAgICAgJyNFRjVCNDknLFxuICAgICAgICAnIzc3OTAxQicsXG4gICAgICAgICcjN0Q1MzkyJyxcbiAgICAgICAgJyM4MDgwODAnXG4gICAgXTtcbiAgICBwcml2YXRlIF9kYXRlOiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvYWRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VNb250aChkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX2RhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLmNhbGVuZGFyVmlld2VyLmNsZWFyRXZlbnRzKCk7XG4gICAgICAgIHRoaXMubG9hZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGFjdGl2ZURhdGUoZTogQ2FsZW5kYXJWaWV3ZXJEYXRlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZVZpZXdlciA9IGU7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZVRpdGxlID0geENhbGVuZGFyLmZvcm1hdERhdGUoZS5kYXRlLCB0aGlzLmRhdGVGb3JtYXQpO1xuICAgIH1cblxuICAgIGxvYWRFdmVudHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UubG9hZE1vbnRoRXZlbnRzKHRoaXMuX2RhdGUsIChldmVudHMpID0+IHtcbiAgICAgICAgICAgIGV2ZW50cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuZGF5IC0gYi5kYXk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fZ3JvdXBFdmVudEJ5RGF0ZShldmVudHMpLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhclZpZXdlci5zZXRFdmVudHMoZ3JvdXAuZXZlbnRzLCBncm91cC5kYXRlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBGb2N1cyB0b2RheVxuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZURhdGVWaWV3ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyVmlld2VyLmZvY3VzRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25WaWV3RXZlbnQoZXZlbnQ6IENhbEV2ZW50LCBqc0V2ZW50OiBNb3VzZUV2ZW50LCB0YXJnZXRFbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uudmlld0V2ZW50KGV2ZW50LCBqc0V2ZW50LCB0YXJnZXRFbCwgKCkgPT4gdGhpcy5sb2FkRXZlbnRzKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dyb3VwRXZlbnRCeURhdGUoZXZlbnRzKSB7XG4gICAgICAgIGxldCBncm91cHMgPSBbXTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBsZXQgZ3JvdXA7XG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGV2ZW50LmZyb20pO1xuICAgICAgICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBzW2ldLmRhdGUuZ2V0VGltZSgpID09PSBkYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW5pdEV2ZW50U3RhdHVzKGV2ZW50KTtcblxuICAgICAgICAgICAgZ3JvdXAuZXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNvcnQgZXZlbnQgYnkgdGltZVxuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgICAgZ3JvdXAuZXZlbnRzLnNvcnQoKGEsIGIpID0+IGEuc3RhcnRUaW1lIC0gYi5zdGFydFRpbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZ3JvdXBzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRFdmVudFN0YXR1cyhldmVudCkge1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICBldmVudC5wcm9ncmVzc2luZyA9IGV2ZW50LnN0YXJ0IDwgbm93ICYmIGV2ZW50LmVuZCA+IG5vdztcbiAgICAgICAgZXZlbnQuZW5kZWQgPSBldmVudC5lbmQgPCBub3c7XG4gICAgICAgIGV2ZW50LnBlbmRpbmcgPSBldmVudC5zdGFydCA+IG5vdztcblxuICAgICAgICBpZiAoZXZlbnQucHJvZ3Jlc3NpbmcpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0YXR1c1RleHQgPSAnxJBhbmcgZGnhu4VuIHJhJztcbiAgICAgICAgICAgIGV2ZW50LnN0YXR1c0NvbG9yID0gdGhpcy5jb2xvcnNbMF07XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQucGVuZGluZykge1xuICAgICAgICAgICAgZXZlbnQuc3RhdHVzVGV4dCA9ICdDaMawYSBkaeG7hW4gcmEnO1xuICAgICAgICAgICAgZXZlbnQuc3RhdHVzQ29sb3IgPSB0aGlzLmNvbG9yc1s1XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnN0YXR1c1RleHQgPSAnS+G6v3QgdGjDumMnO1xuICAgICAgICAgICAgZXZlbnQuc3RhdHVzQ29sb3IgPSB0aGlzLmNvbG9yc1s2XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnN0eWxlID0ge1xuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmNvbG9yc1tldmVudC5tb2RlXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==