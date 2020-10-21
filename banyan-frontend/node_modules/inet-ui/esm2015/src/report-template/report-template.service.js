/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from "inet-core";
import * as i0 from "@angular/core";
import * as i1 from "inet-core";
export class ReportTemplateService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            view: iNet.getPUrl('gl/exceltmpl/view'),
            delete: iNet.getPUrl('gl/exceltmpl/delete'),
            update: iNet.getPUrl('gl/exceltmpl/update'),
            add: iNet.getPUrl('gl/exceltmpl/create'),
            list: iNet.getPUrl('gl/exceltmpl/list'),
            application: iNet.getPUrl('cloud/subfirm/application'),
            organ: iNet.getPUrl('plugin/firmprofile/view'),
            modules: iNet.getPUrl('gl/exceltmpl/modules'),
            download: iNet.getPUrl('gl/filecontents/download')
        };
    }
    /**
     * @param {?} params
     * @return {?}
     */
    list(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.list, params);
    }
    /**
     * @param {?} uuid
     * @return {?}
     */
    delete(uuid) {
        this.http.showLoading();
        return this.http.getJSON(this.url.delete, { uuid: uuid });
    }
    /**
     * @param {?} uuid
     * @return {?}
     */
    view(uuid) {
        this.http.showLoading();
        return this.http.postJSON(this.url.view, { uuid: uuid });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    add(params) {
        this.http.showLoading();
        return this.http.post(this.url.add, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
        this.http.showLoading();
        return this.http.post(this.url.update, params);
    }
    /**
     * @return {?}
     */
    application() {
        this.http.showLoading();
        return this.http.getJSON(this.url.application);
    }
    /**
     * @return {?}
     */
    organId() {
        this.http.showLoading();
        return this.http.postJSON(this.url.organ);
    }
    /**
     * @param {?} application
     * @return {?}
     */
    modules(application) {
        this.http.showLoading();
        return this.http.getJSON(this.url.modules, { application: application });
    }
    /**
     * @param {?} contentUuid
     * @return {?}
     */
    downloadFile(contentUuid) {
        return this.http.downloadFile(this.url.download, { docID: contentUuid });
    }
}
ReportTemplateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ReportTemplateService.ctorParameters = () => [
    { type: HttpClientService }
];
/** @nocollapse */ ReportTemplateService.ngInjectableDef = i0.defineInjectable({ factory: function ReportTemplateService_Factory() { return new ReportTemplateService(i0.inject(i1.HttpClientService)); }, token: ReportTemplateService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ReportTemplateService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXRlbXBsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3JlcG9ydC10ZW1wbGF0ZS9yZXBvcnQtdGVtcGxhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7OztBQVE1QyxNQUFNLE9BQU8scUJBQXFCOzs7O0lBYTlCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBWm5DLFFBQUcsR0FBRztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDO1lBQzNDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDO1lBQzNDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDO1lBQ3hDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDO1lBQ3RELEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDO1lBQzlDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDO1NBQ3JELENBQUM7SUFHRixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxNQUFNO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7OztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFRCxHQUFHLENBQUMsTUFBZ0I7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQWdCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsV0FBbUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsV0FBbUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7OztZQTdESixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs7WUFQTyxpQkFBaUI7Ozs7Ozs7O0lBU3JCLG9DQVVFOzs7OztJQUVVLHFDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXBvcnRUZW1wbGF0ZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICB2aWV3OiBpTmV0LmdldFBVcmwoJ2dsL2V4Y2VsdG1wbC92aWV3JyksXG4gICAgICAgIGRlbGV0ZTogaU5ldC5nZXRQVXJsKCdnbC9leGNlbHRtcGwvZGVsZXRlJyksXG4gICAgICAgIHVwZGF0ZTogaU5ldC5nZXRQVXJsKCdnbC9leGNlbHRtcGwvdXBkYXRlJyksXG4gICAgICAgIGFkZDogaU5ldC5nZXRQVXJsKCdnbC9leGNlbHRtcGwvY3JlYXRlJyksXG4gICAgICAgIGxpc3Q6IGlOZXQuZ2V0UFVybCgnZ2wvZXhjZWx0bXBsL2xpc3QnKSxcbiAgICAgICAgYXBwbGljYXRpb246IGlOZXQuZ2V0UFVybCgnY2xvdWQvc3ViZmlybS9hcHBsaWNhdGlvbicpLFxuICAgICAgICBvcmdhbjogaU5ldC5nZXRQVXJsKCdwbHVnaW4vZmlybXByb2ZpbGUvdmlldycpLFxuICAgICAgICBtb2R1bGVzOiBpTmV0LmdldFBVcmwoJ2dsL2V4Y2VsdG1wbC9tb2R1bGVzJyksXG4gICAgICAgIGRvd25sb2FkOiBpTmV0LmdldFBVcmwoJ2dsL2ZpbGVjb250ZW50cy9kb3dubG9hZCcpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBsaXN0KHBhcmFtcyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLmxpc3QsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgZGVsZXRlKHV1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwuZGVsZXRlLCB7dXVpZDogdXVpZH0pO1xuICAgIH1cblxuICAgIHZpZXcodXVpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwudmlldywge3V1aWQ6IHV1aWR9KTtcbiAgICB9XG5cbiAgICBhZGQocGFyYW1zOiBGb3JtRGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy51cmwuYWRkLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZShwYXJhbXM6IEZvcm1EYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnVybC51cGRhdGUsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgYXBwbGljYXRpb24oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5hcHBsaWNhdGlvbik7XG4gICAgfVxuXG4gICAgb3JnYW5JZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5vcmdhbik7XG4gICAgfVxuXG4gICAgbW9kdWxlcyhhcHBsaWNhdGlvbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5tb2R1bGVzLCB7YXBwbGljYXRpb246IGFwcGxpY2F0aW9ufSk7XG4gICAgfVxuXG4gICAgZG93bmxvYWRGaWxlKGNvbnRlbnRVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kb3dubG9hZEZpbGUodGhpcy51cmwuZG93bmxvYWQsIHtkb2NJRDogY29udGVudFV1aWR9KTtcbiAgICB9XG59XG4iXX0=