import { Injectable, Directive, ElementRef, Input, TemplateRef, ViewContainerRef, Pipe, HostListener, NgModule, APP_INITIALIZER } from '@angular/core';
import { of, fromEvent, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler, HttpClientModule } from '@angular/common/http';
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
class LoadingIndicatorService {
    constructor() {
        // Create a singleton service
        this.elementId = 'loading-indicator';
        return LoadingIndicatorService.instance = LoadingIndicatorService.instance || this;
    }
    /**
     * @param {?} elementId
     * @return {?}
     */
    setElementId(elementId) {
        this.elementId = elementId;
    }
    /**
     * @return {?}
     */
    getElementId() {
        return this.elementId;
    }
    /**
     * Get DOM of loading indicator
     * @private
     * @return {?}
     */
    getIndicator() {
        if (LoadingIndicatorService.loadingIndicator && LoadingIndicatorService.loadingIndicator.container) {
            return LoadingIndicatorService.loadingIndicator;
        }
        // If Loading indicator not exist
        /** @type {?} */
        const container = (/** @type {?} */ (document.getElementById(this.getElementId())));
        /** @type {?} */
        let loadingElement;
        /** @type {?} */
        let message;
        if (container) {
            /** @type {?} */
            const elements = container.getElementsByTagName('span');
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
    }
    /**
     * @private
     * @return {?}
     */
    getLoadingIndicator() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => resolve(this.getIndicator())));
        }));
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    showLoading(message) {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        loadingIndicator => {
            if (loadingIndicator && loadingIndicator.container) {
                if (loadingIndicator.element) {
                    loadingIndicator.element.innerText = message || loadingIndicator.message || loadingIndicator.container.title;
                }
                loadingIndicator.container.style.display = 'block';
            }
        }));
    }
    /**
     * @return {?}
     */
    hideLoading() {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        loadingIndicator => {
            if (loadingIndicator && loadingIndicator.container) {
                loadingIndicator.container.style.display = 'none';
            }
        }));
    }
    /**
     * @return {?}
     */
    complete() {
        this.hideLoading();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.complete();
    }
}
LoadingIndicatorService.instance = null; // Create a singleton service
LoadingIndicatorService.loadingIndicator = null;
LoadingIndicatorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LoadingIndicatorService.ctorParameters = () => [];
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
class LoadingIndicator {
    /**
     * @param {?} container
     * @param {?} el
     * @param {?=} msg
     */
    constructor(container, el, msg = '') {
        this.container = container;
        this.element = el;
        this.message = msg;
    }
}
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
class HttpUrlEncodingCodec {
    /**
     * @param {?} k
     * @return {?}
     */
    encodeKey(k) { return standardEncoding(k); }
    /**
     * @param {?} v
     * @return {?}
     */
    encodeValue(v) { return standardEncoding(v); }
    /**
     * @param {?} k
     * @return {?}
     */
    decodeKey(k) { return decodeURIComponent(k); }
    /**
     * @param {?} v
     * @return {?}
     */
    decodeValue(v) { return decodeURIComponent(v); }
}
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
class HttpClientService extends HttpClient {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CoreService {
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
class SuggestionService {
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
const ErrorMessage = {
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
const DEFAULT_SCROLL_POSITION = {
    sH: 0,
    sT: 0,
    cH: 0
};
class InfiniteScrollerDirective {
    /**
     * @param {?} elm
     */
    constructor(elm) {
        this.elm = elm;
        this.scrollPercent = 70;
        this.isSubmit = false;
        this.isUserScrollingDown = (/**
         * @param {?} positions
         * @return {?}
         */
        (positions) => {
            return positions[0].sT < positions[1].sT;
        });
        this.isScrollExpectedPercent = (/**
         * @param {?} position
         * @return {?}
         */
        (position) => {
            return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.registerScrollEvent();
        this.streamScrollEvents();
        this.requestCallbackOnScroll();
    }
    /**
     * @private
     * @return {?}
     */
    registerScrollEvent() {
        this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
    }
    /**
     * @private
     * @return {?}
     */
    streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$
            .map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => ({
            sH: e.target.scrollHeight,
            sT: e.target.scrollTop,
            cH: e.target.clientHeight
        })))
            .pairwise()
            .filter((/**
         * @param {?} positions
         * @return {?}
         */
        positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])));
    }
    /**
     * @private
     * @return {?}
     */
    requestCallbackOnScroll() {
        this.requestOnScroll$ = this.userScrolledDown$;
        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
        }
        this.requestOnScroll$
            .exhaustMap((/**
         * @return {?}
         */
        () => {
            return this.scrollCallback();
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => { console.log(data); }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => console.log(err)));
    }
    /**
     * @private
     * @return {?}
     */
    isScrollSubmit() {
        return this.isSubmit;
    }
    ;
}
InfiniteScrollerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInfiniteScroller]'
            },] }
];
/** @nocollapse */
InfiniteScrollerDirective.ctorParameters = () => [
    { type: ElementRef }
];
InfiniteScrollerDirective.propDecorators = {
    scrollCallback: [{ type: Input }],
    immediateCallback: [{ type: Input }],
    scrollPercent: [{ type: Input }],
    isSubmit: [{ type: Input }]
};
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
class NewPassword {
}
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
class NotificationService {
    constructor() { }
    /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    showMessage(msg, type, title, config) {
    }
}
NotificationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotificationService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Paging {
}
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
class NotifyParams extends Paging {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} notifylist
     */
    constructor(pageNumber, pageSize, notifylist) {
        super();
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.notifylist = notifylist;
    }
    ;
}
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
class ErrorResponse {
}
if (false) {
    /** @type {?} */
    ErrorResponse.prototype.errors;
    /** @type {?} */
    ErrorResponse.prototype.type;
}
class ResponseData extends ErrorResponse {
}
if (false) {
    /** @type {?} */
    ResponseData.prototype.total;
    /** @type {?} */
    ResponseData.prototype.items;
}
class ResponseElementsData extends ErrorResponse {
}
if (false) {
    /** @type {?} */
    ResponseElementsData.prototype.elements;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SecurityService {
    /**
     * @param {?} http
     */
    constructor(http) {
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
    load() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve();
            }
            else {
                this.http.postJSON(iNet.getPUrl('system/userrole/list'))
                    .subscribe((/**
                 * @param {?} obj
                 * @return {?}
                 */
                (obj) => {
                    for (let key in obj) {
                        this.append(obj[key]);
                    }
                    resolve(obj);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
                    resolve();
                }));
            }
        }));
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    parserRoleFrom(obj) {
        /** @type {?} */
        let roles = [];
        for (let key in obj) {
            if (obj[key] === "true" || obj[key] === true) {
                roles.push(key);
            }
        }
        return roles;
    }
    /**
     * @private
     * @param {?} arrArg
     * @return {?}
     */
    uniqueArray(arrArg) {
        return arrArg.filter((/**
         * @param {?} elem
         * @param {?} pos
         * @param {?} arr
         * @return {?}
         */
        function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        }));
    }
    ;
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    append(v) {
        //console.log('[append]roles', v);
        this.roles = this.uniqueArray(this.roles.concat(v));
        return this.roles;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    hasRole(v) {
        //console.log('[checkRole]=', v);
        /** @type {?} */
        let roles = v.split(',');
        if (roles.length > 1) {
            /** @type {?} */
            let __items = roles.filter((/**
             * @param {?} role
             * @return {?}
             */
            role => this.roles.indexOf(role) > -1));
            return (__items.length > 0);
        }
        return (this.roles.indexOf(v) > -1);
    }
    /**
     * Check session timeout when system is idle
     * @return {?}
     */
    ping() {
        if (iNet.isEmpty(iNet.username) || !iNet.enableLayout) {
            return;
        }
        /** @type {?} */
        let iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.setAttribute("src", iNet.getPUrl('common/page/ping'));
        iframe.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const __loginUrl = 'cas/login';
            try {
                /** @type {?} */
                let __path = iframe.contentWindow.location.pathname || '';
                /** @type {?} */
                let __isLogin = (__loginUrl.match(__path) || []).length > 0;
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
    }
}
SecurityService.instance = null;
SecurityService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SecurityService.ctorParameters = () => [
    { type: HttpClientService }
];
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
class RoleAccessDirective {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     * @param {?} securityService
     */
    constructor(templateRef, viewContainer, securityService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.securityService = securityService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.applyPermission();
    }
    /**
     * @private
     * @return {?}
     */
    applyPermission() {
        if (this.securityService.hasRole(this.roleAccess)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    }
}
RoleAccessDirective.decorators = [
    { type: Directive, args: [{
                selector: '[roleAccess]'
            },] }
];
/** @nocollapse */
RoleAccessDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: SecurityService }
];
RoleAccessDirective.propDecorators = {
    roleAccess: [{ type: Input, args: ['roleAccess',] }]
};
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
class SSOUrlPipe {
    /**
     * @param {?} url
     * @return {?}
     */
    transform(url) {
        return iNet.getSSOUrl(url);
    }
}
SSOUrlPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ssoUrl'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AVATAR_VERSION_KEY = 'avatarVersion';
class UserProfileService {
    /**
     * @param {?} http
     * @param {?} coreService
     */
    constructor(http, coreService) {
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
    /**
     * @private
     * @return {?}
     */
    loadSystemProfile() {
        return this.http.postJSON(this.url.view)
            .map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res))
            .do((/**
         * @param {?} profile
         * @return {?}
         */
        profile => {
            this.systemProfile = profile;
            this.profile = (/** @type {?} */ (profile.user));
        }));
    }
    /**
     * Gets the currently LDAP profile of user logged
     * @return {?}
     */
    getSystemProfile() {
        if (this.systemProfile) {
            return Observable.of(this.systemProfile);
        }
        if (!this.$systemProfileCache) {
            this.$systemProfileCache = this.loadSystemProfile().pipe(shareReplay(1));
        }
        return this.$systemProfileCache;
    }
    /**
     * Gets the currently profile of user logged
     * @return {?}
     */
    getProfile() {
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
        (res) => res.user));
    }
    /**
     * @param {?} user
     * @return {?}
     */
    update(user) {
        this.$cache = null;
        return this.http.postJSON(this.url.update, user);
    }
    /**
     * @param {?} password
     * @return {?}
     */
    changePassword(password) {
        return this.http.postJSON(this.url.change_password, password);
    }
    /**
     * @param {?} userProfile
     * @return {?}
     */
    getAvatarUrlByProfile(userProfile) {
        /** @type {?} */
        let avatarUrl;
        avatarUrl = this.coreService.getFileUrl(userProfile.avatar);
        if (this.getAvatarVersion() > 0) {
            avatarUrl = `${avatarUrl}?version=${this.getAvatarVersion()}`;
        }
        return avatarUrl;
    }
    /**
     * @return {?}
     */
    getAvatarUrl() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            resolve(this.url.photo);
            /*
            this.getProfile().subscribe((obj: UserProfile) => {
                // resolve(this.getAvatarUrlByProfile(obj));
            }, (err: HttpErrorResponse) => {
                resolve();
            });

             */
        }));
    }
    /**
     * @return {?}
     */
    getFullName() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve(window['iNet'] ? iNet.displayName : '');
            }
            else {
                this.getProfile().subscribe((/**
                 * @param {?} profile
                 * @return {?}
                 */
                (profile) => {
                    /** @type {?} */
                    let fullName = '';
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
                (err) => {
                    resolve();
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    getSignPictureId() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.getSystemProfile().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let signPictureId = '';
                if (data.user && data.user.signPictureID) {
                    signPictureId = data.user.signPictureID;
                }
                resolve(signPictureId);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                resolve();
            }));
        }));
    }
    /**
     * @return {?}
     */
    getSignVerifyNumber() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.getSystemProfile().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let signVerify = '';
                if (data.user && data.user.signVerify) {
                    signVerify = data.user.signVerify;
                }
                resolve(signVerify);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                resolve();
            }));
        }));
    }
    /**
     * @return {?}
     */
    increaseAvatarVersion() {
        localStorage.setItem(AVATAR_VERSION_KEY, (this.getAvatarVersion() + 1).toString());
    }
    /**
     * @return {?}
     */
    getAvatarVersion() {
        return Number(localStorage.getItem(AVATAR_VERSION_KEY));
    }
    /**
     * Returns the profile associated with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    getProfileByUsername(username) {
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
            (res) => this.inventory[username] = res))
                .pipe(shareReplay(1));
        }
        return this.$profileObservableCache[username];
    }
    /**
     * Returns the avatar URL  with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    getAvatarUrlByUsername(username) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.getProfileByUsername(username).subscribe((/**
             * @param {?} obj
             * @return {?}
             */
            (obj) => {
                if (obj.avatar) {
                    resolve(this.coreService.getFileUrl(obj.avatar));
                }
                else {
                    resolve();
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                resolve();
            }));
        }));
    }
    /**
     * @return {?}
     */
    getDefaultAvatarUrl() {
        return UserProfileService.DEFAULT_AVATAR_URL;
    }
}
UserProfileService.instance = null;
UserProfileService.DEFAULT_AVATAR_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYHA//aAAgBAQAAAAD3kAkAgATAEiUoQQAmASmWs0WspmdHuIiEAmBKZnW8RhA3/RbWsICYJTafh5t8AGR6batUCYJm0zzvEgD0bZRWIgmEzaZclygA9B26K1QmJWtJyXKAD0fYkUiExM3kc1xgA9QyBWiJLWkaLhAB6bliK1iU2sHI8qAOq64KVFrSHJcoAOi7YK1gtcHOcUAOu6oIrWVrAxvPcIBmeh5IKVleQMTzICfSc4CtS8gfLy2Afb076AVqm0gPOtYDou2AVqm0gOU5IHYdNYCtU2kDWedwB3e9ArUvIVwOK1oDM7jY3CtS1jE5/nMUAH26Poc4rSVp1fOaP5gAC266LcRWfnzehwQAABlb7pPvweoAAAAZ3ceeUAAAANxqagAAAGfgwAAAAXoAAAAJAAAAB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8QAPRAAAQMCAQgGCAUDBQAAAAAAAQIDBAARBQYQEiAhMDFBE0BRkaGxIjJSYXGBwdEVI0JQUxQ0NURikuHw/9oACAEBAAE/AP2i1WNaJqx7KsatqW6lajZIuSAO01Ox+FBJSVdIockEH61KyuecJEdstj3kH6U5j2JrOyW4n4GhjeJj/Wvf8qj5Tz2SOkcLg5g2+1YdlFFnrDZSWnCbAKULGrVardRAoCsXxhrCmhfRW6r1UX8an4rKxB3TdWQLW0Ek27tYGxuONQcqpMRhLTjSXgm/pKUb99YRjjOKlSNENugX0NK9/CrVbfgUBUyU3CiqfcNkptUyU5MkrecNyom2zlfcwZa4UtD6DYpuOFNOB1pDg4KSCPnVqI3lqAoZssHijDWmgT+Y5t+W7wJ4v4U0o3uAB4DMRRG6FAUBnyyUbxk8rk+A3eTX+HR8foM5FEbkUBqZZJt/TK96vIbvBG+iwpkdqQfAahFEbdcUBq5ZIvBjr9ly3eN0eFQU6MCOB/Gny1TR1hQ1crbfgar8ekTbdGsMkIkYcwtB2BCQfjYapojVFDWyyfWVx2T6lyr4mw++7yOlKBfjG1iQodx+2sRmOcUNbLNFjFX71Dy3eSKScQWrkAL9x1jRzba50OFDWyxaKsNZc9hzb8xu8jGfyZLxG0qCQfl/3rGjx1Brz4SJ8Ncdw2Sq2217WNS8InQirpYzgQCbLAuO8bmDhcvEV6LDSikcV8h31AhIgREMNkkAC5PM2t9NY0aPHMONDcYo2lzC5IUL2aUR8bHcJFyB2msIjNRsLjBtASVNpUo22kkX+u4OccaG4lJ04jyPabUPClCyiNeIguTGUDipYHjUdBbjNIPFKAPDcHjR4ZudDc43hS8Mm6I0lMrF0LI49uvkvhS35SJzgIZbJ0Ts9JX/AI+G5NHMONDc5Q43AlRHYjWm45s0VgeiNoPbr4PlFh8aGxDWl1BTcaRSNEXJPbfnSFpcbStBulQBB7QdwaOYcaG4xzE04bBKtvSOApRbkbcaJubncZMYmmXCTFVfpWEgEnmL7O7ZuDRzc6GstxDSdJxaUDtUbVIxzDo4OlKbKhySb+VY1iy8VlBZSEtouEAH38dzhmIOYZMTIbAVsIKSdhFRsocOkJTeQhtZ/Sq/nTbzTwu04hY/2qB1jRzChqSsThQv7iS2g8NG9z3DbWIZXJFkwE343U4ny21MxCTPdLkhzSVa2wAb2NLehupdYXoqSbjZesPyucSrRnp0kW9ZtG2/faouMQJmxmSjS9lXonxzmjqCr2FzU3KGBBJQtaluckpTWIZVyZIKYoVHSeYIJ8tlOvOvrK3XFLUeJUbnqKFrbUFIUUqHAg2rD8p5sVQD61SG78FHb32qHlPAllKCVtOH9KhfxFBaVi6TcUc7zyGG1OOKCUpFySamZXhOkiKxfsUo/apeLTJiiVvKSCfVSogefV4uISoirtPKA9kqNqiZXqBCJTAIJ9ZJ4d9RJbUyOl5pQKVcr8KvWO4s5PlKaFgy2SkW57ePW8MxN3DZAcRZSTcFJ51+KRP5R4/aniS+4T7R650y6WbuKJ5k9c6VXZR2m/XOkV2+H73/AP/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8AYf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8AYf/Z';
UserProfileService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UserProfileService.ctorParameters = () => [
    { type: HttpClientService },
    { type: CoreService }
];
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
class UserProfile {
}
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
class UserResponseData {
}
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
class AccentService {
    constructor() {
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
    viToEn(str) {
        return str.replace(/[^\u0000-\u007E]/g, (/**
         * @param {?} a
         * @return {?}
         */
        (a) => {
            /** @type {?} */
            var index = this._vi_accents.indexOf(a);
            return index < 0 ? a : this._en_accents[index];
        }));
    }
}
AccentService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AccentService.ctorParameters = () => [];
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
class CacheStorageService {
    constructor() {
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
    promiseQueue(name, promise, resovle) {
        if (this.__queue[name]) {
            this.__queue[name].push(resovle);
        }
        else {
            this.__queue[name] = [resovle];
            promise(name);
        }
    }
    /**
     * @param {?} name
     * @param {?} context
     * @param {?=} args
     * @return {?}
     */
    resolveQueue(name, context, args) {
        if (this.__queue[name]) {
            this.__queue[name].forEach((/**
             * @param {?} fn
             * @return {?}
             */
            fn => {
                try {
                    fn.apply(context, args);
                }
                catch (e) {
                }
            }));
            delete this.__queue[name];
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getData(key) {
        /** @type {?} */
        const data = this.__storage[key];
        // Check data expired
        if (data && new Date().getTime() - data.time <= data.timeCache) {
            return data.value;
        }
    }
    /**
     * @param {?} key
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    setData(key, data, options) {
        /** @type {?} */
        const timeCache = options && options.timeCache || this.timeCache;
        this.__storage[key] = (/** @type {?} */ ({
            time: new Date().getTime(),
            timeCache: timeCache,
            value: data
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeData(key) {
        delete this.__storage[key];
    }
    /**
     * @return {?}
     */
    clearData() {
        this.__storage = {};
    }
}
CacheStorageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CacheStorageService.ctorParameters = () => [];
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
class AutoSizeDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.el = element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }
    /**
     * @return {?}
     */
    get minHeight() {
        return this._minHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set minHeight(val) {
        this._minHeight = val;
        this.updateMinHeight();
    }
    /**
     * @return {?}
     */
    get maxHeight() {
        return this._maxHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set maxHeight(val) {
        this._maxHeight = val;
        this.updateMaxHeight();
    }
    /**
     * @return {?}
     */
    onResize() {
        //Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this._clientWidth)
            return;
        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    }
    /**
     * @return {?}
     */
    onInput() {
        this.adjust();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // set element resize allowed manually by user
        /** @type {?} */
        const style = window.getComputedStyle(this.el, null);
        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        }
        else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        // run first adjust
        this.adjust();
    }
    /**
     * @return {?}
     */
    adjust() {
        // perform height adjustments after input changes, if height is different
        // if (this.el.style.height == this.element.nativeElement.scrollHeight + "px") return;
        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + "px";
    }
    /**
     * @return {?}
     */
    updateMinHeight() {
        // Set textarea min height if input defined
        this.el.style.minHeight = this._minHeight + 'px';
    }
    /**
     * @return {?}
     */
    updateMaxHeight() {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this._maxHeight + 'px';
    }
}
AutoSizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[appAutoSize]',
                exportAs: 'appAutoSize'
            },] }
];
/** @nocollapse */
AutoSizeDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutoSizeDirective.propDecorators = {
    minHeight: [{ type: Input, args: ['minHeight',] }],
    maxHeight: [{ type: Input, args: ['maxHeight',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }],
    onInput: [{ type: HostListener, args: ['input',] }]
};
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
class AvatarDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.usercode = iNet.username;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._el.nativeElement.addEventListener('error', this._loadAvatarError.bind(this));
        this._setAvatar();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this._setAvatar();
    }
    /**
     * @private
     * @return {?}
     */
    _setAvatar() {
        if (!this.usercode) {
            this._loadAvatarError();
            return;
        }
        this._el.nativeElement.src = iNet.getUrl('system/userprofile/photo') + '?usercode=' + encodeURIComponent(this.usercode);
    }
    /**
     * @private
     * @return {?}
     */
    _loadAvatarError() {
        this._el.nativeElement.src = UserProfileService.DEFAULT_AVATAR_URL;
    }
}
AvatarDirective.decorators = [
    { type: Directive, args: [{
                selector: 'img[userAvatar]'
            },] }
];
/** @nocollapse */
AvatarDirective.ctorParameters = () => [
    { type: ElementRef }
];
AvatarDirective.propDecorators = {
    usercode: [{ type: Input }]
};
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
class ResourceLoaderService {
    constructor() {
        this._loaded = [];
        this._version = '';
        // this._initScriptVersion();
    }
    /**
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    load(resources, callback) {
        if (resources.length < 1) {
            return callback();
        }
        this._loadResources(resources, callback);
    }
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    loadJS(url, callback) {
        this._loadWithTagName('script', {
            type: 'text/javascript',
            src: this.getFullUrlJS(url)
        }, callback);
    }
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    loadCSS(url, callback) {
        this._loadWithTagName('link', {
            type: 'text/css',
            rel: 'stylesheet',
            href: url
        }, callback);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getFullUrlJS(url) {
        if (url.indexOf('//') < 0 && iNet.fileServer) {
            if (url.startsWith('/')) {
                url = url.substr(1, url.length);
            }
            return iNet.fileServer + url;
        }
        return url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    isLoaded(url) {
        return this._loaded.indexOf(url) > -1;
    }
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    _loadResources(resources, callback) {
        /** @type {?} */
        let splitGroups = this._groupResources(resources);
        /** @type {?} */
        let fn = (/**
         * @return {?}
         */
        () => {
            if (splitGroups.length < 1) {
                return callback();
            }
            this._loadGroups(splitGroups.splice(0, 1)[0], fn);
        });
        fn();
    }
    //  Split group resources by sync/async
    /**
     * @private
     * @param {?} resources
     * @return {?}
     */
    _groupResources(resources) {
        /** @type {?} */
        let splitGroups = [];
        /** @type {?} */
        let groups;
        //  Split group resources by sync/async
        for (let i = 0; i < resources.length; i++) {
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
    }
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    _loadGroups(resources, callback) {
        /** @type {?} */
        let promises = [];
        resources.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => promises.push(this._load(item))));
        Promise.all(promises).then((/**
         * @return {?}
         */
        () => {
            callback();
        }));
    }
    /**
     * @private
     * @param {?} resource
     * @return {?}
     */
    _load(resource) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            if (resource.type === 'css') {
                this.loadCSS(resource.url, resolve);
            }
            else {
                this.loadJS(resource.url, resolve);
            }
        }));
    }
    /**
     * @private
     * @param {?} tagName
     * @param {?} properties
     * @param {?} callback
     * @return {?}
     */
    _loadWithTagName(tagName, properties, callback) {
        /** @type {?} */
        let url = properties.src || properties.href;
        // Loaded
        if (this.isLoaded(url)) {
            return callback();
        }
        /** @type {?} */
        let tagEl = document.createElement(tagName);
        for (let k in properties) {
            tagEl[k] = properties[k];
        }
        tagEl.onload = (/**
         * @return {?}
         */
        () => {
            this._loaded.push(url);
            callback();
        });
        tagEl.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            console.warn("Load resource error: " + url);
            console.warn(e);
            this._loaded.push(url);
            callback();
        });
        document.head.appendChild(tagEl);
    }
    /**
     * @private
     * @return {?}
     */
    _initScriptVersion() {
        /** @type {?} */
        let $script = $('script');
        for (let i = 0; i < $script.length; i++) {
            /** @type {?} */
            let src = $script[i]['src'];
            /** @type {?} */
            let index = src.indexOf('?version=');
            if (index > -1) {
                this._version = src.substr(index + 1, src.length);
                break;
            }
        }
    }
}
ResourceLoaderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ResourceLoaderService.ctorParameters = () => [];
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
    () => {
        return config.load();
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CoreModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class WebSocketAbstract {
    /**
     * @param {?} options
     * @param {?} username
     */
    constructor(options, username) {
        // receive message from socket server
        this.onMessage = new Subject();
        this.onStateChange = new Subject();
        this.connect(options, username);
    }
    // update readyState
    /**
     * @return {?}
     */
    stateChange() {
        this.onStateChange.next(this.readyState);
    }
}
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
const WebSocketType = {
    // send to the first address
    SEND: 'send',
    // publish to the all address
    PUBLISH: 'publish',
};
class WebSocketEnvelop {
    constructor() {
        this.type = WebSocketType.PUBLISH;
    }
}
if (false) {
    /** @type {?} */
    WebSocketEnvelop.prototype.type;
    /** @type {?} */
    WebSocketEnvelop.prototype.address;
    /** @type {?} */
    WebSocketEnvelop.prototype.body;
}
class EnvelopBody {
}
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
class EnvelopMessage {
    // , joins?: string, duration?: string
    /**
     * @param {?} sender
     * @param {?} content
     * @param {?=} joins
     * @param {?=} duration
     */
    constructor(sender, content, joins, duration) {
        this.content = this.alert = content;
        this.sender = sender;
        if (!!joins) {
            this.joins = joins || sender;
        }
        this.duration = duration || "0";
    }
}
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
class WebSocketJboss extends WebSocketAbstract {
    /**
     * @return {?}
     */
    get readyState() {
        return this._socket ? this._socket.readyState : null;
    }
    /**
     * @return {?}
     */
    stateChange() {
        if (this.readyState === WebSocket.OPEN) {
            this._ping();
        }
        super.stateChange();
    }
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    connect(options, username) {
        this._socket = new WebSocket(options);
        this._socket.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // const envelop: WebSocketEnvelop = JSON.parse(event.data);
            // if (envelop.body) {
            //     this.onMessage.next(envelop.body);
            // }
            /** @type {?} */
            const envelopBody = JSON.parse(event.data);
            if (envelopBody.sender) {
                this.onMessage.next(envelopBody);
            }
        });
        this._socket.onopen = (/**
         * @return {?}
         */
        () => this.stateChange());
        this._socket.onerror = (/**
         * @return {?}
         */
        () => this.stateChange());
        this._socket.onclose = (/**
         * @return {?}
         */
        () => this.stateChange());
    }
    /**
     * @return {?}
     */
    close() {
        this._socket.close();
    }
    /**
     * @param {?} envelop
     * @return {?}
     */
    send(envelop) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            try {
                this._socket.send(JSON.stringify(envelop));
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _ping() {
        if (this.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify({ type: 'ping' }));
            setTimeout((/**
             * @return {?}
             */
            () => this._ping()), 10000);
        }
    }
}
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
class WebSocketVertx extends WebSocketAbstract {
    /**
     * @return {?}
     */
    get readyState() {
        return this._eventbus ? this._eventbus.state : null;
    }
    ;
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    connect(options, username) {
        if (options && options.length === 2) {
            /** @type {?} */
            var url = options[0];
            /** @type {?} */
            var headers = {
                keyapi: options[1]
            };
            this._connect(url, headers, username);
        }
    }
    /**
     * @private
     * @param {?} url
     * @param {?} headers
     * @param {?} username
     * @return {?}
     */
    _connect(url, headers, username) {
        this._eventbus = new EventBus(url, {
            transports: 'websocket'
        });
        this._eventbus.onopen = (/**
         * @return {?}
         */
        () => {
            // Channel receive chat message
            this._eventbus.registerHandler(username, headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            (err, msg) => {
                if (msg) {
                    this.onMessage.next(msg.body);
                }
            }));
            // Channel receive online message
            // this._eventbus.registerHandler('news-feed', headers, (err: any, msg: any) => {
            //     if (msg) {
            //         this.onMessage.next(msg);
            //     }
            // });
            this.stateChange();
        });
        this._eventbus.onclose = (/**
         * @return {?}
         */
        () => this.stateChange());
        this._eventbus.onerror = (/**
         * @return {?}
         */
        () => this.stateChange());
    }
    /**
     * @return {?}
     */
    close() {
        this._eventbus.close();
    }
    /**
     * @param {?} envelop
     * @return {?}
     */
    send(envelop) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            try {
                this._eventbus.publish(envelop.address, envelop.body);
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    }
}
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
class WebSocketClient {
    constructor() {
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
            () => this._register()));
        }
        return WebSocketClient.instance = WebSocketClient.instance || this;
    }
    /**
     * @return {?}
     */
    get readyState() {
        return this.socket ? this.socket.readyState : null;
    }
    /**
     * @return {?}
     */
    get connecting() {
        return this.readyState === WebSocket.CONNECTING || this.readyState === null;
    }
    /**
     * @return {?}
     */
    get connected() {
        return this.readyState === WebSocket.OPEN;
    }
    /**
     * @return {?}
     */
    get closing() {
        return this.readyState === WebSocket.CLOSING;
    }
    /**
     * @return {?}
     */
    get closed() {
        return this.readyState === WebSocket.CLOSED;
    }
    /**
     * @return {?}
     */
    get autoconnect() {
        return this._autoconnect;
    }
    // close websocket client
    /**
     * @return {?}
     */
    close() {
        this.socket.close();
    }
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @return {?}
     */
    send(address, message, application = '') {
        return this.sendEnvelop(this.buildEnvelop(address, message, application));
    }
    /**
     * @param {?} envelop
     * @return {?}
     */
    sendEnvelop(envelop) {
        if (this.connected) {
            return this.socket.send(envelop);
        }
        else {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                // Add to queue and waiting socket connected to send
                /** @type {?} */
                let data = {
                    e: envelop,
                    f: resolve
                };
                data.timer = setTimeout((/**
                 * @return {?}
                 */
                () => this._completeEnvelopQueue(data, false)), this.sendTimeout);
                this._envelopQueue.push(data);
            }));
        }
    }
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} application
     * @param {?=} join
     * @return {?}
     */
    buildEnvelop(address, message, application = '', join) {
        /** @type {?} */
        let envelop = new WebSocketEnvelop();
        envelop.address = address;
        envelop.body = new EnvelopBody();
        envelop.body.application = application;
        envelop.body.sender = this._username;
        envelop.body.alias = [address];
        envelop.body.message = new EnvelopMessage(this._username, message, join || '');
        return envelop;
    }
    /**
     * @private
     * @return {?}
     */
    _sendEnvelopQueue() {
        this._envelopQueue.forEach((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.sendEnvelop(data.e).then((/**
             * @param {?} status
             * @return {?}
             */
            (status) => this._completeEnvelopQueue(data, status)));
        }));
    }
    /**
     * @private
     * @param {?} data
     * @param {?} status
     * @return {?}
     */
    _completeEnvelopQueue(data, status) {
        /** @type {?} */
        const index = this._envelopQueue.indexOf(data);
        if (index >= 0) {
            this._envelopQueue.splice(index, 1);
        }
        data.f(status);
    }
    /**
     * @private
     * @param {?=} callback
     * @return {?}
     */
    _register(callback) {
        $.ajax({
            url: iNet.getPUrl('account/register'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (typeof data === 'string') {
                    this.socket = new WebSocketJboss(data, this._username);
                }
                else {
                    this.socket = new WebSocketVertx(data, this._username);
                }
                this.socket.onStateChange.subscribe((/**
                 * @return {?}
                 */
                () => this._stateChange()));
                this.socket.onMessage.subscribe((/**
                 * @param {?} body
                 * @return {?}
                 */
                (body) => {
                    this.onMessage.next(body);
                }));
                callback && callback();
            }),
            error: (/**
             * @return {?}
             */
            () => {
                callback && callback();
                throw new Error("Account register error");
            })
        });
    }
    /**
     * @private
     * @param {?} callback
     * @return {?}
     */
    _getAccountInfo(callback) {
        if (this._username) {
            return callback(this._username);
        }
        $.ajax({
            url: iNet.getPUrl('system/userprofile/view'),
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this._username = data && data.user && (data.user.usercode || data.user.username) || '';
                callback(this._username);
            }),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @private
     * @return {?}
     */
    _stateChange() {
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
    }
    /**
     * @private
     * @return {?}
     */
    _runAutoConnect() {
        this._autoconnect = true;
        this._autoconectTimer = setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.connected) {
                this._cancelAutoConnect();
                return;
            }
            if (this._autoconectCount >= this._autoconnectRepeat) {
                this._cancelAutoConnect();
                // Sleep and retry connect after 30s
                setTimeout((/**
                 * @return {?}
                 */
                () => this._runAutoConnect()), this._autoconnectRetryAfter);
                return;
            }
            this._register((/**
             * @return {?}
             */
            () => {
                this._autoconectCount++;
                if (!this.connected) {
                    this._runAutoConnect();
                }
            }));
        }), this._autoconnectAfter);
    }
    /**
     * @private
     * @return {?}
     */
    _cancelAutoConnect() {
        this._autoconnect = false;
        this._autoconectCount = 0;
        clearTimeout(this._autoconectTimer);
    }
}
WebSocketClient.instance = null;
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
class WebSocketClientService extends WebSocketClient {
}
WebSocketClientService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HtmlUtils {
    // Escape html to display
    /**
     * @param {?} html
     * @return {?}
     */
    static formatHtmlDisplay(html) {
        return html.replace(HtmlUtils.formatPattern, '<br>');
    }
}
HtmlUtils.formatPattern = new RegExp('(\\n)|(\\\\n)|(\\\\\\\\n)|↵', 'g');
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
