/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from "inet-core";
import * as i0 from "@angular/core";
import * as i1 from "inet-core";
var EmailTemplateService = /** @class */ (function () {
    function EmailTemplateService(http) {
        this.http = http;
        this.url = {
            list_params: iNet.getPUrl('discovery/formsubmit'),
            load: iNet.getPUrl('gl/firm/email/load'),
            update: iNet.getPUrl('gl/firm/email/update')
        };
    }
    /**
     * @param {?} application
     * @param {?} discovery
     * @return {?}
     */
    EmailTemplateService.prototype.listParams = /**
     * @param {?} application
     * @param {?} discovery
     * @return {?}
     */
    function (application, discovery) {
        this.http.showLoading();
        return this.http.postJSON(this.url.list_params, { application: application, discovery: discovery });
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    EmailTemplateService.prototype.loadById = /**
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        this.http.showLoading();
        return this.http.postJSON(this.url.load, { templateId: uuid });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    EmailTemplateService.prototype.update = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.update, params);
    };
    EmailTemplateService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    EmailTemplateService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    /** @nocollapse */ EmailTemplateService.ngInjectableDef = i0.defineInjectable({ factory: function EmailTemplateService_Factory() { return new EmailTemplateService(i0.inject(i1.HttpClientService)); }, token: EmailTemplateService, providedIn: "root" });
    return EmailTemplateService;
}());
export { EmailTemplateService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    EmailTemplateService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtdGVtcGxhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZW1haWwtdGVtcGxhdGUvZW1haWwtdGVtcGxhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7OztBQUs1QztJQU1JLDhCQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUduQyxRQUFHLEdBQUc7WUFDVixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUNqRCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztZQUN4QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztTQUMvQyxDQUFDO0lBTkMsQ0FBQzs7Ozs7O0lBUUoseUNBQVU7Ozs7O0lBQVYsVUFBVyxXQUFtQixFQUFFLFNBQWlCO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDdEcsQ0FBQzs7Ozs7SUFFRCx1Q0FBUTs7OztJQUFSLFVBQVMsSUFBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7OztJQUVELHFDQUFNOzs7O0lBQU4sVUFBTyxNQUFXO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQTVCSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dCQVBPLGlCQUFpQjs7OytCQUR6QjtDQW9DQyxBQTlCRCxJQThCQztTQTFCWSxvQkFBb0I7Ozs7OztJQUs3QixtQ0FJRTs7Ozs7SUFQVSxvQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbWFpbFRlbXBsYXRlU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgcHJpdmF0ZSB1cmwgPSB7XG4gICAgICAgIGxpc3RfcGFyYW1zOiBpTmV0LmdldFBVcmwoJ2Rpc2NvdmVyeS9mb3Jtc3VibWl0JyksXG4gICAgICAgIGxvYWQ6IGlOZXQuZ2V0UFVybCgnZ2wvZmlybS9lbWFpbC9sb2FkJyksXG4gICAgICAgIHVwZGF0ZTogaU5ldC5nZXRQVXJsKCdnbC9maXJtL2VtYWlsL3VwZGF0ZScpXG4gICAgfTtcblxuICAgIGxpc3RQYXJhbXMoYXBwbGljYXRpb246IHN0cmluZywgZGlzY292ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5saXN0X3BhcmFtcywge2FwcGxpY2F0aW9uOiBhcHBsaWNhdGlvbiwgZGlzY292ZXJ5OiBkaXNjb3Zlcnl9KTtcbiAgICB9XG5cbiAgICBsb2FkQnlJZCh1dWlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5sb2FkLCB7dGVtcGxhdGVJZDogdXVpZH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZShwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnVwZGF0ZSwgcGFyYW1zKTtcbiAgICB9XG5cbn1cbiJdfQ==