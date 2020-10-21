/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as EventBus from 'vertx3-eventbus-client';
import { Subject } from "rxjs";
var VertxSocket = /** @class */ (function () {
    function VertxSocket(username, url, headers) {
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
    Object.defineProperty(VertxSocket.prototype, "unset", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.UNSET;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocket.prototype, "closed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocket.prototype, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.CONNECTING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocket.prototype, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.CONNECTED;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VertxSocket.prototype.connect = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            // Channel receive chat message
            _this.socket.registerHandler(_this.username, _this.headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            function (err, msg) {
                if (msg) {
                    _this.onMessage.next(msg.body);
                }
            }));
            // Channel receive online message
            _this.socket.registerHandler('news-feed', _this.headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            function (err, msg) {
                if (msg) {
                    _this.onMessageOnline.next((/** @type {?} */ (msg.body)));
                }
            }));
            // Connected
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (!_this.closed) {
                    _this._stateChange(VertxSocketState.CONNECTED);
                }
            }), 1000);
        });
        this.socket.onclose = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this._close(e); });
    };
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    VertxSocket.prototype.send = /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    function (address, message) {
        if (!this.connected) {
            throw Error('Socket is not connected');
        }
        this.socket.publish(address, message || '');
    };
    /**
     * @return {?}
     */
    VertxSocket.prototype.close = /**
     * @return {?}
     */
    function () {
        this._close();
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    VertxSocket.prototype._stateChange = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.readyState = state;
        this.onStateChange.next();
    };
    /**
     * @private
     * @param {?=} message
     * @return {?}
     */
    VertxSocket.prototype._close = /**
     * @private
     * @param {?=} message
     * @return {?}
     */
    function (message) {
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
    };
    return VertxSocket;
}());
export { VertxSocket };
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
var VertxSocketState = {
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
var VertxOnlineType = {
    register: 'register',
    unregister: 'unregister',
};
export { VertxOnlineType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVydHhTb2NrZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvdmVydHgvVmVydHhTb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3QjtJQTJCSSxxQkFBWSxRQUFnQixFQUNoQixHQUFXLEVBQ1gsT0FBWTtRQXhCeEIsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzlCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4QyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELGVBQVUsR0FBcUIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ3RELFlBQU8sR0FBVyxFQUFFLENBQUM7UUFxQmpCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBdkJELHNCQUFJLDhCQUFLOzs7O1FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0JBQU07Ozs7UUFBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDdkQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtQ0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFTOzs7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Q0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QjtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFyR0QsSUFxR0M7Ozs7SUFwR0csMEJBQVk7O0lBQ1osOEJBQWE7O0lBQ2IsK0JBQWlCOztJQUNqQiw2QkFBaUI7O0lBQ2pCLG9DQUE4Qjs7SUFDOUIsZ0NBQXdDOztJQUN4QyxzQ0FBaUQ7O0lBQ2pELGlDQUFzRDs7SUFDdEQsOEJBQXFCOzs7O0lBK0ZyQixhQUFjLGFBQWE7SUFDM0IsT0FBUSxPQUFPO0lBQ2YsWUFBYSxZQUFZO0lBQ3pCLFdBQVksV0FBVztJQUN2QixRQUFTLFFBQVE7SUFDakIsZUFBZ0IsZUFBZTs7Ozs7O0FBR25DLHNDQUlDOzs7SUFIRyxnQ0FBYTs7SUFDYixtQ0FBZ0I7O0lBQ2hCLGdDQUFtQjs7Ozs7QUFHdkIsa0NBT0M7OztJQU5HLDRCQUFhOztJQUNiLG1DQUFvQjs7SUFDcEIsK0JBQTZCOztJQUM3Qiw4QkFBZTs7SUFDZiw0QkFBYTs7SUFDYiw0QkFBYTs7Ozs7QUFHakIseUNBS0M7OztJQUpHLDBDQUFvQjs7SUFDcEIsb0NBQWM7O0lBQ2QscUNBQWU7O0lBQ2Ysc0NBQWdCOzs7OztBQUdwQixxQ0FHQzs7O0lBRkcsK0JBQXNCOztJQUN0QixrQ0FBZ0I7Ozs7SUFJaEIsVUFBVyxVQUFVO0lBQ3JCLFlBQWEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV2ZW50QnVzIGZyb20gJ3ZlcnR4My1ldmVudGJ1cy1jbGllbnQnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVydHhTb2NrZXQge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGhlYWRlcnM6IGFueTtcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIHNvY2tldDogRXZlbnRCdXM7XG4gICAgb25TdGF0ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25NZXNzYWdlID0gbmV3IFN1YmplY3Q8VmVydHhNZXNzYWdlPigpO1xuICAgIG9uTWVzc2FnZU9ubGluZSA9IG5ldyBTdWJqZWN0PFZlcnR4T25saW5lRGF0YT4oKTtcbiAgICByZWFkeVN0YXRlOiBWZXJ0eFNvY2tldFN0YXRlID0gVmVydHhTb2NrZXRTdGF0ZS5VTlNFVDtcbiAgICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcblxuICAgIGdldCB1bnNldCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gVmVydHhTb2NrZXRTdGF0ZS5VTlNFVDtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLkNMT1NFRDtcbiAgICB9XG5cbiAgICBnZXQgY29ubmVjdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gVmVydHhTb2NrZXRTdGF0ZS5DT05ORUNUSU5HO1xuICAgIH1cblxuICAgIGdldCBjb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuQ09OTkVDVEVEO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHVzZXJuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogYW55KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzIHx8IHt9O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy51bnNldCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdTb2NrZXQgaXMgaW5pdGlhbGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5DT05ORUNUSU5HKTtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgRXZlbnRCdXModGhpcy51cmwsIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6ICd3ZWJzb2NrZXQnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDaGFubmVsIHJlY2VpdmUgY2hhdCBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5yZWdpc3RlckhhbmRsZXIodGhpcy51c2VybmFtZSwgdGhpcy5oZWFkZXJzLCAoZXJyLCBtc2c6IFZlcnR4UmVjZWl2ZURhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlLm5leHQobXNnLmJvZHkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDaGFubmVsIHJlY2VpdmUgb25saW5lIG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnJlZ2lzdGVySGFuZGxlcignbmV3cy1mZWVkJywgdGhpcy5oZWFkZXJzLCAoZXJyLCBtc2c6IFZlcnR4UmVjZWl2ZURhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlT25saW5lLm5leHQoPFZlcnR4T25saW5lRGF0YT5tc2cuYm9keSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIENvbm5lY3RlZFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZShWZXJ0eFNvY2tldFN0YXRlLkNPTk5FQ1RFRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSAoZSkgPT4gdGhpcy5fY2xvc2UoZSk7XG4gICAgfVxuXG4gICAgc2VuZChhZGRyZXNzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignU29ja2V0IGlzIG5vdCBjb25uZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvY2tldC5wdWJsaXNoKGFkZHJlc3MsIG1lc3NhZ2UgfHwgJycpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbG9zZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N0YXRlQ2hhbmdlKHN0YXRlOiBWZXJ0eFNvY2tldFN0YXRlKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Nsb3NlKG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NvY2tldCBpcyBjbG9zZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZShWZXJ0eFNvY2tldFN0YXRlLkNMT1NFRCk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2VPbmxpbmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIFZlcnR4U29ja2V0U3RhdGUge1xuICAgIFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJyxcbiAgICBVTlNFVCA9ICdVTlNFVCcsXG4gICAgQ09OTkVDVElORyA9ICdDT05ORUNUSU5HJyxcbiAgICBDT05ORUNURUQgPSAnQ09OTkVDVEVEJyxcbiAgICBDTE9TRUQgPSAnQ0xPU0VEJyxcbiAgICBSRV9DT05ORUNUSU5HID0gJ1JFX0NPTk5FQ1RJTkcnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVydHhSZWNlaXZlRGF0YSB7XG4gICAgdHlwZTogc3RyaW5nOyAvLyByZWNcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgYm9keTogVmVydHhNZXNzYWdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnR4TWVzc2FnZSB7XG4gICAgdXVpZD86IHN0cmluZ1xuICAgIGFwcGxpY2F0aW9uPzogc3RyaW5nXG4gICAgbWVzc2FnZT86IFZlcnR4TWVzc2FnZUNvbnRlbnRcbiAgICBzZW5kZXI/OiBzdHJpbmdcbiAgICBzZW50PzogbnVtYmVyXG4gICAgdHlwZT86IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnR4TWVzc2FnZUNvbnRlbnQge1xuICAgIGFwcGxpY2F0aW9uPzogc3RyaW5nXG4gICAgYWxlcnQ/OiBzdHJpbmdcbiAgICBzZW5kZXI/OiBzdHJpbmdcbiAgICBjb250ZW50Pzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVydHhPbmxpbmVEYXRhIHtcbiAgICB0eXBlOiBWZXJ0eE9ubGluZVR5cGU7XG4gICAgYWRkcmVzczogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBWZXJ0eE9ubGluZVR5cGUge1xuICAgIHJlZ2lzdGVyID0gJ3JlZ2lzdGVyJyxcbiAgICB1bnJlZ2lzdGVyID0gJ3VucmVnaXN0ZXInLFxufVxuIl19