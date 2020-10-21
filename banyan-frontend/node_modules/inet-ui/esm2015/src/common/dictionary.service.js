/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from 'inet-core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { shareReplay } from 'rxjs/operators';
export class DictionaryService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            find_by_key: iNet.getPUrl('global/category/dicts/fbykeys'),
            get_sex: iNet.getPUrl('gl/contact/profile/sex')
        };
        this.$findObservableCache = {};
        this.store = {};
        this.inventory = {};
        return DictionaryService.instance = DictionaryService.instance || this;
    }
    /**
     * @param {?} keyStr
     * @return {?}
     */
    findByKeys(keyStr) {
        /** @type {?} */
        const keys = keyStr.split(';');
        if (keys.length === 1 && this.inventory.hasOwnProperty(keyStr)) { // single key
            return Observable.of({ data: this.inventory[keyStr] });
        }
        if (this.store[keyStr]) { // multiple keys
            return Observable.of({ data: this.store[keyStr] });
        }
        if (!this.$findObservableCache[keyStr]) {
            this.$findObservableCache[keyStr] = this.http.getJSON(this.url.find_by_key, { keys: keyStr })
                .do((/**
             * @param {?} res
             * @return {?}
             */
            res => this.store[keyStr] = res['data']))
                .do((/**
             * @param {?} res
             * @return {?}
             */
            res => Object.assign(this.inventory, res['data'])))
                .pipe(shareReplay(1));
        }
        return this.$findObservableCache[keyStr];
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    getSex(params) {
        return this.http.postJSON(this.url.get_sex, params);
    }
}
DictionaryService.instance = null;
DictionaryService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DictionaryService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    DictionaryService.instance;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.$findObservableCache;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.store;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.inventory;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9jb21tb24vZGljdGlvbmFyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxpQkFBaUIsRUFBZSxNQUFNLFdBQVcsQ0FBQztBQUMxRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUszQyxNQUFNLE9BQU8saUJBQWlCOzs7O0lBVzFCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBUm5DLFFBQUcsR0FBRztZQUNWLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDO1lBQzFELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1NBQ2xELENBQUM7UUFDTSx5QkFBb0IsR0FBUSxFQUFFLENBQUM7UUFDL0IsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBR3hCLE9BQU8saUJBQWlCLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBYzs7Y0FDZixJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDM0UsT0FBTyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3RDLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lCQUN0RixFQUFFOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQztpQkFDM0MsRUFBRTs7OztZQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDO2lCQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDOztBQWpDTSwwQkFBUSxHQUFzQixJQUFJLENBQUM7O1lBRjdDLFVBQVU7Ozs7WUFUSCxpQkFBaUI7Ozs7SUFXckIsMkJBQTBDOzs7OztJQUUxQyxnQ0FHRTs7Ozs7SUFDRixpREFBdUM7Ozs7O0lBQ3ZDLGtDQUF3Qjs7Ozs7SUFDeEIsc0NBQTRCOzs7OztJQUVoQixpQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZSwgUmVzcG9uc2VEYXRhfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJztcbmltcG9ydCB7c2hhcmVSZXBsYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeVNlcnZpY2Uge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogRGljdGlvbmFyeVNlcnZpY2UgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB1cmwgPSB7XG4gICAgICAgIGZpbmRfYnlfa2V5OiBpTmV0LmdldFBVcmwoJ2dsb2JhbC9jYXRlZ29yeS9kaWN0cy9mYnlrZXlzJyksXG4gICAgICAgIGdldF9zZXg6IGlOZXQuZ2V0UFVybCgnZ2wvY29udGFjdC9wcm9maWxlL3NleCcpXG4gICAgfTtcbiAgICBwcml2YXRlICRmaW5kT2JzZXJ2YWJsZUNhY2hlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIHN0b3JlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIGludmVudG9yeTogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBEaWN0aW9uYXJ5U2VydmljZS5pbnN0YW5jZSA9IERpY3Rpb25hcnlTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgZmluZEJ5S2V5cyhrZXlTdHI6IHN0cmluZyk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBrZXlTdHIuc3BsaXQoJzsnKTtcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxICYmIHRoaXMuaW52ZW50b3J5Lmhhc093blByb3BlcnR5KGtleVN0cikpIHsgLy8gc2luZ2xlIGtleVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2Yoe2RhdGE6IHRoaXMuaW52ZW50b3J5W2tleVN0cl19KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdG9yZVtrZXlTdHJdKSB7IC8vIG11bHRpcGxlIGtleXNcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHtkYXRhOiB0aGlzLnN0b3JlW2tleVN0cl19KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJGZpbmRPYnNlcnZhYmxlQ2FjaGVba2V5U3RyXSkge1xuICAgICAgICAgICAgdGhpcy4kZmluZE9ic2VydmFibGVDYWNoZVtrZXlTdHJdID0gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwuZmluZF9ieV9rZXksIHtrZXlzOiBrZXlTdHJ9KVxuICAgICAgICAgICAgICAgIC5kbyhyZXMgPT4gdGhpcy5zdG9yZVtrZXlTdHJdID0gcmVzWydkYXRhJ10pXG4gICAgICAgICAgICAgICAgLmRvKHJlcyA9PiBPYmplY3QuYXNzaWduKHRoaXMuaW52ZW50b3J5LCByZXNbJ2RhdGEnXSkpXG4gICAgICAgICAgICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRmaW5kT2JzZXJ2YWJsZUNhY2hlW2tleVN0cl07XG4gICAgfVxuXG4gICAgZ2V0U2V4KHBhcmFtcz86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwuZ2V0X3NleCwgcGFyYW1zKTtcbiAgICB9XG59XG4iXX0=