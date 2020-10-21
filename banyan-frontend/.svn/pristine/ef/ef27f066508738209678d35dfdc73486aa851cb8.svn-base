import { ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { SuggestionService } from 'inet-core';
import { CalEvent } from "./utils/model/CalEvent";
export declare class CalendarService {
    private suggestService;
    private componentFactoryResolver;
    private injector;
    private appRef;
    myOrg: {
        organId: any;
        orgName: any;
        firmPrefix: any;
    };
    locationKeySuggestion: string;
    private _ready;
    private _fns;
    private _viewModalRef;
    constructor(suggestService: SuggestionService, componentFactoryResolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    ready(callback: Function): void;
    private _triggerReady;
    searchLocation(content: string, callback: Function): void;
    saveLocation(content: string, callback: Function): void;
    createEvent(params: any, callback: any): void;
    updateEvent(params: any, callback: any): void;
    removeEvent(params: any, callback: any): void;
    attendeeSearch(params: any, callback: any): void;
    loadAttendees(callback: any): void;
    loadEvents(params: any, callback: any): void;
    loadMonthEvents(date: any, callback: any): void;
    loadEvent(params: any, callback: any): void;
    deleteAttachment(params: any, callback: Function): void;
    viewEvent(event: CalEvent, jsEvent: MouseEvent, target: HTMLElement, onChange: Function): void;
    hideViewModal(): void;
    private _initViewModal;
}
