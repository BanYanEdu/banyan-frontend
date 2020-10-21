/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { WebSocketAbstract } from './websocket-abstract';
import * as EventBus from 'vertx3-eventbus-client';
var WebSocketVertx = /** @class */ (function (_super) {
    tslib_1.__extends(WebSocketVertx, _super);
    function WebSocketVertx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebSocketVertx.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._eventbus ? this._eventbus.state : null;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    WebSocketVertx.prototype.connect = /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    function (options, username) {
        if (options && options.length === 2) {
            /** @type {?} */
            var url = options[0];
            /** @type {?} */
            var headers = {
                keyapi: options[1]
            };
            this._connect(url, headers, username);
        }
    };
    /**
     * @private
     * @param {?} url
     * @param {?} headers
     * @param {?} username
     * @return {?}
     */
    WebSocketVertx.prototype._connect = /**
     * @private
     * @param {?} url
     * @param {?} headers
     * @param {?} username
     * @return {?}
     */
    function (url, headers, username) {
        var _this = this;
        this._eventbus = new EventBus(url, {
            transports: 'websocket'
        });
        this._eventbus.onopen = (/**
         * @return {?}
         */
        function () {
            // Channel receive chat message
            _this._eventbus.registerHandler(username, headers, (/**
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
            // this._eventbus.registerHandler('news-feed', headers, (err: any, msg: any) => {
            //     if (msg) {
            //         this.onMessage.next(msg);
            //     }
            // });
            _this.stateChange();
        });
        this._eventbus.onclose = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
        this._eventbus.onerror = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
    };
    /**
     * @return {?}
     */
    WebSocketVertx.prototype.close = /**
     * @return {?}
     */
    function () {
        this._eventbus.close();
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    WebSocketVertx.prototype.send = /**
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
                _this._eventbus.publish(envelop.address, envelop.body);
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    };
    return WebSocketVertx;
}(WebSocketAbstract));
export { WebSocketVertx };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebSocketVertx.prototype._eventbus;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LXZlcnR4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtdmVydHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDM0UsT0FBTyxLQUFLLFFBQVEsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRDtJQUFvQywwQ0FBaUI7SUFBckQ7O0lBdURBLENBQUM7SUFwREcsc0JBQUksc0NBQVU7Ozs7UUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTtJQUFBLENBQUM7Ozs7OztJQUVGLGdDQUFPOzs7OztJQUFQLFVBQVEsT0FBWSxFQUFFLFFBQWdCO1FBQ2xDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztnQkFDN0IsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7O2dCQUNoQixPQUFPLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDOzs7Ozs7OztJQUVPLGlDQUFROzs7Ozs7O0lBQWhCLFVBQWlCLEdBQVcsRUFBRSxPQUFZLEVBQUUsUUFBZ0I7UUFBNUQsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQy9CLFVBQVUsRUFBRSxXQUFXO1NBQzFCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTs7O1FBQUc7WUFDcEIsK0JBQStCO1lBQy9CLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxPQUFPOzs7OztZQUFFLFVBQUMsR0FBUSxFQUFFLEdBQVE7Z0JBQ2pFLElBQUksR0FBRyxFQUFFO29CQUNMLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLEVBQUMsQ0FBQztZQUNILGlDQUFpQztZQUNqQyxpRkFBaUY7WUFDakYsaUJBQWlCO1lBQ2pCLG9DQUFvQztZQUNwQyxRQUFRO1lBQ1IsTUFBTTtZQUNOLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUEsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7O1FBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQSxDQUFDO1FBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7O1FBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQSxDQUFDO0lBQ3RELENBQUM7Ozs7SUFFRCw4QkFBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsNkJBQUk7Ozs7SUFBSixVQUFLLE9BQXlCO1FBQTlCLGlCQVVDO1FBVEcsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFBLE9BQU87WUFDdEIsSUFBSTtnQkFDQSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF2REQsQ0FBb0MsaUJBQWlCLEdBdURwRDs7Ozs7OztJQXRERyxtQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWJTb2NrZXRBYnN0cmFjdCwgV2ViU29ja2V0RW52ZWxvcCB9IGZyb20gJy4vd2Vic29ja2V0LWFic3RyYWN0JztcbmltcG9ydCAqIGFzIEV2ZW50QnVzIGZyb20gJ3ZlcnR4My1ldmVudGJ1cy1jbGllbnQnO1xuXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0VmVydHggZXh0ZW5kcyBXZWJTb2NrZXRBYnN0cmFjdCB7XG4gICAgcHJpdmF0ZSBfZXZlbnRidXM6IEV2ZW50QnVzO1xuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50YnVzID8gdGhpcy5fZXZlbnRidXMuc3RhdGUgOiBudWxsO1xuICAgIH07XG5cbiAgICBjb25uZWN0KG9wdGlvbnM6IGFueSwgdXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIHVybCA9IG9wdGlvbnNbMF07XG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgICAgICAgICBrZXlhcGk6IG9wdGlvbnNbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KHVybCwgaGVhZGVycywgdXNlcm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29ubmVjdCh1cmw6IHN0cmluZywgaGVhZGVyczogYW55LCB1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50YnVzID0gbmV3IEV2ZW50QnVzKHVybCwge1xuICAgICAgICAgICAgdHJhbnNwb3J0czogJ3dlYnNvY2tldCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50YnVzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoYW5uZWwgcmVjZWl2ZSBjaGF0IG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50YnVzLnJlZ2lzdGVySGFuZGxlcih1c2VybmFtZSwgaGVhZGVycywgKGVycjogYW55LCBtc2c6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UubmV4dChtc2cuYm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDaGFubmVsIHJlY2VpdmUgb25saW5lIG1lc3NhZ2VcbiAgICAgICAgICAgIC8vIHRoaXMuX2V2ZW50YnVzLnJlZ2lzdGVySGFuZGxlcignbmV3cy1mZWVkJywgaGVhZGVycywgKGVycjogYW55LCBtc2c6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGlmIChtc2cpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5vbk1lc3NhZ2UubmV4dChtc2cpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ldmVudGJ1cy5vbmNsb3NlID0gKCkgPT4gdGhpcy5zdGF0ZUNoYW5nZSgpO1xuICAgICAgICB0aGlzLl9ldmVudGJ1cy5vbmVycm9yID0gKCkgPT4gdGhpcy5zdGF0ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9ldmVudGJ1cy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHNlbmQoZW52ZWxvcDogV2ViU29ja2V0RW52ZWxvcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50YnVzLnB1Ymxpc2goZW52ZWxvcC5hZGRyZXNzLCBlbnZlbG9wLmJvZHkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NlbmQgbWVzc2FnZSBmYWlsZWQnLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==