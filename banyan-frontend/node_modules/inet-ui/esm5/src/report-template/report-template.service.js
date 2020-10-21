/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from "inet-core";
import * as i0 from "@angular/core";
import * as i1 from "inet-core";
var ReportTemplateService = /** @class */ (function () {
    function ReportTemplateService(http) {
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
    ReportTemplateService.prototype.list = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.list, params);
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    ReportTemplateService.prototype.delete = /**
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        this.http.showLoading();
        return this.http.getJSON(this.url.delete, { uuid: uuid });
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    ReportTemplateService.prototype.view = /**
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        this.http.showLoading();
        return this.http.postJSON(this.url.view, { uuid: uuid });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ReportTemplateService.prototype.add = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.http.showLoading();
        return this.http.post(this.url.add, params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ReportTemplateService.prototype.update = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.http.showLoading();
        return this.http.post(this.url.update, params);
    };
    /**
     * @return {?}
     */
    ReportTemplateService.prototype.application = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
        return this.http.getJSON(this.url.application);
    };
    /**
     * @return {?}
     */
    ReportTemplateService.prototype.organId = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
        return this.http.postJSON(this.url.organ);
    };
    /**
     * @param {?} application
     * @return {?}
     */
    ReportTemplateService.prototype.modules = /**
     * @param {?} application
     * @return {?}
     */
    function (application) {
        this.http.showLoading();
        return this.http.getJSON(this.url.modules, { application: application });
    };
    /**
     * @param {?} contentUuid
     * @return {?}
     */
    ReportTemplateService.prototype.downloadFile = /**
     * @param {?} contentUuid
     * @return {?}
     */
    function (contentUuid) {
        return this.http.downloadFile(this.url.download, { docID: contentUuid });
    };
    ReportTemplateService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ReportTemplateService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    /** @nocollapse */ ReportTemplateService.ngInjectableDef = i0.defineInjectable({ factory: function ReportTemplateService_Factory() { return new ReportTemplateService(i0.inject(i1.HttpClientService)); }, token: ReportTemplateService, providedIn: "root" });
    return ReportTemplateService;
}());
export { ReportTemplateService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXRlbXBsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3JlcG9ydC10ZW1wbGF0ZS9yZXBvcnQtdGVtcGxhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7OztBQUs1QztJQWdCSSwrQkFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFabkMsUUFBRyxHQUFHO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7WUFDdkMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7WUFDM0MsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7WUFDM0MsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7WUFDeEMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7WUFDdkMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUM7WUFDdEQsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7WUFDOUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0MsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7U0FDckQsQ0FBQztJQUdGLENBQUM7Ozs7O0lBRUQsb0NBQUk7Ozs7SUFBSixVQUFLLE1BQU07UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7SUFFRCxzQ0FBTTs7OztJQUFOLFVBQU8sSUFBWTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7O0lBRUQsb0NBQUk7Ozs7SUFBSixVQUFLLElBQVk7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7OztJQUVELG1DQUFHOzs7O0lBQUgsVUFBSSxNQUFnQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxzQ0FBTTs7OztJQUFOLFVBQU8sTUFBZ0I7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFFRCwyQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7O0lBRUQsdUNBQU87OztJQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFRCx1Q0FBTzs7OztJQUFQLFVBQVEsV0FBbUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFRCw0Q0FBWTs7OztJQUFaLFVBQWEsV0FBbUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQTdESixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dCQVBPLGlCQUFpQjs7O2dDQUR6QjtDQW9FQyxBQTlERCxJQThEQztTQTNEWSxxQkFBcUI7Ozs7OztJQUM5QixvQ0FVRTs7Ozs7SUFFVSxxQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVwb3J0VGVtcGxhdGVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHVybCA9IHtcbiAgICAgICAgdmlldzogaU5ldC5nZXRQVXJsKCdnbC9leGNlbHRtcGwvdmlldycpLFxuICAgICAgICBkZWxldGU6IGlOZXQuZ2V0UFVybCgnZ2wvZXhjZWx0bXBsL2RlbGV0ZScpLFxuICAgICAgICB1cGRhdGU6IGlOZXQuZ2V0UFVybCgnZ2wvZXhjZWx0bXBsL3VwZGF0ZScpLFxuICAgICAgICBhZGQ6IGlOZXQuZ2V0UFVybCgnZ2wvZXhjZWx0bXBsL2NyZWF0ZScpLFxuICAgICAgICBsaXN0OiBpTmV0LmdldFBVcmwoJ2dsL2V4Y2VsdG1wbC9saXN0JyksXG4gICAgICAgIGFwcGxpY2F0aW9uOiBpTmV0LmdldFBVcmwoJ2Nsb3VkL3N1YmZpcm0vYXBwbGljYXRpb24nKSxcbiAgICAgICAgb3JnYW46IGlOZXQuZ2V0UFVybCgncGx1Z2luL2Zpcm1wcm9maWxlL3ZpZXcnKSxcbiAgICAgICAgbW9kdWxlczogaU5ldC5nZXRQVXJsKCdnbC9leGNlbHRtcGwvbW9kdWxlcycpLFxuICAgICAgICBkb3dubG9hZDogaU5ldC5nZXRQVXJsKCdnbC9maWxlY29udGVudHMvZG93bmxvYWQnKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbGlzdChwYXJhbXMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5saXN0LCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGRlbGV0ZSh1dWlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmRlbGV0ZSwge3V1aWQ6IHV1aWR9KTtcbiAgICB9XG5cbiAgICB2aWV3KHV1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnZpZXcsIHt1dWlkOiB1dWlkfSk7XG4gICAgfVxuXG4gICAgYWRkKHBhcmFtczogRm9ybURhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMudXJsLmFkZCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGFyYW1zOiBGb3JtRGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy51cmwudXBkYXRlLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGFwcGxpY2F0aW9uKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwuYXBwbGljYXRpb24pO1xuICAgIH1cblxuICAgIG9yZ2FuSWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwub3JnYW4pO1xuICAgIH1cblxuICAgIG1vZHVsZXMoYXBwbGljYXRpb246IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwubW9kdWxlcywge2FwcGxpY2F0aW9uOiBhcHBsaWNhdGlvbn0pO1xuICAgIH1cblxuICAgIGRvd25sb2FkRmlsZShjb250ZW50VXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZG93bmxvYWRGaWxlKHRoaXMudXJsLmRvd25sb2FkLCB7ZG9jSUQ6IGNvbnRlbnRVdWlkfSk7XG4gICAgfVxufVxuIl19