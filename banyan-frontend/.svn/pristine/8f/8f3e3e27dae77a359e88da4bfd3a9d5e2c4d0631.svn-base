/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoadingIndicatorService } from "./loading-indicator.service";
import { HttpUrlEncodingCodec } from "./http-url-encoding-codec";
export class HttpClientService extends HttpClient {
    /**
     * @param {?} handler
     * @param {?} loadingService
     */
    constructor(handler, loadingService) {
        super(handler);
        this.loadingService = loadingService;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    convertToHttpParams(obj) {
        if (!obj) {
            return null;
        }
        return Object.getOwnPropertyNames(obj).reduce((/**
         * @param {?} p
         * @param {?} key
         * @return {?}
         */
        (p, key) => p.set(key, obj[key] == undefined ? '' : obj[key])), new HttpParams({ encoder: new HttpUrlEncodingCodec() }));
    }
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    getJSON(url, body) {
        return this.get(url, { params: this.convertToHttpParams(body), headers: this.headers });
    }
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    postJSON(url, body) {
        return this.post(url, this.convertToHttpParams(body), { headers: this.headers });
    }
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    putJSON(url, body) {
        return this.put(url, this.convertToHttpParams(body), { headers: this.headers });
    }
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    deleteJSON(url, body) {
        return this.delete(url, { params: this.convertToHttpParams(body), headers: this.headers });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    convertToFormData(obj) {
        //console.log('[convertToFormData]', obj);
        /** @type {?} */
        let formData = new FormData();
        if (!obj) {
            return formData;
        }
        Object.keys(obj).forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            //console.log('[key]', k , '=', obj[k]==undefined ? '' : obj[k]);
            formData.append(k, obj[k] == undefined ? '' : obj[k]);
        }));
        //console.log('[formData]', formData);
        return formData;
    }
    /**
     * @param {?} url
     * @param {?=} obj
     * @return {?}
     */
    downloadFile(url, obj) {
        if (!obj) {
            return;
        }
        /** @type {?} */
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.enctype = 'multipart/form-data';
        Object.keys(obj).forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            //console.log('[key]', k , '=', obj[k]==undefined ? '' : obj[k]);
            /** @type {?} */
            let input = document.createElement("input");
            input.name = k;
            input.value = obj[k] == undefined ? '' : obj[k];
            input.type = 'hidden';
            form.appendChild(input);
        }));
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    showLoading(message) {
        this.loadingService.showLoading(message);
    }
    /**
     * @return {?}
     */
    hideLoading() {
        this.loadingService.hideLoading();
    }
}
HttpClientService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpClientService.ctorParameters = () => [
    { type: HttpHandler },
    { type: LoadingIndicatorService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9odHRwLWNsaWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUcvRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsVUFBVTs7Ozs7SUFHN0MsWUFBWSxPQUFvQixFQUFVLGNBQXVDO1FBQzdFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUR1QixtQkFBYyxHQUFkLGNBQWMsQ0FBeUI7UUFGekUsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtEQUFrRCxFQUFDLENBQUMsQ0FBQztJQUl4RyxDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLEdBQVE7UUFDeEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRSxJQUFJLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixFQUFFLEVBQUMs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QUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFnQjtRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDckMsQ0FBQzs7O1lBekVKLFVBQVU7Ozs7WUFMUyxXQUFXO1lBRXZCLHVCQUF1Qjs7Ozs7OztJQUszQixvQ0FBd0c7Ozs7O0lBRXRFLDJDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBIYW5kbGVyLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvclNlcnZpY2V9IGZyb20gXCIuL2xvYWRpbmctaW5kaWNhdG9yLnNlcnZpY2VcIjtcbmltcG9ydCB7SHR0cFVybEVuY29kaW5nQ29kZWN9IGZyb20gXCIuL2h0dHAtdXJsLWVuY29kaW5nLWNvZGVjXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwQ2xpZW50U2VydmljZSBleHRlbmRzIEh0dHBDbGllbnQge1xuICAgIHByaXZhdGUgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnfSk7XG5cbiAgICBjb25zdHJ1Y3RvcihoYW5kbGVyOiBIdHRwSGFuZGxlciwgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ0luZGljYXRvclNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaGFuZGxlcik7XG4gICAgfVxuXG4gICAgY29udmVydFRvSHR0cFBhcmFtcyhvYmo6IGFueSk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikucmVkdWNlKChwLCBrZXkpID0+IHAuc2V0KGtleSwgb2JqW2tleV0gPT0gdW5kZWZpbmVkID8gJycgOiBvYmpba2V5XSksIG5ldyBIdHRwUGFyYW1zKHsgZW5jb2RlcjogbmV3IEh0dHBVcmxFbmNvZGluZ0NvZGVjKCl9KSk7XG4gICAgfVxuXG4gICAgZ2V0SlNPTih1cmw6IHN0cmluZywgYm9keT86IGFueSB8IG51bGwpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQodXJsLCB7cGFyYW1zOiB0aGlzLmNvbnZlcnRUb0h0dHBQYXJhbXMoYm9keSksIGhlYWRlcnM6IHRoaXMuaGVhZGVyc30pO1xuICAgIH1cblxuICAgIHBvc3RKU09OKHVybDogc3RyaW5nLCBib2R5PzogYW55IHwgbnVsbCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3QodXJsLCB0aGlzLmNvbnZlcnRUb0h0dHBQYXJhbXMoYm9keSksIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnN9KTtcbiAgICB9XG5cbiAgICBwdXRKU09OKHVybDogc3RyaW5nLCBib2R5PzogYW55IHwgbnVsbCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1dCh1cmwsIHRoaXMuY29udmVydFRvSHR0cFBhcmFtcyhib2R5KSwge2hlYWRlcnM6IHRoaXMuaGVhZGVyc30pO1xuICAgIH1cblxuICAgIGRlbGV0ZUpTT04odXJsOiBzdHJpbmcsIGJvZHk/OiBhbnkgfCBudWxsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKHVybCwge3BhcmFtczogdGhpcy5jb252ZXJ0VG9IdHRwUGFyYW1zKGJvZHkpLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnN9KTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG9Gb3JtRGF0YShvYmo6IGFueSk6IEZvcm1EYXRhIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW2NvbnZlcnRUb0Zvcm1EYXRhXScsIG9iaik7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1trZXldJywgayAsICc9Jywgb2JqW2tdPT11bmRlZmluZWQgPyAnJyA6IG9ialtrXSk7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoaywgb2JqW2tdID09IHVuZGVmaW5lZCA/ICcnIDogb2JqW2tdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tmb3JtRGF0YV0nLCBmb3JtRGF0YSk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICB9XG5cbiAgICBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIG9iaj86IGFueSkge1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgICAgZm9ybS5hY3Rpb24gPSB1cmw7XG4gICAgICAgIGZvcm0uZW5jdHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcblxuICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdba2V5XScsIGsgLCAnPScsIG9ialtrXT09dW5kZWZpbmVkID8gJycgOiBvYmpba10pO1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgaW5wdXQubmFtZSA9IGs7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IG9ialtrXSA9PSB1bmRlZmluZWQgPyAnJyA6IG9ialtrXTtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmb3JtKTtcbiAgICB9XG5cbiAgICBzaG93TG9hZGluZyhtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc2hvd0xvYWRpbmcobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGlkZUxvYWRpbmcoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2UuaGlkZUxvYWRpbmcoKVxuICAgIH1cbn1cbiJdfQ==