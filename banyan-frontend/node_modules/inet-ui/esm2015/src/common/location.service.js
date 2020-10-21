/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService, ResponseData } from 'inet-core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { shareReplay } from 'rxjs/operators';
export class LocationService {
    // store district by province code
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            // list_country: iNet.getPUrl('cloudapp/country/list'),
            // list_city: iNet.getPUrl('cloudapp/city/list'),
            // list_district: iNet.getPUrl('cloudapp/district/list'),
            list_country: iNet.getPUrl('gl/country/list'),
            list_city: iNet.getPUrl('gl/city/list'),
            list_district: iNet.getPUrl('gl/district/list')
        };
        this.$provinceCache = {};
        this.$districtCache = {};
        this.provinceData = {}; // store province by country code
        // store province by country code
        this.districtData = {}; // store district by province code
        return LocationService.instance = LocationService.instance || this;
    }
    /**
     * @private
     * @return {?}
     */
    getCountry() {
        return this.http.getJSON(this.url.list_country).do((/**
         * @param {?} res
         * @return {?}
         */
        res => this.countries = res['items']));
    }
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    _getProvinceByCountryCode(countryCode) {
        return this.http.getJSON(this.url.list_city, { countryCode: countryCode })
            .do((/**
         * @param {?} res
         * @return {?}
         */
        res => this.provinceData[countryCode] = res['items']));
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    _getDistrictByCode(countryCode, provinceCode) {
        /** @type {?} */
        const key = countryCode + '_' + provinceCode;
        return this.http.getJSON(this.url.list_district, { countryCode: countryCode, cityCode: provinceCode })
            .do((/**
         * @param {?} res
         * @return {?}
         */
        res => this.districtData[key] = res['items']));
    }
    /**
     * @return {?}
     */
    listCountry() {
        if (this.countries) {
            /** @type {?} */
            const responseData = new ResponseData();
            responseData.items = this.countries;
            return Observable.of(responseData);
        }
        if (!this.$countryCache) {
            this.$countryCache = this.getCountry().pipe(shareReplay(1));
        }
        return this.$countryCache;
    }
    /*
         * @deprecated Use getProvinceByCountryCode(countryCode) instead
         */
    /**
     * @param {?} countryId
     * @return {?}
     */
    getProvinceByCountryId(countryId) {
        return this.http.getJSON(this.url.list_city, { country: countryId });
    }
    /*
         * @deprecated Use getDistrictByCode(countryCode, provinceCode) instead
         */
    /**
     * @param {?} uuid
     * @return {?}
     */
    getDistrictByProvinceId(uuid) {
        return this.http.getJSON(this.url.list_district, { city: uuid });
    }
    /**
     * @param {?} countryCode
     * @return {?}
     */
    getProvinceByCountryCode(countryCode) {
        if (this.provinceData[countryCode]) {
            /** @type {?} */
            const responseData = new ResponseData();
            responseData.items = this.provinceData[countryCode];
            return Observable.of(responseData);
        }
        if (!this.$provinceCache[countryCode]) {
            this.$provinceCache[countryCode] = this._getProvinceByCountryCode(countryCode).pipe(shareReplay(1));
        }
        return this.$provinceCache[countryCode];
    }
    /**
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    getDistrictByCode(countryCode, provinceCode) {
        /** @type {?} */
        const key = countryCode + '_' + provinceCode;
        if (this.districtData[key]) {
            /** @type {?} */
            const responseData = new ResponseData();
            responseData.items = this.districtData[key];
            return Observable.of(responseData);
        }
        if (!this.$districtCache[key]) {
            this.$districtCache[key] = this._getDistrictByCode(countryCode, provinceCode).pipe(shareReplay(1));
        }
        return this.$districtCache[key];
    }
}
LocationService.instance = null;
LocationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocationService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    LocationService.instance;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.$countryCache;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.$provinceCache;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.$districtCache;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.countries;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.provinceData;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.districtData;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvY29tbW9uL2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUMxRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUszQyxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFpQnhCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBZm5DLFFBQUcsR0FBRzs7OztZQUlWLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQzdDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUN2QyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztTQUNsRCxDQUFDO1FBRU0sbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFDekIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFFekIsaUJBQVksR0FBUSxFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7O1FBQ3pELGlCQUFZLEdBQVEsRUFBRSxDQUFDLENBQUUsa0NBQWtDO1FBRy9ELE9BQU8sZUFBZSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUN2RSxDQUFDOzs7OztJQUVPLFVBQVU7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxH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LFlBQW9COztjQUNqRCxHQUFHLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxZQUFZO1FBQzVDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTs7a0JBQ2xCLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRTtZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsT0FBTyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RztRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDOztBQXRGTSx3QkFBUSxHQUFvQixJQUFJLENBQUM7O1lBRjNDLFVBQVU7Ozs7WUFUSCxpQkFBaUI7Ozs7SUFXckIseUJBQXdDOzs7OztJQUN4Qyw4QkFPRTs7Ozs7SUFDRix3Q0FBMEM7Ozs7O0lBQzFDLHlDQUFpQzs7Ozs7SUFDakMseUNBQWlDOzs7OztJQUNqQyxvQ0FBOEI7Ozs7O0lBQzlCLHVDQUErQjs7Ozs7SUFDL0IsdUNBQStCOzs7OztJQUVuQiwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZSwgUmVzcG9uc2VEYXRhfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJztcbmltcG9ydCB7c2hhcmVSZXBsYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYXRpb25TZXJ2aWNlIHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IExvY2F0aW9uU2VydmljZSA9IG51bGw7XG4gICAgcHJpdmF0ZSB1cmwgPSB7XG4gICAgICAgIC8vIGxpc3RfY291bnRyeTogaU5ldC5nZXRQVXJsKCdjbG91ZGFwcC9jb3VudHJ5L2xpc3QnKSxcbiAgICAgICAgLy8gbGlzdF9jaXR5OiBpTmV0LmdldFBVcmwoJ2Nsb3VkYXBwL2NpdHkvbGlzdCcpLFxuICAgICAgICAvLyBsaXN0X2Rpc3RyaWN0OiBpTmV0LmdldFBVcmwoJ2Nsb3VkYXBwL2Rpc3RyaWN0L2xpc3QnKSxcbiAgICAgICAgbGlzdF9jb3VudHJ5OiBpTmV0LmdldFBVcmwoJ2dsL2NvdW50cnkvbGlzdCcpLFxuICAgICAgICBsaXN0X2NpdHk6IGlOZXQuZ2V0UFVybCgnZ2wvY2l0eS9saXN0JyksXG4gICAgICAgIGxpc3RfZGlzdHJpY3Q6IGlOZXQuZ2V0UFVybCgnZ2wvZGlzdHJpY3QvbGlzdCcpXG4gICAgfTtcbiAgICBwcml2YXRlICRjb3VudHJ5Q2FjaGU6IE9ic2VydmFibGU8T2JqZWN0PjtcbiAgICBwcml2YXRlICRwcm92aW5jZUNhY2hlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlICRkaXN0cmljdENhY2hlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIGNvdW50cmllczogQXJyYXk8YW55PjtcbiAgICBwcml2YXRlIHByb3ZpbmNlRGF0YTogYW55ID0ge307IC8vIHN0b3JlIHByb3ZpbmNlIGJ5IGNvdW50cnkgY29kZVxuICAgIHByaXZhdGUgZGlzdHJpY3REYXRhOiBhbnkgPSB7fTsgIC8vIHN0b3JlIGRpc3RyaWN0IGJ5IHByb3ZpbmNlIGNvZGVcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIExvY2F0aW9uU2VydmljZS5pbnN0YW5jZSA9IExvY2F0aW9uU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q291bnRyeSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwubGlzdF9jb3VudHJ5KS5kbyhyZXMgPT4gdGhpcy5jb3VudHJpZXMgPSByZXNbJ2l0ZW1zJ10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3RfY2l0eSwge2NvdW50cnlDb2RlOiBjb3VudHJ5Q29kZX0pXG4gICAgICAgICAgICAuZG8ocmVzID0+IHRoaXMucHJvdmluY2VEYXRhW2NvdW50cnlDb2RlXSA9IHJlc1snaXRlbXMnXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGU6IHN0cmluZywgcHJvdmluY2VDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBjb3VudHJ5Q29kZSArICdfJyArIHByb3ZpbmNlQ29kZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3RfZGlzdHJpY3QsIHtjb3VudHJ5Q29kZTogY291bnRyeUNvZGUsIGNpdHlDb2RlOiBwcm92aW5jZUNvZGV9KVxuICAgICAgICAgICAgLmRvKHJlcyA9PiB0aGlzLmRpc3RyaWN0RGF0YVtrZXldID0gcmVzWydpdGVtcyddKTtcbiAgICB9XG5cbiAgICBsaXN0Q291bnRyeSgpOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgICAgICBpZiAodGhpcy5jb3VudHJpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IG5ldyBSZXNwb25zZURhdGEoKTtcbiAgICAgICAgICAgIHJlc3BvbnNlRGF0YS5pdGVtcyA9IHRoaXMuY291bnRyaWVzO1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJGNvdW50cnlDYWNoZSkge1xuICAgICAgICAgICAgdGhpcy4kY291bnRyeUNhY2hlID0gdGhpcy5nZXRDb3VudHJ5KCkucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvdW50cnlDYWNoZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBnZXRQcm92aW5jZUJ5Q291bnRyeUNvZGUoY291bnRyeUNvZGUpIGluc3RlYWRcbiAgICAgKi9cblxuICAgIGdldFByb3ZpbmNlQnlDb3VudHJ5SWQoY291bnRyeUlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwubGlzdF9jaXR5LCB7Y291bnRyeTogY291bnRyeUlkfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgZ2V0RGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGUsIHByb3ZpbmNlQ29kZSkgaW5zdGVhZFxuICAgICAqL1xuXG4gICAgZ2V0RGlzdHJpY3RCeVByb3ZpbmNlSWQodXVpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3RfZGlzdHJpY3QsIHtjaXR5OiB1dWlkfSk7XG4gICAgfVxuXG4gICAgZ2V0UHJvdmluY2VCeUNvdW50cnlDb2RlKGNvdW50cnlDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAodGhpcy5wcm92aW5jZURhdGFbY291bnRyeUNvZGVdKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBuZXcgUmVzcG9uc2VEYXRhKCk7XG4gICAgICAgICAgICByZXNwb25zZURhdGEuaXRlbXMgPSB0aGlzLnByb3ZpbmNlRGF0YVtjb3VudHJ5Q29kZV07XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihyZXNwb25zZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy4kcHJvdmluY2VDYWNoZVtjb3VudHJ5Q29kZV0pIHtcbiAgICAgICAgICAgIHRoaXMuJHByb3ZpbmNlQ2FjaGVbY291bnRyeUNvZGVdID0gdGhpcy5fZ2V0UHJvdmluY2VCeUNvdW50cnlDb2RlKGNvdW50cnlDb2RlKS5waXBlKHNoYXJlUmVwbGF5KDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kcHJvdmluY2VDYWNoZVtjb3VudHJ5Q29kZV07XG4gICAgfVxuXG4gICAgZ2V0RGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGU6IHN0cmluZywgcHJvdmluY2VDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBjb3VudHJ5Q29kZSArICdfJyArIHByb3ZpbmNlQ29kZTtcbiAgICAgICAgaWYgKHRoaXMuZGlzdHJpY3REYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IG5ldyBSZXNwb25zZURhdGEoKTtcbiAgICAgICAgICAgIHJlc3BvbnNlRGF0YS5pdGVtcyA9IHRoaXMuZGlzdHJpY3REYXRhW2tleV07XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihyZXNwb25zZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy4kZGlzdHJpY3RDYWNoZVtrZXldKSB7XG4gICAgICAgICAgICB0aGlzLiRkaXN0cmljdENhY2hlW2tleV0gPSB0aGlzLl9nZXREaXN0cmljdEJ5Q29kZShjb3VudHJ5Q29kZSwgcHJvdmluY2VDb2RlKS5waXBlKHNoYXJlUmVwbGF5KDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kZGlzdHJpY3RDYWNoZVtrZXldO1xuICAgIH1cbn1cbiJdfQ==