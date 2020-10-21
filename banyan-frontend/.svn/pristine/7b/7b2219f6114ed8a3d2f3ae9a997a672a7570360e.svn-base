/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { VertxSocket, VertxSocketState } from "./VertxSocket";
import { Observable, Subject } from "rxjs";
export class VertxSocketManager {
    /**
     * @param {?=} headers
     * @param {?=} connectTimeout
     * @param {?=} sendTimeout
     */
    constructor(headers = {}, connectTimeout = 10000, sendTimeout = 10000) {
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
    get closed() {
        return this.readyState === VertxSocketState.CLOSED;
    }
    /**
     * @return {?}
     */
    get reconnecting() {
        return this.readyState === VertxSocketState.RE_CONNECTING;
    }
    /**
     * @return {?}
     */
    get unavailable() {
        return this.readyState === VertxSocketState.UNAVAILABLE;
    }
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    send(address, message) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (this.connected) {
                this._send(address, message, subscriber);
            }
            else {
                this._addOnQueue(new VertxMessageQueue(address, message, subscriber));
            }
        }));
    }
    /**
     * @return {?}
     */
    close() {
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
    }
    /**
     * @return {?}
     */
    reconnect() {
        if (!this.closed) {
            return;
        }
        this._reconnect();
    }
    /**
     * @private
     * @param {?} address
     * @param {?} message
     * @param {?} subscriber
     * @return {?}
     */
    _send(address, message, subscriber) {
        this._socket.send(address, message);
        subscriber.next(true);
    }
    /**
     * @private
     * @param {?} msg
     * @return {?}
     */
    _addOnQueue(msg) {
        this._queue.push(msg);
        // message could not be send
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this._queue.indexOf(msg) !== -1) {
                this._queue.splice(this._queue.indexOf(msg), 1);
                msg.subscriber.next(false);
            }
        }), this.sendTimeout);
    }
    // Connect success and ready to send
    /**
     * @private
     * @return {?}
     */
    _onConnected() {
        // Send message retain on queue
        this._queue.forEach((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => this._send(msg.address, msg.message, msg.subscriber)));
        this._queue.length = 0;
        this._stopReconnect();
    }
    /**
     * @private
     * @param {?} state
     * @param {?=} message
     * @return {?}
     */
    _stateChange(state, message = '') {
        this.readyState = state;
        this.message = message;
        this.onStateChange.next();
        if (this.connected) {
            this._onConnected();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _connect() {
        this._loadVertxInfo((/**
         * @param {?} username
         * @param {?} url
         * @param {?} headers
         * @return {?}
         */
        (username, url, headers) => {
            this._socket = new VertxSocket(username, url, headers);
            this._socket.onStateChange.subscribe((/**
             * @return {?}
             */
            () => this._socketStateChange()));
            this._socket.onMessage.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            (message) => this.onMessage.next(message)));
            this._socket.onMessageOnline.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            (message) => this.onMessageOnline.next(message)));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _socketStateChange() {
        if (this._socket.connected) {
            this._stateChange(VertxSocketState.CONNECTED);
        }
        else if (this._socket.closed) {
            this._reconnect();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _reconnect() {
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
        () => {
            this._connect();
            this._reconnectCount++;
        }), this._reconnectTime);
    }
    /**
     * @private
     * @return {?}
     */
    _stopReconnect() {
        this._reconnectCount = 0;
        clearTimeout(this._reconnectTimer);
    }
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    _loadVertxInfo(callback) {
        this._loadUserInfo((/**
         * @param {?} username
         * @return {?}
         */
        (username) => {
            if (username) {
                this._loadVertxRegisterInfo((/**
                 * @param {?} url
                 * @param {?} headers
                 * @return {?}
                 */
                (url, headers) => {
                    if (url) {
                        callback(username, url, headers);
                    }
                    else {
                        this._stateChange(VertxSocketState.UNAVAILABLE);
                    }
                }));
            }
            else {
                this._stateChange(VertxSocketState.UNAVAILABLE);
            }
        }));
    }
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    _loadUserInfo(callback) {
        if (this._username) {
            return callback(this._username);
        }
        $.ajax({
            url: iNet.getPUrl('system/userprofile/view'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this._username = data && data.user && (data.user.usercode || data.user.username) || '';
                callback(this._username);
            }),
            error: (/**
             * @return {?}
             */
            () => {
                this._stateChange(VertxSocketState.CLOSED, VertxSocketError.LOAD_USER);
                callback(null);
            })
        });
    }
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    _loadVertxRegisterInfo(callback) {
        $.ajax({
            url: iNet.getPUrl('account/register'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (data && data.length === 2) {
                    /** @type {?} */
                    var vertxUrl = data[0];
                    /** @type {?} */
                    var headers = $.extend({}, this.headers, { keyapi: data[1] });
                    callback(vertxUrl, headers);
                }
                else {
                    this._stateChange(VertxSocketState.CLOSED, VertxSocketError.REGISTER_USER);
                    callback(null);
                }
            }),
            error: (/**
             * @return {?}
             */
            () => {
                this._stateChange(VertxSocketState.CLOSED, VertxSocketError.REGISTER_USER);
                callback(null);
            })
        });
    }
}
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
const VertxSocketError = {
    LOAD_USER: 'LOAD_USER_FAILED',
    REGISTER_USER: 'REGISTER_USER_FAILED',
};
export { VertxSocketError };
class VertxMessageQueue {
    /**
     * @param {?} address
     * @param {?} message
     * @param {?} subscriber
     */
    constructor(address, message, subscriber) {
        this.address = address;
        this.message = message;
        this.subscriber = subscriber;
    }
}
if (false) {
    /** @type {?} */
    VertxMessageQueue.prototype.address;
    /** @type {?} */
    VertxMessageQueue.prototype.message;
    /** @type {?} */
    VertxMessageQueue.prototype.subscriber;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVydHhTb2NrZXRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3ZlcnR4L1ZlcnR4U29ja2V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFLckQsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7O0lBcUMzQixZQUFZLFVBQWUsRUFBRSxFQUNqQixpQkFBeUIsS0FBSyxFQUM5QixjQUFzQixLQUFLO1FBbkN2QyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQ3hDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDakQsZUFBVSxHQUFxQixnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7UUFHbkQsV0FBTSxHQUF3QixFQUFFLENBQUM7UUFHakMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUF5QnhCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBMUJELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7SUFDM0QsQ0FBQzs7OztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7SUFDMUQsQ0FBQzs7OztJQUVELElBQUksTUFBTTtRQUNOLE9B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SUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztDQUNKOzs7SUFSRyxvQ0FBZ0I7O0lBQ2hCLG9DQUFnQjs7SUFDaEIsdUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWZXJ0eE1lc3NhZ2UsIFZlcnR4T25saW5lRGF0YSwgVmVydHhTb2NrZXQsIFZlcnR4U29ja2V0U3RhdGV9IGZyb20gXCIuL1ZlcnR4U29ja2V0XCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmliZXJ9IGZyb20gXCJyeGpzXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuZXhwb3J0IGNsYXNzIFZlcnR4U29ja2V0TWFuYWdlciB7XG4gICAgaGVhZGVyczogYW55O1xuICAgIHNlbmRUaW1lb3V0OiBudW1iZXI7XG4gICAgY29ubmVjdFRpbWVvdXQ6IG51bWJlcjtcbiAgICBvblN0YXRlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICBvbk1lc3NhZ2UgPSBuZXcgU3ViamVjdDxWZXJ0eE1lc3NhZ2U+KCk7XG4gICAgb25NZXNzYWdlT25saW5lID0gbmV3IFN1YmplY3Q8VmVydHhPbmxpbmVEYXRhPigpO1xuICAgIHJlYWR5U3RhdGU6IFZlcnR4U29ja2V0U3RhdGUgPSBWZXJ0eFNvY2tldFN0YXRlLkNPTk5FQ1RJTkc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3NvY2tldDogVmVydHhTb2NrZXQ7XG4gICAgcHJpdmF0ZSBfcXVldWU6IFZlcnR4TWVzc2FnZVF1ZXVlW10gPSBbXTtcbiAgICBwcml2YXRlIF91c2VybmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3JlY29ubmVjdFRpbWVyO1xuICAgIHByaXZhdGUgX3JlY29ubmVjdFRpbWUgPSAzMDAwO1xuICAgIHByaXZhdGUgX3JlY29ubmVjdE1heCA9IDU7XG4gICAgcHJpdmF0ZSBfcmVjb25uZWN0Q291bnQgPSAwO1xuXG4gICAgZ2V0IGNvbm5lY3RpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFZlcnR4U29ja2V0U3RhdGUuQ09OTkVDVElORztcbiAgICB9XG5cbiAgICBnZXQgY29ubmVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLkNPTk5FQ1RFRDtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLkNMT1NFRDtcbiAgICB9XG5cbiAgICBnZXQgcmVjb25uZWN0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLlJFX0NPTk5FQ1RJTkc7XG4gICAgfVxuXG4gICAgZ2V0IHVuYXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBWZXJ0eFNvY2tldFN0YXRlLlVOQVZBSUxBQkxFO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGhlYWRlcnM6IGFueSA9IHt9LFxuICAgICAgICAgICAgICAgIGNvbm5lY3RUaW1lb3V0OiBudW1iZXIgPSAxMDAwMCxcbiAgICAgICAgICAgICAgICBzZW5kVGltZW91dDogbnVtYmVyID0gMTAwMDApIHtcbiAgICAgICAgdGhpcy5jb25uZWN0VGltZW91dCA9IGNvbm5lY3RUaW1lb3V0O1xuICAgICAgICB0aGlzLnNlbmRUaW1lb3V0ID0gc2VuZFRpbWVvdXQ7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBzZW5kKGFkZHJlc3M6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZChhZGRyZXNzLCBtZXNzYWdlLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkT25RdWV1ZShuZXcgVmVydHhNZXNzYWdlUXVldWUoYWRkcmVzcywgbWVzc2FnZSwgc3Vic2NyaWJlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcFJlY29ubmVjdCgpO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZShWZXJ0eFNvY2tldFN0YXRlLkNMT1NFRCk7XG4gICAgICAgIGlmICh0aGlzLl9zb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2VPbmxpbmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZWNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZW5kKGFkZHJlc3MsIG1lc3NhZ2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5fc29ja2V0LnNlbmQoYWRkcmVzcywgbWVzc2FnZSk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRPblF1ZXVlKG1zZzogVmVydHhNZXNzYWdlUXVldWUpIHtcbiAgICAgICAgdGhpcy5fcXVldWUucHVzaChtc2cpO1xuICAgICAgICAvLyBtZXNzYWdlIGNvdWxkIG5vdCBiZSBzZW5kXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3F1ZXVlLmluZGV4T2YobXNnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZS5zcGxpY2UodGhpcy5fcXVldWUuaW5kZXhPZihtc2cpLCAxKTtcbiAgICAgICAgICAgICAgICBtc2cuc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5zZW5kVGltZW91dCk7XG4gICAgfVxuXG4gICAgLy8gQ29ubmVjdCBzdWNjZXNzIGFuZCByZWFkeSB0byBzZW5kXG4gICAgcHJpdmF0ZSBfb25Db25uZWN0ZWQoKSB7XG4gICAgICAgIC8vIFNlbmQgbWVzc2FnZSByZXRhaW4gb24gcXVldWVcbiAgICAgICAgdGhpcy5fcXVldWUuZm9yRWFjaCgobXNnKSA9PiB0aGlzLl9zZW5kKG1zZy5hZGRyZXNzLCBtc2cubWVzc2FnZSwgbXNnLnN1YnNjcmliZXIpKTtcbiAgICAgICAgdGhpcy5fcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fc3RvcFJlY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N0YXRlQ2hhbmdlKHN0YXRlOiBWZXJ0eFNvY2tldFN0YXRlLCBtZXNzYWdlOiBzdHJpbmcgPSAnJykge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlLm5leHQoKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9vbkNvbm5lY3RlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fbG9hZFZlcnR4SW5mbygodXNlcm5hbWUsIHVybCwgaGVhZGVycykgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0ID0gbmV3IFZlcnR4U29ja2V0KHVzZXJuYW1lLCB1cmwsIGhlYWRlcnMpO1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0Lm9uU3RhdGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3NvY2tldFN0YXRlQ2hhbmdlKCkpO1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0Lm9uTWVzc2FnZS5zdWJzY3JpYmUoKG1lc3NhZ2UpID0+IHRoaXMub25NZXNzYWdlLm5leHQobWVzc2FnZSkpO1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0Lm9uTWVzc2FnZU9ubGluZS5zdWJzY3JpYmUoKG1lc3NhZ2UpID0+IHRoaXMub25NZXNzYWdlT25saW5lLm5leHQobWVzc2FnZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zb2NrZXRTdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NvY2tldC5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ09OTkVDVEVEKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zb2NrZXQuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlY29ubmVjdGluZykge1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0Q291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5SRV9DT05ORUNUSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0Q291bnQgPiB0aGlzLl9yZWNvbm5lY3RNYXgpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VEKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWNvbm5lY3RUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0Q291bnQrKztcbiAgICAgICAgfSwgdGhpcy5fcmVjb25uZWN0VGltZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RvcFJlY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0Q291bnQgPSAwO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVjb25uZWN0VGltZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRWZXJ0eEluZm8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2xvYWRVc2VySW5mbygodXNlcm5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFZlcnR4UmVnaXN0ZXJJbmZvKCh1cmw6IHN0cmluZywgaGVhZGVycykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh1c2VybmFtZSwgdXJsLCBoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuVU5BVkFJTEFCTEUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuVU5BVkFJTEFCTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkVXNlckluZm8oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VybmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuX3VzZXJuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS92aWV3JyksXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJuYW1lID0gZGF0YSAmJiBkYXRhLnVzZXIgJiYgKGRhdGEudXNlci51c2VyY29kZSB8fCBkYXRhLnVzZXIudXNlcm5hbWUpIHx8ICcnO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX3VzZXJuYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VELCBWZXJ0eFNvY2tldEVycm9yLkxPQURfVVNFUik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRWZXJ0eFJlZ2lzdGVySW5mbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogaU5ldC5nZXRQVXJsKCdhY2NvdW50L3JlZ2lzdGVyJyksXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ZXJ0eFVybCA9IGRhdGFbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzID0gJC5leHRlbmQoe30sIHRoaXMuaGVhZGVycywge2tleWFwaTogZGF0YVsxXX0pO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh2ZXJ0eFVybCwgaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2UoVmVydHhTb2NrZXRTdGF0ZS5DTE9TRUQsIFZlcnR4U29ja2V0RXJyb3IuUkVHSVNURVJfVVNFUik7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlKFZlcnR4U29ja2V0U3RhdGUuQ0xPU0VELCBWZXJ0eFNvY2tldEVycm9yLlJFR0lTVEVSX1VTRVIpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIFZlcnR4U29ja2V0RXJyb3Ige1xuICAgIExPQURfVVNFUiA9ICdMT0FEX1VTRVJfRkFJTEVEJyxcbiAgICBSRUdJU1RFUl9VU0VSID0gJ1JFR0lTVEVSX1VTRVJfRkFJTEVEJ1xufVxuXG5jbGFzcyBWZXJ0eE1lc3NhZ2VRdWV1ZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+O1xuICAgIGNvbnN0cnVjdG9yKGFkZHJlc3M6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSB7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgfVxufSJdfQ==