import { EventEmitter } from '@angular/core';
import { CalendarService } from "../calendar.service";
import { CalEvent } from "../utils/model/CalEvent";
export declare class CalendarTodayComponent {
    private calendarService;
    onChange: EventEmitter<any>;
    events: CalEvent[];
    colors: string[];
    private _date;
    constructor(calendarService: CalendarService);
    loadTodayEvents(): void;
    onViewEvent(event: CalEvent, jsEvent: MouseEvent, targetEl: HTMLElement): void;
    private _initEventStatus;
}
