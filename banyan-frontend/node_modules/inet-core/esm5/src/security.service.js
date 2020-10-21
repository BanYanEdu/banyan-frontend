/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from "./http-client.service";
var SecurityService = /** @class */ (function () {
    function SecurityService(http) {
        this.http = http;
        this.roles = [];
        if (!SecurityService.instance) {
            this.roles = this.parserRoleFrom(iNet.permission || {});
        }
        return SecurityService.instance = SecurityService.instance || this;
    }
    /**
     * @return {?}
     */
    SecurityService.prototype.load = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve();
            }
            else {
                _this.http.postJSON(iNet.getPUrl('system/userrole/list'))
                    .subscribe((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) {
                    for (var key in obj) {
                        _this.append(obj[key]);
                    }
                    resolve(obj);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    resolve();
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    SecurityService.prototype.parserRoleFrom = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
        var roles = [];
        for (var key in obj) {
            if (obj[key] === "true" || obj[key] === true) {
                roles.push(key);
            }
        }
        return roles;
    };
    /**
     * @private
     * @param {?} arrArg
     * @return {?}
     */
    SecurityService.prototype.uniqueArray = /**
     * @private
     * @param {?} arrArg
     * @return {?}
     */
    function (arrArg) {
        return arrArg.filter((/**
         * @param {?} elem
         * @param {?} pos
         * @param {?} arr
         * @return {?}
         */
        function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        }));
    };
    ;
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    SecurityService.prototype.append = /**
     * @private
     * @param {?} v
     * @return {?}
     */
    function (v) {
        //console.log('[append]roles', v);
        this.roles = this.uniqueArray(this.roles.concat(v));
        return this.roles;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    SecurityService.prototype.hasRole = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var _this = this;
        //console.log('[checkRole]=', v);
        /** @type {?} */
        var roles = v.split(',');
        if (roles.length > 1) {
            /** @type {?} */
            var __items = roles.filter((/**
             * @param {?} role
             * @return {?}
             */
            function (role) { return _this.roles.indexOf(role) > -1; }));
            return (__items.length > 0);
        }
        return (this.roles.indexOf(v) > -1);
    };
    /**
     * Check session timeout when system is idle
     */
    /**
     * Check session timeout when system is idle
     * @return {?}
     */
    SecurityService.prototype.ping = /**
     * Check session timeout when system is idle
     * @return {?}
     */
    function () {
        if (iNet.isEmpty(iNet.username) || !iNet.enableLayout) {
            return;
        }
        /** @type {?} */
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.setAttribute("src", iNet.getPUrl('common/page/ping'));
        iframe.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var __loginUrl = 'cas/login';
            try {
                /** @type {?} */
                var __path = iframe.contentWindow.location.pathname || '';
                /** @type {?} */
                var __isLogin = (__loginUrl.match(__path) || []).length > 0;
                if (__isLogin) {
                    window.location.reload();
                }
            }
            catch (ex) {
                window.location.reload();
            }
            document.body.removeChild(iframe);
        });
        document.body.appendChild(iframe);
    };
    SecurityService.instance = null;
    SecurityService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SecurityService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return SecurityService;
}());
export { SecurityService };
if (false) {
    /** @type {?} */
    SecurityService.instance;
    /**
     * @type {?}
     * @private
     */
    SecurityService.prototype.roles;
    /**
     * @type {?}
     * @private
     */
    SecurityService.prototype.http;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9zZWN1cml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBS3hEO0lBS0kseUJBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBRm5DLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxlQUFlLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFTSw4QkFBSTs7O0lBQVg7UUFBQSxpQkFnQkM7UUFmRyxPQUFPLElBQUksT0FBTzs7OztRQUFDLFVBQUEsT0FBTztZQUN0QixJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkUsT0FBTyxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7cUJBQ25ELFNBQVM7Ozs7Z0JBQUMsVUFBQyxHQUFRO29CQUNoQixLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTt3QkFDakIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENB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Q0o7WUFBQyxPQUFPLEVBQUUsRUFBRTtnQkFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFBLENBQUM7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBcEZNLHdCQUFRLEdBQW9CLElBQUksQ0FBQzs7Z0JBRjNDLFVBQVU7Ozs7Z0JBTEgsaUJBQWlCOztJQTZGekIsc0JBQUM7Q0FBQSxBQXhGRCxJQXdGQztTQXZGWSxlQUFlOzs7SUFDeEIseUJBQXdDOzs7OztJQUN4QyxnQ0FBa0M7Ozs7O0lBRXRCLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLWNsaWVudC5zZXJ2aWNlXCI7XG5pbXBvcnQge0h0dHBFcnJvclJlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlTZXJ2aWNlIHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IFNlY3VyaXR5U2VydmljZSA9IG51bGw7XG4gICAgcHJpdmF0ZSByb2xlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSkge1xuICAgICAgICBpZiAoIVNlY3VyaXR5U2VydmljZS5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5yb2xlcyA9IHRoaXMucGFyc2VyUm9sZUZyb20oaU5ldC5wZXJtaXNzaW9uIHx8IHt9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU2VjdXJpdHlTZXJ2aWNlLmluc3RhbmNlID0gU2VjdXJpdHlTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWYoIXdpbmRvd1snaU5ldCddIHx8IGlOZXQuaXNFbXB0eShpTmV0LnByZWZpeCkgfHwgIWlOZXQuZW5hYmxlTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnJvbGUvbGlzdCcpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChvYmo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VyUm9sZUZyb20ob2JqOiBPYmplY3QpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgbGV0IHJvbGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmpba2V5XSA9PT0gXCJ0cnVlXCIgfHwgb2JqW2tleV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByb2xlcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvbGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5pcXVlQXJyYXkoYXJyQXJnKSB7XG4gICAgICAgIHJldHVybiBhcnJBcmcuZmlsdGVyKGZ1bmN0aW9uKGVsZW0sIHBvcyxhcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnIuaW5kZXhPZihlbGVtKSA9PSBwb3M7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGFwcGVuZCh2OiBBcnJheTxzdHJpbmc+KTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ1thcHBlbmRdcm9sZXMnLCB2KTtcbiAgICAgICAgdGhpcy5yb2xlcyA9IHRoaXMudW5pcXVlQXJyYXkodGhpcy5yb2xlcy5jb25jYXQodikpO1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcztcbiAgICB9XG5cbiAgICBoYXNSb2xlKHY6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdbY2hlY2tSb2xlXT0nLCB2KTtcbiAgICAgICAgbGV0IHJvbGVzID0gdi5zcGxpdCgnLCcpO1xuICAgICAgICBpZiAocm9sZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IF9faXRlbXMgPSByb2xlcy5maWx0ZXIocm9sZSA9PiB0aGlzLnJvbGVzLmluZGV4T2Yocm9sZSkgPiAtMSk7XG4gICAgICAgICAgICByZXR1cm4gKF9faXRlbXMubGVuZ3RoID4gMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnJvbGVzLmluZGV4T2YodikgPiAtMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgc2Vzc2lvbiB0aW1lb3V0IHdoZW4gc3lzdGVtIGlzIGlkbGVcbiAgICAgKi9cbiAgICBwaW5nKCkge1xuICAgICAgICBpZihpTmV0LmlzRW1wdHkoaU5ldC51c2VybmFtZSkgfHwgIWlOZXQuZW5hYmxlTGF5b3V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsIGlOZXQuZ2V0UFVybCgnY29tbW9uL3BhZ2UvcGluZycpKTtcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IF9fbG9naW5VcmwgPSAnY2FzL2xvZ2luJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IF9fcGF0aCA9IGlmcmFtZS5jb250ZW50V2luZG93LmxvY2F0aW9uLnBhdGhuYW1lIHx8ICcnO1xuICAgICAgICAgICAgICAgIGxldCBfX2lzTG9naW4gPSAoX19sb2dpblVybC5tYXRjaChfX3BhdGgpIHx8IFtdKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgIGlmIChfX2lzTG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgfVxuXG59XG4iXX0=