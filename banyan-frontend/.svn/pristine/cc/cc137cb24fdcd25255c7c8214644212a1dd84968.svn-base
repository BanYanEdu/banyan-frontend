import { OnInit, EventEmitter } from '@angular/core';
export declare class CalendarViewerComponent implements OnInit {
    dateFormat: string;
    locale: string;
    firstDay: number;
    limitEvent: number;
    view: CalendarViewerMode;
    date: Date;
    onChange: EventEmitter<Date>;
    onActive: EventEmitter<CalendarViewerDate>;
    dateTitle: string;
    dates: CalendarViewerDate[];
    weekDates: CalendarViewerDate[][];
    weekTitles: string[];
    dateActive: CalendarViewerDate;
    private _date;
    constructor();
    ngOnInit(): void;
    setEvents(events: any, date: Date): void;
    clearEvents(): void;
    toDay(): void;
    prev(): void;
    next(): void;
    activeDate(dateViewer: CalendarViewerDate): void;
    focusDate(date: Date): void;
    private _nextMonth;
    private _prevMonth;
    private _nextWeek;
    private _prevWeek;
    private _render;
    private _renderMonth;
    private _renderWeek;
    private _createWeekDate;
    private _renderWeekTitle;
    private _renderTitle;
    private _getDateStartWeek;
    private _isToday;
    private _getDateViewer;
}
export interface CalendarViewerDate {
    date: Date;
    time: number;
    outOfRange: boolean;
    today: boolean;
    events?: any[];
}
export declare enum CalendarViewerMode {
    MONTH = "month",
    WEEK = "week"
}
