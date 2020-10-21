/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { WebSocketAbstract } from './websocket-abstract';
var WebSocketJboss = /** @class */ (function (_super) {
    tslib_1.__extends(WebSocketJboss, _super);
    function WebSocketJboss() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebSocketJboss.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._socket ? this._socket.readyState : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WebSocketJboss.prototype.stateChange = /**
     * @return {?}
     */
    function () {
        if (this.readyState === WebSocket.OPEN) {
            this._ping();
        }
        _super.prototype.stateChange.call(this);
    };
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    WebSocketJboss.prototype.connect = /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    function (options, username) {
        var _this = this;
        this._socket = new WebSocket(options);
        this._socket.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // const envelop: WebSocketEnvelop = JSON.parse(event.data);
            // if (envelop.body) {
            //     this.onMessage.next(envelop.body);
            // }
            /** @type {?} */
            var envelopBody = JSON.parse(event.data);
            if (envelopBody.sender) {
                _this.onMessage.next(envelopBody);
            }
        });
        this._socket.onopen = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
        this._socket.onerror = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
        this._socket.onclose = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
    };
    /**
     * @return {?}
     */
    WebSocketJboss.prototype.close = /**
     * @return {?}
     */
    function () {
        this._socket.close();
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    WebSocketJboss.prototype.send = /**
     * @param {?} envelop
     * @return {?}
     */
    function (envelop) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            try {
                _this._socket.send(JSON.stringify(envelop));
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketJboss.prototype._ping = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify({ type: 'ping' }));
            setTimeout((/**
             * @return {?}
             */
            function () { return _this._ping(); }), 10000);
        }
    };
    return WebSocketJboss;
}(WebSocketAbstract));
export { WebSocketJboss };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebSocketJboss.prototype._socket;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWpib3NzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtamJvc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsaUJBQWlCLEVBQW1CLE1BQU0sc0JBQXNCLENBQUM7QUFFdEY7SUFBb0MsMENBQWlCO0lBQXJEOztJQXFEQSxDQUFDO0lBbERHLHNCQUFJLHNDQUFVOzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsQ0FBQzs7O09BQUE7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFDRCxpQkFBTSxXQUFXLFdBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFRCxnQ0FBTzs7Ozs7SUFBUCxVQUFRLE9BQWUsRUFBRSxRQUFnQjtRQUF6QyxpQkFlQztRQWRHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUcsVUFBQyxLQUFLOzs7Ozs7Z0JBS3JCLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3ZELElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDcEM7UUFDTCxDQUFDLENBQUEsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs7O1FBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7O1FBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQSxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7O1FBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQSxDQUFDO0lBQ3BELENBQUM7Ozs7SUFFRCw4QkFBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsNkJBQUk7Ozs7SUFBSixVQUFLLE9BQXlCO1FBQTlCLGlCQVVDO1FBVEcsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFBLE9BQU87WUFDdEIsSUFBSTtnQkFDQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUFDLE9BQU0sQ0FBQyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLDhCQUFLOzs7O0lBQWI7UUFBQSxpQkFLQztRQUpHLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELFVBQVU7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxHQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXJERCxDQUFvQyxpQkFBaUIsR0FxRHBEOzs7Ozs7O0lBcERHLGlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RW52ZWxvcEJvZHksIFdlYlNvY2tldEFic3RyYWN0LCBXZWJTb2NrZXRFbnZlbG9wfSBmcm9tICcuL3dlYnNvY2tldC1hYnN0cmFjdCc7XG5cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRKYm9zcyBleHRlbmRzIFdlYlNvY2tldEFic3RyYWN0IHtcbiAgICBwcml2YXRlIF9zb2NrZXQ6IFdlYlNvY2tldDtcblxuICAgIGdldCByZWFkeVN0YXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb2NrZXQgPyB0aGlzLl9zb2NrZXQucmVhZHlTdGF0ZSA6IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLl9waW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuc3RhdGVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0KG9wdGlvbnM6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9zb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBlbnZlbG9wOiBXZWJTb2NrZXRFbnZlbG9wID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICAgIC8vIGlmIChlbnZlbG9wLmJvZHkpIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm9uTWVzc2FnZS5uZXh0KGVudmVsb3AuYm9keSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBjb25zdCBlbnZlbG9wQm9keTogRW52ZWxvcEJvZHkgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgaWYgKGVudmVsb3BCb2R5LnNlbmRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlLm5leHQoZW52ZWxvcEJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zb2NrZXQub25vcGVuID0gKCkgPT4gdGhpcy5zdGF0ZUNoYW5nZSgpO1xuICAgICAgICB0aGlzLl9zb2NrZXQub25lcnJvciA9ICgpID0+IHRoaXMuc3RhdGVDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5fc29ja2V0Lm9uY2xvc2UgPSAoKSA9PiB0aGlzLnN0YXRlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX3NvY2tldC5jbG9zZSgpO1xuICAgIH1cblxuICAgIHNlbmQoZW52ZWxvcDogV2ViU29ja2V0RW52ZWxvcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KGVudmVsb3ApKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdTZW5kIG1lc3NhZ2UgZmFpbGVkJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTogJ3BpbmcnfSkpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9waW5nKCksIDEwMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==