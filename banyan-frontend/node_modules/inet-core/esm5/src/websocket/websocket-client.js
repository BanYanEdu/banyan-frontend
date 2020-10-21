/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { WebSocketEnvelop, EnvelopBody, EnvelopMessage } from './websocket-abstract';
import { WebSocketJboss } from './websocket-jboss';
import { WebSocketVertx } from './websocket-vertx';
import { Subject } from 'rxjs';
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient() {
        var _this = this;
        // message from socket server
        this.onMessage = new Subject();
        // socket state change
        this.onStateChange = new Subject();
        // envelop send will be timeout after 30s
        this.sendTimeout = 30000;
        this._autoconnectAfter = 5000; // 5s
        // 5s
        this._autoconnectRepeat = 4; // 5 times
        // 5 times
        this._autoconnectRetryAfter = 30000; // 30s
        this._envelopQueue = [];
        if (!WebSocketClient.instance) {
            this._getAccountInfo((/**
             * @return {?}
             */
            function () { return _this._register(); }));
        }
        return WebSocketClient.instance = WebSocketClient.instance || this;
    }
    Object.defineProperty(WebSocketClient.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.readyState : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.CONNECTING || this.readyState === null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.OPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "closing", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.CLOSING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "closed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "autoconnect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoconnect;
        },
        enumerable: true,
        configurable: true
    });
    // close websocket client
    // close websocket client
    /**
     * @return {?}
     */
    WebSocketClient.prototype.close = 
    // close websocket client
    /**
     * @return {?}
     */
    function () {
        this.socket.close();
    };
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @return {?}
     */
    WebSocketClient.prototype.send = /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @return {?}
     */
    function (address, message, application) {
        if (application === void 0) { application = ''; }
        return this.sendEnvelop(this.buildEnvelop(address, message, application));
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    WebSocketClient.prototype.sendEnvelop = /**
     * @param {?} envelop
     * @return {?}
     */
    function (envelop) {
        var _this = this;
        if (this.connected) {
            return this.socket.send(envelop);
        }
        else {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                // Add to queue and waiting socket connected to send
                /** @type {?} */
                var data = {
                    e: envelop,
                    f: resolve
                };
                data.timer = setTimeout((/**
                 * @return {?}
                 */
                function () { return _this._completeEnvelopQueue(data, false); }), _this.sendTimeout);
                _this._envelopQueue.push(data);
            }));
        }
    };
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @param {?=} join
     * @return {?}
     */
    WebSocketClient.prototype.buildEnvelop = /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @param {?=} join
     * @return {?}
     */
    function (address, message, application, join) {
        if (application === void 0) { application = ''; }
        /** @type {?} */
        var envelop = new WebSocketEnvelop();
        envelop.address = address;
        envelop.body = new EnvelopBody();
        envelop.body.application = application;
        envelop.body.sender = this._username;
        envelop.body.alias = [address];
        envelop.body.message = new EnvelopMessage(this._username, message, join || '');
        return envelop;
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._sendEnvelopQueue = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._envelopQueue.forEach((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.sendEnvelop(data.e).then((/**
             * @param {?} status
             * @return {?}
             */
            function (status) { return _this._completeEnvelopQueue(data, status); }));
        }));
    };
    /**
     * @private
     * @param {?} data
     * @param {?} status
     * @return {?}
     */
    WebSocketClient.prototype._completeEnvelopQueue = /**
     * @private
     * @param {?} data
     * @param {?} status
     * @return {?}
     */
    function (data, status) {
        /** @type {?} */
        var index = this._envelopQueue.indexOf(data);
        if (index >= 0) {
            this._envelopQueue.splice(index, 1);
        }
        data.f(status);
    };
    /**
     * @private
     * @param {?=} callback
     * @return {?}
     */
    WebSocketClient.prototype._register = /**
     * @private
     * @param {?=} callback
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
                if (typeof data === 'string') {
                    _this.socket = new WebSocketJboss(data, _this._username);
                }
                else {
                    _this.socket = new WebSocketVertx(data, _this._username);
                }
                _this.socket.onStateChange.subscribe((/**
                 * @return {?}
                 */
                function () { return _this._stateChange(); }));
                _this.socket.onMessage.subscribe((/**
                 * @param {?} body
                 * @return {?}
                 */
                function (body) {
                    _this.onMessage.next(body);
                }));
                callback && callback();
            }),
            error: (/**
             * @return {?}
             */
            function () {
                callback && callback();
                throw new Error("Account register error");
            })
        });
    };
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    WebSocketClient.prototype._getAccountInfo = /**
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
            function () { return callback(null); })
        });
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._stateChange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.closed && !this.autoconnect) {
            this._runAutoConnect();
        }
        if (this._autoconnect) {
            return;
        }
        if (this.connected) {
            this._sendEnvelopQueue();
        }
        this._cancelAutoConnect();
        this.onStateChange.next();
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._runAutoConnect = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._autoconnect = true;
        this._autoconectTimer = setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.connected) {
                _this._cancelAutoConnect();
                return;
            }
            if (_this._autoconectCount >= _this._autoconnectRepeat) {
                _this._cancelAutoConnect();
                // Sleep and retry connect after 30s
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this._runAutoConnect(); }), _this._autoconnectRetryAfter);
                return;
            }
            _this._register((/**
             * @return {?}
             */
            function () {
                _this._autoconectCount++;
                if (!_this.connected) {
                    _this._runAutoConnect();
                }
            }));
        }), this._autoconnectAfter);
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._cancelAutoConnect = /**
     * @private
     * @return {?}
     */
    function () {
        this._autoconnect = false;
        this._autoconectCount = 0;
        clearTimeout(this._autoconectTimer);
    };
    WebSocketClient.instance = null;
    return WebSocketClient;
}());
export { WebSocketClient };
if (false) {
    /** @type {?} */
    WebSocketClient.instance;
    /** @type {?} */
    WebSocketClient.prototype.socket;
    /** @type {?} */
    WebSocketClient.prototype.onMessage;
    /** @type {?} */
    WebSocketClient.prototype.onStateChange;
    /** @type {?} */
    WebSocketClient.prototype.sendTimeout;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._username;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnect;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnectAfter;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnectRepeat;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnectRetryAfter;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconectCount;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconectTimer;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._envelopQueue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy93ZWJzb2NrZXQvd2Vic29ja2V0LWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFxQixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CO0lBMENJO1FBQUEsaUJBT0M7O1FBN0NELGNBQVMsR0FBeUIsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7UUFFaEQsa0JBQWEsR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7UUFFNUMsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFHcEIsc0JBQWlCLEdBQVcsSUFBSSxDQUFDLENBQUMsS0FBSzs7UUFDdkMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVTs7UUFDMUMsMkJBQXNCLEdBQVcsS0FBSyxDQUFDLENBQUMsTUFBTTtRQUc5QyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQTJCdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGVBQWU7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQWhCLENBQWdCLEVBQUMsQ0FBQztTQUNoRDtRQUNELE9BQU8sZUFBZSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUd2RSxDQUFDO0lBL0JELHNCQUFJLHVDQUFVOzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFD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LENBQUM7Ozs7O0lBRU8sNENBQWtCOzs7O0lBQTFCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUMxQixZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQWxMTSx3QkFBUSxHQUFvQixJQUFJLENBQUM7SUFtTDVDLHNCQUFDO0NBQUEsQUFwTEQsSUFvTEM7U0FwTFksZUFBZTs7O0lBQ3hCLHlCQUF3Qzs7SUFDeEMsaUNBQTBCOztJQUUxQixvQ0FBZ0Q7O0lBRWhELHdDQUE0Qzs7SUFFNUMsc0NBQTRCOzs7OztJQUM1QixvQ0FBMEI7Ozs7O0lBQzFCLHVDQUE4Qjs7Ozs7SUFDOUIsNENBQXlDOzs7OztJQUN6Qyw2Q0FBdUM7Ozs7O0lBQ3ZDLGlEQUErQzs7Ozs7SUFDL0MsMkNBQWlDOzs7OztJQUNqQywyQ0FBOEI7Ozs7O0lBQzlCLHdDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdlYlNvY2tldEFic3RyYWN0LCBXZWJTb2NrZXRFbnZlbG9wLCBFbnZlbG9wQm9keSwgRW52ZWxvcE1lc3NhZ2UgfSBmcm9tICcuL3dlYnNvY2tldC1hYnN0cmFjdCc7XG5pbXBvcnQgeyBXZWJTb2NrZXRKYm9zcyB9IGZyb20gJy4vd2Vic29ja2V0LWpib3NzJztcbmltcG9ydCB7IFdlYlNvY2tldFZlcnR4IH0gZnJvbSAnLi93ZWJzb2NrZXQtdmVydHgnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRDbGllbnQge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogV2ViU29ja2V0Q2xpZW50ID0gbnVsbDtcbiAgICBzb2NrZXQ6IFdlYlNvY2tldEFic3RyYWN0O1xuICAgIC8vIG1lc3NhZ2UgZnJvbSBzb2NrZXQgc2VydmVyXG4gICAgb25NZXNzYWdlOiBTdWJqZWN0PEVudmVsb3BCb2R5PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgLy8gc29ja2V0IHN0YXRlIGNoYW5nZVxuICAgIG9uU3RhdGVDaGFuZ2U6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgLy8gZW52ZWxvcCBzZW5kIHdpbGwgYmUgdGltZW91dCBhZnRlciAzMHNcbiAgICBzZW5kVGltZW91dDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJpdmF0ZSBfdXNlcm5hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9hdXRvY29ubmVjdDogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9hdXRvY29ubmVjdEFmdGVyOiBudW1iZXIgPSA1MDAwOyAvLyA1c1xuICAgIHByaXZhdGUgX2F1dG9jb25uZWN0UmVwZWF0OiBudW1iZXIgPSA0OyAvLyA1IHRpbWVzXG4gICAgcHJpdmF0ZSBfYXV0b2Nvbm5lY3RSZXRyeUFmdGVyOiBudW1iZXIgPSAzMDAwMDsgLy8gMzBzXG4gICAgcHJpdmF0ZSBfYXV0b2NvbmVjdENvdW50OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYXV0b2NvbmVjdFRpbWVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfZW52ZWxvcFF1ZXVlID0gW107XG5cbiAgICBnZXQgcmVhZHlTdGF0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQgPyB0aGlzLnNvY2tldC5yZWFkeVN0YXRlIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgY29ubmVjdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcgfHwgdGhpcy5yZWFkeVN0YXRlID09PSBudWxsO1xuICAgIH1cblxuICAgIGdldCBjb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOO1xuICAgIH1cblxuICAgIGdldCBjbG9zaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEO1xuICAgIH1cblxuICAgIGdldCBhdXRvY29ubmVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9jb25uZWN0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAoIVdlYlNvY2tldENsaWVudC5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2V0QWNjb3VudEluZm8oKCkgPT4gdGhpcy5fcmVnaXN0ZXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFdlYlNvY2tldENsaWVudC5pbnN0YW5jZSA9IFdlYlNvY2tldENsaWVudC5pbnN0YW5jZSB8fCB0aGlzO1xuXG5cbiAgICB9XG5cbiAgICAvLyBjbG9zZSB3ZWJzb2NrZXQgY2xpZW50XG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgfVxuXG4gICAgc2VuZChhZGRyZXNzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgYXBwbGljYXRpb246IHN0cmluZyA9ICcnKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRFbnZlbG9wKHRoaXMuYnVpbGRFbnZlbG9wKGFkZHJlc3MsIG1lc3NhZ2UsIGFwcGxpY2F0aW9uKSk7XG4gICAgfVxuXG4gICAgc2VuZEVudmVsb3AoZW52ZWxvcDogV2ViU29ja2V0RW52ZWxvcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvY2tldC5zZW5kKGVudmVsb3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRvIHF1ZXVlIGFuZCB3YWl0aW5nIHNvY2tldCBjb25uZWN0ZWQgdG8gc2VuZFxuICAgICAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGU6IGVudmVsb3AsXG4gICAgICAgICAgICAgICAgICAgIGY6IHJlc29sdmVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGEudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2NvbXBsZXRlRW52ZWxvcFF1ZXVlKGRhdGEsIGZhbHNlKSwgdGhpcy5zZW5kVGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW52ZWxvcFF1ZXVlLnB1c2goZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkRW52ZWxvcChhZGRyZXNzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgYXBwbGljYXRpb246IHN0cmluZyA9ICcnLCBqb2luPzogc3RyaW5nKTogV2ViU29ja2V0RW52ZWxvcCB7XG4gICAgICAgIGxldCBlbnZlbG9wID0gbmV3IFdlYlNvY2tldEVudmVsb3AoKTtcbiAgICAgICAgZW52ZWxvcC5hZGRyZXNzID0gYWRkcmVzcztcbiAgICAgICAgZW52ZWxvcC5ib2R5ID0gbmV3IEVudmVsb3BCb2R5KCk7XG4gICAgICAgIGVudmVsb3AuYm9keS5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uO1xuICAgICAgICBlbnZlbG9wLmJvZHkuc2VuZGVyID0gdGhpcy5fdXNlcm5hbWU7XG4gICAgICAgIGVudmVsb3AuYm9keS5hbGlhcyA9IFthZGRyZXNzXTtcbiAgICAgICAgZW52ZWxvcC5ib2R5Lm1lc3NhZ2UgPSBuZXcgRW52ZWxvcE1lc3NhZ2UodGhpcy5fdXNlcm5hbWUsIG1lc3NhZ2UsIGpvaW4gfHwgJycpO1xuICAgICAgICByZXR1cm4gZW52ZWxvcDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZW5kRW52ZWxvcFF1ZXVlKCkge1xuICAgICAgICB0aGlzLl9lbnZlbG9wUXVldWUuZm9yRWFjaCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kRW52ZWxvcChkYXRhLmUpLnRoZW4oKHN0YXR1cykgPT4gdGhpcy5fY29tcGxldGVFbnZlbG9wUXVldWUoZGF0YSwgc3RhdHVzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbXBsZXRlRW52ZWxvcFF1ZXVlKGRhdGE6IGFueSwgc3RhdHVzOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZW52ZWxvcFF1ZXVlLmluZGV4T2YoZGF0YSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9lbnZlbG9wUXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLmYoc3RhdHVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWdpc3RlcihjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGlOZXQuZ2V0UFVybCgnYWNjb3VudC9yZWdpc3RlcicpLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGE6IHN0cmluZyB8IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXRKYm9zcyhkYXRhLCB0aGlzLl91c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0VmVydHgoZGF0YSwgdGhpcy5fdXNlcm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vblN0YXRlQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9zdGF0ZUNoYW5nZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbk1lc3NhZ2Uuc3Vic2NyaWJlKChib2R5OiBFbnZlbG9wQm9keSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZS5uZXh0KGJvZHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFjY291bnQgcmVnaXN0ZXIgZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEFjY291bnRJbmZvKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5fdXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLl91c2VybmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnByb2ZpbGUvdmlldycpLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJuYW1lID0gZGF0YSAmJiBkYXRhLnVzZXIgJiYgKGRhdGEudXNlci51c2VyY29kZSB8fCBkYXRhLnVzZXIudXNlcm5hbWUpIHx8ICcnO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX3VzZXJuYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4gY2FsbGJhY2sobnVsbClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCAmJiAhdGhpcy5hdXRvY29ubmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fcnVuQXV0b0Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYXV0b2Nvbm5lY3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRFbnZlbG9wUXVldWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYW5jZWxBdXRvQ29ubmVjdCgpO1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3J1bkF1dG9Db25uZWN0KCkge1xuICAgICAgICB0aGlzLl9hdXRvY29ubmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2F1dG9jb25lY3RUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsQXV0b0Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fYXV0b2NvbmVjdENvdW50ID49IHRoaXMuX2F1dG9jb25uZWN0UmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsQXV0b0Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBTbGVlcCBhbmQgcmV0cnkgY29ubmVjdCBhZnRlciAzMHNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3J1bkF1dG9Db25uZWN0KCksIHRoaXMuX2F1dG9jb25uZWN0UmV0cnlBZnRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvY29uZWN0Q291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3J1bkF1dG9Db25uZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMuX2F1dG9jb25uZWN0QWZ0ZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbmNlbEF1dG9Db25uZWN0KCkge1xuICAgICAgICB0aGlzLl9hdXRvY29ubmVjdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hdXRvY29uZWN0Q291bnQgPSAwO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fYXV0b2NvbmVjdFRpbWVyKTtcbiAgICB9XG59Il19