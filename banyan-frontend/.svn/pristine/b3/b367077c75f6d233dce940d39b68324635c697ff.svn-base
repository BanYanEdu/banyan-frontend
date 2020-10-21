/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { VertxSocket, VertxSocketState } from "./VertxSocket";
import { Observable, Subject } from "rxjs";
var VertxSocketManager = /** @class */ (function () {
    function VertxSocketManager(headers, connectTimeout, sendTimeout) {
        if (headers === void 0) { headers = {}; }
        if (connectTimeout === void 0) { connectTimeout = 10000; }
        if (sendTimeout === void 0) { sendTimeout = 10000; }
        this.onStateChange = new Subject();
        this.onMessage = new Subject();
        this.onMessageOnline = new Subject();
        this.readyState = VertxSocketState.CONNECTING;
        this._queue = [];
        this._reconnectTime = 3000;
        this._reconnectMax = 5;
        this._reconnectCount = 0;
        this.connectTimeout = connectTimeout;
        this.sendTimeout = sendTimeout;
        this._connect();
    }
    Object.defineProperty(VertxSocketManager.prototype, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.CONNECTING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocketManager.prototype, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.CONNECTED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocketManager.prototype, "closed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocketManager.prototype, "reconnecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.RE_CONNECTING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertxSocketManager.prototype, "unavailable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === VertxSocketState.UNAVAILABLE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    VertxSocketManager.prototype.send = /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    function (address, message) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            if (_this.connected) {
                _this._send(address, message, subscriber);
            }
            else {
                _this._addOnQueue(new VertxMessageQueue(address, message, subscriber));
            }
        }));
    };
    /**
     * @return {?}
     */
    VertxSocketManager.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this.closed) {
            return;
        }
        this._stopReconnect();
        this._stateChange(VertxSocketState.CLOSED);
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
        this.onStateChange.unsubscribe();
        this.onMessage.unsubscribe();
        this.onMessageOnline.unsubscribe();
    };
    /**
     * @return {?}
     */
    VertxSocketManager.prototype.reconnect = /**
     * @return {?}
     */
    function () {
        if (!this.closed) {
            return;
        }
        this._reconnect();
    };
    /**
     * @private
     * @param {?} address
     * @param {?} message
     * @param {?} subscriber
     * @return {?}
     */
    VertxSocketManager.prototype._send = /**
     * @private
     * @param {?} address
     * @param {?} message
     * @param {?} subscriber
     * @return {?}
     */
    function (address, message, subscriber) {
        this._socket.send(address, message);
        subscriber.next(true);
    };
    /**
     * @private
     * @param {?} msg
     * @return {?}
     */
    VertxSocketManager.prototype._addOnQueue = /**
     * @private
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        var _this = this;
        this._queue.push(msg);
        // message could not be send
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this._queue.indexOf(msg) !== -1) {
                _this._queue.splice(_this._queue.indexOf(msg), 1);
                msg.subscriber.next(false);
            }
        }), this.sendTimeout);
    };
    // Connect success and ready to send
    // Connect success and ready to send
    /**
     * @private
     * @return {?}
     */
    VertxSocketManager.prototype._onConnected = 
    // Connect success and ready to send
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Send message retain on queue
        this._queue.forEach((/**
         * @param {?} msg
         * @return {?}
         */
        function (msg) { return _this._send(msg.address, msg.message, msg.subscriber); }));
        this._queue.length = 0;
        this._stopReconnect();
    };
    /**
     * @private
     * @param {?} state
     * @param {?=} message
     * @return {?}
     */
    VertxSocketManager.prototype._stateChange = /**
     * @private
     * @param {?} state
     * @param {?=} message
     * @return {?}
     */
    function (state, message) {
        if (message === void 0) { message = ''; }
        this.readyState = state;
        this.message = message;
        this.onStateChange.next();
        if (this.connected) {
            this._onConnected();
        }
    };
    /**
     * @private
     * @return {?}
     */
    VertxSocketManager.prototype._connect = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._loadVertxInfo((/**
         * @param {?} username
         * @param {?} url
         * @param {?} headers
         * @return {?}
         */
        function (username, url, headers) {
            _this._socket = new VertxSocket(username, url, headers);
            _this._socket.onStateChange.subscribe((/**
             * @return {?}
             */
            function () { return _this._socketStateChange(); }));
            _this._socket.onMessage.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return _this.onMessage.next(message); }));
            _this._socket.onMessageOnline.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return _this.onMessageOnline.next(message); }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    VertxSocketManager.prototype._socketStateChange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._socket.connected) {
            this._stateChange(VertxSocketState.CONNECTED);
        }
        else if (this._socket.closed) {
            this._reconnect();
        }
    };
    /**
     * @private
     * @return {?}
     */
    VertxSocketManager.prototype._reconnect = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.reconnecting) {
            this._reconnectCount = 0;
            this._stateChange(VertxSocketState.RE_CONNECTING);
        }
        if (this._reconnectCount > this._reconnectMax) {
            this._stateChange(VertxSocketState.CLOSED);
            return;
        }
        this._reconnectTimer = setTimeout((/**
         * @return {?}
         */
        function () {
            _this._connect();
            _this._reconnectCount++;
        }), this._reconnectTime);
    };
    /**
     * @private
     * @return {?}
     */
    VertxSocketManager.prototype._stopReconnect = /**
     * @private
     * @return {?}
     */
    function () {
        this._reconnectCount = 0;
        clearTimeout(this._reconnectTimer);
    };
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    VertxSocketManager.prototype._loadVertxInfo = /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        this._loadUserInfo((/**
         * @param {?} username
         * @return {?}
         */
        function (username) {
            if (username) {
                _this._loadVertxRegisterInfo((/**
                 * @param {?} url
                 * @param {?} headers
                 * @return {?}
                 */
                function (url, headers) {
                    if (url) {
                        callback(username, url, headers);
                    }
                    else {
                        _this._stateChange(VertxSocketState.UNAVAILABLE);
                    }
                }));
            }
            else {
                _this._stateChange(VertxSocketState.UNAVAILABLE);
            }
        }));
    };
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    VertxSocketManager.prototype._loadUserInfo = /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        if (this._username) {
            return callback(this._username);
        }
        $.ajax({
            url: iNet.getPUrl('system/userprofile/view'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this._username = data && data.user && (data.user.usercode || data.user.username) || '';
                callback(_this._username);
            }),
            error: (/**
             * @return {?}
             */
            function () {
                _this._stateChange(VertxSocketState.CLOSED, VertxSocketError.LOAD_USER);
                callback(null);
            })
        });
    };
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    VertxSocketManager.prototype._loadVertxRegisterInfo = /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        $.ajax({
            url: iNet.getPUrl('account/register'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data && data.length === 2) {
                    /** @type {?} */
                    var vertxUrl = data[0];
                    /** @type {?} */
                    var headers = $.extend({}, _this.headers, { keyapi: data[1] });
                    callback(vertxUrl, headers);
                }
                else {
                    _this._stateChange(VertxSocketState.CLOSED, VertxSocketError.REGISTER_USER);
                    callback(null);
                }
            }),
            error: (/**
             * @return {?}
             */
            function () {
                _this._stateChange(VertxSocketState.CLOSED, VertxSocketError.REGISTER_USER);
                callback(null);
            })
        });
    };
    return VertxSocketManager;
}());
export { VertxSocketManager };
if (false) {
    /** @type {?} */
    VertxSocketManager.prototype.headers;
    /** @type {?} */
    VertxSocketManager.prototype.sendTimeout;
    /** @type {?} */
    VertxSocketManager.prototype.connectTimeout;
    /** @type {?} */
    VertxSocketManager.prototype.onStateChange;
    /** @type {?} */
    VertxSocketManager.prototype.onMessage;
    /** @type {?} */
    VertxSocketManager.prototype.onMessageOnline;
    /** @type {?} */
    VertxSocketManager.prototype.readyState;
    /** @type {?} */
    VertxSocketManager.prototype.message;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._socket;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._queue;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._username;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._reconnectTimer;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._reconnectTime;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._reconnectMax;
    /**
     * @type {?}
     * @private
     */
    VertxSocketManager.prototype._reconnectCount;
}
/** @enum {string} */
var VertxSocketError = {
    LOAD_USER: 'LOAD_USER_FAILED',
    REGISTER_USER: 'REGISTER_USER_FAILED',
};
export { VertxSocketError };
var VertxMessageQueue = /** @class */ (function () {
    function VertxMessageQueue(address, message, subscriber) {
        this.address = address;
        this.message = message;
        this.subscriber = subscriber;
    }
    return VertxMessageQueue;
}());
if (false) {
    /** @type {?} */
    VertxMessageQueue.prototype.address;
    /** @type {?} */
    VertxMessageQueue.prototype.message;
    /** @type {?} */
    VertxMessageQueue.prototype.subscriber;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVydHhTb2NrZXRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3ZlcnR4L1ZlcnR4U29ja2V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFLckQ7SUFxQ0ksNEJBQVksT0FBaUIsRUFDakIsY0FBOEIsRUFDOUIsV0FBMkI7UUFGM0Isd0JBQUEsRUFBQSxZQUFpQjtRQUNqQiwrQkFBQSxFQUFBLHNCQUE4QjtRQUM5Qiw0QkFBQSxFQUFBLG1CQUEyQjtRQW5DdkMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzlCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4QyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELGVBQVUsR0FBcUIsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1FBR25ELFdBQU0sR0FBd0IsRUFBRSxDQUFDO1FBR2pDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBeUJ4QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQTFCRCxzQkFBSSwwQ0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHlDQUFTOzs7O1FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssZ0JB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QUFhOztJQUNiLHlDQUFvQjs7SUFDcEIsNENBQXVCOztJQUN2QiwyQ0FBOEI7O0lBQzlCLHVDQUF3Qzs7SUFDeEMsNkNBQWlEOztJQUNqRCx3Q0FBMkQ7O0lBQzNELHFDQUFnQjs7Ozs7SUFDaEIscUNBQTZCOzs7OztJQUM3QixvQ0FBeUM7Ozs7O0lBQ3pDLHVDQUEwQjs7Ozs7SUFDMUIsNkNBQXdCOzs7OztJQUN4Qiw0Q0FBOEI7Ozs7O0lBQzlCLDJDQUEwQjs7Ozs7SUFDMUIsNkNBQTRCOzs7O0lBMkw1QixXQUFZLGtCQUFrQjtJQUM5QixlQUFnQixzQkFBc0I7OztBQUcxQztJQUlJLDJCQUFZLE9BQWUsRUFBRSxPQUFlLEVBQUUsVUFBK0I7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7OztJQVJHLG9DQUFnQjs7SUFDaEIsb0NBQWdCOztJQUNoQix1Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZlcnR4TWVzc2FnZSwgVmVydHhPbmxpbmVEYXRhLCBWZXJ0eFNvY2tldCwgVmVydHhTb2NrZXRTdGF0ZX0gZnJvbSBcIi4vVmVydHhTb2NrZXRcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaWJlcn0gZnJvbSBcInJ4anNcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgVmVydHhTb2NrZXRNYW5hZ2VyIHtcbiAgICBoZWFkZXJzOiBhbnk7XG4gICAgc2VuZFRpbWVvdXQ6IG51bWJlcjtcbiAgICBjb25uZWN0VGltZW91dDogbnVtYmVyO1xuICAgIG9uU3RhdGVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgIG9uTWVzc2FnZSA9IG5ldyBTdWJqZWN0PFZlcnR4TWVzc2FnZT4oKTtcbiAgICBvbk1lc3NhZ2VPbmxpbmUgPSBuZXcgU3ViamVjdDxWZXJ0eE9ubGluZURhdGE+KCk7XG4gICAgcmVhZHlTdGF0ZTogVmVydHhTb2NrZXRTdGF0ZSA9IFZlcnR4U29ja2V0U3RhdGUuQ09OTkVDVElORztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfc29ja2V0OiBWZXJ0eFNvY2tldDtcbiAgICBwcml2YXRlIF9xdWV1ZTogVmVydHhNZXNzYWdlUXVldWVbXSA9IFtdO1xuICAgIHByaXZhdGUgX3VzZXJuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcmVjb25uZWN0VGltZXI7XG4gICAgcHJpdmF0ZSBfcmVjb25uZWN0VGltZSA9IDMwMDA7XG4gICAgcHJpdmF0ZSBfcmVjb25uZWN0TWF4ID0gNTtcbiAgICBwcml2YXRlIF9yZWNvbm5lY3RDb3VudCA9IDA7XG5cbiAgICBnZXQgY29ubmVjdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gVmVydHhTb2NrZXRTdGF0ZS5DT05ORUNUSU5HO1xuICAgIH1cblxuICAgIGdldCBjb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuQ09OTkVDVEVEO1xuICAgIH1cblxuICAgIGdldCBjbG9zZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VEO1xuICAgIH1cblxuICAgIGdldCByZWNvbm5lY3RpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuUkVfQ09OTkVDVElORztcbiAgICB9XG5cbiAgICBnZXQgdW5hdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuVU5BVkFJTEFCTEU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoaGVhZGVyczogYW55ID0ge30sXG4gICAgICAgICAgICAgICAgY29ubmVjdFRpbWVvdXQ6IG51bWJlciA9IDEwMDAwLFxuICAgICAgICAgICAgICAgIHNlbmRUaW1lb3V0OiBudW1iZXIgPSAxMDAwMCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RUaW1lb3V0ID0gY29ubmVjdFRpbWVvdXQ7XG4gICAgICAgIHRoaXMuc2VuZFRpbWVvdXQgPSBzZW5kVGltZW91dDtcbiAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHNlbmQoYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZW5kKGFkZHJlc3MsIG1lc3NhZ2UsIHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRPblF1ZXVlKG5ldyBWZXJ0eE1lc3NhZ2VRdWV1ZShhZGRyZXNzLCBtZXNzYWdlLCBzdWJzY3JpYmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9wUmVjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VEKTtcbiAgICAgICAgaWYgKHRoaXMuX3NvY2tldCkge1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZU9ubGluZS51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbmQoYWRkcmVzcywgbWVzc2FnZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLl9zb2NrZXQuc2VuZChhZGRyZXNzLCBtZXNzYWdlKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZE9uUXVldWUobXNnOiBWZXJ0eE1lc3NhZ2VRdWV1ZSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5wdXNoKG1zZyk7XG4gICAgICAgIC8vIG1lc3NhZ2UgY291bGQgbm90IGJlIHNlbmRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcXVldWUuaW5kZXhPZihtc2cpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnNwbGljZSh0aGlzLl9xdWV1ZS5pbmRleE9mKG1zZyksIDEpO1xuICAgICAgICAgICAgICAgIG1zZy5zdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLnNlbmRUaW1lb3V0KTtcbiAgICB9XG5cbiAgICAvLyBDb25uZWN0IHN1Y2Nlc3MgYW5kIHJlYWR5IHRvIHNlbmRcbiAgICBwcml2YXRlIF9vbkNvbm5lY3RlZCgpIHtcbiAgICAgICAgLy8gU2VuZCBtZXNzYWdlIHJldGFpbiBvbiBxdWV1ZVxuICAgICAgICB0aGlzLl9xdWV1ZS5mb3JFYWNoKChtc2cpID0+IHRoaXMuX3NlbmQobXNnLmFkZHJlc3MsIG1zZy5tZXNzYWdlLCBtc2cuc3Vic2NyaWJlcikpO1xuICAgICAgICB0aGlzLl9xdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9zdG9wUmVjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2Uoc3RhdGU6IFZlcnR4U29ja2V0U3RhdGUsIG1lc3NhZ2U6IHN0cmluZyA9ICcnKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UubmV4dCgpO1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX29uQ29ubmVjdGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9sb2FkVmVydHhJbmZvKCh1c2VybmFtZSwgdXJsLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQgPSBuZXcgVmVydHhTb2NrZXQodXNlcm5hbWUsIHVybCwgaGVhZGVycyk7XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQub25TdGF0ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc29ja2V0U3RhdGVDaGFuZ2UoKSk7XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQub25NZXNzYWdlLnN1YnNjcmliZSgobWVzc2FnZSkgPT4gdGhpcy5vbk1lc3NhZ2UubmV4dChtZXNzYWdlKSk7XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQub25NZXNzYWdlT25saW5lLnN1YnNjcmliZSgobWVzc2FnZSkgPT4gdGhpcy5vbk1lc3NhZ2VPbmxpbmUubmV4dChtZXNzYWdlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NvY2tldFN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5fc29ja2V0LmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5DT05ORUNURUQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NvY2tldC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMucmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZShWZXJ0eFNvY2tldFN0YXRlLlJFX0NPTk5FQ1RJTkcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZWNvbm5lY3RDb3VudCA+IHRoaXMuX3JlY29ubmVjdE1heCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5DTE9TRUQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RDb3VudCsrO1xuICAgICAgICB9LCB0aGlzLl9yZWNvbm5lY3RUaW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdG9wUmVjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RDb3VudCA9IDA7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZWNvbm5lY3RUaW1lcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZFZlcnR4SW5mbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fbG9hZFVzZXJJbmZvKCh1c2VybmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkVmVydHhSZWdpc3RlckluZm8oKHVybDogc3RyaW5nLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJuYW1lLCB1cmwsIGhlYWRlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5VTkFWQUlMQUJMRSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5VTkFWQUlMQUJMRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRVc2VySW5mbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5fdXNlcm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGlOZXQuZ2V0UFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3ZpZXcnKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlcm5hbWUgPSBkYXRhICYmIGRhdGEudXNlciAmJiAoZGF0YS51c2VyLnVzZXJjb2RlIHx8IGRhdGEudXNlci51c2VybmFtZSkgfHwgJyc7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fdXNlcm5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5DTE9TRUQsIFZlcnR4U29ja2V0RXJyb3IuTE9BRF9VU0VSKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZFZlcnR4UmVnaXN0ZXJJbmZvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBpTmV0LmdldFBVcmwoJ2FjY291bnQvcmVnaXN0ZXInKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZlcnR4VXJsID0gZGF0YVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5oZWFkZXJzLCB7a2V5YXBpOiBkYXRhWzFdfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHZlcnR4VXJsLCBoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZShWZXJ0eFNvY2tldFN0YXRlLkNMT1NFRCwgVmVydHhTb2NrZXRFcnJvci5SRUdJU1RFUl9VU0VSKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5DTE9TRUQsIFZlcnR4U29ja2V0RXJyb3IuUkVHSVNURVJfVVNFUik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gVmVydHhTb2NrZXRFcnJvciB7XG4gICAgTE9BRF9VU0VSID0gJ0xPQURfVVNFUl9GQUlMRUQnLFxuICAgIFJFR0lTVEVSX1VTRVIgPSAnUkVHSVNURVJfVVNFUl9GQUlMRUQnXG59XG5cbmNsYXNzIFZlcnR4TWVzc2FnZVF1ZXVlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj47XG4gICAgY29uc3RydWN0b3IoYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pIHtcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzcztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyID0gc3Vic2NyaWJlcjtcbiAgICB9XG59Il19