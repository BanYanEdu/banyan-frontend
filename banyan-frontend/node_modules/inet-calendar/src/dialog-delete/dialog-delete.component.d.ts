import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { CalendarService } from "../calendar.service";
import { CalEvent } from "../utils/model/CalEvent";
import { ModalDirective } from "ngx-bootstrap";
export declare class CalendarDialogDelete implements AfterViewInit, OnDestroy {
    private calendarService;
    calEvent: CalEvent;
    onDelete: EventEmitter<{}>;
    confirmDialog: ModalDirective;
    dialogDelete: ElementRef;
    dialogTitle: string;
    dialogContent: string;
    private _$dialogDelete;
    constructor(calendarService: CalendarService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    hide(): void;
    delete(): void;
    show(): void;
    private _initDialogDelete;
    private _destroyDialogDelete;
}
