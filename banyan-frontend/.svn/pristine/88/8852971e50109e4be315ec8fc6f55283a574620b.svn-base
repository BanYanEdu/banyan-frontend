/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreService, HttpClientService } from 'inet-core';
import { Organization } from '../model/organization';
import { shareReplay } from "rxjs/operators";
var OrganizationService = /** @class */ (function () {
    function OrganizationService(http, coreService) {
        this.http = http;
        this.coreService = coreService;
        this.url = {
            firm_load: iNet.getPUrl('cloud/firmorganid/load'),
            firm_update: iNet.getPUrl('cloud/firmprofile/update'),
            update_logo: iNet.getPUrl('cloud/firmprofile/logoupdate'),
            view_logo: iNet.getPUrl('plugin/firmlogo/view'),
            // For Essentials
            //load_info: iNet.getPUrl('gl/organ/profile/load'),
            load_info: iNet.getPUrl('cloud/firmprofile/load'),
            update_info: iNet.getPUrl('cloud/firmprofile/update'),
            search_org: iNet.getPUrl('plugin/organization/search'),
            view_org: iNet.getPUrl('plugin/firmprofile/view')
            //update_logo: iNet.getPUrl('gl/organ/profile/logo')
        };
    }
    /**
     * @return {?}
     */
    OrganizationService.prototype.firmLoad = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
        return this.http.getJSON(this.url.firm_load, { organId: iNet.organId })
            .map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; }));
    };
    // saveLogoOrganization(params: any): Observable<any> {
    //     return this.http.postJSON(this.url.save_logo, params);
    // }
    // saveLogoOrganization(params: any): Observable<any> {
    //     return this.http.postJSON(this.url.save_logo, params);
    // }
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    OrganizationService.prototype.firmUpdate = 
    // saveLogoOrganization(params: any): Observable<any> {
    //     return this.http.postJSON(this.url.save_logo, params);
    // }
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    function (orgInfo) {
        this.http.showLoading();
        return this.http.postJSON(this.url.firm_update, orgInfo);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    OrganizationService.prototype.updateLogo = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.http.showLoading();
        return this.http.post(this.url.update_logo, data);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    OrganizationService.prototype.removeLogo = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.update_logo, params);
    };
    /**
     * @return {?}
     */
    OrganizationService.prototype.load = /**
     * @return {?}
     */
    function () {
        if (!this.$orgCache) {
            this.http.showLoading();
            this.$orgCache = this.http.getJSON(this.url.view_org)
                .pipe(shareReplay(1));
        }
        return this.$orgCache;
    };
    /**
     * @return {?}
     */
    OrganizationService.prototype.loadInfo = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
        return this.http.postJSON(this.url.load_info);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    OrganizationService.prototype.update = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.http.showLoading();
        // Clone data for update
        /** @type {?} */
        var org = Object.assign(new Organization(), data);
        org.officeAddressStr = JSON.stringify(org.officeAddress);
        delete org.officeAddress;
        delete org.createdDate;
        delete org.createdBy;
        delete org.banks;
        delete org.busAces;
        this.$orgCache = null;
        return this.http.postJSON(this.url.update_info, org);
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    OrganizationService.prototype.searchOrganization = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        if (params === void 0) { params = {}; }
        return this.http.postJSON(this.url.search_org, params);
    };
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    OrganizationService.prototype.getLogoUrlByOrganization = /**
     * @param {?} orgInfo
     * @return {?}
     */
    function (orgInfo) {
        /*
        if (!orgInfo.logo) {
            return iNet.BLANK_IMAGE_URL;
        }
         */
        return this.url.view_logo + "?version=" + orgInfo.modifiedDate;
        //return this.coreService.getFileUrl(orgInfo.logo + `?version=${orgInfo.modifiedDate}`);
    };
    /**
     * @return {?}
     */
    OrganizationService.prototype.getLogoUrl = /**
     * @return {?}
     */
    function () {
        return this.url.view_logo;
    };
    /**
     * @return {?}
     */
    OrganizationService.prototype.viewInfo = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
        return this.http.postJSON(this.url.view_org);
    };
    OrganizationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OrganizationService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: CoreService }
    ]; };
    return OrganizationService;
}());
export { OrganizationService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.$orgCache;
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.coreService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL29yZ2FuaXphdGlvbi9vcmdhbml6YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRXpELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0M7SUFrQkksNkJBQW9CLElBQXVCLEVBQVUsV0FBd0I7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWRyRSxRQUFHLEdBQUc7WUFDVixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNqRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztZQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztZQUN6RCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzs7O1lBRy9DLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ2pELFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDO1lBQ3JELFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO1lBQ3RELFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDO1lBQ2pELG9EQUFvRDtTQUN2RCxDQUFDO0lBR0YsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxJQUFJ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Q0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7O0lBRUQsc0RBQXdCOzs7O0lBQXhCLFVBQXlCLE9BQXFCO1FBQzFDOzs7O1dBSUc7UUFDSCxPQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxpQkFBWSxPQUFPLENBQUMsWUFBYyxDQUFDO1FBQy9ELHdGQUF3RjtJQUM1RixDQUFDOzs7O0lBRUQsd0NBQVU7OztJQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0JBOUZKLFVBQVU7Ozs7Z0JBUlUsaUJBQWlCO2dCQUE5QixXQUFXOztJQXVHbkIsMEJBQUM7Q0FBQSxBQS9GRCxJQStGQztTQTlGWSxtQkFBbUI7Ozs7OztJQUM1Qix3Q0FBNEM7Ozs7O0lBRTVDLGtDQVlFOzs7OztJQUVVLG1DQUErQjs7Ozs7SUFBRSwwQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb3JlU2VydmljZSwgSHR0cENsaWVudFNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHtPcmdhbml6YXRpb259IGZyb20gJy4uL21vZGVsL29yZ2FuaXphdGlvbic7XG5pbXBvcnQge09yZ2FuaXphdGlvbkluZm9ybWF0aW9ufSBmcm9tICcuLi9tb2RlbC9vcmdhbml6YXRpb24taW5mb3JtYXRpb24nO1xuaW1wb3J0IHtzaGFyZVJlcGxheX0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvblNlcnZpY2Uge1xuICAgIHByaXZhdGUgJG9yZ0NhY2hlOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbj47XG5cbiAgICBwcml2YXRlIHVybCA9IHtcbiAgICAgICAgZmlybV9sb2FkOiBpTmV0LmdldFBVcmwoJ2Nsb3VkL2Zpcm1vcmdhbmlkL2xvYWQnKSxcbiAgICAgICAgZmlybV91cGRhdGU6IGlOZXQuZ2V0UFVybCgnY2xvdWQvZmlybXByb2ZpbGUvdXBkYXRlJyksXG4gICAgICAgIHVwZGF0ZV9sb2dvOiBpTmV0LmdldFBVcmwoJ2Nsb3VkL2Zpcm1wcm9maWxlL2xvZ291cGRhdGUnKSxcbiAgICAgICAgdmlld19sb2dvOiBpTmV0LmdldFBVcmwoJ3BsdWdpbi9maXJtbG9nby92aWV3JyksXG4gICAgICAgIC8vIEZvciBFc3NlbnRpYWxzXG4gICAgICAgIC8vbG9hZF9pbmZvOiBpTmV0LmdldFBVcmwoJ2dsL29yZ2FuL3Byb2ZpbGUvbG9hZCcpLFxuICAgICAgICBsb2FkX2luZm86IGlOZXQuZ2V0UFVybCgnY2xvdWQvZmlybXByb2ZpbGUvbG9hZCcpLFxuICAgICAgICB1cGRhdGVfaW5mbzogaU5ldC5nZXRQVXJsKCdjbG91ZC9maXJtcHJvZmlsZS91cGRhdGUnKSxcbiAgICAgICAgc2VhcmNoX29yZzogaU5ldC5nZXRQVXJsKCdwbHVnaW4vb3JnYW5pemF0aW9uL3NlYXJjaCcpLFxuICAgICAgICB2aWV3X29yZzogaU5ldC5nZXRQVXJsKCdwbHVnaW4vZmlybXByb2ZpbGUvdmlldycpXG4gICAgICAgIC8vdXBkYXRlX2xvZ286IGlOZXQuZ2V0UFVybCgnZ2wvb3JnYW4vcHJvZmlsZS9sb2dvJylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBmaXJtTG9hZCgpOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uPiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwuZmlybV9sb2FkLCB7b3JnYW5JZDogaU5ldC5vcmdhbklkfSlcbiAgICAgICAgICAgIC5tYXAoKHJlczogT3JnYW5pemF0aW9uSW5mb3JtYXRpb24pID0+IHJlcyk7XG4gICAgfVxuXG4gICAgLy8gc2F2ZUxvZ29Pcmdhbml6YXRpb24ocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnNhdmVfbG9nbywgcGFyYW1zKTtcbiAgICAvLyB9XG5cbiAgICBmaXJtVXBkYXRlKG9yZ0luZm86IE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwuZmlybV91cGRhdGUsIG9yZ0luZm8pO1xuICAgIH1cblxuICAgIHVwZGF0ZUxvZ28oZGF0YTogRm9ybURhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMudXJsLnVwZGF0ZV9sb2dvLCBkYXRhKTtcbiAgICB9XG5cbiAgICByZW1vdmVMb2dvKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwudXBkYXRlX2xvZ28sIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgbG9hZCgpOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbj4ge1xuICAgICAgICBpZiAoIXRoaXMuJG9yZ0NhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJG9yZ0NhY2hlID0gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwudmlld19vcmcpXG4gICAgICAgICAgICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJG9yZ0NhY2hlO1xuICAgIH1cbiAgICBsb2FkSW5mbygpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLmxvYWRfaW5mbyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGRhdGE6IE9yZ2FuaXphdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICAvLyBDbG9uZSBkYXRhIGZvciB1cGRhdGVcbiAgICAgICAgY29uc3Qgb3JnID0gT2JqZWN0LmFzc2lnbihuZXcgT3JnYW5pemF0aW9uKCksIGRhdGEpO1xuICAgICAgICBvcmcub2ZmaWNlQWRkcmVzc1N0ciA9IEpTT04uc3RyaW5naWZ5KG9yZy5vZmZpY2VBZGRyZXNzKTtcbiAgICAgICAgZGVsZXRlIG9yZy5vZmZpY2VBZGRyZXNzO1xuICAgICAgICBkZWxldGUgb3JnLmNyZWF0ZWREYXRlO1xuICAgICAgICBkZWxldGUgb3JnLmNyZWF0ZWRCeTtcbiAgICAgICAgZGVsZXRlIG9yZy5iYW5rcztcbiAgICAgICAgZGVsZXRlIG9yZy5idXNBY2VzO1xuICAgICAgICB0aGlzLiRvcmdDYWNoZSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwudXBkYXRlX2luZm8sIG9yZyk7XG4gICAgfVxuXG4gICAgc2VhcmNoT3JnYW5pemF0aW9uKHBhcmFtczogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnNlYXJjaF9vcmcsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgZ2V0TG9nb1VybEJ5T3JnYW5pemF0aW9uKG9yZ0luZm86IE9yZ2FuaXphdGlvbik6IHN0cmluZyB7XG4gICAgICAgIC8qXG4gICAgICAgIGlmICghb3JnSW5mby5sb2dvKSB7XG4gICAgICAgICAgICByZXR1cm4gaU5ldC5CTEFOS19JTUFHRV9VUkw7XG4gICAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBgJHt0aGlzLnVybC52aWV3X2xvZ299P3ZlcnNpb249JHtvcmdJbmZvLm1vZGlmaWVkRGF0ZX1gO1xuICAgICAgICAvL3JldHVybiB0aGlzLmNvcmVTZXJ2aWNlLmdldEZpbGVVcmwob3JnSW5mby5sb2dvICsgYD92ZXJzaW9uPSR7b3JnSW5mby5tb2RpZmllZERhdGV9YCk7XG4gICAgfVxuXG4gICAgZ2V0TG9nb1VybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy51cmwudmlld19sb2dvO1xuICAgIH1cblxuICAgIHZpZXdJbmZvKCk6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwudmlld19vcmcpO1xuICAgIH1cbn1cbiJdfQ==