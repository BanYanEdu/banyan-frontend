/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreService, HttpClientService } from 'inet-core';
import { Organization } from '../model/organization';
import { shareReplay } from "rxjs/operators";
export class OrganizationService {
    /**
     * @param {?} http
     * @param {?} coreService
     */
    constructor(http, coreService) {
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
    firmLoad() {
        this.http.showLoading();
        return this.http.getJSON(this.url.firm_load, { organId: iNet.organId })
            .map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res));
    }
    // saveLogoOrganization(params: any): Observable<any> {
    //     return this.http.postJSON(this.url.save_logo, params);
    // }
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    firmUpdate(orgInfo) {
        this.http.showLoading();
        return this.http.postJSON(this.url.firm_update, orgInfo);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    updateLogo(data) {
        this.http.showLoading();
        return this.http.post(this.url.update_logo, data);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    removeLogo(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.update_logo, params);
    }
    /**
     * @return {?}
     */
    load() {
        if (!this.$orgCache) {
            this.http.showLoading();
            this.$orgCache = this.http.getJSON(this.url.view_org)
                .pipe(shareReplay(1));
        }
        return this.$orgCache;
    }
    /**
     * @return {?}
     */
    loadInfo() {
        this.http.showLoading();
        return this.http.postJSON(this.url.load_info);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    update(data) {
        this.http.showLoading();
        // Clone data for update
        /** @type {?} */
        const org = Object.assign(new Organization(), data);
        org.officeAddressStr = JSON.stringify(org.officeAddress);
        delete org.officeAddress;
        delete org.createdDate;
        delete org.createdBy;
        delete org.banks;
        delete org.busAces;
        this.$orgCache = null;
        return this.http.postJSON(this.url.update_info, org);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    searchOrganization(params = {}) {
        return this.http.postJSON(this.url.search_org, params);
    }
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    getLogoUrlByOrganization(orgInfo) {
        /*
        if (!orgInfo.logo) {
            return iNet.BLANK_IMAGE_URL;
        }
         */
        return `${this.url.view_logo}?version=${orgInfo.modifiedDate}`;
        //return this.coreService.getFileUrl(orgInfo.logo + `?version=${orgInfo.modifiedDate}`);
    }
    /**
     * @return {?}
     */
    getLogoUrl() {
        return this.url.view_logo;
    }
    /**
     * @return {?}
     */
    viewInfo() {
        this.http.showLoading();
        return this.http.postJSON(this.url.view_org);
    }
}
OrganizationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OrganizationService.ctorParameters = () => [
    { type: HttpClientService },
    { type: CoreService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL29yZ2FuaXphdGlvbi9vcmdhbml6YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRXpELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLM0MsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFpQjVCLFlBQW9CLElBQXVCLEVBQVUsV0FBd0I7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWRyRSxRQUFHLEdBQUc7WUFDVixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNqRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztZQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztZQUN6RCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzs7O1lBRy9DLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ2pELFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDO1lBQ3JELFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO1lBQ3RELFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDO1lBQ2pELG9EQUFvRDtTQUN2RCxDQUFDO0lBR0YsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJ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QUFDLEdBQUcsQ0FBQyxTQUFTLFlBQVksT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9ELHdGQUF3RjtJQUM1RixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7WUE5RkosVUFBVTs7OztZQVJVLGlCQUFpQjtZQUE5QixXQUFXOzs7Ozs7O0lBVWYsd0NBQTRDOzs7OztJQUU1QyxrQ0FZRTs7Ozs7SUFFVSxtQ0FBK0I7Ozs7O0lBQUUsMENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29yZVNlcnZpY2UsIEh0dHBDbGllbnRTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7T3JnYW5pemF0aW9ufSBmcm9tICcuLi9tb2RlbC9vcmdhbml6YXRpb24nO1xuaW1wb3J0IHtPcmdhbml6YXRpb25JbmZvcm1hdGlvbn0gZnJvbSAnLi4vbW9kZWwvb3JnYW5pemF0aW9uLWluZm9ybWF0aW9uJztcbmltcG9ydCB7c2hhcmVSZXBsYXl9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25TZXJ2aWNlIHtcbiAgICBwcml2YXRlICRvcmdDYWNoZTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb24+O1xuXG4gICAgcHJpdmF0ZSB1cmwgPSB7XG4gICAgICAgIGZpcm1fbG9hZDogaU5ldC5nZXRQVXJsKCdjbG91ZC9maXJtb3JnYW5pZC9sb2FkJyksXG4gICAgICAgIGZpcm1fdXBkYXRlOiBpTmV0LmdldFBVcmwoJ2Nsb3VkL2Zpcm1wcm9maWxlL3VwZGF0ZScpLFxuICAgICAgICB1cGRhdGVfbG9nbzogaU5ldC5nZXRQVXJsKCdjbG91ZC9maXJtcHJvZmlsZS9sb2dvdXBkYXRlJyksXG4gICAgICAgIHZpZXdfbG9nbzogaU5ldC5nZXRQVXJsKCdwbHVnaW4vZmlybWxvZ28vdmlldycpLFxuICAgICAgICAvLyBGb3IgRXNzZW50aWFsc1xuICAgICAgICAvL2xvYWRfaW5mbzogaU5ldC5nZXRQVXJsKCdnbC9vcmdhbi9wcm9maWxlL2xvYWQnKSxcbiAgICAgICAgbG9hZF9pbmZvOiBpTmV0LmdldFBVcmwoJ2Nsb3VkL2Zpcm1wcm9maWxlL2xvYWQnKSxcbiAgICAgICAgdXBkYXRlX2luZm86IGlOZXQuZ2V0UFVybCgnY2xvdWQvZmlybXByb2ZpbGUvdXBkYXRlJyksXG4gICAgICAgIHNlYXJjaF9vcmc6IGlOZXQuZ2V0UFVybCgncGx1Z2luL29yZ2FuaXphdGlvbi9zZWFyY2gnKSxcbiAgICAgICAgdmlld19vcmc6IGlOZXQuZ2V0UFVybCgncGx1Z2luL2Zpcm1wcm9maWxlL3ZpZXcnKVxuICAgICAgICAvL3VwZGF0ZV9sb2dvOiBpTmV0LmdldFBVcmwoJ2dsL29yZ2FuL3Byb2ZpbGUvbG9nbycpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UsIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZmlybUxvYWQoKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JbmZvcm1hdGlvbj4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmZpcm1fbG9hZCwge29yZ2FuSWQ6IGlOZXQub3JnYW5JZH0pXG4gICAgICAgICAgICAubWFwKChyZXM6IE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uKSA9PiByZXMpO1xuICAgIH1cblxuICAgIC8vIHNhdmVMb2dvT3JnYW5pemF0aW9uKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5zYXZlX2xvZ28sIHBhcmFtcyk7XG4gICAgLy8gfVxuXG4gICAgZmlybVVwZGF0ZShvcmdJbmZvOiBPcmdhbml6YXRpb25JbmZvcm1hdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLmZpcm1fdXBkYXRlLCBvcmdJbmZvKTtcbiAgICB9XG5cbiAgICB1cGRhdGVMb2dvKGRhdGE6IEZvcm1EYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnVybC51cGRhdGVfbG9nbywgZGF0YSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTG9nbyhwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnVwZGF0ZV9sb2dvLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGxvYWQoKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb24+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRvcmdDYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgICAgICB0aGlzLiRvcmdDYWNoZSA9IHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLnZpZXdfb3JnKVxuICAgICAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRvcmdDYWNoZTtcbiAgICB9XG4gICAgbG9hZEluZm8oKTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5sb2FkX2luZm8pO1xuICAgIH1cblxuICAgIHVwZGF0ZShkYXRhOiBPcmdhbml6YXRpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgLy8gQ2xvbmUgZGF0YSBmb3IgdXBkYXRlXG4gICAgICAgIGNvbnN0IG9yZyA9IE9iamVjdC5hc3NpZ24obmV3IE9yZ2FuaXphdGlvbigpLCBkYXRhKTtcbiAgICAgICAgb3JnLm9mZmljZUFkZHJlc3NTdHIgPSBKU09OLnN0cmluZ2lmeShvcmcub2ZmaWNlQWRkcmVzcyk7XG4gICAgICAgIGRlbGV0ZSBvcmcub2ZmaWNlQWRkcmVzcztcbiAgICAgICAgZGVsZXRlIG9yZy5jcmVhdGVkRGF0ZTtcbiAgICAgICAgZGVsZXRlIG9yZy5jcmVhdGVkQnk7XG4gICAgICAgIGRlbGV0ZSBvcmcuYmFua3M7XG4gICAgICAgIGRlbGV0ZSBvcmcuYnVzQWNlcztcbiAgICAgICAgdGhpcy4kb3JnQ2FjaGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnVwZGF0ZV9pbmZvLCBvcmcpO1xuICAgIH1cblxuICAgIHNlYXJjaE9yZ2FuaXphdGlvbihwYXJhbXM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5zZWFyY2hfb3JnLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGdldExvZ29VcmxCeU9yZ2FuaXphdGlvbihvcmdJbmZvOiBPcmdhbml6YXRpb24pOiBzdHJpbmcge1xuICAgICAgICAvKlxuICAgICAgICBpZiAoIW9yZ0luZm8ubG9nbykge1xuICAgICAgICAgICAgcmV0dXJuIGlOZXQuQkxBTktfSU1BR0VfVVJMO1xuICAgICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gYCR7dGhpcy51cmwudmlld19sb2dvfT92ZXJzaW9uPSR7b3JnSW5mby5tb2RpZmllZERhdGV9YDtcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5jb3JlU2VydmljZS5nZXRGaWxlVXJsKG9yZ0luZm8ubG9nbyArIGA/dmVyc2lvbj0ke29yZ0luZm8ubW9kaWZpZWREYXRlfWApO1xuICAgIH1cblxuICAgIGdldExvZ29VcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsLnZpZXdfbG9nbztcbiAgICB9XG5cbiAgICB2aWV3SW5mbygpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnZpZXdfb3JnKTtcbiAgICB9XG59XG4iXX0=