/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from "inet-core";
import * as i0 from "@angular/core";
import * as i1 from "inet-core";
export class SharingInformationService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            application_list: iNet.getPUrl("system/application/list"),
            //firmContext (appname)
            data_rights: iNet.getPUrl("datarights/available"),
            //params: appname
            user_rights_list: iNet.getPUrl("datarights/list"),
            //params: appname, group, myshare: boolean
            data_rights_update: iNet.getPUrl("datarights/update"),
            //params: {member: string, group: string, right: string},
            data_rights_delete: iNet.getPUrl("datarights/delete"),
            //params: appname
            users_suggest: iNet.getPUrl("cloud/profileacct/list")
        };
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getApplicationList(params) {
        this.http.showLoading();
        return this.http.getJSON(this.url.application_list, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getApplicationRights(params) {
        this.http.showLoading();
        return this.http.getJSON(this.url.data_rights, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getUserRights(params) {
        this.http.showLoading();
        return this.http.getJSON(this.url.user_rights_list, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    updateUserRight(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.data_rights_update, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    deleteUserRight(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.data_rights_delete, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getSuggestUser(params) {
        return this.http.postJSON(this.url.users_suggest, params);
    }
}
SharingInformationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SharingInformationService.ctorParameters = () => [
    { type: HttpClientService }
];
/** @nocollapse */ SharingInformationService.ngInjectableDef = i0.defineInjectable({ factory: function SharingInformationService_Factory() { return new SharingInformationService(i0.inject(i1.HttpClientService)); }, token: SharingInformationService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    SharingInformationService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    SharingInformationService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmluZy1pbmZvcm1hdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyaW5nLWluZm9ybWF0aW9uL3NoYXJpbmctaW5mb3JtYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7OztBQU01QyxNQUFNLE9BQU8seUJBQXlCOzs7O0lBVWxDLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBVG5DLFFBQUcsR0FBRztZQUNWLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7O1lBQ3pELFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDOztZQUNqRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDOztZQUNqRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDOztZQUNyRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDOztZQUNyRCxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztTQUN4RCxDQUFDO0lBR0YsQ0FBQzs7Ozs7SUFHRCxrQkFBa0IsQ0FBQyxNQUFXO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2hFLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsTUFBVztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDMUQsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsTUFBVztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMvRCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxNQUFXO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2xFLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLE1BQVc7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDbEUsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsTUFBVztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzdELENBQUM7OztZQTVDSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs7WUFMTyxpQkFBaUI7Ozs7Ozs7O0lBT3JCLHdDQU9FOzs7OztJQUVVLHlDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJpbmdJbmZvcm1hdGlvblNlcnZpY2Uge1xuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICBhcHBsaWNhdGlvbl9saXN0OiBpTmV0LmdldFBVcmwoXCJzeXN0ZW0vYXBwbGljYXRpb24vbGlzdFwiKSwgLy9maXJtQ29udGV4dCAoYXBwbmFtZSlcbiAgICAgICAgZGF0YV9yaWdodHM6IGlOZXQuZ2V0UFVybChcImRhdGFyaWdodHMvYXZhaWxhYmxlXCIpLCAvL3BhcmFtczogYXBwbmFtZVxuICAgICAgICB1c2VyX3JpZ2h0c19saXN0OiBpTmV0LmdldFBVcmwoXCJkYXRhcmlnaHRzL2xpc3RcIiksIC8vcGFyYW1zOiBhcHBuYW1lLCBncm91cCwgbXlzaGFyZTogYm9vbGVhblxuICAgICAgICBkYXRhX3JpZ2h0c191cGRhdGU6IGlOZXQuZ2V0UFVybChcImRhdGFyaWdodHMvdXBkYXRlXCIpLCAvL3BhcmFtczoge21lbWJlcjogc3RyaW5nLCBncm91cDogc3RyaW5nLCByaWdodDogc3RyaW5nfSxcbiAgICAgICAgZGF0YV9yaWdodHNfZGVsZXRlOiBpTmV0LmdldFBVcmwoXCJkYXRhcmlnaHRzL2RlbGV0ZVwiKSwgLy9wYXJhbXM6IGFwcG5hbWVcbiAgICAgICAgdXNlcnNfc3VnZ2VzdDogaU5ldC5nZXRQVXJsKFwiY2xvdWQvcHJvZmlsZWFjY3QvbGlzdFwiKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgfVxuXG5cbiAgICBnZXRBcHBsaWNhdGlvbkxpc3QocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5hcHBsaWNhdGlvbl9saXN0LCBwYXJhbXMpXG4gICAgfVxuXG4gICAgZ2V0QXBwbGljYXRpb25SaWdodHMocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwuZGF0YV9yaWdodHMsIHBhcmFtcylcbiAgICB9XG5cbiAgICBnZXRVc2VyUmlnaHRzKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLnVzZXJfcmlnaHRzX2xpc3QsIHBhcmFtcylcbiAgICB9XG5cbiAgICB1cGRhdGVVc2VyUmlnaHQocGFyYW1zOiBhbnkpOk9ic2VydmFibGU8YW55PntcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwuZGF0YV9yaWdodHNfdXBkYXRlLCBwYXJhbXMpXG4gICAgfVxuXG4gICAgZGVsZXRlVXNlclJpZ2h0KHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5kYXRhX3JpZ2h0c19kZWxldGUsIHBhcmFtcylcbiAgICB9XG5cbiAgICBnZXRTdWdnZXN0VXNlcihwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC51c2Vyc19zdWdnZXN0LCBwYXJhbXMpXG4gICAgfVxufVxuIl19