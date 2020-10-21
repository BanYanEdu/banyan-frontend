/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VertxSocketState } from "./VertxSocket";
import { VertxSocketManager } from "./VertxSocketManager";
var SocketService = /** @class */ (function () {
    function SocketService() {
        this.onStateChange = new Subject();
        this.onMessage = new Subject();
        this.onMemberStateChange = new Subject();
        this.init();
    }
    Object.defineProperty(SocketService.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket && this.socket.readyState || VertxSocketState.UNSET;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketService.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketService.prototype, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.connecting : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketService.prototype, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.connected : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketService.prototype, "closed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.closed : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketService.prototype, "reconnecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.reconnecting : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketService.prototype, "unavailable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.unavailable : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SocketService.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.socket) {
            this.socket = new VertxSocketManager();
            this.socket.onStateChange.subscribe((/**
             * @return {?}
             */
            function () { return _this.onStateChange.next(_this.readyState); }));
            this.socket.onMessage.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return _this.onMessage.next(message); }));
            this.socket.onMessageOnline.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return _this.onMemberStateChange.next(message); }));
        }
    };
    /**
     * @return {?}
     */
    SocketService.prototype.connect = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    /**
     * @return {?}
     */
    SocketService.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    };
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    SocketService.prototype.publish = /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    function (address, message) {
        return this.send(address, message);
    };
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    SocketService.prototype.send = /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    function (address, message) {
        this.init();
        return this.socket.send(address, message);
    };
    /**
     * @param {?} app
     * @param {?} message
     * @return {?}
     */
    SocketService.prototype.createMessagePackage = /**
     * @param {?} app
     * @param {?} message
     * @return {?}
     */
    function (app, message) {
        return {
            message: {
                application: app,
                alert: message,
                sender: iNet.username,
                content: message
            },
            application: app,
            sender: iNet.username,
            sent: new Date().getTime()
        };
    };
    // @deprecated
    // @deprecated
    /**
     * @param {?} groupCode
     * @param {?} message
     * @return {?}
     */
    SocketService.prototype.sendGroup = 
    // @deprecated
    /**
     * @param {?} groupCode
     * @param {?} message
     * @return {?}
     */
    function (groupCode, message) {
        // Prepend # into groupCode
        this.send('#' + groupCode, message);
    };
    SocketService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SocketService.ctorParameters = function () { return []; };
    return SocketService;
}());
export { SocketService };
if (false) {
    /** @type {?} */
    SocketService.prototype.onStateChange;
    /** @type {?} */
    SocketService.prototype.onMessage;
    /** @type {?} */
    SocketService.prototype.onMemberStateChange;
    /**
     * @type {?}
     * @private
     */
    SocketService.prototype.socket;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydHgtc29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvdmVydHgvdmVydHgtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQWdDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR3hEO0lBb0NJO1FBbENBLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFDaEQsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBaUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQWhDRCxzQkFBSSxxQ0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUMzRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNOzs7O1FBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBRUQsc0JBQUksb0NBQVM7Ozs7UUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNOzs7O1FBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBWTs7OztRQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMxRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFXOzs7O1FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekQsQ0FBQzs7O09BQUE7Ozs7SUFRRCw0QkFBSTs7O0lBQUo7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUzs7O1lBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBeEMsQ0FBd0MsRUFBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUE1QixDQUE0QixFQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBdEMsQ0FBc0MsRUFBQyxDQUFDO1NBQzlGO0lBQ0wsQ0FBQzs7OztJQUVELCtCQUFPOzs7SUFBUDtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsa0NBQVU7OztJQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUNMLENBQUM7Ozs7OztJQUVELCtCQUFPOzs7OztJQUFQLFVBQVEsT0FBZSxFQUFFLE9BQVk7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFRCw0QkFBSTs7Ozs7SUFBSixVQUFLLE9BQWUsRUFBRSxPQUFZO1FBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUVELDRDQUFvQjs7Ozs7SUFBcEIsVUFBcUIsR0FBVyxFQUFFLE9BQWU7UUFDN0MsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsR0FBRztnQkFDaEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNyQixPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELFdBQVcsRUFBRSxHQUFHO1lBQ2hCLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNyQixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7U0FDN0IsQ0FBQztJQUNOLENBQUM7SUFFRCxjQUFjOzs7Ozs7O0lBQ2QsaUNBQVM7Ozs7Ozs7SUFBVCxVQUFVLFNBQWlCLEVBQUUsT0FBWTtRQUNyQywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dCQXZGSixVQUFVOzs7O0lBd0ZYLG9CQUFDO0NBQUEsQUF4RkQsSUF3RkM7U0F2RlksYUFBYTs7O0lBQ3RCLHNDQUFnRDs7SUFDaEQsa0NBQXdDOztJQUN4Qyw0Q0FBcUQ7Ozs7O0lBOEJyRCwrQkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtWZXJ0eE1lc3NhZ2UsIFZlcnR4T25saW5lRGF0YSwgVmVydHhTb2NrZXRTdGF0ZX0gZnJvbSBcIi4vVmVydHhTb2NrZXRcIjtcbmltcG9ydCB7VmVydHhTb2NrZXRNYW5hZ2VyfSBmcm9tIFwiLi9WZXJ0eFNvY2tldE1hbmFnZXJcIjtcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2tldFNlcnZpY2Uge1xuICAgIG9uU3RhdGVDaGFuZ2UgPSBuZXcgU3ViamVjdDxWZXJ0eFNvY2tldFN0YXRlPigpO1xuICAgIG9uTWVzc2FnZSA9IG5ldyBTdWJqZWN0PFZlcnR4TWVzc2FnZT4oKTtcbiAgICBvbk1lbWJlclN0YXRlQ2hhbmdlID0gbmV3IFN1YmplY3Q8VmVydHhPbmxpbmVEYXRhPigpO1xuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKTogVmVydHhTb2NrZXRTdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCAmJiB0aGlzLnNvY2tldC5yZWFkeVN0YXRlIHx8IFZlcnR4U29ja2V0U3RhdGUuVU5TRVQ7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXR1cygpOiBWZXJ0eFNvY2tldFN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgY29ubmVjdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0ID8gdGhpcy5zb2NrZXQuY29ubmVjdGluZyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBjb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCA/IHRoaXMuc29ja2V0LmNvbm5lY3RlZCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBjbG9zZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCA/IHRoaXMuc29ja2V0LmNsb3NlZCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCByZWNvbm5lY3RpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCA/IHRoaXMuc29ja2V0LnJlY29ubmVjdGluZyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCB1bmF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0ID8gdGhpcy5zb2NrZXQudW5hdmFpbGFibGUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvY2tldDogVmVydHhTb2NrZXRNYW5hZ2VyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IFZlcnR4U29ja2V0TWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQub25TdGF0ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblN0YXRlQ2hhbmdlLm5leHQodGhpcy5yZWFkeVN0YXRlKSk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbk1lc3NhZ2Uuc3Vic2NyaWJlKChtZXNzYWdlKSA9PiB0aGlzLm9uTWVzc2FnZS5uZXh0KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uTWVzc2FnZU9ubGluZS5zdWJzY3JpYmUoKG1lc3NhZ2UpID0+IHRoaXMub25NZW1iZXJTdGF0ZUNoYW5nZS5uZXh0KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1Ymxpc2goYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChhZGRyZXNzLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBzZW5kKGFkZHJlc3M6IHN0cmluZywgbWVzc2FnZTogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuc2VuZChhZGRyZXNzLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVNZXNzYWdlUGFja2FnZShhcHA6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246IGFwcCxcbiAgICAgICAgICAgICAgICBhbGVydDogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IGlOZXQudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgY29udGVudDogbWVzc2FnZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiBhcHAsXG4gICAgICAgICAgICBzZW5kZXI6IGlOZXQudXNlcm5hbWUsXG4gICAgICAgICAgICBzZW50OiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEBkZXByZWNhdGVkXG4gICAgc2VuZEdyb3VwKGdyb3VwQ29kZTogc3RyaW5nLCBtZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgLy8gUHJlcGVuZCAjIGludG8gZ3JvdXBDb2RlXG4gICAgICAgIHRoaXMuc2VuZCgnIycgKyBncm91cENvZGUsIG1lc3NhZ2UpO1xuICAgIH1cbn0iXX0=