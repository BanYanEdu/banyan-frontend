import { DoCheck, EventEmitter, IterableDiffers } from '@angular/core';
import { CalAttendee } from "../utils/model/CalAttendee";
export declare class CalendarAttendeeListComponent implements DoCheck {
    attendees: CalAttendee[];
    editable: boolean;
    expandable: boolean;
    onDelete: EventEmitter<{}>;
    differ: any;
    stateText: string;
    expandEnable: boolean;
    expanded: boolean;
    constructor(differs: IterableDiffers);
    ngDoCheck(): void;
    removeAttendee(attendee: any): void;
    generateDetail(): void;
    expandAttendees(): void;
    getStateIcon(attendee: any): string;
}
