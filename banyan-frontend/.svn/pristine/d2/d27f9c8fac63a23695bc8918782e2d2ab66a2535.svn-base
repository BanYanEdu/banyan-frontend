/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { map, shareReplay, tap } from 'rxjs/operators';
export class CoreService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        return CoreService.instance = CoreService.instance || this;
    }
    /**
     * @return {?}
     */
    logout() {
        this.http.post(iNet.getPUrl('system/logout'), { 'username': iNet.username }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const iFrame = document.createElement('iframe');
            iFrame.setAttribute('src', data.uuid);
            iFrame.addEventListener('load', (/**
             * @return {?}
             */
            function () {
                location.reload();
            }));
            document.body.appendChild(iFrame);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
        }));
    }
    /*
        * Gets the avatar URL with the username
        * @deprecated Use UserProfileService.getAvatarUrlByUsername() instead
        */
    /**
     * @param {?} usercode
     * @param {?=} thumbnail
     * @return {?}
     */
    getAvatar(usercode, thumbnail) {
        thumbnail = thumbnail || 50;
        return iNet.getPUrl('system/userprofile/photo') +
            `?usercode=${usercode}&thumbnail=${thumbnail}`;
    }
    /**
     * @return {?}
     */
    isExternalUser() {
        return (iNet.externalUser == 'true');
    }
    /**
     * @return {?}
     */
    isCommunity() {
        return (this.isExternalUser() || iNet.firmPrefix == 'smartcloud' || iNet.firmPrefix == 'community');
    }
    /**
     * @return {?}
     */
    getOrg() {
        return this.http.get(iNet.getPUrl('plugin/organization/list'))
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res.elements)));
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    searchOrgan(params = {}) {
        return this.http.postJSON(iNet.getPUrl('plugin/organization/search'), params)
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res.elements)));
    }
    /**
     * @return {?}
     */
    getSystemApplication() {
        if (this.applications) {
            return of(this.applications);
        }
        if (!this.$appCache) {
            this.$appCache = this.http.postJSON(iNet.getPUrl('system/application/list'))
                .pipe(tap((/**
             * @param {?} res
             * @return {?}
             */
            (res) => this.applications = res.elements)))
                .pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            (res) => res.elements)))
                .pipe(shareReplay(1));
        }
        return this.$appCache;
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    searchFirmAccount(params, callback) {
        this.http.postJSON(iNet.getPUrl('plugin/firmaccount/list'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            callback(data);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            callback(null, err);
        }));
    }
    /**
     * @param {?} lang
     * @param {?=} callback
     * @return {?}
     */
    updateLanguage(lang, callback) {
        this.http.postJSON(iNet.getPUrl('system/userprofile/languageupdate'), { intl: lang }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (callback) {
                callback(lang);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (callback) {
                callback(lang);
            }
        }));
    }
    /**
     * Get the Image URL for the current app
     * @param {?} fileName - the file name
     * @return {?}
     */
    getImageUrl(fileName) {
        if (!fileName) {
            return '';
        }
        if (fileName.indexOf('/') === 0) {
            return this.getAssetsPath() + fileName;
        }
        return `${this.getAssetsPath()}/${fileName}`;
    }
    /**
     * Build the file URL for the file server request
     * @param {?} fileName - the given file name
     * @return {?}
     */
    getFileUrl(fileName) {
        if (!fileName) {
            return '';
        }
        if (fileName.indexOf('/') === 0) {
            return this.getFileServerPath() + fileName;
        }
        return `${this.getFileServerPath()}/${fileName}`;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getSsoRedirect(data) {
        return iNet.getPUrl('ssorequest/redirect') + '?' + $.param(data);
    }
    /**
     * @return {?}
     */
    convergePlugins() {
        return this.convergeSearch({ converge: 'plugins' });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    convergeSearch(params) {
        return this.http.postJSON(iNet.getPUrl('converge/search'), params);
    }
    /**
     * @param {?=} v
     * @return {?}
     */
    setEnvironment(v = { production: false }) {
        CoreService.environment = v;
    }
    /**
     * @return {?}
     */
    getEnvironment() {
        return CoreService.environment;
    }
    /**
     * @private
     * @param {?=} path
     * @return {?}
     */
    getPath(path = '') {
        /** @type {?} */
        const lastIndex = path.lastIndexOf('/');
        if (lastIndex === path.length - 1) {
            return path.substring(0, lastIndex);
        }
        return path;
    }
    /**
     * Gets File server path
     * @return {?}
     */
    getFileServerPath() {
        return this.getPath(iNet.fileServer);
    }
    /**
     * Gets assets path of current app
     * @return {?}
     */
    getAssetsPath() {
        return this.getPath(iNet.imgFolder);
    }
}
CoreService.instance = null; // Create a singleton service
// Create a singleton service
CoreService.environment = { production: false };
CoreService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CoreService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    CoreService.instance;
    /**
     * @type {?}
     * @private
     */
    CoreService.environment;
    /**
     * @type {?}
     * @private
     */
    CoreService.prototype.$appCache;
    /**
     * @type {?}
     * @private
     */
    CoreService.prototype.applications;
    /**
     * @type {?}
     * @private
     */
    CoreService.prototype.http;
}
/**
 * @record
 */
export function LogoutData() { }
if (false) {
    /** @type {?} */
    LogoutData.prototype.uuid;
}
/**
 * @record
 */
function CustomResponse() { }
if (false) {
    /** @type {?} */
    CustomResponse.prototype.elements;
}
/**
 * @record
 */
export function SsoRedirectData() { }
if (false) {
    /** @type {?} */
    SsoRedirectData.prototype.url;
    /** @type {?} */
    SsoRedirectData.prototype.application;
    /** @type {?|undefined} */
    SsoRedirectData.prototype.redirect;
}
/**
 * @record
 */
export function PathRedirectData() { }
if (false) {
    /** @type {?} */
    PathRedirectData.prototype.path;
    /** @type {?} */
    PathRedirectData.prototype.application;
    /** @type {?|undefined} */
    PathRedirectData.prototype.organId;
    /** @type {?|undefined} */
    PathRedirectData.prototype.firmPrefix;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2NvcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQWEsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBTXJELE1BQU0sT0FBTyxXQUFXOzs7O0lBTXBCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZDLE9BQU8sV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsU0FBUzs7OztRQUNoRixDQUFDLElBQWdCLEVBQUUsRUFBRTs7a0JBQ1gsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTTs7O1lBQUU7Z0JBQzVCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QixDQUFDLEVBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7Ozs7UUFBRSxDQUFDLEdB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QkFFQzs7O0lBREcsa0NBQWdCOzs7OztBQUdwQixxQ0FJQzs7O0lBSEcsOEJBQVk7O0lBQ1osc0NBQW9COztJQUNwQixtQ0FBbUI7Ozs7O0FBR3ZCLHNDQUtDOzs7SUFKRyxnQ0FBYTs7SUFDYix1Q0FBb0I7O0lBQ3BCLG1DQUFpQjs7SUFDakIsc0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cEVycm9yUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSAnLi9odHRwLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7bWFwLCBzaGFyZVJlcGxheSwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvcmVTZXJ2aWNlIHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IENvcmVTZXJ2aWNlID0gbnVsbDsgIC8vIENyZWF0ZSBhIHNpbmdsZXRvbiBzZXJ2aWNlXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnQgPSB7cHJvZHVjdGlvbjogZmFsc2V9O1xuICAgIHByaXZhdGUgJGFwcENhY2hlOiBPYnNlcnZhYmxlPE9iamVjdD47XG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvbnM6IEFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBDb3JlU2VydmljZS5pbnN0YW5jZSA9IENvcmVTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLmh0dHAucG9zdChpTmV0LmdldFBVcmwoJ3N5c3RlbS9sb2dvdXQnKSwgeyd1c2VybmFtZSc6IGlOZXQudXNlcm5hbWV9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YTogTG9nb3V0RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlGcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgIGlGcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGRhdGEudXVpZCk7XG4gICAgICAgICAgICAgICAgaUZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaUZyYW1lKTtcbiAgICAgICAgICAgIH0sIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEdldHMgdGhlIGF2YXRhciBVUkwgd2l0aCB0aGUgdXNlcm5hbWVcbiAgICAqIEBkZXByZWNhdGVkIFVzZSBVc2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVXJsQnlVc2VybmFtZSgpIGluc3RlYWRcbiAgICAqL1xuICAgIGdldEF2YXRhcih1c2VyY29kZTogc3RyaW5nLCB0aHVtYm5haWw/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgNTA7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9waG90bycpICtcbiAgICAgICAgICAgIGA/dXNlcmNvZGU9JHt1c2VyY29kZX0mdGh1bWJuYWlsPSR7dGh1bWJuYWlsfWA7XG4gICAgfVxuXG4gICAgaXNFeHRlcm5hbFVzZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoaU5ldC5leHRlcm5hbFVzZXIgPT0gJ3RydWUnKTtcbiAgICB9XG5cbiAgICBpc0NvbW11bml0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzRXh0ZXJuYWxVc2VyKCkgfHwgaU5ldC5maXJtUHJlZml4ID09ICdzbWFydGNsb3VkJyB8fCBpTmV0LmZpcm1QcmVmaXggPT0gJ2NvbW11bml0eScpO1xuICAgIH1cblxuICAgIGdldE9yZygpOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChpTmV0LmdldFBVcmwoJ3BsdWdpbi9vcmdhbml6YXRpb24vbGlzdCcpKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEN1c3RvbVJlc3BvbnNlKSA9PiByZXMuZWxlbWVudHMpKTtcbiAgICB9XG5cbiAgICBzZWFyY2hPcmdhbihwYXJhbXM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ3BsdWdpbi9vcmdhbml6YXRpb24vc2VhcmNoJyksIHBhcmFtcylcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBDdXN0b21SZXNwb25zZSkgPT4gcmVzLmVsZW1lbnRzKSk7XG4gICAgfVxuXG4gICAgZ2V0U3lzdGVtQXBwbGljYXRpb24oKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgaWYgKHRoaXMuYXBwbGljYXRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5hcHBsaWNhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy4kYXBwQ2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGFwcENhY2hlID0gdGhpcy5odHRwLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnc3lzdGVtL2FwcGxpY2F0aW9uL2xpc3QnKSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YXAoKHJlczogQ3VzdG9tUmVzcG9uc2UpID0+IHRoaXMuYXBwbGljYXRpb25zID0gcmVzLmVsZW1lbnRzKSlcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKHJlczogQ3VzdG9tUmVzcG9uc2UpID0+IHJlcy5lbGVtZW50cykpXG4gICAgICAgICAgICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRhcHBDYWNoZTtcbiAgICB9XG5cbiAgICBzZWFyY2hGaXJtQWNjb3VudChwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmh0dHAucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdwbHVnaW4vZmlybWFjY291bnQvbGlzdCcpLCBwYXJhbXMpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlTGFuZ3VhZ2UobGFuZzogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9sYW5ndWFnZXVwZGF0ZScpLCB7aW50bDogbGFuZ30pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGxhbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobGFuZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSW1hZ2UgVVJMIGZvciB0aGUgY3VycmVudCBhcHBcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUgLSB0aGUgZmlsZSBuYW1lXG4gICAgICovXG4gICAgZ2V0SW1hZ2VVcmwoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghZmlsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsZU5hbWUuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBc3NldHNQYXRoKCkgKyBmaWxlTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRBc3NldHNQYXRoKCl9LyR7ZmlsZU5hbWV9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgZmlsZSBVUkwgZm9yIHRoZSBmaWxlIHNlcnZlciByZXF1ZXN0XG4gICAgICogQHBhcmFtIGZpbGVOYW1lIC0gdGhlIGdpdmVuIGZpbGUgbmFtZVxuICAgICAqL1xuICAgIGdldEZpbGVVcmwoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghZmlsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsZU5hbWUuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlU2VydmVyUGF0aCgpICsgZmlsZU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0RmlsZVNlcnZlclBhdGgoKX0vJHtmaWxlTmFtZX1gO1xuICAgIH1cblxuICAgIGdldFNzb1JlZGlyZWN0KGRhdGE6IFNzb1JlZGlyZWN0RGF0YSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3Nzb3JlcXVlc3QvcmVkaXJlY3QnKSArICc/JyArICQucGFyYW0oZGF0YSk7XG4gICAgfVxuXG4gICAgY29udmVyZ2VQbHVnaW5zKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcmdlU2VhcmNoKHtjb252ZXJnZTogJ3BsdWdpbnMnfSk7XG4gICAgfVxuXG4gICAgY29udmVyZ2VTZWFyY2gocGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ2NvbnZlcmdlL3NlYXJjaCcpLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHNldEVudmlyb25tZW50KHY6IGFueSA9IHtwcm9kdWN0aW9uOiBmYWxzZX0pIHtcbiAgICAgICAgQ29yZVNlcnZpY2UuZW52aXJvbm1lbnQgPSB2O1xuICAgIH1cblxuICAgIGdldEVudmlyb25tZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiBDb3JlU2VydmljZS5lbnZpcm9ubWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhdGgocGF0aDogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgICAgIGlmIChsYXN0SW5kZXggPT09IHBhdGgubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyaW5nKDAsIGxhc3RJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBGaWxlIHNlcnZlciBwYXRoXG4gICAgICovXG4gICAgZ2V0RmlsZVNlcnZlclBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF0aChpTmV0LmZpbGVTZXJ2ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYXNzZXRzIHBhdGggb2YgY3VycmVudCBhcHBcbiAgICAgKi9cbiAgICBnZXRBc3NldHNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhdGgoaU5ldC5pbWdGb2xkZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dvdXREYXRhIHtcbiAgICB1dWlkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBDdXN0b21SZXNwb25zZSBleHRlbmRzIFJlc3BvbnNlIHtcbiAgICBlbGVtZW50czogYW55W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3NvUmVkaXJlY3REYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBhcHBsaWNhdGlvbjogc3RyaW5nO1xuICAgIHJlZGlyZWN0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRoUmVkaXJlY3REYXRhIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgYXBwbGljYXRpb246IHN0cmluZztcbiAgICBvcmdhbklkPzogc3RyaW5nO1xuICAgIGZpcm1QcmVmaXg/OiBzdHJpbmc7XG59XG4iXX0=