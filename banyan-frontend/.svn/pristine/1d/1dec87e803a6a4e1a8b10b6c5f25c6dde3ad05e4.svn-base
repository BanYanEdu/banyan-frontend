/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * @abstract
 */
export class WebSocketAbstract {
    /**
     * @param {?} options
     * @param {?} username
     */
    constructor(options, username) {
        // receive message from socket server
        this.onMessage = new Subject();
        this.onStateChange = new Subject();
        this.connect(options, username);
    }
    // update readyState
    /**
     * @return {?}
     */
    stateChange() {
        this.onStateChange.next(this.readyState);
    }
}
if (false) {
    /** @type {?} */
    WebSocketAbstract.prototype.onMessage;
    /** @type {?} */
    WebSocketAbstract.prototype.onStateChange;
    /** @type {?} */
    WebSocketAbstract.prototype.readyState;
    /**
     * @abstract
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    WebSocketAbstract.prototype.connect = function (options, username) { };
    /**
     * @abstract
     * @return {?}
     */
    WebSocketAbstract.prototype.close = function () { };
    /**
     * @abstract
     * @param {?} envelop
     * @return {?}
     */
    WebSocketAbstract.prototype.send = function (envelop) { };
}
/** @enum {string} */
const WebSocketType = {
    // send to the first address
    SEND: 'send',
    // publish to the all address
    PUBLISH: 'publish',
};
export { WebSocketType };
export class WebSocketEnvelop {
    constructor() {
        this.type = WebSocketType.PUBLISH;
    }
}
if (false) {
    /** @type {?} */
    WebSocketEnvelop.prototype.type;
    /** @type {?} */
    WebSocketEnvelop.prototype.address;
    /** @type {?} */
    WebSocketEnvelop.prototype.body;
}
export class EnvelopBody {
}
if (false) {
    /** @type {?} */
    EnvelopBody.prototype.uuid;
    /** @type {?} */
    EnvelopBody.prototype.application;
    /** @type {?} */
    EnvelopBody.prototype.message;
    /** @type {?} */
    EnvelopBody.prototype.sender;
    /** @type {?} */
    EnvelopBody.prototype.alias;
    /** @type {?} */
    EnvelopBody.prototype.sent;
}
export class EnvelopMessage {
    // , joins?: string, duration?: string
    /**
     * @param {?} sender
     * @param {?} content
     * @param {?=} joins
     * @param {?=} duration
     */
    constructor(sender, content, joins, duration) {
        this.content = this.alert = content;
        this.sender = sender;
        if (!!joins) {
            this.joins = joins || sender;
        }
        this.duration = duration || "0";
    }
}
if (false) {
    /** @type {?} */
    EnvelopMessage.prototype.sender;
    /** @type {?} */
    EnvelopMessage.prototype.alert;
    /** @type {?} */
    EnvelopMessage.prototype.content;
    /** @type {?} */
    EnvelopMessage.prototype.joins;
    /** @type {?} */
    EnvelopMessage.prototype.duration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWFic3RyYWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtYWJzdHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFFL0IsTUFBTSxPQUFnQixpQkFBaUI7Ozs7O0lBVW5DLFlBQVksT0FBWSxFQUFFLFFBQWdCOztRQVIxQyxjQUFTLEdBQXlCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDaEQsa0JBQWEsR0FBb0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQVEzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQU5ELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQWlCSjs7O0lBdkJHLHNDQUFnRDs7SUFDaEQsMENBQStDOztJQVkvQyx1Q0FBNEI7Ozs7Ozs7SUFHNUIsdUVBQXNEOzs7OztJQUd0RCxvREFBc0I7Ozs7OztJQUd0QiwwREFBMkQ7Ozs7SUFLM0QsNEJBQTRCO0lBQzVCLE1BQU8sTUFBTTtJQUViLDZCQUE2QjtJQUM3QixTQUFVLFNBQVM7OztBQUd2QixNQUFNLE9BQU8sZ0JBQWdCO0lBQTdCO1FBQ0ksU0FBSSxHQUEyQixhQUFhLENBQUMsT0FBTyxDQUFDO0lBR3pELENBQUM7Q0FBQTs7O0lBSEcsZ0NBQXFEOztJQUNyRCxtQ0FBZ0I7O0lBQ2hCLGdDQUFrQjs7QUFHdEIsTUFBTSxPQUFPLFdBQVc7Q0FPdkI7OztJQU5HLDJCQUFhOztJQUNiLGtDQUFvQjs7SUFDcEIsOEJBQXdCOztJQUN4Qiw2QkFBZTs7SUFDZiw0QkFBZ0I7O0lBQ2hCLDJCQUFhOztBQUdqQixNQUFNLE9BQU8sY0FBYzs7Ozs7Ozs7SUFPdkIsWUFBWSxNQUFjLEVBQUUsT0FBZSxFQUFFLEtBQWMsRUFBRSxRQUFpQjtRQUMxRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0NBQ0o7OztJQWRHLGdDQUFlOztJQUNmLCtCQUFjOztJQUNkLGlDQUFnQjs7SUFDaEIsK0JBQWM7O0lBQ2Qsa0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2ViU29ja2V0QWJzdHJhY3Qge1xuICAgIC8vIHJlY2VpdmUgbWVzc2FnZSBmcm9tIHNvY2tldCBzZXJ2ZXJcbiAgICBvbk1lc3NhZ2U6IFN1YmplY3Q8RW52ZWxvcEJvZHk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBvblN0YXRlQ2hhbmdlOiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdCgpO1xuICAgIFxuICAgIC8vIHVwZGF0ZSByZWFkeVN0YXRlXG4gICAgc3RhdGVDaGFuZ2UgKCkge1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UubmV4dCh0aGlzLnJlYWR5U3RhdGUpOyAgXG4gICAgfSBcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IGFueSwgdXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbm5lY3Qob3B0aW9ucywgdXNlcm5hbWUpO1xuICAgIH1cblxuICAgIC8vIFdlYlNvY2tldCByZWFkeVN0YXRlXG4gICAgYWJzdHJhY3QgcmVhZHlTdGF0ZTogbnVtYmVyO1xuXG4gICAgLy8gY29ubmVjdCB0byBzb2NrZXQgc2VydmVyXG4gICAgYWJzdHJhY3QgY29ubmVjdChvcHRpb25zOiBhbnksIHVzZXJuYW1lOiBzdHJpbmcpOiBhbnk7XG4gICAgXG4gICAgLy8gY2xvc2Ugc29ja2V0IHNlcnZlclxuICAgIGFic3RyYWN0IGNsb3NlKCk6IGFueTtcblxuICAgIC8vIHNlbmQgbWVzc2FnZSB0byBzb2NrZXQgc2VydmVyXG4gICAgYWJzdHJhY3Qgc2VuZChlbnZlbG9wOiBXZWJTb2NrZXRFbnZlbG9wKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuZXhwb3J0IGVudW0gV2ViU29ja2V0VHlwZSB7XG4gICAgXG4gICAgLy8gc2VuZCB0byB0aGUgZmlyc3QgYWRkcmVzc1xuICAgIFNFTkQgPSAnc2VuZCcsXG5cbiAgICAvLyBwdWJsaXNoIHRvIHRoZSBhbGwgYWRkcmVzc1xuICAgIFBVQkxJU0ggPSAncHVibGlzaCcsXG59XG5cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRFbnZlbG9wIHtcbiAgICB0eXBlOiBXZWJTb2NrZXRUeXBlIHwgc3RyaW5nID0gV2ViU29ja2V0VHlwZS5QVUJMSVNIO1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBib2R5OiBFbnZlbG9wQm9keTtcbn1cblxuZXhwb3J0IGNsYXNzIEVudmVsb3BCb2R5IHtcbiAgICB1dWlkOiBzdHJpbmc7XG4gICAgYXBwbGljYXRpb246IHN0cmluZztcbiAgICBtZXNzYWdlOiBFbnZlbG9wTWVzc2FnZTtcbiAgICBzZW5kZXI6IHN0cmluZztcbiAgICBhbGlhczogc3RyaW5nW107IC8vIHJlY2VpdmVyc1xuICAgIHNlbnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEVudmVsb3BNZXNzYWdlIHtcbiAgICBzZW5kZXI6IHN0cmluZztcbiAgICBhbGVydDogc3RyaW5nO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICBqb2luczogc3RyaW5nO1xuICAgIGR1cmF0aW9uOiBzdHJpbmdcbi8vICwgam9pbnM/OiBzdHJpbmcsIGR1cmF0aW9uPzogc3RyaW5nXG4gICAgY29uc3RydWN0b3Ioc2VuZGVyOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgam9pbnM/OiBzdHJpbmcsIGR1cmF0aW9uPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuYWxlcnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcbiAgICAgICAgaWYoISFqb2lucyApe1xuICAgICAgICAgICAgdGhpcy5qb2lucyA9IGpvaW5zIHx8IHNlbmRlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb24gfHwgXCIwXCI7XG4gICAgfVxufVxuIl19