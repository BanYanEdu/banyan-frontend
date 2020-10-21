/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from 'inet-core';
export class NotifyMessageService {
    /**
     * @param {?} http
     */
    constructor(http) {
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
    getMessages(params = {}) {
        return this.http.getJSON(this.url.list, params);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    count(params) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.http.getJSON(this.url.list, params).subscribe((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
                resolve(v);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                resolve();
            }));
        }));
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    clearAll(params = {}) {
        return this.http.postJSON(this.url.clear, params);
    }
    /**
     * @param {?} app
     * @param {?} activityId
     * @return {?}
     */
    loadNotify(app, activityId) {
        return this.http.getJSON(this.url.load_notify, { activity: activityId, application: app });
    }
    /**
     * @param {?} activityId
     * @return {?}
     */
    clearByActivityId(activityId) {
        return this.http.postJSON(this.url.clear, { activity: activityId });
    }
}
NotifyMessageService.instance = null;
NotifyMessageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotifyMessageService.ctorParameters = () => [
    { type: HttpClientService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LW1lc3NhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvY29tbW9uL25vdGlmeS1tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBTzVDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFRN0IsWUFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFObkMsUUFBRyxHQUFHO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDNUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7WUFDbEQsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUM7U0FDMUQsQ0FBQztRQUdFLE9BQU8sb0JBQW9CLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsU0FBYyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFRCxLQUFLLENBQUMsTUFBWTtRQUNkLE9BQU8sSUFBSSxPQUFPOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUzs7OztZQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7Z0JBQzFELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUM7Ozs7WUFBRSxDQUFDLEdBQXNCLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsU0FBYyxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVcsRUFBRSxVQUFrQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLFVBQWtCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDOztBQW5DTSw2QkFBUSxHQUF5QixJQUFJLENBQUM7O1lBRmhELFVBQVU7Ozs7WUFOSCxpQkFBaUI7Ozs7SUFRckIsOEJBQTZDOzs7OztJQUM3QyxtQ0FJRTs7Ozs7SUFFVSxvQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQge0h0dHBFcnJvclJlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZ5TWVzc2FnZVNlcnZpY2Uge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogTm90aWZ5TWVzc2FnZVNlcnZpY2UgPSBudWxsO1xuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICBsaXN0OiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9ub3RpZnknKSxcbiAgICAgICAgY2xlYXI6IGlOZXQuZ2V0UFVybCgnc29jaWFsL2FjdGl2aXR5L2NsZWFybm90aWZ5JyksXG4gICAgICAgIGxvYWRfbm90aWZ5OiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9sb2Fkbm90aWZ5JylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSkge1xuICAgICAgICByZXR1cm4gTm90aWZ5TWVzc2FnZVNlcnZpY2UuaW5zdGFuY2UgPSBOb3RpZnlNZXNzYWdlU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2VzKHBhcmFtczogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwubGlzdCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBjb3VudChwYXJhbXM/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0LCBwYXJhbXMpLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgIH0sIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyQWxsKHBhcmFtczogYW55ID0ge30pe1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLmNsZWFyLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGxvYWROb3RpZnkoYXBwOiBzdHJpbmcsIGFjdGl2aXR5SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5sb2FkX25vdGlmeSwge2FjdGl2aXR5OiBhY3Rpdml0eUlkLCBhcHBsaWNhdGlvbjogYXBwfSk7XG4gICAgfVxuXG4gICAgY2xlYXJCeUFjdGl2aXR5SWQoYWN0aXZpdHlJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+ICB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwuY2xlYXIsIHthY3Rpdml0eTogYWN0aXZpdHlJZH0pO1xuICAgIH1cblxufVxuXG4iXX0=