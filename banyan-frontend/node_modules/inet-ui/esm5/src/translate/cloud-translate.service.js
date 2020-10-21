/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from 'inet-core';
import { TranslateService } from "@ngx-translate/core";
var CloudTranslateService = /** @class */ (function () {
    function CloudTranslateService(http, translate) {
        this.http = http;
        this.translate = translate;
        this.url = {
            list: iNet.getPUrl('message/keys')
        };
    }
    /**
     * @return {?}
     */
    CloudTranslateService.prototype.getAllMessage = /**
     * @return {?}
     */
    function () {
        return this.http.getJSON(this.url.list);
    };
    /**
     * @param {?} appName
     * @return {?}
     */
    CloudTranslateService.prototype.getMessageByApp = /**
     * @param {?} appName
     * @return {?}
     */
    function (appName) {
        return this.http.getJSON(this.url.list, { group: appName });
    };
    /**
     * @return {?}
     */
    CloudTranslateService.prototype.getCurrentLang = /**
     * @return {?}
     */
    function () {
        if (window.localStorage) {
            return window.localStorage.getItem(CloudTranslateService.LANGUAGE_KEY) || this.translate.currentLang;
        }
        return this.translate.currentLang;
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    CloudTranslateService.prototype.setCurrentLang = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        if (window.localStorage) {
            localStorage.setItem(CloudTranslateService.LANGUAGE_KEY, lang);
        }
        this.translate.setDefaultLang(lang);
    };
    CloudTranslateService.LANGUAGE_KEY = 'language';
    CloudTranslateService.GRID_KEY = 'grid';
    CloudTranslateService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CloudTranslateService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: TranslateService }
    ]; };
    return CloudTranslateService;
}());
export { CloudTranslateService };
if (false) {
    /** @type {?} */
    CloudTranslateService.LANGUAGE_KEY;
    /** @type {?} */
    CloudTranslateService.GRID_KEY;
    /**
     * @type {?}
     * @private
     */
    CloudTranslateService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    CloudTranslateService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    CloudTranslateService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3RyYW5zbGF0ZS9jbG91ZC10cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFNUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFJckQ7SUFRSSwrQkFBb0IsSUFBdUIsRUFDdkIsU0FBMkI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFMdkMsUUFBRyxHQUFHO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1NBQ3JDLENBQUM7SUFHZ0QsQ0FBQzs7OztJQUVuRCw2Q0FBYTs7O0lBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCwrQ0FBZTs7OztJQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFFRCw4Q0FBYzs7O0lBQWQ7UUFDSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDckIsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztTQUN4RztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCw4Q0FBYzs7OztJQUFkLFVBQWUsSUFBWTtRQUN2QixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDckIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBN0JNLGtDQUFZLEdBQUcsVUFBVSxDQUFDO0lBQzFCLDhCQUFRLEdBQUcsTUFBTSxDQUFDOztnQkFINUIsVUFBVTs7OztnQkFOSCxpQkFBaUI7Z0JBRWpCLGdCQUFnQjs7SUFxQ3hCLDRCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FoQ1kscUJBQXFCOzs7SUFDOUIsbUNBQWlDOztJQUNqQywrQkFBeUI7Ozs7O0lBQ3pCLG9DQUVFOzs7OztJQUVVLHFDQUErQjs7Ozs7SUFDL0IsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xvdWRUcmFuc2xhdGVTZXJ2aWNlIHtcbiAgICBzdGF0aWMgTEFOR1VBR0VfS0VZID0gJ2xhbmd1YWdlJztcbiAgICBzdGF0aWMgR1JJRF9LRVkgPSAnZ3JpZCc7XG4gICAgcHJpdmF0ZSB1cmwgPSB7XG4gICAgICAgIGxpc3Q6IGlOZXQuZ2V0UFVybCgnbWVzc2FnZS9rZXlzJylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge31cblxuICAgIGdldEFsbE1lc3NhZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3QpO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2VCeUFwcChhcHBOYW1lOiBzdHJpbmcpIDogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3QsIHtncm91cDogYXBwTmFtZX0pO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRMYW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKENsb3VkVHJhbnNsYXRlU2VydmljZS5MQU5HVUFHRV9LRVkpIHx8IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZztcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TGFuZyhsYW5nOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKENsb3VkVHJhbnNsYXRlU2VydmljZS5MQU5HVUFHRV9LRVksIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xuICAgIH1cblxufVxuIl19