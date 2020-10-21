import { OnInit, ElementRef } from '@angular/core';
import { CalendarViewerComponent, CalendarViewerDate } from "../calendar-viewer/calendar-viewer.component";
import { CalendarService } from "../calendar.service";
import { CalEvent } from "../utils/model/CalEvent";
export declare class CalendarWidgetComponent implements OnInit {
    private calendarService;
    calendarViewer: CalendarViewerComponent;
    viewToggle: ElementRef;
    locale: string;
    dateFormat: string;
    activeDateViewer: CalendarViewerDate;
    activeDateTitle: string;
    colors: string[];
    private _date;
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    changeMonth(date: Date): void;
    activeDate(e: CalendarViewerDate): void;
    loadEvents(): void;
    onViewEvent(event: CalEvent, jsEvent: MouseEvent, targetEl: HTMLElement): void;
    private _groupEventByDate;
    private _initEventStatus;
}
