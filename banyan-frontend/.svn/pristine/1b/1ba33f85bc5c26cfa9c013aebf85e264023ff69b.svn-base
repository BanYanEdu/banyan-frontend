/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { WebSocketEnvelop, EnvelopBody, EnvelopMessage } from './websocket-abstract';
import { WebSocketJboss } from './websocket-jboss';
import { WebSocketVertx } from './websocket-vertx';
import { Subject } from 'rxjs';
export class WebSocketClient {
    constructor() {
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
            () => this._register()));
        }
        return WebSocketClient.instance = WebSocketClient.instance || this;
    }
    /**
     * @return {?}
     */
    get readyState() {
        return this.socket ? this.socket.readyState : null;
    }
    /**
     * @return {?}
     */
    get connecting() {
        return this.readyState === WebSocket.CONNECTING || this.readyState === null;
    }
    /**
     * @return {?}
     */
    get connected() {
        return this.readyState === WebSocket.OPEN;
    }
    /**
     * @return {?}
     */
    get closing() {
        return this.readyState === WebSocket.CLOSING;
    }
    /**
     * @return {?}
     */
    get closed() {
        return this.readyState === WebSocket.CLOSED;
    }
    /**
     * @return {?}
     */
    get autoconnect() {
        return this._autoconnect;
    }
    // close websocket client
    /**
     * @return {?}
     */
    close() {
        this.socket.close();
    }
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @return {?}
     */
    send(address, message, application = '') {
        return this.sendEnvelop(this.buildEnvelop(address, message, application));
    }
    /**
     * @param {?} envelop
     * @return {?}
     */
    sendEnvelop(envelop) {
        if (this.connected) {
            return this.socket.send(envelop);
        }
        else {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                // Add to queue and waiting socket connected to send
                /** @type {?} */
                let data = {
                    e: envelop,
                    f: resolve
                };
                data.timer = setTimeout((/**
                 * @return {?}
                 */
                () => this._completeEnvelopQueue(data, false)), this.sendTimeout);
                this._envelopQueue.push(data);
            }));
        }
    }
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @param {?=} join
     * @return {?}
     */
    buildEnvelop(address, message, application = '', join) {
        /** @type {?} */
        let envelop = new WebSocketEnvelop();
        envelop.address = address;
        envelop.body = new EnvelopBody();
        envelop.body.application = application;
        envelop.body.sender = this._username;
        envelop.body.alias = [address];
        envelop.body.message = new EnvelopMessage(this._username, message, join || '');
        return envelop;
    }
    /**
     * @private
     * @return {?}
     */
    _sendEnvelopQueue() {
        this._envelopQueue.forEach((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.sendEnvelop(data.e).then((/**
             * @param {?} status
             * @return {?}
             */
            (status) => this._completeEnvelopQueue(data, status)));
        }));
    }
    /**
     * @private
     * @param {?} data
     * @param {?} status
     * @return {?}
     */
    _completeEnvelopQueue(data, status) {
        /** @type {?} */
        const index = this._envelopQueue.indexOf(data);
        if (index >= 0) {
            this._envelopQueue.splice(index, 1);
        }
        data.f(status);
    }
    /**
     * @private
     * @param {?=} callback
     * @return {?}
     */
    _register(callback) {
        $.ajax({
            url: iNet.getPUrl('account/register'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (typeof data === 'string') {
                    this.socket = new WebSocketJboss(data, this._username);
                }
                else {
                    this.socket = new WebSocketVertx(data, this._username);
                }
                this.socket.onStateChange.subscribe((/**
                 * @return {?}
                 */
                () => this._stateChange()));
                this.socket.onMessage.subscribe((/**
                 * @param {?} body
                 * @return {?}
                 */
                (body) => {
                    this.onMessage.next(body);
                }));
                callback && callback();
            }),
            error: (/**
             * @return {?}
             */
            () => {
                callback && callback();
                throw new Error("Account register error");
            })
        });
    }
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    _getAccountInfo(callback) {
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
            () => callback(null))
        });
    }
    /**
     * @private
     * @return {?}
     */
    _stateChange() {
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
    }
    /**
     * @private
     * @return {?}
     */
    _runAutoConnect() {
        this._autoconnect = true;
        this._autoconectTimer = setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.connected) {
                this._cancelAutoConnect();
                return;
            }
            if (this._autoconectCount >= this._autoconnectRepeat) {
                this._cancelAutoConnect();
                // Sleep and retry connect after 30s
                setTimeout((/**
                 * @return {?}
                 */
                () => this._runAutoConnect()), this._autoconnectRetryAfter);
                return;
            }
            this._register((/**
             * @return {?}
             */
            () => {
                this._autoconectCount++;
                if (!this.connected) {
                    this._runAutoConnect();
                }
            }));
        }), this._autoconnectAfter);
    }
    /**
     * @private
     * @return {?}
     */
    _cancelAutoConnect() {
        this._autoconnect = false;
        this._autoconectCount = 0;
        clearTimeout(this._autoconectTimer);
    }
}
WebSocketClient.instance = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy93ZWJzb2NrZXQvd2Vic29ja2V0LWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFxQixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CLE1BQU0sT0FBTyxlQUFlO0lBMEN4Qjs7UUF0Q0EsY0FBUyxHQUF5QixJQUFJLE9BQU8sRUFBRSxDQUFDOztRQUVoRCxrQkFBYSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDOztRQUU1QyxnQkFBVyxHQUFXLEtBQUssQ0FBQztRQUdwQixzQkFBaUIsR0FBVyxJQUFJLENBQUMsQ0FBQyxLQUFLOztRQUN2Qyx1QkFBa0IsR0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVOztRQUMxQywyQkFBc0IsR0FBVyxLQUFLLENBQUMsQ0FBQyxNQUFNO1FBRzlDLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBMkJ2QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZTs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLGVBQWUsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFHdkUsQ0FBQzs7OztJQS9CRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FB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Ozs7SUFDNUIsb0NBQTBCOzs7OztJQUMxQix1Q0FBOEI7Ozs7O0lBQzlCLDRDQUF5Qzs7Ozs7SUFDekMsNkNBQXVDOzs7OztJQUN2QyxpREFBK0M7Ozs7O0lBQy9DLDJDQUFpQzs7Ozs7SUFDakMsMkNBQThCOzs7OztJQUM5Qix3Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWJTb2NrZXRBYnN0cmFjdCwgV2ViU29ja2V0RW52ZWxvcCwgRW52ZWxvcEJvZHksIEVudmVsb3BNZXNzYWdlIH0gZnJvbSAnLi93ZWJzb2NrZXQtYWJzdHJhY3QnO1xuaW1wb3J0IHsgV2ViU29ja2V0SmJvc3MgfSBmcm9tICcuL3dlYnNvY2tldC1qYm9zcyc7XG5pbXBvcnQgeyBXZWJTb2NrZXRWZXJ0eCB9IGZyb20gJy4vd2Vic29ja2V0LXZlcnR4JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0Q2xpZW50IHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IFdlYlNvY2tldENsaWVudCA9IG51bGw7XG4gICAgc29ja2V0OiBXZWJTb2NrZXRBYnN0cmFjdDtcbiAgICAvLyBtZXNzYWdlIGZyb20gc29ja2V0IHNlcnZlclxuICAgIG9uTWVzc2FnZTogU3ViamVjdDxFbnZlbG9wQm9keT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIC8vIHNvY2tldCBzdGF0ZSBjaGFuZ2VcbiAgICBvblN0YXRlQ2hhbmdlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIC8vIGVudmVsb3Agc2VuZCB3aWxsIGJlIHRpbWVvdXQgYWZ0ZXIgMzBzXG4gICAgc2VuZFRpbWVvdXQ6IG51bWJlciA9IDMwMDAwO1xuICAgIHByaXZhdGUgX3VzZXJuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfYXV0b2Nvbm5lY3Q6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfYXV0b2Nvbm5lY3RBZnRlcjogbnVtYmVyID0gNTAwMDsgLy8gNXNcbiAgICBwcml2YXRlIF9hdXRvY29ubmVjdFJlcGVhdDogbnVtYmVyID0gNDsgLy8gNSB0aW1lc1xuICAgIHByaXZhdGUgX2F1dG9jb25uZWN0UmV0cnlBZnRlcjogbnVtYmVyID0gMzAwMDA7IC8vIDMwc1xuICAgIHByaXZhdGUgX2F1dG9jb25lY3RDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2F1dG9jb25lY3RUaW1lcjogYW55O1xuICAgIHByaXZhdGUgX2VudmVsb3BRdWV1ZSA9IFtdO1xuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0ID8gdGhpcy5zb2NrZXQucmVhZHlTdGF0ZSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGNvbm5lY3RpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgY29ubmVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTjtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2luZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgfVxuXG4gICAgZ2V0IGNsb3NlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NFRDtcbiAgICB9XG5cbiAgICBnZXQgYXV0b2Nvbm5lY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvY29ubmVjdDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKCFXZWJTb2NrZXRDbGllbnQuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldEFjY291bnRJbmZvKCgpID0+IHRoaXMuX3JlZ2lzdGVyKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBXZWJTb2NrZXRDbGllbnQuaW5zdGFuY2UgPSBXZWJTb2NrZXRDbGllbnQuaW5zdGFuY2UgfHwgdGhpcztcblxuXG4gICAgfVxuXG4gICAgLy8gY2xvc2Ugd2Vic29ja2V0IGNsaWVudFxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuICAgIH1cblxuICAgIHNlbmQoYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGFwcGxpY2F0aW9uOiBzdHJpbmcgPSAnJyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kRW52ZWxvcCh0aGlzLmJ1aWxkRW52ZWxvcChhZGRyZXNzLCBtZXNzYWdlLCBhcHBsaWNhdGlvbikpO1xuICAgIH1cblxuICAgIHNlbmRFbnZlbG9wKGVudmVsb3A6IFdlYlNvY2tldEVudmVsb3ApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuc2VuZChlbnZlbG9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0byBxdWV1ZSBhbmQgd2FpdGluZyBzb2NrZXQgY29ubmVjdGVkIHRvIHNlbmRcbiAgICAgICAgICAgICAgICBsZXQgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgICAgICAgICBlOiBlbnZlbG9wLFxuICAgICAgICAgICAgICAgICAgICBmOiByZXNvbHZlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9jb21wbGV0ZUVudmVsb3BRdWV1ZShkYXRhLCBmYWxzZSksIHRoaXMuc2VuZFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VudmVsb3BRdWV1ZS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZEVudmVsb3AoYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGFwcGxpY2F0aW9uOiBzdHJpbmcgPSAnJywgam9pbj86IHN0cmluZyk6IFdlYlNvY2tldEVudmVsb3Age1xuICAgICAgICBsZXQgZW52ZWxvcCA9IG5ldyBXZWJTb2NrZXRFbnZlbG9wKCk7XG4gICAgICAgIGVudmVsb3AuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIGVudmVsb3AuYm9keSA9IG5ldyBFbnZlbG9wQm9keSgpO1xuICAgICAgICBlbnZlbG9wLmJvZHkuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvbjtcbiAgICAgICAgZW52ZWxvcC5ib2R5LnNlbmRlciA9IHRoaXMuX3VzZXJuYW1lO1xuICAgICAgICBlbnZlbG9wLmJvZHkuYWxpYXMgPSBbYWRkcmVzc107XG4gICAgICAgIGVudmVsb3AuYm9keS5tZXNzYWdlID0gbmV3IEVudmVsb3BNZXNzYWdlKHRoaXMuX3VzZXJuYW1lLCBtZXNzYWdlLCBqb2luIHx8ICcnKTtcbiAgICAgICAgcmV0dXJuIGVudmVsb3A7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VuZEVudmVsb3BRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5fZW52ZWxvcFF1ZXVlLmZvckVhY2goKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEVudmVsb3AoZGF0YS5lKS50aGVuKChzdGF0dXMpID0+IHRoaXMuX2NvbXBsZXRlRW52ZWxvcFF1ZXVlKGRhdGEsIHN0YXR1cykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb21wbGV0ZUVudmVsb3BRdWV1ZShkYXRhOiBhbnksIHN0YXR1czogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2VudmVsb3BRdWV1ZS5pbmRleE9mKGRhdGEpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZW52ZWxvcFF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5mKHN0YXR1cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVnaXN0ZXIoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBpTmV0LmdldFBVcmwoJ2FjY291bnQvcmVnaXN0ZXInKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhOiBzdHJpbmcgfCBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0SmJvc3MoZGF0YSwgdGhpcy5fdXNlcm5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldFZlcnR4KGRhdGEsIHRoaXMuX3VzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25TdGF0ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc3RhdGVDaGFuZ2UoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25NZXNzYWdlLnN1YnNjcmliZSgoYm9keTogRW52ZWxvcEJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UubmV4dChib2R5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2NvdW50IHJlZ2lzdGVyIGVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRBY2NvdW50SW5mbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5fdXNlcm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGlOZXQuZ2V0UFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3ZpZXcnKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VybmFtZSA9IGRhdGEgJiYgZGF0YS51c2VyICYmIChkYXRhLnVzZXIudXNlcmNvZGUgfHwgZGF0YS51c2VyLnVzZXJuYW1lKSB8fCAnJztcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl91c2VybmFtZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6ICgpID0+IGNhbGxiYWNrKG51bGwpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQgJiYgIXRoaXMuYXV0b2Nvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3J1bkF1dG9Db25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2F1dG9jb25uZWN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZW5kRW52ZWxvcFF1ZXVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2FuY2VsQXV0b0Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ydW5BdXRvQ29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fYXV0b2Nvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hdXRvY29uZWN0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbEF1dG9Db25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F1dG9jb25lY3RDb3VudCA+PSB0aGlzLl9hdXRvY29ubmVjdFJlcGVhdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbEF1dG9Db25uZWN0KCk7XG4gICAgICAgICAgICAgICAgLy8gU2xlZXAgYW5kIHJldHJ5IGNvbm5lY3QgYWZ0ZXIgMzBzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9ydW5BdXRvQ29ubmVjdCgpLCB0aGlzLl9hdXRvY29ubmVjdFJldHJ5QWZ0ZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0b2NvbmVjdENvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ydW5BdXRvQ29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzLl9hdXRvY29ubmVjdEFmdGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYW5jZWxBdXRvQ29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fYXV0b2Nvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYXV0b2NvbmVjdENvdW50ID0gMDtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2F1dG9jb25lY3RUaW1lcik7XG4gICAgfVxufSJdfQ==