/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoadingIndicatorService } from "./loading-indicator.service";
import { HttpUrlEncodingCodec } from "./http-url-encoding-codec";
var HttpClientService = /** @class */ (function (_super) {
    tslib_1.__extends(HttpClientService, _super);
    function HttpClientService(handler, loadingService) {
        var _this = _super.call(this, handler) || this;
        _this.loadingService = loadingService;
        _this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    HttpClientService.prototype.convertToHttpParams = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (!obj) {
            return null;
        }
        return Object.getOwnPropertyNames(obj).reduce((/**
         * @param {?} p
         * @param {?} key
         * @return {?}
         */
        function (p, key) { return p.set(key, obj[key] == undefined ? '' : obj[key]); }), new HttpParams({ encoder: new HttpUrlEncodingCodec() }));
    };
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    HttpClientService.prototype.getJSON = /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    function (url, body) {
        return this.get(url, { params: this.convertToHttpParams(body), headers: this.headers });
    };
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    HttpClientService.prototype.postJSON = /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    function (url, body) {
        return this.post(url, this.convertToHttpParams(body), { headers: this.headers });
    };
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    HttpClientService.prototype.putJSON = /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    function (url, body) {
        return this.put(url, this.convertToHttpParams(body), { headers: this.headers });
    };
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    HttpClientService.prototype.deleteJSON = /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    function (url, body) {
        return this.delete(url, { params: this.convertToHttpParams(body), headers: this.headers });
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    HttpClientService.prototype.convertToFormData = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        //console.log('[convertToFormData]', obj);
        /** @type {?} */
        var formData = new FormData();
        if (!obj) {
            return formData;
        }
        Object.keys(obj).forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            //console.log('[key]', k , '=', obj[k]==undefined ? '' : obj[k]);
            formData.append(k, obj[k] == undefined ? '' : obj[k]);
        }));
        //console.log('[formData]', formData);
        return formData;
    };
    /**
     * @param {?} url
     * @param {?=} obj
     * @return {?}
     */
    HttpClientService.prototype.downloadFile = /**
     * @param {?} url
     * @param {?=} obj
     * @return {?}
     */
    function (url, obj) {
        if (!obj) {
            return;
        }
        /** @type {?} */
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.enctype = 'multipart/form-data';
        Object.keys(obj).forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            //console.log('[key]', k , '=', obj[k]==undefined ? '' : obj[k]);
            /** @type {?} */
            var input = document.createElement("input");
            input.name = k;
            input.value = obj[k] == undefined ? '' : obj[k];
            input.type = 'hidden';
            form.appendChild(input);
        }));
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };
    /**
     * @param {?=} message
     * @return {?}
     */
    HttpClientService.prototype.showLoading = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        this.loadingService.showLoading(message);
    };
    /**
     * @return {?}
     */
    HttpClientService.prototype.hideLoading = /**
     * @return {?}
     */
    function () {
        this.loadingService.hideLoading();
    };
    HttpClientService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpClientService.ctorParameters = function () { return [
        { type: HttpHandler },
        { type: LoadingIndicatorService }
    ]; };
    return HttpClientService;
}(HttpClient));
export { HttpClientService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HttpClientService.prototype.headers;
    /**
     * @type {?}
     * @private
     */
    HttpClientService.prototype.loadingService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9odHRwLWNsaWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFL0Q7SUFDdUMsNkNBQVU7SUFHN0MsMkJBQVksT0FBb0IsRUFBVSxjQUF1QztRQUFqRixZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZ5QyxvQkFBYyxHQUFkLGNBQWMsQ0FBeUI7UUFGekUsYUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtEQUFrRCxFQUFDLENBQUMsQ0FBQzs7SUFJeEcsQ0FBQzs7Ozs7SUFFRCwrQ0FBbUI7Ozs7SUFBbkIsVUFBb0IsR0FBUTtRQUN4QixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07Ozs7O1FBQUMsVUFBQyxDQUFDLEVBQUUsR0FBRyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBakQsQ0FBaUQsR0FBRSxJQUFJLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekssQ0FBQzs7Ozs7O0lBRUQsbUNBQU87Ozs7O0lBQVAsVUFBUSxHQUFXLEVBQUUsSUFBaUI7UUFDbEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Ozs7OztJQUVELG9DQUFROzs7OztJQUFSLFVBQVMsR0FBVyxFQUFFLElBQWlCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7Ozs7OztJQUVELG1DQUFPOzs7OztJQUFQLFVBQVEsR0FBVyxFQUFFLElBQWlCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7Ozs7OztJQUVELHNDQUFVOzs7OztJQUFWLFVBQVcsR0FBVyxFQUFFLElBQWlCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDOzs7OztJQUVELDZDQUFpQjs7OztJQUFqQixVQUFrQixHQUFROzs7WUFFbEIsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFO1FBQzdCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsQ0FBQztZQUN0QixpRUFBaUU7WUFDakUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLEVBQUMsQ0FBQztRQUNILHNDQUFzQztRQUN0QyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFFRCx3Q0FBWTs7Ozs7SUFBWixVQUFhLEdBQVcsRUFBRSxHQUFTO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPO1NBQ1Y7O1lBQ0csSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFFckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxDQUFDOzs7Z0JBRWxCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUMzQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNmLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsS0FBSyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsdUNBQVc7Ozs7SUFBWCxVQUFZLE9BQWdCO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCx1Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3JDLENBQUM7O2dCQXpFSixVQUFVOzs7O2dCQUxTLFdBQVc7Z0JBRXZCLHVCQUF1Qjs7SUE2RS9CLHdCQUFDO0NBQUEsQUExRUQsQ0FDdUMsVUFBVSxHQXlFaEQ7U0F6RVksaUJBQWlCOzs7Ozs7SUFDMUIsb0NBQXdHOzs7OztJQUV0RSwyQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGFuZGxlciwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlfSBmcm9tIFwiLi9sb2FkaW5nLWluZGljYXRvci5zZXJ2aWNlXCI7XG5pbXBvcnQge0h0dHBVcmxFbmNvZGluZ0NvZGVjfSBmcm9tIFwiLi9odHRwLXVybC1lbmNvZGluZy1jb2RlY1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudFNlcnZpY2UgZXh0ZW5kcyBIdHRwQ2xpZW50IHtcbiAgICBwcml2YXRlIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04J30pO1xuXG4gICAgY29uc3RydWN0b3IoaGFuZGxlcjogSHR0cEhhbmRsZXIsIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIGNvbnZlcnRUb0h0dHBQYXJhbXMob2JqOiBhbnkpOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLnJlZHVjZSgocCwga2V5KSA9PiBwLnNldChrZXksIG9ialtrZXldID09IHVuZGVmaW5lZCA/ICcnIDogb2JqW2tleV0pLCBuZXcgSHR0cFBhcmFtcyh7IGVuY29kZXI6IG5ldyBIdHRwVXJsRW5jb2RpbmdDb2RlYygpfSkpO1xuICAgIH1cblxuICAgIGdldEpTT04odXJsOiBzdHJpbmcsIGJvZHk/OiBhbnkgfCBudWxsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHVybCwge3BhcmFtczogdGhpcy5jb252ZXJ0VG9IdHRwUGFyYW1zKGJvZHkpLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnN9KTtcbiAgICB9XG5cbiAgICBwb3N0SlNPTih1cmw6IHN0cmluZywgYm9keT86IGFueSB8IG51bGwpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHVybCwgdGhpcy5jb252ZXJ0VG9IdHRwUGFyYW1zKGJvZHkpLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzfSk7XG4gICAgfVxuXG4gICAgcHV0SlNPTih1cmw6IHN0cmluZywgYm9keT86IGFueSB8IG51bGwpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXQodXJsLCB0aGlzLmNvbnZlcnRUb0h0dHBQYXJhbXMoYm9keSksIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnN9KTtcbiAgICB9XG5cbiAgICBkZWxldGVKU09OKHVybDogc3RyaW5nLCBib2R5PzogYW55IHwgbnVsbCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh1cmwsIHtwYXJhbXM6IHRoaXMuY29udmVydFRvSHR0cFBhcmFtcyhib2R5KSwgaGVhZGVyczogdGhpcy5oZWFkZXJzfSk7XG4gICAgfVxuXG4gICAgY29udmVydFRvRm9ybURhdGEob2JqOiBhbnkpOiBGb3JtRGF0YSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tjb252ZXJ0VG9Gb3JtRGF0YV0nLCBvYmopO1xuICAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdba2V5XScsIGsgLCAnPScsIG9ialtrXT09dW5kZWZpbmVkID8gJycgOiBvYmpba10pO1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGssIG9ialtrXSA9PSB1bmRlZmluZWQgPyAnJyA6IG9ialtrXSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdbZm9ybURhdGFdJywgZm9ybURhdGEpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgfVxuXG4gICAgZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBvYmo/OiBhbnkpIHtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgICAgIGZvcm0uYWN0aW9uID0gdXJsO1xuICAgICAgICBmb3JtLmVuY3R5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XG5cbiAgICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnW2tleV0nLCBrICwgJz0nLCBvYmpba109PXVuZGVmaW5lZCA/ICcnIDogb2JqW2tdKTtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIGlucHV0Lm5hbWUgPSBrO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBvYmpba10gPT0gdW5kZWZpbmVkID8gJycgOiBvYmpba107XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZm9ybSk7XG4gICAgfVxuXG4gICAgc2hvd0xvYWRpbmcobWVzc2FnZT86IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnNob3dMb2FkaW5nKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhpZGVMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLmhpZGVMb2FkaW5nKClcbiAgICB9XG59XG4iXX0=