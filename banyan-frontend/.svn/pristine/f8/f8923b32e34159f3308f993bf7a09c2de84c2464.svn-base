/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as EventBus from 'vertx3-eventbus-client';
import { Subject } from "rxjs";
export class VertxSocket {
    /**
     * @param {?} username
     * @param {?} url
     * @param {?} headers
     */
    constructor(username, url, headers) {
        this.onStateChange = new Subject();
        this.onMessage = new Subject();
        this.onMessageOnline = new Subject();
        this.readyState = VertxSocketState.UNSET;
        this.message = '';
        this.url = url;
        this.headers = headers || {};
        this.username = username;
        this.connect();
    }
    /**
     * @return {?}
     */
    get unset() {
        return this.readyState === VertxSocketState.UNSET;
    }
    /**
     * @return {?}
     */
    get closed() {
        return this.readyState === VertxSocketState.CLOSED;
    }
    /**
     * @return {?}
     */
    get connecting() {
        return this.readyState === VertxSocketState.CONNECTING;
    }
    /**
     * @return {?}
     */
    get connected() {
        return this.readyState === VertxSocketState.CONNECTED;
    }
    /**
     * @return {?}
     */
    connect() {
        if (!this.unset) {
            console.warn('Socket is initialed');
            return;
        }
        this._stateChange(VertxSocketState.CONNECTING);
        this.socket = new EventBus(this.url, {
            transports: 'websocket'
        });
        this.socket.onopen = (/**
         * @return {?}
         */
        () => {
            // Channel receive chat message
            this.socket.registerHandler(this.username, this.headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            (err, msg) => {
                if (msg) {
                    this.onMessage.next(msg.body);
                }
            }));
            // Channel receive online message
            this.socket.registerHandler('news-feed', this.headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            (err, msg) => {
                if (msg) {
                    this.onMessageOnline.next((/** @type {?} */ (msg.body)));
                }
            }));
            // Connected
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (!this.closed) {
                    this._stateChange(VertxSocketState.CONNECTED);
                }
            }), 1000);
        });
        this.socket.onclose = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => this._close(e));
    }
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    send(address, message) {
        if (!this.connected) {
            throw Error('Socket is not connected');
        }
        this.socket.publish(address, message || '');
    }
    /**
     * @return {?}
     */
    close() {
        this._close();
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    _stateChange(state) {
        this.readyState = state;
        this.onStateChange.next();
    }
    /**
     * @private
     * @param {?=} message
     * @return {?}
     */
    _close(message) {
        if (this.closed) {
            console.warn('Socket is closed');
            return;
        }
        this._stateChange(VertxSocketState.CLOSED);
        this.message = message;
        if (this.socket) {
            try {
                this.socket.close();
            }
            catch (e) { }
            this.socket = null;
        }
        this.onStateChange.unsubscribe();
        this.onMessage.unsubscribe();
        this.onMessageOnline.unsubscribe();
    }
}
if (false) {
    /** @type {?} */
    VertxSocket.prototype.url;
    /** @type {?} */
    VertxSocket.prototype.headers;
    /** @type {?} */
    VertxSocket.prototype.username;
    /** @type {?} */
    VertxSocket.prototype.socket;
    /** @type {?} */
    VertxSocket.prototype.onStateChange;
    /** @type {?} */
    VertxSocket.prototype.onMessage;
    /** @type {?} */
    VertxSocket.prototype.onMessageOnline;
    /** @type {?} */
    VertxSocket.prototype.readyState;
    /** @type {?} */
    VertxSocket.prototype.message;
}
/** @enum {string} */
const VertxSocketState = {
    UNAVAILABLE: 'UNAVAILABLE',
    UNSET: 'UNSET',
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    CLOSED: 'CLOSED',
    RE_CONNECTING: 'RE_CONNECTING',
};
export { VertxSocketState };
/**
 * @record
 */
export function VertxReceiveData() { }
if (false) {
    /** @type {?} */
    VertxReceiveData.prototype.type;
    /** @type {?} */
    VertxReceiveData.prototype.address;
    /** @type {?} */
    VertxReceiveData.prototype.body;
}
/**
 * @record
 */
export function VertxMessage() { }
if (false) {
    /** @type {?|undefined} */
    VertxMessage.prototype.uuid;
    /** @type {?|undefined} */
    VertxMessage.prototype.application;
    /** @type {?|undefined} */
    VertxMessage.prototype.message;
    /** @type {?|undefined} */
    VertxMessage.prototype.sender;
    /** @type {?|undefined} */
    VertxMessage.prototype.sent;
    /** @type {?|undefined} */
    VertxMessage.prototype.type;
}
/**
 * @record
 */
export function VertxMessageContent() { }
if (false) {
    /** @type {?|undefined} */
    VertxMessageContent.prototype.application;
    /** @type {?|undefined} */
    VertxMessageContent.prototype.alert;
    /** @type {?|undefined} */
    VertxMessageContent.prototype.sender;
    /** @type {?|undefined} */
    VertxMessageContent.prototype.content;
}
/**
 * @record
 */
export function VertxOnlineData() { }
if (false) {
    /** @type {?} */
    VertxOnlineData.prototype.type;
    /** @type {?} */
    VertxOnlineData.prototype.address;
}
/** @enum {string} */
const VertxOnlineType = {
    register: 'register',
    unregister: 'unregister',
};
export { VertxOnlineType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVydHhTb2NrZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvdmVydHgvVmVydHhTb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3QixNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBMkJwQixZQUFZLFFBQWdCLEVBQ2hCLEdBQVcsRUFDWCxPQUFZO1FBeEJ4QixrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQ3hDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDakQsZUFBVSxHQUFxQixnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDdEQsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQXFCakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUF2QkQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUN0RCxDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztJQUMzRCxDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFB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QUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7OztJQXBHRywwQkFBWTs7SUFDWiw4QkFBYTs7SUFDYiwrQkFBaUI7O0lBQ2pCLDZCQUFpQjs7SUFDakIsb0NBQThCOztJQUM5QixnQ0FBd0M7O0lBQ3hDLHNDQUFpRDs7SUFDakQsaUNBQXNEOztJQUN0RCw4QkFBcUI7Ozs7SUErRnJCLGFBQWMsYUFBYTtJQUMzQixPQUFRLE9BQU87SUFDZixZQUFhLFlBQVk7SUFDekIsV0FBWSxXQUFXO0lBQ3ZCLFFBQVMsUUFBUTtJQUNqQixlQUFnQixlQUFlOzs7Ozs7QUFHbkMsc0NBSUM7OztJQUhHLGdDQUFhOztJQUNiLG1DQUFnQjs7SUFDaEIsZ0NBQW1COzs7OztBQUd2QixrQ0FPQzs7O0lBTkcsNEJBQWE7O0lBQ2IsbUNBQW9COztJQUNwQiwrQkFBNkI7O0lBQzdCLDhCQUFlOztJQUNmLDRCQUFhOztJQUNiLDRCQUFhOzs7OztBQUdqQix5Q0FLQzs7O0lBSkcsMENBQW9COztJQUNwQixvQ0FBYzs7SUFDZCxxQ0FBZTs7SUFDZixzQ0FBZ0I7Ozs7O0FBR3BCLHFDQUdDOzs7SUFGRywrQkFBc0I7O0lBQ3RCLGtDQUFnQjs7OztJQUloQixVQUFXLFVBQVU7SUFDckIsWUFBYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRXZlbnRCdXMgZnJvbSAndmVydHgzLWV2ZW50YnVzLWNsaWVudCc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBWZXJ0eFNvY2tldCB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaGVhZGVyczogYW55O1xuICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgc29ja2V0OiBFdmVudEJ1cztcbiAgICBvblN0YXRlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICBvbk1lc3NhZ2UgPSBuZXcgU3ViamVjdDxWZXJ0eE1lc3NhZ2U+KCk7XG4gICAgb25NZXNzYWdlT25saW5lID0gbmV3IFN1YmplY3Q8VmVydHhPbmxpbmVEYXRhPigpO1xuICAgIHJlYWR5U3RhdGU6IFZlcnR4U29ja2V0U3RhdGUgPSBWZXJ0eFNvY2tldFN0YXRlLlVOU0VUO1xuICAgIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuXG4gICAgZ2V0IHVuc2V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLlVOU0VUO1xuICAgIH1cblxuICAgIGdldCBjbG9zZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VEO1xuICAgIH1cblxuICAgIGdldCBjb25uZWN0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLkNPTk5FQ1RJTkc7XG4gICAgfVxuXG4gICAgZ2V0IGNvbm5lY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gVmVydHhTb2NrZXRTdGF0ZS5DT05ORUNURUQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IodXNlcm5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBhbnkpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnMgfHwge307XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVuc2V0KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NvY2tldCBpcyBpbml0aWFsZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZShWZXJ0eFNvY2tldFN0YXRlLkNPTk5FQ1RJTkcpO1xuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBFdmVudEJ1cyh0aGlzLnVybCwge1xuICAgICAgICAgICAgdHJhbnNwb3J0czogJ3dlYnNvY2tldCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoYW5uZWwgcmVjZWl2ZSBjaGF0IG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnJlZ2lzdGVySGFuZGxlcih0aGlzLnVzZXJuYW1lLCB0aGlzLmhlYWRlcnMsIChlcnIsIG1zZzogVmVydHhSZWNlaXZlRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UubmV4dChtc2cuYm9keSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIENoYW5uZWwgcmVjZWl2ZSBvbmxpbmUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQucmVnaXN0ZXJIYW5kbGVyKCduZXdzLWZlZWQnLCB0aGlzLmhlYWRlcnMsIChlcnIsIG1zZzogVmVydHhSZWNlaXZlRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2VPbmxpbmUubmV4dCg8VmVydHhPbmxpbmVEYXRhPm1zZy5ib2R5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQ29ubmVjdGVkXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ09OTkVDVEVEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9IChlKSA9PiB0aGlzLl9jbG9zZShlKTtcbiAgICB9XG5cbiAgICBzZW5kKGFkZHJlc3M6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdTb2NrZXQgaXMgbm90IGNvbm5lY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ja2V0LnB1Ymxpc2goYWRkcmVzcywgbWVzc2FnZSB8fCAnJyk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2Uoc3RhdGU6IFZlcnR4U29ja2V0U3RhdGUpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZS5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xvc2UobWVzc2FnZT86IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU29ja2V0IGlzIGNsb3NlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VEKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZU9ubGluZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gVmVydHhTb2NrZXRTdGF0ZSB7XG4gICAgVU5BVkFJTEFCTEUgPSAnVU5BVkFJTEFCTEUnLFxuICAgIFVOU0VUID0gJ1VOU0VUJyxcbiAgICBDT05ORUNUSU5HID0gJ0NPTk5FQ1RJTkcnLFxuICAgIENPTk5FQ1RFRCA9ICdDT05ORUNURUQnLFxuICAgIENMT1NFRCA9ICdDTE9TRUQnLFxuICAgIFJFX0NPTk5FQ1RJTkcgPSAnUkVfQ09OTkVDVElORydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJ0eFJlY2VpdmVEYXRhIHtcbiAgICB0eXBlOiBzdHJpbmc7IC8vIHJlY1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBib2R5OiBWZXJ0eE1lc3NhZ2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVydHhNZXNzYWdlIHtcbiAgICB1dWlkPzogc3RyaW5nXG4gICAgYXBwbGljYXRpb24/OiBzdHJpbmdcbiAgICBtZXNzYWdlPzogVmVydHhNZXNzYWdlQ29udGVudFxuICAgIHNlbmRlcj86IHN0cmluZ1xuICAgIHNlbnQ/OiBudW1iZXJcbiAgICB0eXBlPzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVydHhNZXNzYWdlQ29udGVudCB7XG4gICAgYXBwbGljYXRpb24/OiBzdHJpbmdcbiAgICBhbGVydD86IHN0cmluZ1xuICAgIHNlbmRlcj86IHN0cmluZ1xuICAgIGNvbnRlbnQ/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJ0eE9ubGluZURhdGEge1xuICAgIHR5cGU6IFZlcnR4T25saW5lVHlwZTtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFZlcnR4T25saW5lVHlwZSB7XG4gICAgcmVnaXN0ZXIgPSAncmVnaXN0ZXInLFxuICAgIHVucmVnaXN0ZXIgPSAndW5yZWdpc3RlcicsXG59XG4iXX0=