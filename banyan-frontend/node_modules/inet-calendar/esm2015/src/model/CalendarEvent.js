/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HtmlUtils } from "inet-core";
import { CalendarUtils } from "../CalendarUtils";
export class CalendarEvent {
    /**
     * @param {?} event
     */
    constructor(event) {
        this.repeatText = '';
        this.timeDisplay = '';
        this.event = event;
        this.subject = HtmlUtils.formatHtmlDisplay(event.subject);
        this.summary = HtmlUtils.formatHtmlDisplay(event.summary);
        if (event.members) {
            this.myAttendee = event.members.find((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                return item.role !== 'CREATOR' && item.username === iNet.username;
            }));
        }
        if (event.repeat) {
            this.repeatText = CalendarUtils.getRepeatText(event.repeat);
        }
        else {
            this.repeatText = '';
        }
        this.timeDisplay = CalendarUtils.displayDay(event.start);
        if (event.attribute._allday !== 'true') {
            this.timeDisplay += ` ⋅ ${CalendarUtils.displayTime(event.start)} - ${CalendarUtils.displayTime(event.end)}`;
        }
    }
}
if (false) {
    /** @type {?} */
    CalendarEvent.prototype.subject;
    /** @type {?} */
    CalendarEvent.prototype.summary;
    /** @type {?} */
    CalendarEvent.prototype.repeatText;
    /** @type {?} */
    CalendarEvent.prototype.timeDisplay;
    /** @type {?} */
    CalendarEvent.prototype.event;
    /** @type {?} */
    CalendarEvent.prototype.myAttendee;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvQ2FsZW5kYXJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHL0MsTUFBTSxPQUFPLGFBQWE7Ozs7SUFRdEIsWUFBWSxLQUFlO1FBTDNCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFLckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztZQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN0RSxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ2hIO0lBQ0wsQ0FBQztDQUNKOzs7SUExQkcsZ0NBQWdCOztJQUNoQixnQ0FBZ0I7O0lBQ2hCLG1DQUF3Qjs7SUFDeEIsb0NBQXlCOztJQUN6Qiw4QkFBZ0I7O0lBQ2hCLG1DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2FsRXZlbnR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtDYWxBdHRlbmRlZX0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEF0dGVuZGVlXCI7XG5pbXBvcnQge0h0bWxVdGlsc30gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtDYWxlbmRhclV0aWxzfSBmcm9tIFwiLi4vQ2FsZW5kYXJVdGlsc1wiO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XG4gICAgc3ViamVjdDogc3RyaW5nO1xuICAgIHN1bW1hcnk6IHN0cmluZztcbiAgICByZXBlYXRUZXh0OiBzdHJpbmcgPSAnJztcbiAgICB0aW1lRGlzcGxheTogc3RyaW5nID0gJyc7XG4gICAgZXZlbnQ6IENhbEV2ZW50O1xuICAgIG15QXR0ZW5kZWU6IENhbEF0dGVuZGVlO1xuXG4gICAgY29uc3RydWN0b3IoZXZlbnQ6IENhbEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gSHRtbFV0aWxzLmZvcm1hdEh0bWxEaXNwbGF5KGV2ZW50LnN1YmplY3QpO1xuICAgICAgICB0aGlzLnN1bW1hcnkgPSBIdG1sVXRpbHMuZm9ybWF0SHRtbERpc3BsYXkoZXZlbnQuc3VtbWFyeSk7XG4gICAgICAgIGlmKGV2ZW50Lm1lbWJlcnMpIHtcbiAgICAgICAgICAgIHRoaXMubXlBdHRlbmRlZSA9IGV2ZW50Lm1lbWJlcnMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5yb2xlICE9PSAnQ1JFQVRPUicgJiYgaXRlbS51c2VybmFtZSA9PT0gaU5ldC51c2VybmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5yZXBlYXQpIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0VGV4dCA9IENhbGVuZGFyVXRpbHMuZ2V0UmVwZWF0VGV4dChldmVudC5yZXBlYXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRUZXh0ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lRGlzcGxheSA9IENhbGVuZGFyVXRpbHMuZGlzcGxheURheShldmVudC5zdGFydCk7XG4gICAgICAgIGlmIChldmVudC5hdHRyaWJ1dGUuX2FsbGRheSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVEaXNwbGF5ICs9IGAg4ouFICR7Q2FsZW5kYXJVdGlscy5kaXNwbGF5VGltZShldmVudC5zdGFydCl9IC0gJHtDYWxlbmRhclV0aWxzLmRpc3BsYXlUaW1lKGV2ZW50LmVuZCl9YDtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=