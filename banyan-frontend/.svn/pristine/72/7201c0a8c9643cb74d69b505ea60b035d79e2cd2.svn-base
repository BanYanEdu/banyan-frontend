/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from 'inet-core';
import { TranslateService } from "@ngx-translate/core";
export class CloudTranslateService {
    /**
     * @param {?} http
     * @param {?} translate
     */
    constructor(http, translate) {
        this.http = http;
        this.translate = translate;
        this.url = {
            list: iNet.getPUrl('message/keys')
        };
    }
    /**
     * @return {?}
     */
    getAllMessage() {
        return this.http.getJSON(this.url.list);
    }
    /**
     * @param {?} appName
     * @return {?}
     */
    getMessageByApp(appName) {
        return this.http.getJSON(this.url.list, { group: appName });
    }
    /**
     * @return {?}
     */
    getCurrentLang() {
        if (window.localStorage) {
            return window.localStorage.getItem(CloudTranslateService.LANGUAGE_KEY) || this.translate.currentLang;
        }
        return this.translate.currentLang;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setCurrentLang(lang) {
        if (window.localStorage) {
            localStorage.setItem(CloudTranslateService.LANGUAGE_KEY, lang);
        }
        this.translate.setDefaultLang(lang);
    }
}
CloudTranslateService.LANGUAGE_KEY = 'language';
CloudTranslateService.GRID_KEY = 'grid';
CloudTranslateService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CloudTranslateService.ctorParameters = () => [
    { type: HttpClientService },
    { type: TranslateService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3RyYW5zbGF0ZS9jbG91ZC10cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFNUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFLckQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFPOUIsWUFBb0IsSUFBdUIsRUFDdkIsU0FBMkI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFMdkMsUUFBRyxHQUFHO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1NBQ3JDLENBQUM7SUFHZ0QsQ0FBQzs7OztJQUVuRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7U0FDeEc7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQVk7UUFDdkIsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7QUE3Qk0sa0NBQVksR0FBRyxVQUFVLENBQUM7QUFDMUIsOEJBQVEsR0FBRyxNQUFNLENBQUM7O1lBSDVCLFVBQVU7Ozs7WUFOSCxpQkFBaUI7WUFFakIsZ0JBQWdCOzs7O0lBTXBCLG1DQUFpQzs7SUFDakMsK0JBQXlCOzs7OztJQUN6QixvQ0FFRTs7Ozs7SUFFVSxxQ0FBK0I7Ozs7O0lBQy9CLDBDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENsb3VkVHJhbnNsYXRlU2VydmljZSB7XG4gICAgc3RhdGljIExBTkdVQUdFX0tFWSA9ICdsYW5ndWFnZSc7XG4gICAgc3RhdGljIEdSSURfS0VZID0gJ2dyaWQnO1xuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICBsaXN0OiBpTmV0LmdldFBVcmwoJ21lc3NhZ2Uva2V5cycpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgICBnZXRBbGxNZXNzYWdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0KTtcbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlQnlBcHAoYXBwTmFtZTogc3RyaW5nKSA6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0LCB7Z3JvdXA6IGFwcE5hbWV9KTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50TGFuZygpOiBzdHJpbmcge1xuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShDbG91ZFRyYW5zbGF0ZVNlcnZpY2UuTEFOR1VBR0VfS0VZKSB8fCB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmc7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudExhbmcobGFuZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShDbG91ZFRyYW5zbGF0ZVNlcnZpY2UuTEFOR1VBR0VfS0VZLCBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5zZXREZWZhdWx0TGFuZyhsYW5nKTtcbiAgICB9XG5cbn1cbiJdfQ==