import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalRepeat } from "../utils/model/CalEvent";
export declare class CalendarDialogRepeatComponent implements AfterViewInit, OnDestroy {
    private calendarService;
    onRepeat: EventEmitter<CalRepeat>;
    repeatModal: ElementRef;
    repeatStart: any;
    repeatUntil: any;
    start: any;
    until: any;
    rrmode: any;
    repeatTypes: any[];
    weekDays: any[];
    data: any;
    $modal: any;
    dateFormat: string;
    constructor(calendarService: CalendarService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    openRepeat(data: any): void;
    saveRepeat(): void;
    changeWeekDay(item: any): void;
    changeDate(): void;
    getRepeatData(): CalRepeat;
    getWeekDayChecked(): any[];
    private initData;
}
