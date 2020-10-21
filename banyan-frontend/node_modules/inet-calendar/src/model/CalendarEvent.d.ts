import { CalEvent } from "../utils/model/CalEvent";
import { CalAttendee } from "../utils/model/CalAttendee";
export declare class CalendarEvent {
    subject: string;
    summary: string;
    repeatText: string;
    timeDisplay: string;
    event: CalEvent;
    myAttendee: CalAttendee;
    constructor(event: CalEvent);
}
