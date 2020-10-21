/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CalendarService } from './calendar.service';
import { NotificationService, ResourceLoaderService } from 'inet-core';
import { xCalendar } from "./utils/xCalendar";
import { DateUtils } from "./utils/common/DateUtils";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment_ from "moment";
import { filter } from "rxjs/operators";
import { CalendarTodayComponent } from "./calendar-today/calendar-today.component";
import { CalendarUtils } from "./CalendarUtils";
/** @type {?} */
var moment = moment_;
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(calendarService, route, router, resourceLoader, notify) {
        var _this = this;
        this.calendarService = calendarService;
        this.route = route;
        this.router = router;
        this.resourceLoader = resourceLoader;
        this.notify = notify;
        this.viewTypes = [
            new CalendarViewMode('Ngày', CalendarMode.timeGridDay, {
                columnHeaderText: (/**
                 * @param {?} date
                 * @return {?}
                 */
                function (date) {
                    /** @type {?} */
                    var str = moment(date).format('dddd, D/M/Y');
                    return str.slice(0, 1).toUpperCase() + str.slice(1);
                }),
                titleFormat: (/**
                 * @return {?}
                 */
                function () { return CalendarUtils.displayDate(_this.calendar.getDate()); })
            }),
            new CalendarViewMode('Tuần', CalendarMode.timeGridWeek, {
                titleFormat: (/**
                 * @return {?}
                 */
                function () { return CalendarUtils.displayWeek(_this.calendar.getDate()); })
            }),
            new CalendarViewMode('Tháng', CalendarMode.dayGridMonth, {
                titleFormat: (/**
                 * @return {?}
                 */
                function () { return CalendarUtils.displayMonth(_this.calendar.getDate()); })
            })
        ];
        this.defaultMode = CalendarMode.dayGridMonth;
        this.calendarConfig = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            themeSystem: 'bootstrap',
            firstDay: 1,
            locale: 'vi',
            allDaySlot: true,
            allDayText: 'Cả ngày',
            header: false,
            nowIndicator: true,
            navLinks: true,
            // can click day/week names to navigate views
            editable: true,
            droppable: true,
            eventLimit: true,
            // allow "more" link when too many events
            selectable: true,
            selectMirror: true,
            weekends: true,
            views: {},
            businessHours: {
                daysOfWeek: [1, 2, 3, 4, 5],
                // Monday - Friday
                startTime: '00:01',
                endTime: '23:59'
            },
            eventDrop: (/**
             * @param {?} arg
             * @return {?}
             */
            function (arg) { return _this._updateEventTime(arg); }),
            eventResize: (/**
             * @param {?} arg
             * @return {?}
             */
            function (arg) { return _this._updateEventTime(arg); }),
            select: (/**
             * @param {?} arg
             * @return {?}
             */
            function (arg) { return _this._selectRange(arg); }),
            eventClick: (/**
             * @param {?} arg
             * @return {?}
             */
            function (arg) { return _this._viewEvent(arg); }),
            eventDragStart: (/**
             * @return {?}
             */
            function () { return _this._hideViewDialog(); }),
            datesRender: (/**
             * @return {?}
             */
            function () { return _this._calendarChange(); }),
            height: (/**
             * @return {?}
             */
            function () {
                return innerHeight - 59;
            })
        };
        this._modeCache = '__calendar_mode__';
        this._events = [];
        // Apply cache config
        Object.assign(this.calendarConfig, this._getDataView());
        // Merge view config
        this.viewTypes.forEach((/**
         * @param {?} view
         * @return {?}
         */
        function (view) {
            if (view.options) {
                _this.calendarConfig.views[view.value] = view.options;
            }
        }));
        // Use locale
        moment.locale(this.calendarConfig.locale.toString());
    }
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._init();
        this._hideViewDialog();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.calendar.destroy();
        if (this._routerObserver) {
            this._routerObserver.unsubscribe();
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._init = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.calendar = new Calendar(this.calendarRef.nativeElement, this.calendarConfig);
        this.calendar.render();
        // Change date view
        this._routerObserver = this.router.events.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this._onNavigated(event); }));
    };
    /**
     * @private
     * @param {?} args
     * @return {?}
     */
    CalendarComponent.prototype._updateEventTime = /**
     * @private
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        /** @type {?} */
        var event;
        if (args.oldEvent) {
            event = this._events[Number(args.oldEvent.id)];
        }
        else {
            event = this._events[Number(args.event.id)];
        }
        if (event.mode !== 1) {
            /** @type {?} */
            var toTime = void 0;
            if (args.event.allDay) {
                toTime = 23 * 60 + 59;
            }
            else {
                toTime = args.event.end.getHours() * 60 + args.event.end.getMinutes();
            }
            /** @type {?} */
            var params = {
                element: event.uuid,
                year: args.event.start.getFullYear(),
                day: DateUtils.dayOfYear(args.event.start),
                startTime: args.event.start.getHours() * 60 + args.event.start.getMinutes(),
                toTime: toTime,
                _allday: args.event.allDay
            };
            if (event.repeat) {
                Object.assign(params, event.repeat);
            }
            this.calendarService.updateEvent(params, (/**
             * @param {?} data
             * @param {?} err
             * @return {?}
             */
            function (data, err) {
                if (!data) {
                    _this.notify.showMessage('Cập nhật lịch không thành công: ' + err.status, 'error');
                    args.revert();
                    return;
                }
                _this.reloadEvents();
            }));
        }
        else {
            // Can't change event
            args.revert();
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.createEvent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = new Date();
        date.setHours(date.getHours() + 1, 0);
        this._createEvent(date, new Date(date.getTime() + 60 * 60 * 1000));
    };
    /**
     * @private
     * @param {?=} forceChange
     * @return {?}
     */
    CalendarComponent.prototype._loadEvents = /**
     * @private
     * @param {?=} forceChange
     * @return {?}
     */
    function (forceChange) {
        var _this = this;
        if (forceChange === void 0) { forceChange = false; }
        this._hideViewDialog();
        clearTimeout(this._eventTimer);
        this._eventTimer = setTimeout((/**
         * @return {?}
         */
        function () {
            _this._loadRangeEvents(forceChange);
        }), 500);
    };
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?=} allDay
     * @return {?}
     */
    CalendarComponent.prototype._createEvent = /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?=} allDay
     * @return {?}
     */
    function (start, end, allDay) {
        if (allDay === void 0) { allDay = false; }
        /** @type {?} */
        var dataBase64 = window.btoa(JSON.stringify({
            start: start.valueOf(),
            end: end.valueOf(),
            attribute: {
                allday: allDay + ''
            }
        }));
        this.router.navigate(['/calendar/create', dataBase64]);
        this._hideViewDialog();
    };
    /**
     * @private
     * @param {?} info
     * @return {?}
     */
    CalendarComponent.prototype._selectRange = /**
     * @private
     * @param {?} info
     * @return {?}
     */
    function (info) {
        this._createEvent(info.start, info.end, info.start.getTime() === (info.end.getTime() - 24 * 60 * 60 * 1000));
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._calendarChange = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.calendar.view.type === CalendarMode.dayGridDay) {
            this.calendar.changeView(CalendarMode.timeGridDay);
            // Trigger change
            setTimeout((/**
             * @return {?}
             */
            function () { return _this._calendarChange(); }));
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this._updateInfo();
            _this._loadEvents();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._updateInfo = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.viewTitle = this.calendar.view.title;
        this.viewTypes.forEach((/**
         * @param {?} view
         * @return {?}
         */
        function (view) { return view.active = view.value === _this.calendar.view.type; }));
        this._checkIsToday();
        this._updateViewParams();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._checkIsToday = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var range = {
            start: this.calendar.view.activeStart,
            end: this.calendar.view.activeEnd,
        };
        this.isToday = this._dateInRange(new Date(), range);
    };
    /**
     * @private
     * @param {?=} forceChange
     * @return {?}
     */
    CalendarComponent.prototype._loadRangeEvents = /**
     * @private
     * @param {?=} forceChange
     * @return {?}
     */
    function (forceChange) {
        var _this = this;
        if (forceChange || this._outOfRange()) {
            this._currentRange = this._getRange();
            this.calendarService.loadEvents(xCalendar.getRangeParams(this._currentRange.start, this._currentRange.end), (/**
             * @param {?} events
             * @return {?}
             */
            function (events) { return _this._renderEvents(events || []); }));
            this.calendar.removeAllEventSources();
        }
    };
    // Range view default is 6 week
    // Range view default is 6 week
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._getRange = 
    // Range view default is 6 week
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var start = new Date(this.calendar.getDate());
        /** @type {?} */
        var end;
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        while (start.getDay() !== this.calendarConfig.firstDay) {
            start.setDate(start.getDate() - 1);
        }
        end = new Date(start.getTime() + 6 * 7 * 24 * 60 * 60 * 1000);
        return {
            start: start,
            end: end
        };
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._outOfRange = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this._currentRange) {
            return true;
        }
        return !(this._dateInRange(this.calendar.view.currentStart) && this._dateInRange(this.calendar.view.currentEnd));
    };
    /**
     * @private
     * @param {?} date
     * @param {?=} range
     * @return {?}
     */
    CalendarComponent.prototype._dateInRange = /**
     * @private
     * @param {?} date
     * @param {?=} range
     * @return {?}
     */
    function (date, range) {
        range = range || this._currentRange;
        return date >= range.start && date <= range.end;
    };
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    CalendarComponent.prototype._renderEvents = /**
     * @private
     * @param {?} events
     * @return {?}
     */
    function (events) {
        this._events = events;
        /** @type {?} */
        var eventInputs = events.map((/**
         * @param {?} event
         * @param {?} index
         * @return {?}
         */
        function (event, index) {
            /** @type {?} */
            var eventInput = {
                id: index,
                uuid: event.uuid,
                allDay: event.allDay,
                title: event.subject,
                start: event.start,
                end: event.end,
            };
            if (event.end < new Date()) {
                // Event on the past
                eventInput.textColor = '#999';
                eventInput.color = '#ddd';
            }
            else if (event.isCreator) {
                // Owner event
                eventInput.textColor = '#fff';
                eventInput.color = '#4da0d8';
            }
            else {
                // Other event
                eventInput.textColor = '#333';
                eventInput.color = '#99ed96';
            }
            return eventInput;
        }));
        this._addEventSource(eventInputs);
    };
    /**
     * @private
     * @param {?} args
     * @return {?}
     */
    CalendarComponent.prototype._viewEvent = /**
     * @private
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        /** @type {?} */
        var event = this._events[Number(args.event.id)];
        this.calendarService.viewEvent(event, args.jsEvent, args.jsEvent.currentTarget, (/**
         * @return {?}
         */
        function () { return _this.reloadEvents(); }));
    };
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    CalendarComponent.prototype._addEventSource = /**
     * @private
     * @param {?} events
     * @return {?}
     */
    function (events) {
        this.calendar.addEventSource({
            events: events
        });
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype._onNavigated = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var viewData = this._getDataView();
        this.calendar.changeView(viewData.defaultView, viewData.defaultDate);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CalendarComponent.prototype.changeView = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        this.calendar.changeView(type.value);
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onPrev = /**
     * @return {?}
     */
    function () {
        this.calendar.prev();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onNext = /**
     * @return {?}
     */
    function () {
        this.calendar.next();
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.onToday = /**
     * @return {?}
     */
    function () {
        this.calendar.changeView(CalendarMode.timeGridDay, new Date());
    };
    /**
     * @private
     * @param {?} mode
     * @return {?}
     */
    CalendarComponent.prototype._getCalendarMode = /**
     * @private
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        for (var i = 0; i < this.viewTypes.length; i++) {
            if (this.viewTypes[i].value === mode) {
                return this.viewTypes[i];
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._updateViewParams = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = [
            this.calendar.view.type,
            moment(this.calendar.getDate()).format('YYYY-M-D')
        ];
        this.router.navigate(['/calendar/v/' + params.join('/')]);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._getDataView = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var segments = this.route.snapshot.url;
        /** @type {?} */
        var modeView = this._cacheModeView();
        /** @type {?} */
        var date;
        if (segments.length > 1) {
            modeView = segments[0].path;
            date = new Date(segments[1].path);
        }
        if (!date || !date.getTime()) {
            date = new Date();
        }
        if (!this._getCalendarMode(modeView)) {
            modeView = this._getCalendarMode(this.defaultMode).value;
        }
        this._cacheModeView(modeView);
        return {
            defaultView: modeView,
            defaultDate: date,
        };
    };
    /**
     * @private
     * @param {?=} modeView
     * @return {?}
     */
    CalendarComponent.prototype._cacheModeView = /**
     * @private
     * @param {?=} modeView
     * @return {?}
     */
    function (modeView) {
        if (modeView === undefined) {
            return localStorage.getItem(this._modeCache);
        }
        else {
            localStorage.setItem(this._modeCache, modeView);
        }
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.reloadEvents = /**
     * @return {?}
     */
    function () {
        this._hideViewDialog();
        this._loadEvents(true);
        this.calendarWidget.loadTodayEvents();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarComponent.prototype._hideViewDialog = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarService.hideViewModal();
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'inet-calendar',
                    template: "<div class=\"calendar-app\">\n    <div class=\"calendar-app__nav p-3\">\n        <div class=\"d-flex align-items-center\">\n            <div class=\"flex-grow-1\" style=\"font-size: 16px;font-weight: 500;line-height: 18px\">{{viewTitle}}</div>\n            <div class=\"btn-group\" role=\"group\">\n                <button (click)=\"onPrev()\" type=\"button\" class=\"btn btn-light\"><i class=\"fa fa-chevron-left\"></i></button>\n                <button (click)=\"onNext()\" type=\"button\" class=\"btn btn-light\"><i class=\"fa fa-chevron-right\"></i></button>\n            </div>\n        </div>\n        <div class=\"btn-group d-flex mt-3\" role=\"group\">\n            <button *ngFor=\"let type of viewTypes\" (click)=\"changeView(type)\"\n                    [ngClass]=\"{'btn-light': !type.active}\" type=\"button\" class=\"btn btn-primary flex-grow-1\">\n                {{type.name}}\n            </button>\n        </div>\n        <button (click)=\"onToday()\" [ngClass]=\"{'btn-light': !isToday}\" type=\"button\" class=\"btn btn-primary w-100 mt-3\">H\u00F4m nay</button>\n        <button (click)=\"createEvent()\" type=\"button\" class=\"btn btn-primary w-100 mt-3\">T\u1EA1o s\u1EF1 ki\u1EC7n</button>\n        <!-- <div (click)=\"createEvent()\" class=\"calendar-add-btn mt-3 pt-2 pb-2 text-primary\">\n            <i class=\"fa fa-plus mr-1\"></i> Th\u00EAm s\u1EF1 ki\u1EC7n\n        </div> -->\n        <div class=\"mt-3\" style=\"margin-left: -15px;margin-right: -15px;\">\n            <div class=\"ml-3 mr-3 pb-1 mb-1\" style=\"border-bottom: 2px solid #007bff;font-weight: bold;\">S\u1EF1 ki\u1EC7n h\u00F4m nay</div>\n            <calendar-widget-today (onChange)=\"reloadEvents()\"></calendar-widget-today>\n        </div>\n    </div>\n    <div class=\"calendar-app__body pr-1\">\n        <div #calendarRef></div>\n    </div>\n</div>\n",
                    styles: [".calendar-app{width:100%;height:calc(100vh - 60px);background:#fff;padding:0}.calendar-app__nav{height:100%;float:left;width:300px}.calendar-app__body{height:100%;overflow:hidden;background:rgba(0,0,0,.01)}.calendar-add-btn{cursor:pointer;font-weight:700}.calendar-add-btn:hover{opacity:.8}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarService },
        { type: ActivatedRoute },
        { type: Router },
        { type: ResourceLoaderService },
        { type: NotificationService }
    ]; };
    CalendarComponent.propDecorators = {
        calendarRef: [{ type: ViewChild, args: ['calendarRef',] }],
        calendarWidget: [{ type: ViewChild, args: [CalendarTodayComponent,] }]
    };
    return CalendarComponent;
}());
export { CalendarComponent };
if (false) {
    /** @type {?} */
    CalendarComponent.prototype.calendarRef;
    /** @type {?} */
    CalendarComponent.prototype.calendarWidget;
    /** @type {?} */
    CalendarComponent.prototype.viewTypes;
    /** @type {?} */
    CalendarComponent.prototype.defaultMode;
    /** @type {?} */
    CalendarComponent.prototype.viewTitle;
    /** @type {?} */
    CalendarComponent.prototype.calendarConfig;
    /** @type {?} */
    CalendarComponent.prototype.calendar;
    /** @type {?} */
    CalendarComponent.prototype.isToday;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._eventTimer;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._modeCache;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._routerObserver;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._events;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._currentRange;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.calendarService;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.resourceLoader;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.notify;
}
var CalendarViewMode = /** @class */ (function () {
    function CalendarViewMode(name, value, options) {
        this.active = false;
        this.name = name;
        this.value = value;
        this.options = options;
    }
    return CalendarViewMode;
}());
export { CalendarViewMode };
if (false) {
    /** @type {?} */
    CalendarViewMode.prototype.name;
    /** @type {?} */
    CalendarViewMode.prototype.value;
    /** @type {?} */
    CalendarViewMode.prototype.options;
    /** @type {?} */
    CalendarViewMode.prototype.active;
}
/** @enum {string} */
var CalendarMode = {
    dayGridDay: 'dayGridDay',
    timeGridDay: 'timeGridDay',
    timeGridWeek: 'timeGridWeek',
    dayGridMonth: 'dayGridMonth',
};
export { CalendarMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWEsU0FBUyxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sYUFBYSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sY0FBYyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8saUJBQWlCLE1BQU0sMkJBQTJCLENBQUM7QUFHMUQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7SUFDeEMsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUFnRUksMkJBQ1ksZUFBZ0MsRUFDaEMsS0FBcUIsRUFDckIsTUFBYyxFQUNkLGNBQXFDLEVBQ3JDLE1BQTJCO1FBTHZDLGlCQW1CQztRQWxCVyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsVUFBSyxH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Q3RCLDJDQUE2Qzs7Ozs7SUFDN0MsbUNBQW1DOztBQWdTM0M7SUFLSSwwQkFBWSxJQUFZLEVBQUUsS0FBbUIsRUFBRSxPQUEwQjtRQUR6RSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXBCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFWRCxJQVVDOzs7O0lBVEcsZ0NBQWE7O0lBQ2IsaUNBQW9COztJQUNwQixtQ0FBMEI7O0lBQzFCLGtDQUF3Qjs7OztJQVN4QixZQUFhLFlBQVk7SUFDekIsYUFBYyxhQUFhO0lBQzNCLGNBQWUsY0FBYztJQUM3QixjQUFlLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZSwgUmVzb3VyY2VMb2FkZXJTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHt4Q2FsZW5kYXJ9IGZyb20gXCIuL3V0aWxzL3hDYWxlbmRhclwiO1xuaW1wb3J0IHtEYXRlVXRpbHN9IGZyb20gXCIuL3V0aWxzL2NvbW1vbi9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IENhbGVuZGFyIH0gZnJvbSAnQGZ1bGxjYWxlbmRhci9jb3JlJztcbmltcG9ydCBkYXlHcmlkUGx1Z2luIGZyb20gJ0BmdWxsY2FsZW5kYXIvZGF5Z3JpZCc7XG5pbXBvcnQgdGltZUdyaWRQbHVnaW4gZnJvbSAnQGZ1bGxjYWxlbmRhci90aW1lZ3JpZCc7XG5pbXBvcnQgaW50ZXJhY3Rpb25QbHVnaW4gZnJvbSAnQGZ1bGxjYWxlbmRhci9pbnRlcmFjdGlvbic7XG5pbXBvcnQge0V2ZW50SW5wdXR9IGZyb20gXCJAZnVsbGNhbGVuZGFyL2NvcmUvc3RydWN0cy9ldmVudFwiO1xuaW1wb3J0IHtPcHRpb25zSW5wdXQsIFZpZXdPcHRpb25zSW5wdXR9IGZyb20gXCJAZnVsbGNhbGVuZGFyL2NvcmUvdHlwZXMvaW5wdXQtdHlwZXNcIjtcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtDYWxlbmRhclRvZGF5Q29tcG9uZW50fSBmcm9tIFwiLi9jYWxlbmRhci10b2RheS9jYWxlbmRhci10b2RheS5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2FsZW5kYXJVdGlsc30gZnJvbSBcIi4vQ2FsZW5kYXJVdGlsc1wiO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdpbmV0LWNhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBWaWV3Q2hpbGQoJ2NhbGVuZGFyUmVmJykgY2FsZW5kYXJSZWY7XG4gICAgQFZpZXdDaGlsZChDYWxlbmRhclRvZGF5Q29tcG9uZW50KSBjYWxlbmRhcldpZGdldDogQ2FsZW5kYXJUb2RheUNvbXBvbmVudDtcbiAgICB2aWV3VHlwZXM6IENhbGVuZGFyVmlld01vZGVbXSA9IFtcbiAgICAgICAgbmV3IENhbGVuZGFyVmlld01vZGUoJ05nw6B5JywgQ2FsZW5kYXJNb2RlLnRpbWVHcmlkRGF5LCB7XG4gICAgICAgICAgICBjb2x1bW5IZWFkZXJUZXh0OiAoZGF0ZTogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBtb21lbnQoZGF0ZSkuZm9ybWF0KCdkZGRkLCBEL00vWScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aXRsZUZvcm1hdDogKCkgPT4gQ2FsZW5kYXJVdGlscy5kaXNwbGF5RGF0ZSh0aGlzLmNhbGVuZGFyLmdldERhdGUoKSlcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBDYWxlbmRhclZpZXdNb2RlKCdUdeG6p24nLCBDYWxlbmRhck1vZGUudGltZUdyaWRXZWVrLCB7XG4gICAgICAgICAgICB0aXRsZUZvcm1hdDogKCkgPT4gQ2FsZW5kYXJVdGlscy5kaXNwbGF5V2Vlayh0aGlzLmNhbGVuZGFyLmdldERhdGUoKSlcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBDYWxlbmRhclZpZXdNb2RlKCdUaMOhbmcnLCBDYWxlbmRhck1vZGUuZGF5R3JpZE1vbnRoLCB7XG4gICAgICAgICAgICB0aXRsZUZvcm1hdDogKCkgPT4gQ2FsZW5kYXJVdGlscy5kaXNwbGF5TW9udGgodGhpcy5jYWxlbmRhci5nZXREYXRlKCkpXG4gICAgICAgIH0pXG4gICAgXTtcbiAgICBkZWZhdWx0TW9kZTogQ2FsZW5kYXJNb2RlID0gQ2FsZW5kYXJNb2RlLmRheUdyaWRNb250aDtcbiAgICB2aWV3VGl0bGU6IHN0cmluZztcbiAgICBjYWxlbmRhckNvbmZpZzogT3B0aW9uc0lucHV0ID0ge1xuICAgICAgICBwbHVnaW5zOiBbZGF5R3JpZFBsdWdpbiwgdGltZUdyaWRQbHVnaW4sIGludGVyYWN0aW9uUGx1Z2luXSxcbiAgICAgICAgdGhlbWVTeXN0ZW06ICdib290c3RyYXAnLFxuICAgICAgICBmaXJzdERheTogMSxcbiAgICAgICAgbG9jYWxlOiAndmknLFxuICAgICAgICBhbGxEYXlTbG90OiB0cnVlLFxuICAgICAgICBhbGxEYXlUZXh0OiAnQ+G6oyBuZ8OgeScsXG4gICAgICAgIGhlYWRlcjogZmFsc2UsXG4gICAgICAgIG5vd0luZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgbmF2TGlua3M6IHRydWUsIC8vIGNhbiBjbGljayBkYXkvd2VlayBuYW1lcyB0byBuYXZpZ2F0ZSB2aWV3c1xuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgZHJvcHBhYmxlOiB0cnVlLFxuICAgICAgICBldmVudExpbWl0OiB0cnVlLCAvLyBhbGxvdyBcIm1vcmVcIiBsaW5rIHdoZW4gdG9vIG1hbnkgZXZlbnRzXG4gICAgICAgIHNlbGVjdGFibGU6IHRydWUsXG4gICAgICAgIHNlbGVjdE1pcnJvcjogdHJ1ZSxcbiAgICAgICAgd2Vla2VuZHM6IHRydWUsXG4gICAgICAgIHZpZXdzOiB7fSxcbiAgICAgICAgYnVzaW5lc3NIb3Vyczoge1xuICAgICAgICAgICAgZGF5c09mV2VlazogWyAxLCAyLCAzLCA0LCA1XSwgIC8vIE1vbmRheSAtIEZyaWRheVxuICAgICAgICAgICAgc3RhcnRUaW1lOiAnMDA6MDEnLFxuICAgICAgICAgICAgZW5kVGltZTogJzIzOjU5J1xuICAgICAgICB9LFxuICAgICAgICBldmVudERyb3A6IChhcmcpID0+IHRoaXMuX3VwZGF0ZUV2ZW50VGltZShhcmcpLFxuICAgICAgICBldmVudFJlc2l6ZTogKGFyZykgPT4gdGhpcy5fdXBkYXRlRXZlbnRUaW1lKGFyZyksXG4gICAgICAgIHNlbGVjdDogKGFyZykgPT4gdGhpcy5fc2VsZWN0UmFuZ2UoYXJnKSxcbiAgICAgICAgZXZlbnRDbGljazogKGFyZykgPT4gdGhpcy5fdmlld0V2ZW50KGFyZyksXG4gICAgICAgIGV2ZW50RHJhZ1N0YXJ0OiAoKSA9PiB0aGlzLl9oaWRlVmlld0RpYWxvZygpLFxuICAgICAgICBkYXRlc1JlbmRlcjogKCkgPT4gdGhpcy5fY2FsZW5kYXJDaGFuZ2UoKSxcbiAgICAgICAgaGVpZ2h0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5uZXJIZWlnaHQgLSA1OTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY2FsZW5kYXI6IENhbGVuZGFyO1xuICAgIGlzVG9kYXk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfZXZlbnRUaW1lcjogYW55O1xuICAgIHByaXZhdGUgX21vZGVDYWNoZTogc3RyaW5nID0gJ19fY2FsZW5kYXJfbW9kZV9fJztcbiAgICBwcml2YXRlIF9yb3V0ZXJPYnNlcnZlcjtcbiAgICBwcml2YXRlIF9ldmVudHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSBfY3VycmVudFJhbmdlOiB7c3RhcnQ6IERhdGUsIGVuZDogRGF0ZX07XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIHJlc291cmNlTG9hZGVyOiBSZXNvdXJjZUxvYWRlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZ5OiBOb3RpZmljYXRpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIC8vIEFwcGx5IGNhY2hlIGNvbmZpZ1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY2FsZW5kYXJDb25maWcsIHRoaXMuX2dldERhdGFWaWV3KCkpO1xuXG4gICAgICAgIC8vIE1lcmdlIHZpZXcgY29uZmlnXG4gICAgICAgIHRoaXMudmlld1R5cGVzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgICAgICAgIGlmICh2aWV3Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyQ29uZmlnLnZpZXdzW3ZpZXcudmFsdWVdID0gdmlldy5vcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgbG9jYWxlXG4gICAgICAgIG1vbWVudC5sb2NhbGUodGhpcy5jYWxlbmRhckNvbmZpZy5sb2NhbGUudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIHRoaXMuX2hpZGVWaWV3RGlhbG9nKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5fcm91dGVyT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlck9ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyID0gbmV3IENhbGVuZGFyKHRoaXMuY2FsZW5kYXJSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jYWxlbmRhckNvbmZpZyk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIucmVuZGVyKCk7XG5cbiAgICAgICAgLy8gQ2hhbmdlIGRhdGUgdmlld1xuICAgICAgICB0aGlzLl9yb3V0ZXJPYnNlcnZlciA9IHRoaXMucm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHRoaXMuX29uTmF2aWdhdGVkKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlRXZlbnRUaW1lKGFyZ3MpIHtcbiAgICAgICAgbGV0IGV2ZW50O1xuICAgICAgICBpZiAoYXJncy5vbGRFdmVudCkge1xuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLl9ldmVudHNbTnVtYmVyKGFyZ3Mub2xkRXZlbnQuaWQpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50ID0gdGhpcy5fZXZlbnRzW051bWJlcihhcmdzLmV2ZW50LmlkKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQubW9kZSAhPT0gMSl7XG4gICAgICAgICAgICBsZXQgdG9UaW1lO1xuICAgICAgICAgICAgaWYgKGFyZ3MuZXZlbnQuYWxsRGF5KSB7XG4gICAgICAgICAgICAgICAgdG9UaW1lID0gMjMgKiA2MCArIDU5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b1RpbWUgPSBhcmdzLmV2ZW50LmVuZC5nZXRIb3VycygpICogNjAgKyBhcmdzLmV2ZW50LmVuZC5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGV2ZW50LnV1aWQsXG4gICAgICAgICAgICAgICAgeWVhcjogYXJncy5ldmVudC5zdGFydC5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIGRheTogRGF0ZVV0aWxzLmRheU9mWWVhcihhcmdzLmV2ZW50LnN0YXJ0KSxcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IGFyZ3MuZXZlbnQuc3RhcnQuZ2V0SG91cnMoKSAqIDYwICsgYXJncy5ldmVudC5zdGFydC5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgICAgdG9UaW1lOiB0b1RpbWUsXG4gICAgICAgICAgICAgICAgX2FsbGRheTogYXJncy5ldmVudC5hbGxEYXlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZXZlbnQucmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIGV2ZW50LnJlcGVhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS51cGRhdGVFdmVudChwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkuc2hvd01lc3NhZ2UoJ0Phuq1wIG5o4bqtdCBs4buLY2gga2jDtG5nIHRow6BuaCBjw7RuZzogJyArIGVyci5zdGF0dXMsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBhcmdzLnJldmVydCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkRXZlbnRzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENhbid0IGNoYW5nZSBldmVudFxuICAgICAgICAgICAgYXJncy5yZXZlcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUV2ZW50KCkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpICsgMSwgMCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUV2ZW50KGRhdGUsIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgNjAgKiA2MCAqIDEwMDApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkRXZlbnRzKGZvcmNlQ2hhbmdlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5faGlkZVZpZXdEaWFsb2coKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2V2ZW50VGltZXIpO1xuICAgICAgICB0aGlzLl9ldmVudFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkUmFuZ2VFdmVudHMoZm9yY2VDaGFuZ2UpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUV2ZW50KHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUsIGFsbERheTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRhdGFCYXNlNjQgPSB3aW5kb3cuYnRvYShKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQudmFsdWVPZigpLFxuICAgICAgICAgICAgZW5kOiBlbmQudmFsdWVPZigpLFxuICAgICAgICAgICAgYXR0cmlidXRlOiB7XG4gICAgICAgICAgICAgICAgYWxsZGF5OiBhbGxEYXkgKyAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NhbGVuZGFyL2NyZWF0ZScsIGRhdGFCYXNlNjRdKTtcbiAgICAgICAgdGhpcy5faGlkZVZpZXdEaWFsb2coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RSYW5nZShpbmZvKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUV2ZW50KGluZm8uc3RhcnQsIGluZm8uZW5kLCBpbmZvLnN0YXJ0LmdldFRpbWUoKSA9PT0gKGluZm8uZW5kLmdldFRpbWUoKSAtIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxlbmRhckNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIudmlldy50eXBlID09PSBDYWxlbmRhck1vZGUuZGF5R3JpZERheSkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5jaGFuZ2VWaWV3KENhbGVuZGFyTW9kZS50aW1lR3JpZERheSk7XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGNoYW5nZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9jYWxlbmRhckNoYW5nZSgpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUluZm8oKTtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRFdmVudHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlSW5mbygpIHtcbiAgICAgICAgdGhpcy52aWV3VGl0bGUgPSB0aGlzLmNhbGVuZGFyLnZpZXcudGl0bGU7XG4gICAgICAgIHRoaXMudmlld1R5cGVzLmZvckVhY2goKHZpZXcpID0+IHZpZXcuYWN0aXZlID0gdmlldy52YWx1ZSA9PT0gdGhpcy5jYWxlbmRhci52aWV3LnR5cGUpO1xuICAgICAgICB0aGlzLl9jaGVja0lzVG9kYXkoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlld1BhcmFtcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrSXNUb2RheSgpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB7XG4gICAgICAgICAgICBzdGFydDogdGhpcy5jYWxlbmRhci52aWV3LmFjdGl2ZVN0YXJ0LFxuICAgICAgICAgICAgZW5kOiB0aGlzLmNhbGVuZGFyLnZpZXcuYWN0aXZlRW5kLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlzVG9kYXkgPSB0aGlzLl9kYXRlSW5SYW5nZShuZXcgRGF0ZSgpLCByYW5nZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZFJhbmdlRXZlbnRzKGZvcmNlQ2hhbmdlPzogYm9vbGVhbil7XG4gICAgICAgIGlmIChmb3JjZUNoYW5nZSB8fHRoaXMuX291dE9mUmFuZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFJhbmdlID0gdGhpcy5fZ2V0UmFuZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmxvYWRFdmVudHMoeENhbGVuZGFyLmdldFJhbmdlUGFyYW1zKHRoaXMuX2N1cnJlbnRSYW5nZS5zdGFydCwgdGhpcy5fY3VycmVudFJhbmdlLmVuZCksXG4gICAgICAgICAgICAgICAgKGV2ZW50cykgPT4gdGhpcy5fcmVuZGVyRXZlbnRzKGV2ZW50cyB8fCBbXSkpO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5yZW1vdmVBbGxFdmVudFNvdXJjZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJhbmdlIHZpZXcgZGVmYXVsdCBpcyA2IHdlZWtcbiAgICBwcml2YXRlIF9nZXRSYW5nZSgpIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUodGhpcy5jYWxlbmRhci5nZXREYXRlKCkpO1xuICAgICAgICBsZXQgZW5kOiBEYXRlO1xuICAgICAgICBzdGFydC5zZXREYXRlKDEpO1xuICAgICAgICBzdGFydC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpbGUgKHN0YXJ0LmdldERheSgpICE9PSB0aGlzLmNhbGVuZGFyQ29uZmlnLmZpcnN0RGF5KSB7XG4gICAgICAgICAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIDYgKiA3ICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX291dE9mUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5fY3VycmVudFJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISh0aGlzLl9kYXRlSW5SYW5nZSh0aGlzLmNhbGVuZGFyLnZpZXcuY3VycmVudFN0YXJ0KSAmJiB0aGlzLl9kYXRlSW5SYW5nZSh0aGlzLmNhbGVuZGFyLnZpZXcuY3VycmVudEVuZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGVJblJhbmdlKGRhdGU6IERhdGUsIHJhbmdlPzoge3N0YXJ0OiBEYXRlLCBlbmQ6IERhdGV9KSB7XG4gICAgICAgIHJhbmdlID0gcmFuZ2UgfHwgdGhpcy5fY3VycmVudFJhbmdlO1xuICAgICAgICByZXR1cm4gZGF0ZSA+PSByYW5nZS5zdGFydCAmJiBkYXRlIDw9IHJhbmdlLmVuZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZW5kZXJFdmVudHMoZXZlbnRzKXtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gZXZlbnRzO1xuICAgICAgICBsZXQgZXZlbnRJbnB1dHMgPSBldmVudHMubWFwKChldmVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudElucHV0OiBFdmVudElucHV0ID0ge1xuICAgICAgICAgICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgICAgICAgICB1dWlkOiBldmVudC51dWlkLFxuICAgICAgICAgICAgICAgIGFsbERheTogZXZlbnQuYWxsRGF5LFxuICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudC5zdWJqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXJ0OiBldmVudC5zdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IGV2ZW50LmVuZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZXZlbnQuZW5kIDwgbmV3IERhdGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIEV2ZW50IG9uIHRoZSBwYXN0XG4gICAgICAgICAgICAgICAgZXZlbnRJbnB1dC50ZXh0Q29sb3IgPSAnIzk5OSc7XG4gICAgICAgICAgICAgICAgZXZlbnRJbnB1dC5jb2xvciA9ICcjZGRkJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNDcmVhdG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gT3duZXIgZXZlbnRcbiAgICAgICAgICAgICAgICBldmVudElucHV0LnRleHRDb2xvciA9ICcjZmZmJztcbiAgICAgICAgICAgICAgICBldmVudElucHV0LmNvbG9yID0gJyM0ZGEwZDgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlciBldmVudFxuICAgICAgICAgICAgICAgIGV2ZW50SW5wdXQudGV4dENvbG9yID0gJyMzMzMnO1xuICAgICAgICAgICAgICAgIGV2ZW50SW5wdXQuY29sb3IgPSAnIzk5ZWQ5Nic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRJbnB1dDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2FkZEV2ZW50U291cmNlKGV2ZW50SW5wdXRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92aWV3RXZlbnQoYXJncykge1xuICAgICAgICBsZXQgZXZlbnQgPSB0aGlzLl9ldmVudHNbTnVtYmVyKGFyZ3MuZXZlbnQuaWQpXTtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uudmlld0V2ZW50KGV2ZW50LCBhcmdzLmpzRXZlbnQsIGFyZ3MuanNFdmVudC5jdXJyZW50VGFyZ2V0LCAoKSA9PiB0aGlzLnJlbG9hZEV2ZW50cygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRFdmVudFNvdXJjZShldmVudHMpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhci5hZGRFdmVudFNvdXJjZSh7XG4gICAgICAgICAgICBldmVudHM6IGV2ZW50c1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbk5hdmlnYXRlZChldmVudDogTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICBjb25zdCB2aWV3RGF0YSA9IHRoaXMuX2dldERhdGFWaWV3KCk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIuY2hhbmdlVmlldyh2aWV3RGF0YS5kZWZhdWx0Vmlldywgdmlld0RhdGEuZGVmYXVsdERhdGUpO1xuICAgIH1cblxuICAgIGNoYW5nZVZpZXcodHlwZSkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLmNoYW5nZVZpZXcodHlwZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgb25QcmV2KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLnByZXYoKTtcbiAgICB9XG5cbiAgICBvbk5leHQoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIubmV4dCgpO1xuICAgIH1cblxuICAgIG9uVG9kYXkoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIuY2hhbmdlVmlldyhDYWxlbmRhck1vZGUudGltZUdyaWREYXksIG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENhbGVuZGFyTW9kZShtb2RlOiBDYWxlbmRhck1vZGUgfCBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZXdUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlld1R5cGVzW2ldLnZhbHVlID09PSBtb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld1R5cGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlVmlld1BhcmFtcygpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IFtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIudmlldy50eXBlLFxuICAgICAgICAgICAgbW9tZW50KHRoaXMuY2FsZW5kYXIuZ2V0RGF0ZSgpKS5mb3JtYXQoJ1lZWVktTS1EJylcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2FsZW5kYXIvdi8nICsgcGFyYW1zLmpvaW4oJy8nKV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERhdGFWaWV3KCkge1xuICAgICAgICBsZXQgc2VnbWVudHMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnVybDtcbiAgICAgICAgbGV0IG1vZGVWaWV3ID0gdGhpcy5fY2FjaGVNb2RlVmlldygpO1xuICAgICAgICBsZXQgZGF0ZTogRGF0ZTtcbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIG1vZGVWaWV3ID0gc2VnbWVudHNbMF0ucGF0aDtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShzZWdtZW50c1sxXS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRhdGUgfHwgIWRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2dldENhbGVuZGFyTW9kZShtb2RlVmlldykpIHtcbiAgICAgICAgICAgIG1vZGVWaWV3ID0gdGhpcy5fZ2V0Q2FsZW5kYXJNb2RlKHRoaXMuZGVmYXVsdE1vZGUpLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhY2hlTW9kZVZpZXcobW9kZVZpZXcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVmYXVsdFZpZXc6IG1vZGVWaWV3LFxuICAgICAgICAgICAgZGVmYXVsdERhdGU6IGRhdGUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FjaGVNb2RlVmlldyhtb2RlVmlldz86IHN0cmluZykge1xuICAgICAgICBpZiAobW9kZVZpZXcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX21vZGVDYWNoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9tb2RlQ2FjaGUsIG1vZGVWaWV3KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbG9hZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5faGlkZVZpZXdEaWFsb2coKTtcbiAgICAgICAgdGhpcy5fbG9hZEV2ZW50cyh0cnVlKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhcldpZGdldC5sb2FkVG9kYXlFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oaWRlVmlld0RpYWxvZygpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UuaGlkZVZpZXdNb2RhbCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVmlld01vZGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZTogQ2FsZW5kYXJNb2RlO1xuICAgIG9wdGlvbnM6IFZpZXdPcHRpb25zSW5wdXQ7XG4gICAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogQ2FsZW5kYXJNb2RlLCBvcHRpb25zPzogVmlld09wdGlvbnNJbnB1dCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuXG5leHBvcnQgZW51bSBDYWxlbmRhck1vZGUge1xuICAgIGRheUdyaWREYXkgPSAnZGF5R3JpZERheScsXG4gICAgdGltZUdyaWREYXkgPSAndGltZUdyaWREYXknLFxuICAgIHRpbWVHcmlkV2VlayA9ICd0aW1lR3JpZFdlZWsnLFxuICAgIGRheUdyaWRNb250aCA9ICdkYXlHcmlkTW9udGgnXG59Il19