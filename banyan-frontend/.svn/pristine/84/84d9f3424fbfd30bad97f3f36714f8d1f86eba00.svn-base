import { OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from './calendar.service';
import { NotificationService, ResourceLoaderService } from 'inet-core';
import { Calendar } from '@fullcalendar/core';
import { OptionsInput, ViewOptionsInput } from "@fullcalendar/core/types/input-types";
import { CalendarTodayComponent } from "./calendar-today/calendar-today.component";
export declare class CalendarComponent implements AfterViewInit, OnDestroy {
    private calendarService;
    private route;
    private router;
    private resourceLoader;
    private notify;
    calendarRef: any;
    calendarWidget: CalendarTodayComponent;
    viewTypes: CalendarViewMode[];
    defaultMode: CalendarMode;
    viewTitle: string;
    calendarConfig: OptionsInput;
    calendar: Calendar;
    isToday: boolean;
    private _eventTimer;
    private _modeCache;
    private _routerObserver;
    private _events;
    private _currentRange;
    constructor(calendarService: CalendarService, route: ActivatedRoute, router: Router, resourceLoader: ResourceLoaderService, notify: NotificationService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _init;
    private _updateEventTime;
    createEvent(): void;
    private _loadEvents;
    private _createEvent;
    private _selectRange;
    private _calendarChange;
    private _updateInfo;
    private _checkIsToday;
    private _loadRangeEvents;
    private _getRange;
    private _outOfRange;
    private _dateInRange;
    private _renderEvents;
    private _viewEvent;
    private _addEventSource;
    private _onNavigated;
    changeView(type: any): void;
    onPrev(): void;
    onNext(): void;
    onToday(): void;
    private _getCalendarMode;
    private _updateViewParams;
    private _getDataView;
    private _cacheModeView;
    reloadEvents(): void;
    private _hideViewDialog;
}
export declare class CalendarViewMode {
    name: string;
    value: CalendarMode;
    options: ViewOptionsInput;
    active: boolean;
    constructor(name: string, value: CalendarMode, options?: ViewOptionsInput);
}
export declare enum CalendarMode {
    dayGridDay = "dayGridDay",
    timeGridDay = "timeGridDay",
    timeGridWeek = "timeGridWeek",
    dayGridMonth = "dayGridMonth"
}
