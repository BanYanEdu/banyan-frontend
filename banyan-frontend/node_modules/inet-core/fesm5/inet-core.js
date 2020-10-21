import { Injectable, Directive, ElementRef, Input, TemplateRef, ViewContainerRef, Pipe, HostListener, NgModule, APP_INITIALIZER } from '@angular/core';
import { of, fromEvent, Observable, Subject } from 'rxjs';
import { __extends } from 'tslib';
import { HttpHeaders, HttpParams, HttpHandler, HttpClient, HttpClientModule } from '@angular/common/http';
import { map, tap, shareReplay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { CommonModule } from '@angular/common';
import * as EventBus from 'vertx3-eventbus-client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoadingIndicatorService = /** @class */ (function () {
    function LoadingIndicatorService() {
        // Create a singleton service
        this.elementId = 'loading-indicator';
        return LoadingIndicatorService.instance = LoadingIndicatorService.instance || this;
    }
    /**
     * @param {?} elementId
     * @return {?}
     */
    LoadingIndicatorService.prototype.setElementId = /**
     * @param {?} elementId
     * @return {?}
     */
    function (elementId) {
        this.elementId = elementId;
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.getElementId = /**
     * @return {?}
     */
    function () {
        return this.elementId;
    };
    /**
     * Get DOM of loading indicator
     */
    /**
     * Get DOM of loading indicator
     * @private
     * @return {?}
     */
    LoadingIndicatorService.prototype.getIndicator = /**
     * Get DOM of loading indicator
     * @private
     * @return {?}
     */
    function () {
        if (LoadingIndicatorService.loadingIndicator && LoadingIndicatorService.loadingIndicator.container) {
            return LoadingIndicatorService.loadingIndicator;
        }
        // If Loading indicator not exist
        /** @type {?} */
        var container = (/** @type {?} */ (document.getElementById(this.getElementId())));
        /** @type {?} */
        var loadingElement;
        /** @type {?} */
        var message;
        if (container) {
            /** @type {?} */
            var elements = container.getElementsByTagName('span');
            if (elements && elements.length > 0) {
                loadingElement = (/** @type {?} */ (container.getElementsByTagName('span')[0]));
                if (loadingElement && loadingElement.innerText) {
                    message = loadingElement.innerText;
                }
            }
        }
        // cache Loading indicator
        LoadingIndicatorService.loadingIndicator = new LoadingIndicator(container, loadingElement, message);
        return LoadingIndicatorService.loadingIndicator;
    };
    /**
     * @private
     * @return {?}
     */
    LoadingIndicatorService.prototype.getLoadingIndicator = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            setTimeout((/**
             * @return {?}
             */
            function () { return resolve(_this.getIndicator()); }));
        }));
    };
    /**
     * @param {?=} message
     * @return {?}
     */
    LoadingIndicatorService.prototype.showLoading = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        function (loadingIndicator) {
            if (loadingIndicator && loadingIndicator.container) {
                if (loadingIndicator.element) {
                    loadingIndicator.element.innerText = message || loadingIndicator.message || loadingIndicator.container.title;
                }
                loadingIndicator.container.style.display = 'block';
            }
        }));
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.hideLoading = /**
     * @return {?}
     */
    function () {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        function (loadingIndicator) {
            if (loadingIndicator && loadingIndicator.container) {
                loadingIndicator.container.style.display = 'none';
            }
        }));
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.complete = /**
     * @return {?}
     */
    function () {
        this.hideLoading();
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.complete();
    };
    LoadingIndicatorService.instance = null; // Create a singleton service
    LoadingIndicatorService.loadingIndicator = null;
    LoadingIndicatorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoadingIndicatorService.ctorParameters = function () { return []; };
    return LoadingIndicatorService;
}());
if (false) {
    /** @type {?} */
    LoadingIndicatorService.instance;
    /**
     * @type {?}
     * @private
     */
    LoadingIndicatorService.loadingIndicator;
    /** @type {?} */
    LoadingIndicatorService.prototype.elementId;
}
var LoadingIndicator = /** @class */ (function () {
    function LoadingIndicator(container, el, msg) {
        if (msg === void 0) { msg = ''; }
        this.container = container;
        this.element = el;
        this.message = msg;
    }
    return LoadingIndicator;
}());
if (false) {
    /** @type {?} */
    LoadingIndicator.prototype.container;
    /** @type {?} */
    LoadingIndicator.prototype.element;
    /** @type {?} */
    LoadingIndicator.prototype.message;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HttpUrlEncodingCodec = /** @class */ (function () {
    function HttpUrlEncodingCodec() {
    }
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeKey = /**
     * @param {?} k
     * @return {?}
     */
    function (k) { return standardEncoding(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) { return standardEncoding(v); };
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeKey = /**
     * @param {?} k
     * @return {?}
     */
    function (k) { return decodeURIComponent(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) { return decodeURIComponent(v); };
    return HttpUrlEncodingCodec;
}());
/**
 * @param {?} v
 * @return {?}
 */
function standardEncoding(v) {
    return encodeURIComponent(v);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HttpClientService = /** @class */ (function (_super) {
    __extends(HttpClientService, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
function LogoutData() { }
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
function SsoRedirectData() { }
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
function PathRedirectData() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
function SuggestionParamData() { }
if (false) {
    /** @type {?} */
    SuggestionParamData.prototype.content;
    /** @type {?} */
    SuggestionParamData.prototype.keyword;
}
/**
 * @record
 */
function SuggestionResponse() { }
if (false) {
    /** @type {?} */
    SuggestionResponse.prototype.items;
    /** @type {?} */
    SuggestionResponse.prototype.total;
}
/**
 * @record
 */
function SuggestionItem() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var ErrorMessage = {
    CLIENT: 'Client-side error occurred',
    SERVER: 'Server-side error occurred',
    TYPE: 'ERROR'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ScrollPosition() { }
if (false) {
    /** @type {?} */
    ScrollPosition.prototype.sH;
    /** @type {?} */
    ScrollPosition.prototype.sT;
    /** @type {?} */
    ScrollPosition.prototype.cH;
}
/** @type {?} */
var DEFAULT_SCROLL_POSITION = {
    sH: 0,
    sT: 0,
    cH: 0
};
var InfiniteScrollerDirective = /** @class */ (function () {
    function InfiniteScrollerDirective(elm) {
        var _this = this;
        this.elm = elm;
        this.scrollPercent = 70;
        this.isSubmit = false;
        this.isUserScrollingDown = (/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) {
            return positions[0].sT < positions[1].sT;
        });
        this.isScrollExpectedPercent = (/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            return ((position.sT + position.cH) / position.sH) > (_this.scrollPercent / 100);
        });
    }
    /**
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.registerScrollEvent();
        this.streamScrollEvents();
        this.requestCallbackOnScroll();
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.registerScrollEvent = /**
     * @private
     * @return {?}
     */
    function () {
        this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.streamScrollEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.userScrolledDown$ = this.scrollEvent$
            .map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return ({
            sH: e.target.scrollHeight,
            sT: e.target.scrollTop,
            cH: e.target.clientHeight
        }); }))
            .pairwise()
            .filter((/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) { return _this.isUserScrollingDown(positions) && _this.isScrollExpectedPercent(positions[1]); }));
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.requestCallbackOnScroll = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.requestOnScroll$ = this.userScrolledDown$;
        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
        }
        this.requestOnScroll$
            .exhaustMap((/**
         * @return {?}
         */
        function () {
            return _this.scrollCallback();
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { console.log(data); }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return console.log(err); }));
    };
    /**
     * @private
     * @return {?}
     */
    InfiniteScrollerDirective.prototype.isScrollSubmit = /**
     * @private
     * @return {?}
     */
    function () {
        return this.isSubmit;
    };
    ;
    InfiniteScrollerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appInfiniteScroller]'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    InfiniteScrollerDirective.propDecorators = {
        scrollCallback: [{ type: Input }],
        immediateCallback: [{ type: Input }],
        scrollPercent: [{ type: Input }],
        isSubmit: [{ type: Input }]
    };
    return InfiniteScrollerDirective;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.scrollEvent$;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.userScrolledDown$;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.requestOnScroll$;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.scrollCallback;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.immediateCallback;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.scrollPercent;
    /** @type {?} */
    InfiniteScrollerDirective.prototype.isSubmit;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.isUserScrollingDown;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.isScrollExpectedPercent;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollerDirective.prototype.elm;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NewPassword = /** @class */ (function () {
    function NewPassword() {
    }
    return NewPassword;
}());
if (false) {
    /** @type {?} */
    NewPassword.prototype.oldpass;
    /** @type {?} */
    NewPassword.prototype.newpass;
    /** @type {?} */
    NewPassword.prototype.confirmpass;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    NotificationService.prototype.showMessage = /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    function (msg, type, title, config) {
    };
    NotificationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return []; };
    return NotificationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Paging = /** @class */ (function () {
    function Paging() {
    }
    return Paging;
}());
if (false) {
    /** @type {?} */
    Paging.prototype.pageSize;
    /** @type {?} */
    Paging.prototype.pageNumber;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotifyParams = /** @class */ (function (_super) {
    __extends(NotifyParams, _super);
    function NotifyParams(pageNumber, pageSize, notifylist) {
        var _this = _super.call(this) || this;
        _this.pageNumber = pageNumber;
        _this.pageSize = pageSize;
        _this.notifylist = notifylist;
        return _this;
    }
    ;
    return NotifyParams;
}(Paging));
if (false) {
    /** @type {?} */
    NotifyParams.prototype.notifylist;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function WebResponse() { }
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse() {
    }
    return ErrorResponse;
}());
if (false) {
    /** @type {?} */
    ErrorResponse.prototype.errors;
    /** @type {?} */
    ErrorResponse.prototype.type;
}
var ResponseData = /** @class */ (function (_super) {
    __extends(ResponseData, _super);
    function ResponseData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResponseData;
}(ErrorResponse));
if (false) {
    /** @type {?} */
    ResponseData.prototype.total;
    /** @type {?} */
    ResponseData.prototype.items;
}
var ResponseElementsData = /** @class */ (function (_super) {
    __extends(ResponseElementsData, _super);
    function ResponseElementsData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResponseElementsData;
}(ErrorResponse));
if (false) {
    /** @type {?} */
    ResponseElementsData.prototype.elements;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SecurityService = /** @class */ (function () {
    function SecurityService(http) {
        this.http = http;
        this.roles = [];
        if (!SecurityService.instance) {
            this.roles = this.parserRoleFrom(iNet.permission || {});
        }
        return SecurityService.instance = SecurityService.instance || this;
    }
    /**
     * @return {?}
     */
    SecurityService.prototype.load = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve();
            }
            else {
                _this.http.postJSON(iNet.getPUrl('system/userrole/list'))
                    .subscribe((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) {
                    for (var key in obj) {
                        _this.append(obj[key]);
                    }
                    resolve(obj);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    resolve();
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    SecurityService.prototype.parserRoleFrom = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
        var roles = [];
        for (var key in obj) {
            if (obj[key] === "true" || obj[key] === true) {
                roles.push(key);
            }
        }
        return roles;
    };
    /**
     * @private
     * @param {?} arrArg
     * @return {?}
     */
    SecurityService.prototype.uniqueArray = /**
     * @private
     * @param {?} arrArg
     * @return {?}
     */
    function (arrArg) {
        return arrArg.filter((/**
         * @param {?} elem
         * @param {?} pos
         * @param {?} arr
         * @return {?}
         */
        function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        }));
    };
    ;
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    SecurityService.prototype.append = /**
     * @private
     * @param {?} v
     * @return {?}
     */
    function (v) {
        //console.log('[append]roles', v);
        this.roles = this.uniqueArray(this.roles.concat(v));
        return this.roles;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    SecurityService.prototype.hasRole = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var _this = this;
        //console.log('[checkRole]=', v);
        /** @type {?} */
        var roles = v.split(',');
        if (roles.length > 1) {
            /** @type {?} */
            var __items = roles.filter((/**
             * @param {?} role
             * @return {?}
             */
            function (role) { return _this.roles.indexOf(role) > -1; }));
            return (__items.length > 0);
        }
        return (this.roles.indexOf(v) > -1);
    };
    /**
     * Check session timeout when system is idle
     */
    /**
     * Check session timeout when system is idle
     * @return {?}
     */
    SecurityService.prototype.ping = /**
     * Check session timeout when system is idle
     * @return {?}
     */
    function () {
        if (iNet.isEmpty(iNet.username) || !iNet.enableLayout) {
            return;
        }
        /** @type {?} */
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.setAttribute("src", iNet.getPUrl('common/page/ping'));
        iframe.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var __loginUrl = 'cas/login';
            try {
                /** @type {?} */
                var __path = iframe.contentWindow.location.pathname || '';
                /** @type {?} */
                var __isLogin = (__loginUrl.match(__path) || []).length > 0;
                if (__isLogin) {
                    window.location.reload();
                }
            }
            catch (ex) {
                window.location.reload();
            }
            document.body.removeChild(iframe);
        });
        document.body.appendChild(iframe);
    };
    SecurityService.instance = null;
    SecurityService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SecurityService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return SecurityService;
}());
if (false) {
    /** @type {?} */
    SecurityService.instance;
    /**
     * @type {?}
     * @private
     */
    SecurityService.prototype.roles;
    /**
     * @type {?}
     * @private
     */
    SecurityService.prototype.http;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RoleAccessDirective = /** @class */ (function () {
    function RoleAccessDirective(templateRef, viewContainer, securityService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.securityService = securityService;
    }
    /**
     * @return {?}
     */
    RoleAccessDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.applyPermission();
    };
    /**
     * @private
     * @return {?}
     */
    RoleAccessDirective.prototype.applyPermission = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.securityService.hasRole(this.roleAccess)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    };
    RoleAccessDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[roleAccess]'
                },] }
    ];
    /** @nocollapse */
    RoleAccessDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: SecurityService }
    ]; };
    RoleAccessDirective.propDecorators = {
        roleAccess: [{ type: Input, args: ['roleAccess',] }]
    };
    return RoleAccessDirective;
}());
if (false) {
    /** @type {?} */
    RoleAccessDirective.prototype.roleAccess;
    /**
     * @type {?}
     * @private
     */
    RoleAccessDirective.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    RoleAccessDirective.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    RoleAccessDirective.prototype.securityService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SSOUrlPipe = /** @class */ (function () {
    function SSOUrlPipe() {
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SSOUrlPipe.prototype.transform = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return iNet.getSSOUrl(url);
    };
    SSOUrlPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'ssoUrl'
                },] }
    ];
    return SSOUrlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var AVATAR_VERSION_KEY = 'avatarVersion';
var UserProfileService = /** @class */ (function () {
    function UserProfileService(http, coreService) {
        this.http = http;
        this.coreService = coreService;
        this.profile = null;
        this.systemProfile = null;
        this.$profileObservableCache = {};
        this.inventory = {};
        this.url = {
            get: iNet.getPUrl('gl/contact/load'),
            view: iNet.getPUrl('system/userprofile/view'),
            update: iNet.getPUrl('system/userprofile/update'),
            change_password: iNet.getPUrl('system/account/passsword'),
            photo: iNet.getPUrl('system/userprofile/photo')
        };
        return UserProfileService.instance = UserProfileService.instance || this;
    }
    /*
    private loadProfile(): Observable<Object> {
        return this.http.postJSON(this.url.get)
            .map((res: UserProfile) => res)
            .do(profile => this.profile = profile);
    }
     */
    /*
        private loadProfile(): Observable<Object> {
            return this.http.postJSON(this.url.get)
                .map((res: UserProfile) => res)
                .do(profile => this.profile = profile);
        }
         */
    /**
     * @private
     * @return {?}
     */
    UserProfileService.prototype.loadSystemProfile = /*
        private loadProfile(): Observable<Object> {
            return this.http.postJSON(this.url.get)
                .map((res: UserProfile) => res)
                .do(profile => this.profile = profile);
        }
         */
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http.postJSON(this.url.view)
            .map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; }))
            .do((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            _this.systemProfile = profile;
            _this.profile = (/** @type {?} */ (profile.user));
        }));
    };
    /**
     * Gets the currently LDAP profile of user logged
     */
    /**
     * Gets the currently LDAP profile of user logged
     * @return {?}
     */
    UserProfileService.prototype.getSystemProfile = /**
     * Gets the currently LDAP profile of user logged
     * @return {?}
     */
    function () {
        if (this.systemProfile) {
            return Observable.of(this.systemProfile);
        }
        if (!this.$systemProfileCache) {
            this.$systemProfileCache = this.loadSystemProfile().pipe(shareReplay(1));
        }
        return this.$systemProfileCache;
    };
    /**
     * Gets the currently profile of user logged
     */
    /**
     * Gets the currently profile of user logged
     * @return {?}
     */
    UserProfileService.prototype.getProfile = /**
     * Gets the currently profile of user logged
     * @return {?}
     */
    function () {
        if (this.profile) {
            return Observable.of(this.profile);
        }
        /*
        if (!this.$cache) {
            this.$cache = this.loadProfile().pipe(shareReplay(1));
        }
        return this.$cache;
         */
        return this.getSystemProfile().map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.user; }));
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UserProfileService.prototype.update = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this.$cache = null;
        return this.http.postJSON(this.url.update, user);
    };
    /**
     * @param {?} password
     * @return {?}
     */
    UserProfileService.prototype.changePassword = /**
     * @param {?} password
     * @return {?}
     */
    function (password) {
        return this.http.postJSON(this.url.change_password, password);
    };
    /**
     * @param {?} userProfile
     * @return {?}
     */
    UserProfileService.prototype.getAvatarUrlByProfile = /**
     * @param {?} userProfile
     * @return {?}
     */
    function (userProfile) {
        /** @type {?} */
        var avatarUrl;
        avatarUrl = this.coreService.getFileUrl(userProfile.avatar);
        if (this.getAvatarVersion() > 0) {
            avatarUrl = avatarUrl + "?version=" + this.getAvatarVersion();
        }
        return avatarUrl;
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getAvatarUrl = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            resolve(_this.url.photo);
            /*
            this.getProfile().subscribe((obj: UserProfile) => {
                // resolve(this.getAvatarUrlByProfile(obj));
            }, (err: HttpErrorResponse) => {
                resolve();
            });

             */
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getFullName = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve(window['iNet'] ? iNet.displayName : '');
            }
            else {
                _this.getProfile().subscribe((/**
                 * @param {?} profile
                 * @return {?}
                 */
                function (profile) {
                    /** @type {?} */
                    var fullName = '';
                    if (profile.lastName) {
                        fullName += profile.lastName;
                    }
                    if (profile.middleName) {
                        fullName += ' ' + profile.middleName;
                    }
                    if (profile.firstName) {
                        fullName += ' ' + profile.firstName;
                    }
                    profile.name = fullName || iNet.displayName || iNet.username;
                    resolve(profile.name.trim());
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    resolve();
                }));
            }
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getSignPictureId = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.getSystemProfile().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var signPictureId = '';
                if (data.user && data.user.signPictureID) {
                    signPictureId = data.user.signPictureID;
                }
                resolve(signPictureId);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getSignVerifyNumber = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.getSystemProfile().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var signVerify = '';
                if (data.user && data.user.signVerify) {
                    signVerify = data.user.signVerify;
                }
                resolve(signVerify);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.increaseAvatarVersion = /**
     * @return {?}
     */
    function () {
        localStorage.setItem(AVATAR_VERSION_KEY, (this.getAvatarVersion() + 1).toString());
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getAvatarVersion = /**
     * @return {?}
     */
    function () {
        return Number(localStorage.getItem(AVATAR_VERSION_KEY));
    };
    /**
     * Returns the profile associated with the username.
     * @param username - {string} The username variable
     */
    /**
     * Returns the profile associated with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    UserProfileService.prototype.getProfileByUsername = /**
     * Returns the profile associated with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    function (username) {
        var _this = this;
        //console.log('[getProfileByUsername]--username, inventory', username, this.inventory);
        if (this.inventory.hasOwnProperty(username)) {
            return Observable.of(this.inventory[username]);
        }
        if (!this.$profileObservableCache[username]) {
            this.$profileObservableCache[username] = this.http.getJSON(this.url.get, { username: username })
                .do((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.inventory[username] = res; }))
                .pipe(shareReplay(1));
        }
        return this.$profileObservableCache[username];
    };
    /**
     * Returns the avatar URL  with the username.
     * @param username - {string} The username variable
     */
    /**
     * Returns the avatar URL  with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    UserProfileService.prototype.getAvatarUrlByUsername = /**
     * Returns the avatar URL  with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    function (username) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.getProfileByUsername(username).subscribe((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                if (obj.avatar) {
                    resolve(_this.coreService.getFileUrl(obj.avatar));
                }
                else {
                    resolve();
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getDefaultAvatarUrl = /**
     * @return {?}
     */
    function () {
        return UserProfileService.DEFAULT_AVATAR_URL;
    };
    UserProfileService.instance = null;
    UserProfileService.DEFAULT_AVATAR_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYHA//aAAgBAQAAAAD3kAkAgATAEiUoQQAmASmWs0WspmdHuIiEAmBKZnW8RhA3/RbWsICYJTafh5t8AGR6batUCYJm0zzvEgD0bZRWIgmEzaZclygA9B26K1QmJWtJyXKAD0fYkUiExM3kc1xgA9QyBWiJLWkaLhAB6bliK1iU2sHI8qAOq64KVFrSHJcoAOi7YK1gtcHOcUAOu6oIrWVrAxvPcIBmeh5IKVleQMTzICfSc4CtS8gfLy2Afb076AVqm0gPOtYDou2AVqm0gOU5IHYdNYCtU2kDWedwB3e9ArUvIVwOK1oDM7jY3CtS1jE5/nMUAH26Poc4rSVp1fOaP5gAC266LcRWfnzehwQAABlb7pPvweoAAAAZ3ceeUAAAANxqagAAAGfgwAAAAXoAAAAJAAAAB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8QAPRAAAQMCAQgGCAUDBQAAAAAAAQIDBAARBQYQEiAhMDFBE0BRkaGxIjJSYXGBwdEVI0JQUxQ0NURikuHw/9oACAEBAAE/AP2i1WNaJqx7KsatqW6lajZIuSAO01Ox+FBJSVdIockEH61KyuecJEdstj3kH6U5j2JrOyW4n4GhjeJj/Wvf8qj5Tz2SOkcLg5g2+1YdlFFnrDZSWnCbAKULGrVardRAoCsXxhrCmhfRW6r1UX8an4rKxB3TdWQLW0Ek27tYGxuONQcqpMRhLTjSXgm/pKUb99YRjjOKlSNENugX0NK9/CrVbfgUBUyU3CiqfcNkptUyU5MkrecNyom2zlfcwZa4UtD6DYpuOFNOB1pDg4KSCPnVqI3lqAoZssHijDWmgT+Y5t+W7wJ4v4U0o3uAB4DMRRG6FAUBnyyUbxk8rk+A3eTX+HR8foM5FEbkUBqZZJt/TK96vIbvBG+iwpkdqQfAahFEbdcUBq5ZIvBjr9ly3eN0eFQU6MCOB/Gny1TR1hQ1crbfgar8ekTbdGsMkIkYcwtB2BCQfjYapojVFDWyyfWVx2T6lyr4mw++7yOlKBfjG1iQodx+2sRmOcUNbLNFjFX71Dy3eSKScQWrkAL9x1jRzba50OFDWyxaKsNZc9hzb8xu8jGfyZLxG0qCQfl/3rGjx1Brz4SJ8Ncdw2Sq2217WNS8InQirpYzgQCbLAuO8bmDhcvEV6LDSikcV8h31AhIgREMNkkAC5PM2t9NY0aPHMONDcYo2lzC5IUL2aUR8bHcJFyB2msIjNRsLjBtASVNpUo22kkX+u4OccaG4lJ04jyPabUPClCyiNeIguTGUDipYHjUdBbjNIPFKAPDcHjR4ZudDc43hS8Mm6I0lMrF0LI49uvkvhS35SJzgIZbJ0Ts9JX/AI+G5NHMONDc5Q43AlRHYjWm45s0VgeiNoPbr4PlFh8aGxDWl1BTcaRSNEXJPbfnSFpcbStBulQBB7QdwaOYcaG4xzE04bBKtvSOApRbkbcaJubncZMYmmXCTFVfpWEgEnmL7O7ZuDRzc6GstxDSdJxaUDtUbVIxzDo4OlKbKhySb+VY1iy8VlBZSEtouEAH38dzhmIOYZMTIbAVsIKSdhFRsocOkJTeQhtZ/Sq/nTbzTwu04hY/2qB1jRzChqSsThQv7iS2g8NG9z3DbWIZXJFkwE343U4ny21MxCTPdLkhzSVa2wAb2NLehupdYXoqSbjZesPyucSrRnp0kW9ZtG2/faouMQJmxmSjS9lXonxzmjqCr2FzU3KGBBJQtaluckpTWIZVyZIKYoVHSeYIJ8tlOvOvrK3XFLUeJUbnqKFrbUFIUUqHAg2rD8p5sVQD61SG78FHb32qHlPAllKCVtOH9KhfxFBaVi6TcUc7zyGG1OOKCUpFySamZXhOkiKxfsUo/apeLTJiiVvKSCfVSogefV4uISoirtPKA9kqNqiZXqBCJTAIJ9ZJ4d9RJbUyOl5pQKVcr8KvWO4s5PlKaFgy2SkW57ePW8MxN3DZAcRZSTcFJ51+KRP5R4/aniS+4T7R650y6WbuKJ5k9c6VXZR2m/XOkV2+H73/AP/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8AYf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8AYf/Z';
    UserProfileService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UserProfileService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: CoreService }
    ]; };
    return UserProfileService;
}());
if (false) {
    /** @type {?} */
    UserProfileService.instance;
    /** @type {?} */
    UserProfileService.DEFAULT_AVATAR_URL;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.$cache;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.profile;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.$systemProfileCache;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.systemProfile;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.$profileObservableCache;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.inventory;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.coreService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserProfile = /** @class */ (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
if (false) {
    /** @type {?} */
    UserProfile.prototype.uuid;
    /** @type {?} */
    UserProfile.prototype.code;
    /** @type {?} */
    UserProfile.prototype.usercode;
    /** @type {?} */
    UserProfile.prototype.username;
    /** @type {?} */
    UserProfile.prototype.password;
    /** @type {?} */
    UserProfile.prototype.fname;
    /** @type {?} */
    UserProfile.prototype.mname;
    /** @type {?} */
    UserProfile.prototype.lname;
    /** @type {?} */
    UserProfile.prototype.firstName;
    /** @type {?} */
    UserProfile.prototype.lastName;
    /** @type {?} */
    UserProfile.prototype.middleName;
    /** @type {?} */
    UserProfile.prototype.name;
    /** @type {?} */
    UserProfile.prototype.email;
    /** @type {?} */
    UserProfile.prototype.mobile;
    /** @type {?} */
    UserProfile.prototype.phone;
    /** @type {?} */
    UserProfile.prototype.birthday;
    /** @type {?} */
    UserProfile.prototype.address;
    /** @type {?} */
    UserProfile.prototype.state;
    /** @type {?} */
    UserProfile.prototype.city;
    /** @type {?} */
    UserProfile.prototype.country;
    /** @type {?} */
    UserProfile.prototype.timezone;
    /** @type {?} */
    UserProfile.prototype.postalCode;
    /** @type {?} */
    UserProfile.prototype.language;
    /** @type {?} */
    UserProfile.prototype.department;
    /** @type {?} */
    UserProfile.prototype.position;
    /** @type {?} */
    UserProfile.prototype.emailToAccount;
    /** @type {?} */
    UserProfile.prototype.signPictureID;
    /** @type {?} */
    UserProfile.prototype.signVerify;
    /** @type {?} */
    UserProfile.prototype.secureTicket;
    /** @type {?} */
    UserProfile.prototype.attributes;
    /** @type {?} */
    UserProfile.prototype.avatar;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserResponseData = /** @class */ (function () {
    function UserResponseData() {
    }
    return UserResponseData;
}());
if (false) {
    /** @type {?} */
    UserResponseData.prototype.user;
    /** @type {?} */
    UserResponseData.prototype.attributes;
    /** @type {?} */
    UserResponseData.prototype.glcontactprofileload;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AccentService = /** @class */ (function () {
    function AccentService() {
        this._vi_accents = [
            "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă",
            "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề",
            "ế", "ệ", "ể", "ễ",
            "ì", "í", "ị", "ỉ", "ĩ",
            "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ",
            "ờ", "ớ", "ợ", "ở", "ỡ",
            "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ",
            "ỳ", "ý", "ỵ", "ỷ", "ỹ",
            "đ",
            "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă",
            "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
            "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
            "Ì", "Í", "Ị", "Ỉ", "Ĩ",
            "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ",
            "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
            "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ",
            "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
            "Đ"
        ];
        this._en_accents = [
            "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
            "a", "a", "a", "a", "a", "a",
            "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
            "i", "i", "i", "i", "i",
            "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
            "o", "o", "o", "o", "o",
            "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
            "y", "y", "y", "y", "y",
            "d",
            "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A",
            "A", "A", "A", "A", "A",
            "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
            "I", "I", "I", "I", "I",
            "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
            "O", "O", "O", "O", "O",
            "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U",
            "Y", "Y", "Y", "Y", "Y",
            "D"
        ];
    }
    /**
     * @param {?} str
     * @return {?}
     */
    AccentService.prototype.viToEn = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        var _this = this;
        return str.replace(/[^\u0000-\u007E]/g, (/**
         * @param {?} a
         * @return {?}
         */
        function (a) {
            /** @type {?} */
            var index = _this._vi_accents.indexOf(a);
            return index < 0 ? a : _this._en_accents[index];
        }));
    };
    AccentService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AccentService.ctorParameters = function () { return []; };
    return AccentService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AccentService.prototype._vi_accents;
    /**
     * @type {?}
     * @private
     */
    AccentService.prototype._en_accents;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CacheStorageService = /** @class */ (function () {
    function CacheStorageService() {
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
    CacheStorageService.prototype.promiseQueue = /**
     * @param {?} name
     * @param {?} promise
     * @param {?} resovle
     * @return {?}
     */
    function (name, promise, resovle) {
        if (this.__queue[name]) {
            this.__queue[name].push(resovle);
        }
        else {
            this.__queue[name] = [resovle];
            promise(name);
        }
    };
    /**
     * @param {?} name
     * @param {?} context
     * @param {?=} args
     * @return {?}
     */
    CacheStorageService.prototype.resolveQueue = /**
     * @param {?} name
     * @param {?} context
     * @param {?=} args
     * @return {?}
     */
    function (name, context, args) {
        if (this.__queue[name]) {
            this.__queue[name].forEach((/**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                try {
                    fn.apply(context, args);
                }
                catch (e) {
                }
            }));
            delete this.__queue[name];
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CacheStorageService.prototype.getData = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var data = this.__storage[key];
        // Check data expired
        if (data && new Date().getTime() - data.time <= data.timeCache) {
            return data.value;
        }
    };
    /**
     * @param {?} key
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    CacheStorageService.prototype.setData = /**
     * @param {?} key
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (key, data, options) {
        /** @type {?} */
        var timeCache = options && options.timeCache || this.timeCache;
        this.__storage[key] = (/** @type {?} */ ({
            time: new Date().getTime(),
            timeCache: timeCache,
            value: data
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CacheStorageService.prototype.removeData = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this.__storage[key];
    };
    /**
     * @return {?}
     */
    CacheStorageService.prototype.clearData = /**
     * @return {?}
     */
    function () {
        this.__storage = {};
    };
    CacheStorageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CacheStorageService.ctorParameters = function () { return []; };
    return CacheStorageService;
}());
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
function CacheStorageOptions() { }
if (false) {
    /** @type {?|undefined} */
    CacheStorageOptions.prototype.timeCache;
    /** @type {?|undefined} */
    CacheStorageOptions.prototype.resolveData;
}
/**
 * @record
 */
function CacheStorageItem() { }
if (false) {
    /** @type {?} */
    CacheStorageItem.prototype.time;
    /** @type {?} */
    CacheStorageItem.prototype.timeCache;
    /** @type {?} */
    CacheStorageItem.prototype.value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutoSizeDirective = /** @class */ (function () {
    function AutoSizeDirective(element) {
        this.element = element;
        this.el = element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }
    Object.defineProperty(AutoSizeDirective.prototype, "minHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._minHeight = val;
            this.updateMinHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoSizeDirective.prototype, "maxHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._maxHeight = val;
            this.updateMaxHeight();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.onResize = /**
     * @return {?}
     */
    function () {
        //Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this._clientWidth)
            return;
        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.onInput = /**
     * @return {?}
     */
    function () {
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // set element resize allowed manually by user
        /** @type {?} */
        var style = window.getComputedStyle(this.el, null);
        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        }
        else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        // run first adjust
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.adjust = /**
     * @return {?}
     */
    function () {
        // perform height adjustments after input changes, if height is different
        // if (this.el.style.height == this.element.nativeElement.scrollHeight + "px") return;
        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + "px";
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.updateMinHeight = /**
     * @return {?}
     */
    function () {
        // Set textarea min height if input defined
        this.el.style.minHeight = this._minHeight + 'px';
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.updateMaxHeight = /**
     * @return {?}
     */
    function () {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this._maxHeight + 'px';
    };
    AutoSizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'textarea[appAutoSize]',
                    exportAs: 'appAutoSize'
                },] }
    ];
    /** @nocollapse */
    AutoSizeDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AutoSizeDirective.propDecorators = {
        minHeight: [{ type: Input, args: ['minHeight',] }],
        maxHeight: [{ type: Input, args: ['maxHeight',] }],
        onResize: [{ type: HostListener, args: ['window:resize',] }],
        onInput: [{ type: HostListener, args: ['input',] }]
    };
    return AutoSizeDirective;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._minHeight;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._maxHeight;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._lastHeight;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._clientWidth;
    /** @type {?} */
    AutoSizeDirective.prototype.element;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AvatarDirective = /** @class */ (function () {
    function AvatarDirective(_el) {
        this._el = _el;
        this.usercode = iNet.username;
    }
    /**
     * @return {?}
     */
    AvatarDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._el.nativeElement.addEventListener('error', this._loadAvatarError.bind(this));
        this._setAvatar();
    };
    /**
     * @return {?}
     */
    AvatarDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._setAvatar();
    };
    /**
     * @private
     * @return {?}
     */
    AvatarDirective.prototype._setAvatar = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.usercode) {
            this._loadAvatarError();
            return;
        }
        this._el.nativeElement.src = iNet.getUrl('system/userprofile/photo') + '?usercode=' + encodeURIComponent(this.usercode);
    };
    /**
     * @private
     * @return {?}
     */
    AvatarDirective.prototype._loadAvatarError = /**
     * @private
     * @return {?}
     */
    function () {
        this._el.nativeElement.src = UserProfileService.DEFAULT_AVATAR_URL;
    };
    AvatarDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'img[userAvatar]'
                },] }
    ];
    /** @nocollapse */
    AvatarDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AvatarDirective.propDecorators = {
        usercode: [{ type: Input }]
    };
    return AvatarDirective;
}());
if (false) {
    /** @type {?} */
    AvatarDirective.prototype.usercode;
    /**
     * @type {?}
     * @private
     */
    AvatarDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ResourceLoaderService = /** @class */ (function () {
    function ResourceLoaderService() {
        this._loaded = [];
        this._version = '';
        // this._initScriptVersion();
    }
    /**
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype.load = /**
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    function (resources, callback) {
        if (resources.length < 1) {
            return callback();
        }
        this._loadResources(resources, callback);
    };
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype.loadJS = /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    function (url, callback) {
        this._loadWithTagName('script', {
            type: 'text/javascript',
            src: this.getFullUrlJS(url)
        }, callback);
    };
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype.loadCSS = /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    function (url, callback) {
        this._loadWithTagName('link', {
            type: 'text/css',
            rel: 'stylesheet',
            href: url
        }, callback);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ResourceLoaderService.prototype.getFullUrlJS = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.indexOf('//') < 0 && iNet.fileServer) {
            if (url.startsWith('/')) {
                url = url.substr(1, url.length);
            }
            return iNet.fileServer + url;
        }
        return url;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ResourceLoaderService.prototype.isLoaded = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this._loaded.indexOf(url) > -1;
    };
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype._loadResources = /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    function (resources, callback) {
        var _this = this;
        /** @type {?} */
        var splitGroups = this._groupResources(resources);
        /** @type {?} */
        var fn = (/**
         * @return {?}
         */
        function () {
            if (splitGroups.length < 1) {
                return callback();
            }
            _this._loadGroups(splitGroups.splice(0, 1)[0], fn);
        });
        fn();
    };
    //  Split group resources by sync/async
    //  Split group resources by sync/async
    /**
     * @private
     * @param {?} resources
     * @return {?}
     */
    ResourceLoaderService.prototype._groupResources = 
    //  Split group resources by sync/async
    /**
     * @private
     * @param {?} resources
     * @return {?}
     */
    function (resources) {
        /** @type {?} */
        var splitGroups = [];
        /** @type {?} */
        var groups;
        //  Split group resources by sync/async
        for (var i = 0; i < resources.length; i++) {
            if (!groups) {
                groups = [];
                splitGroups.push(groups);
            }
            groups.push(resources[i]);
            if (resources[i].sync) {
                groups = null;
            }
        }
        return splitGroups;
    };
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype._loadGroups = /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    function (resources, callback) {
        var _this = this;
        /** @type {?} */
        var promises = [];
        resources.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return promises.push(_this._load(item)); }));
        Promise.all(promises).then((/**
         * @return {?}
         */
        function () {
            callback();
        }));
    };
    /**
     * @private
     * @param {?} resource
     * @return {?}
     */
    ResourceLoaderService.prototype._load = /**
     * @private
     * @param {?} resource
     * @return {?}
     */
    function (resource) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (resource.type === 'css') {
                _this.loadCSS(resource.url, resolve);
            }
            else {
                _this.loadJS(resource.url, resolve);
            }
        }));
    };
    /**
     * @private
     * @param {?} tagName
     * @param {?} properties
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype._loadWithTagName = /**
     * @private
     * @param {?} tagName
     * @param {?} properties
     * @param {?} callback
     * @return {?}
     */
    function (tagName, properties, callback) {
        var _this = this;
        /** @type {?} */
        var url = properties.src || properties.href;
        // Loaded
        if (this.isLoaded(url)) {
            return callback();
        }
        /** @type {?} */
        var tagEl = document.createElement(tagName);
        for (var k in properties) {
            tagEl[k] = properties[k];
        }
        tagEl.onload = (/**
         * @return {?}
         */
        function () {
            _this._loaded.push(url);
            callback();
        });
        tagEl.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            console.warn("Load resource error: " + url);
            console.warn(e);
            _this._loaded.push(url);
            callback();
        });
        document.head.appendChild(tagEl);
    };
    /**
     * @private
     * @return {?}
     */
    ResourceLoaderService.prototype._initScriptVersion = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var $script = $('script');
        for (var i = 0; i < $script.length; i++) {
            /** @type {?} */
            var src = $script[i]['src'];
            /** @type {?} */
            var index = src.indexOf('?version=');
            if (index > -1) {
                this._version = src.substr(index + 1, src.length);
                break;
            }
        }
    };
    ResourceLoaderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ResourceLoaderService.ctorParameters = function () { return []; };
    return ResourceLoaderService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    ResourceLoaderService.prototype._loaded;
    /**
     * @type {?}
     * @private
     */
    ResourceLoaderService.prototype._version;
}
/**
 * @record
 */
function Resource() { }
if (false) {
    /** @type {?} */
    Resource.prototype.url;
    /** @type {?|undefined} */
    Resource.prototype.sync;
    /** @type {?|undefined} */
    Resource.prototype.loaded;
    /** @type {?|undefined} */
    Resource.prototype.type;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} config
 * @return {?}
 */
function initApp(config) {
    return (/**
     * @return {?}
     */
    function () {
        return config.load();
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    declarations: [
                        RoleAccessDirective,
                        InfiniteScrollerDirective,
                        AutoSizeDirective,
                        AvatarDirective,
                        SSOUrlPipe
                    ],
                    exports: [
                        RoleAccessDirective,
                        InfiniteScrollerDirective,
                        AutoSizeDirective,
                        AvatarDirective,
                        SSOUrlPipe
                    ],
                    providers: [
                        CoreService,
                        HttpClientService,
                        NotificationService,
                        AccentService,
                        UserProfileService,
                        CacheStorageService,
                        ResourceLoaderService,
                        {
                            'provide': APP_INITIALIZER,
                            'useFactory': initApp,
                            'multi': true,
                            'deps': [SecurityService]
                        },
                        SecurityService,
                        LoadingIndicatorService
                    ]
                },] }
    ];
    return CoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
WebSocketAbstract = /** @class */ (function () {
    function WebSocketAbstract(options, username) {
        // receive message from socket server
        this.onMessage = new Subject();
        this.onStateChange = new Subject();
        this.connect(options, username);
    }
    // update readyState
    // update readyState
    /**
     * @return {?}
     */
    WebSocketAbstract.prototype.stateChange = 
    // update readyState
    /**
     * @return {?}
     */
    function () {
        this.onStateChange.next(this.readyState);
    };
    return WebSocketAbstract;
}());
if (false) {
    /** @type {?} */
    WebSocketAbstract.prototype.onMessage;
    /** @type {?} */
    WebSocketAbstract.prototype.onStateChange;
    /** @type {?} */
    WebSocketAbstract.prototype.readyState;
    /**
     * @abstract
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    WebSocketAbstract.prototype.connect = function (options, username) { };
    /**
     * @abstract
     * @return {?}
     */
    WebSocketAbstract.prototype.close = function () { };
    /**
     * @abstract
     * @param {?} envelop
     * @return {?}
     */
    WebSocketAbstract.prototype.send = function (envelop) { };
}
/** @enum {string} */
var WebSocketType = {
    // send to the first address
    SEND: 'send',
    // publish to the all address
    PUBLISH: 'publish',
};
var WebSocketEnvelop = /** @class */ (function () {
    function WebSocketEnvelop() {
        this.type = WebSocketType.PUBLISH;
    }
    return WebSocketEnvelop;
}());
if (false) {
    /** @type {?} */
    WebSocketEnvelop.prototype.type;
    /** @type {?} */
    WebSocketEnvelop.prototype.address;
    /** @type {?} */
    WebSocketEnvelop.prototype.body;
}
var EnvelopBody = /** @class */ (function () {
    function EnvelopBody() {
    }
    return EnvelopBody;
}());
if (false) {
    /** @type {?} */
    EnvelopBody.prototype.uuid;
    /** @type {?} */
    EnvelopBody.prototype.application;
    /** @type {?} */
    EnvelopBody.prototype.message;
    /** @type {?} */
    EnvelopBody.prototype.sender;
    /** @type {?} */
    EnvelopBody.prototype.alias;
    /** @type {?} */
    EnvelopBody.prototype.sent;
}
var EnvelopMessage = /** @class */ (function () {
    // , joins?: string, duration?: string
    function EnvelopMessage(sender, content, joins, duration) {
        this.content = this.alert = content;
        this.sender = sender;
        if (!!joins) {
            this.joins = joins || sender;
        }
        this.duration = duration || "0";
    }
    return EnvelopMessage;
}());
if (false) {
    /** @type {?} */
    EnvelopMessage.prototype.sender;
    /** @type {?} */
    EnvelopMessage.prototype.alert;
    /** @type {?} */
    EnvelopMessage.prototype.content;
    /** @type {?} */
    EnvelopMessage.prototype.joins;
    /** @type {?} */
    EnvelopMessage.prototype.duration;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebSocketJboss = /** @class */ (function (_super) {
    __extends(WebSocketJboss, _super);
    function WebSocketJboss() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebSocketJboss.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._socket ? this._socket.readyState : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WebSocketJboss.prototype.stateChange = /**
     * @return {?}
     */
    function () {
        if (this.readyState === WebSocket.OPEN) {
            this._ping();
        }
        _super.prototype.stateChange.call(this);
    };
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    WebSocketJboss.prototype.connect = /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    function (options, username) {
        var _this = this;
        this._socket = new WebSocket(options);
        this._socket.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // const envelop: WebSocketEnvelop = JSON.parse(event.data);
            // if (envelop.body) {
            //     this.onMessage.next(envelop.body);
            // }
            /** @type {?} */
            var envelopBody = JSON.parse(event.data);
            if (envelopBody.sender) {
                _this.onMessage.next(envelopBody);
            }
        });
        this._socket.onopen = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
        this._socket.onerror = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
        this._socket.onclose = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
    };
    /**
     * @return {?}
     */
    WebSocketJboss.prototype.close = /**
     * @return {?}
     */
    function () {
        this._socket.close();
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    WebSocketJboss.prototype.send = /**
     * @param {?} envelop
     * @return {?}
     */
    function (envelop) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            try {
                _this._socket.send(JSON.stringify(envelop));
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketJboss.prototype._ping = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify({ type: 'ping' }));
            setTimeout((/**
             * @return {?}
             */
            function () { return _this._ping(); }), 10000);
        }
    };
    return WebSocketJboss;
}(WebSocketAbstract));
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebSocketJboss.prototype._socket;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebSocketVertx = /** @class */ (function (_super) {
    __extends(WebSocketVertx, _super);
    function WebSocketVertx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebSocketVertx.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._eventbus ? this._eventbus.state : null;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    WebSocketVertx.prototype.connect = /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    function (options, username) {
        if (options && options.length === 2) {
            /** @type {?} */
            var url = options[0];
            /** @type {?} */
            var headers = {
                keyapi: options[1]
            };
            this._connect(url, headers, username);
        }
    };
    /**
     * @private
     * @param {?} url
     * @param {?} headers
     * @param {?} username
     * @return {?}
     */
    WebSocketVertx.prototype._connect = /**
     * @private
     * @param {?} url
     * @param {?} headers
     * @param {?} username
     * @return {?}
     */
    function (url, headers, username) {
        var _this = this;
        this._eventbus = new EventBus(url, {
            transports: 'websocket'
        });
        this._eventbus.onopen = (/**
         * @return {?}
         */
        function () {
            // Channel receive chat message
            _this._eventbus.registerHandler(username, headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            function (err, msg) {
                if (msg) {
                    _this.onMessage.next(msg.body);
                }
            }));
            // Channel receive online message
            // this._eventbus.registerHandler('news-feed', headers, (err: any, msg: any) => {
            //     if (msg) {
            //         this.onMessage.next(msg);
            //     }
            // });
            _this.stateChange();
        });
        this._eventbus.onclose = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
        this._eventbus.onerror = (/**
         * @return {?}
         */
        function () { return _this.stateChange(); });
    };
    /**
     * @return {?}
     */
    WebSocketVertx.prototype.close = /**
     * @return {?}
     */
    function () {
        this._eventbus.close();
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    WebSocketVertx.prototype.send = /**
     * @param {?} envelop
     * @return {?}
     */
    function (envelop) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            try {
                _this._eventbus.publish(envelop.address, envelop.body);
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    };
    return WebSocketVertx;
}(WebSocketAbstract));
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebSocketVertx.prototype._eventbus;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient() {
        var _this = this;
        // message from socket server
        this.onMessage = new Subject();
        // socket state change
        this.onStateChange = new Subject();
        // envelop send will be timeout after 30s
        this.sendTimeout = 30000;
        this._autoconnectAfter = 5000; // 5s
        // 5s
        this._autoconnectRepeat = 4; // 5 times
        // 5 times
        this._autoconnectRetryAfter = 30000; // 30s
        this._envelopQueue = [];
        if (!WebSocketClient.instance) {
            this._getAccountInfo((/**
             * @return {?}
             */
            function () { return _this._register(); }));
        }
        return WebSocketClient.instance = WebSocketClient.instance || this;
    }
    Object.defineProperty(WebSocketClient.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.socket ? this.socket.readyState : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.CONNECTING || this.readyState === null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.OPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "closing", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.CLOSING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "closed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readyState === WebSocket.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "autoconnect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoconnect;
        },
        enumerable: true,
        configurable: true
    });
    // close websocket client
    // close websocket client
    /**
     * @return {?}
     */
    WebSocketClient.prototype.close = 
    // close websocket client
    /**
     * @return {?}
     */
    function () {
        this.socket.close();
    };
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @return {?}
     */
    WebSocketClient.prototype.send = /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @return {?}
     */
    function (address, message, application) {
        if (application === void 0) { application = ''; }
        return this.sendEnvelop(this.buildEnvelop(address, message, application));
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    WebSocketClient.prototype.sendEnvelop = /**
     * @param {?} envelop
     * @return {?}
     */
    function (envelop) {
        var _this = this;
        if (this.connected) {
            return this.socket.send(envelop);
        }
        else {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                // Add to queue and waiting socket connected to send
                /** @type {?} */
                var data = {
                    e: envelop,
                    f: resolve
                };
                data.timer = setTimeout((/**
                 * @return {?}
                 */
                function () { return _this._completeEnvelopQueue(data, false); }), _this.sendTimeout);
                _this._envelopQueue.push(data);
            }));
        }
    };
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @param {?=} join
     * @return {?}
     */
    WebSocketClient.prototype.buildEnvelop = /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @param {?=} join
     * @return {?}
     */
    function (address, message, application, join) {
        if (application === void 0) { application = ''; }
        /** @type {?} */
        var envelop = new WebSocketEnvelop();
        envelop.address = address;
        envelop.body = new EnvelopBody();
        envelop.body.application = application;
        envelop.body.sender = this._username;
        envelop.body.alias = [address];
        envelop.body.message = new EnvelopMessage(this._username, message, join || '');
        return envelop;
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._sendEnvelopQueue = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._envelopQueue.forEach((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.sendEnvelop(data.e).then((/**
             * @param {?} status
             * @return {?}
             */
            function (status) { return _this._completeEnvelopQueue(data, status); }));
        }));
    };
    /**
     * @private
     * @param {?} data
     * @param {?} status
     * @return {?}
     */
    WebSocketClient.prototype._completeEnvelopQueue = /**
     * @private
     * @param {?} data
     * @param {?} status
     * @return {?}
     */
    function (data, status) {
        /** @type {?} */
        var index = this._envelopQueue.indexOf(data);
        if (index >= 0) {
            this._envelopQueue.splice(index, 1);
        }
        data.f(status);
    };
    /**
     * @private
     * @param {?=} callback
     * @return {?}
     */
    WebSocketClient.prototype._register = /**
     * @private
     * @param {?=} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        $.ajax({
            url: iNet.getPUrl('account/register'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (typeof data === 'string') {
                    _this.socket = new WebSocketJboss(data, _this._username);
                }
                else {
                    _this.socket = new WebSocketVertx(data, _this._username);
                }
                _this.socket.onStateChange.subscribe((/**
                 * @return {?}
                 */
                function () { return _this._stateChange(); }));
                _this.socket.onMessage.subscribe((/**
                 * @param {?} body
                 * @return {?}
                 */
                function (body) {
                    _this.onMessage.next(body);
                }));
                callback && callback();
            }),
            error: (/**
             * @return {?}
             */
            function () {
                callback && callback();
                throw new Error("Account register error");
            })
        });
    };
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    WebSocketClient.prototype._getAccountInfo = /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        if (this._username) {
            return callback(this._username);
        }
        $.ajax({
            url: iNet.getPUrl('system/userprofile/view'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this._username = data && data.user && (data.user.usercode || data.user.username) || '';
                callback(_this._username);
            }),
            error: (/**
             * @return {?}
             */
            function () { return callback(null); })
        });
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._stateChange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.closed && !this.autoconnect) {
            this._runAutoConnect();
        }
        if (this._autoconnect) {
            return;
        }
        if (this.connected) {
            this._sendEnvelopQueue();
        }
        this._cancelAutoConnect();
        this.onStateChange.next();
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._runAutoConnect = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._autoconnect = true;
        this._autoconectTimer = setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.connected) {
                _this._cancelAutoConnect();
                return;
            }
            if (_this._autoconectCount >= _this._autoconnectRepeat) {
                _this._cancelAutoConnect();
                // Sleep and retry connect after 30s
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this._runAutoConnect(); }), _this._autoconnectRetryAfter);
                return;
            }
            _this._register((/**
             * @return {?}
             */
            function () {
                _this._autoconectCount++;
                if (!_this.connected) {
                    _this._runAutoConnect();
                }
            }));
        }), this._autoconnectAfter);
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketClient.prototype._cancelAutoConnect = /**
     * @private
     * @return {?}
     */
    function () {
        this._autoconnect = false;
        this._autoconectCount = 0;
        clearTimeout(this._autoconectTimer);
    };
    WebSocketClient.instance = null;
    return WebSocketClient;
}());
if (false) {
    /** @type {?} */
    WebSocketClient.instance;
    /** @type {?} */
    WebSocketClient.prototype.socket;
    /** @type {?} */
    WebSocketClient.prototype.onMessage;
    /** @type {?} */
    WebSocketClient.prototype.onStateChange;
    /** @type {?} */
    WebSocketClient.prototype.sendTimeout;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._username;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnect;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnectAfter;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnectRepeat;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconnectRetryAfter;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconectCount;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._autoconectTimer;
    /**
     * @type {?}
     * @private
     */
    WebSocketClient.prototype._envelopQueue;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebSocketClientService = /** @class */ (function (_super) {
    __extends(WebSocketClientService, _super);
    function WebSocketClientService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebSocketClientService.decorators = [
        { type: Injectable }
    ];
    return WebSocketClientService;
}(WebSocketClient));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HtmlUtils = /** @class */ (function () {
    function HtmlUtils() {
    }
    // Escape html to display
    // Escape html to display
    /**
     * @param {?} html
     * @return {?}
     */
    HtmlUtils.formatHtmlDisplay = 
    // Escape html to display
    /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        return html.replace(HtmlUtils.formatPattern, '<br>');
    };
    HtmlUtils.formatPattern = new RegExp('(\\n)|(\\\\n)|(\\\\\\\\n)|↵', 'g');
    return HtmlUtils;
}());
if (false) {
    /** @type {?} */
    HtmlUtils.formatPattern;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AccentService, AutoSizeDirective, AvatarDirective, CacheStorageService, CoreModule, CoreService, EnvelopBody, EnvelopMessage, ErrorMessage, ErrorResponse, HtmlUtils, HttpClientService, HttpUrlEncodingCodec, InfiniteScrollerDirective, LoadingIndicator, LoadingIndicatorService, NewPassword, NotificationService, NotifyParams, Paging, ResourceLoaderService, ResponseData, ResponseElementsData, RoleAccessDirective, SSOUrlPipe, SecurityService, SuggestionService, UserProfile, UserProfileService, UserResponseData, WebSocketAbstract, WebSocketClient, WebSocketClientService, WebSocketEnvelop, WebSocketJboss, WebSocketType, WebSocketVertx, initApp };
//# sourceMappingURL=inet-core.js.map
