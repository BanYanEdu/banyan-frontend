/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class CacheStorageService {
    constructor() {
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
    promiseQueue(name, promise, resovle) {
        if (this.__queue[name]) {
            this.__queue[name].push(resovle);
        }
        else {
            this.__queue[name] = [resovle];
            promise(name);
        }
    }
    /**
     * @param {?} name
     * @param {?} context
     * @param {?=} args
     * @return {?}
     */
    resolveQueue(name, context, args) {
        if (this.__queue[name]) {
            this.__queue[name].forEach((/**
             * @param {?} fn
             * @return {?}
             */
            fn => {
                try {
                    fn.apply(context, args);
                }
                catch (e) {
                }
            }));
            delete this.__queue[name];
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getData(key) {
        /** @type {?} */
        const data = this.__storage[key];
        // Check data expired
        if (data && new Date().getTime() - data.time <= data.timeCache) {
            return data.value;
        }
    }
    /**
     * @param {?} key
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    setData(key, data, options) {
        /** @type {?} */
        const timeCache = options && options.timeCache || this.timeCache;
        this.__storage[key] = (/** @type {?} */ ({
            time: new Date().getTime(),
            timeCache: timeCache,
            value: data
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeData(key) {
        delete this.__storage[key];
    }
    /**
     * @return {?}
     */
    clearData() {
        this.__storage = {};
    }
}
CacheStorageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CacheStorageService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2NhY2hlLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCOztRQUxBLGNBQVMsR0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUUxQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQUVMLENBQUM7Ozs7Ozs7SUFFakIsWUFBWSxDQUFDLElBQVksRUFBRSxPQUFpQixFQUFFLE9BQWlCO1FBQzdELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7OztJQUVELFlBQVksQ0FBQyxJQUFZLEVBQUUsT0FBWSxFQUFFLElBQVk7UUFDbkQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM5QixJQUFJO29CQUNGLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6QjtnQkFBQyxPQUFPLENBQUMsRUFBRTtpQkFFWDtZQUNILENBQUMsRUFBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsR0FBVzs7Y0FDWCxJQUFJLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ2xELHFCQUFxQjtRQUNyQixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7SUFDSCxDQUFDOzs7Ozs7O0lBRUQsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFTLEVBQUUsT0FBNkI7O2NBQ3JELFNBQVMsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUztRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFrQjtZQUN0QyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDMUIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFLElBQUk7U0FDWixFQUFBLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQXhERixVQUFVOzs7Ozs7SUFJVCx3Q0FBa0M7Ozs7O0lBRWxDLHdDQUF1Qjs7Ozs7SUFDdkIsc0NBQXFCOzs7OztBQXFEdkIseUNBR0M7OztJQUZDLHdDQUFtQjs7SUFDbkIsMENBQXNCOzs7OztBQUd4QixzQ0FJQzs7O0lBSEMsZ0NBQWE7O0lBQ2IscUNBQWtCOztJQUNsQixpQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhY2hlU3RvcmFnZVNlcnZpY2Uge1xuXG4gIC8vIFRpbWUgY2FjaGUgZGF0YS4gRGVmYXVsdCA1IG1pbnV0ZXMuXG4gIHRpbWVDYWNoZTogbnVtYmVyID0gNSAqIDYwICogMTAwMDtcblxuICBwcml2YXRlIF9fc3RvcmFnZSA9IHt9O1xuICBwcml2YXRlIF9fcXVldWUgPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHByb21pc2VRdWV1ZShuYW1lOiBzdHJpbmcsIHByb21pc2U6IEZ1bmN0aW9uLCByZXNvdmxlOiBGdW5jdGlvbikge1xuICAgIGlmICh0aGlzLl9fcXVldWVbbmFtZV0pIHtcbiAgICAgIHRoaXMuX19xdWV1ZVtuYW1lXS5wdXNoKHJlc292bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9fcXVldWVbbmFtZV0gPSBbcmVzb3ZsZV07XG4gICAgICBwcm9taXNlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmVRdWV1ZShuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IGFueSwgYXJncz86IGFueVtdKSB7XG4gICAgaWYgKHRoaXMuX19xdWV1ZVtuYW1lXSkge1xuICAgICAgdGhpcy5fX3F1ZXVlW25hbWVdLmZvckVhY2goZm4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkZWxldGUgdGhpcy5fX3F1ZXVlW25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGEoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYXRhOiBDYWNoZVN0b3JhZ2VJdGVtID0gdGhpcy5fX3N0b3JhZ2Vba2V5XTtcbiAgICAvLyBDaGVjayBkYXRhIGV4cGlyZWRcbiAgICBpZiAoZGF0YSAmJiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGRhdGEudGltZSA8PSBkYXRhLnRpbWVDYWNoZSkge1xuICAgICAgcmV0dXJuIGRhdGEudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YShrZXk6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zPzogQ2FjaGVTdG9yYWdlT3B0aW9ucykge1xuICAgIGNvbnN0IHRpbWVDYWNoZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aW1lQ2FjaGUgfHwgdGhpcy50aW1lQ2FjaGU7XG4gICAgdGhpcy5fX3N0b3JhZ2Vba2V5XSA9IDxDYWNoZVN0b3JhZ2VJdGVtPntcbiAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgdGltZUNhY2hlOiB0aW1lQ2FjaGUsXG4gICAgICB2YWx1ZTogZGF0YVxuICAgIH07XG4gIH1cblxuICByZW1vdmVEYXRhKGtleTogc3RyaW5nKSB7XG4gICAgZGVsZXRlIHRoaXMuX19zdG9yYWdlW2tleV07XG4gIH1cblxuICBjbGVhckRhdGEoKSB7XG4gICAgdGhpcy5fX3N0b3JhZ2UgPSB7fTtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVTdG9yYWdlT3B0aW9ucyB7XG4gIHRpbWVDYWNoZT86IG51bWJlcjtcbiAgcmVzb2x2ZURhdGE/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlU3RvcmFnZUl0ZW0ge1xuICB0aW1lOiBudW1iZXI7XG4gIHRpbWVDYWNoZTogbnVtYmVyO1xuICB2YWx1ZTogYW55O1xufVxuIl19