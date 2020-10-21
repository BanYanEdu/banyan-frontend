/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var CacheStorageService = /** @class */ (function () {
    function CacheStorageService() {
        // Time cache data. Default 5 minutes.
        this.timeCache = 5 * 60 * 1000;
        this.__storage = {};
        this.__queue = {};
    }
    /**
     * @param {?} name
     * @param {?} promise
     * @param {?} resovle
     * @return {?}
     */
    CacheStorageService.prototype.promiseQueue = /**
     * @param {?} name
     * @param {?} promise
     * @param {?} resovle
     * @return {?}
     */
    function (name, promise, resovle) {
        if (this.__queue[name]) {
            this.__queue[name].push(resovle);
        }
        else {
            this.__queue[name] = [resovle];
            promise(name);
        }
    };
    /**
     * @param {?} name
     * @param {?} context
     * @param {?=} args
     * @return {?}
     */
    CacheStorageService.prototype.resolveQueue = /**
     * @param {?} name
     * @param {?} context
     * @param {?=} args
     * @return {?}
     */
    function (name, context, args) {
        if (this.__queue[name]) {
            this.__queue[name].forEach((/**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                try {
                    fn.apply(context, args);
                }
                catch (e) {
                }
            }));
            delete this.__queue[name];
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CacheStorageService.prototype.getData = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var data = this.__storage[key];
        // Check data expired
        if (data && new Date().getTime() - data.time <= data.timeCache) {
            return data.value;
        }
    };
    /**
     * @param {?} key
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    CacheStorageService.prototype.setData = /**
     * @param {?} key
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (key, data, options) {
        /** @type {?} */
        var timeCache = options && options.timeCache || this.timeCache;
        this.__storage[key] = (/** @type {?} */ ({
            time: new Date().getTime(),
            timeCache: timeCache,
            value: data
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CacheStorageService.prototype.removeData = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this.__storage[key];
    };
    /**
     * @return {?}
     */
    CacheStorageService.prototype.clearData = /**
     * @return {?}
     */
    function () {
        this.__storage = {};
    };
    CacheStorageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CacheStorageService.ctorParameters = function () { return []; };
    return CacheStorageService;
}());
export { CacheStorageService };
if (false) {
    /** @type {?} */
    CacheStorageService.prototype.timeCache;
    /**
     * @type {?}
     * @private
     */
    CacheStorageService.prototype.__storage;
    /**
     * @type {?}
     * @private
     */
    CacheStorageService.prototype.__queue;
}
/**
 * @record
 */
export function CacheStorageOptions() { }
if (false) {
    /** @type {?|undefined} */
    CacheStorageOptions.prototype.timeCache;
    /** @type {?|undefined} */
    CacheStorageOptions.prototype.resolveData;
}
/**
 * @record
 */
export function CacheStorageItem() { }
if (false) {
    /** @type {?} */
    CacheStorageItem.prototype.time;
    /** @type {?} */
    CacheStorageItem.prototype.timeCache;
    /** @type {?} */
    CacheStorageItem.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2NhY2hlLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQVNFOztRQUxBLGNBQVMsR0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUUxQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQUVMLENBQUM7Ozs7Ozs7SUFFakIsMENBQVk7Ozs7OztJQUFaLFVBQWEsSUFBWSxFQUFFLE9BQWlCLEVBQUUsT0FBaUI7UUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7O0lBRUQsMENBQVk7Ozs7OztJQUFaLFVBQWEsSUFBWSxFQUFFLE9BQVksRUFBRSxJQUFZO1FBQ25ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEVBQUU7Z0JBQzNCLElBQUk7b0JBQ0YsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUVYO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7OztJQUVELHFDQUFPOzs7O0lBQVAsVUFBUSxHQUFXOztZQUNYLElBQUksR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDbEQscUJBQXFCO1FBQ3JCLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzlELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7Ozs7SUFFRCxxQ0FBTzs7Ozs7O0lBQVAsVUFBUSxHQUFXLEVBQUUsSUFBUyxFQUFFLE9BQTZCOztZQUNyRCxTQUFTLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVM7UUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBa0I7WUFDdEMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQzFCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1NBQ1osRUFBQSxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCx3Q0FBVTs7OztJQUFWLFVBQVcsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELHVDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O2dCQXhERixVQUFVOzs7O0lBMERYLDBCQUFDO0NBQUEsQUExREQsSUEwREM7U0F6RFksbUJBQW1COzs7SUFHOUIsd0NBQWtDOzs7OztJQUVsQyx3Q0FBdUI7Ozs7O0lBQ3ZCLHNDQUFxQjs7Ozs7QUFxRHZCLHlDQUdDOzs7SUFGQyx3Q0FBbUI7O0lBQ25CLDBDQUFzQjs7Ozs7QUFHeEIsc0NBSUM7OztJQUhDLGdDQUFhOztJQUNiLHFDQUFrQjs7SUFDbEIsaUNBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZVN0b3JhZ2VTZXJ2aWNlIHtcblxuICAvLyBUaW1lIGNhY2hlIGRhdGEuIERlZmF1bHQgNSBtaW51dGVzLlxuICB0aW1lQ2FjaGU6IG51bWJlciA9IDUgKiA2MCAqIDEwMDA7XG5cbiAgcHJpdmF0ZSBfX3N0b3JhZ2UgPSB7fTtcbiAgcHJpdmF0ZSBfX3F1ZXVlID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwcm9taXNlUXVldWUobmFtZTogc3RyaW5nLCBwcm9taXNlOiBGdW5jdGlvbiwgcmVzb3ZsZTogRnVuY3Rpb24pIHtcbiAgICBpZiAodGhpcy5fX3F1ZXVlW25hbWVdKSB7XG4gICAgICB0aGlzLl9fcXVldWVbbmFtZV0ucHVzaChyZXNvdmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX3F1ZXVlW25hbWVdID0gW3Jlc292bGVdO1xuICAgICAgcHJvbWlzZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlUXVldWUobmFtZTogc3RyaW5nLCBjb250ZXh0OiBhbnksIGFyZ3M/OiBhbnlbXSkge1xuICAgIGlmICh0aGlzLl9fcXVldWVbbmFtZV0pIHtcbiAgICAgIHRoaXMuX19xdWV1ZVtuYW1lXS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZGVsZXRlIHRoaXMuX19xdWV1ZVtuYW1lXTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhKGtleTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGF0YTogQ2FjaGVTdG9yYWdlSXRlbSA9IHRoaXMuX19zdG9yYWdlW2tleV07XG4gICAgLy8gQ2hlY2sgZGF0YSBleHBpcmVkXG4gICAgaWYgKGRhdGEgJiYgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBkYXRhLnRpbWUgPD0gZGF0YS50aW1lQ2FjaGUpIHtcbiAgICAgIHJldHVybiBkYXRhLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHNldERhdGEoa2V5OiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9ucz86IENhY2hlU3RvcmFnZU9wdGlvbnMpIHtcbiAgICBjb25zdCB0aW1lQ2FjaGUgPSBvcHRpb25zICYmIG9wdGlvbnMudGltZUNhY2hlIHx8IHRoaXMudGltZUNhY2hlO1xuICAgIHRoaXMuX19zdG9yYWdlW2tleV0gPSA8Q2FjaGVTdG9yYWdlSXRlbT57XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIHRpbWVDYWNoZTogdGltZUNhY2hlLFxuICAgICAgdmFsdWU6IGRhdGFcbiAgICB9O1xuICB9XG5cbiAgcmVtb3ZlRGF0YShrZXk6IHN0cmluZykge1xuICAgIGRlbGV0ZSB0aGlzLl9fc3RvcmFnZVtrZXldO1xuICB9XG5cbiAgY2xlYXJEYXRhKCkge1xuICAgIHRoaXMuX19zdG9yYWdlID0ge307XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlU3RvcmFnZU9wdGlvbnMge1xuICB0aW1lQ2FjaGU/OiBudW1iZXI7XG4gIHJlc29sdmVEYXRhPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWNoZVN0b3JhZ2VJdGVtIHtcbiAgdGltZTogbnVtYmVyO1xuICB0aW1lQ2FjaGU6IG51bWJlcjtcbiAgdmFsdWU6IGFueTtcbn1cbiJdfQ==