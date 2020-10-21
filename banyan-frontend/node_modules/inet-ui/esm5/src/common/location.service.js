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
var LocationService = /** @class */ (function () {
    function LocationService(http) {
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
    LocationService.prototype.getCountry = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http.getJSON(this.url.list_country).do((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.countries = res['items']; }));
    };
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    LocationService.prototype._getProvinceByCountryCode = /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    function (countryCode) {
        var _this = this;
        return this.http.getJSON(this.url.list_city, { countryCode: countryCode })
            .do((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.provinceData[countryCode] = res['items']; }));
    };
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    LocationService.prototype._getDistrictByCode = /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    function (countryCode, provinceCode) {
        var _this = this;
        /** @type {?} */
        var key = countryCode + '_' + provinceCode;
        return this.http.getJSON(this.url.list_district, { countryCode: countryCode, cityCode: provinceCode })
            .do((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.districtData[key] = res['items']; }));
    };
    /**
     * @return {?}
     */
    LocationService.prototype.listCountry = /**
     * @return {?}
     */
    function () {
        if (this.countries) {
            /** @type {?} */
            var responseData = new ResponseData();
            responseData.items = this.countries;
            return Observable.of(responseData);
        }
        if (!this.$countryCache) {
            this.$countryCache = this.getCountry().pipe(shareReplay(1));
        }
        return this.$countryCache;
    };
    /*
     * @deprecated Use getProvinceByCountryCode(countryCode) instead
     */
    /*
         * @deprecated Use getProvinceByCountryCode(countryCode) instead
         */
    /**
     * @param {?} countryId
     * @return {?}
     */
    LocationService.prototype.getProvinceByCountryId = /*
         * @deprecated Use getProvinceByCountryCode(countryCode) instead
         */
    /**
     * @param {?} countryId
     * @return {?}
     */
    function (countryId) {
        return this.http.getJSON(this.url.list_city, { country: countryId });
    };
    /*
     * @deprecated Use getDistrictByCode(countryCode, provinceCode) instead
     */
    /*
         * @deprecated Use getDistrictByCode(countryCode, provinceCode) instead
         */
    /**
     * @param {?} uuid
     * @return {?}
     */
    LocationService.prototype.getDistrictByProvinceId = /*
         * @deprecated Use getDistrictByCode(countryCode, provinceCode) instead
         */
    /**
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        return this.http.getJSON(this.url.list_district, { city: uuid });
    };
    /**
     * @param {?} countryCode
     * @return {?}
     */
    LocationService.prototype.getProvinceByCountryCode = /**
     * @param {?} countryCode
     * @return {?}
     */
    function (countryCode) {
        if (this.provinceData[countryCode]) {
            /** @type {?} */
            var responseData = new ResponseData();
            responseData.items = this.provinceData[countryCode];
            return Observable.of(responseData);
        }
        if (!this.$provinceCache[countryCode]) {
            this.$provinceCache[countryCode] = this._getProvinceByCountryCode(countryCode).pipe(shareReplay(1));
        }
        return this.$provinceCache[countryCode];
    };
    /**
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    LocationService.prototype.getDistrictByCode = /**
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    function (countryCode, provinceCode) {
        /** @type {?} */
        var key = countryCode + '_' + provinceCode;
        if (this.districtData[key]) {
            /** @type {?} */
            var responseData = new ResponseData();
            responseData.items = this.districtData[key];
            return Observable.of(responseData);
        }
        if (!this.$districtCache[key]) {
            this.$districtCache[key] = this._getDistrictByCode(countryCode, provinceCode).pipe(shareReplay(1));
        }
        return this.$districtCache[key];
    };
    LocationService.instance = null;
    LocationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocationService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return LocationService;
}());
export { LocationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvY29tbW9uL2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUMxRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzQztJQWtCSSx5QkFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFmbkMsUUFBRyxHQUFHOzs7O1lBSVYsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDN0MsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1NBQ2xELENBQUM7UUFFTSxtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUV6QixpQkFBWSxHQUFRLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQzs7UUFDekQsaUJBQVksR0FBUSxFQUFFLENBQUMsQ0FBRSxrQ0FBa0M7UUFHL0QsT0FBTyxlQUFlLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBRU8sb0NBQVU7Ozs7SUFBbEI7UUFBQSxpQkFFQztRQURHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFD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bnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2UsIFJlc3BvbnNlRGF0YX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvb2YnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7XG5pbXBvcnQge3NoYXJlUmVwbGF5fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2F0aW9uU2VydmljZSB7XG4gICAgc3RhdGljIGluc3RhbmNlOiBMb2NhdGlvblNlcnZpY2UgPSBudWxsO1xuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICAvLyBsaXN0X2NvdW50cnk6IGlOZXQuZ2V0UFVybCgnY2xvdWRhcHAvY291bnRyeS9saXN0JyksXG4gICAgICAgIC8vIGxpc3RfY2l0eTogaU5ldC5nZXRQVXJsKCdjbG91ZGFwcC9jaXR5L2xpc3QnKSxcbiAgICAgICAgLy8gbGlzdF9kaXN0cmljdDogaU5ldC5nZXRQVXJsKCdjbG91ZGFwcC9kaXN0cmljdC9saXN0JyksXG4gICAgICAgIGxpc3RfY291bnRyeTogaU5ldC5nZXRQVXJsKCdnbC9jb3VudHJ5L2xpc3QnKSxcbiAgICAgICAgbGlzdF9jaXR5OiBpTmV0LmdldFBVcmwoJ2dsL2NpdHkvbGlzdCcpLFxuICAgICAgICBsaXN0X2Rpc3RyaWN0OiBpTmV0LmdldFBVcmwoJ2dsL2Rpc3RyaWN0L2xpc3QnKVxuICAgIH07XG4gICAgcHJpdmF0ZSAkY291bnRyeUNhY2hlOiBPYnNlcnZhYmxlPE9iamVjdD47XG4gICAgcHJpdmF0ZSAkcHJvdmluY2VDYWNoZTogYW55ID0ge307XG4gICAgcHJpdmF0ZSAkZGlzdHJpY3RDYWNoZTogYW55ID0ge307XG4gICAgcHJpdmF0ZSBjb3VudHJpZXM6IEFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBwcm92aW5jZURhdGE6IGFueSA9IHt9OyAvLyBzdG9yZSBwcm92aW5jZSBieSBjb3VudHJ5IGNvZGVcbiAgICBwcml2YXRlIGRpc3RyaWN0RGF0YTogYW55ID0ge307ICAvLyBzdG9yZSBkaXN0cmljdCBieSBwcm92aW5jZSBjb2RlXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBMb2NhdGlvblNlcnZpY2UuaW5zdGFuY2UgPSBMb2NhdGlvblNlcnZpY2UuaW5zdGFuY2UgfHwgdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvdW50cnkoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3RfY291bnRyeSkuZG8ocmVzID0+IHRoaXMuY291bnRyaWVzID0gcmVzWydpdGVtcyddKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRQcm92aW5jZUJ5Q291bnRyeUNvZGUoY291bnRyeUNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0X2NpdHksIHtjb3VudHJ5Q29kZTogY291bnRyeUNvZGV9KVxuICAgICAgICAgICAgLmRvKHJlcyA9PiB0aGlzLnByb3ZpbmNlRGF0YVtjb3VudHJ5Q29kZV0gPSByZXNbJ2l0ZW1zJ10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERpc3RyaWN0QnlDb2RlKGNvdW50cnlDb2RlOiBzdHJpbmcsIHByb3ZpbmNlQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gY291bnRyeUNvZGUgKyAnXycgKyBwcm92aW5jZUNvZGU7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0X2Rpc3RyaWN0LCB7Y291bnRyeUNvZGU6IGNvdW50cnlDb2RlLCBjaXR5Q29kZTogcHJvdmluY2VDb2RlfSlcbiAgICAgICAgICAgIC5kbyhyZXMgPT4gdGhpcy5kaXN0cmljdERhdGFba2V5XSA9IHJlc1snaXRlbXMnXSk7XG4gICAgfVxuXG4gICAgbGlzdENvdW50cnkoKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgaWYgKHRoaXMuY291bnRyaWVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBuZXcgUmVzcG9uc2VEYXRhKCk7XG4gICAgICAgICAgICByZXNwb25zZURhdGEuaXRlbXMgPSB0aGlzLmNvdW50cmllcztcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHJlc3BvbnNlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLiRjb3VudHJ5Q2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGNvdW50cnlDYWNoZSA9IHRoaXMuZ2V0Q291bnRyeSgpLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRjb3VudHJ5Q2FjaGU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgZ2V0UHJvdmluY2VCeUNvdW50cnlDb2RlKGNvdW50cnlDb2RlKSBpbnN0ZWFkXG4gICAgICovXG5cbiAgICBnZXRQcm92aW5jZUJ5Q291bnRyeUlkKGNvdW50cnlJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3RfY2l0eSwge2NvdW50cnk6IGNvdW50cnlJZH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGdldERpc3RyaWN0QnlDb2RlKGNvdW50cnlDb2RlLCBwcm92aW5jZUNvZGUpIGluc3RlYWRcbiAgICAgKi9cblxuICAgIGdldERpc3RyaWN0QnlQcm92aW5jZUlkKHV1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0X2Rpc3RyaWN0LCB7Y2l0eTogdXVpZH0pO1xuICAgIH1cblxuICAgIGdldFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvdmluY2VEYXRhW2NvdW50cnlDb2RlXSkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gbmV3IFJlc3BvbnNlRGF0YSgpO1xuICAgICAgICAgICAgcmVzcG9uc2VEYXRhLml0ZW1zID0gdGhpcy5wcm92aW5jZURhdGFbY291bnRyeUNvZGVdO1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJHByb3ZpbmNlQ2FjaGVbY291bnRyeUNvZGVdKSB7XG4gICAgICAgICAgICB0aGlzLiRwcm92aW5jZUNhY2hlW2NvdW50cnlDb2RlXSA9IHRoaXMuX2dldFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZSkucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJHByb3ZpbmNlQ2FjaGVbY291bnRyeUNvZGVdO1xuICAgIH1cblxuICAgIGdldERpc3RyaWN0QnlDb2RlKGNvdW50cnlDb2RlOiBzdHJpbmcsIHByb3ZpbmNlQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gY291bnRyeUNvZGUgKyAnXycgKyBwcm92aW5jZUNvZGU7XG4gICAgICAgIGlmICh0aGlzLmRpc3RyaWN0RGF0YVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBuZXcgUmVzcG9uc2VEYXRhKCk7XG4gICAgICAgICAgICByZXNwb25zZURhdGEuaXRlbXMgPSB0aGlzLmRpc3RyaWN0RGF0YVtrZXldO1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJGRpc3RyaWN0Q2FjaGVba2V5XSkge1xuICAgICAgICAgICAgdGhpcy4kZGlzdHJpY3RDYWNoZVtrZXldID0gdGhpcy5fZ2V0RGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGUsIHByb3ZpbmNlQ29kZSkucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGRpc3RyaWN0Q2FjaGVba2V5XTtcbiAgICB9XG59XG4iXX0=