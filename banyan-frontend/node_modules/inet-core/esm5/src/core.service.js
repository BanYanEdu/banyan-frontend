/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { map, shareReplay, tap } from 'rxjs/operators';
var CoreService = /** @class */ (function () {
    function CoreService(http) {
        this.http = http;
        return CoreService.instance = CoreService.instance || this;
    }
    /**
     * @return {?}
     */
    CoreService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.http.post(iNet.getPUrl('system/logout'), { 'username': iNet.username }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var iFrame = document.createElement('iframe');
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
        function (err) {
        }));
    };
    /*
    * Gets the avatar URL with the username
    * @deprecated Use UserProfileService.getAvatarUrlByUsername() instead
    */
    /*
        * Gets the avatar URL with the username
        * @deprecated Use UserProfileService.getAvatarUrlByUsername() instead
        */
    /**
     * @param {?} usercode
     * @param {?=} thumbnail
     * @return {?}
     */
    CoreService.prototype.getAvatar = /*
        * Gets the avatar URL with the username
        * @deprecated Use UserProfileService.getAvatarUrlByUsername() instead
        */
    /**
     * @param {?} usercode
     * @param {?=} thumbnail
     * @return {?}
     */
    function (usercode, thumbnail) {
        thumbnail = thumbnail || 50;
        return iNet.getPUrl('system/userprofile/photo') +
            ("?usercode=" + usercode + "&thumbnail=" + thumbnail);
    };
    /**
     * @return {?}
     */
    CoreService.prototype.isExternalUser = /**
     * @return {?}
     */
    function () {
        return (iNet.externalUser == 'true');
    };
    /**
     * @return {?}
     */
    CoreService.prototype.isCommunity = /**
     * @return {?}
     */
    function () {
        return (this.isExternalUser() || iNet.firmPrefix == 'smartcloud' || iNet.firmPrefix == 'community');
    };
    /**
     * @return {?}
     */
    CoreService.prototype.getOrg = /**
     * @return {?}
     */
    function () {
        return this.http.get(iNet.getPUrl('plugin/organization/list'))
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.elements; })));
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    CoreService.prototype.searchOrgan = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        if (params === void 0) { params = {}; }
        return this.http.postJSON(iNet.getPUrl('plugin/organization/search'), params)
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.elements; })));
    };
    /**
     * @return {?}
     */
    CoreService.prototype.getSystemApplication = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.applications) {
            return of(this.applications);
        }
        if (!this.$appCache) {
            this.$appCache = this.http.postJSON(iNet.getPUrl('system/application/list'))
                .pipe(tap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.applications = res.elements; })))
                .pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return res.elements; })))
                .pipe(shareReplay(1));
        }
        return this.$appCache;
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CoreService.prototype.searchFirmAccount = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.http.postJSON(iNet.getPUrl('plugin/firmaccount/list'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            callback(data);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            callback(null, err);
        }));
    };
    /**
     * @param {?} lang
     * @param {?=} callback
     * @return {?}
     */
    CoreService.prototype.updateLanguage = /**
     * @param {?} lang
     * @param {?=} callback
     * @return {?}
     */
    function (lang, callback) {
        this.http.postJSON(iNet.getPUrl('system/userprofile/languageupdate'), { intl: lang }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (callback) {
                callback(lang);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            if (callback) {
                callback(lang);
            }
        }));
    };
    /**
     * Get the Image URL for the current app
     * @param fileName - the file name
     */
    /**
     * Get the Image URL for the current app
     * @param {?} fileName - the file name
     * @return {?}
     */
    CoreService.prototype.getImageUrl = /**
     * Get the Image URL for the current app
     * @param {?} fileName - the file name
     * @return {?}
     */
    function (fileName) {
        if (!fileName) {
            return '';
        }
        if (fileName.indexOf('/') === 0) {
            return this.getAssetsPath() + fileName;
        }
        return this.getAssetsPath() + "/" + fileName;
    };
    /**
     * Build the file URL for the file server request
     * @param fileName - the given file name
     */
    /**
     * Build the file URL for the file server request
     * @param {?} fileName - the given file name
     * @return {?}
     */
    CoreService.prototype.getFileUrl = /**
     * Build the file URL for the file server request
     * @param {?} fileName - the given file name
     * @return {?}
     */
    function (fileName) {
        if (!fileName) {
            return '';
        }
        if (fileName.indexOf('/') === 0) {
            return this.getFileServerPath() + fileName;
        }
        return this.getFileServerPath() + "/" + fileName;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    CoreService.prototype.getSsoRedirect = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return iNet.getPUrl('ssorequest/redirect') + '?' + $.param(data);
    };
    /**
     * @return {?}
     */
    CoreService.prototype.convergePlugins = /**
     * @return {?}
     */
    function () {
        return this.convergeSearch({ converge: 'plugins' });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    CoreService.prototype.convergeSearch = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return this.http.postJSON(iNet.getPUrl('converge/search'), params);
    };
    /**
     * @param {?=} v
     * @return {?}
     */
    CoreService.prototype.setEnvironment = /**
     * @param {?=} v
     * @return {?}
     */
    function (v) {
        if (v === void 0) { v = { production: false }; }
        CoreService.environment = v;
    };
    /**
     * @return {?}
     */
    CoreService.prototype.getEnvironment = /**
     * @return {?}
     */
    function () {
        return CoreService.environment;
    };
    /**
     * @private
     * @param {?=} path
     * @return {?}
     */
    CoreService.prototype.getPath = /**
     * @private
     * @param {?=} path
     * @return {?}
     */
    function (path) {
        if (path === void 0) { path = ''; }
        /** @type {?} */
        var lastIndex = path.lastIndexOf('/');
        if (lastIndex === path.length - 1) {
            return path.substring(0, lastIndex);
        }
        return path;
    };
    /**
     * Gets File server path
     */
    /**
     * Gets File server path
     * @return {?}
     */
    CoreService.prototype.getFileServerPath = /**
     * Gets File server path
     * @return {?}
     */
    function () {
        return this.getPath(iNet.fileServer);
    };
    /**
     * Gets assets path of current app
     */
    /**
     * Gets assets path of current app
     * @return {?}
     */
    CoreService.prototype.getAssetsPath = /**
     * Gets assets path of current app
     * @return {?}
     */
    function () {
        return this.getPath(iNet.imgFolder);
    };
    CoreService.instance = null; // Create a singleton service
    // Create a singleton service
    CoreService.environment = { production: false };
    CoreService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CoreService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return CoreService;
}());
export { CoreService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2NvcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQWEsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBS3JEO0lBT0kscUJBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZDLE9BQU8sV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsNEJBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ2hGLFVBQUMsSUFBZ0I7O2dCQUNQLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU07OztZQUFFO2dCQUM1QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxFQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7O1FBQUUsVUFBQyxHQUFzQjtRQUMxQixDQUFDLEVBQ0os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QixJQUFJLENBQUMsQ0FBRSw2QkFBNkI7O0lBQ3BELHVCQUFXLEdBQUcsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUM7O2dCQUhwRCxVQUFVOzs7O2dCQU5ILGlCQUFpQjs7SUFzS3pCLGtCQUFDO0NBQUEsQUFoS0QsSUFnS0M7U0EvSlksV0FBVzs7O0lBQ3BCLHFCQUFvQzs7Ozs7SUFDcEMsd0JBQWlEOzs7OztJQUNqRCxnQ0FBc0M7Ozs7O0lBQ3RDLG1DQUFpQzs7Ozs7SUFFckIsMkJBQStCOzs7OztBQTJKL0MsZ0NBRUM7OztJQURHLDBCQUFhOzs7OztBQUdqQiw2QkFFQzs7O0lBREcsa0NBQWdCOzs7OztBQUdwQixxQ0FJQzs7O0lBSEcsOEJBQVk7O0lBQ1osc0NBQW9COztJQUNwQixtQ0FBbUI7Ozs7O0FBR3ZCLHNDQUtDOzs7SUFKRyxnQ0FBYTs7SUFDYix1Q0FBb0I7O0lBQ3BCLG1DQUFpQjs7SUFDakIsc0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cEVycm9yUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSAnLi9odHRwLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7bWFwLCBzaGFyZVJlcGxheSwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvcmVTZXJ2aWNlIHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IENvcmVTZXJ2aWNlID0gbnVsbDsgIC8vIENyZWF0ZSBhIHNpbmdsZXRvbiBzZXJ2aWNlXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnQgPSB7cHJvZHVjdGlvbjogZmFsc2V9O1xuICAgIHByaXZhdGUgJGFwcENhY2hlOiBPYnNlcnZhYmxlPE9iamVjdD47XG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvbnM6IEFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBDb3JlU2VydmljZS5pbnN0YW5jZSA9IENvcmVTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLmh0dHAucG9zdChpTmV0LmdldFBVcmwoJ3N5c3RlbS9sb2dvdXQnKSwgeyd1c2VybmFtZSc6IGlOZXQudXNlcm5hbWV9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YTogTG9nb3V0RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlGcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgIGlGcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGRhdGEudXVpZCk7XG4gICAgICAgICAgICAgICAgaUZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaUZyYW1lKTtcbiAgICAgICAgICAgIH0sIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEdldHMgdGhlIGF2YXRhciBVUkwgd2l0aCB0aGUgdXNlcm5hbWVcbiAgICAqIEBkZXByZWNhdGVkIFVzZSBVc2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVXJsQnlVc2VybmFtZSgpIGluc3RlYWRcbiAgICAqL1xuICAgIGdldEF2YXRhcih1c2VyY29kZTogc3RyaW5nLCB0aHVtYm5haWw/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgNTA7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9waG90bycpICtcbiAgICAgICAgICAgIGA/dXNlcmNvZGU9JHt1c2VyY29kZX0mdGh1bWJuYWlsPSR7dGh1bWJuYWlsfWA7XG4gICAgfVxuXG4gICAgaXNFeHRlcm5hbFVzZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoaU5ldC5leHRlcm5hbFVzZXIgPT0gJ3RydWUnKTtcbiAgICB9XG5cbiAgICBpc0NvbW11bml0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzRXh0ZXJuYWxVc2VyKCkgfHwgaU5ldC5maXJtUHJlZml4ID09ICdzbWFydGNsb3VkJyB8fCBpTmV0LmZpcm1QcmVmaXggPT0gJ2NvbW11bml0eScpO1xuICAgIH1cblxuICAgIGdldE9yZygpOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChpTmV0LmdldFBVcmwoJ3BsdWdpbi9vcmdhbml6YXRpb24vbGlzdCcpKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEN1c3RvbVJlc3BvbnNlKSA9PiByZXMuZWxlbWVudHMpKTtcbiAgICB9XG5cbiAgICBzZWFyY2hPcmdhbihwYXJhbXM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ3BsdWdpbi9vcmdhbml6YXRpb24vc2VhcmNoJyksIHBhcmFtcylcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBDdXN0b21SZXNwb25zZSkgPT4gcmVzLmVsZW1lbnRzKSk7XG4gICAgfVxuXG4gICAgZ2V0U3lzdGVtQXBwbGljYXRpb24oKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgaWYgKHRoaXMuYXBwbGljYXRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5hcHBsaWNhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy4kYXBwQ2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGFwcENhY2hlID0gdGhpcy5odHRwLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnc3lzdGVtL2FwcGxpY2F0aW9uL2xpc3QnKSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YXAoKHJlczogQ3VzdG9tUmVzcG9uc2UpID0+IHRoaXMuYXBwbGljYXRpb25zID0gcmVzLmVsZW1lbnRzKSlcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKHJlczogQ3VzdG9tUmVzcG9uc2UpID0+IHJlcy5lbGVtZW50cykpXG4gICAgICAgICAgICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRhcHBDYWNoZTtcbiAgICB9XG5cbiAgICBzZWFyY2hGaXJtQWNjb3VudChwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmh0dHAucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdwbHVnaW4vZmlybWFjY291bnQvbGlzdCcpLCBwYXJhbXMpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlTGFuZ3VhZ2UobGFuZzogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9sYW5ndWFnZXVwZGF0ZScpLCB7aW50bDogbGFuZ30pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGxhbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobGFuZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSW1hZ2UgVVJMIGZvciB0aGUgY3VycmVudCBhcHBcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUgLSB0aGUgZmlsZSBuYW1lXG4gICAgICovXG4gICAgZ2V0SW1hZ2VVcmwoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghZmlsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsZU5hbWUuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBc3NldHNQYXRoKCkgKyBmaWxlTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRBc3NldHNQYXRoKCl9LyR7ZmlsZU5hbWV9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgZmlsZSBVUkwgZm9yIHRoZSBmaWxlIHNlcnZlciByZXF1ZXN0XG4gICAgICogQHBhcmFtIGZpbGVOYW1lIC0gdGhlIGdpdmVuIGZpbGUgbmFtZVxuICAgICAqL1xuICAgIGdldEZpbGVVcmwoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghZmlsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsZU5hbWUuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlU2VydmVyUGF0aCgpICsgZmlsZU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0RmlsZVNlcnZlclBhdGgoKX0vJHtmaWxlTmFtZX1gO1xuICAgIH1cblxuICAgIGdldFNzb1JlZGlyZWN0KGRhdGE6IFNzb1JlZGlyZWN0RGF0YSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3Nzb3JlcXVlc3QvcmVkaXJlY3QnKSArICc/JyArICQucGFyYW0oZGF0YSk7XG4gICAgfVxuXG4gICAgY29udmVyZ2VQbHVnaW5zKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcmdlU2VhcmNoKHtjb252ZXJnZTogJ3BsdWdpbnMnfSk7XG4gICAgfVxuXG4gICAgY29udmVyZ2VTZWFyY2gocGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ2NvbnZlcmdlL3NlYXJjaCcpLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHNldEVudmlyb25tZW50KHY6IGFueSA9IHtwcm9kdWN0aW9uOiBmYWxzZX0pIHtcbiAgICAgICAgQ29yZVNlcnZpY2UuZW52aXJvbm1lbnQgPSB2O1xuICAgIH1cblxuICAgIGdldEVudmlyb25tZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiBDb3JlU2VydmljZS5lbnZpcm9ubWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhdGgocGF0aDogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgICAgIGlmIChsYXN0SW5kZXggPT09IHBhdGgubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyaW5nKDAsIGxhc3RJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBGaWxlIHNlcnZlciBwYXRoXG4gICAgICovXG4gICAgZ2V0RmlsZVNlcnZlclBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF0aChpTmV0LmZpbGVTZXJ2ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYXNzZXRzIHBhdGggb2YgY3VycmVudCBhcHBcbiAgICAgKi9cbiAgICBnZXRBc3NldHNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhdGgoaU5ldC5pbWdGb2xkZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dvdXREYXRhIHtcbiAgICB1dWlkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBDdXN0b21SZXNwb25zZSBleHRlbmRzIFJlc3BvbnNlIHtcbiAgICBlbGVtZW50czogYW55W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3NvUmVkaXJlY3REYXRhIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBhcHBsaWNhdGlvbjogc3RyaW5nO1xuICAgIHJlZGlyZWN0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRoUmVkaXJlY3REYXRhIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgYXBwbGljYXRpb246IHN0cmluZztcbiAgICBvcmdhbklkPzogc3RyaW5nO1xuICAgIGZpcm1QcmVmaXg/OiBzdHJpbmc7XG59XG4iXX0=