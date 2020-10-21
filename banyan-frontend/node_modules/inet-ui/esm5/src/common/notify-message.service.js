/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from 'inet-core';
var NotifyMessageService = /** @class */ (function () {
    function NotifyMessageService(http) {
        this.http = http;
        this.url = {
            list: iNet.getPUrl('social/activity/notify'),
            clear: iNet.getPUrl('social/activity/clearnotify'),
            load_notify: iNet.getPUrl('social/activity/loadnotify')
        };
        return NotifyMessageService.instance = NotifyMessageService.instance || this;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    NotifyMessageService.prototype.getMessages = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        if (params === void 0) { params = {}; }
        return this.http.getJSON(this.url.list, params);
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    NotifyMessageService.prototype.count = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.http.getJSON(_this.url.list, params).subscribe((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                resolve(v);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    NotifyMessageService.prototype.clearAll = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        if (params === void 0) { params = {}; }
        return this.http.postJSON(this.url.clear, params);
    };
    /**
     * @param {?} app
     * @param {?} activityId
     * @return {?}
     */
    NotifyMessageService.prototype.loadNotify = /**
     * @param {?} app
     * @param {?} activityId
     * @return {?}
     */
    function (app, activityId) {
        return this.http.getJSON(this.url.load_notify, { activity: activityId, application: app });
    };
    /**
     * @param {?} activityId
     * @return {?}
     */
    NotifyMessageService.prototype.clearByActivityId = /**
     * @param {?} activityId
     * @return {?}
     */
    function (activityId) {
        return this.http.postJSON(this.url.clear, { activity: activityId });
    };
    NotifyMessageService.instance = null;
    NotifyMessageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotifyMessageService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return NotifyMessageService;
}());
export { NotifyMessageService };
if (false) {
    /** @type {?} */
    NotifyMessageService.instance;
    /**
     * @type {?}
     * @private
     */
    NotifyMessageService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    NotifyMessageService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LW1lc3NhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvY29tbW9uL25vdGlmeS1tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBTTVDO0lBU0ksOEJBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBTm5DLFFBQUcsR0FBRztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQzVDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO1lBQ2xELFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO1NBQzFELENBQUM7UUFHRSxPQUFPLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ2pGLENBQUM7Ozs7O0lBRUQsMENBQVc7Ozs7SUFBWCxVQUFZLE1BQWdCO1FBQWhCLHVCQUFBLEVBQUEsV0FBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELG9DQUFLOzs7O0lBQUwsVUFBTSxNQUFZO1FBQWxCLGlCQVFDO1FBUEcsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFBLE9BQU87WUFDdEIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsQ0FBTTtnQkFDdEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQzs7OztZQUFFLFVBQUMsR0FBc0I7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsdUNBQVE7Ozs7SUFBUixVQUFTLE1BQWdCO1FBQWhCLHVCQUFBLEVBQUEsV0FBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7Ozs7SUFFRCx5Q0FBVTs7Ozs7SUFBVixVQUFXLEdBQVcsRUFBRSxVQUFrQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDOzs7OztJQUVELGdEQUFpQjs7OztJQUFqQixVQUFrQixVQUFrQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQW5DTSw2QkFBUSxHQUF5QixJQUFJLENBQUM7O2dCQUZoRCxVQUFVOzs7O2dCQU5ILGlCQUFpQjs7SUE2Q3pCLDJCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F0Q1ksb0JBQW9COzs7SUFDN0IsOEJBQTZDOzs7OztJQUM3QyxtQ0FJRTs7Ozs7SUFFVSxvQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQge0h0dHBFcnJvclJlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZ5TWVzc2FnZVNlcnZpY2Uge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogTm90aWZ5TWVzc2FnZVNlcnZpY2UgPSBudWxsO1xuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICBsaXN0OiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9ub3RpZnknKSxcbiAgICAgICAgY2xlYXI6IGlOZXQuZ2V0UFVybCgnc29jaWFsL2FjdGl2aXR5L2NsZWFybm90aWZ5JyksXG4gICAgICAgIGxvYWRfbm90aWZ5OiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9sb2Fkbm90aWZ5JylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSkge1xuICAgICAgICByZXR1cm4gTm90aWZ5TWVzc2FnZVNlcnZpY2UuaW5zdGFuY2UgPSBOb3RpZnlNZXNzYWdlU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2VzKHBhcmFtczogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwubGlzdCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBjb3VudChwYXJhbXM/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0LCBwYXJhbXMpLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgIH0sIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyQWxsKHBhcmFtczogYW55ID0ge30pe1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLmNsZWFyLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGxvYWROb3RpZnkoYXBwOiBzdHJpbmcsIGFjdGl2aXR5SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5sb2FkX25vdGlmeSwge2FjdGl2aXR5OiBhY3Rpdml0eUlkLCBhcHBsaWNhdGlvbjogYXBwfSk7XG4gICAgfVxuXG4gICAgY2xlYXJCeUFjdGl2aXR5SWQoYWN0aXZpdHlJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+ICB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwuY2xlYXIsIHthY3Rpdml0eTogYWN0aXZpdHlJZH0pO1xuICAgIH1cblxufVxuXG4iXX0=