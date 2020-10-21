/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
var SuggestionService = /** @class */ (function () {
    function SuggestionService(http) {
        this.http = http;
        return SuggestionService.instance = SuggestionService.instance || this;
    }
    /**
     * @param {?} params
     * @param {?=} callback
     * @return {?}
     */
    SuggestionService.prototype.saveSuggestion = /**
     * @param {?} params
     * @param {?=} callback
     * @return {?}
     */
    function (params, callback) {
        if (!params.keyword) {
            return;
        }
        return this.http.postJSON(iNet.getPUrl('system/suggestion/update'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (callback) {
                callback(data);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            if (callback) {
                callback(null, err);
            }
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SuggestionService.prototype.loadSuggestion = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.http.postJSON(iNet.getPUrl('system/suggestion/hint'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            callback(data && data.items || []);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            callback([], err);
        }));
    };
    SuggestionService.instance = null; // Create a singleton service
    SuggestionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SuggestionService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return SuggestionService;
}());
export { SuggestionService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3N1Z2dlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUt4RDtJQUlJLDJCQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QyxPQUFPLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzNFLENBQUM7Ozs7OztJQUVELDBDQUFjOzs7OztJQUFkLFVBQWUsTUFBMkIsRUFBRSxRQUFtQjtRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1Y7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ2pGLFVBQUMsSUFBSTtZQUNELElBQUksUUFBUSxFQUFFO2dCQUNWLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUM7Ozs7UUFDRCxVQUFDLEdBQUc7WUFDQSxJQUFJLFFBQVEsRUFBRTtnQkFDVixRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxFQUNKLENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFRCwwQ0FBYzs7Ozs7SUFBZCxVQUFlLE1BQTJCLEVBQUUsUUFBa0I7UUFDMUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUzs7OztRQUMvRSxVQUFDLElBQXdCO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDOzs7O1FBQ0QsVUFBQSxHQUFHO1lBQ0MsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQ0osQ0FBQztJQUNOLENBQUM7SUFqQ00sMEJBQVEsR0FBc0IsSUFBSSxDQUFDLENBQUUsNkJBQTZCOztnQkFGNUUsVUFBVTs7OztnQkFMSCxpQkFBaUI7O0lBeUN6Qix3QkFBQztDQUFBLEFBcENELElBb0NDO1NBbkNZLGlCQUFpQjs7O0lBQzFCLDJCQUEwQzs7Ozs7SUFFOUIsaUNBQStCOzs7OztBQWlDL0MseUNBR0M7OztJQUZHLHNDQUFnQjs7SUFDaEIsc0NBQWdCOzs7OztBQUdwQix3Q0FHQzs7O0lBRkcsbUNBQXdCOztJQUN4QixtQ0FBYzs7Ozs7QUFHbEIsb0NBTUM7OztJQUxHLGlDQUFnQjs7SUFDaEIsaUNBQWdCOztJQUNoQixtQ0FBa0I7O0lBQ2xCLCtCQUFjOztJQUNkLDhCQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2V9IGZyb20gJy4vaHR0cC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN1Z2dlc3Rpb25TZXJ2aWNlIHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IFN1Z2dlc3Rpb25TZXJ2aWNlID0gbnVsbDsgIC8vIENyZWF0ZSBhIHNpbmdsZXRvbiBzZXJ2aWNlXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBTdWdnZXN0aW9uU2VydmljZS5pbnN0YW5jZSA9IFN1Z2dlc3Rpb25TZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgc2F2ZVN1Z2dlc3Rpb24ocGFyYW1zOiBTdWdnZXN0aW9uUGFyYW1EYXRhLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgaWYgKCFwYXJhbXMua2V5d29yZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdzeXN0ZW0vc3VnZ2VzdGlvbi91cGRhdGUnKSwgcGFyYW1zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBsb2FkU3VnZ2VzdGlvbihwYXJhbXM6IFN1Z2dlc3Rpb25QYXJhbURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbik6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdzeXN0ZW0vc3VnZ2VzdGlvbi9oaW50JyksIHBhcmFtcykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGE6IFN1Z2dlc3Rpb25SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhbXSwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5leHBvcnQgaW50ZXJmYWNlIFN1Z2dlc3Rpb25QYXJhbURhdGEge1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICBrZXl3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VnZ2VzdGlvblJlc3BvbnNlIHtcbiAgICBpdGVtczogU3VnZ2VzdGlvbkl0ZW1bXTtcbiAgICB0b3RhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1Z2dlc3Rpb25JdGVtIHtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAga2V5d29yZDogc3RyaW5nO1xuICAgIG93bmVyY29kZTogc3RyaW5nO1xuICAgIHVzYWdlOiBudW1iZXI7XG4gICAgdXVpZDogc3RyaW5nO1xufVxuIl19