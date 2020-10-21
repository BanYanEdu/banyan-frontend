/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HtmlUtils } from "inet-core";
import { CalendarUtils } from "../CalendarUtils";
var CalendarEvent = /** @class */ (function () {
    function CalendarEvent(event) {
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
            function (item) {
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
            this.timeDisplay += " \u22C5 " + CalendarUtils.displayTime(event.start) + " - " + CalendarUtils.displayTime(event.end);
        }
    }
    return CalendarEvent;
}());
export { CalendarEvent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvQ2FsZW5kYXJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHL0M7SUFRSSx1QkFBWSxLQUFlO1FBTDNCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFLckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsSUFBSTtnQkFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDdEUsQ0FBQyxFQUFDLENBQUM7U0FDTjtRQUNELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0Q7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxJQUFJLGFBQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLENBQUM7U0FDaEg7SUFDTCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDOzs7O0lBMUJHLGdDQUFnQjs7SUFDaEIsZ0NBQWdCOztJQUNoQixtQ0FBd0I7O0lBQ3hCLG9DQUF5Qjs7SUFDekIsOEJBQWdCOztJQUNoQixtQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NhbEV2ZW50fSBmcm9tIFwiLi4vdXRpbHMvbW9kZWwvQ2FsRXZlbnRcIjtcbmltcG9ydCB7Q2FsQXR0ZW5kZWV9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxBdHRlbmRlZVwiO1xuaW1wb3J0IHtIdG1sVXRpbHN9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7Q2FsZW5kYXJVdGlsc30gZnJvbSBcIi4uL0NhbGVuZGFyVXRpbHNcIjtcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnQge1xuICAgIHN1YmplY3Q6IHN0cmluZztcbiAgICBzdW1tYXJ5OiBzdHJpbmc7XG4gICAgcmVwZWF0VGV4dDogc3RyaW5nID0gJyc7XG4gICAgdGltZURpc3BsYXk6IHN0cmluZyA9ICcnO1xuICAgIGV2ZW50OiBDYWxFdmVudDtcbiAgICBteUF0dGVuZGVlOiBDYWxBdHRlbmRlZTtcblxuICAgIGNvbnN0cnVjdG9yKGV2ZW50OiBDYWxFdmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IEh0bWxVdGlscy5mb3JtYXRIdG1sRGlzcGxheShldmVudC5zdWJqZWN0KTtcbiAgICAgICAgdGhpcy5zdW1tYXJ5ID0gSHRtbFV0aWxzLmZvcm1hdEh0bWxEaXNwbGF5KGV2ZW50LnN1bW1hcnkpO1xuICAgICAgICBpZihldmVudC5tZW1iZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm15QXR0ZW5kZWUgPSBldmVudC5tZW1iZXJzLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm9sZSAhPT0gJ0NSRUFUT1InICYmIGl0ZW0udXNlcm5hbWUgPT09IGlOZXQudXNlcm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucmVwZWF0KSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdFRleHQgPSBDYWxlbmRhclV0aWxzLmdldFJlcGVhdFRleHQoZXZlbnQucmVwZWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0VGV4dCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZURpc3BsYXkgPSBDYWxlbmRhclV0aWxzLmRpc3BsYXlEYXkoZXZlbnQuc3RhcnQpO1xuICAgICAgICBpZiAoZXZlbnQuYXR0cmlidXRlLl9hbGxkYXkgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgdGhpcy50aW1lRGlzcGxheSArPSBgIOKLhSAke0NhbGVuZGFyVXRpbHMuZGlzcGxheVRpbWUoZXZlbnQuc3RhcnQpfSAtICR7Q2FsZW5kYXJVdGlscy5kaXNwbGF5VGltZShldmVudC5lbmQpfWA7XG4gICAgICAgIH1cbiAgICB9XG59Il19