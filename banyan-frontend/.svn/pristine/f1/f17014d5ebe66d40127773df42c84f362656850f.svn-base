/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
export class SuggestionService {
    // Create a singleton service
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        return SuggestionService.instance = SuggestionService.instance || this;
    }
    /**
     * @param {?} params
     * @param {?=} callback
     * @return {?}
     */
    saveSuggestion(params, callback) {
        if (!params.keyword) {
            return;
        }
        return this.http.postJSON(iNet.getPUrl('system/suggestion/update'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (callback) {
                callback(data);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (callback) {
                callback(null, err);
            }
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    loadSuggestion(params, callback) {
        return this.http.postJSON(iNet.getPUrl('system/suggestion/hint'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            callback(data && data.items || []);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            callback([], err);
        }));
    }
}
SuggestionService.instance = null; // Create a singleton service
SuggestionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SuggestionService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    SuggestionService.instance;
    /**
     * @type {?}
     * @private
     */
    SuggestionService.prototype.http;
}
/**
 * @record
 */
export function SuggestionParamData() { }
if (false) {
    /** @type {?} */
    SuggestionParamData.prototype.content;
    /** @type {?} */
    SuggestionParamData.prototype.keyword;
}
/**
 * @record
 */
export function SuggestionResponse() { }
if (false) {
    /** @type {?} */
    SuggestionResponse.prototype.items;
    /** @type {?} */
    SuggestionResponse.prototype.total;
}
/**
 * @record
 */
export function SuggestionItem() { }
if (false) {
    /** @type {?} */
    SuggestionItem.prototype.content;
    /** @type {?} */
    SuggestionItem.prototype.keyword;
    /** @type {?} */
    SuggestionItem.prototype.ownercode;
    /** @type {?} */
    SuggestionItem.prototype.usage;
    /** @type {?} */
    SuggestionItem.prototype.uuid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3N1Z2dlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQU14RCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQUcxQixZQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QyxPQUFPLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzNFLENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxNQUEyQixFQUFFLFFBQW1CO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU87U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVM7Ozs7UUFDakYsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNMLElBQUksUUFBUSxFQUFFO2dCQUNWLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUM7Ozs7UUFDRCxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ0osSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsRUFDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLE1BQTJCLEVBQUUsUUFBa0I7UUFDMUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUzs7OztRQUMvRSxDQUFDLElBQXdCLEVBQUUsRUFBRTtZQUN6QixRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkMsQ0FBQzs7OztRQUNELEdBQUcsQ0FBQyxFQUFFO1lBQ0YsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQ0osQ0FBQztJQUNOLENBQUM7O0FBakNNLDBCQUFRLEdBQXNCLElBQUksQ0FBQyxDQUFFLDZCQUE2Qjs7WUFGNUUsVUFBVTs7OztZQUxILGlCQUFpQjs7OztJQU9yQiwyQkFBMEM7Ozs7O0lBRTlCLGlDQUErQjs7Ozs7QUFpQy9DLHlDQUdDOzs7SUFGRyxzQ0FBZ0I7O0lBQ2hCLHNDQUFnQjs7Ozs7QUFHcEIsd0NBR0M7OztJQUZHLG1DQUF3Qjs7SUFDeEIsbUNBQWM7Ozs7O0FBR2xCLG9DQU1DOzs7SUFMRyxpQ0FBZ0I7O0lBQ2hCLGlDQUFnQjs7SUFDaEIsbUNBQWtCOztJQUNsQiwrQkFBYzs7SUFDZCw4QkFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tICcuL2h0dHAtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdWdnZXN0aW9uU2VydmljZSB7XG4gICAgc3RhdGljIGluc3RhbmNlOiBTdWdnZXN0aW9uU2VydmljZSA9IG51bGw7ICAvLyBDcmVhdGUgYSBzaW5nbGV0b24gc2VydmljZVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSkge1xuICAgICAgICByZXR1cm4gU3VnZ2VzdGlvblNlcnZpY2UuaW5zdGFuY2UgPSBTdWdnZXN0aW9uU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHNhdmVTdWdnZXN0aW9uKHBhcmFtczogU3VnZ2VzdGlvblBhcmFtRGF0YSwgY2FsbGJhY2s/OiBGdW5jdGlvbik6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGlmICghcGFyYW1zLmtleXdvcmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnc3lzdGVtL3N1Z2dlc3Rpb24vdXBkYXRlJyksIHBhcmFtcykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbG9hZFN1Z2dlc3Rpb24ocGFyYW1zOiBTdWdnZXN0aW9uUGFyYW1EYXRhLCBjYWxsYmFjazogRnVuY3Rpb24pOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnc3lzdGVtL3N1Z2dlc3Rpb24vaGludCcpLCBwYXJhbXMpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhOiBTdWdnZXN0aW9uUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhICYmIGRhdGEuaXRlbXMgfHwgW10pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soW10sIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuZXhwb3J0IGludGVyZmFjZSBTdWdnZXN0aW9uUGFyYW1EYXRhIHtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAga2V5d29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1Z2dlc3Rpb25SZXNwb25zZSB7XG4gICAgaXRlbXM6IFN1Z2dlc3Rpb25JdGVtW107XG4gICAgdG90YWw6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdWdnZXN0aW9uSXRlbSB7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIGtleXdvcmQ6IHN0cmluZztcbiAgICBvd25lcmNvZGU6IHN0cmluZztcbiAgICB1c2FnZTogbnVtYmVyO1xuICAgIHV1aWQ6IHN0cmluZztcbn1cbiJdfQ==