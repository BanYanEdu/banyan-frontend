/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * @abstract
 */
var /**
 * @abstract
 */
WebSocketAbstract = /** @class */ (function () {
    function WebSocketAbstract(options, username) {
        // receive message from socket server
        this.onMessage = new Subject();
        this.onStateChange = new Subject();
        this.connect(options, username);
    }
    // update readyState
    // update readyState
    /**
     * @return {?}
     */
    WebSocketAbstract.prototype.stateChange = 
    // update readyState
    /**
     * @return {?}
     */
    function () {
        this.onStateChange.next(this.readyState);
    };
    return WebSocketAbstract;
}());
/**
 * @abstract
 */
export { WebSocketAbstract };
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
var WebSocketType = {
    // send to the first address
    SEND: 'send',
    // publish to the all address
    PUBLISH: 'publish',
};
export { WebSocketType };
var WebSocketEnvelop = /** @class */ (function () {
    function WebSocketEnvelop() {
        this.type = WebSocketType.PUBLISH;
    }
    return WebSocketEnvelop;
}());
export { WebSocketEnvelop };
if (false) {
    /** @type {?} */
    WebSocketEnvelop.prototype.type;
    /** @type {?} */
    WebSocketEnvelop.prototype.address;
    /** @type {?} */
    WebSocketEnvelop.prototype.body;
}
var EnvelopBody = /** @class */ (function () {
    function EnvelopBody() {
    }
    return EnvelopBody;
}());
export { EnvelopBody };
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
var EnvelopMessage = /** @class */ (function () {
    // , joins?: string, duration?: string
    function EnvelopMessage(sender, content, joins, duration) {
        this.content = this.alert = content;
        this.sender = sender;
        if (!!joins) {
            this.joins = joins || sender;
        }
        this.duration = duration || "0";
    }
    return EnvelopMessage;
}());
export { EnvelopMessage };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWFic3RyYWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtYWJzdHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFFL0I7Ozs7SUFVSSwyQkFBWSxPQUFZLEVBQUUsUUFBZ0I7O1FBUjFDLGNBQVMsR0FBeUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoRCxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBUTNDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFQRCxvQkFBb0I7Ozs7O0lBQ3BCLHVDQUFXOzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFpQkwsd0JBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDOzs7Ozs7O0lBdkJHLHNDQUFnRDs7SUFDaEQsMENBQStDOztJQVkvQyx1Q0FBNEI7Ozs7Ozs7SUFHNUIsdUVBQXNEOzs7OztJQUd0RCxvREFBc0I7Ozs7OztJQUd0QiwwREFBMkQ7Ozs7SUFLM0QsNEJBQTRCO0lBQzVCLE1BQU8sTUFBTTtJQUViLDZCQUE2QjtJQUM3QixTQUFVLFNBQVM7OztBQUd2QjtJQUFBO1FBQ0ksU0FBSSxHQUEyQixhQUFhLENBQUMsT0FBTyxDQUFDO0lBR3pELENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEcsZ0NBQXFEOztJQUNyRCxtQ0FBZ0I7O0lBQ2hCLGdDQUFrQjs7QUFHdEI7SUFBQTtJQU9BLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFQRCxJQU9DOzs7O0lBTkcsMkJBQWE7O0lBQ2Isa0NBQW9COztJQUNwQiw4QkFBd0I7O0lBQ3hCLDZCQUFlOztJQUNmLDRCQUFnQjs7SUFDaEIsMkJBQWE7O0FBR2pCO0lBTUEsc0NBQXNDO0lBQ2xDLHdCQUFZLE1BQWMsRUFBRSxPQUFlLEVBQUUsS0FBYyxFQUFFLFFBQWlCO1FBQzFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBRyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksR0FBRyxDQUFDO0lBQ3BDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFmRCxJQWVDOzs7O0lBZEcsZ0NBQWU7O0lBQ2YsK0JBQWM7O0lBQ2QsaUNBQWdCOztJQUNoQiwrQkFBYzs7SUFDZCxrQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXZWJTb2NrZXRBYnN0cmFjdCB7XG4gICAgLy8gcmVjZWl2ZSBtZXNzYWdlIGZyb20gc29ja2V0IHNlcnZlclxuICAgIG9uTWVzc2FnZTogU3ViamVjdDxFbnZlbG9wQm9keT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIG9uU3RhdGVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgXG4gICAgLy8gdXBkYXRlIHJlYWR5U3RhdGVcbiAgICBzdGF0ZUNoYW5nZSAoKSB7XG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZS5uZXh0KHRoaXMucmVhZHlTdGF0ZSk7ICBcbiAgICB9IFxuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogYW55LCB1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdChvcHRpb25zLCB1c2VybmFtZSk7XG4gICAgfVxuXG4gICAgLy8gV2ViU29ja2V0IHJlYWR5U3RhdGVcbiAgICBhYnN0cmFjdCByZWFkeVN0YXRlOiBudW1iZXI7XG5cbiAgICAvLyBjb25uZWN0IHRvIHNvY2tldCBzZXJ2ZXJcbiAgICBhYnN0cmFjdCBjb25uZWN0KG9wdGlvbnM6IGFueSwgdXNlcm5hbWU6IHN0cmluZyk6IGFueTtcbiAgICBcbiAgICAvLyBjbG9zZSBzb2NrZXQgc2VydmVyXG4gICAgYWJzdHJhY3QgY2xvc2UoKTogYW55O1xuXG4gICAgLy8gc2VuZCBtZXNzYWdlIHRvIHNvY2tldCBzZXJ2ZXJcbiAgICBhYnN0cmFjdCBzZW5kKGVudmVsb3A6IFdlYlNvY2tldEVudmVsb3ApOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG5leHBvcnQgZW51bSBXZWJTb2NrZXRUeXBlIHtcbiAgICBcbiAgICAvLyBzZW5kIHRvIHRoZSBmaXJzdCBhZGRyZXNzXG4gICAgU0VORCA9ICdzZW5kJyxcblxuICAgIC8vIHB1Ymxpc2ggdG8gdGhlIGFsbCBhZGRyZXNzXG4gICAgUFVCTElTSCA9ICdwdWJsaXNoJyxcbn1cblxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldEVudmVsb3Age1xuICAgIHR5cGU6IFdlYlNvY2tldFR5cGUgfCBzdHJpbmcgPSBXZWJTb2NrZXRUeXBlLlBVQkxJU0g7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGJvZHk6IEVudmVsb3BCb2R5O1xufVxuXG5leHBvcnQgY2xhc3MgRW52ZWxvcEJvZHkge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICBhcHBsaWNhdGlvbjogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IEVudmVsb3BNZXNzYWdlO1xuICAgIHNlbmRlcjogc3RyaW5nO1xuICAgIGFsaWFzOiBzdHJpbmdbXTsgLy8gcmVjZWl2ZXJzXG4gICAgc2VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRW52ZWxvcE1lc3NhZ2Uge1xuICAgIHNlbmRlcjogc3RyaW5nO1xuICAgIGFsZXJ0OiBzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIGpvaW5zOiBzdHJpbmc7XG4gICAgZHVyYXRpb246IHN0cmluZ1xuLy8gLCBqb2lucz86IHN0cmluZywgZHVyYXRpb24/OiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihzZW5kZXI6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBqb2lucz86IHN0cmluZywgZHVyYXRpb24/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5hbGVydCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgICAgICBpZighIWpvaW5zICl7XG4gICAgICAgICAgICB0aGlzLmpvaW5zID0gam9pbnMgfHwgc2VuZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbiB8fCBcIjBcIjtcbiAgICB9XG59XG4iXX0=