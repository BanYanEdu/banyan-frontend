import { Injectable, EventEmitter, Component, Input, Output, ViewChild, ContentChild, ComponentFactoryResolver, ApplicationRef, InjectionToken, SecurityContext, Inject, Injector, NgZone, Directive, ElementRef, NgModule, HostBinding, HostListener, Optional, SkipSelf, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, ContentChildren, ViewChildren, Pipe, Renderer, defineInjectable, inject, CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef, TemplateRef, ViewEncapsulation, Attribute, Renderer2 } from '@angular/core';
import { HttpClientService, CoreService, UserProfileService, SecurityService, NotificationService, NewPassword, UserProfile, ErrorMessage, ResponseData, CoreModule, LoadingIndicatorService, WebSocketClientService } from 'inet-core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { shareReplay, filter, takeUntil, startWith, tap, debounceTime, map } from 'rxjs/operators';
import { Router, NavigationEnd, RouterModule, NavigationStart, NavigationError, NavigationCancel, ActivatedRoute } from '@angular/router';
import { CommonModule, Location, DatePipe, DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
export { DomSanitizer } from '@angular/platform-browser';
import { Subject, Observable as Observable$1, of, merge, fromEvent } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable, Subject as Subject$1 } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS, HttpParams, HttpRequest, HttpClient } from '@angular/common/http';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, TabsModule, ModalModule, BsDatepickerModule, BsModalService as BsModalService$1, PopoverConfig, PopoverModule, TimepickerModule } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsModalService, ModalModule as ModalModule$1 } from 'ngx-bootstrap/modal';
import { Subject as Subject$2 } from 'rxjs/Subject';
import * as moment$1 from 'moment';
import * as PhotoSwipe$1 from 'photoswipe/dist/photoswipe.js';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';
import * as ResizeSensor from 'resize-sensor';
import timeago from 'timeago.js';
import { JSEncrypt as JSEncrypt$1 } from 'jsencrypt';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function AutoUnsubscribe() {
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        const original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = (/**
         * @return {?}
         */
        function () {
            for (let prop in this) {
                /** @type {?} */
                const property = this[prop];
                if (property && (typeof property.unsubscribe === "function")) {
                    property.unsubscribe();
                }
            }
            original && typeof original === "function" && original.apply(this, arguments);
        });
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} hooks
 * @return {?}
 */
function Logger(hooks = []) {
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        const component = constructor.name;
        /** @type {?} */
        const log = (/**
         * @param {?} hook
         * @return {?}
         */
        function (hook) {
            try {
                /** @type {?} */
                const original = constructor.prototype[hook];
                if (original && (typeof original === "function")) {
                    constructor.prototype[hook] = (/**
                     * @param {...?} args
                     * @return {?}
                     */
                    function (...args) {
                        console.log(`%c ${component} - ${hook}`, `color: #4CAF50; font-weight: bold`, ...args);
                        /** @type {?} */
                        const result = original && original.apply(this, args);
                        if (result) {
                            console.log(`%c ${component} - ${hook} - return`, `color: #4CAF50; font-weight: bold`, result);
                        }
                    });
                }
            }
            catch (e) {
                console.error(e);
            }
        });
        if (hooks.length > 0) {
            hooks.forEach((/**
             * @param {?} hook
             * @return {?}
             */
            hook => {
                log(hook);
            }));
        }
        else {
            for (let hook in constructor.prototype) {
                log(hook);
            }
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Address {
}
if (false) {
    /** @type {?} */
    Address.prototype.address;
    /** @type {?} */
    Address.prototype.districtCode;
    /** @type {?} */
    Address.prototype.districtName;
    /** @type {?} */
    Address.prototype.provinceCode;
    /** @type {?} */
    Address.prototype.provinceName;
    /** @type {?} */
    Address.prototype.countryCode;
    /** @type {?} */
    Address.prototype.countryName;
    /** @type {?} */
    Address.prototype.stateCode;
    /** @type {?} */
    Address.prototype.stateName;
    /** @type {?} */
    Address.prototype.state;
    /** @type {?} */
    Address.prototype.postcode;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Organization {
    constructor() {
        this.officeAddress = new Address();
    }
}
if (false) {
    /** @type {?} */
    Organization.prototype.uuid;
    /** @type {?} */
    Organization.prototype.organId;
    /** @type {?} */
    Organization.prototype.createdDate;
    /** @type {?} */
    Organization.prototype.name;
    /** @type {?} */
    Organization.prototype.primaryEmail;
    /** @type {?} */
    Organization.prototype.type;
    /** @type {?} */
    Organization.prototype.address;
    /** @type {?} */
    Organization.prototype.officeAddress;
    /** @type {?} */
    Organization.prototype.description;
    /** @type {?} */
    Organization.prototype.officeAddressStr;
    /** @type {?} */
    Organization.prototype.taxCode;
    /** @type {?} */
    Organization.prototype.foreignName;
    /** @type {?} */
    Organization.prototype.abbreviationName;
    /** @type {?} */
    Organization.prototype.website;
    /** @type {?} */
    Organization.prototype.primaryPhone;
    /** @type {?} */
    Organization.prototype.companySize;
    /** @type {?} */
    Organization.prototype.industry;
    /** @type {?} */
    Organization.prototype.legalRepName;
    /** @type {?} */
    Organization.prototype.legalRepCanonId;
    /** @type {?} */
    Organization.prototype.createdBy;
    /** @type {?} */
    Organization.prototype.logo;
    /** @type {?} */
    Organization.prototype.ownerId;
    /** @type {?} */
    Organization.prototype.memberOfId;
    /** @type {?} */
    Organization.prototype.ownerShip;
    /** @type {?} */
    Organization.prototype.region;
    /** @type {?} */
    Organization.prototype.modifiedBy;
    /** @type {?} */
    Organization.prototype.modifiedDate;
    /** @type {?} */
    Organization.prototype.banks;
    /** @type {?} */
    Organization.prototype.busAces;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OrganizationService {
    /**
     * @param {?} http
     * @param {?} coreService
     */
    constructor(http, coreService) {
        this.http = http;
        this.coreService = coreService;
        this.url = {
            firm_load: iNet.getPUrl('cloud/firmorganid/load'),
            firm_update: iNet.getPUrl('cloud/firmprofile/update'),
            update_logo: iNet.getPUrl('cloud/firmprofile/logoupdate'),
            view_logo: iNet.getPUrl('plugin/firmlogo/view'),
            // For Essentials
            //load_info: iNet.getPUrl('gl/organ/profile/load'),
            load_info: iNet.getPUrl('cloud/firmprofile/load'),
            update_info: iNet.getPUrl('cloud/firmprofile/update'),
            search_org: iNet.getPUrl('plugin/organization/search'),
            view_org: iNet.getPUrl('plugin/firmprofile/view')
            //update_logo: iNet.getPUrl('gl/organ/profile/logo')
        };
    }
    /**
     * @return {?}
     */
    firmLoad() {
        this.http.showLoading();
        return this.http.getJSON(this.url.firm_load, { organId: iNet.organId })
            .map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res));
    }
    // saveLogoOrganization(params: any): Observable<any> {
    //     return this.http.postJSON(this.url.save_logo, params);
    // }
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    firmUpdate(orgInfo) {
        this.http.showLoading();
        return this.http.postJSON(this.url.firm_update, orgInfo);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    updateLogo(data) {
        this.http.showLoading();
        return this.http.post(this.url.update_logo, data);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    removeLogo(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.update_logo, params);
    }
    /**
     * @return {?}
     */
    load() {
        if (!this.$orgCache) {
            this.http.showLoading();
            this.$orgCache = this.http.getJSON(this.url.view_org)
                .pipe(shareReplay(1));
        }
        return this.$orgCache;
    }
    /**
     * @return {?}
     */
    loadInfo() {
        this.http.showLoading();
        return this.http.postJSON(this.url.load_info);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    update(data) {
        this.http.showLoading();
        // Clone data for update
        /** @type {?} */
        const org = Object.assign(new Organization(), data);
        org.officeAddressStr = JSON.stringify(org.officeAddress);
        delete org.officeAddress;
        delete org.createdDate;
        delete org.createdBy;
        delete org.banks;
        delete org.busAces;
        this.$orgCache = null;
        return this.http.postJSON(this.url.update_info, org);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    searchOrganization(params = {}) {
        return this.http.postJSON(this.url.search_org, params);
    }
    /**
     * @param {?} orgInfo
     * @return {?}
     */
    getLogoUrlByOrganization(orgInfo) {
        /*
        if (!orgInfo.logo) {
            return iNet.BLANK_IMAGE_URL;
        }
         */
        return `${this.url.view_logo}?version=${orgInfo.modifiedDate}`;
        //return this.coreService.getFileUrl(orgInfo.logo + `?version=${orgInfo.modifiedDate}`);
    }
    /**
     * @return {?}
     */
    getLogoUrl() {
        return this.url.view_logo;
    }
    /**
     * @return {?}
     */
    viewInfo() {
        this.http.showLoading();
        return this.http.postJSON(this.url.view_org);
    }
}
OrganizationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OrganizationService.ctorParameters = () => [
    { type: HttpClientService },
    { type: CoreService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.$orgCache;
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    OrganizationService.prototype.coreService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CloudTranslateService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotifyMessageService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            list: iNet.getPUrl('social/activity/notify'),
            clear: iNet.getPUrl('social/activity/clearnotify'),
            load_notify: iNet.getPUrl('social/activity/loadnotify')
        };
        return NotifyMessageService.instance = NotifyMessageService.instance || this;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    getMessages(params = {}) {
        return this.http.getJSON(this.url.list, params);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    count(params) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.http.getJSON(this.url.list, params).subscribe((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
                resolve(v);
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
     * @param {?=} params
     * @return {?}
     */
    clearAll(params = {}) {
        return this.http.postJSON(this.url.clear, params);
    }
    /**
     * @param {?} app
     * @param {?} activityId
     * @return {?}
     */
    loadNotify(app, activityId) {
        return this.http.getJSON(this.url.load_notify, { activity: activityId, application: app });
    }
    /**
     * @param {?} activityId
     * @return {?}
     */
    clearByActivityId(activityId) {
        return this.http.postJSON(this.url.clear, { activity: activityId });
    }
}
NotifyMessageService.instance = null;
NotifyMessageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotifyMessageService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    NotifyMessageService.instance;
    /**
     * @type {?}
     * @private
     */
    NotifyMessageService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    NotifyMessageService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AdminNavbarComponent {
    /**
     * @param {?} coreService
     * @param {?} router
     * @param {?} userProfileService
     * @param {?} orgService
     * @param {?} cloudTranslateService
     * @param {?} messageService
     * @param {?} translate
     */
    constructor(coreService, router, userProfileService, orgService, cloudTranslateService, messageService, translate) {
        this.coreService = coreService;
        this.router = router;
        this.userProfileService = userProfileService;
        this.orgService = orgService;
        this.cloudTranslateService = cloudTranslateService;
        this.messageService = messageService;
        this.translate = translate;
        this.hideToggler = false;
        this.hideTogglerButton = false;
        this.hideCompanyMenu = false;
        this.hideProfileMenu = false;
        this.hideSearch = false;
        this.messageCount = '';
        this.hideBrandName = true;
        this.hideLogo = false;
        this.onToggleMenu = new EventEmitter();
        this.onToggleMessageSideNav = new EventEmitter();
        this.onToggleAppSideNav = new EventEmitter();
        // @Output() onToggleChatSideNav = new EventEmitter<void>();
        this.onToggleSocialSideNav = new EventEmitter();
        this.onToggleNoteSideNav = new EventEmitter();
        this.onClickLogo = new EventEmitter();
        this.visibleChatIcon = !iNet.isEmpty(iNet.prefix);
        this.visibleMessageIcon = !iNet.isEmpty(iNet.prefix);
        this.visibleAppIcon = !iNet.isEmpty(iNet.prefix);
        this.visibleNoteIcon = false;
        //externalUrl = 'javascript:;';
        this.avatarUrl = iNet.BLANK_IMAGE_URL;
        this.displayName = iNet.displayName;
        this.brandName = iNet.orgName || '';
        this.langs = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        //this.brandName = !iNet.isEmpty(this.applicationName) ? `${this.applicationName} - ${this.orgName}` : this.orgName;
        //this.externalUrl = window.location.protocol + '\/\/' + window.location.host + '\/' + iNet.firmPrefix;
        this.langs = this.translate.getLangs(); // Languages
        this.currentLanguage = this.cloudTranslateService.getCurrentLang();
        if (!iNet.isEmpty(iNet.prefix)) {
            this.userProfileService.getFullName().then((/**
             * @param {?} fullname
             * @return {?}
             */
            fullname => {
                this.displayName = fullname || iNet.displayName || iNet.username;
            }));
            this.userProfileService.getAvatarUrl().then((/**
             * @param {?} url
             * @return {?}
             */
            url => {
                this.avatarUrl = url;
            }));
            this.countMessage();
            //Load logo for header
            this.logoUrl = this.orgService.getLogoUrl();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
    /**
     * @return {?}
     */
    logout() {
        if (this.coreService.getEnvironment()['production']) {
            this.coreService.logout();
        }
    }
    /**
     * @return {?}
     */
    toggleMenu() {
        this.onToggleMenu.emit();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    toggleMessageSideNav($event) {
        this.onToggleMessageSideNav.emit();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    toggleAppSideNav($event) {
        this.onToggleAppSideNav.emit();
    }
    // toggleSocialSideNav($event) {
    //     this.onToggleSocialSideNav.emit();
    // }
    // toggleChatSideNav($event) {
    //     this.onToggleChatSideNav.emit();
    // }
    /**
     * @param {?} $event
     * @return {?}
     */
    toggleNoteNav($event) {
        this.onToggleNoteSideNav.emit();
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    changeLanguage(lang) {
        this.translate.use(lang).subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this.currentLanguage = lang;
            this.cloudTranslateService.setCurrentLang(lang);
            if (this.coreService.getEnvironment()['production']) {
                this.coreService.updateLanguage(lang, (/**
                 * @return {?}
                 */
                function () {
                    window.location.reload();
                }));
            }
            else {
                window.location.reload();
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateImageUrl($event) {
        this.avatarUrl = UserProfileService.DEFAULT_AVATAR_URL;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.logoUrl = iNet.BLANK_IMAGE_URL;
        }
    }
    /**
     * @return {?}
     */
    countMessage() {
        this.messageService.count().then((/**
         * @param {?} count
         * @return {?}
         */
        (count) => {
            this.messageCount = (count && count > 0) ? count.toString() : '';
        }));
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setMessageCount(v) {
        this.messageCount = v;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clickLogo($event) {
        this.onClickLogo.emit(this.homeRouterLink);
    }
}
AdminNavbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-navbar',
                template: "<nav class=\"navbar navbar-expand-md\">\n    <div class=\"navbar-header logo-area\" (click)=\"clickLogo($event)\" [routerLink]=\"homeRouterLink\">\n        <ng-container>\n            <img *ngIf=\"!hideLogo && logoUrl\" alt=\"Logo\" class=\"logo\" [title]=\"brandName\" [src]=\"logoUrl\"\n                 (error)=\"updateBlankImage($event)\">\n            <a *ngIf=\"!hideBrandName\" #brandLink class=\"navbar-brand\">{{brandName}}</a>\n        </ng-container>\n    </div>\n    <ng-template [ngTemplateOutlet]=\"navbarMenuTpl\"></ng-template>\n    <div class=\"navbar-collapse collapse in\" id=\"navbar-collapse\" aria-expanded=\"true\" style=\"\">\n        <ul class=\"navbar-nav navbar-right ml-auto\">\n            <ng-template [ngTemplateOutlet]=\"navbarItemTpl\"></ng-template>\n            <li *ngIf=\"visibleNoteIcon\" class=\"nav-item\"><a href=\"javascript:;\" (click)=\"toggleNoteNav($event)\"><i\n                    class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></a></li>\n            <li *ngIf=\"visibleMessageIcon\" class=\"nav-item\" [ngClass]=\"{'icon-animated-heartbeat': messageCount}\">\n                <a href=\"javascript:;\" (click)=\"toggleMessageSideNav($event)\">\n                    <i class=\"fa fa-bell rotate-15\"></i><span class=\"number\">{{messageCount}}</span>\n                </a>\n            </li>\n            <li *ngIf=\"visibleAppIcon\" class=\"nav-item\"><a href=\"javascript:;\" (click)=\"toggleAppSideNav($event)\"><i\n                    class=\"fa fa-th-large\"></i></a></li>\n            <li id=\"user-profile\" class=\"light-blue user-profile\">\n                <a *ngIf=\"displayName\" class=\"dropdown-toggle\" href=\"javascript:;\" data-toggle=\"dropdown\">\n                    <img [src]=\"avatarUrl\" [alt]=\"displayName\" class=\"nav-user-photo\" (error)=\"updateImageUrl($event)\">\n                    <!--span class=\"user-info\" [title]=\"displayName\"><small>{{'COMMON.WELCOME' | translate}},</small>{{displayName}}</span-->\n                </a>\n                <div class=\"dropdown-menu\">\n                    <a *ngIf=\"!hideProfileMenu\" class=\"dropdown-item\" href=\"javascript:;\" routerLink=\"user-profile\">\n                        <i class=\"fa fa-user\"></i> {{'COMMON.MENU.USER_PROFILE' | translate}}\n                    </a>\n                    <a *ngIf=\"!hideCompanyMenu\" class=\"dropdown-item\" href=\"javascript:;\" routerLink=\"company-profile\">\n                        <i class=\"fa fa-building\"></i> {{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}\n                    </a>\n                    <ng-template [ngTemplateOutlet]=\"profileItemTpl\"></ng-template>\n                    <a class=\"dropdown-submenu pull-left\">\n                        <a class=\"dropdown-item dropdown-toggle\" href=\"#\">\n                            <i class=\"fa fa-language\"></i> {{'COMMON.MENU.LANGUAGE' | translate}}\n                            <small class=\"text-lowercase\">({{ currentLanguage | translate }})</small>\n                        </a>\n                        <div class=\"dropdown-menu\">\n                            <a class=\"dropdown-item\" href=\"javascript:;\" *ngFor=\"let lang of langs\"\n                               (click)=\"changeLanguage(lang)\" [ngClass]=\"{'active': currentLanguage==lang}\">\n                                <i class=\"fa\"\n                                   [ngClass]=\"{'fa-check': currentLanguage==lang}\"></i> {{ lang | translate }}\n                            </a>\n                        </div>\n                        <div class=\"dropdown-divider\"></div>\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:;\" (click)=\"logout()\">\n                        <i class=\"fa fa-sign-out\"></i> {{'COMMON.MENU.LOGOUT' | translate}}\n                    </a>\n                </div>\n            </li>\n        </ul>\n    </div>\n</nav>\n",
                styles: ["@-webkit-keyframes heartbeat{from{transform:scale(1);transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes heartbeat{from{transform:scale(1);transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.navbar .rotate-15{transform:rotate(15deg)}.navbar .icon-animated-heartbeat{-webkit-animation:1.5s ease-in-out infinite both heartbeat;animation:1.5s ease-in-out infinite both heartbeat}@media (max-width:767px){.navbar .navbar-right{margin-top:-10px;margin-bottom:1px;margin-left:-7px}.navbar .navbar-header{display:inline-block;width:100%}}@media (min-width:768px){.navbar .navbar-right{float:right!important;margin-right:-15px}}"]
            }] }
];
/** @nocollapse */
AdminNavbarComponent.ctorParameters = () => [
    { type: CoreService },
    { type: Router },
    { type: UserProfileService },
    { type: OrganizationService },
    { type: CloudTranslateService },
    { type: NotifyMessageService },
    { type: TranslateService }
];
AdminNavbarComponent.propDecorators = {
    navbarItemTpl: [{ type: Input }],
    profileItemTpl: [{ type: Input }],
    navbarMenuTpl: [{ type: Input }],
    hideToggler: [{ type: Input }],
    hideTogglerButton: [{ type: Input }],
    hideCompanyMenu: [{ type: Input }],
    hideProfileMenu: [{ type: Input }],
    hideSearch: [{ type: Input }],
    applicationName: [{ type: Input }],
    homeRouterLink: [{ type: Input }],
    noteRouterLink: [{ type: Input }],
    messageCount: [{ type: Input }],
    hideBrandName: [{ type: Input }],
    hideLogo: [{ type: Input }],
    onToggleMenu: [{ type: Output }],
    onToggleMessageSideNav: [{ type: Output }],
    onToggleAppSideNav: [{ type: Output }],
    onToggleSocialSideNav: [{ type: Output }],
    onToggleNoteSideNav: [{ type: Output }],
    onClickLogo: [{ type: Output }],
    visibleChatIcon: [{ type: Input }],
    visibleMessageIcon: [{ type: Input }],
    visibleAppIcon: [{ type: Input }],
    visibleNoteIcon: [{ type: Input }],
    brandName: [{ type: Input }],
    brandLink: [{ type: ViewChild, args: ['brandLink',] }]
};
if (false) {
    /** @type {?} */
    AdminNavbarComponent.prototype.navbarItemTpl;
    /** @type {?} */
    AdminNavbarComponent.prototype.profileItemTpl;
    /** @type {?} */
    AdminNavbarComponent.prototype.navbarMenuTpl;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideToggler;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideTogglerButton;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideCompanyMenu;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideProfileMenu;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideSearch;
    /** @type {?} */
    AdminNavbarComponent.prototype.applicationName;
    /** @type {?} */
    AdminNavbarComponent.prototype.homeRouterLink;
    /** @type {?} */
    AdminNavbarComponent.prototype.noteRouterLink;
    /** @type {?} */
    AdminNavbarComponent.prototype.messageCount;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideBrandName;
    /** @type {?} */
    AdminNavbarComponent.prototype.hideLogo;
    /** @type {?} */
    AdminNavbarComponent.prototype.onToggleMenu;
    /** @type {?} */
    AdminNavbarComponent.prototype.onToggleMessageSideNav;
    /** @type {?} */
    AdminNavbarComponent.prototype.onToggleAppSideNav;
    /** @type {?} */
    AdminNavbarComponent.prototype.onToggleSocialSideNav;
    /** @type {?} */
    AdminNavbarComponent.prototype.onToggleNoteSideNav;
    /** @type {?} */
    AdminNavbarComponent.prototype.onClickLogo;
    /** @type {?} */
    AdminNavbarComponent.prototype.visibleChatIcon;
    /** @type {?} */
    AdminNavbarComponent.prototype.visibleMessageIcon;
    /** @type {?} */
    AdminNavbarComponent.prototype.visibleAppIcon;
    /** @type {?} */
    AdminNavbarComponent.prototype.visibleNoteIcon;
    /** @type {?} */
    AdminNavbarComponent.prototype.avatarUrl;
    /** @type {?} */
    AdminNavbarComponent.prototype.displayName;
    /** @type {?} */
    AdminNavbarComponent.prototype.brandName;
    /** @type {?} */
    AdminNavbarComponent.prototype.brandLink;
    /** @type {?} */
    AdminNavbarComponent.prototype.langs;
    /** @type {?} */
    AdminNavbarComponent.prototype.currentLanguage;
    /** @type {?} */
    AdminNavbarComponent.prototype.logoUrl;
    /**
     * @type {?}
     * @private
     */
    AdminNavbarComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    AdminNavbarComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    AdminNavbarComponent.prototype.userProfileService;
    /**
     * @type {?}
     * @private
     */
    AdminNavbarComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    AdminNavbarComponent.prototype.cloudTranslateService;
    /**
     * @type {?}
     * @private
     */
    AdminNavbarComponent.prototype.messageService;
    /** @type {?} */
    AdminNavbarComponent.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayoutComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.themeClass = 'theme-silver';
        this.hideToggler = false;
        this.hideTogglerButton = true;
        this.visibleMenu = true;
        this.expandedMenu = false;
        this.expandedSlider = false;
        this.expandedMessageSlider = false;
        this.expandedAppSlider = false;
        this.expandedSocialSlider = false;
        this.expandedChatSlider = false;
        this.hideSearch = false;
        this.hideCompanyMenu = false;
        this.hideProfileMenu = false;
        this.hideBrandName = true;
        this.hideLogo = false;
        this.visibleOverlay = false;
        this.fullScreenLayout = false;
        this.fullLayoutWithUrls = [];
        this.routeChange = new EventEmitter();
        this.onToggle = new EventEmitter();
        this.onClickLogo = new EventEmitter();
        this.visibleToolbar = false;
        this.visibleChatIcon = true;
        this.visibleMessageIcon = true;
        this.visibleAppIcon = true;
        this.visibleNoteIcon = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (window.localStorage) {
            this.expandedMenu = (window.localStorage.getItem('expandedMenu') === '1');
        }
        // this.fullLayoutWithUrls.push('/user-profile');
        this._router = this.router.events.filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationEnd))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const url = event.url;
            this.onChangeUrl(url);
        }));
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    onChangeUrl(url) {
        if (!this.fullScreenLayout) {
            /** @type {?} */
            let __visibleMenu = !!this.menu;
            if (__visibleMenu) {
                for (let i = 0; i < this.fullLayoutWithUrls.length; i++) {
                    if ((url !== '/' && this.fullLayoutWithUrls[i] !== '/' && url.indexOf(this.fullLayoutWithUrls[i]) === 0)
                        || (url === this.fullLayoutWithUrls[i])) {
                        __visibleMenu = false;
                        break;
                    }
                }
            }
            this.visibleMenu = __visibleMenu;
        }
        else {
            this.visibleMenu = false;
        }
        this.hideToggler = !this.visibleMenu;
        this.routeChange.emit({
            url: url,
            visibleMenu: this.visibleMenu,
            hideToggler: this.hideToggler,
            expandedMenu: this.expandedMenu,
            layout: this
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        //Using jQuery to handle menu
        $(document).ready((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const $menu = $('#mainnav-menu');
            /** @type {?} */
            const activeCls = 'active';
            /** @type {?} */
            const $elements = $menu.find('li');
            $elements.on('hide.bs.collapse', (/**
             * @return {?}
             */
            function () {
                $(this).removeClass(activeCls);
            }));
            $elements.on('show.bs.collapse', (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                const $currentActive = $menu.find('li.active');
                $currentActive.find('a[data-toggle]').trigger("click");
                $(this).addClass(activeCls);
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._router.unsubscribe();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onToggleMenu($event) {
        this.expandedMenu = !this.expandedMenu;
        window.localStorage.setItem('expandedMenu', this.expandedMenu ? '1' : '0');
        window.dispatchEvent(new Event('resize'));
        this.onToggle.emit(this.expandedMenu);
    }
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    updateSlider(v) {
        this.expandedSlider = v;
        this.visibleOverlay = v;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onToggleMessageSlider($event) {
        this.expandedAppSlider = false;
        this.expandedSocialSlider = false;
        this.expandedChatSlider = false;
        this.expandedMessageSlider = !this.expandedMessageSlider;
        this.updateSlider(this.expandedMessageSlider);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onToggleAppSlider($event) {
        this.expandedChatSlider = false;
        this.expandedSocialSlider = false;
        this.expandedMessageSlider = false;
        this.expandedAppSlider = !this.expandedAppSlider;
        this.updateSlider(this.expandedAppSlider);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onToggleSocialSlider($event) {
        this.expandedAppSlider = false;
        this.expandedChatSlider = false;
        this.expandedMessageSlider = false;
        this.expandedSocialSlider = !this.expandedSocialSlider;
        this.updateSlider(this.expandedSocialSlider);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onToggleNoteSlider($event) {
        this.expandedAppSlider = false;
        this.expandedSocialSlider = false;
        this.expandedChatSlider = false;
        this.expandedMessageSlider = false;
        this.updateSlider(this.expandedMessageSlider);
        this.router.navigate(['note', 'list']);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onCloseSlider($event) {
        this.expandedMessageSlider = false;
        this.expandedAppSlider = false;
        this.expandedChatSlider = false;
        this.expandedSocialSlider = false;
        this.expandedSlider = false;
        this.visibleOverlay = false;
    }
    //====================Message count=================
    /**
     * @param {?} $event
     * @return {?}
     */
    onClearMessage($event) {
        if (this.navbarComponent) {
            this.navbarComponent.setMessageCount('');
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onLoadMessage($event) {
        if (this.navbarComponent) {
            this.navbarComponent.countMessage();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clickLogo($event) {
        this.onClickLogo.emit(this.homeRouterLink);
    }
}
LayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-layout',
                template: "<div id=\"container\" [class]=\"themeClass\" [ngClass]=\"{'mainnav-lg': expandedMenu, 'mainnav-sm': !expandedMenu}\">\n    <div toastContainer></div>\n    <app-admin-navbar (onToggleMenu)=\"onToggleMenu($event)\"\n                      (onToggleMessageSideNav)=\"onToggleMessageSlider($event)\"\n                      (onToggleAppSideNav)=\"onToggleAppSlider($event)\"\n                      (onToggleSocialSideNav)=\"onToggleSocialSlider($event)\"\n                      (onToggleNoteSideNav)=\"onToggleNoteSlider($event)\"\n                      (onClickLogo)=\"clickLogo($event)\"\n                      [hideSearch]=\"hideSearch\" [applicationName]=\"appName\"\n                      [homeRouterLink]=\"homeRouterLink\" [navbarItemTpl]=\"navbarItemTpl\" [profileItemTpl]=\"profileItemTpl\"\n                      [navbarMenuTpl]=\"navbarMenu\" [visibleAppIcon]=\"visibleAppIcon\" [visibleChatIcon]=\"visibleChatIcon\"\n                      [visibleMessageIcon]=\"visibleMessageIcon\" [visibleNoteIcon]=\"visibleNoteIcon\"\n                      [hideToggler]=\"hideToggler\" [hideTogglerButton]=\"hideTogglerButton\"\n                      [hideBrandName]=\"hideBrandName\" [hideLogo]=\"hideLogo\"\n                      [hideCompanyMenu]=\"hideCompanyMenu\" [hideProfileMenu]=\"hideProfileMenu\">\n    </app-admin-navbar>\n    <app-admin-message-side-nav [opened]=\"expandedMessageSlider\" (onClear)=\"onClearMessage($event)\"\n                          (onClose)=\"onCloseSlider($event)\"\n                          (onLoad)=\"onLoadMessage($event)\"></app-admin-message-side-nav>\n    <app-admin-app-side-nav [opened]=\"expandedAppSlider\" (onClose)=\"onCloseSlider($event)\"></app-admin-app-side-nav>\n    <app-admin-social-side-nav [opened]=\"expandedSocialSlider\" (onClose)=\"onCloseSlider($event)\"></app-admin-social-side-nav>\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <nav id=\"mainnav-container\" *ngIf=\"visibleMenu\">\n                <div id=\"mainnav\">\n                    <ng-template [ngTemplateOutlet]=\"menu\"></ng-template>\n                </div>\n            </nav>\n            <div id=\"content-container\" [ngClass]=\"{'pl-0': !visibleMenu , 'tb-visible': !!toolbar && visibleToolbar}\">\n                <ng-template [ngTemplateOutlet]=\"toolbar\"></ng-template>\n                <router-outlet></router-outlet>\n                <div id=\"loading-indicator\" title=\"{{'INDICATOR.PROCESSING' | translate}}\">\n                    <span>{{'INDICATOR.PROCESSING' | translate}}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"overlay\" [ngClass]=\"{'d-block': expandedSlider || visibleOverlay}\"></div>\n</div>\n"
            }] }
];
/** @nocollapse */
LayoutComponent.ctorParameters = () => [
    { type: Router }
];
LayoutComponent.propDecorators = {
    themeClass: [{ type: Input, args: ['theme',] }],
    menu: [{ type: ContentChild, args: ['menu',] }],
    navbarItemTpl: [{ type: ContentChild, args: ['navbarItem',] }],
    profileItemTpl: [{ type: ContentChild, args: ['profileItem',] }],
    navbarMenu: [{ type: ContentChild, args: ['navbarMenu',] }],
    toolbar: [{ type: ContentChild, args: ['toolbar',] }],
    homeRouterLink: [{ type: Input, args: ['homeRouterLink',] }],
    appName: [{ type: Input }],
    hideToggler: [{ type: Input }],
    hideTogglerButton: [{ type: Input }],
    visibleMenu: [{ type: Input }],
    expandedMenu: [{ type: Input }],
    expandedSlider: [{ type: Input }],
    expandedMessageSlider: [{ type: Input }],
    expandedAppSlider: [{ type: Input }],
    expandedSocialSlider: [{ type: Input }],
    expandedChatSlider: [{ type: Input }],
    hideSearch: [{ type: Input }],
    hideCompanyMenu: [{ type: Input }],
    hideProfileMenu: [{ type: Input }],
    hideBrandName: [{ type: Input }],
    hideLogo: [{ type: Input }],
    visibleOverlay: [{ type: Input }],
    fullScreenLayout: [{ type: Input }],
    fullLayoutWithUrls: [{ type: Input }],
    routeChange: [{ type: Output }],
    onToggle: [{ type: Output }],
    onClickLogo: [{ type: Output }],
    visibleToolbar: [{ type: Input }],
    visibleChatIcon: [{ type: Input }],
    visibleMessageIcon: [{ type: Input }],
    visibleAppIcon: [{ type: Input }],
    visibleNoteIcon: [{ type: Input }],
    navbarComponent: [{ type: ViewChild, args: [AdminNavbarComponent,] }]
};
if (false) {
    /** @type {?} */
    LayoutComponent.prototype.themeClass;
    /** @type {?} */
    LayoutComponent.prototype.menu;
    /** @type {?} */
    LayoutComponent.prototype.navbarItemTpl;
    /** @type {?} */
    LayoutComponent.prototype.profileItemTpl;
    /** @type {?} */
    LayoutComponent.prototype.navbarMenu;
    /** @type {?} */
    LayoutComponent.prototype.toolbar;
    /** @type {?} */
    LayoutComponent.prototype.homeRouterLink;
    /** @type {?} */
    LayoutComponent.prototype.appName;
    /** @type {?} */
    LayoutComponent.prototype.hideToggler;
    /** @type {?} */
    LayoutComponent.prototype.hideTogglerButton;
    /** @type {?} */
    LayoutComponent.prototype.visibleMenu;
    /** @type {?} */
    LayoutComponent.prototype.expandedMenu;
    /** @type {?} */
    LayoutComponent.prototype.expandedSlider;
    /** @type {?} */
    LayoutComponent.prototype.expandedMessageSlider;
    /** @type {?} */
    LayoutComponent.prototype.expandedAppSlider;
    /** @type {?} */
    LayoutComponent.prototype.expandedSocialSlider;
    /** @type {?} */
    LayoutComponent.prototype.expandedChatSlider;
    /** @type {?} */
    LayoutComponent.prototype.hideSearch;
    /** @type {?} */
    LayoutComponent.prototype.hideCompanyMenu;
    /** @type {?} */
    LayoutComponent.prototype.hideProfileMenu;
    /** @type {?} */
    LayoutComponent.prototype.hideBrandName;
    /** @type {?} */
    LayoutComponent.prototype.hideLogo;
    /** @type {?} */
    LayoutComponent.prototype.visibleOverlay;
    /** @type {?} */
    LayoutComponent.prototype.fullScreenLayout;
    /** @type {?} */
    LayoutComponent.prototype.fullLayoutWithUrls;
    /** @type {?} */
    LayoutComponent.prototype.routeChange;
    /** @type {?} */
    LayoutComponent.prototype.onToggle;
    /** @type {?} */
    LayoutComponent.prototype.onClickLogo;
    /** @type {?} */
    LayoutComponent.prototype.visibleToolbar;
    /** @type {?} */
    LayoutComponent.prototype.visibleChatIcon;
    /** @type {?} */
    LayoutComponent.prototype.visibleMessageIcon;
    /** @type {?} */
    LayoutComponent.prototype.visibleAppIcon;
    /** @type {?} */
    LayoutComponent.prototype.visibleNoteIcon;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype._router;
    /** @type {?} */
    LayoutComponent.prototype.navbarComponent;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype.router;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthenticateGuard {
    /**
     * @param {?} securityService
     */
    constructor(securityService) {
        this.securityService = securityService;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        let roles = (/** @type {?} */ (next.data["roles"]));
        //console.log('[canActivate][with roles]', roles);
        return this.securityService.hasRole(roles.join(','));
    }
}
AuthenticateGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthenticateGuard.ctorParameters = () => [
    { type: SecurityService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthenticateGuard.prototype.securityService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function ComponentType() { }
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
class ComponentPortal {
    /**
     * @param {?} component
     * @param {?} injector
     */
    constructor(component, injector) {
        this.component = component;
        this.injector = injector;
    }
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @param {?} newestOnTop
     * @return {?}
     */
    attach(host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
    }
    /**
     * Detach this portal from its host
     * @return {?}
     */
    detach() {
        /** @type {?} */
        const host = this._attachedHost;
        if (host) {
            this._attachedHost = undefined;
            return host.detach();
        }
    }
    /**
     * Whether this portal is attached to a host.
     * @return {?}
     */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?=} host
     * @return {?}
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ComponentPortal.prototype._attachedHost;
    /**
     * The type of the component that will be instantiated for attachment.
     * @type {?}
     */
    ComponentPortal.prototype.component;
    /**
     * [Optional] Where the attached component should live in Angular's *logical* component tree.
     * This is different from where the component *renders*, which is determined by the PortalHost.
     * The origin necessary when the host is outside of the Angular application context.
     * @type {?}
     */
    ComponentPortal.prototype.viewContainerRef;
    /**
     * Injector used for the instantiation of the component.
     * @type {?}
     */
    ComponentPortal.prototype.injector;
}
/**
 * Partial implementation of PortalHost that only deals with attaching a
 * ComponentPortal
 * @abstract
 */
class BasePortalHost {
    /**
     * @param {?} portal
     * @param {?} newestOnTop
     * @return {?}
     */
    attach(portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
    }
    /**
     * @return {?}
     */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost();
        }
        this._attachedPortal = undefined;
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = undefined;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
}
if (false) {
    /**
     * The portal currently attached to the host.
     * @type {?}
     * @private
     */
    BasePortalHost.prototype._attachedPortal;
    /**
     * A function that will permanently dispose this host.
     * @type {?}
     * @private
     */
    BasePortalHost.prototype._disposeFn;
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @param {?} newestOnTop
     * @return {?}
     */
    BasePortalHost.prototype.attachComponentPortal = function (portal, newestOnTop) { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
class DomPortalHost extends BasePortalHost {
    /**
     * @param {?} _hostDomElement
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     */
    constructor(_hostDomElement, _componentFactoryResolver, _appRef) {
        super();
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @param {?} newestOnTop
     * @return {?}
     */
    attachComponentPortal(portal, newestOnTop) {
        /** @type {?} */
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        let componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the ChangeDetector for that component to the application (which
        // happens automatically when using a ViewContainer).
        componentRef = componentFactory.create(portal.injector);
        // When creating a component outside of a ViewContainer, we need to manually register
        // its ChangeDetector with the application. This API is unfortunately not yet published
        // in Angular core. The change detector must also be deregistered when the component
        // is destroyed to prevent memory leaks.
        this._appRef.attachView(componentRef.hostView);
        this.setDisposeFn((/**
         * @return {?}
         */
        () => {
            this._appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        }));
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        if (newestOnTop) {
            this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
        }
        else {
            this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        }
        return componentRef;
    }
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @private
     * @param {?} componentRef
     * @return {?}
     */
    _getComponentRootNode(componentRef) {
        return (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomPortalHost.prototype._hostDomElement;
    /**
     * @type {?}
     * @private
     */
    DomPortalHost.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    DomPortalHost.prototype._appRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
    /**
     * @param {?} _portalHost
     */
    constructor(_portalHost) {
        this._portalHost = _portalHost;
    }
    /**
     * @param {?} portal
     * @param {?=} newestOnTop
     * @return {?}
     */
    attach(portal, newestOnTop = true) {
        return this._portalHost.attach(portal, newestOnTop);
    }
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    detach() {
        return this._portalHost.detach();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OverlayRef.prototype._portalHost;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
class OverlayContainer {
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @private
     * @return {?}
     */
    _createContainer() {
        /** @type {?} */
        const container = document.createElement('div');
        container.classList.add('overlay-container');
        document.body.appendChild(container);
        this._containerElement = container;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OverlayContainer.prototype._containerElement;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
class Overlay {
    /**
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     */
    constructor(_overlayContainer, _componentFactoryResolver, _appRef) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._paneElements = {};
    }
    /**
     * Creates an overlay.
     * @param {?=} positionClass
     * @param {?=} overlayContainer
     * @return {?} A reference to the created overlay.
     */
    create(positionClass, overlayContainer) {
        // get existing pane if possible
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
    }
    /**
     * @param {?=} positionClass
     * @param {?=} overlayContainer
     * @return {?}
     */
    getPaneElement(positionClass = '', overlayContainer) {
        if (!this._paneElements[positionClass]) {
            this._paneElements[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements[positionClass];
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @private
     * @param {?} positionClass
     * @param {?=} overlayContainer
     * @return {?} Newly-created pane element
     */
    _createPaneElement(positionClass, overlayContainer) {
        /** @type {?} */
        const pane = document.createElement('div');
        pane.id = 'toast-container';
        pane.classList.add(positionClass);
        pane.classList.add('toast-container');
        if (!overlayContainer) {
            this._overlayContainer.getContainerElement().appendChild(pane);
        }
        else {
            overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @private
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @private
     * @param {?} pane DOM element for the overlay
     * @return {?}
     */
    _createOverlayRef(pane) {
        return new OverlayRef(this._createPortalHost(pane));
    }
}
Overlay.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Overlay.ctorParameters = () => [
    { type: OverlayContainer },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Overlay.prototype._paneElements;
    /**
     * @type {?}
     * @private
     */
    Overlay.prototype._overlayContainer;
    /**
     * @type {?}
     * @private
     */
    Overlay.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    Overlay.prototype._appRef;
}
/**
 * Providers for Overlay and its related injectables.
 * @type {?}
 */
const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayContainer,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Configuration for an individual toast.
 * @record
 */
function IndividualConfig() { }
if (false) {
    /**
     * disable both timeOut and extendedTimeOut
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.disableTimeOut;
    /**
     * toast time to live in milliseconds
     * default: 5000
     * @type {?}
     */
    IndividualConfig.prototype.timeOut;
    /**
     * toast show close button
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.closeButton;
    /**
     * time to close after a user hovers over toast
     * default: 1000
     * @type {?}
     */
    IndividualConfig.prototype.extendedTimeOut;
    /**
     * show toast progress bar
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.progressBar;
    /**
     * changes toast progress bar animation
     * default: decreasing
     * @type {?|undefined}
     */
    IndividualConfig.prototype.progressAnimation;
    /**
     * render html in toast message (possibly unsafe)
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.enableHtml;
    /**
     * css class on toast component
     * default: toast
     * @type {?}
     */
    IndividualConfig.prototype.toastClass;
    /**
     * css class on toast container
     * default: toast-top-right
     * @type {?}
     */
    IndividualConfig.prototype.positionClass;
    /**
     * css class on to toast title
     * default: toast-title
     * @type {?}
     */
    IndividualConfig.prototype.titleClass;
    /**
     * css class on to toast title
     * default: toast-title
     * @type {?}
     */
    IndividualConfig.prototype.messageClass;
    /**
     * animation easing on toast
     * default: ease-in
     * @type {?}
     */
    IndividualConfig.prototype.easing;
    /**
     * animation ease time on toast
     * default: 300
     * @type {?}
     */
    IndividualConfig.prototype.easeTime;
    /**
     * clicking on toast dismisses it
     * default: true
     * @type {?}
     */
    IndividualConfig.prototype.tapToDismiss;
    /**
     * Angular toast component to be shown
     * default: Toast
     * @type {?}
     */
    IndividualConfig.prototype.toastComponent;
    /**
     * Helps show toast from a websocket or from event outside Angular
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.onActivateTick;
}
/**
 * @record
 */
function ToastrIconClasses() { }
if (false) {
    /** @type {?} */
    ToastrIconClasses.prototype.error;
    /** @type {?} */
    ToastrIconClasses.prototype.info;
    /** @type {?} */
    ToastrIconClasses.prototype.success;
    /** @type {?} */
    ToastrIconClasses.prototype.warning;
}
/**
 * Global Toast configuration
 * Includes all IndividualConfig
 * @record
 */
function GlobalConfig() { }
if (false) {
    /**
     * max toasts opened. Toasts will be queued
     * Zero is unlimited
     * default: 0
     * @type {?}
     */
    GlobalConfig.prototype.maxOpened;
    /**
     * dismiss current toast when max is reached
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.autoDismiss;
    /** @type {?} */
    GlobalConfig.prototype.iconClasses;
    /**
     * New toast placement
     * default: true
     * @type {?}
     */
    GlobalConfig.prototype.newestOnTop;
    /**
     * block duplicate messages
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.preventDuplicates;
}
/**
 * Everything a toast needs to launch
 */
class ToastPackage {
    /**
     * @param {?} toastId
     * @param {?} config
     * @param {?} message
     * @param {?} title
     * @param {?} toastType
     * @param {?} toastRef
     */
    constructor(toastId, config, message, title, toastType, toastRef) {
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this._onTap = new Subject();
        this._onAction = new Subject();
        this.toastRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => {
            this._onAction.complete();
            this._onTap.complete();
        }));
    }
    /**
     * Fired on click
     * @return {?}
     */
    triggerTap() {
        this._onTap.next();
        if (this.config.tapToDismiss) {
            this._onTap.complete();
        }
    }
    /**
     * @return {?}
     */
    onTap() {
        return this._onTap.asObservable();
    }
    /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    triggerAction(action) {
        this._onAction.next(action);
    }
    /**
     * @return {?}
     */
    onAction() {
        return this._onAction.asObservable();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastPackage.prototype._onTap;
    /**
     * @type {?}
     * @private
     */
    ToastPackage.prototype._onAction;
    /** @type {?} */
    ToastPackage.prototype.toastId;
    /** @type {?} */
    ToastPackage.prototype.config;
    /** @type {?} */
    ToastPackage.prototype.message;
    /** @type {?} */
    ToastPackage.prototype.title;
    /** @type {?} */
    ToastPackage.prototype.toastType;
    /** @type {?} */
    ToastPackage.prototype.toastRef;
}
/**
 * @record
 */
function GlobalToastrConfig() { }
/**
 * @record
 */
function IndividualToastrConfig() { }
/**
 * @record
 */
function ToastrConfig() { }

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
class ToastRef {
    /**
     * @param {?} _overlayRef
     */
    constructor(_overlayRef) {
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the toast has finished closing.
         */
        this._afterClosed = new Subject();
        /**
         * triggered when toast is activated
         */
        this._activate = new Subject();
        /**
         * notifies the toast that it should close before the timeout
         */
        this._manualClose = new Subject();
    }
    /**
     * @return {?}
     */
    manualClose() {
        this._manualClose.next();
        this._manualClose.complete();
    }
    /**
     * @return {?}
     */
    manualClosed() {
        return this._manualClose.asObservable();
    }
    /**
     * Close the toast.
     * @return {?}
     */
    close() {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
    }
    /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * @return {?}
     */
    isInactive() {
        return this._activate.isStopped;
    }
    /**
     * @return {?}
     */
    activate() {
        this._activate.next();
        this._activate.complete();
    }
    /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    afterActivate() {
        return this._activate.asObservable();
    }
}
if (false) {
    /**
     * The instance of component opened into the toast.
     * @type {?}
     */
    ToastRef.prototype.componentInstance;
    /**
     * Subject for notifying the user that the toast has finished closing.
     * @type {?}
     * @private
     */
    ToastRef.prototype._afterClosed;
    /**
     * triggered when toast is activated
     * @type {?}
     * @private
     */
    ToastRef.prototype._activate;
    /**
     * notifies the toast that it should close before the timeout
     * @type {?}
     * @private
     */
    ToastRef.prototype._manualClose;
    /**
     * @type {?}
     * @private
     */
    ToastRef.prototype._overlayRef;
}
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
class ToastInjector {
    /**
     * @param {?} _toastPackage
     * @param {?} _parentInjector
     */
    constructor(_toastPackage, _parentInjector) {
        this._toastPackage = _toastPackage;
        this._parentInjector = _parentInjector;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) {
        if (token === ToastPackage && this._toastPackage) {
            return this._toastPackage;
        }
        return this._parentInjector.get(token, notFoundValue);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastInjector.prototype._toastPackage;
    /**
     * @type {?}
     * @private
     */
    ToastInjector.prototype._parentInjector;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ToastToken() { }
if (false) {
    /** @type {?} */
    ToastToken.prototype.config;
    /** @type {?} */
    ToastToken.prototype.defaults;
}
/** @type {?} */
const TOAST_CONFIG = new InjectionToken('ToastConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template C
 */
function ActiveToast() { }
if (false) {
    /**
     * Your Toast ID. Use this to close it individually
     * @type {?}
     */
    ActiveToast.prototype.toastId;
    /**
     * the message of your toast. Stored to prevent duplicates
     * @type {?}
     */
    ActiveToast.prototype.message;
    /**
     * a reference to the component see portal.ts
     * @type {?}
     */
    ActiveToast.prototype.portal;
    /**
     * a reference to your toast
     * @type {?}
     */
    ActiveToast.prototype.toastRef;
    /**
     * triggered when toast is active
     * @type {?}
     */
    ActiveToast.prototype.onShown;
    /**
     * triggered when toast is destroyed
     * @type {?}
     */
    ActiveToast.prototype.onHidden;
    /**
     * triggered on toast click
     * @type {?}
     */
    ActiveToast.prototype.onTap;
    /**
     * available for your use in custom toast
     * @type {?}
     */
    ActiveToast.prototype.onAction;
}
class ToastrService {
    /**
     * @param {?} token
     * @param {?} overlay
     * @param {?} _injector
     * @param {?} sanitizer
     * @param {?} ngZone
     */
    constructor(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.currentlyActive = 0;
        this.toasts = [];
        this.index = 0;
        /** @type {?} */
        const defaultConfig = new token.defaults;
        this.toastrConfig = Object.assign({}, defaultConfig, token.config);
        this.toastrConfig.iconClasses = Object.assign({}, defaultConfig.iconClasses, token.config.iconClasses);
    }
    /**
     * show toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @param {?=} type
     * @return {?}
     */
    show(message, title, override = {}, type = '') {
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show successful toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    success(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.success || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show error toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    error(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.error || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show info toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    info(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.info || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show warning toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    warning(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.warning || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * Remove all or a single toast by id
     * @param {?=} toastId
     * @return {?}
     */
    clear(toastId) {
        // Call every toastRef manualClose function
        for (const toast of this.toasts) {
            if (toastId !== undefined) {
                if (toast.toastId === toastId) {
                    toast.toastRef.manualClose();
                    return;
                }
            }
            else {
                toast.toastRef.manualClose();
            }
        }
    }
    /**
     * Remove and destroy a single toast by id
     * @param {?} toastId
     * @return {?}
     */
    remove(toastId) {
        /** @type {?} */
        const found = this._findToast(toastId);
        if (!found) {
            return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
            return false;
        }
        if (this.currentlyActive < this.toastrConfig.maxOpened && this.toasts[this.currentlyActive]) {
            /** @type {?} */
            const p = this.toasts[this.currentlyActive].toastRef;
            if (!p.isInactive()) {
                this.currentlyActive = this.currentlyActive + 1;
                p.activate();
            }
        }
        return true;
    }
    /**
     * Determines if toast message is already shown
     * @param {?} message
     * @return {?}
     */
    isDuplicate(message) {
        for (let i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].message === message) {
                return true;
            }
        }
        return false;
    }
    /**
     * create a clone of global config and apply individual settings
     * @private
     * @param {?=} override
     * @return {?}
     */
    applyConfig(override = {}) {
        return Object.assign({}, this.toastrConfig, override);
    }
    /**
     * Find toast object by id
     * @private
     * @param {?} toastId
     * @return {?}
     */
    _findToast(toastId) {
        for (let i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].toastId === toastId) {
                return { index: i, activeToast: this.toasts[i] };
            }
        }
        return null;
    }
    /**
     * Determines the need to run inside angular's zone then builds the toast
     * @private
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    _preBuildNotification(toastType, message, title, config) {
        if (config.onActivateTick) {
            return this.ngZone.run((/**
             * @return {?}
             */
            () => this._buildNotification(toastType, message, title, config)));
        }
        return this._buildNotification(toastType, message, title, config);
    }
    /**
     * Creates and attaches toast data to component
     * returns null if toast is duplicate and preventDuplicates == True
     * @private
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    _buildNotification(toastType, message, title, config) {
        if (!config.toastComponent) {
            throw new Error('toastComponent required');
        }
        // max opened and auto dismiss = true
        if (message && this.toastrConfig.preventDuplicates && this.isDuplicate(message)) {
            return null;
        }
        this.previousToastMessage = message;
        /** @type {?} */
        let keepInactive = false;
        if (this.toastrConfig.maxOpened && this.currentlyActive >= this.toastrConfig.maxOpened) {
            keepInactive = true;
            if (this.toastrConfig.autoDismiss) {
                this.clear(this.toasts[this.toasts.length - 1].toastId);
            }
        }
        /** @type {?} */
        const overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        /** @type {?} */
        let sanitizedMessage = message;
        if (message && config.enableHtml) {
            sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
        }
        /** @type {?} */
        const toastRef = new ToastRef(overlayRef);
        /** @type {?} */
        const toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        /** @type {?} */
        const toastInjector = new ToastInjector(toastPackage, this._injector);
        /** @type {?} */
        const component = new ComponentPortal(config.toastComponent, toastInjector);
        /** @type {?} */
        const portal = overlayRef.attach(component, this.toastrConfig.newestOnTop);
        toastRef.componentInstance = ((/** @type {?} */ (portal)))._component;
        /** @type {?} */
        const ins = {
            toastId: this.index,
            message: message || '',
            toastRef,
            onShown: toastRef.afterActivate(),
            onHidden: toastRef.afterClosed(),
            onTap: toastPackage.onTap(),
            onAction: toastPackage.onAction(),
            portal,
        };
        if (!keepInactive) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                ins.toastRef.activate();
                this.currentlyActive = this.currentlyActive + 1;
            }));
        }
        this.toasts.push(ins);
        return ins;
    }
}
ToastrService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ToastrService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [TOAST_CONFIG,] }] },
    { type: Overlay },
    { type: Injector },
    { type: DomSanitizer },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    ToastrService.prototype.toastrConfig;
    /** @type {?} */
    ToastrService.prototype.currentlyActive;
    /** @type {?} */
    ToastrService.prototype.toasts;
    /** @type {?} */
    ToastrService.prototype.overlayContainer;
    /** @type {?} */
    ToastrService.prototype.previousToastMessage;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.index;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ToastContainerDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    getContainerElement() {
        return this.el.nativeElement;
    }
}
ToastContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[toastContainer]',
                exportAs: 'toastContainer',
            },] }
];
/** @nocollapse */
ToastContainerDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastContainerDirective.prototype.el;
}
class ToastContainerModule {
}
ToastContainerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ToastContainerDirective],
                exports: [ToastContainerDirective],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotifyService {
    /**
     * @param {?} http
     * @param {?} toastService
     */
    constructor(http, toastService) {
        this.http = http;
        this.toastService = toastService;
        this.url = {
            list: iNet.getPUrl('social/activity/notify')
        };
        this.toastService.overlayContainer = this.toastContainer;
    }
    /**
     * @return {?}
     */
    count() {
        return this.http.getJSON(this.url.list);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getMessage(params) {
        return this.http.getJSON(this.url.list, params);
    }
    /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    showMessage(msg, type, title = 'Thông báo', config = {}) {
        switch (type) {
            case 'info':
                this.toastService.info(msg, title, config);
                break;
            case 'error':
                this.toastService.error(msg, title, config);
                break;
            case 'warning':
                this.toastService.warning(msg, title, config);
                break;
            case 'success':
            default:
                this.toastService.success(msg, title, config);
        }
    }
    /**
     * @return {?}
     */
    getNotifyService() {
        return this.toastService;
    }
}
NotifyService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotifyService.ctorParameters = () => [
    { type: HttpClientService },
    { type: ToastrService }
];
NotifyService.propDecorators = {
    toastContainer: [{ type: ViewChild, args: [ToastContainerDirective,] }]
};
if (false) {
    /** @type {?} */
    NotifyService.prototype.toastContainer;
    /**
     * @type {?}
     * @private
     */
    NotifyService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    NotifyService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    NotifyService.prototype.toastService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Toast {
    /**
     * @param {?} toastrService
     * @param {?} toastPackage
     * @param {?=} ngZone
     */
    constructor(toastrService, toastPackage, ngZone) {
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        /**
         * width of progress bar
         */
        this.width = -1;
        /**
         * a combination of toast type and options.toastClass
         */
        this.toastClasses = '';
        /**
         * controls animation
         */
        this.state = {
            value: 'inactive',
            params: {
                easeTime: this.toastPackage.config.easeTime,
                easing: 'ease-in',
            },
        };
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe((/**
         * @return {?}
         */
        () => {
            this.activateToast();
        }));
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe((/**
         * @return {?}
         */
        () => {
            this.remove();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    }
    /**
     * activates toast and sets timeout
     * @return {?}
     */
    activateToast() {
        this.state = Object.assign({}, this.state, { value: 'active' });
        if (!this.options.disableTimeOut && this.options.timeOut) {
            this.outsideTimeout((/**
             * @return {?}
             */
            () => this.remove()), this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.outsideInterval((/**
                 * @return {?}
                 */
                () => this.updateProgress()), 10);
            }
        }
    }
    /**
     * updates progress bar width
     * @return {?}
     */
    updateProgress() {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        /** @type {?} */
        const now = new Date().getTime();
        /** @type {?} */
        const remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    }
    /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    remove() {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = Object.assign({}, this.state, { value: 'removed' });
        this.outsideTimeout((/**
         * @return {?}
         */
        () => this.toastrService.remove(this.toastPackage.toastId)), +this.toastPackage.config.easeTime);
    }
    /**
     * @return {?}
     */
    tapToast() {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    }
    /**
     * @return {?}
     */
    stickAround() {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    }
    /**
     * @return {?}
     */
    delayedHideToast() {
        if (this.options.disableTimeOut
            || this.options.extendedTimeOut === 0
            || this.state.value === 'removed') {
            return;
        }
        this.outsideTimeout((/**
         * @return {?}
         */
        () => this.remove()), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval((/**
             * @return {?}
             */
            () => this.updateProgress()), 10);
        }
    }
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    outsideTimeout(func, timeout) {
        if (this.ngZone) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => this.timeout = setTimeout((/**
             * @return {?}
             */
            () => this.runInsideAngular(func)), timeout)));
        }
        else {
            this.timeout = setTimeout((/**
             * @return {?}
             */
            () => func()), timeout);
        }
    }
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    outsideInterval(func, timeout) {
        if (this.ngZone) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => this.intervalId = setInterval((/**
             * @return {?}
             */
            () => this.runInsideAngular(func)), timeout)));
        }
        else {
            this.intervalId = setInterval((/**
             * @return {?}
             */
            () => func()), timeout);
        }
    }
    /**
     * @private
     * @param {?} func
     * @return {?}
     */
    runInsideAngular(func) {
        if (this.ngZone) {
            this.ngZone.run((/**
             * @return {?}
             */
            () => func()));
        }
        else {
            func();
        }
    }
}
Toast.decorators = [
    { type: Component, args: [{
                selector: '[toast-component]',
                template: `
        <button *ngIf="options.closeButton" (click)="remove()" class="toast-close-button" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
            {{ title }}
        </div>
        <div *ngIf="message && options.enableHtml" role="alertdialog" aria-live="polite"
             [class]="options.messageClass" [innerHTML]="message">
        </div>
        <div *ngIf="message && !options.enableHtml" role="alertdialog" aria-live="polite"
             [class]="options.messageClass" [attr.aria-label]="message">
            {{ message }}
        </div>
        <div *ngIf="options.progressBar">
            <div class="toast-progress" [style.width]="width + '%'"></div>
        </div>
    `,
                animations: [
                    trigger('flyInOut', [
                        state('inactive', style({
                            display: 'none',
                            opacity: 0,
                        })),
                        state('active', style({})),
                        state('removed', style({ opacity: 0 })),
                        transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
                        transition('active => removed', animate('{{ easeTime }}ms {{ easing }}')),
                    ]),
                ],
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
Toast.ctorParameters = () => [
    { type: ToastrService },
    { type: ToastPackage },
    { type: NgZone }
];
Toast.propDecorators = {
    toastClasses: [{ type: HostBinding, args: ['class',] }],
    state: [{ type: HostBinding, args: ['@flyInOut',] }],
    tapToast: [{ type: HostListener, args: ['click',] }],
    stickAround: [{ type: HostListener, args: ['mouseenter',] }],
    delayedHideToast: [{ type: HostListener, args: ['mouseleave',] }]
};
if (false) {
    /** @type {?} */
    Toast.prototype.message;
    /** @type {?} */
    Toast.prototype.title;
    /** @type {?} */
    Toast.prototype.options;
    /**
     * width of progress bar
     * @type {?}
     */
    Toast.prototype.width;
    /**
     * a combination of toast type and options.toastClass
     * @type {?}
     */
    Toast.prototype.toastClasses;
    /**
     * controls animation
     * @type {?}
     */
    Toast.prototype.state;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.timeout;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.intervalId;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.hideTime;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.sub1;
    /**
     * @type {?}
     * @protected
     */
    Toast.prototype.toastrService;
    /** @type {?} */
    Toast.prototype.toastPackage;
    /**
     * @type {?}
     * @protected
     */
    Toast.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DefaultGlobalConfig {
    constructor() {
        // Global
        this.maxOpened = 0;
        this.autoDismiss = false;
        this.newestOnTop = true;
        this.preventDuplicates = false;
        this.iconClasses = {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
        };
        // Individual
        this.toastComponent = Toast;
        this.closeButton = false;
        this.timeOut = 5000;
        this.extendedTimeOut = 1000;
        this.enableHtml = false;
        this.progressBar = false;
        this.toastClass = 'toast';
        this.positionClass = 'toast-top-right';
        this.titleClass = 'toast-title';
        this.messageClass = 'toast-message';
        this.easing = 'ease-in';
        this.easeTime = 300;
        this.tapToDismiss = true;
        this.onActivateTick = false;
        this.progressAnimation = 'decreasing';
    }
}
if (false) {
    /** @type {?} */
    DefaultGlobalConfig.prototype.maxOpened;
    /** @type {?} */
    DefaultGlobalConfig.prototype.autoDismiss;
    /** @type {?} */
    DefaultGlobalConfig.prototype.newestOnTop;
    /** @type {?} */
    DefaultGlobalConfig.prototype.preventDuplicates;
    /** @type {?} */
    DefaultGlobalConfig.prototype.iconClasses;
    /** @type {?} */
    DefaultGlobalConfig.prototype.toastComponent;
    /** @type {?} */
    DefaultGlobalConfig.prototype.closeButton;
    /** @type {?} */
    DefaultGlobalConfig.prototype.disableTimeOut;
    /** @type {?} */
    DefaultGlobalConfig.prototype.timeOut;
    /** @type {?} */
    DefaultGlobalConfig.prototype.extendedTimeOut;
    /** @type {?} */
    DefaultGlobalConfig.prototype.enableHtml;
    /** @type {?} */
    DefaultGlobalConfig.prototype.progressBar;
    /** @type {?} */
    DefaultGlobalConfig.prototype.toastClass;
    /** @type {?} */
    DefaultGlobalConfig.prototype.positionClass;
    /** @type {?} */
    DefaultGlobalConfig.prototype.titleClass;
    /** @type {?} */
    DefaultGlobalConfig.prototype.messageClass;
    /** @type {?} */
    DefaultGlobalConfig.prototype.easing;
    /** @type {?} */
    DefaultGlobalConfig.prototype.easeTime;
    /** @type {?} */
    DefaultGlobalConfig.prototype.tapToDismiss;
    /** @type {?} */
    DefaultGlobalConfig.prototype.onActivateTick;
    /** @type {?} */
    DefaultGlobalConfig.prototype.progressAnimation;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ToastrModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('ToastrModule is already loaded. It should only be imported in your application\'s main module.');
        }
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: ToastrModule,
            providers: [
                { provide: TOAST_CONFIG, useValue: { config, defaults: DefaultGlobalConfig } },
                OverlayContainer,
                Overlay,
                ToastrService
            ],
        };
    }
}
ToastrModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Toast],
                declarations: [Toast],
                entryComponents: [Toast],
            },] }
];
/** @nocollapse */
ToastrModule.ctorParameters = () => [
    { type: ToastrModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotifyModule {
    /**
     * @param {?} service
     */
    constructor(service) {
        // Override show message function
        NotificationService.prototype.showMessage = (/**
         * @param {?} msg
         * @param {?} type
         * @param {?} title
         * @param {?} config
         * @return {?}
         */
        function (msg, type, title, config) {
            service.showMessage(msg, type, title, config);
        });
    }
}
NotifyModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ToastrModule.forRoot(),
                    ToastContainerModule
                ],
                declarations: [],
                exports: [ToastrModule, ToastContainerModule],
                providers: [NotifyService, ToastrService]
            },] }
];
/** @nocollapse */
NotifyModule.ctorParameters = () => [
    { type: NotifyService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Contact {
    constructor() {
        this.address = new Address();
    }
}
if (false) {
    /** @type {?} */
    Contact.prototype.salutationType;
    /** @type {?} */
    Contact.prototype.sex;
    /** @type {?} */
    Contact.prototype.firstName;
    /** @type {?} */
    Contact.prototype.lastName;
    /** @type {?} */
    Contact.prototype.middleName;
    /** @type {?} */
    Contact.prototype.fullName;
    /** @type {?} */
    Contact.prototype.primaryEmail;
    /** @type {?} */
    Contact.prototype.officePhone;
    /** @type {?} */
    Contact.prototype.mobilePhone;
    /** @type {?} */
    Contact.prototype.homePhone;
    /** @type {?} */
    Contact.prototype.fax;
    /** @type {?} */
    Contact.prototype.dateOfBirth;
    /** @type {?} */
    Contact.prototype.fullDateOfBirth;
    /** @type {?} */
    Contact.prototype.organId;
    /** @type {?} */
    Contact.prototype.organName;
    /** @type {?} */
    Contact.prototype.title;
    /** @type {?} */
    Contact.prototype.department;
    /** @type {?} */
    Contact.prototype.contactType;
    /** @type {?} */
    Contact.prototype.leadSource;
    /** @type {?} */
    Contact.prototype.address;
    /** @type {?} */
    Contact.prototype.addressStr;
    /** @type {?} */
    Contact.prototype.description;
    /** @type {?} */
    Contact.prototype.status;
    /** @type {?} */
    Contact.prototype.uuid;
    /** @type {?} */
    Contact.prototype.type;
    /** @type {?} */
    Contact.prototype.avatar;
    /** @type {?} */
    Contact.prototype.userCode;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GlobalContactService {
    /**
     * @param {?} http
     * @param {?} userProfileService
     */
    constructor(http, userProfileService) {
        this.http = http;
        this.userProfileService = userProfileService;
        this.url = {
            // update: iNet.getPUrl('gl/contact/update'),
            update: iNet.getPUrl('system/userprofile/update'),
            upload_photo: iNet.getPUrl('system/userprofile/photoupdate'),
            delete_photo: iNet.getPUrl('system/userprofile/delphoto'),
            update_signature: iNet.getPUrl('system/userprofile/updatesign'),
            remove_signature: iNet.getPUrl('system/userprofile/delsign'),
            view_signature_photo: iNet.getPUrl('usersignature/photo'),
            access_roles: iNet.getPUrl('cloud/subfirmrole/group')
        };
    }
    /**
     * @return {?}
     */
    getProfile() {
        return this.userProfileService.getProfile();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    update(data) {
        this.showLoading();
        /** @type {?} */
        const contact = Object.assign(new Contact(), data);
        if (contact.address) {
            contact.addressStr = JSON.stringify(contact.address);
        }
        if (contact.fullDateOfBirth) {
            contact.dateOfBirth = contact.fullDateOfBirth.getTime();
        }
        delete contact.address;
        delete contact.fullName;
        return this.http.postJSON(this.url.update, contact);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    uploadPhoto(data) {
        this.http.showLoading();
        return this.http.post(this.url.upload_photo, data);
    }
    /**
     * @return {?}
     */
    deleteAvatar() {
        this.http.showLoading();
        return this.http.post(this.url.delete_photo, null);
    }
    /**
     * @return {?}
     */
    showLoading() {
        this.http.showLoading();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    uploadSignaturePhoto(data) {
        this.http.showLoading();
        return this.http.post(this.url.update_signature, data);
    }
    /**
     * @return {?}
     */
    getSignatureImageUrl() {
        return this.url.view_signature_photo;
    }
    /**
     * @return {?}
     */
    getAccessRoles() {
        return this.http.postJSON(this.url.access_roles);
    }
}
GlobalContactService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GlobalContactService.ctorParameters = () => [
    { type: HttpClientService },
    { type: UserProfileService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    GlobalContactService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    GlobalContactService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    GlobalContactService.prototype.userProfileService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const newPassword = new FormControl('', Validators.required);
/** @type {?} */
const confirmNewPassword = new FormControl('', CustomValidators.equalTo(newPassword));
class BootstrapUserProfileComponent {
    /**
     * @param {?} location
     * @param {?} fb
     * @param {?} translate
     * @param {?} notificationService
     * @param {?} contactService
     * @param {?} userProfileService
     * @param {?} coreService
     */
    constructor(location, fb, translate, notificationService, contactService, userProfileService, coreService) {
        this.location = location;
        this.fb = fb;
        this.translate = translate;
        this.notificationService = notificationService;
        this.contactService = contactService;
        this.userProfileService = userProfileService;
        this.coreService = coreService;
        this.generalFormValid = false;
        this.password = new NewPassword();
        this.tabName = 'profile-general-info'; //default tab
        this.userProfile = new UserProfile();
        this.translateSubscription = translate.get(['COMMON.MODULE.USER_PROFILE']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.userTranslations = res['COMMON.MODULE.USER_PROFILE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadProfile();
        this.frmChangePassword = this.fb.group({
            password: [null, Validators.required],
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        });
        this.frmSignature = this.fb.group({
            signVerify: [null, Validators.required],
            fileUpload: [null, Validators.required]
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    loadProfile() {
        this.userProfileService.getProfile().subscribe((/**
         * @param {?} profile
         * @return {?}
         */
        (profile) => {
            this.userProfile = Object.assign(new UserProfile(), profile);
            this.profile = Object.assign(new Contact(), profile);
            // console.log("profile on load: ",this.profile);
            this.profile.lastName = this.userProfile.lname;
            this.profile.middleName = this.userProfile.mname;
            this.profile.firstName = this.userProfile.fname;
            if (this.userProfile.birthday) {
                this.profile.fullDateOfBirth = new Date(this.userProfile.birthday);
            }
            if (this.userProfile.phone) {
                this.profile.mobilePhone = this.userProfile.phone;
            }
            if (this.userProfile.email) {
                this.profile.primaryEmail = this.userProfile.email;
            }
            // if (this.profile.dateOfBirth) {
            //     this.profile.fullDateOfBirth = new Date(this.profile.dateOfBirth);
            // }
            this.profile.fullName = [this.profile.lastName, this.profile.middleName, this.profile.firstName].join(' ');
            if (!this.profile.address) {
                this.profile.address = new Address();
            }
            /*
            if (this.profile.avatar) {
                let avatarUrl: string;
                avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
                if (this.userProfileService.getAvatarVersion() > 0) {
                    avatarUrl = `${avatarUrl}?version=${this.userProfileService.getAvatarVersion()}`;
                }
                this.avatarUrl = avatarUrl;
            }
             */
        }));
        this.userProfileService.getAvatarUrl().then((/**
         * @param {?} url
         * @return {?}
         */
        url => {
            this.avatarUrl = url;
        }));
        this.userProfileService.getSignPictureId().then((/**
         * @param {?} pictureId
         * @return {?}
         */
        pictureId => {
            if (pictureId) { //get signature image from contact service
                this.signatureUrl = this.contactService.getSignatureImageUrl();
            }
        }));
        this.userProfileService.getSignVerifyNumber().then((/**
         * @param {?} signVerifyNumber
         * @return {?}
         */
        signVerifyNumber => {
            if (signVerifyNumber) { //get signature image from contact service
                this.signVerifyNumber = signVerifyNumber;
            }
        }));
        /*
        this.contactService.getProfile().subscribe((data: Contact) => {
            this.profile = Object.assign(new Contact(), data);
            if (this.profile.dateOfBirth) {
                this.profile.fullDateOfBirth = new Date(this.profile.dateOfBirth);
            }
            this.profile.fullName = [this.profile.lastName, this.profile.middleName, this.profile.firstName].join(' ');
            if (!this.profile.address) {
                this.profile.address = new Address();
            }
            if(this.profile.avatar) {
                this.avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
            }
        });
        */
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChange($event) {
        this.generalFormValid = $event;
    }
    /**
     * @return {?}
     */
    back() {
        this.location.back();
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    updateProfile($event) {
        if (this.generalFormValid) {
            /** @type {?} */
            let userProfile = Object.assign(new UserProfile(), this.profile);
            // console.log(userProfile, this.profile);
            userProfile.fname = this.profile.firstName;
            userProfile.mname = this.profile.middleName;
            userProfile.lname = this.profile.lastName;
            if (this.profile.fullDateOfBirth) {
                userProfile.birthday = this.profile.fullDateOfBirth.valueOf();
            }
            if (this.profile.mobilePhone) {
                userProfile.phone = this.profile.mobilePhone;
            }
            if (this.profile.primaryEmail) {
                userProfile.email = this.profile.primaryEmail;
            }
            if (userProfile.address) {
                userProfile.addressStr = JSON.stringify(userProfile.address);
            }
            delete userProfile.address;
            delete userProfile.fullName;
            this.userProfileService.update(userProfile).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                const { TITLE, UPDATE_PROFILE_SUCCESSFUL_MSG, UPDATE_PROFILE_ERROR_MSG } = this.userTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    this.notificationService.showMessage(UPDATE_PROFILE_SUCCESSFUL_MSG, 'success', TITLE);
                }
                else {
                    this.notificationService.showMessage(UPDATE_PROFILE_ERROR_MSG, 'error', TITLE);
                }
            }));
        }
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    changePassword($event) {
        if (this.frmChangePassword.valid) {
            this.contactService.showLoading();
            this.userProfileService.changePassword(this.password).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                const { USERNAME, CHANGE_PASSWORD_SUCCESSFUL_MSG, CURRENT_PASSWORD_INCORRECT, CHANGE_PASSWORD_ERROR_MSG } = this.userTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    if ("SUCCESS" === data.uuid) {
                        this.notificationService.showMessage(CHANGE_PASSWORD_SUCCESSFUL_MSG, 'sucsess', USERNAME);
                        this.frmChangePassword.reset();
                    }
                    else {
                        this.notificationService.showMessage(CURRENT_PASSWORD_INCORRECT, 'error', USERNAME);
                    }
                }
                else {
                    this.notificationService.showMessage(CHANGE_PASSWORD_ERROR_MSG, 'error', USERNAME);
                }
            }));
        }
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    updateSignature($event) {
        if (this.frmSignature.valid) {
            /** @type {?} */
            const formData = new FormData(this.frmSignaturePhotoElementRef.nativeElement);
            // Upload Signature
            this.contactService.uploadSignaturePhoto(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                const { SIGNATURE_INFORMATION, UPDATE_SIGNATURE_SUCCESSFUL_MSG, UPDATE_SIGNATURE_ERROR_MSG } = this.userTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    this.notificationService.showMessage(UPDATE_SIGNATURE_SUCCESSFUL_MSG, 'success', SIGNATURE_INFORMATION);
                }
                else {
                    this.notificationService.showMessage(UPDATE_SIGNATURE_ERROR_MSG, 'error', SIGNATURE_INFORMATION);
                }
            }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeSignatureFile($event) {
        /** @type {?} */
        const files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            const image = files[0];
            if (image) {
                this.fileName = image['name'];
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    image.url = e.target.result;
                    this.signatureUrl = image.url;
                });
                reader.readAsDataURL(image);
            }
        }
        else {
            this.signatureUrl = null;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelectSignatureFile($event) {
        if (this.signatureFileUpload && this.signatureFileUpload.nativeElement) {
            this.signatureFileUpload.nativeElement.click();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.signatureUrl = iNet.BLANK_IMAGE_URL;
        }
    }
    /**
     * @return {?}
     */
    clearSignatureForm() {
        if (this.signatureFileUpload.nativeElement.value) {
            this.signatureFileUpload.nativeElement.value = '';
            this.fileName = '';
            if (this.profile.avatar) {
                this.avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
            }
        }
    }
    /**
     * @param {?} tabName
     * @return {?}
     */
    onSelectTab(tabName) {
        this.tabName = tabName;
    }
}
BootstrapUserProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-bootstrap-user-profile',
                template: "<div class=\"default-layout tb-visible\">\n    <app-common-toolbar></app-common-toolbar>\n    <div *ngIf=\"tabName!=='sharing-information'\" class=\"container-fluid nav-fixed-top cp-toolbar\">\n        <button *ngIf=\"tabName=='profile-general-info'\" [title]=\"'C\u1EADp nh\u1EADt th\u00F4ng tin c\u00E1 nh\u00E2n'\" (click)=\"updateProfile($event)\" class=\"btn btn-primary btn-sm\" [disabled]=\"!generalFormValid\" type=\"button\">\n            <i class=\"fa fa-save\"></i>\n        </button>\n        <button *ngIf=\"tabName==='profile-signature-info'\" [title]=\"'C\u1EADp nh\u1EADt ch\u1EEF k\u00FD s\u1ED1'\" class=\"btn btn-primary btn-sm\" [disabled]=\"!frmSignature.valid\" type=\"button\"\n                (click)=\"updateSignature($event)\">\n            <i class=\"fa fa-save\"></i> <!--{{'COMMON.MODULE.USER_PROFILE.UPDATE_SIGNATURE' | translate}}-->\n        </button>\n        <button *ngIf=\"tabName==='profile-security-info'\" [title]=\"'\u0110\u1ED5i m\u1EADt kh\u1EA9u'\" class=\"btn btn-primary btn-sm\" [disabled]=\"!frmChangePassword.valid\" type=\"button\"\n                (click)=\"changePassword($event)\">\n                <i class=\"fa fa-key\"></i> <!--{{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD' | translate}}-->\n        </button>\n    </div>\n    <div class=\"cp-content\" [ngClass]=\"tabName==='sharing-information'?'toolbar-none':''\">\n        <div class=\"container-fluid p-1\">\n            <app-user-profile *ngIf=\"profile\" [profile]=\"profile\" [imageAvatarUrl]=\"avatarUrl\" [upload]=\"true\">\n                <ng-template #tabContent>\n                    <tabset>\n                        <tab (select)=\"onSelectTab('profile-general-info')\" id=\"profile-general-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.GENERAL_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"mt-3\">\n                                <app-user-profile-info [profile]=\"profile\" [editable]=\"true\" (onValidate)=\"onChange($event)\"></app-user-profile-info>\n                            </div>\n<!--                            <div class=\"form-group margin-b-form-group row\">-->\n<!--                                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                <div class=\"col-sm-9 pl-0\">-->\n<!--                                    <button class=\"btn btn-primary btn-sm\" [disabled]=\"!generalFormValid\" type=\"button\" (click)=\"updateProfile($event)\">-->\n<!--                                        <i class=\"fa fa-save\"></i> {{'TOOLBAR.UPDATE' | translate}}-->\n<!--                                    </button>-->\n<!--                                </div>-->\n<!--                            </div>-->\n                        </tab>\n                        <tab (select)=\"onSelectTab('profile-signature-info')\" id=\"profile-signature-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-gear margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <form #frmSignaturePhoto [formGroup]=\"frmSignature\" (ngSubmit)=\"updateSignature($event)\" class=\"col-sm-12\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_VERIFY' | translate}}  <i class=\"required\"></i>:</label>\n                                            <div class=\"col-sm-4 pl-0\">\n                                                <div class=\"input-group\">\n                                                    <div class=\"input-group-prepend\">\n                                                        <div class=\"input-group-text\"><i class=\"fa fa-phone\"></i></div>\n                                                    </div>\n                                                    <input [formControl]=\"frmSignature.controls['signVerify']\" [(ngModel)]=\"signVerifyNumber\" name=\"phone\"\n                                                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                                                           [ngClass]=\"{'is-invalid':frmSignature.controls['signVerify'].hasError('required')\n                                                            && frmSignature.controls['signVerify'].touched}\"\n                                                           type=\"text\" maxlength=\"64\"/>\n                                                </div>\n                                                <div *ngIf=\"frmSignature.controls['signVerify'].hasError('required') && frmSignature.controls['signVerify'].touched\" class=\"text-danger mt-1\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_VERIFY_REQUIRED_MSG' | translate}}\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_FILE' | translate}}  <i class=\"required\"></i>:\n                                            </label>\n                                            <div class=\"col-sm-4 pl-0\">\n                                                <label class=\"i-file-input\">\n                                                    <input #signatureFileUpload [formControl]=\"frmSignature.controls['fileUpload']\" required\n                                                           name=\"fileUpload\" type=\"file\" accept=\"image/*\" (change)=\"changeSignatureFile($event)\"\n                                                           class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                                                        <span class=\"i-file-container\" [ngClass]=\"{'selected': fileName}\" [attr.data-title]=\"'COMMON.MODULE.USER_PROFILE.CHOOSE' | translate\">\n                                                            <span class=\"i-file-name\" [attr.data-title]=\"fileName || ('COMMON.MODULE.USER_PROFILE.NO_FILE' | translate)\">\n                                                                <i class=\"file-icon fa fa-upload\"></i>\n                                                            </span>\n                                                        </span>\n                                                    <a class=\"remove\" *ngIf=\"fileName\" href=\"javascript:;\" (click)=\"clearSignatureForm()\">\n                                                        <i class=\"fa fa-times\"></i>\n                                                    </a>\n                                                </label>\n                                                <!--input #signatureFileUpload [formControl]=\"frmSignature.controls['fileUpload']\" required\n                                                       name=\"fileUpload\" type=\"file\" accept=\"image/*\" (change)=\"changeSignatureFile($event)\"\n                                                       class=\"form-control form-control-sm col-xs-12 col-sm-12\"-->\n                                                <div *ngIf=\"!signatureUrl || frmSignature.controls['fileUpload'].hasError('required') && frmSignature.controls['fileUpload'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_FILE_REQUIRED_MSG' | translate}}\n                                                </div>\n                                                <div class=\"thumb-xl member-thumb mt-3 m-b-10 center-block\">\n                                                    <img *ngIf=\"signatureUrl\" (click)=\"onSelectSignatureFile($event)\" [src]=\"signatureUrl\" (error)=\"updateBlankImage($event)\"\n                                                         class=\"signature-thumbnail border\" alt=\"Signature\">\n                                                    <div *ngIf=\"!signatureUrl\" class=\"text-center upload-signature-photo mt-3\" (click)=\"onSelectSignatureFile($event)\">\n                                                        <i aria-hidden=\"true\" class=\"fa fa-picture-o\"></i>\n                                                    </div>\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n<!--                                    <div class=\"col-sm-12 mt-3\">-->\n<!--                                        <div class=\"form-group margin-b-form-group row\">-->\n<!--                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                            <div class=\"col-sm-9 pl-0\">-->\n<!--                                                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!frmSignature.valid\" type=\"button\" (click)=\"updateSignature($event)\">-->\n<!--                                                    <i class=\"fa fa-save\"></i> {{'COMMON.MODULE.USER_PROFILE.UPDATE_SIGNATURE' | translate}}-->\n<!--                                                </button>-->\n<!--                                            </div>-->\n<!--                                        </div>-->\n<!--                                    </div>-->\n                                </form>\n\n                            </div>\n                        </tab>\n                        <!--tab id=\"profile-access-role\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-user-secret margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.ACCESS_ROLE' | translate}}</b>\n                            </ng-template>\n                            <div class=\"mt-3\">\n                                <app-access-role></app-access-role>\n                            </div>\n                        </tab-->\n                        <tab (select)=\"onSelectTab('profile-security-info')\" id=\"profile-security-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-lock margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.SECURITY_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <form [formGroup]=\"frmChangePassword\" (ngSubmit)=\"changePassword($event)\" class=\"col-sm-12\">\n                                    <div class=\"col-sm-12 alert alert-info\">\n                                        {{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD_INFO_MSG' | translate}}\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.CURRENT_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.oldpass\" name=\"password\"\n                                                       [formControl]=\"frmChangePassword.controls['password']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid':frmChangePassword.controls['password'].hasError('required')\n                                                        && frmChangePassword.controls['password'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['password'].hasError('required')\n                                                 && frmChangePassword.controls['password'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.CURRENT_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.NEW_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.newpass\" name=\"newPassword\"\n                                                       [formControl]=\"frmChangePassword.controls['newPassword']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid':frmChangePassword.controls['newPassword'].hasError('required')\n                                                        && frmChangePassword.controls['newPassword'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['newPassword'].hasError('required')\n                                                 && frmChangePassword.controls['newPassword'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.NEW_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.CONFIRM_NEW_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.confirmpass\" name=\"confirmNewPassword\"\n                                                       [formControl]=\"frmChangePassword.controls['confirmNewPassword']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid': (frmChangePassword.controls['confirmNewPassword'].hasError('required')\n                                                        || frmChangePassword.controls['confirmNewPassword'].hasError('equalTo'))\n                                                        && frmChangePassword.controls['confirmNewPassword'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['confirmNewPassword'].hasError('required')\n                                                 && frmChangePassword.controls['confirmNewPassword'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.CONFIRM_NEW_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n\n                                                <div *ngIf=\"frmChangePassword.controls['confirmNewPassword'].hasError('equalTo')\n                                                 && frmChangePassword.controls['confirmNewPassword'].touched\"  class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.PASSWORD_DO_NOT_MATCH' | translate}}\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n<!--                                    <div class=\"col-sm-12\">-->\n<!--                                        <div class=\"form-group margin-b-form-group row\">-->\n<!--                                        <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                            <div class=\"col-sm-9 pl-0\">-->\n<!--                                                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!frmChangePassword.valid\" type=\"button\" (click)=\"changePassword($event)\">-->\n<!--                                                    <i class=\"fa fa-key\"></i> {{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD' | translate}}-->\n<!--                                                </button>-->\n<!--                                            </div>-->\n<!--                                        </div>-->\n<!--                                    </div>-->\n                                </form>\n                            </div>\n                        </tab>\n                        <tab (select)=\"onSelectTab('sharing-information')\" id=\"sharing-information\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-share-alt-square margin-r-5\"></i> {{'Chia s\u1EBB th\u00F4ng tin' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <div class=\"col-lg-12 p-0\">\n                                    <app-sharing-information-template></app-sharing-information-template>\n                                </div>\n                            </div>\n                        </tab>\n                    </tabset>\n                </ng-template>\n            </app-user-profile>\n        </div>\n    </div>\n</div>\n",
                styles: [':host { width: 100%; }']
            }] }
];
/** @nocollapse */
BootstrapUserProfileComponent.ctorParameters = () => [
    { type: Location },
    { type: FormBuilder },
    { type: TranslateService },
    { type: NotificationService },
    { type: GlobalContactService },
    { type: UserProfileService },
    { type: CoreService }
];
BootstrapUserProfileComponent.propDecorators = {
    profile: [{ type: Input }],
    frmSignaturePhotoElementRef: [{ type: ViewChild, args: ['frmSignaturePhoto',] }],
    signatureFileUpload: [{ type: ViewChild, args: ['signatureFileUpload',] }]
};
if (false) {
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.profile;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.generalFormValid;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.password;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.frmChangePassword;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.frmSignature;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.avatarUrl;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.signatureUrl;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.tabName;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.navButtonTitle;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.userTranslations;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.translateSubscription;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.userProfile;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.fileName;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.signVerifyNumber;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.frmSignaturePhotoElementRef;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.signatureFileUpload;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.notificationService;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.contactService;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.userProfileService;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.coreService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OrganizationInformation {
}
if (false) {
    /** @type {?} */
    OrganizationInformation.prototype.organId;
    /** @type {?} */
    OrganizationInformation.prototype.secret;
    /** @type {?} */
    OrganizationInformation.prototype.mercuryAPIKey;
    /** @type {?} */
    OrganizationInformation.prototype.mercurySecret;
    /** @type {?} */
    OrganizationInformation.prototype.orgName;
    /** @type {?} */
    OrganizationInformation.prototype.email;
    /** @type {?} */
    OrganizationInformation.prototype.address1;
    /** @type {?} */
    OrganizationInformation.prototype.phone;
    /** @type {?} */
    OrganizationInformation.prototype.city;
    /** @type {?} */
    OrganizationInformation.prototype.fax;
    /** @type {?} */
    OrganizationInformation.prototype.country;
    /** @type {?} */
    OrganizationInformation.prototype.languageUsed;
    /** @type {?} */
    OrganizationInformation.prototype.logo;
    /** @type {?} */
    OrganizationInformation.prototype.uriPrefix;
    /** @type {?} */
    OrganizationInformation.prototype.acctPrxDomain;
    /** @type {?} */
    OrganizationInformation.prototype.byteDataUsed;
    /** @type {?} */
    OrganizationInformation.prototype.expiredDate;
    /** @type {?} */
    OrganizationInformation.prototype.activedDate;
    /** @type {?} */
    OrganizationInformation.prototype.status;
    /** @type {?} */
    OrganizationInformation.prototype.glorganprofileload;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocationService {
    // store district by province code
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            // list_country: iNet.getPUrl('cloudapp/country/list'),
            // list_city: iNet.getPUrl('cloudapp/city/list'),
            // list_district: iNet.getPUrl('cloudapp/district/list'),
            list_country: iNet.getPUrl('gl/country/list'),
            list_city: iNet.getPUrl('gl/city/list'),
            list_district: iNet.getPUrl('gl/district/list')
        };
        this.$provinceCache = {};
        this.$districtCache = {};
        this.provinceData = {}; // store province by country code
        // store province by country code
        this.districtData = {}; // store district by province code
        return LocationService.instance = LocationService.instance || this;
    }
    /**
     * @private
     * @return {?}
     */
    getCountry() {
        return this.http.getJSON(this.url.list_country).do((/**
         * @param {?} res
         * @return {?}
         */
        res => this.countries = res['items']));
    }
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    _getProvinceByCountryCode(countryCode) {
        return this.http.getJSON(this.url.list_city, { countryCode: countryCode })
            .do((/**
         * @param {?} res
         * @return {?}
         */
        res => this.provinceData[countryCode] = res['items']));
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    _getDistrictByCode(countryCode, provinceCode) {
        /** @type {?} */
        const key = countryCode + '_' + provinceCode;
        return this.http.getJSON(this.url.list_district, { countryCode: countryCode, cityCode: provinceCode })
            .do((/**
         * @param {?} res
         * @return {?}
         */
        res => this.districtData[key] = res['items']));
    }
    /**
     * @return {?}
     */
    listCountry() {
        if (this.countries) {
            /** @type {?} */
            const responseData = new ResponseData();
            responseData.items = this.countries;
            return Observable.of(responseData);
        }
        if (!this.$countryCache) {
            this.$countryCache = this.getCountry().pipe(shareReplay(1));
        }
        return this.$countryCache;
    }
    /*
         * @deprecated Use getProvinceByCountryCode(countryCode) instead
         */
    /**
     * @param {?} countryId
     * @return {?}
     */
    getProvinceByCountryId(countryId) {
        return this.http.getJSON(this.url.list_city, { country: countryId });
    }
    /*
         * @deprecated Use getDistrictByCode(countryCode, provinceCode) instead
         */
    /**
     * @param {?} uuid
     * @return {?}
     */
    getDistrictByProvinceId(uuid) {
        return this.http.getJSON(this.url.list_district, { city: uuid });
    }
    /**
     * @param {?} countryCode
     * @return {?}
     */
    getProvinceByCountryCode(countryCode) {
        if (this.provinceData[countryCode]) {
            /** @type {?} */
            const responseData = new ResponseData();
            responseData.items = this.provinceData[countryCode];
            return Observable.of(responseData);
        }
        if (!this.$provinceCache[countryCode]) {
            this.$provinceCache[countryCode] = this._getProvinceByCountryCode(countryCode).pipe(shareReplay(1));
        }
        return this.$provinceCache[countryCode];
    }
    /**
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    getDistrictByCode(countryCode, provinceCode) {
        /** @type {?} */
        const key = countryCode + '_' + provinceCode;
        if (this.districtData[key]) {
            /** @type {?} */
            const responseData = new ResponseData();
            responseData.items = this.districtData[key];
            return Observable.of(responseData);
        }
        if (!this.$districtCache[key]) {
            this.$districtCache[key] = this._getDistrictByCode(countryCode, provinceCode).pipe(shareReplay(1));
        }
        return this.$districtCache[key];
    }
}
LocationService.instance = null;
LocationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocationService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    LocationService.instance;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.$countryCache;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.$provinceCache;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.$districtCache;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.countries;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.provinceData;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.districtData;
    /**
     * @type {?}
     * @private
     */
    LocationService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DictionaryService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            find_by_key: iNet.getPUrl('global/category/dicts/fbykeys'),
            get_sex: iNet.getPUrl('gl/contact/profile/sex')
        };
        this.$findObservableCache = {};
        this.store = {};
        this.inventory = {};
        return DictionaryService.instance = DictionaryService.instance || this;
    }
    /**
     * @param {?} keyStr
     * @return {?}
     */
    findByKeys(keyStr) {
        /** @type {?} */
        const keys = keyStr.split(';');
        if (keys.length === 1 && this.inventory.hasOwnProperty(keyStr)) { // single key
            return Observable.of({ data: this.inventory[keyStr] });
        }
        if (this.store[keyStr]) { // multiple keys
            return Observable.of({ data: this.store[keyStr] });
        }
        if (!this.$findObservableCache[keyStr]) {
            this.$findObservableCache[keyStr] = this.http.getJSON(this.url.find_by_key, { keys: keyStr })
                .do((/**
             * @param {?} res
             * @return {?}
             */
            res => this.store[keyStr] = res['data']))
                .do((/**
             * @param {?} res
             * @return {?}
             */
            res => Object.assign(this.inventory, res['data'])))
                .pipe(shareReplay(1));
        }
        return this.$findObservableCache[keyStr];
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    getSex(params) {
        return this.http.postJSON(this.url.get_sex, params);
    }
}
DictionaryService.instance = null;
DictionaryService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DictionaryService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    DictionaryService.instance;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.$findObservableCache;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.store;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.inventory;
    /**
     * @type {?}
     * @private
     */
    DictionaryService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OrganizationGeneralInformationComponent {
    /**
     * @param {?} location
     * @param {?} orgService
     * @param {?} fb
     * @param {?} locationService
     * @param {?} dictionaryService
     * @param {?} translate
     */
    constructor(location, orgService, fb, locationService, dictionaryService, translate) {
        this.location = location;
        this.orgService = orgService;
        this.fb = fb;
        this.locationService = locationService;
        this.dictionaryService = dictionaryService;
        this.translate = translate;
        this.orgInfo = new Organization();
        this.editable = false;
        this.langs = [];
        this.countries = [];
        this.provinces = [];
        this.districts = [];
        this.companySizeCodes = [];
        this.industries = [];
        this.countryCode = 'VN';
        this.onValidate = new EventEmitter();
        this.formChanged = new Subject$1();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.langs = this.translate.getLangs(); // Languages
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.onValidate.emit(v);
        }));
        this.orgInfoForm = this.fb.group({
            name: [null, Validators.required],
            primaryEmail: [null, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')],
            address: [null, null],
            primaryPhone: [null, null],
            foreignName: [null, null],
            abbreviationName: [null, null],
            legalRepName: [null, null],
            taxCode: [null, Validators.required],
            industry: [null, null],
            website: [null, null],
            description: [null, null],
            companySize: [null, null],
            country: [null, null],
            street: [null, null],
            district: [null, null],
            province: [null, null]
        });
        this.orgInfoForm.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this.formChanged.next(this.orgInfoForm.valid);
        }));
        this.loadAddress();
        // this.loadDictionary();
        this.setData(this.orgInfo);
    }
    /**
     * @param {?} org
     * @return {?}
     */
    setData(org) {
        /** @type {?} */
        const controls = this.orgInfoForm.controls;
        controls['name'].setValue(org.name);
        controls['foreignName'].setValue(org.foreignName);
        controls['abbreviationName'].setValue(org.abbreviationName);
        controls['industry'].setValue(org.industry);
        controls['legalRepName'].setValue(org.legalRepName);
        controls['companySize'].setValue(org.companySize);
        controls['taxCode'].setValue(org.taxCode);
        controls['address'].setValue(org.address);
        controls['primaryPhone'].setValue(org.primaryPhone);
        controls['primaryEmail'].setValue(org.primaryEmail);
        controls['website'].setValue(org.website);
        controls['description'].setValue(org.description);
        controls['street'].setValue(org.officeAddress.address);
        controls['country'].setValue(org.officeAddress.countryCode);
        controls['province'].setValue(org.officeAddress.provinceCode);
        controls['district'].setValue(org.officeAddress.districtCode);
        if (this.editable) {
            this.orgInfoForm.enable();
        }
        else {
            this.orgInfoForm.disable();
        }
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const controls = this.orgInfoForm.controls;
        /** @type {?} */
        const data = {
            name: controls['name'].value,
            foreignName: controls['foreignName'].value,
            abbreviationName: controls['abbreviationName'].value,
            industry: controls['industry'].value,
            legalRepName: controls['legalRepName'].value,
            companySize: controls['companySize'].value,
            taxCode: controls['taxCode'].value,
            address: controls['address'].value,
            primaryPhone: controls['primaryPhone'].value,
            primaryEmail: controls['primaryEmail'].value,
            website: controls['website'].value,
            description: controls['description'].value,
        };
        if (controls['street'].value) {
            this.orgInfo.officeAddress.address = controls['street'].value;
        }
        if (controls['country'].value) {
            this.orgInfo.officeAddress.countryCode = controls['country'].value;
        }
        if (controls['province'].value) {
            this.orgInfo.officeAddress.provinceCode = controls['province'].value;
        }
        if (controls['district'].value) {
            this.orgInfo.officeAddress.districtCode = controls['district'].value;
        }
        return Object.assign({}, this.orgInfo, data);
    }
    /*
        private loadDictionary () {
            this.dictionaryService.findByKeys('INDUSTRY;COMPANY_SIZE').subscribe((response: any) => {
                if (ErrorMessage.TYPE !== response.type) {
                    //console.log('industry: ',response);
                    const {data} = response;
                    const {INDUSTRY, COMPANY_SIZE} = data;
                    this.industries = INDUSTRY;
                    this.companySizeCodes = COMPANY_SIZE;
                }
            });
        }
    
         */
    /**
     * @private
     * @return {?}
     */
    loadAddress() {
        this.locationService.listCountry().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.countries = data.items || [];
                if (this.orgInfo.officeAddress.countryCode) {
                    this.loadProvinceByCountryCode(this.orgInfo.officeAddress.countryCode);
                    if (this.orgInfo.officeAddress.provinceCode) {
                        this.loadDistrictByCode(this.orgInfo.officeAddress.countryCode, this.orgInfo.officeAddress.provinceCode);
                    }
                }
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    loadProvinceByCountryCode(countryCode) {
        this.countryCode = countryCode;
        this.provinceCode = null;
        this.districts = [];
        this.locationService.getProvinceByCountryCode(countryCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.provinces = data.items || [];
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    loadDistrictByCode(countryCode, provinceCode) {
        this.provinceCode = provinceCode;
        this.locationService.getDistrictByCode(countryCode, provinceCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.districts = data.items || [];
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeCountry($event) {
        /** @type {?} */
        const target$ = $event.target;
        //const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadProvinceByCountryCode(target$.value);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeProvince($event) {
        /** @type {?} */
        const target$ = $event.target;
        // const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadDistrictByCode(this.countryCode, target$.value);
    }
}
OrganizationGeneralInformationComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-organization-general-information',
                template: "<form [formGroup]=\"orgInfoForm\">\n    <div class=\"row mt-3\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.NAME' | translate}} <i class=\"required\"></i> :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['name']\" name=\"name\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['name'].hasError('required') && orgInfoForm.controls['name'].touched}\"\n                           type=\"text\" maxlength=\"256\" required/>\n                    <div *ngIf=\"orgInfoForm.controls['name'].hasError('required') && orgInfoForm.controls['name'].touched\"\n                         class=\"text-danger\"><i class=\"fa fa-exclamation-triangle\"></i>\n                        {{'COMMON.MODULE.ORGANIZATION.NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.FOREIGN_NAME' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['foreignName']\" name=\"foreignName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"256\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.ABBREVIATION_NAME' | translate}} :</label>\n                <div class=\"col-sm-3\">\n                    <input [formControl]=\"orgInfoForm.controls['abbreviationName']\" name=\"abbreviationName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                </div>\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.INDUSTRY' | translate}} :</label>\n                <div class=\"col-sm-4\">\n                    <input [formControl]=\"orgInfoForm.controls['industry']\" name=\"industry\"\n                           name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"/>\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.LEGAL_REPRESENTATIVE' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['legalRepName']\"  name=\"legalRepName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.COMPANY_SIZE' | translate}} :</label>\n                <div class=\"col-sm-3\">\n                    <input [formControl]=\"orgInfoForm.controls['companySize']\" name=\"companySize\"\n                            name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"/>\n                </div>\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.TAX_CODE' | translate}}  <i class=\"required\"></i>:</label>\n                <div class=\"col-sm-4\">\n                    <input [formControl]=\"orgInfoForm.controls['taxCode']\" name=\"taxCode\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['taxCode'].hasError('required') && orgInfoForm.controls['taxCode'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                    <div *ngIf=\"orgInfoForm.controls['taxCode'].hasError('required') && orgInfoForm.controls['taxCode'].touched\"\n                         class=\"text-danger\"><i class=\"fa fa-exclamation-triangle\"></i>\n                        {{'COMMON.MODULE.ORGANIZATION.TAXCODE_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.BILLING_ADDRESS' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['address']\" name=\"address\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           autocomplete=\"off\" type=\"text\" maxlength=\"1024\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.STREET' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input name=\"street\" [formControl]=\"orgInfoForm.controls['street']\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           type=\"text\" maxlength=\"1024\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.COUNTRY' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['country']\" name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                            (change)=\"onChangeCountry($event)\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.countryCode ? orgInfo.officeAddress.countryCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let country of countries\" [value]=\"country['code']\" [attr.data-uuid]=\"country.uuid\">{{country.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.CITY' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['province']\" name=\"province\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                            (change)=\"onChangeProvince($event)\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.provinceCode ? orgInfo.officeAddress.provinceCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let province of provinces\" [value]=\"province['code']\" [attr.data-uuid]=\"province.uuid\">{{province.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.DISTRICT' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['district']\" name=\"district\" class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.districtCode ? orgInfo.officeAddress.districtCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let district of districts\" [value]=\"district['code']\">{{district.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.PHONE' | translate}} :</label>\n                <div class=\"col-sm-3 input-group\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-phone\"></i></div>\n                    </div>\n                    <input style=\"height: 100%;\" [formControl]=\"orgInfoForm.controls['primaryPhone']\" name=\"primaryPhone\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           type=\"text\" maxlength=\"64\"/>\n                </div>\n\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.EMAIL' | translate}} :</label>\n                <div class=\"col-sm-4 input-group\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></div>\n                    </div>\n                    <input style=\"height: 100%;\" [formControl]=\"orgInfoForm.controls['primaryEmail']\" name=\"primaryEmail\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['primaryEmail'].hasError('pattern') && orgInfoForm.controls['primaryEmail'].touched}\"\n                           type=\"email\" maxlength=\"64\"/>\n                    <div *ngIf=\"orgInfoForm.controls['primaryEmail'].hasError('pattern') && orgInfoForm.controls['primaryEmail'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.ORGANIZATION.EMAIL_INVALID_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.WEBSITE' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['website']\" name=\"website\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"64\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.DESCRIPTION' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <textarea [formControl]=\"orgInfoForm.controls['description']\" name=\"description\" style=\"resize: none\" rows=\"2\"\n                              class=\"form-control form-control-sm col-xs-12 col-sm-12\"></textarea>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n"
            }] }
];
/** @nocollapse */
OrganizationGeneralInformationComponent.ctorParameters = () => [
    { type: Location },
    { type: OrganizationService },
    { type: FormBuilder },
    { type: LocationService },
    { type: DictionaryService },
    { type: TranslateService }
];
OrganizationGeneralInformationComponent.propDecorators = {
    orgInfo: [{ type: Input }],
    editable: [{ type: Input }],
    onValidate: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.orgInfo;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.editable;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.orgInfoForm;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.link;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.langs;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.countries;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.provinces;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.districts;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.companySizeCodes;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.industries;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.countryCode;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.provinceCode;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.onValidate;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.locationService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.dictionaryService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BootstrapCompanyProfileComponent {
    /**
     * @param {?} orgService
     * @param {?} notification
     * @param {?} securityService
     * @param {?} translate
     */
    constructor(orgService, notification, securityService, translate) {
        this.orgService = orgService;
        this.notification = notification;
        this.securityService = securityService;
        this.translate = translate;
        // organization global
        this.formValid = false;
        this.translateSubscription = translate.get(['COMMON.MODULE.ORGANIZATION']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.orgTranslations = res['COMMON.MODULE.ORGANIZATION'];
        }));
        this.roleAccess = this.securityService.hasRole('admin' || 'sub_admin');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.load();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    load() {
        this.orgService.viewInfo().subscribe((/**
         * @param {?} org
         * @return {?}
         */
        (org) => {
            this.orgInfo = Object.assign(new OrganizationInformation(), org);
            console.log('orgInFor', this.orgInfo);
            this.setData(this.orgInfo);
        }));
        // this.orgService.firmLoad().subscribe((data: OrganizationInformation) => {
        //     this.orgInfo = Object.assign(new OrganizationInformation(), data);
        // });
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.organization = Object.assign(new Organization(), data);
        if (!this.organization.officeAddress) {
            this.organization.officeAddress = new Address();
        }
    }
    /**
     * @return {?}
     */
    onUpdate() {
        if (this.formValid) {
            if (this.orgInfoComponent) {
                /** @type {?} */
                const organization = Object.assign(new Organization(), this.orgInfoComponent.getData());
                delete organization.logo;
                delete organization['email'];
                this.orgService.update(organization).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    const { TITLE, UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG } = this.orgTranslations;
                    if (ErrorMessage.TYPE !== data.type) {
                        this.setData(data);
                        this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                    }
                    else {
                        this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                    }
                }));
            }
        }
    }
    // onUpdate($event) {
    /*
            if (this.formValid) {
                const {TITLE, UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG} = this.orgTranslations;
                this.orgService.update(this.organization).subscribe(
                    (data: any) => {
                        if (ErrorMessage.TYPE !== data.type) {
                            this.setData(data);
                            this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                        } else {
                            this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                        }
                    }
                );
            }
             */
    // }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChange($event) {
        this.formValid = $event;
    }
}
BootstrapCompanyProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-bootstrap-company-profile',
                template: "<div class=\"default-layout tb-visible\">\n    <app-common-toolbar></app-common-toolbar>\n    <div class=\"cp-content p-0\" style=\"overflow: hidden\">\n        <div class=\"container-fluid p-0\">\n            <div *ngIf=\"roleAccess\" class=\"container-fluid nav-fixed-top cp-toolbar\">\n                <button class=\"btn btn-sm btn-success mr-1\" type=\"button\" [disabled]=\"!formValid\" [title]=\"'ACTION.SAVE' | translate\" data-toggle=\"tooltip\" (click)=\"onUpdate()\">\n                    <i class=\"fa fa-save\" aria-hidden=\"true\"></i>\n                </button>\n        </div>\n            <div class=\"cp-content p-3\">\n                <app-organization-information class=\"w-100\" *ngIf=\"orgInfo && organization\" [orgInfo]=\"orgInfo\" [organization]=\"organization\" [editable]=\"roleAccess\">\n                    <ng-template #tabContent>\n                        <tabset>\n                            <tab id=\"generate-info-tab\">\n                                <ng-template tabHeading>\n                                    <i class=\"fa fa-info-circle\"></i><b> {{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}</b>\n                                </ng-template>\n                                <app-organization-general-information [editable]=\"roleAccess\" (onValidate)=\"onChange($event)\" [orgInfo]=\"organization\"></app-organization-general-information>\n                            </tab>\n                        </tabset>\n                    </ng-template>\n                </app-organization-information>\n            </div>\n        </div>\n    </div>\n</div>\n"
            }] }
];
/** @nocollapse */
BootstrapCompanyProfileComponent.ctorParameters = () => [
    { type: OrganizationService },
    { type: NotificationService },
    { type: SecurityService },
    { type: TranslateService }
];
BootstrapCompanyProfileComponent.propDecorators = {
    orgInfoComponent: [{ type: ViewChild, args: [OrganizationGeneralInformationComponent,] }]
};
if (false) {
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.orgInfo;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.organization;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.formValid;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.roleAccess;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.orgTranslations;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.translateSubscription;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.orgInfoComponent;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.securityService;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const routes = [
    { path: 'user-profile', component: BootstrapUserProfileComponent },
    { path: 'company-profile', component: BootstrapCompanyProfileComponent }
];
class BootstrapLayoutRoutingModule {
}
BootstrapLayoutRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var systemViLocale = {
    abbr: 'vi',
    vi: 'Tiếng Việt',
    en: 'Tiếng Anh',
    months: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split('_'),
    monthsShort: 'TH1_TH2_TH3_TH4_TH5_TH6_TH7_TH8_TH9_TH10_TH11_TH12'.split('_'),
    weekdays: 'Chủ nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_'),
    weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Hôm nay lúc] LT',
        nextDay: '[Ngày mai lúc] LT',
        nextWeek: 'dddd [lúc] LT',
        lastDay: '[Hôm qua lúc] LT',
        lastWeek: '[Tuần trước] dddd [lúc] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'trong %s',
        past: '%s trước',
        s: '1 vài giây',
        ss: '%d giây',
        m: '1 phút',
        mm: '%d phút',
        h: '1 giờ',
        hh: '%d giờ',
        d: '1 ngày',
        dd: '%d ngày',
        M: '1 tháng',
        MM: '%d tháng',
        y: '1 năm',
        yy: '%d năm'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: (/**
     * @param {?} _num
     * @return {?}
     */
    function (_num) {
        /** @type {?} */
        let num = Number(_num);
        /** @type {?} */
        let b = num % 10;
        /** @type {?} */
        let output = (~~(num % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                    (b === 3) ? 'rd' : 'th';
        return num + output;
    }),
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    },
    grid: {
        displayMsg: ' Hiển thị <b>{0}</b> - <b>{1}</b> trong tổng số <b>{2}</b>',
        emptyMsg: 'Không có dữ liệu để hiển thị',
        beforePageText: 'Trang',
        afterPageText: 'của {0}',
        firstText: 'Trang đầu',
        prevText: 'Trang trước',
        nextText: 'Trang sau',
        lastText: 'Trang cuối',
        refreshText: 'Làm tươi',
        searchText: 'Tìm kiếm',
        searchPlaceholder: 'Từ khóa',
        downloadText: 'Tải về',
        translations: {
            headerReload: 'Nạp lại',
            headerColumnSelector: 'Chọn cột hiển thị',
            indexColumn: 'Thứ tự hiển thị',
            selectColumn: 'Cột chọn',
            selectRow: 'Chọn dòng',
            selectAllRows: 'Chọn',
            expandColumn: 'Mở rộng',
            expandRow: 'Xem nhiều hơn',
            paginationLimit: 'Phần tử',
            paginationRange: 'Hiển thị',
            firstText: 'Trang đầu',
            prevText: 'Trang trước',
            nextText: 'Trang sau',
            lastText: 'Trang cuối'
        }
    },
    TOOLBAR: {
        ADD: 'Thêm mới',
        EDIT: 'Sửa',
        SAVE: 'Lưu',
        UPDATE: 'Cập nhật',
        DELETE: 'Xóa',
        SEARCH: 'Tìm kiếm',
        OK: 'Đồng ý',
        CANCEL: 'Bỏ qua',
        RESET: 'Nhập lại',
        BACK: 'Quay lại',
        CLOSE: 'Đóng',
        DOWNLOAD: 'Tải về'
    },
    COMMON: {
        WELCOME: 'Xin chào',
        PLACEHOLDER_SEARCH: 'Tìm kiếm ...',
        NOTIFICATION: {
            TITLE: 'Thông báo',
            EMPTY_MSG: 'Không có dữ liệu để hiển thị',
            LOAD_MORE: 'Tải thêm',
            ITEMS: 'thông báo',
            CLEAR_ALL: 'Xóa tất cả thông báo'
        },
        APPLICATION: {
            TITLE: 'Ứng dụng',
            EVENTS_TODAY: 'Sự kiện hôm nay',
            NEW_ACTIVITY: 'Tương tác mới'
        },
        MENU: {
            LANGUAGE: 'Ngôn ngữ',
            HOME: 'Trang chủ',
            USER_PROFILE: 'Thông tin cá nhân',
            ORGANIZATION_INFORMATION: 'Thông tin công ty',
            CONFIG: 'Cấu hình',
            SIGNATURE: 'Chữ ký số',
            ABOUT: 'Thông tin hệ thống',
            BACK: 'Quay lại',
            LOGOUT: 'Đăng xuất'
        },
        SELECTION: {
            DEFAULT_VALUE: '- Chọn -'
        },
        MESSAGE: {
            CONFIRM_DELETE_TITLE: 'Xóa ?',
            CONFIRM_DELETE_MSG: 'Bạn có chắc là đồng ý muốn xóa dữ liệu đã chọn không ?'
        },
        MODULE: {
            ADDRESS: {
                CITY: 'Tỉnh/Thành phố',
                DISTRICT: 'Quận/Huyện',
                COUNTRY: 'Quốc gia',
                ADDRESS: 'Địa chỉ',
                STREET: 'Địa chỉ',
                ADDRESS_REQUIRED_MSG: 'Địa chỉ không được rỗng',
                COUNTRY_REQUIRED_MSG: 'Quốc gia không được rỗng'
            },
            ORGANIZATION: {
                TITLE: 'Công ty',
                CODE: 'Mã công ty',
                NAME: 'Tên công ty',
                FOREIGN_NAME: 'Tên quốc tế',
                ABBREVIATION_NAME: 'Tên viết tắt',
                TAX_CODE: 'Mã số thuế',
                BILLING_ADDRESS: 'Địa chỉ trên hóa đơn',
                LEGAL_REPRESENTATIVE: 'Đại diện pháp luật',
                WEBSITE: 'Website',
                INDUSTRY: 'Ngành nghề',
                COMPANY_SIZE: 'Quy mô công ty',
                DESCRIPTION: 'Mô tả',
                LINK: 'Địa chỉ truy cập',
                CODE_REQUIRED_MSG: 'Mã công ty không được rỗng',
                NAME_REQUIRED_MSG: 'Tên công ty không được rỗng',
                EMAIL: 'Thư điện tử',
                EMAIL_INVALID_MSG: 'Địa chỉ thư điện tử không hợp lệ',
                PHONE: 'Điện thoại',
                FAX: 'Fax',
                LANGUAGE: 'Ngôn ngữ',
                CHOSEN_IMAGE: 'Chọn Logo ...',
                STANDARD_IMAGE_SIZE: 'Kích thước chuẩn',
                UPDATE_LOGO_ERROR_MSG: 'Có lỗi xảy ra khi cập nhật Logo',
                EMPLOYEES: 'nhân viên',
                SELF_EMPLOYED: 'Tự làm chủ',
                REMOVE_LOGO: 'Xóa Logo',
                SAVE_LOGO: 'Lưu Logo',
                REMOVE_LOGO_SUCCESSFUL_MSG: 'Logo đã được xóa',
                REMOVE_LOGO_ERROR_MSG: 'Có lỗi xảy ra khi xóa Logo',
                UPDATE_SUCCESSFUL_MSG: 'Thông tin đã được cập nhật',
                UPDATE_ERROR_MSG: 'Có lỗi xảy ra khi cập nhật thông tin',
                TAXCODE_REQUIRED_MSG: 'Mã số thuế không được rỗng',
            },
            USER_PROFILE: {
                TITLE: 'Thông tin tài khoản',
                USERNAME: 'Tài khoản',
                LAST_NAME: 'Họ',
                MIDDLE_NAME: 'Tên đệm',
                FIRST_NAME: 'Tên',
                BIRTHDAY: 'Ngày sinh',
                PHONE: 'Điện thoại',
                MOBILE: 'Di động',
                FULL_NAME: 'Họ và tên',
                EMAIL: 'Thư điện tử',
                GROUP_NAME: 'Tên nhóm quyền',
                DESCRIPTION: 'Mô tả nhóm quyền',
                GENDER: 'Giới tính',
                MALE: 'Nam',
                FEMALE: 'Nữ',
                OTHER: 'Khác',
                FIRST_NAME_REQUIRED_MSG: 'Tên không được rỗng',
                LAST_NAME_REQUIRED_MSG: 'Họ không được rỗng',
                EMAIL_REQUIRED_MSG: 'Địa chỉ thư điện tử không được rỗng',
                EMAIL_INVALID_MSG: 'Địa chỉ thư điện tử không hợp lệ',
                GENERAL_INFORMATION: 'Thông tin tài khoản',
                CHOSEN_IMAGE: 'Chọn ảnh ...',
                SECURITY_INFORMATION: 'Thông tin bảo mật',
                CURRENT_PASSWORD: 'Mật khẩu',
                NEW_PASSWORD: 'Mật khẩu mới',
                CONFIRM_NEW_PASSWORD: ' Xác nhận mật khẩu',
                CHANGE_PASSWORD: 'Đổi mật khẩu',
                CURRENT_PASSWORD_REQUIRED_MSG: 'Vui lòng nhập mật khẩu hiện tại',
                NEW_PASSWORD_REQUIRED_MSG: 'Vui lòng nhập mật khẩu mới',
                CONFIRM_NEW_PASSWORD_REQUIRED_MSG: 'Vui lòng nhập xác nhận mật khẩu mới',
                PASSWORD_DO_NOT_MATCH: 'Xác nhận mật khẩu mới chưa đúng',
                CHANGE_PASSWORD_INFO_MSG: 'Để đổi mật khẩu, vui lòng nhập mật khẩu hiện tại của bạn, sau đó nhập mật khẩu mới của bạn hai lần',
                CHANGE_PASSWORD_SUCCESSFUL_MSG: 'Mật khẩu đã được thay đổi',
                CHANGE_PASSWORD_ERROR_MSG: 'Có lỗi xảy ra khi đổi mật khẩu',
                CURRENT_PASSWORD_INCORRECT: 'Mật khẩu hiện tại không đúng. Vui lòng nhập lại',
                UPDATE_PROFILE_SUCCESSFUL_MSG: 'Thông tin tài khoản đã được thay đổi',
                UPDATE_PROFILE_ERROR_MSG: 'Có lỗi xảy ra khi cập nhật thông tin tài khoản',
                AVATAR: 'Ảnh đại diện',
                SAVE_IMAGE: 'Lưu ảnh',
                REMOVE_IMAGE: 'Xóa ảnh',
                IMAGE_UPDATE_SUCCESSFUL_MSG: 'Ảnh đại diện đã được cập nhật',
                IMAGE_UPDATE_ERROR_MSG: 'Có lỗi xảy ra khi cập nhật ảnh đại diện',
                IMAGE_REMOVE_SUCCESSFUL_MSG: 'Ảnh đại diện đã được xóa',
                IMAGE_REMOVE_ERROR_MSG: 'Có lỗi xảy ra khi xóa ảnh đại diện',
                SIGNATURE_INFORMATION: 'Chữ ký số',
                ACCESS_ROLE: 'Quyền truy cập',
                SIGNATURE_VERIFY: 'Số điện thoại',
                SIGNATURE_FILE: 'Tệp ảnh chữ ký',
                SIGNATURE_VERIFY_REQUIRED_MSG: 'Số điện thoại không được để rỗng',
                UPDATE_SIGNATURE_SUCCESSFUL_MSG: 'Thông tin chữ ký số đã được cập nhật',
                UPDATE_SIGNATURE_ERROR_MSG: 'Có lỗi xảy ra khi cập nhật thông tin chữ ký số',
                SIGNATURE_FILE_REQUIRED_MSG: 'Vui lòng chọn ảnh chữ ký để cập nhật',
                UPDATE_SIGNATURE: 'Cập nhật chữ ký số',
                NO_FILE: 'Không có tệp tin ...',
                CHOOSE: 'Chọn tệp'
            },
            VIEWER: {
                UNSUPPORTED: 'Rất tiếc, định dạng không được hỗ trợ xem trực tuyến <br /> trên trình duyệt này'
            },
            CROPPER: {
                TITLE: 'Công cụ cắt ảnh',
                SELECT_NEW_IMAGE: 'Chọn ảnh khác ...'
            },
            SIGNATURE_MANAGE: {
                CREATE_SIGN: 'Thêm chữ ký số',
                TITLE: 'Chữ ký',
                NAME: 'Tên',
                NAME_REQUIRED_MSG: 'Tên chữ ký không được rỗng',
                MOBILE: 'Di động',
                ISSUED: 'Đơn vị phát hành',
                FILE: 'Tệp ảnh',
                FILE_REQUIRED_MSG: 'Chưa chọn ảnh',
                PHOTO: 'Ảnh',
                RESULTS: 'Hiển thị',
                DELETE_SUCCESSFUL_MSG: 'Chữ ký đã được xóa',
                DELETE_ERROR_MSG: 'Có lỗi xảy ra khi xóa chữ ký',
                SAVE_SUCCESSFUL_MSG: 'Chữ ký đã được tạo',
                SAVE_ERROR_MSG: 'Có lỗi xảy ra khi tạo chữ ký',
                NO_INFORMATION: 'Không tìm thấy kết quả phù hợp',
                KEY_SEARCH: 'Hãy chắc rằng từ khóa bạn cần tìm kiếm là chính xác.'
            },
            EMAIL_TEMPLATE: {
                "SEND_TEST": "Gửi test",
                "EMAIL": "Mẫu email",
                "LIST": "Danh sách mẫu email",
                "ADD_EMAIL": "Thêm mới mẫu email",
                "EDIT_EMAIL": "Chỉnh sửa mẫu email",
                "EMAIL_CODE": "Mã",
                "EMAIL_NAME": "Tên",
                "EMAIL_SUBJECT": "Tiêu đề",
                "EMAIL_CONTENT": "Nội dung email",
                "NOTE": "Ghi chú",
                "SAMPLE_INFORMATION": "Thông tin mẫu email",
                "SYSTEM_INFORMATION": "Thông tin tham số cấu hình",
                "TO": "Từ",
                "FROM": "Đến",
                "EMAIL_CODE_EXIST_MSG": "Mã đã tồn tại",
                "EMAIL_CODE_REQUIRED": "Vui lòng nhập mã",
                "EMAIL_NAME_REQUIRED": "Vui lòng nhập tên",
                "ADD_SUCCESS": "Mẫu email đã được thêm mới",
                "ADD_ERROR": "Có lỗi xảy ra trong quá trình thêm mới",
                "UPDATE_SUCCESS": "Mẫu email đã được cập nhật",
                "UPDATE_ERROR": "Có lỗi xảy ra trong quá trình cập nhật dữ liệu",
                "DELETE_SUCCESS": "Mẫu email đã được xóa.",
                "DELETE_ERROR": "Có lỗi xảy ra trong quá trình xóa dữ liệu",
                "DELETE_TITLE": "Xóa mẫu email?",
                "DELETE_CONTENT": "Bạn có chắc là muốn xóa mẫu email này không ?",
                "ACTIVE": "Sử dụng"
            },
            REPORT_TEMPLATE: {
                "TITLE": "Biểu mẫu",
                "LIST": 'Danh sách biểu mẫu',
                "ADD": "Thêm mới biểu mẫu",
                "APPLICATION": "Ứng dụng",
                "MODULE": "Mô-đun",
                "TYPE": "Loại",
                "VERSION": "Phiên bản",
                "NAME": "Tên",
                "DESCRIPTION": "Mô tả",
                "FILE_UPLOAD": "Tệp tin",
                "APPLICATION_REQUIRED": "Tên ứng dụng không được rỗng",
                "MODULE_REQUIRED": "Tên mô-đun không được rỗng",
                "TYPE_REQUIRED": "Tên loại không được rỗng",
                "VERSION_REQUIRED": "Phiên bản không được rỗng",
                "NAME_REQUIRED": "Tên biểu mẫu không được rỗng",
                "DESCRIPTION_REQUIRED": "Mô tả không được rỗng",
                "ADD_SUCCESS": "Biểu mẫu đã được thêm mới.",
                "ADD_ERROR": "Không thể thêm mới. Có lỗi xảy ra trong quá trình thêm mới biểu mẫu",
                "UPDATE_SUCCESS": "Biểu mẫu đã được chỉnh sửa",
                "UPDATE_ERROR": "Không thể chỉnh sửa. Có lỗi xảy ra trong quá trình chỉnh sửa biểu mẫu",
                "DELETE_SUCCESS": "Biểu mẫu đã được xóa",
                "DELETE_ERROR": "Không thể xóa. Có lỗi xảy ra trong quá trình xóa biểu mẫu",
                "DELETE_TITLE": "Xóa biểu mẫu?",
                "DELETE_CONTENT": "Bạn có chắc là muốn xóa biểu mẫu này không?",
                "NO_FILE": "Không có tệp tin ...",
                "CHOOSE": "Chọn tệp"
            }
        }
    },
    INDICATOR: {
        LOADING: 'Đang tải ...',
        PROCESSING: 'Đang xử lý ...',
        SAVING: 'Đang lưu ...',
        UPDATING: 'Đang cập nhật ...'
    },
    "ALL_SELECTED": "Tất cả đã được chọn",
    "CANCEL": "Bỏ qua",
    "CLEAR_ALL_FILTERS": "Xóa tất cả điều kiện lọc",
    "CLEAR_ALL_SORTING": "Xóa tất cả việc sắp xếp",
    "COLUMNS": "Cột",
    "COMMANDS": "Chức năng",
    "CONTAINS": "Có chứa",
    "ENDS_WITH": "Kết thúc với",
    "EQUALS": "Bằng",
    "EXPORT_TO_CSV": "Kết xuất định dạng CSV",
    "EXPORT_TO_TAB_DELIMITED": "Kết xuất định dạng Văn bản (phân cách bằng tab)",
    "FROM_TO_OF_TOTAL_ITEMS": "{{from}}-{{to}} của tổng số {{totalItems}} dòng",
    "FORCE_FIT_COLUMNS": "Hiển thị mặc định",
    "INVALID_FLOAT": "Dữ liệu số phải hợp lệ và có số thập phân tối đa là {{maxDecimal}}.",
    "GROUP_BY": "Nhóm theo",
    "HIDE_COLUMN": "Ẩn cột",
    "IN_COLLECTION_SEPERATED_BY_COMMA": "Tìm kiếm dữ liệu trong tập dữ liệu, các dữ liệu phải được phân tách bằng dấu phẩy (a,b)",
    "ITEMS": "Dòng",
    "ITEMS_PER_PAGE": "dòng trên mỗi trang",
    "NOT_IN_COLLECTION_SEPERATED_BY_COMMA": "Tìm kiếm dữ liệu không nằm trong tập dữ liệu, các dữ liệu phải được phân tách bằng dấu phẩy (a,b)",
    "OF": "của",
    "PAGE": "Trang",
    "PAGE_X_OF_Y": "trang {{x}} của {{y}}",
    "REFRESH_DATASET": "Làm mới dữ liệu",
    "REMOVE_FILTER": "Hủy lọc dữ liệu",
    "REMOVE_SORT": "Hủy sắp xếp dữ liệu",
    "SAVE": "Lưu dữ liệu",
    "SELECT_ALL": "Chọn tất cả",
    "SORT_ASCENDING": "Sắp xếp tăng dần",
    "SORT_DESCENDING": "Sắp xếp giảm dần",
    "STARTS_WITH": "Bắt đầu với",
    "SYNCHRONOUS_RESIZE": "Thay đổi kích thước đồng bộ",
    "TOGGLE_FILTER_ROW": "Ẩn/hiện dòng lọc dữ liệu",
    "TOGGLE_PRE_HEADER_ROW": "Chuyển đổi dòng trước tiêu đề",
    "X_OF_Y_SELECTED": "# của % đã chọn",
    "REPORT_INV_LIST": "Bảng kê hóa đơn",
    "REPORT_INV_USING_SITUATION": "Báo cáo tình hình sử dụng hóa đơn",
    "ADJUSTMENT": "Điều chỉnh hóa đơn",
    "REPLACEMENT": "Thay thế hóa đơn",
    "DESTROYED": "Xóa bỏ hóa đơn"
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var systemEnLocale = {
    abbr: 'en',
    vi: 'Vietnamese',
    en: 'English',
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: (/**
     * @param {?} _num
     * @return {?}
     */
    function (_num) {
        /** @type {?} */
        let num = Number(_num);
        /** @type {?} */
        let b = num % 10;
        /** @type {?} */
        let output = (~~(num % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                    (b === 3) ? 'rd' : 'th';
        return num + output;
    }),
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    },
    grid: {
        displayMsg: 'Displaying <b>{0}</b> - <b>{1}</b> of <b>{2}</b>',
        emptyMsg: 'No data to display',
        beforePageText: 'Page',
        afterPageText: 'of {0}',
        firstText: 'First Page',
        prevText: 'Previous Page',
        nextText: 'Next Page',
        lastText: 'Last Page',
        refreshText: 'Refresh',
        searchText: 'Search',
        searchPlaceholder: 'Keyword',
        downloadText: 'Download',
        translations: {
            headerReload: 'Reload',
            headerColumnSelector: 'Column selector',
            indexColumn: 'Index',
            selectColumn: 'Select',
            selectRow: 'Select',
            selectAllRows: 'Select',
            expandColumn: 'Expand',
            expandRow: 'Expand',
            paginationLimit: 'Limit',
            paginationRange: 'Results',
            firstText: 'First Page',
            prevText: 'Previous Page',
            nextText: 'Next Page',
            lastText: 'Last Page'
        }
    },
    TOOLBAR: {
        ADD: 'Create',
        EDIT: 'Edit',
        SAVE: 'Save',
        UPDATE: 'Update',
        DELETE: 'Delete',
        SEARCH: 'Search',
        OK: 'Ok',
        CANCEL: 'Cancel',
        RESET: 'Reset',
        BACK: 'Back',
        CLOSE: 'Close',
        DOWNLOAD: 'Download'
    },
    COMMON: {
        WELCOME: 'Welcome',
        PLACEHOLDER_SEARCH: 'Search ...',
        NOTIFICATION: {
            TITLE: 'Notifications',
            EMPTY_MSG: 'No data to display',
            LOAD_MORE: 'Load more',
            ITEMS: 'item(s)',
            CLEAR_ALL: 'Clear all messages'
        },
        APPLICATION: {
            TITLE: 'Application',
            EVENTS_TODAY: 'Events today',
            NEW_ACTIVITY: 'New activity'
        },
        MENU: {
            LANGUAGE: 'Language',
            HOME: 'Home',
            USER_PROFILE: 'Profile',
            ORGANIZATION_INFORMATION: 'Organization information',
            SIGNATURE: 'Signature',
            CONFIG: 'Configuration',
            ABOUT: 'About',
            LOGOUT: 'Logout',
            BACK: 'Back'
        },
        SELECTION: {
            DEFAULT_VALUE: '- Select -'
        },
        MODULE: {
            ADDRESS: {
                CITY: 'Province/City',
                COUNTRY: 'Country',
                DISTRICT: 'District',
                ADDRESS: 'Address',
                STREET: 'Street',
                ADDRESS_REQUIRED_MSG: 'Address field is required',
                COUNTRY_REQUIRED_MSG: 'Country field is required'
            },
            ORGANIZATION: {
                TITLE: 'Organization',
                CODE: 'Code',
                NAME: 'Name',
                FOREIGN_NAME: 'Foreign name',
                ABBREVIATION_NAME: 'Abbreviation name',
                TAX_CODE: 'Tax Code',
                BILLING_ADDRESS: 'Billing address',
                LEGAL_REPRESENTATIVE: 'Legal representative',
                WEBSITE: 'Website',
                INDUSTRY: 'Industry',
                COMPANY_SIZE: 'Company size',
                DESCRIPTION: 'Description',
                LINK: 'Link',
                CODE_REQUIRED_MSG: 'Code field is required',
                NAME_REQUIRED_MSG: 'Name field is required',
                EMAIL: 'Email',
                EMAIL_INVALID_MSG: 'Email must be a valid email',
                PHONE: 'Phone',
                FAX: 'Fax',
                CITY: 'Province/City',
                LANGUAGE: 'Language',
                CHOSEN_IMAGE: 'Chosen Logo ...',
                STANDARD_IMAGE_SIZE: 'Standard image size',
                UPDATE_LOGO_ERROR_MSG: 'Can not update logo.Error while updating logo',
                EMPLOYEES: 'employees',
                SELF_EMPLOYED: 'Self-employed',
                REMOVE_LOGO: 'Remove Logo',
                SAVE_LOGO: 'Save Logo',
                UPDATE_SUCCESSFUL_MSG: 'Information was updated successfully',
                UPDATE_ERROR_MSG: 'Can not update.Error while updating information',
                TAXCODE_REQUIRED_MSG: 'Taxcode field is required',
            },
            USER_PROFILE: {
                TITLE: 'Profile',
                USERNAME: 'Username',
                LAST_NAME: 'Last name',
                MIDDLE_NAME: 'Middle name',
                FIRST_NAME: 'First name',
                BIRTHDAY: 'Birthday',
                PHONE: 'Phone',
                MOBILE: 'Mobile',
                FULL_NAME: 'Full name',
                EMAIL: 'Email',
                GROUP_NAME: 'Group Name',
                DESCRIPTION: 'Description',
                GENDER: 'Gender',
                MALE: 'Male',
                FEMALE: 'Female',
                OTHER: 'Other',
                FIRST_NAME_REQUIRED_MSG: 'First name field is required',
                LAST_NAME_REQUIRED_MSG: 'Last Name field is required',
                EMAIL_REQUIRED_MSG: 'Email field is required',
                EMAIL_INVALID_MSG: 'Email must be a valid email',
                GENERAL_INFORMATION: 'General information',
                CHOSEN_IMAGE: 'Chosen avatar ...',
                SECURITY_INFORMATION: 'Security information',
                CURRENT_PASSWORD: 'Current Password',
                NEW_PASSWORD: 'New Password',
                CONFIRM_NEW_PASSWORD: 'Confirm new password',
                CHANGE_PASSWORD: 'Change password',
                CURRENT_PASSWORD_REQUIRED_MSG: 'Please enter the current password',
                NEW_PASSWORD_REQUIRED_MSG: 'Please enter a new password',
                CONFIRM_NEW_PASSWORD_REQUIRED_MSG: 'Please enter a new password again',
                PASSWORD_DO_NOT_MATCH: 'New password do not match',
                CHANGE_PASSWORD_INFO_MSG: 'Please enter the your current password, then your new password twice',
                CHANGE_PASSWORD_SUCCESSFUL_MSG: 'Password was changed successfully',
                CHANGE_PASSWORD_ERROR_MSG: 'Can not change password.Error while changing password',
                CURRENT_PASSWORD_INCORRECT: 'Current password is incorrect. Please try again',
                UPDATE_PROFILE_SUCCESSFUL_MSG: 'Profile was updated successfully',
                UPDATE_PROFILE_ERROR_MSG: 'Can not update profile.Error while updating profile',
                AVATAR: 'Avatar',
                SAVE_IMAGE: 'Apply',
                REMOVE_IMAGE: 'Remove',
                IMAGE_UPDATE_SUCCESSFUL_MSG: 'Avatar was updated successfully',
                IMAGE_UPDATE_ERROR_MSG: 'Can not update.Error while updating avatar',
                IMAGE_REMOVE_SUCCESSFUL_MSG: 'Avatar was deleted successfully',
                IMAGE_REMOVE_ERROR_MSG: 'Can not remove.Error while removing avatar',
                SIGNATURE_INFORMATION: 'Signature information',
                ACCESS_ROLE: 'Access role',
                SIGNATURE_VERIFY: 'Phone number',
                SIGNATURE_FILE: 'Signature File',
                SIGNATURE_VERIFY_REQUIRED_MSG: 'Phone number field is required',
                UPDATE_SIGNATURE_SUCCESSFUL_MSG: 'Signature was updated successfully',
                UPDATE_SIGNATURE_ERROR_MSG: 'Can not update signature.Error while updating signature',
                SIGNATURE_FILE_REQUIRED_MSG: 'Please select a signature image to update',
                UPDATE_SIGNATURE: 'Update signature',
                NO_FILE: 'No File ...',
                CHOOSE: 'Choose'
            },
            VIEWER: {
                UNSUPPORTED: 'We\'re sorry, an error occurred when trying to view the document <br /> File format is not supported'
            },
            CROPPER: {
                TITLE: 'Image Cropper',
                SELECT_NEW_IMAGE: 'Select new image ...'
            },
            SIGNATURE_MANAGE: {
                CREATE_SIGN: 'Create signature',
                TITLE: 'Signature',
                NAME: 'Signature name',
                NAME_REQUIRED_MSG: 'Name field is required',
                MOBILE: 'Mobile',
                ISSUED: 'Issued',
                FILE: 'File',
                RESULTS: 'Results',
                FILE_REQUIRED_MSG: 'File field is required',
                PHOTO: 'Photo',
                DELETE_SUCCESSFUL_MSG: 'Signature was deleted successfully',
                DELETE_ERROR_MSG: 'Can not delete.Error while deleting signature',
                SAVE_SUCCESSFUL_MSG: 'Signature was saved successfully',
                SAVE_ERROR_MSG: 'Can not save.Error while saving signature',
                NO_INFORMATION: 'No matches found',
                KEY_SEARCH: 'Please sure that that the keyword you need to search for a primary.'
            },
            EMAIL_TEMPLATE: {
                "SEND_TEST": "Send test",
                "EMAIL": "Email template",
                "LIST": "Email template list",
                "ADD_EMAIL": "Add new email template",
                "EDIT_EMAIL": "Edit email template",
                "EMAIL_CODE": "Code",
                "EMAIL_NAME": "Name",
                "EMAIL_SUBJECT": "Subject",
                "EMAIL_CONTENT": "Content",
                "NOTE": "Note",
                "SAMPLE_INFORMATION": "Sample information",
                "SYSTEM_INFORMATION": "System configuration information",
                "TO": "To",
                "FROM": "From",
                "EMAIL_CODE_EXIST_MSG": "Email code already exists",
                "EMAIL_CODE_REQUIRED": "Email code field is required",
                "EMAIL_NAME_REQUIRED": "Email name field is required",
                "ADD_SUCCESS": "Email template was saved successfully.",
                "ADD_ERROR": "Can not save.Error while saving email template.",
                "UPDATE_SUCCESS": "Email template was updated successfully.",
                "UPDATE_ERROR": "Can not update.Error while updating email template.",
                "DELETE_SUCCESS": "Email template was deleted successfully.",
                "DELETE_ERROR": "Can not delete.Error while deleting email template.",
                "DELETE_TITLE": "Delete email template?",
                "DELETE_CONTENT": "Are you sure want to delete this?",
                "ACTIVE": "Active"
            },
            REPORT_TEMPLATE: {
                "TITLE": "Report template",
                "LIST": 'Templates',
                "ADD": "Add",
                "APPLICATION": "Application",
                "MODULE": "Module",
                "TYPE": "Type",
                "VERSION": "Version",
                "NAME": "Name",
                "DESCRIPTION": "Description",
                "FILE_UPLOAD": "File upload",
                "APPLICATION_REQUIRED": "Application field is required",
                "MODULE_REQUIRED": "Module field is required",
                "TYPE_REQUIRED": "Type field is required",
                "VERSION_REQUIRED": "Version field is required",
                "NAME_REQUIRED": "Name field is required",
                "DESCRIPTION_REQUIRED": "Description field is required",
                "ADD_SUCCESS": "Form management was added successfully",
                "ADD_ERROR": "Can not add.Error while adding template",
                "UPDATE_SUCCESS": "Form management was updated successfully",
                "UPDATE_ERROR": "Can not update.Error while updating template",
                "DELETE_SUCCESS": "Form management was deleted successfully",
                "DELETE_ERROR": "Can not delete.Error while deleting template",
                "DELETE_TITLE": "Delete template",
                "DELETE_CONTENT": "Are you sure you want to delete the selected template?",
                "NO_FILE": "No File ...",
                "CHOOSE": "Choose"
            }
        }
    },
    INDICATOR: {
        LOADING: 'Loading ...',
        PROCESSING: 'Processing ...',
        SAVING: 'Saving ...',
        UPDATING: 'Updating ...'
    },
    "ALL_SELECTED": "All Selected",
    "CANCEL": "Cancel",
    "CLEAR_ALL_FILTERS": "Clear All Filters",
    "CLEAR_ALL_SORTING": "Clear All Sorting",
    "COLUMNS": "Columns",
    "COMMANDS": "Commands",
    "CONTAINS": "Contains",
    "ENDS_WITH": "Ends With",
    "EQUALS": "Equals",
    "EXPORT_TO_CSV": "Export in CSV format",
    "EXPORT_TO_TAB_DELIMITED": "Export in Text format (Tab delimited)",
    "FROM_TO_OF_TOTAL_ITEMS": "{{from}}-{{to}} of {{totalItems}} items",
    "FORCE_FIT_COLUMNS": "Force fit columns",
    "INVALID_FLOAT": "The number must be valid and have a maximum of {{maxDecimal}} decimals.",
    "GROUP_BY": "Group by",
    "HIDE_COLUMN": "Hide Column",
    "IN_COLLECTION_SEPERATED_BY_COMMA": "Search items in a collection, must be separated by a comma (a,b)",
    "ITEMS": "Items",
    "ITEMS_PER_PAGE": "items per page",
    "NOT_IN_COLLECTION_SEPERATED_BY_COMMA": "Search items not in a collection, must be separated by a comma (a,b)",
    "OF": "of",
    "PAGE": "Page",
    "PAGE_X_OF_Y": "page {{x}} of {{y}}",
    "REFRESH_DATASET": "Refresh Dataset",
    "REMOVE_FILTER": "Remove Filter",
    "REMOVE_SORT": "Remove Sort",
    "SAVE": "Save",
    "SELECT_ALL": "Select All",
    "SORT_ASCENDING": "Sort Ascending",
    "SORT_DESCENDING": "Sort Descending",
    "STARTS_WITH": "Starts With",
    "SYNCHRONOUS_RESIZE": "Synchronous resize",
    "TOGGLE_FILTER_ROW": "Toggle Filter Row",
    "TOGGLE_PRE_HEADER_ROW": "Toggle Pre-Header Row",
    "X_OF_Y_SELECTED": "# of % selected",
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CloudTransLoader {
    constructor() {
        this.store = {};
        this.defineLocale(systemViLocale.abbr, systemViLocale);
        this.defineLocale(systemEnLocale.abbr, systemEnLocale);
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    assign(lang, data) {
        return Object.assign(this.getResourceByLang(lang), data);
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    defineLocale(lang, data) {
        defineLocale(lang, data);
        this.store[lang] = data;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        return Observable$1.of(this.getResourceByLang(lang));
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getResourceByLang(lang) {
        return this.store[lang] || systemEnLocale;
    }
    /**
     * Convert complex js object to dot notation js object
     * @private
     * @param {?} message
     * @param {?} value
     * @param {?} obj
     * @return {?}
     */
    dotizeStringToJSON(message, value, obj) {
        /** @type {?} */
        const parts = message.split(".");
        /** @type {?} */
        const last = parts.pop();
        /** @type {?} */
        let part;
        while (part = parts.shift()) {
            if (typeof obj[part] !== "object") {
                obj[part] = {};
            }
            obj = obj[part];
        }
        obj[last] = value;
    }
    /**
     * Convert Java .properties files data to JSON
     * @private
     * @param {?} str
     * @return {?}
     */
    propertiesToJSON(str) {
        // Concat lines that end with '\'.
        // Split by line breaks.
        // Remove commented lines
        // Create the JSON
        return str.replace(/\\\n/, "").split("\n")
            .filter((/**
         * @param {?} line
         * @return {?}
         */
        (line) => /(\#|\!)/.test(line.replace(/\s/g, "").slice(0, 1)) ? false : line))
            .reduce((/**
         * @param {?} obj
         * @param {?} line
         * @return {?}
         */
        (obj, line) => {
            /** @type {?} */
            const colonifiedLine = line.replace(/(\=)/, ":");
            /** @type {?} */
            const key = colonifiedLine.substring(0, colonifiedLine.indexOf(":")).trim();
            /** @type {?} */
            const value = this.asciiToNative(colonifiedLine.substring(colonifiedLine.indexOf(":") + 1).trim());
            obj[key] = value;
            return obj;
        }), {});
    }
    /*
        * Convert ASCII value to Native Character
         */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    asciiToNative(value) {
        /** @type {?} */
        let character = value.split("\\u");
        /** @type {?} */
        let nativeStr = character[0];
        for (let i = 1; i < character.length; i++) {
            /** @type {?} */
            let code = character[i];
            nativeStr += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
            if (code.length > 4) {
                nativeStr += code.substring(4, code.length);
            }
        }
        return nativeStr;
    }
    /*
        * Convert Native value to ASCII
         */
    /**
     * @private
     * @param {?} value
     * @param {?=} ignoreLatin
     * @return {?}
     */
    native2Ascii(value, ignoreLatin = false) {
        /** @type {?} */
        let character = value.split("");
        /** @type {?} */
        let asciiStr = "";
        for (let i = 0; i < character.length; i++) {
            /** @type {?} */
            const code = Number(character[i].charCodeAt(0));
            if (!ignoreLatin || code > 127) {
                /** @type {?} */
                let charAscii = code.toString(16);
                charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                asciiStr += "\\u" + charAscii;
            }
            else {
                asciiStr += character[i];
            }
        }
        return asciiStr;
    }
    /**
     * Convert items from the server to Translation
     * @param {?} items
     * @return {?}
     */
    convertResourceToObject(items) {
        /** @type {?} */
        let translation = {};
        for (const item of items) {
            this.dotizeStringToJSON(item['messageKey'], item['text'], translation);
        }
        return translation;
    }
    /**
     * Convert Java .properties files data to Translation
     * @param {?} str
     * @return {?}
     */
    convertPropertiesToObject(str) {
        /** @type {?} */
        let translation = {};
        /** @type {?} */
        const json = this.propertiesToJSON(str);
        for (const key in json) {
            this.dotizeStringToJSON(key, json[key], translation);
        }
        return translation;
    }
    /**
     * @param {?} lang
     * @param {?} items
     * @return {?}
     */
    setResources(lang, items) {
        this.assign(lang, this.convertResourceToObject(items));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CloudTransLoader.prototype.store;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CloudTranslateModule {
    /**
     * @param {?} translate
     * @param {?} localeService
     * @param {?} coreService
     * @param {?} cloudTranslate
     */
    constructor(translate, localeService, coreService, cloudTranslate) {
        this.translate = translate;
        this.localeService = localeService;
        this.coreService = coreService;
        this.cloudTranslate = cloudTranslate;
        /** @type {?} */
        let languages = listLocales();
        translate.addLangs(languages);
        /** @type {?} */
        let lang = cloudTranslate.getCurrentLang() || languages[0];
        translate.use(lang);
        //Change a locale
        this.localeService.use(lang);
        translate.get([CloudTranslateService.GRID_KEY]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (iNet.ui.grid.Grid && res) {
                iNet.applyIf(iNet.ui.grid.Grid.prototype, res[CloudTranslateService.GRID_KEY]);
            }
        }));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: config.loader || CloudTransLoader,
                deps: [HttpClientService]
            }
        });
    }
}
CloudTranslateModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule.forRoot({
                        loader: { provide: TranslateLoader, useClass: CloudTransLoader }
                    })
                ],
                declarations: [],
                exports: [TranslateModule],
                providers: [BsLocaleService, TranslateService, CloudTranslateService, HttpClientService]
            },] }
];
/** @nocollapse */
CloudTranslateModule.ctorParameters = () => [
    { type: TranslateService },
    { type: BsLocaleService },
    { type: CoreService },
    { type: CloudTranslateService }
];
if (false) {
    /** @type {?} */
    CloudTranslateModule.prototype.translate;
    /** @type {?} */
    CloudTranslateModule.prototype.localeService;
    /** @type {?} */
    CloudTranslateModule.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    CloudTranslateModule.prototype.cloudTranslate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CropperAvatarDialogComponent {
    /**
     * @param {?} modalService
     */
    constructor(modalService) {
        this.modalService = modalService;
        this.cropperReady = false;
        this.onCropped = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onSelectFile = new EventEmitter();
        this.isModalShown = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.modalService.onShow.subscribe((/**
         * @return {?}
         */
        () => {
            this.isModalShown = true;
        }));
        this.modalService.onHide.subscribe((/**
         * @return {?}
         */
        () => {
            this.isModalShown = false;
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    imageCropped(event) {
        this.imageCroppedEvent = event;
    }
    /**
     * @return {?}
     */
    imageLoaded() {
        this.cropperReady = true;
    }
    /**
     * @return {?}
     */
    loadImageFailed() {
        //console.log('Load failed');
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    setImageChangedEvent($event) {
        this.imageChangedEvent = $event;
    }
    /**
     * @return {?}
     */
    hide() {
        this.modalRef.hide();
        this.setImageChangedEvent({});
        this.onHide.emit(this.imageCroppedEvent.base64);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    show($event) {
        this.setImageChangedEvent($event);
        if (!this.isModalShown) {
            this.modalRef = this.modalService.show(this.cropperModal);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    select($event) {
        this.onSelectFile.emit($event);
    }
    /**
     * @return {?}
     */
    submit() {
        this.onCropped.emit(this.imageCroppedEvent.base64);
        this.hide();
    }
    /**
     * @return {?}
     */
    getImageBlob() {
        return this.imageCroppedEvent.file;
    }
}
CropperAvatarDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-cropper-avatar-dialog',
                template: "<ng-template #cropperAvatarModal>\n    <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\"><i class=\"fa fa-crop\"></i> {{'COMMON.MODULE.CROPPER.TITLE' | translate }}</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body p-0\">\n        <image-cropper [imageChangedEvent]=\"imageChangedEvent\"\n                       [maintainAspectRatio]=\"true\"\n                       [aspectRatio]=\"1\" [resizeToWidth]=\"150\"\n                       [roundCropper]=\"true\" format=\"png\" outputType=\"both\"\n                       (imageCropped)=\"imageCropped($event)\"\n                       (imageLoaded)=\"imageLoaded()\"\n                       (loadImageFailed)=\"loadImageFailed()\"\n                       [style.display]=\"cropperReady ? null : 'none'\"></image-cropper>\n    </div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"select($event)\">\n            <i class=\"fa fa-picture-o\"></i> {{ 'COMMON.MODULE.CROPPER.SELECT_NEW_IMAGE'  | translate}}\n        </button>\n\n        <button type=\"button\" class=\"btn btn-success btn-sm ml-1\" (click)=\"submit()\">\n            <i class=\"fa fa-crop\"></i> {{ 'TOOLBAR.OK' | translate }}\n        </button>\n        <button type=\"button\" class=\"btn btn-danger btn-sm ml-1\" (click)=\"hide()\">\n            <i class=\"fa fa-times\"></i> {{ 'TOOLBAR.CANCEL' | translate }}\n        </button>\n    </div>\n</ng-template>"
            }] }
];
/** @nocollapse */
CropperAvatarDialogComponent.ctorParameters = () => [
    { type: BsModalService }
];
CropperAvatarDialogComponent.propDecorators = {
    cropperModal: [{ type: ViewChild, args: ['cropperAvatarModal',] }],
    onCropped: [{ type: Output }],
    onHide: [{ type: Output }],
    onSelectFile: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.cropperModal;
    /**
     * @type {?}
     * @private
     */
    CropperAvatarDialogComponent.prototype.modalRef;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.cropperReady;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.imageChangedEvent;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.imageCroppedEvent;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.onCropped;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.onHide;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.onSelectFile;
    /**
     * @type {?}
     * @private
     */
    CropperAvatarDialogComponent.prototype.isModalShown;
    /**
     * @type {?}
     * @private
     */
    CropperAvatarDialogComponent.prototype.modalService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserProfileComponent {
    /**
     * @param {?} contactService
     * @param {?} userProfileService
     * @param {?} notification
     * @param {?} translate
     */
    constructor(contactService, userProfileService, notification, translate) {
        this.contactService = contactService;
        this.userProfileService = userProfileService;
        this.notification = notification;
        this.translate = translate;
        this.profile = new Contact();
        this.defaultAvatarUrl = UserProfileService.DEFAULT_AVATAR_URL;
        this.address = new Address();
        this.isAvatarExist = false;
        this.translateSubscription = translate.get(['COMMON.MODULE.USER_PROFILE']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.profileTranslations = res['COMMON.MODULE.USER_PROFILE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.profile.address) {
            this.profile.address = new Address();
        }
        this.isAvatarExist = !!(this.imageAvatarUrl); // Check avatar exist to delete
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeFileAvatar($event) {
        /** @type {?} */
        const files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            const image = files[0];
            image['value'] = image;
            if (image) {
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    image.url = e.target.result;
                    this.imageAvatarUrl = image.url;
                });
                reader.readAsDataURL(image);
            }
            this.cropperAvatarDialog.show($event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelectFile($event) {
        if (!this.upload) {
            return;
        }
        if (this.fileUpload && this.fileUpload.nativeElement) {
            this.fileUpload.nativeElement.click();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    uploadImage($event) {
        if (this.fileUpload.nativeElement.value) {
            this.updateAvatar();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    removeImage($event) {
        if (this.fileUpload.nativeElement.value) {
            this.fileUpload.nativeElement.value = '';
            if (this.isAvatarExist) {
                this.userProfileService.getAvatarUrl().then((/**
                 * @param {?} url
                 * @return {?}
                 */
                url => {
                    this.imageAvatarUrl = url;
                }));
            }
            else {
                this.imageAvatarUrl = this.defaultAvatarUrl;
            }
            //this.imageChangedEvent = $event;
        }
        // Delete avatar
        /*
        if (this.upload && this.isAvatarExist) {
            this.contactService.deleteAvatar().subscribe((data: any) => {
                const {AVATAR, IMAGE_REMOVE_SUCCESSFUL_MSG, IMAGE_REMOVE_ERROR_MSG} = this.profileTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    this.fileUpload.nativeElement.value = '';
                    this.notification.showMessage(IMAGE_REMOVE_SUCCESSFUL_MSG, 'success', AVATAR);
                } else {
                    this.notification.showMessage(IMAGE_REMOVE_ERROR_MSG, 'error', AVATAR);
                }
            });
        }
        */
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.imageAvatarUrl = this.defaultAvatarUrl;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateAvatar() {
        /** @type {?} */
        const formData = new FormData(this.photoFrmElementRef.nativeElement);
        /** @type {?} */
        const name = this.fileUpload.nativeElement.name;
        formData.delete(name);
        //Upload Blob (cropped image) instead of file.
        formData.append(name, this.cropperAvatarDialog.getImageBlob());
        // Upload Avatar
        this.contactService.uploadPhoto(formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            const { AVATAR, IMAGE_UPDATE_SUCCESSFUL_MSG, IMAGE_UPDATE_ERROR_MSG } = this.profileTranslations;
            if (ErrorMessage.TYPE !== data.type) {
                this.fileUpload.nativeElement.value = '';
                this.userProfileService.increaseAvatarVersion();
                this.notification.showMessage(IMAGE_UPDATE_SUCCESSFUL_MSG, 'success', AVATAR);
            }
            else {
                this.notification.showMessage(IMAGE_UPDATE_ERROR_MSG, 'error', AVATAR);
            }
        }));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    onCropped(url) {
        this.imageAvatarUrl = url;
    }
}
UserProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-user-profile',
                template: "<div class=\"content-profile\">\n    <div class=\"row\">\n        <div class=\"col-lg-4\">\n            <div class=\"text-center card-box\">\n                <div class=\"member-card\">\n                    <div class=\"thumb-xl member-thumb mb-3 center-block\">\n                        <form #userPhotoFrm style=\"display: none\">\n                            <input #fileAvatar name=\"fileUpload\" (change)=\"changeFileAvatar($event)\" type=\"file\"\n                                   accept=\"image/*\"\n                                   class=\"form-control-file\">\n                        </form>\n                        <img [src]=\"imageAvatarUrl ? imageAvatarUrl: defaultAvatarUrl\" (error)=\"updateBlankImage($event)\"\n                             class=\"rounded-circle\" [ngClass]=\"{'empty-photo': !imageAvatarUrl, 'img-thumbnail': imageAvatarUrl}\"\n                             (click)=\"onSelectFile($event)\">\n                    </div>\n                    <div>\n                        <div *ngIf=\"upload\" class=\"m-t-10\">\n                            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"fileAvatar.click()\">\n                                <i class=\"fa fa-picture-o\"></i> {{'COMMON.MODULE.USER_PROFILE.CHOSEN_IMAGE' | translate}}\n                            </button>\n                            <button *ngIf=\"fileUpload?.nativeElement?.value\" type=\"button\" class=\"btn btn-success btn-sm ml-1\" (click)=\"uploadImage($event)\">\n                                <i class=\"fa fa-upload\"></i> {{'COMMON.MODULE.USER_PROFILE.SAVE_IMAGE' | translate}}\n                            </button>\n                            <button *ngIf=\"fileUpload?.nativeElement?.value\" type=\"button\" (click)=\"removeImage($event)\" class=\"btn btn-danger btn-sm ml-1\">\n                                <i class=\"fa fa-trash\"></i> {{'COMMON.MODULE.USER_PROFILE.REMOVE_IMAGE' | translate}}\n                            </button>\n                        </div>\n                        <div class=\"mt-3\">\n                            <h5 *ngIf=\"profile.salutationType\">{{profile.salutationType}}. {{profile.firstName}}</h5>\n                            <h5 *ngIf=\"!profile.salutationType\">{{profile.fullName}}</h5>\n                            <p *ngIf=\"profile.userCode\" class=\"mt-0\">\n                                <i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i>\n                                {{profile.userCode}}\n                            </p>\n                        </div>\n                    </div>\n                    <div class=\"text-left\">\n                        <div *ngIf=\"profile.salutationType\">\n                            <strong><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.FULL_NAME' | translate}}</strong>\n                            <p>{{profile.fullName}}</p>\n                        </div>\n                        <hr>\n                        <strong><i class=\"fa fa-phone margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.MOBILE' | translate}}</strong>\n                        <p class=\"text-muted\"><a href=\"tel:{{profile.mobilePhone}}\">{{profile.mobilePhone}}</a></p>\n                        <hr>\n                        <strong><i class=\"fa fa-envelope margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.EMAIL' | translate}}</strong>\n                        <p class=\"text-muted\"><a href=\"mailto:{{profile.primaryEmail}}\">{{profile.primaryEmail}}</a></p>\n                        <hr>\n                        <strong><i class=\"fa fa-map-marker margin-r-5\"></i> {{'COMMON.MODULE.ADDRESS.ADDRESS' | translate}}</strong>\n                        <p>{{profile.address?.address}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-lg-8 p-0\">\n            <div class=\"info-box\">\n                <div class=\"card tab-style1\">\n                    <div>\n                        <ng-template [ngTemplateOutlet]=\"tabContent\"></ng-template>\n                        <tabset *ngIf=\"!tabContent\">\n                            <tab id=\"profile-general-tab\">\n                                <ng-template tabHeading>\n                                    <b><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.GENERAL_INFORMATION' | translate}}</b>\n                                </ng-template>\n                                <app-user-profile-info [profile]=\"profile\"></app-user-profile-info>\n                            </tab>\n                        </tabset>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <app-cropper-avatar-dialog (onCropped)=\"onCropped($event)\" (onSelectFile)=\"onSelectFile($event)\"></app-cropper-avatar-dialog>\n</div>\n",
                styles: [".content-profile{min-height:250px;padding:0 15px 15px 0}.m-b-3{margin-bottom:30px!important}.box-profile{padding:10px}.img-circle{border-radius:50%}.m-b-2{margin-bottom:20px!important}.profile-username{font-size:21px;margin-top:5px}.info-box{display:block;min-height:90px;background:#fff;width:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa;border-radius:5px;height:100%;padding:15px}.margin-r-5{margin-right:5px}.card{position:relative;display:flex;flex-direction:column;background-color:#fff;border-radius:.25rem}.tab-style1{border:0}.card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#fff;height:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.img-thumbnail{padding:0;width:150px;height:150px;cursor:pointer}.text-muted{color:#80898e!important}:host /deep/ .icon-div{width:42px;position:relative}:host /deep/ .icon-custom{position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%,-50%)}:host /deep/ .upload-signature-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;width:260px;cursor:pointer}:host /deep/ .signature-thumbnail{cursor:pointer;max-width:100%;max-height:300px}.empty-photo{text-align:center;border:2px dashed #acacac;background:#f3f3f3;cursor:pointer;height:150px;width:150px}"]
            }] }
];
/** @nocollapse */
UserProfileComponent.ctorParameters = () => [
    { type: GlobalContactService },
    { type: UserProfileService },
    { type: NotificationService },
    { type: TranslateService }
];
UserProfileComponent.propDecorators = {
    tabContent: [{ type: ContentChild, args: ['tabContent',] }],
    photoFrmElementRef: [{ type: ViewChild, args: ['userPhotoFrm',] }],
    fileUpload: [{ type: ViewChild, args: ['fileAvatar',] }],
    cropperAvatarDialog: [{ type: ViewChild, args: [CropperAvatarDialogComponent,] }],
    profile: [{ type: Input }],
    imageAvatarUrl: [{ type: Input }],
    upload: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    UserProfileComponent.prototype.tabContent;
    /** @type {?} */
    UserProfileComponent.prototype.photoFrmElementRef;
    /** @type {?} */
    UserProfileComponent.prototype.fileUpload;
    /** @type {?} */
    UserProfileComponent.prototype.cropperAvatarDialog;
    /** @type {?} */
    UserProfileComponent.prototype.profile;
    /** @type {?} */
    UserProfileComponent.prototype.imageAvatarUrl;
    /** @type {?} */
    UserProfileComponent.prototype.upload;
    /** @type {?} */
    UserProfileComponent.prototype.defaultAvatarUrl;
    /** @type {?} */
    UserProfileComponent.prototype.address;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.isAvatarExist;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.profileTranslations;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.contactService;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.userProfileService;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
window['moment'] = window['moment'] || moment$1;
class UserProfileInfoComponent {
    /**
     * @param {?} dictionaryService
     * @param {?} locationService
     * @param {?} fb
     */
    constructor(dictionaryService, locationService, fb) {
        this.dictionaryService = dictionaryService;
        this.locationService = locationService;
        this.fb = fb;
        this.profile = new Contact();
        this.countries = [];
        this.provinces = [];
        this.districts = [];
        this.genders = [
            { code: "M", key: "COMMON.MODULE.USER_PROFILE.MALE" },
            { code: "FM", key: "COMMON.MODULE.USER_PROFILE.FEMALE" },
            { code: "OT", key: "COMMON.MODULE.USER_PROFILE.OTHER" }
        ];
        this.countryCode = 'VN';
        this.onValidate = new EventEmitter();
        this.editable = false;
        this.formChanged = new Subject$2();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.onValidate.emit(v);
        }));
        this.profileForm = this.fb.group({
            lastName: [null, Validators.required],
            middleName: [null, null],
            firstName: [null, Validators.required],
            email: [null, Validators.compose([CustomValidators.email])],
            fullDateOfBirth: [null, null],
            sex: [null, null],
            phone: [null, null],
            country: [null, null],
            street: [null, null],
            district: [null, null],
            province: [null, null]
        });
        this.onChanges();
        this.loadAddress();
    }
    /*
        private loadDictionary() {
            this.dictionaryService.findByKeys('SEX').subscribe((response: ResponseData) => {
                if (ErrorMessage.TYPE !== response.type) {
                    // const {data} = response.data.items||[];
                    // const {SEX} = data;
                    // this.genders = SEX;
                    this.genders = response.items || [];
                }
            });
        }
        */
    //
    // private loadGender(){
    //     this.dictionaryService.getSex({}).subscribe((response: ResponseData) => {
    //         if (ErrorMessage.TYPE !== response.type) {
    //             this.genders = response.items || [];
    //         }
    //     });
    // }
    /**
     * @private
     * @return {?}
     */
    loadAddress() {
        this.locationService.listCountry().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.countries = data.items || [];
                if (this.profile.address.countryCode) {
                    this.loadProvinceByCountryCode(this.profile.address.countryCode);
                    if (this.profile.address.provinceCode) {
                        this.loadDistrictByCode(this.profile.address.countryCode, this.profile.address.provinceCode);
                    }
                }
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    loadProvinceByCountryCode(countryCode) {
        this.countryCode = countryCode;
        this.provinceCode = null;
        this.districts = [];
        this.locationService.getProvinceByCountryCode(countryCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.provinces = data.items || [];
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    loadDistrictByCode(countryCode, provinceCode) {
        this.provinceCode = provinceCode;
        this.locationService.getDistrictByCode(countryCode, provinceCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.districts = data.items || [];
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeCountry($event) {
        /** @type {?} */
        const target$ = $event.target;
        //const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadProvinceByCountryCode(target$.value);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeProvince($event) {
        /** @type {?} */
        const target$ = $event.target;
        // const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadDistrictByCode(this.countryCode, target$.value);
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    onChangeDate(event) {
        if (window['moment']) {
            /** @type {?} */
            const date = window['moment'](new Date(event));
            if ((!date.isValid())) {
                setTimeout((/**
                 * @return {?}
                 */
                () => this.profile.fullDateOfBirth = new Date()));
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    onChanges() {
        this.profileForm.valueChanges.subscribe((/**
         * @param {?} val
         * @return {?}
         */
        val => {
            this.formChanged.next(this.profileForm.valid);
        }));
        if (this.editable) {
            this.profileForm.enable();
        }
        else {
            this.profileForm.disable();
        }
    }
}
UserProfileInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-user-profile-info',
                template: "<form [formGroup]=\"profileForm\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.USER_PROFILE.LAST_NAME' | translate}} : <i class=\"required\"></i>\n                </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.lastName\" [formControl]=\"profileForm.controls['lastName']\" required name=\"lastName\"\n                           [ngClass]=\"{'is-invalid':profileForm.controls['lastName'].hasError('required') && profileForm.controls['lastName'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" maxlength=\"256\"/>\n                    <div *ngIf=\"profileForm.controls['lastName'].hasError('required') && profileForm.controls['lastName'].touched\" class=\"text-danger col-sm-12 pl-0\"><i\n                            class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.LAST_NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.MIDDLE_NAME' | translate}} : </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.middleName\" [formControl]=\"profileForm.controls['middleName']\"\n                           name=\"middleName\" class=\"form-control form-control-sm col-xs-12 col-sm-12\" maxlength=\"64\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.USER_PROFILE.FIRST_NAME' | translate}} : <i class=\"required\"></i></label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.firstName\" [formControl]=\"profileForm.controls['firstName']\" required name=\"firstName\"\n                           [ngClass]=\"{'is-invalid':profileForm.controls['firstName'].hasError('required') && profileForm.controls['firstName'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12 \"/>\n                    <div *ngIf=\"profileForm.controls['firstName'].hasError('required') && profileForm.controls['firstName'].touched\"\n                         class=\"text-danger col-sm-12 pl-0\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.FIRST_NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.BIRTHDAY' | translate}} :</label>\n                <div class=\"input-group input-group-sm col-sm-3 pl-0\">\n                    <input [(ngModel)]=\"profile.fullDateOfBirth\" [formControl]=\"profileForm.controls['fullDateOfBirth']\"\n                           type=\"text\" name=\"fullDateOfBirth\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           bsDatepicker #fullDateOfBirth=\"bsDatepicker\"\n                           (bsValueChange)=\"onChangeDate($event)\">\n                    <div (click)=\"fullDateOfBirth.toggle()\" class=\"input-group-append input-group-sm\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></div>\n                    </div>\n                </div>\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.GENDER' | translate}} : </label>\n                <div class=\"col-sm-3 pl-0\">\n                    <select [(ngModel)]=\"profile.sex\" name=\"sex\" [formControl]=\"profileForm.controls['sex']\" class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.sex ? profile.sex : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let gender of genders\" [value]=\"gender.code\">\n                            {{gender.key | translate}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.EMAIL' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0 input-group input-group-sm\">\n                    <div class=\"input-group-prepend input-group-sm\">\n                        <div class=\"input-group-text icon-div\"><i class=\"fa fa-envelope\"></i></div>\n                    </div>\n                    <input [(ngModel)]=\"profile.primaryEmail\" name=\"primaryEmail\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           type=\"email\" [formControl]=\"profileForm.controls['email']\"\n                           [ngClass]=\"{'is-invalid': profileForm.controls['email'].hasError('pattern')\n                           && profileForm.controls['email'].touched}\"/>\n                    <!--div *ngIf=\"profileForm.controls['email'].hasError('required') && profileForm.controls['email'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'MODULE.USER_MANAGER.EMAIL_REQUIRED_MSG' | translate}}\n                    </div-->\n                    <div *ngIf=\"profileForm.controls['email'].hasError('email') && profileForm.controls['email'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'MODULE.USER_MANAGER.EMAIL_INVALID_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.MOBILE' | translate}}: </label>\n                <div class=\"col-sm-9 pl-0 input-group input-group-sm\">\n                    <div class=\"input-group-prepend input-group-sm\">\n                        <div class=\"input-group-text icon-div\"><i class=\"fa fa-phone icon-custom\"></i>\n                        </div>\n                    </div>\n                    <input [(ngModel)]=\"profile.mobilePhone\" [formControl]=\"profileForm.controls['phone']\" name=\"mobilePhone\" class=\"form-control form-control-sm col-xs-12 col-sm-12\" type=\"text\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.ADDRESS.STREET' | translate}} : </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.address.address\" name=\"street\" [formControl]=\"profileForm.controls['street']\" class=\"form-control form-control-sm col-xs-12 col-sm-12 \"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.ADDRESS.COUNTRY' | translate}}:</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.countryCode\" name=\"country\" [formControl]=\"profileForm.controls['country']\" (change)=\"onChangeCountry($event)\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.countryCode ? profile.address.countryCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let country of countries\" [value]=\"country.code\">\n                            {{country.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\"> {{'COMMON.MODULE.ADDRESS.CITY' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.provinceCode\" name=\"province\" [formControl]=\"profileForm.controls['province']\" (change)=\"onChangeProvince($event)\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.provinceCode ? profile.address.provinceCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let province of provinces\" [value]=\"province.code\">\n                            {{province.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\"> {{'COMMON.MODULE.ADDRESS.DISTRICT' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.districtCode\" name=\"district\" [formControl]=\"profileForm.controls['district']\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.districtCode ? profile.address.districtCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let district of districts\" [value]=\"district.code\">\n                            {{district.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n"
            }] }
];
/** @nocollapse */
UserProfileInfoComponent.ctorParameters = () => [
    { type: DictionaryService },
    { type: LocationService },
    { type: FormBuilder }
];
UserProfileInfoComponent.propDecorators = {
    profile: [{ type: Input }],
    onValidate: [{ type: Output }],
    editable: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    UserProfileInfoComponent.prototype.profile;
    /** @type {?} */
    UserProfileInfoComponent.prototype.profileForm;
    /** @type {?} */
    UserProfileInfoComponent.prototype.countries;
    /** @type {?} */
    UserProfileInfoComponent.prototype.provinces;
    /** @type {?} */
    UserProfileInfoComponent.prototype.districts;
    /** @type {?} */
    UserProfileInfoComponent.prototype.genders;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.countryCode;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.provinceCode;
    /** @type {?} */
    UserProfileInfoComponent.prototype.onValidate;
    /** @type {?} */
    UserProfileInfoComponent.prototype.editable;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.dictionaryService;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.locationService;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.fb;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageUtils {
    /**
     * @param {?} imageBase64
     * @return {?}
     */
    static getOrientation(imageBase64) {
        /** @type {?} */
        const view = new DataView(this.base64ToArrayBuffer(imageBase64));
        if (view.getUint16(0, false) != 0xFFD8) {
            return -2;
        }
        /** @type {?} */
        const length = view.byteLength;
        /** @type {?} */
        let offset = 2;
        while (offset < length) {
            if (view.getUint16(offset + 2, false) <= 8)
                return -1;
            /** @type {?} */
            const marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    return -1;
                }
                /** @type {?} */
                const little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                /** @type {?} */
                const tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                        return view.getUint16(offset + (i * 12) + 8, little);
                    }
                }
            }
            else if ((marker & 0xFF00) != 0xFF00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return -1;
    }
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    static base64ToArrayBuffer(imageBase64) {
        imageBase64 = imageBase64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        /** @type {?} */
        const binaryString = atob(imageBase64);
        /** @type {?} */
        const len = binaryString.length;
        /** @type {?} */
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
    /**
     * @param {?} srcBase64
     * @param {?} srcOrientation
     * @param {?} callback
     * @return {?}
     */
    static resetOrientation(srcBase64, srcOrientation, callback) {
        /** @type {?} */
        const img = new Image();
        img.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const width = img.width;
            /** @type {?} */
            const height = img.height;
            /** @type {?} */
            const canvas = document.createElement('canvas');
            /** @type {?} */
            const ctx = canvas.getContext('2d');
            if (ctx) {
                if (4 < srcOrientation && srcOrientation < 9) {
                    canvas.width = height;
                    canvas.height = width;
                }
                else {
                    canvas.width = width;
                    canvas.height = height;
                }
                ImageUtils.transformCanvas(ctx, srcOrientation, width, height);
                ctx.drawImage(img, 0, 0);
                callback(canvas.toDataURL());
            }
            else {
                callback(srcBase64);
            }
        });
        img.src = srcBase64;
    }
    /**
     * @private
     * @param {?} ctx
     * @param {?} orientation
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    static transformCanvas(ctx, orientation, width, height) {
        switch (orientation) {
            case 2:
                ctx.transform(-1, 0, 0, 1, width, 0);
                break;
            case 3:
                ctx.transform(-1, 0, 0, -1, width, height);
                break;
            case 4:
                ctx.transform(1, 0, 0, -1, 0, height);
                break;
            case 5:
                ctx.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                ctx.transform(0, 1, -1, 0, height, 0);
                break;
            case 7:
                ctx.transform(0, -1, -1, 0, height, width);
                break;
            case 8:
                ctx.transform(0, -1, 1, 0, 0, width);
                break;
            default:
                break;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MoveStart() { }
if (false) {
    /** @type {?} */
    MoveStart.prototype.active;
    /** @type {?} */
    MoveStart.prototype.type;
    /** @type {?} */
    MoveStart.prototype.position;
    /** @type {?} */
    MoveStart.prototype.x1;
    /** @type {?} */
    MoveStart.prototype.y1;
    /** @type {?} */
    MoveStart.prototype.x2;
    /** @type {?} */
    MoveStart.prototype.y2;
    /** @type {?} */
    MoveStart.prototype.clientX;
    /** @type {?} */
    MoveStart.prototype.clientY;
}
/**
 * @record
 */
function Dimensions() { }
if (false) {
    /** @type {?} */
    Dimensions.prototype.width;
    /** @type {?} */
    Dimensions.prototype.height;
}
/**
 * @record
 */
function CropperPosition() { }
if (false) {
    /** @type {?} */
    CropperPosition.prototype.x1;
    /** @type {?} */
    CropperPosition.prototype.y1;
    /** @type {?} */
    CropperPosition.prototype.x2;
    /** @type {?} */
    CropperPosition.prototype.y2;
}
/**
 * @record
 */
function ImageCroppedEvent() { }
if (false) {
    /** @type {?|undefined} */
    ImageCroppedEvent.prototype.base64;
    /** @type {?|undefined} */
    ImageCroppedEvent.prototype.file;
    /** @type {?} */
    ImageCroppedEvent.prototype.width;
    /** @type {?} */
    ImageCroppedEvent.prototype.height;
    /** @type {?} */
    ImageCroppedEvent.prototype.cropperPosition;
}
class ImageCropperComponent {
    /**
     * @param {?} elementRef
     * @param {?} sanitizer
     * @param {?} cd
     * @param {?} zone
     */
    constructor(elementRef, sanitizer, cd, zone) {
        this.elementRef = elementRef;
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.zone = zone;
        this.marginLeft = '0px';
        this.imageVisible = false;
        this.format = 'png';
        this.outputType = 'both';
        this.maintainAspectRatio = true;
        this.aspectRatio = 1;
        this.resizeToWidth = 0;
        this.roundCropper = false;
        this.onlyScaleDown = false;
        this.imageQuality = 92;
        this.autoCrop = true;
        this.cropper = {
            x1: -100,
            y1: -100,
            x2: 10000,
            y2: 10000
        };
        this.imageCropped = new EventEmitter();
        this.imageCroppedBase64 = new EventEmitter();
        this.imageCroppedFile = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        this.loadImageFailed = new EventEmitter();
        this.initCropper();
    }
    /**
     * @param {?} file
     * @return {?}
     */
    set imageFileChanged(file) {
        this.initCropper();
        if (file) {
            this.loadImageFile(file);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    set imageChangedEvent(event) {
        this.initCropper();
        if (event && event.target && event.target.files && event.target.files.length > 0) {
            this.loadImageFile(event.target.files[0]);
        }
    }
    /**
     * @param {?} imageBase64
     * @return {?}
     */
    set imageBase64(imageBase64) {
        this.initCropper();
        this.loadBase64Image(imageBase64);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['cropper']) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.setMaxSize();
                this.checkCropperPosition(false);
                this.doAutoCrop();
                this.cd.markForCheck();
            }));
        }
        if (changes['aspectRatio']) {
            this.resetCropperPosition();
        }
    }
    /**
     * @private
     * @return {?}
     */
    initCropper() {
        this.imageVisible = false;
        this.originalImage = null;
        this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
            + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
            + 'AAarVyFEAAAAASUVORK5CYII=';
        this.moveStart = {
            active: false,
            type: null,
            position: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            clientX: 0,
            clientY: 0
        };
        this.maxSize = {
            width: 0,
            height: 0
        };
        this.originalSize = {
            width: 0,
            height: 0
        };
        this.cropper.x1 = -100;
        this.cropper.y1 = -100;
        this.cropper.x2 = 10000;
        this.cropper.y2 = 10000;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    loadImageFile(file) {
        /** @type {?} */
        const fileReader = new FileReader();
        fileReader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const imageType = file.type;
            if (this.isValidImageType(imageType)) {
                try {
                    this.checkExifRotationAndLoadImage(event.target.result);
                }
                catch (e) {
                    this.loadImageFailed.emit();
                }
            }
            else {
                this.loadImageFailed.emit();
            }
        });
        fileReader.readAsDataURL(file);
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    isValidImageType(type) {
        return type === 'image/jpeg'
            || type === 'image/jpg'
            || type === 'image/png'
            || type === 'image/gif';
    }
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    checkExifRotationAndLoadImage(imageBase64) {
        /** @type {?} */
        const exifRotation = ImageUtils.getOrientation(imageBase64);
        if (exifRotation > 1) {
            ImageUtils.resetOrientation(imageBase64, exifRotation, (/**
             * @param {?} rotatedBase64
             * @return {?}
             */
            (rotatedBase64) => this.loadBase64Image(rotatedBase64)));
        }
        else {
            this.loadBase64Image(imageBase64);
        }
    }
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    loadBase64Image(imageBase64) {
        this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
        this.originalImage = new Image();
        this.originalImage.onload = (/**
         * @return {?}
         */
        () => {
            this.originalSize.width = this.originalImage.width;
            this.originalSize.height = this.originalImage.height;
            this.cd.markForCheck();
        });
        this.originalImage.src = imageBase64;
    }
    /**
     * @return {?}
     */
    imageLoadedInView() {
        if (this.originalImage != null) {
            this.imageLoaded.emit();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.setMaxSize();
                this.resetCropperPosition();
                this.cd.markForCheck();
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.resizeCropperPosition();
        this.setMaxSize();
    }
    /**
     * @private
     * @return {?}
     */
    resizeCropperPosition() {
        /** @type {?} */
        const displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (this.maxSize.width !== displayedImage.offsetWidth || this.maxSize.height !== displayedImage.offsetHeight) {
            this.cropper.x1 = this.cropper.x1 * displayedImage.offsetWidth / this.maxSize.width;
            this.cropper.x2 = this.cropper.x2 * displayedImage.offsetWidth / this.maxSize.width;
            this.cropper.y1 = this.cropper.y1 * displayedImage.offsetHeight / this.maxSize.height;
            this.cropper.y2 = this.cropper.y2 * displayedImage.offsetHeight / this.maxSize.height;
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetCropperPosition() {
        /** @type {?} */
        const displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (displayedImage.offsetWidth / this.aspectRatio < displayedImage.offsetHeight) {
            this.cropper.x1 = 0;
            this.cropper.x2 = displayedImage.offsetWidth;
            /** @type {?} */
            const cropperHeight = displayedImage.offsetWidth / this.aspectRatio;
            this.cropper.y1 = (displayedImage.offsetHeight - cropperHeight) / 2;
            this.cropper.y2 = this.cropper.y1 + cropperHeight;
        }
        else {
            this.cropper.y1 = 0;
            this.cropper.y2 = displayedImage.offsetHeight;
            /** @type {?} */
            const cropperWidth = displayedImage.offsetHeight * this.aspectRatio;
            this.cropper.x1 = (displayedImage.offsetWidth - cropperWidth) / 2;
            this.cropper.x2 = this.cropper.x1 + cropperWidth;
        }
        this.doAutoCrop();
        this.imageVisible = true;
    }
    /**
     * @param {?} event
     * @param {?} moveType
     * @param {?=} position
     * @return {?}
     */
    startMove(event, moveType, position = null) {
        this.moveStart = Object.assign({
            active: true,
            type: moveType,
            position: position,
            clientX: this.getClientX(event),
            clientY: this.getClientY(event)
        }, this.cropper);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveImg(event) {
        if (this.moveStart.active) {
            event.stopPropagation();
            event.preventDefault();
            this.setMaxSize();
            if (this.moveStart.type === 'move') {
                this.move(event);
                this.checkCropperPosition(true);
            }
            else if (this.moveStart.type === 'resize') {
                this.resize(event);
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    }
    /**
     * @private
     * @return {?}
     */
    setMaxSize() {
        /** @type {?} */
        const el = this.elementRef.nativeElement.querySelector('.source-image');
        this.maxSize.width = el.offsetWidth;
        this.maxSize.height = el.offsetHeight;
        this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
    }
    /**
     * @private
     * @param {?=} maintainSize
     * @return {?}
     */
    checkCropperPosition(maintainSize = false) {
        if (this.cropper.x1 < 0) {
            this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
            this.cropper.x1 = 0;
        }
        if (this.cropper.y1 < 0) {
            this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
            this.cropper.y1 = 0;
        }
        if (this.cropper.x2 > this.maxSize.width) {
            this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
            this.cropper.x2 = this.maxSize.width;
        }
        if (this.cropper.y2 > this.maxSize.height) {
            this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
            this.cropper.y2 = this.maxSize.height;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveStop(event) {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    move(event) {
        /** @type {?} */
        const diffX = this.getClientX(event) - this.moveStart.clientX;
        /** @type {?} */
        const diffY = this.getClientY(event) - this.moveStart.clientY;
        this.cropper.x1 = this.moveStart.x1 + diffX;
        this.cropper.y1 = this.moveStart.y1 + diffY;
        this.cropper.x2 = this.moveStart.x2 + diffX;
        this.cropper.y2 = this.moveStart.y2 + diffY;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    resize(event) {
        /** @type {?} */
        const diffX = this.getClientX(event) - this.moveStart.clientX;
        /** @type {?} */
        const diffY = this.getClientY(event) - this.moveStart.clientY;
        switch (this.moveStart.position) {
            case 'left':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                break;
            case 'topleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'top':
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'topright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'right':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                break;
            case 'bottomright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
            case 'bottom':
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
            case 'bottomleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
        }
        if (this.maintainAspectRatio) {
            this.checkAspectRatio();
        }
    }
    /**
     * @private
     * @return {?}
     */
    checkAspectRatio() {
        /** @type {?} */
        let overflowX = 0;
        /** @type {?} */
        let overflowY = 0;
        switch (this.moveStart.position) {
            case 'top':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'bottom':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : (overflowX / this.aspectRatio);
                }
                break;
            case 'topleft':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'topright':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
        }
    }
    /**
     * @private
     * @return {?}
     */
    doAutoCrop() {
        if (this.autoCrop) {
            this.crop();
        }
    }
    /**
     * @return {?}
     */
    crop() {
        /** @type {?} */
        const displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (displayedImage && this.originalImage != null) {
            /** @type {?} */
            const ratio = this.originalSize.width / displayedImage.offsetWidth;
            /** @type {?} */
            const left = Math.round(this.cropper.x1 * ratio);
            /** @type {?} */
            const top = Math.round(this.cropper.y1 * ratio);
            /** @type {?} */
            const width = Math.round((this.cropper.x2 - this.cropper.x1) * ratio);
            /** @type {?} */
            const height = Math.round((this.cropper.y2 - this.cropper.y1) * ratio);
            /** @type {?} */
            const resizeRatio = this.getResizeRatio(width);
            /** @type {?} */
            const resizedWidth = Math.floor(width * resizeRatio);
            /** @type {?} */
            const resizedHeight = Math.floor(height * resizeRatio);
            /** @type {?} */
            const cropCanvas = (/** @type {?} */ (document.createElement('canvas')));
            cropCanvas.width = resizedWidth;
            cropCanvas.height = resizedHeight;
            /** @type {?} */
            const ctx = cropCanvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(this.originalImage, left, top, width, height, 0, 0, width * resizeRatio, height * resizeRatio);
                this.cropToOutputType(cropCanvas, resizedWidth, resizedHeight);
            }
        }
    }
    /**
     * @private
     * @param {?} cropCanvas
     * @param {?} resizedWidth
     * @param {?} resizedHeight
     * @return {?}
     */
    cropToOutputType(cropCanvas, resizedWidth, resizedHeight) {
        /** @type {?} */
        const output = {
            width: resizedWidth,
            height: resizedHeight,
            cropperPosition: Object.assign({}, this.cropper)
        };
        switch (this.outputType) {
            case 'base64':
                output.base64 = this.cropToBase64(cropCanvas);
                this.imageCropped.emit(output);
                break;
            case 'file':
                this.cropToFile(cropCanvas)
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                (result) => {
                    output.file = result;
                    this.imageCropped.emit(output);
                }));
                break;
            case 'both':
                output.base64 = this.cropToBase64(cropCanvas);
                this.cropToFile(cropCanvas)
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                (result) => {
                    output.file = result;
                    this.imageCropped.emit(output);
                }));
                break;
        }
    }
    /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    cropToBase64(cropCanvas) {
        /** @type {?} */
        const imageBase64 = cropCanvas.toDataURL('image/' + this.format, this.getQuality());
        this.imageCroppedBase64.emit(imageBase64);
        return imageBase64;
    }
    /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    cropToFile(cropCanvas) {
        return this.getCanvasBlob(cropCanvas)
            .then((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            if (result) {
                this.imageCroppedFile.emit(result);
            }
            return result;
        }));
    }
    /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    getCanvasBlob(cropCanvas) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            cropCanvas.toBlob((/**
             * @param {?} result
             * @return {?}
             */
            (result) => this.zone.run((/**
             * @return {?}
             */
            () => resolve(result)))), 'image/' + this.format, this.getQuality());
        }));
    }
    /**
     * @private
     * @return {?}
     */
    getQuality() {
        return Math.min(1, Math.max(0, this.imageQuality / 100));
    }
    /**
     * @private
     * @param {?} width
     * @return {?}
     */
    getResizeRatio(width) {
        return this.resizeToWidth > 0 && (!this.onlyScaleDown || width > this.resizeToWidth)
            ? this.resizeToWidth / width
            : 1;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    getClientX(event) {
        return event.clientX != null ? event.clientX : event.touches[0].clientX;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    getClientY(event) {
        return event.clientY != null ? event.clientY : event.touches[0].clientY;
    }
}
ImageCropperComponent.decorators = [
    { type: Component, args: [{
                selector: 'image-cropper',
                template: "<div>\n    <img\n        [src]=\"safeImgDataUrl\"\n        [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n        (load)=\"imageLoadedInView()\"\n        class=\"source-image\"\n    />\n    <div class=\"cropper\"\n         [class.rounded]=\"roundCropper\"\n         [style.top.px]=\"cropper.y1\"\n         [style.left.px]=\"cropper.x1\"\n         [style.width.px]=\"cropper.x2 - cropper.x1\"\n         [style.height.px]=\"cropper.y2 - cropper.y1\"\n         [style.margin-left]=\"marginLeft\"\n         [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n    >\n        <div\n            (mousedown)=\"startMove($event, 'move')\"\n            (touchstart)=\"startMove($event, 'move')\"\n            class=\"move\"\n        >&nbsp;</div>\n        <span\n            class=\"resize topleft\"\n            (mousedown)=\"startMove($event, 'resize', 'topleft')\"\n            (touchstart)=\"startMove($event, 'resize', 'topleft')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize top\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize topright\"\n            (mousedown)=\"startMove($event, 'resize', 'topright')\"\n            (touchstart)=\"startMove($event, 'resize', 'topright')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize right\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize bottomright\"\n            (mousedown)=\"startMove($event, 'resize', 'bottomright')\"\n            (touchstart)=\"startMove($event, 'resize', 'bottomright')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize bottom\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize bottomleft\"\n            (mousedown)=\"startMove($event, 'resize', 'bottomleft')\"\n            (touchstart)=\"startMove($event, 'resize', 'bottomleft')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize left\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize-bar top\"\n            (mousedown)=\"startMove($event, 'resize', 'top')\"\n            (touchstart)=\"startMove($event, 'resize', 'top')\"\n        ></span>\n        <span\n            class=\"resize-bar right\"\n            (mousedown)=\"startMove($event, 'resize', 'right')\"\n            (touchstart)=\"startMove($event, 'resize', 'right')\"\n        ></span>\n        <span\n            class=\"resize-bar bottom\"\n            (mousedown)=\"startMove($event, 'resize', 'bottom')\"\n            (touchstart)=\"startMove($event, 'resize', 'bottom')\"\n        ></span>\n        <span\n            class=\"resize-bar left\"\n            (mousedown)=\"startMove($event, 'resize', 'left')\"\n            (touchstart)=\"startMove($event, 'resize', 'left')\"\n        ></span>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;position:relative;width:100%;max-width:100%;max-height:400px;overflow:hidden;padding:5px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host>div{position:relative;width:100%}:host>div .source-image{max-width:100%;max-height:100%;min-width:150px;min-height:150px}:host .cropper{position:absolute;display:flex;color:#53535c!important;background:0 0!important;touch-action:none;outline:rgba(255,255,255,.3) solid 1000px}:host .cropper:after{position:absolute;content:'';top:0;bottom:0;left:0;right:0;pointer-events:none;border:1px dashed;opacity:.75;color:inherit;z-index:1}:host .cropper .move{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}:host .cropper .resize{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}:host .cropper .resize .square{display:inline-block;background:#53535c!important;width:6px;height:6px;border:1px solid rgba(255,255,255,.5)}:host .cropper .resize.topleft{top:-12px;left:-12px;cursor:nw-resize}:host .cropper .resize.top{top:-12px;left:calc(50% - 12px);cursor:n-resize}:host .cropper .resize.topright{top:-12px;right:-12px;cursor:ne-resize}:host .cropper .resize.right{top:calc(50% - 12px);right:-12px;cursor:e-resize}:host .cropper .resize.bottomright{bottom:-12px;right:-12px;cursor:se-resize}:host .cropper .resize.bottom{bottom:-12px;left:calc(50% - 12px);cursor:s-resize}:host .cropper .resize.bottomleft{bottom:-12px;left:-12px;cursor:sw-resize}:host .cropper .resize.left{top:calc(50% - 12px);left:-12px;cursor:w-resize}:host .cropper .resize-bar{position:absolute;z-index:1}:host .cropper .resize-bar.top{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:n-resize}:host .cropper .resize-bar.right{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:e-resize}:host .cropper .resize-bar.bottom{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:s-resize}:host .cropper .resize-bar.left{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:w-resize}:host .cropper.rounded{outline-color:transparent}:host .cropper.rounded:after{box-shadow:0 0 0 100vw rgba(255,255,255,.3);border-radius:100%}:host .cropper.rounded .move{border-radius:100%}"]
            }] }
];
/** @nocollapse */
ImageCropperComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DomSanitizer },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
ImageCropperComponent.propDecorators = {
    imageFileChanged: [{ type: Input }],
    imageChangedEvent: [{ type: Input }],
    imageBase64: [{ type: Input }],
    format: [{ type: Input }],
    outputType: [{ type: Input }],
    maintainAspectRatio: [{ type: Input }],
    aspectRatio: [{ type: Input }],
    resizeToWidth: [{ type: Input }],
    roundCropper: [{ type: Input }],
    onlyScaleDown: [{ type: Input }],
    imageQuality: [{ type: Input }],
    autoCrop: [{ type: Input }],
    cropper: [{ type: Input }],
    imageCropped: [{ type: Output }],
    imageCroppedBase64: [{ type: Output }],
    imageCroppedFile: [{ type: Output }],
    imageLoaded: [{ type: Output }],
    loadImageFailed: [{ type: Output }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
    moveImg: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }, { type: HostListener, args: ['document:touchmove', ['$event'],] }],
    moveStop: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }, { type: HostListener, args: ['document:touchend', ['$event'],] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.originalImage;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.moveStart;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.maxSize;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.originalSize;
    /** @type {?} */
    ImageCropperComponent.prototype.safeImgDataUrl;
    /** @type {?} */
    ImageCropperComponent.prototype.marginLeft;
    /** @type {?} */
    ImageCropperComponent.prototype.imageVisible;
    /** @type {?} */
    ImageCropperComponent.prototype.format;
    /** @type {?} */
    ImageCropperComponent.prototype.outputType;
    /** @type {?} */
    ImageCropperComponent.prototype.maintainAspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.aspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.resizeToWidth;
    /** @type {?} */
    ImageCropperComponent.prototype.roundCropper;
    /** @type {?} */
    ImageCropperComponent.prototype.onlyScaleDown;
    /** @type {?} */
    ImageCropperComponent.prototype.imageQuality;
    /** @type {?} */
    ImageCropperComponent.prototype.autoCrop;
    /** @type {?} */
    ImageCropperComponent.prototype.cropper;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCropped;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCroppedBase64;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCroppedFile;
    /** @type {?} */
    ImageCropperComponent.prototype.imageLoaded;
    /** @type {?} */
    ImageCropperComponent.prototype.loadImageFailed;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.zone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageCropperModule {
}
ImageCropperModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    CoreModule,
                    TranslateModule
                ],
                declarations: [
                    ImageCropperComponent,
                    CropperAvatarDialogComponent
                ],
                exports: [
                    ImageCropperComponent,
                    CropperAvatarDialogComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AccessRoleComponent {
    /**
     * @param {?} glService
     */
    constructor(glService) {
        this.glService = glService;
        this.arrayRoleUser = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadAccessRole();
    }
    /**
     * @return {?}
     */
    loadAccessRole() {
        this.glService.getAccessRoles().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            if (result.type !== ErrorMessage.TYPE) {
                this.arrayRoleUser = result.items;
            }
        }));
    }
}
AccessRoleComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-access-role',
                template: "<data-table [items]=\"arrayRoleUser\"\n            [itemCount]=\"arrayRoleUser.length\"\n            [sortAsc]=\"true\"\n            [limit]=\"9999\"\n            [header]=\"false\"\n            [selectColumn]=\"false\"\n            [multiSelect]=\"false\"\n            (reload)=\"loadAccessRole()\"\n            [expandableRows]=\"false\"\n            [pagination]=\"false\"\n            [pagination_input]=\"true\"\n            [pagination_range]=\"true\"\n            [indexColumnHeader]=\"'#'\"\n            [indexColumn]=\"true\"\n            [selectOnRowClick]=\"true\"\n            [showReloading]=\"false\">\n  <data-table-column\n      [property]=\"'name'\"\n      [header]=\"'COMMON.MODULE.USER_PROFILE.GROUP_NAME' | translate\"\n      [width]=\"200\">\n  </data-table-column>\n  <data-table-column\n      [property]=\"'description'\"\n      [header]=\"'COMMON.MODULE.USER_PROFILE.DESCRIPTION' | translate\">\n  </data-table-column>\n</data-table>"
            }] }
];
/** @nocollapse */
AccessRoleComponent.ctorParameters = () => [
    { type: GlobalContactService }
];
if (false) {
    /** @type {?} */
    AccessRoleComponent.prototype.arrayRoleUser;
    /**
     * @type {?}
     * @private
     */
    AccessRoleComponent.prototype.glService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataTableColumn {
    constructor() {
        this.sortable = false;
        this.resizable = false;
        this.visible = true;
        this.styleClassObject = {}; // for [ngClass]
    }
    /**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    getCellColor(row, index) {
        if (this.cellColors !== undefined) {
            return ((/** @type {?} */ (this.cellColors)))(row.item, row, this, index);
        }
    }
    // for [ngClass]
    /**
     * @return {?}
     */
    ngOnInit() {
        this._initCellClass();
    }
    /**
     * @private
     * @return {?}
     */
    _initCellClass() {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            }
            else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }
        if (this.styleClass != null) {
            this.styleClassObject = {
                [this.styleClass]: true
            };
        }
    }
}
DataTableColumn.decorators = [
    { type: Directive, args: [{
                selector: 'data-table-column'
            },] }
];
DataTableColumn.propDecorators = {
    header: [{ type: Input }],
    sortable: [{ type: Input }],
    resizable: [{ type: Input }],
    property: [{ type: Input }],
    styleClass: [{ type: Input }],
    cellColors: [{ type: Input }],
    width: [{ type: Input }],
    visible: [{ type: Input }],
    cellTemplate: [{ type: ContentChild, args: ['dataTableCell',] }],
    headerTemplate: [{ type: ContentChild, args: ['dataTableHeader',] }]
};
if (false) {
    /** @type {?} */
    DataTableColumn.prototype.header;
    /** @type {?} */
    DataTableColumn.prototype.sortable;
    /** @type {?} */
    DataTableColumn.prototype.resizable;
    /** @type {?} */
    DataTableColumn.prototype.property;
    /** @type {?} */
    DataTableColumn.prototype.styleClass;
    /** @type {?} */
    DataTableColumn.prototype.cellColors;
    /** @type {?} */
    DataTableColumn.prototype.width;
    /** @type {?} */
    DataTableColumn.prototype.visible;
    /** @type {?} */
    DataTableColumn.prototype.cellTemplate;
    /** @type {?} */
    DataTableColumn.prototype.headerTemplate;
    /**
     * @type {?}
     * @private
     */
    DataTableColumn.prototype.styleClassObject;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataTableRow {
    /**
     * @param {?} dataTable
     */
    constructor(dataTable) {
        this.dataTable = dataTable;
        this.selectedChange = new EventEmitter();
        this.expandedChange = new EventEmitter();
        this._this = this; // FIXME is there no template keyword for this in angular 2?
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.selectedChange.emit(selected);
    }
    // other:
    /**
     * @return {?}
     */
    get displayIndex() {
        if (this.dataTable.pagination) {
            return this.dataTable.displayParams.offset + this.index + 1;
        }
        else {
            return this.index + 1;
        }
    }
    /**
     * @return {?}
     */
    getTooltip() {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.selected = false;
    }
    /**
     * @return {?}
     */
    expand() {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }
    /**
     * @return {?}
     */
    collapse() {
        this.expanded = false;
        this.expandedChange.emit(this.expanded);
    }
}
DataTableRow.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: '[dataTableRow]',
                template: "<tr\tclass=\"data-table-row\"\n       [title]=\"getTooltip()\"\n       [style.background-color]=\"dataTable.getRowColor(item, index, _this)\"\n       [class.row-odd]=\"index % 2 === 0\"\n       [class.row-even]=\"index % 2 === 1\"\n       [class.selected]=\"selected\"\n       [class.clickable]=\"dataTable.selectOnRowClick\"\n       (dblclick)=\"dataTable.rowDoubleClicked(_this, $event)\"\n       (click)=\"dataTable.rowClicked(_this, $event)\"\n>\n    <td [hide]=\"!dataTable.expandColumnVisible\">\n        <div tabindex=\"0\" role=\"button\" (click)=\"this.expand(); $event.stopPropagation()\" class=\"row-expand-button\"\n             [attr.aria-expanded]=\"expanded\" [title]=\"dataTable.translations.expandRow\" [attr.aria-label]=\"dataTable.translations.expandRow\">\n            <span class=\"fa\" [ngClass]=\"{'fa-caret-right': !expanded, 'fa-caret-down': expanded}\" aria-hidden=\"true\"></span>\n        </div>\n    </td>\n    <td [hide]=\"!dataTable.indexColumnVisible\" class=\"index-column\" [textContent]=\"displayIndex\"></td>\n    <td [hide]=\"!dataTable.selectColumnVisible\" class=\"select-column\" (click)=\"$event.stopPropagation()\">\n        <input type=\"checkbox\" [(ngModel)]=\"selected\"/>\n        <label class=\"mb-0 lbl\"></label>\n    </td>\n    <td *ngFor=\"let column of dataTable.columns\" [hide]=\"!column.visible\" [ngClass]=\"column.styleClassObject\" class=\"data-column\"\n        [style.background-color]=\"column.getCellColor(_this, index)\">\n        <div *ngIf=\"!column.cellTemplate\" [textContent]=\"item[column.property]\"></div>\n        <div *ngIf=\"column.cellTemplate\" [ngTemplateOutlet]=\"column.cellTemplate\" [ngTemplateOutletContext]=\"{column: column, row: _this, item: item}\"></div>\n    </td>\n</tr>\n<tr *ngIf=\"dataTable.expandableRows\" [hide]=\"!expanded\" class=\"row-expansion\">\n    <td [attr.colspan]=\"dataTable.columnCount\">\n        <div [ngTemplateOutlet]=\"dataTable.expandTemplate\" [ngTemplateOutletContext]=\"{row: _this, item: item}\"></div>\n    </td>\n</tr>",
                styles: [".index-column,.select-column{text-align:center}.row-expand-button{cursor:pointer;text-align:center}.clickable{cursor:pointer}.data-table-row.selected{background:#ffc!important}"]
            }] }
];
/** @nocollapse */
DataTableRow.ctorParameters = () => [
    { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DataTable)),] }] }
];
DataTableRow.propDecorators = {
    item: [{ type: Input }],
    index: [{ type: Input }],
    selectedChange: [{ type: Output }],
    expandedChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DataTableRow.prototype.item;
    /** @type {?} */
    DataTableRow.prototype.index;
    /** @type {?} */
    DataTableRow.prototype.expanded;
    /**
     * @type {?}
     * @private
     */
    DataTableRow.prototype._selected;
    /** @type {?} */
    DataTableRow.prototype.selectedChange;
    /** @type {?} */
    DataTableRow.prototype.expandedChange;
    /** @type {?} */
    DataTableRow.prototype._this;
    /** @type {?} */
    DataTableRow.prototype.dataTable;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultTranslations = {
    headerReload: 'reload',
    headerColumnSelector: 'column selector',
    indexColumn: 'index',
    selectColumn: 'select',
    selectRow: 'select',
    selectAllRows: 'select',
    expandColumn: 'expand',
    expandRow: 'expand',
    paginationLimit: 'Limit',
    paginationRange: 'Results',
    firstText: 'First Page',
    prevText: 'Previous Page',
    nextText: 'Next Page',
    lastText: 'Last Page'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} event
 * @param {?} __1
 * @return {?}
 */
function drag(event, { move: move, up: up }) {
    /** @type {?} */
    let startX = event.pageX;
    /** @type {?} */
    let startY = event.pageY;
    /** @type {?} */
    let x = startX;
    /** @type {?} */
    let y = startY;
    /** @type {?} */
    let moved = false;
    /**
     * @param {?} event
     * @return {?}
     */
    function mouseMoveHandler(event) {
        /** @type {?} */
        let dx = event.pageX - x;
        /** @type {?} */
        let dy = event.pageY - y;
        x = event.pageX;
        y = event.pageY;
        if (dx || dy)
            moved = true;
        move(event, dx, dy, x, y);
        event.preventDefault(); // to avoid text selection
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function mouseUpHandler(event) {
        x = event.pageX;
        y = event.pageY;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (up)
            up(event, x, y, moved);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataTable {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._items = [];
        this.header = false;
        this.pagination = true;
        this.pagination_range = true;
        this.pagination_limit = false;
        this.pagination_input = true;
        this.pagination_numbers = false;
        this.indexColumn = true;
        this.indexColumnHeader = '';
        this.selectColumn = false;
        this.multiSelect = true;
        this.substituteRows = false;
        this.expandableRows = false;
        this.translations = defaultTranslations;
        this.selectOnRowClick = false;
        this.autoReload = true;
        this.showReloading = true;
        this.showColumnSelector = false;
        this.autoHidePaging = false;
        this._sortAsc = true;
        this._offset = 0;
        this._limit = 10;
        // Reloading:
        this._reloading = false;
        this.reload = new EventEmitter();
        this._displayParams = (/** @type {?} */ ({})); // params of the last finished reload
        this._scheduledReload = null;
        // event handlers:
        this.rowClick = new EventEmitter();
        this.rowDoubleClick = new EventEmitter();
        this.headerClick = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.selectedRows = [];
        this._selectAllCheckbox = false;
        this.selectionChange = new EventEmitter();
        this.expandClick = new EventEmitter();
        // column resizing:
        this._resizeInProgress = false;
        this.resizeLimit = 30;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this.selectedRows = [];
        this._items = items;
        this._onReloadFinished();
    }
    /**
     * @return {?}
     */
    get sortBy() {
        return this._sortBy;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortBy(value) {
        this._sortBy = value;
        this._triggerReload();
    }
    /**
     * @return {?}
     */
    get sortAsc() {
        return this._sortAsc;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortAsc(value) {
        this._sortAsc = value;
        this._triggerReload();
    }
    /**
     * @return {?}
     */
    get offset() {
        return this._offset;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set offset(value) {
        this._offset = value;
        this._triggerReload();
    }
    /**
     * @return {?}
     */
    get limit() {
        return this._limit;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set limit(value) {
        this._limit = value;
        this._triggerReload();
    }
    // calculated property:
    /**
     * @return {?}
     */
    get page() {
        return Math.floor(this.offset / this.limit) + 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        this.offset = (value - 1) * this.limit;
    }
    /**
     * @return {?}
     */
    get lastPage() {
        return Math.ceil(this.itemCount / this.limit);
    }
    // setting multiple observable properties simultaneously
    /**
     * @param {?} sortBy
     * @param {?} asc
     * @return {?}
     */
    sort(sortBy, asc) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
    }
    /**
     * @return {?}
     */
    firstPage() {
        this.offset = 0;
    }
    // init
    /**
     * @return {?}
     */
    ngOnInit() {
        this.translateSubscription = this.translate.get([CloudTranslateService.GRID_KEY]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const __resources = res[CloudTranslateService.GRID_KEY];
            if (__resources.translations) {
                this.translations = ((/** @type {?} */ (__resources.translations)));
            }
            else {
                this.translations = defaultTranslations;
            }
            if (!this.noDataMessage && __resources.emptyMsg) {
                this.noDataMessage = __resources.emptyMsg;
            }
        }));
        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();
        if (this.autoReload && this._scheduledReload == null) {
            this.reloadItems();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initDefaultValues() {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    }
    /**
     * @private
     * @return {?}
     */
    _initDefaultClickEvents() {
        this.headerClick.subscribe((/**
         * @param {?} tableEvent
         * @return {?}
         */
        tableEvent => this.sortColumn(tableEvent.column)));
        if (this.selectOnRowClick) {
            this.rowClick.subscribe((/**
             * @param {?} tableEvent
             * @return {?}
             */
            tableEvent => tableEvent.row.selected = !tableEvent.row.selected));
        }
    }
    /**
     * @return {?}
     */
    get reloading() {
        return this._reloading;
    }
    /**
     * @return {?}
     */
    reloadItems() {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    }
    /**
     * @private
     * @return {?}
     */
    _onReloadFinished() {
        this._updateDisplayParams();
        this._selectAllCheckbox = false;
        this._reloading = false;
    }
    // params of the last finished reload
    /**
     * @return {?}
     */
    get displayParams() {
        return this._displayParams;
    }
    /**
     * @return {?}
     */
    _updateDisplayParams() {
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    }
    // for avoiding cascading reloads if multiple params are set at once:
    /**
     * @return {?}
     */
    _triggerReload() {
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout((/**
         * @return {?}
         */
        () => {
            this.reloadItems();
        }));
    }
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    rowClicked(row, event) {
        this.rowClick.emit({ row, event });
    }
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    rowDoubleClicked(row, event) {
        this.rowDoubleClick.emit({ row, event });
    }
    /**
     * @param {?} column
     * @param {?} event
     * @return {?}
     */
    headerClicked(column, event) {
        if (!this._resizeInProgress) {
            event.preventDefault();
            event.stopPropagation();
            this.headerClick.emit({ column, event });
        }
        else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    }
    /**
     * @private
     * @param {?} column
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    cellClicked(column, row, event) {
        this.cellClick.emit({ row, column, event });
    }
    // functions:
    /**
     * @private
     * @return {?}
     */
    _getRemoteParameters() {
        /** @type {?} */
        let params = (/** @type {?} */ ({}));
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    sortColumn(column) {
        if (column.sortable) {
            /** @type {?} */
            let ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    }
    /**
     * @return {?}
     */
    get columnCount() {
        /** @type {?} */
        let count = 0;
        count += this.indexColumnVisible ? 1 : 0;
        count += this.selectColumnVisible ? 1 : 0;
        count += this.expandColumnVisible ? 1 : 0;
        this.columns.toArray().forEach((/**
         * @param {?} column
         * @return {?}
         */
        column => {
            count += column.visible ? 1 : 0;
        }));
        return count;
    }
    /**
     * @param {?} item
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    getRowColor(item, index, row) {
        if (this.rowColors !== undefined) {
            return ((/** @type {?} */ (this.rowColors)))(item, row, index);
        }
    }
    /**
     * @return {?}
     */
    get selectAllCheckbox() {
        return this._selectAllCheckbox;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectAllCheckbox(value) {
        this._selectAllCheckbox = value;
        this._onSelectAllChanged(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _onSelectAllChanged(value) {
        this.rows.toArray().forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row.selected = value));
    }
    /**
     * @param {?} selected
     * @param {?} row
     * @return {?}
     */
    onRowSelectChanged(selected, row) {
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            /** @type {?} */
            let index = this.selectedRows.indexOf(row);
            if (row.selected && index < 0) {
                this.selectedRows.push(row);
            }
            else if (!row.selected && index >= 0) {
                this.selectedRows.splice(index, 1);
            }
        }
        else {
            if (row.selected) {
                this.selectedRow = row;
                this.selectedRows = [row];
                // unselect all other rows:
                this.rows.toArray().filter((/**
                 * @param {?} row_
                 * @return {?}
                 */
                row_ => row_.selected)).forEach((/**
                 * @param {?} row_
                 * @return {?}
                 */
                row_ => {
                    if (row_ !== row) { // avoid endless loop
                        row_.selected = false;
                    }
                }));
            }
            else if (this.selectedRow === row) {
                this.selectedRow = undefined;
                this.selectedRows = [];
            }
        }
        //FIXME: prevent sticky execution
        this.selectionChange.emit({ selected, row, selectedRows: this.selectedRows });
    }
    /**
     * @param {?} expanded
     * @param {?} row
     * @return {?}
     */
    onExpandChanged(expanded, row) {
        this.expandClick.emit({ expanded, row });
    }
    // other:
    /**
     * @return {?}
     */
    get substituteItems() {
        return Array.from({ length: this.displayParams.limit - this.items.length });
    }
    /**
     * @param {?} event
     * @param {?} column
     * @param {?} columnElement
     * @return {?}
     */
    resizeColumnStart(event, column, columnElement) {
        this._resizeInProgress = true;
        drag(event, {
            move: (/**
             * @param {?} moveEvent
             * @param {?} dx
             * @return {?}
             */
            (moveEvent, dx) => {
                if (this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;
                }
            }),
        });
    }
    /**
     * @private
     * @param {?} columnElement
     * @param {?} dx
     * @return {?}
     */
    _isResizeInLimit(columnElement, dx) {
        /* This is needed because CSS min-width didn't work on table-layout: fixed.
         Without the limits, resizing can make the next column disappear completely,
         and even increase the table width. The current implementation suffers from the fact,
         that offsetWidth sometimes contains out-of-date values. */
        if ((dx < 0 && (columnElement.offsetWidth + dx) <= this.resizeLimit) ||
            !columnElement.nextElementSibling || // resizing doesn't make sense for the last visible column
            (dx >= 0 && (((/** @type {?} */ (columnElement.nextElementSibling))).offsetWidth + dx) <= this.resizeLimit)) {
            return false;
        }
        return true;
    }
}
DataTable.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: 'data-table',
                template: "<div class=\"data-table-wrapper\">\n    <data-table-header *ngIf=\"header\"></data-table-header>\n\n    <data-table-pagination\n            *ngIf=\"pagination\"\n            [show_range]=\"pagination_range\"\n            [show_limit]=\"pagination_limit\"\n            [show_input]=\"pagination_input\"\n            [show_numbers]=\"pagination_numbers\"\n            [show_column_selector]=\"showColumnSelector\"\n            [autoHide]=\"autoHidePaging\"\n            [basicSearch]=\"basicSearch\"\n            [advanceSearch]=\"advanceSearch\">\n    </data-table-pagination>\n\n    <div class=\"data-table-box\">\n        <table class=\"table table-condensed table-bordered data-table\">\n            <thead>\n            <tr>\n                <th scope=\"col\" [hide]=\"!expandColumnVisible\" class=\"expand-column-header\">\n                <th scope=\"col\" [hide]=\"!indexColumnVisible\" class=\"index-column-header\">\n                    <span [textContent]=\"indexColumnHeader\"></span>\n                </th>\n                <th scope=\"col\" [hide]=\"!selectColumnVisible\" class=\"select-column-header\">\n                    <input [hide]=\"!multiSelect\" type=\"checkbox\" [(ngModel)]=\"selectAllCheckbox\" [attr.aria-label]=\"translations.selectAllRows\" />\n                    <label class=\"mb-0 lbl\"></label>\n                </th>\n                <th scope=\"col\" *ngFor=\"let column of columns\" #th [hide]=\"!column.visible\"\n                    (click)=\"headerClicked(column, $event)\"\n                    (keydown.enter)=\"headerClicked(column, $event)\" (keydown.space)=\"headerClicked(column, $event)\"\n\n                    [class.sortable]=\"column.sortable\" [class.resizable]=\"column.resizable\"\n\n                    [ngClass]=\"column.styleClassObject\" class=\"column-header\" [style.width]=\"column.width | px\"\n\n                    [attr.aria-sort]=\"column.sortable ? (column.property === sortBy ? (sortAsc ? 'ascending' : 'descending') : 'none') : null\"\n                    [attr.tabindex]=\"column.sortable ? '0' : null\">\n                    <span *ngIf=\"!column.headerTemplate\" [textContent]=\"column.header\"></span>\n                    <span *ngIf=\"column.headerTemplate\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngTemplateOutletContext]=\"{column: column}\"></span>\n                    <span class=\"column-sort-icon\" *ngIf=\"column.sortable\">\n                            <span class=\"fa fa-sort column-sortable-icon\" [hide]=\"column.property === sortBy\"></span>\n                            <span [hide]=\"column.property !== sortBy\">\n                                 <span class=\"fa\" [ngClass]=\"{'fa-sort-asc': !sortAsc, 'fa-sort-desc': sortAsc}\"></span>\n                            </span>\n                    </span>\n                    <span *ngIf=\"column.resizable\" class=\"column-resize-handle\" (mousedown)=\"resizeColumnStart($event, column, th)\"></span>\n                </th>\n            </tr>\n            </thead>\n            <tbody *ngFor=\"let item of items; let index=index\" class=\"data-table-row-wrapper\"\n                   dataTableRow #row [item]=\"item\" [index]=\"index\"\n                   (selectedChange)=\"onRowSelectChanged($event, row)\"\n                   (expandedChange)=\"onExpandChanged($event, row)\">\n            </tbody>\n            <tbody *ngIf=\"itemCount === 0 && noDataMessage\">\n            <tr>\n                <td [attr.colspan]=\"columnCount\">{{ noDataMessage }}</td>\n            </tr>\n            </tbody>\n            <tbody class=\"substitute-rows\" *ngIf=\"pagination && substituteRows\">\n            <tr *ngFor=\"let item of substituteItems, let index = index\"\n                [class.row-odd]=\"(index + items.length) % 2 === 0\"\n                [class.row-even]=\"(index + items.length) % 2 === 1\"\n            >\n                <td [hide]=\"!expandColumnVisible\"></td>\n                <td [hide]=\"!indexColumnVisible\">&nbsp;</td>\n                <td [hide]=\"!selectColumnVisible\"></td>\n                <td *ngFor=\"let column of columns\" [hide]=\"!column.visible\">\n            </tr>\n            </tbody>\n        </table>\n\n        <div class=\"loading-cover\" *ngIf=\"showReloading && reloading\"></div>\n    </div>\n</div>\n",
                styles: [":host /deep/ .data-table.table>tbody+tbody{border-top:none}:host /deep/ .data-table.table td{vertical-align:middle}:host /deep/ .data-table>tbody>tr>td,:host /deep/ .data-table>thead>tr>th{overflow:hidden}:host /deep/ .row-odd{background-color:#f6f6f6}.data-table .substitute-rows>tr:hover,:host /deep/ .data-table .data-table-row:hover{background-color:#ececec}.data-table{box-shadow:0 0 15px #ececec;table-layout:fixed}.column-header{position:relative}.expand-column-header{width:50px}.select-column-header{width:50px;text-align:center}.index-column-header{width:40px;text-align:center}.column-header.sortable{cursor:pointer}.column-header .column-sort-icon{float:right}.column-header.resizable .column-sort-icon{margin-right:8px}.column-header .column-sort-icon .column-sortable-icon{color:#d3d3d3}.column-header .column-resize-handle{position:absolute;top:0;right:0;margin:0;padding:0;width:8px;height:100%;cursor:col-resize}.data-table-box{position:relative}.loading-cover{position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,.3);top:0}@-webkit-keyframes spinner{to{transform:rotate(360deg)}}@keyframes spinner{to{transform:rotate(360deg)}}.loading-cover:before{content:'';box-sizing:border-box;position:absolute;top:50%;left:50%;width:40px;height:40px;border-radius:50%;margin-top:-15px;margin-left:-15px;border:1px solid #ccc;border-top-color:#07d;-webkit-animation:.6s linear infinite spinner;animation:.6s linear infinite spinner}:host /deep/ .data-table.table input[type=checkbox],:host /deep/ .data-table.table input[type=radio]{opacity:0;position:absolute;z-index:12;width:18px;height:18px}:host /deep/ .data-table.table input[type=checkbox]+.lbl::before,:host /deep/ .data-table.table input[type=radio]+.lbl::before{font-family:FontAwesome;font-weight:400;font-size:11px;color:#32a3ce;content:\"\\a0\";display:inline-block;background-color:#fafafa;border:1px solid #ccc;box-shadow:0 1px 2px rgba(0,0,0,.05);border-radius:0;text-align:center;vertical-align:middle;height:13px;line-height:13px;min-width:13px;margin-right:1px}:host /deep/ .data-table.table input[type=checkbox]:active+.lbl::before,:host /deep/ .data-table.table input[type=checkbox]:checked:active+.lbl::before,:host /deep/ .data-table.table input[type=radio]:active+.lbl::before,:host /deep/ .data-table.table input[type=radio]:checked:active+.lbl::before{box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 1px 3px rgba(0,0,0,.1)}:host /deep/ .data-table.table input[type=checkbox]:checked+.lbl::before,:host /deep/ .data-table.table input[type=radio]:checked+.lbl::before{content:'\\f00c';display:inline-block;content:'\\f00c';background-color:#f5f8fc;border-color:#adb8c0;box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 -15px 10px -12px rgba(0,0,0,.05),inset 15px 10px -12px rgba(255,255,255,.1)}:host /deep/ .data-table.table input[type=checkbox]+.lbl:hover::before,:host /deep/ .data-table.table input[type=checkbox]:hover+.lbl::before,:host /deep/ .data-table.table input[type=radio]+.lbl:hover::before,:host /deep/ .data-table.table input[type=radio]:hover+.lbl::before{border-color:#ff893c}"]
            }] }
];
/** @nocollapse */
DataTable.ctorParameters = () => [
    { type: TranslateService }
];
DataTable.propDecorators = {
    items: [{ type: Input }],
    itemCount: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [DataTableColumn,] }],
    rows: [{ type: ViewChildren, args: [DataTableRow,] }],
    expandTemplate: [{ type: ContentChild, args: ['dataTableExpand',] }],
    headerTitle: [{ type: Input }],
    header: [{ type: Input }],
    pagination: [{ type: Input }],
    pagination_range: [{ type: Input }],
    pagination_limit: [{ type: Input }],
    pagination_input: [{ type: Input }],
    pagination_numbers: [{ type: Input }],
    indexColumn: [{ type: Input }],
    indexColumnHeader: [{ type: Input }],
    rowColors: [{ type: Input }],
    rowTooltip: [{ type: Input }],
    selectColumn: [{ type: Input }],
    multiSelect: [{ type: Input }],
    substituteRows: [{ type: Input }],
    expandableRows: [{ type: Input }],
    translations: [{ type: Input }],
    selectOnRowClick: [{ type: Input }],
    autoReload: [{ type: Input }],
    showReloading: [{ type: Input }],
    noDataMessage: [{ type: Input }],
    showColumnSelector: [{ type: Input }],
    autoHidePaging: [{ type: Input }],
    basicSearch: [{ type: ContentChild, args: ['basicSearch',] }],
    advanceSearch: [{ type: ContentChild, args: ['advanceSearch',] }],
    sortBy: [{ type: Input }],
    sortAsc: [{ type: Input }],
    offset: [{ type: Input }],
    limit: [{ type: Input }],
    page: [{ type: Input }],
    reload: [{ type: Output }],
    rowClick: [{ type: Output }],
    rowDoubleClick: [{ type: Output }],
    headerClick: [{ type: Output }],
    cellClick: [{ type: Output }],
    selectionChange: [{ type: Output }],
    expandClick: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._items;
    /** @type {?} */
    DataTable.prototype.itemCount;
    /** @type {?} */
    DataTable.prototype.columns;
    /** @type {?} */
    DataTable.prototype.rows;
    /** @type {?} */
    DataTable.prototype.expandTemplate;
    /** @type {?} */
    DataTable.prototype.headerTitle;
    /** @type {?} */
    DataTable.prototype.header;
    /** @type {?} */
    DataTable.prototype.pagination;
    /** @type {?} */
    DataTable.prototype.pagination_range;
    /** @type {?} */
    DataTable.prototype.pagination_limit;
    /** @type {?} */
    DataTable.prototype.pagination_input;
    /** @type {?} */
    DataTable.prototype.pagination_numbers;
    /** @type {?} */
    DataTable.prototype.indexColumn;
    /** @type {?} */
    DataTable.prototype.indexColumnHeader;
    /** @type {?} */
    DataTable.prototype.rowColors;
    /** @type {?} */
    DataTable.prototype.rowTooltip;
    /** @type {?} */
    DataTable.prototype.selectColumn;
    /** @type {?} */
    DataTable.prototype.multiSelect;
    /** @type {?} */
    DataTable.prototype.substituteRows;
    /** @type {?} */
    DataTable.prototype.expandableRows;
    /** @type {?} */
    DataTable.prototype.translations;
    /** @type {?} */
    DataTable.prototype.selectOnRowClick;
    /** @type {?} */
    DataTable.prototype.autoReload;
    /** @type {?} */
    DataTable.prototype.showReloading;
    /** @type {?} */
    DataTable.prototype.noDataMessage;
    /** @type {?} */
    DataTable.prototype.showColumnSelector;
    /** @type {?} */
    DataTable.prototype.autoHidePaging;
    /** @type {?} */
    DataTable.prototype.indexColumnVisible;
    /** @type {?} */
    DataTable.prototype.selectColumnVisible;
    /** @type {?} */
    DataTable.prototype.expandColumnVisible;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._sortBy;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._sortAsc;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._offset;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._limit;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype.translateSubscription;
    /** @type {?} */
    DataTable.prototype.basicSearch;
    /** @type {?} */
    DataTable.prototype.advanceSearch;
    /** @type {?} */
    DataTable.prototype._reloading;
    /** @type {?} */
    DataTable.prototype.reload;
    /** @type {?} */
    DataTable.prototype._displayParams;
    /** @type {?} */
    DataTable.prototype._scheduledReload;
    /** @type {?} */
    DataTable.prototype.rowClick;
    /** @type {?} */
    DataTable.prototype.rowDoubleClick;
    /** @type {?} */
    DataTable.prototype.headerClick;
    /** @type {?} */
    DataTable.prototype.cellClick;
    /** @type {?} */
    DataTable.prototype.selectedRow;
    /** @type {?} */
    DataTable.prototype.selectedRows;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._selectAllCheckbox;
    /** @type {?} */
    DataTable.prototype.selectionChange;
    /** @type {?} */
    DataTable.prototype.expandClick;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._resizeInProgress;
    /** @type {?} */
    DataTable.prototype.resizeLimit;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataTablePagination {
    /**
     * @param {?} dataTable
     */
    constructor(dataTable) {
        this.dataTable = dataTable;
        this.show_range = false;
        this.show_limit = false;
        this.show_input = false;
        this.show_numbers = true;
        this.show_column_selector = false;
        this.autoHide = false;
        this.columnSelectorOpen = false;
    }
    /**
     * @return {?}
     */
    _closeSelector() {
        this.columnSelectorOpen = false;
    }
    /**
     * @return {?}
     */
    pageBack() {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    }
    /**
     * @return {?}
     */
    pageForward() {
        this.dataTable.offset += this.dataTable.limit;
    }
    /**
     * @return {?}
     */
    pageFirst() {
        this.dataTable.offset = 0;
    }
    /**
     * @return {?}
     */
    pageLast() {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    }
    /**
     * @return {?}
     */
    get maxPage() {
        return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
    }
    /**
     * @return {?}
     */
    get limit() {
        return this.dataTable.limit;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set limit(value) {
        this.dataTable.limit = Number((/** @type {?} */ (value))); // TODO better way to handle that value of number <input> is string?
    }
    /**
     * @return {?}
     */
    get page() {
        return this.dataTable.page;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        this.dataTable.page = Number((/** @type {?} */ (value)));
    }
    /**
     * @param {?} number
     * @param {?} page
     * @return {?}
     */
    createPageRange(number, page) {
        /** @type {?} */
        const displayedPage = 3;
        /** @type {?} */
        let items = [];
        if (number > 1) {
            /** @type {?} */
            let maxPage = number;
            /** @type {?} */
            let minPage = 1;
            if (page === 1 && maxPage >= displayedPage) {
                maxPage = 3;
            }
            else if (page > 1 && maxPage > page + 1) {
                minPage = page - 1;
                maxPage = page + 1;
            }
            else if (page > 2 && maxPage > page) {
                minPage = page - 1;
                maxPage = page + 1;
            }
            else if (page > 2 && maxPage === page) {
                minPage = page - 2;
                maxPage = page;
            }
            for (let i = minPage; i <= maxPage; i++) {
                items.push(i);
            }
        }
        return items;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChange(value) {
        value = Number((/** @type {?} */ (value)));
        /** @type {?} */
        const minPage = 1;
        /** @type {?} */
        const maxPage = this.maxPage;
        if (value < minPage) {
            value = minPage;
        }
        else if (value > maxPage) {
            value = maxPage;
        }
        this.page = value;
        return value;
    }
}
DataTablePagination.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: 'data-table-pagination',
                template: "<div class=\"pagination-box\">\n    <div class=\"pagination-range\"  *ngIf=\"!show_range\">\n        <ng-template [ngTemplateOutlet]=\"basicSearch\"></ng-template>\n    </div>\n    <div class=\"pagination-range input-group-sm\" *ngIf=\"show_range\">\n        <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">\n        {{dataTable.translations.paginationRange}}:\n        <span class=\"ml-1\" [textContent]=\"dataTable.itemCount>0 ? dataTable.offset + 1 : 0\"></span>\n        -\n        <span [textContent]=\"[dataTable.offset + dataTable.limit , dataTable.itemCount] | min\"></span>\n        /\n        <span [textContent]=\"dataTable.itemCount\"></span>\n        </span>\n        </div>\n    </div>\n\n    <div class=\"pagination-controllers\">\n        <div class=\"pagination-limit\" *ngIf=\"show_limit\">\n            <div class=\"input-group input-group-sm\">\n                <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">{{dataTable.translations.paginationLimit}}:</span>\n                </div>\n                <input #limitInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\" [disabled]=\"maxPage === 0\"\n                       [ngModel]=\"limit\" (blur)=\"limit = limitInput.value\"\n                       (keyup.enter)=\"limit = limitInput.value\" (keyup.esc)=\"limitInput.value = limit\"/>\n            </div>\n        </div>\n        <div class=\"pagination-pages mr-1\" *ngIf=\"!autoHide || (autoHide && (maxPage > 0))\">\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageFirst()\"\n                    class=\"btn btn-sm btn-default pagination-firstpage\"\n                    [title]=\"dataTable.translations.firstText\">\n                <i class=\"fa fa-step-backward\"></i>\n            </button>\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageBack()\"\n                    class=\"btn btn-sm btn-default pagination-prevpage ml-1\"\n                    [title]=\"dataTable.translations.prevText\">\n                <i class=\"fa fa-chevron-left\"></i>\n            </button>\n            <div class=\"pagination-page ml-1\" *ngIf=\"show_input\">\n                <div class=\"input-group input-group-sm\">\n                    <input #pageInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\" max=\"{{maxPage}}\"\n                           [ngModel]=\"page\" (blur)=\"pageInput.value = onChange(pageInput.value)\"\n                           (keyup.enter)=\"pageInput.value = onChange(pageInput.value)\" [disabled]=\"maxPage === 0\"\n                           (keyup.esc)=\"pageInput.value = page\"/>\n                    <div class=\"input-group-append\">\n                        <span class=\"input-group-text\"><span>/</span><span\n                                [textContent]=\"dataTable.lastPage\"></span></span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"pagination-page\" *ngIf=\"show_numbers\">\n                <button *ngFor=\"let i of createPageRange(maxPage,page)\"\n                        [disabled]=\"i == page\"\n                        (click)=\"page = i\"\n                        class=\"btn btn-sm btn-default ml-1\">{{ i }}\n                </button>\n            </div>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageForward()\"\n                    class=\"btn btn-sm btn-default pagination-nextpage ml-1\" [title]=\"dataTable.translations.nextText\">\n                <i class=\"fa fa-chevron-right\"></i>\n            </button>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageLast()\"\n                    class=\"btn btn-sm btn-default pagination-lastpage ml-1\" [title]=\"dataTable.translations.lastText\">\n                <i class=\"fa fa-step-forward\"></i>\n            </button>\n            <button type=\"button\" class=\"btn btn-sm btn-default pagination-reload ml-1\"\n                    (click)=\"dataTable.reloadItems()\"\n                    [attr.aria-label]=\"dataTable.translations.headerReload\"\n                    [title]=\"dataTable.translations.headerReload\">\n                <i class=\"fa fa-refresh\"></i>\n            </button>\n            <button *ngIf=\"show_column_selector\" type=\"button\" class=\"btn btn btn-sm btn-default column-selector-button ml-1\"\n                    [class.active]=\"columnSelectorOpen\"\n                    (click)=\"columnSelectorOpen = !columnSelectorOpen; $event.stopPropagation()\"\n                    [attr.aria-label]=\"dataTable.translations.headerColumnSelector\"\n                    [title]=\"dataTable.translations.headerColumnSelector\">\n                <i class=\"fa fa-list\"></i>\n            </button>\n            <div *ngIf=\"show_column_selector\" class=\"column-selector-wrapper\" (click)=\"$event.stopPropagation()\">\n                <div *ngIf=\"columnSelectorOpen\" class=\"column-selector-box panel panel-default\">\n                    <div *ngIf=\"dataTable.expandableRows\" class=\"column-selector-fixed-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" id=\"chk-expand-column-selector\" [(ngModel)]=\"dataTable.expandColumnVisible\"/>\n                            <label class=\"mb-0 lbl\" for=\"chk-expand-column-selector\"> {{dataTable.translations.expandColumn}}</label>\n                        </label>\n                    </div>\n                    <div *ngIf=\"dataTable.indexColumn\" class=\"column-selector-fixed-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" id=\"chk-index-column-selector\" [(ngModel)]=\"dataTable.indexColumnVisible\"/>\n                            <label class=\"mb-0 lbl\" for=\"chk-index-column-selector\"> {{dataTable.translations.indexColumn}}</label>\n                        </label>\n                    </div>\n                    <div *ngIf=\"dataTable.selectColumn\" class=\"column-selector-fixed-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" id=\"chk-select-column-selector\" [(ngModel)]=\"dataTable.selectColumnVisible\"/>\n                            <label class=\"mb-0 lbl\" for=\"chk-select-column-selector\"> {{dataTable.translations.selectColumn}}</label>\n                        </label>\n                    </div>\n                    <div *ngFor=\"let column of dataTable.columns;\" class=\"column-selector-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" [id]=\"'chk-'+ column.property + '-selector'\" [(ngModel)]=\"column.visible\"/>\n                            <label class=\"mb-0 lbl\" [for]=\"'chk-'+ column.property + '-selector'\">\n                                &nbsp;<span [textContent]=\"column.header || (column.property)\"></span>\n                            </label>\n                        </label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <ng-template *ngIf=\"!show_range\" [ngTemplateOutlet]=\"advanceSearch\"></ng-template>\n</div>\n",
                host: {
                    '(document:click)': '_closeSelector()'
                },
                styles: [".pagination-box{position:relative;display:block;min-height:38px;background-color:#e9ecef;border:1px solid #ced4da;padding:2px}.pagination-range{margin-left:3px;display:inline-block}.pagination-controllers{float:right}.pagination-controllers input{min-width:60px;text-align:right;max-width:80px}.pagination-limit{margin-right:10px;display:inline-table;width:180px;float:left}.pagination-pages{display:inline-block}.pagination-page{display:inline-table}.pagination-box button{outline:0!important}.column-selector-button,.pagination-firstpage,.pagination-lastpage,.pagination-nextpage,.pagination-prevpage,.pagination-reload{vertical-align:top}.column-selector-wrapper{position:relative}.column-selector-box{box-shadow:0 0 10px #d3d3d3;width:150px;padding:10px;position:absolute;right:0;top:1px;z-index:1060;background:#fff}.column-selector-box .checkbox{margin-bottom:4px}.column-selector-fixed-column{font-style:italic}"]
            }] }
];
/** @nocollapse */
DataTablePagination.ctorParameters = () => [
    { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DataTable)),] }] }
];
DataTablePagination.propDecorators = {
    show_range: [{ type: Input }],
    show_limit: [{ type: Input }],
    show_input: [{ type: Input }],
    show_numbers: [{ type: Input }],
    show_column_selector: [{ type: Input }],
    autoHide: [{ type: Input }],
    basicSearch: [{ type: Input }],
    advanceSearch: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DataTablePagination.prototype.show_range;
    /** @type {?} */
    DataTablePagination.prototype.show_limit;
    /** @type {?} */
    DataTablePagination.prototype.show_input;
    /** @type {?} */
    DataTablePagination.prototype.show_numbers;
    /** @type {?} */
    DataTablePagination.prototype.show_column_selector;
    /** @type {?} */
    DataTablePagination.prototype.autoHide;
    /** @type {?} */
    DataTablePagination.prototype.basicSearch;
    /** @type {?} */
    DataTablePagination.prototype.advanceSearch;
    /** @type {?} */
    DataTablePagination.prototype.columnSelectorOpen;
    /** @type {?} */
    DataTablePagination.prototype.dataTable;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataTableHeader {
    /**
     * @param {?} dataTable
     */
    constructor(dataTable) {
        this.dataTable = dataTable;
    }
}
DataTableHeader.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: 'data-table-header',
                template: "<div class=\"data-table-header\">\n    <h4 class=\"title\" [textContent]=\"dataTable.headerTitle\"></h4>\n</div>",
                styles: [".data-table-header{min-height:25px;margin-bottom:10px}.title{display:inline-block;margin:5px 0 0 5px}"]
            }] }
];
/** @nocollapse */
DataTableHeader.ctorParameters = () => [
    { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DataTable)),] }] }
];
if (false) {
    /** @type {?} */
    DataTableHeader.prototype.dataTable;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PixelConverter {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        if (value === undefined) {
            return;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return value + 'px';
        }
    }
}
PixelConverter.decorators = [
    { type: Pipe, args: [{
                name: 'px'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj === undefined || obj === null;
}
class Hide {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._prevCondition = null;
    }
    /**
     * @param {?} newCondition
     * @return {?}
     */
    set hide(newCondition) {
        this.initDisplayStyle();
        if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
            this._prevCondition = true;
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
        }
        else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
            this._prevCondition = false;
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', this._displayStyle);
        }
    }
    /**
     * @private
     * @return {?}
     */
    initDisplayStyle() {
        if (this._displayStyle === undefined) {
            /** @type {?} */
            let displayStyle = this._elementRef.nativeElement.style.display;
            if (displayStyle && displayStyle !== 'none') {
                this._displayStyle = displayStyle;
            }
        }
    }
}
Hide.decorators = [
    { type: Directive, args: [{ selector: '[hide]', inputs: ['hide'] },] }
];
/** @nocollapse */
Hide.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._prevCondition;
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._displayStyle;
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    Hide.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MinPipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return Math.min.apply(null, value);
    }
}
MinPipe.decorators = [
    { type: Pipe, args: [{
                name: 'min'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DataTableResource {
    /**
     * @param {?} items
     */
    constructor(items) {
        this.items = items;
    }
    /**
     * @param {?} params
     * @param {?=} filter
     * @return {?}
     */
    query(params, filter) {
        /** @type {?} */
        let result = [];
        if (filter) {
            result = this.items.filter(filter);
        }
        else {
            result = this.items.slice(); // shallow copy to use for sorting instead of changing the original
        }
        // Update page number
        params.page = Math.floor(params.offset / params.limit);
        if (params.sortBy) {
            result.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => {
                if (typeof a[params.sortBy] === 'string') {
                    return a[params.sortBy].localeCompare(b[params.sortBy]);
                }
                else {
                    return a[params.sortBy] - b[params.sortBy];
                }
            }));
            if (params.sortAsc === false) {
                result.reverse();
            }
        }
        if (params.offset !== undefined) {
            if (params.limit === undefined) {
                result = result.slice(params.offset, result.length);
            }
            else {
                result = result.slice(params.offset, params.offset + params.limit);
            }
        }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => resolve(result)));
        }));
    }
    /**
     * @return {?}
     */
    count() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => resolve(this.items.length)));
        }));
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setItems(v) {
        this.items = v;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataTableResource.prototype.items;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DATA_TABLE_DIRECTIVES = [DataTable, DataTableColumn];
class GridModule {
}
GridModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, TranslateModule],
                declarations: [
                    DataTable, DataTableColumn,
                    DataTableRow, DataTablePagination, DataTableHeader,
                    PixelConverter, Hide, MinPipe
                ],
                exports: [DataTable, DataTableColumn]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserProfileModule {
}
UserProfileModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    CoreModule,
                    FormsModule,
                    ReactiveFormsModule,
                    TranslateModule,
                    TabsModule.forRoot(),
                    ModalModule.forRoot(),
                    BsDatepickerModule.forRoot(),
                    ImageCropperModule,
                    GridModule
                ],
                declarations: [UserProfileComponent, UserProfileInfoComponent, AccessRoleComponent],
                providers: [UserProfileService, GlobalContactService, LocationService,
                    DictionaryService, BsModalService$1],
                exports: [
                    FormsModule, ReactiveFormsModule, TabsModule,
                    UserProfileComponent, UserProfileInfoComponent, AccessRoleComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HttpsRequestInterceptor {
    /**
     * @param {?} securityService
     * @param {?} coreService
     * @param {?} httpClientService
     * @param {?} notifyService
     */
    constructor(securityService, coreService, httpClientService, notifyService) {
        this.securityService = securityService;
        this.coreService = coreService;
        this.httpClientService = httpClientService;
        this.notifyService = notifyService;
        return HttpsRequestInterceptor.instance = HttpsRequestInterceptor.instance || this;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).do((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                this.httpClientService.hideLoading();
                /*
                if (event.status == 200) {
                }
                */
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (err instanceof HttpErrorResponse) {
                //console.log('[HttpsRequestInterceptor][error]', err);
                this.httpClientService.hideLoading();
                if (this.coreService.getEnvironment().production) {
                    this.securityService.ping();
                }
                this.notifyService.showMessage(err.message, 'error', err.statusText);
                //let statusCode = err.status ;
                //console.log('[HttpInterceptor][ErrorResponse]=', err);
                //console.log('[HttpInterceptor][statusCode]=', statusCode);
                /*
                switch (statusCode) {
                  case 0:
                  case 401:
                     this.securityService.ping();
                    break;
                  default:
                    return;
                }
                */
            }
        }));
    }
}
HttpsRequestInterceptor.instance = null;
HttpsRequestInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpsRequestInterceptor.ctorParameters = () => [
    { type: SecurityService },
    { type: CoreService },
    { type: HttpClientService },
    { type: NotificationService }
];
if (false) {
    /** @type {?} */
    HttpsRequestInterceptor.instance;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.securityService;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.httpClientService;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.notifyService;
}
class InterceptorModule {
}
InterceptorModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OrganizationInformationComponent {
    /**
     * @param {?} location
     * @param {?} orgService
     * @param {?} notification
     * @param {?} translate
     */
    constructor(location, orgService, notification, translate) {
        this.location = location;
        this.orgService = orgService;
        this.notification = notification;
        this.translate = translate;
        this.orgInfo = new OrganizationInformation();
        this.organization = new Organization();
        this.editable = false;
        this.isAvatarExist = false;
        this.isChanged = false;
        this.translateSubscription = translate.get(['COMMON.MODULE.ORGANIZATION']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.orgTranslations = res['COMMON.MODULE.ORGANIZATION'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.logoUrl = this.orgService.getLogoUrlByOrganization(this.organization);
        this.isAvatarExist = !!(this.logoUrl);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelectFile($event) {
        if (this.fileUpload && this.fileUpload.nativeElement) {
            this.fileUpload.nativeElement.click();
        }
    }
    /**
     * @return {?}
     */
    onSave() {
        if (this.fileUpload && this.fileUpload.nativeElement.value) {
            this.updateLogo();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.logoUrl = iNet.BLANK_IMAGE_URL;
        }
    }
    /**
     * @return {?}
     */
    removeImage() {
        const { REMOVE_LOGO, REMOVE_LOGO_SUCCESSFUL_MSG, REMOVE_LOGO_ERROR_MSG } = this.orgTranslations;
        this.isAvatarExist = false;
        this.isChanged = false;
        if (this.fileUpload.nativeElement.value) {
            this.fileUpload.nativeElement.value = '';
            this.logoUrl = '';
        }
        else {
            /** @type {?} */
            const fd = new FormData(this.logoFrmElementRef.nativeElement);
            fd.append('remove', 'true');
            this.orgService.updateLogo(fd).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (ErrorMessage.TYPE !== data.type) {
                    this.notification.showMessage(REMOVE_LOGO_SUCCESSFUL_MSG, 'success', REMOVE_LOGO);
                    this.logoUrl = '';
                }
                else {
                    this.notification.showMessage(REMOVE_LOGO_ERROR_MSG, 'error', REMOVE_LOGO);
                }
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeFile(event) {
        /** @type {?} */
        const files = event.target.files;
        this.isChanged = this.fileUpload.nativeElement.value;
        if (files.length > 0) {
            /** @type {?} */
            const image = files[0];
            if (image) {
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    image.url = e.target.result;
                    this.logoUrl = image.url;
                });
                reader.readAsDataURL(image);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateLogo() {
        if (!this.orgInfo.organId) { // Organization not exist
            return;
        }
        /** @type {?} */
        const formData = new FormData(this.logoFrmElementRef.nativeElement);
        formData.append('orgId', this.orgInfo.organId);
        // Upload Image to Media server
        this.orgService.updateLogo(formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                /** @type {?} */
                const orgInfo = Object.assign(new OrganizationInformation(), data);
                this.fileUpload.nativeElement.value = '';
                this.isChanged = false;
                this.logoUrl = this.orgService.getLogoUrlByOrganization(orgInfo);
            }
            else {
                const { TITLE, UPDATE_LOGO_ERROR_MSG } = this.orgTranslations;
                this.notification.showMessage(UPDATE_LOGO_ERROR_MSG, 'error', TITLE);
            }
        }));
    }
}
OrganizationInformationComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-organization-information',
                template: "<div class=\"row m-0 p-0\">\n    <div class=\"col-xl-4 col-lg-4 pl-0\">\n        <div class=\"text-center card-box\">\n            <div class=\"member-card\">\n                <div class=\"thumb-xl member-thumb mt-3 m-b-10 center-block\">\n                    <img *ngIf=\"logoUrl\" (click)=\"onSelectFile($event)\" [src]=\"logoUrl\"\n                         (error)=\"updateBlankImage($event)\"\n                         class=\"bg-logo img-thumbnail \" alt=\"Logo\">\n                    <div *ngIf=\"!logoUrl\" class=\"text-center upload-photo mt-3\" (click)=\"onSelectFile($event)\">\n                        <i aria-hidden=\"true\" class=\"fa fa-picture-o\"></i>\n                    </div>\n                </div>\n                <div class=\"mt-3\">\n                    <h5 class=\"m-b-5\">{{organization.name}}</h5>\n                    <p class=\"text-muted\">{{organization.organId}}</p>\n                </div>\n                <div *ngIf=\"editable\">\n                    <form #logoFrm class=\"mt-3\">\n                        <input #fileLogo name=\"fileUploadLogo\" type=\"file\" accept=\"image/*\" (change)=\"changeFile($event)\"\n                               class=\"form-control form-control-sm col-xs-12 col-sm-12 hide\">\n                    </form>\n                    <button type=\"button\" class=\"btn btn-primary btn-sm m-t-10\" (click)=\"onSelectFile($event)\">\n                        <i class=\"fa fa-upload\"></i> {{'COMMON.MODULE.ORGANIZATION.CHOSEN_IMAGE' | translate}}\n                    </button>\n                    <button *ngIf=\"isChanged\" type=\"button\" class=\"btn btn-success btn-sm ml-1 m-t-10\"\n                            (click)=\"onSave()\">\n                        <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> {{'COMMON.MODULE.ORGANIZATION.SAVE_LOGO' |\n                        translate}}\n                    </button>\n                    <button *ngIf=\"isChanged || orgInfo.logo\" type=\"button\"\n                            (click)=\"removeImage()\" class=\"btn btn-danger btn-sm ml-1\">\n                        <i class=\"fa fa-trash\"></i> {{'COMMON.MODULE.ORGANIZATION.REMOVE_LOGO' | translate}}\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-xl-8 col-lg-8 p-0\">\n        <div class=\"card-box bs-form\" style=\"height: 100%;\">\n            <ng-template [ngTemplateOutlet]=\"tabContent\"></ng-template>\n        </div>\n    </div>\n</div>\n",
                styles: [".content-profile{min-height:250px;padding:0 15px 15px 0}.m-b-3{margin-bottom:30px!important}.box-profile{padding:10px}.img-circle{border-radius:50%}.m-b-2{margin-bottom:20px!important}.profile-username{font-size:21px;margin-top:5px}.info-box{display:block;min-height:90px;background:#fff;width:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa;border-radius:5px;height:100%;padding:15px}.margin-r-5{margin-right:5px}.card{position:relative;display:flex;flex-direction:column;background-color:#fff;border-radius:.25rem}.tab-style1{border:0}.card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#fff;height:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.text-muted{color:#80898e!important}:host /deep/ .icon-div{width:42px;position:relative}:host /deep/ .icon-custom{position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%,-50%)}:host /deep/ .upload-signature-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;width:260px;cursor:pointer}:host /deep/ .signature-thumbnail{cursor:pointer;max-width:100%;max-height:300px}.empty-photo{text-align:center;border:2px dashed #acacac;background:#f3f3f3;cursor:pointer;height:150px;width:150px}:host /deep/ .card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.img-thumbnail{padding:0;width:220px;height:100%;cursor:pointer}.upload-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;max-height:220px;width:100%;cursor:pointer}"]
            }] }
];
/** @nocollapse */
OrganizationInformationComponent.ctorParameters = () => [
    { type: Location },
    { type: OrganizationService },
    { type: NotificationService },
    { type: TranslateService }
];
OrganizationInformationComponent.propDecorators = {
    orgInfo: [{ type: Input }],
    organization: [{ type: Input }],
    editable: [{ type: Input }],
    fileUpload: [{ type: ViewChild, args: ['fileLogo',] }],
    logoFrmElementRef: [{ type: ViewChild, args: ['logoFrm',] }],
    tabContent: [{ type: ContentChild, args: ['tabContent',] }]
};
if (false) {
    /** @type {?} */
    OrganizationInformationComponent.prototype.orgInfo;
    /** @type {?} */
    OrganizationInformationComponent.prototype.organization;
    /** @type {?} */
    OrganizationInformationComponent.prototype.editable;
    /** @type {?} */
    OrganizationInformationComponent.prototype.logoUrl;
    /** @type {?} */
    OrganizationInformationComponent.prototype.fileUpload;
    /** @type {?} */
    OrganizationInformationComponent.prototype.logoFrmElementRef;
    /** @type {?} */
    OrganizationInformationComponent.prototype.tabContent;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.orgTranslations;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.translateSubscription;
    /** @type {?} */
    OrganizationInformationComponent.prototype.isAvatarExist;
    /** @type {?} */
    OrganizationInformationComponent.prototype.isChanged;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OrganizationModule {
}
OrganizationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    CoreModule,
                    ReactiveFormsModule,
                    TranslateModule,
                    HttpClientModule,
                    TabsModule.forRoot()
                ],
                declarations: [OrganizationGeneralInformationComponent, OrganizationInformationComponent],
                exports: [OrganizationGeneralInformationComponent, OrganizationInformationComponent],
                providers: [
                    FormsModule, ReactiveFormsModule, TabsModule,
                    LocationService, OrganizationService, DictionaryService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AbstractSideNavComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.opened = false;
        this.onClose = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onLoad = new EventEmitter();
        this.overflowCls = 'overflow-hidden';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (currentValue) {
                this.open();
            }
            else if (changes['opened']['previousValue'] != currentValue) {
                this.close();
            }
        }), 1);
    }
    /**
     * @return {?}
     */
    open() {
        if (!document.body.classList.contains(this.overflowCls)) {
            document.body.classList.add(this.overflowCls);
        }
    }
    /**
     * @return {?}
     */
    close() {
        if (document.body.classList.contains(this.overflowCls)) {
            document.body.classList.remove(this.overflowCls);
        }
        this.opened = false;
        this.onClose.emit(this.opened);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickOut(event) {
        if (!this.elementRef.nativeElement.contains(event.target)
            && this.opened && !event.target.closest('.nav-item') &&
            !event.target.closest('.search-input__icon')) {
            this.close();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickInside(event) {
        if (this.elementRef.nativeElement.contains(event.target)) {
        }
    }
}
AbstractSideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-side-nav',
                template: ``
            }] }
];
/** @nocollapse */
AbstractSideNavComponent.ctorParameters = () => [
    { type: ElementRef }
];
AbstractSideNavComponent.propDecorators = {
    opened: [{ type: Input }],
    onClose: [{ type: Output }],
    onClear: [{ type: Output }],
    onLoad: [{ type: Output }],
    clickOut: [{ type: HostListener, args: ['document:click', ['$event'],] }],
    clickInside: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    AbstractSideNavComponent.prototype.opened;
    /** @type {?} */
    AbstractSideNavComponent.prototype.onClose;
    /** @type {?} */
    AbstractSideNavComponent.prototype.onClear;
    /** @type {?} */
    AbstractSideNavComponent.prototype.onLoad;
    /**
     * @type {?}
     * @private
     */
    AbstractSideNavComponent.prototype.overflowCls;
    /** @type {?} */
    AbstractSideNavComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MessageSideNavComponent extends AbstractSideNavComponent {
    /**
     * @param {?} service
     * @param {?} elementRef
     */
    constructor(service, elementRef) {
        super(elementRef);
        this.service = service;
        this.elementRef = elementRef;
        this.loaded = false;
        this.messages = [];
        this.pageNumber = 0;
        this.pageSize = 10;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (currentValue) {
                this.open();
                if (!this.loaded) {
                    this.pageNumber = 0;
                    this.listMessage({ pageSize: this.pageSize, pageNumber: this.pageNumber, notifylist: true });
                }
            }
            else {
                this.close();
            }
        }), 1);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    listMessage(params) {
        this.service.getMessages(params).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.messages = (/** @type {?} */ (response.items));
            this.totalMessage = response.total;
            this.loaded = true;
        }));
    }
    /**
     * @return {?}
     */
    loadMessageMore() {
        this.pageNumber += 1;
        this.service.getMessages({ pageSize: this.pageSize, pageNumber: this.pageNumber, notifylist: true }).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.messages = [...this.messages, ...(/** @type {?} */ (response.items))];
        }));
    }
    /**
     * @return {?}
     */
    clearMessage() {
        this.service.clearAll().subscribe((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            this.messages = [];
            this.totalMessage = 0;
            this.onClear.emit(true);
        }));
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    openMessage(msg) {
        if (!msg.read) {
            this.service.loadNotify(msg.application, msg.activityID).subscribe((/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                msg.read = true;
                this.onLoad.emit(true);
            }));
        }
    }
}
MessageSideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-message-side-nav',
                template: "<div class=\"slide-nav\" [ngClass]=\"{'opened': opened}\">\n    <div class=\"list-header\">\n        <span class=\"font-weight-bold\"><i class=\"fa fa-bell\"></i> {{'COMMON.NOTIFICATION.TITLE' | translate}}</span>\n        <button (click)=\"close()\" class=\"close\" type=\"button\"><i class=\"fa fa-times\"></i></button>\n    </div>\n    <ul class=\"list-box\">\n        <li *ngFor=\"let item of messages\">\n            <a href=\"javascript:;\" (click)=\"openMessage(item)\">\n                <div class=\"list-item\">\n                    <div class=\"list-left\">\n                        <img userAvatar [usercode]=\"item.sender\" class=\"user-avatar mt-0 mr-2 rounded-circle\">\n                    </div>\n                    <div class=\"list-body\">\n                        <div class=\"media-body ml-2\">\n                            <p class=\"mb-1 message-item p-2\" [ngClass]=\"{'unread': !item.read}\">\n                                <b>{{item.fullname}}</b> {{item.message}}\n                            </p>\n                            <!--div class=\"px-2\">{{item.created | date}}</div-->\n                        </div>\n                    </div>\n                </div>\n            </a>\n        </li>\n        <li *ngIf=\"!messages?.length\">\n            <div class=\"empty-msg-container\">\n                <i>{{'COMMON.NOTIFICATION.EMPTY_MSG' | translate}}</i>\n            </div>\n        </li>\n        <div *ngIf=\"messages?.length && totalMessage!=messages?.length\" class=\"mt-1 text-center\">\n            <a (click)=\"loadMessageMore()\" href=\"javascript:;\">\n                {{'COMMON.NOTIFICATION.LOAD_MORE' | translate}} {{totalMessage-messages?.length}} {{'COMMON.NOTIFICATION.ITEMS' | translate}}\n            </a>\n        </div>\n    </ul>\n    <div class=\"list-footer\">\n        <a *ngIf=\"messages?.length\" (click)=\"clearMessage()\" href=\"javascript:;\"><i class=\"fa fa-eraser text-danger\"></i> {{'COMMON.NOTIFICATION.CLEAR_ALL' | translate}}</a>\n    </div>\n</div>\n",
                styles: [":host a{text-decoration:none}:host .list-body{padding:0 0 0 2rem}:host .list-left{height:2rem;width:2rem;position:absolute}:host .user-avatar{height:2rem;width:2rem}:host .message-item{background-color:#edf2f9;border-radius:.375rem!important}:host .unread{border:1px dotted #999}:host .pr-2,:host .px-2{padding-right:.5rem!important}:host .empty-msg-container{text-align:center;line-height:30px;padding-top:15%;color:#999}"]
            }] }
];
/** @nocollapse */
MessageSideNavComponent.ctorParameters = () => [
    { type: NotifyMessageService },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    MessageSideNavComponent.prototype.keyword;
    /** @type {?} */
    MessageSideNavComponent.prototype.loaded;
    /** @type {?} */
    MessageSideNavComponent.prototype.messages;
    /** @type {?} */
    MessageSideNavComponent.prototype.totalMessage;
    /** @type {?} */
    MessageSideNavComponent.prototype.pageNumber;
    /** @type {?} */
    MessageSideNavComponent.prototype.pageSize;
    /**
     * @type {?}
     * @private
     */
    MessageSideNavComponent.prototype.service;
    /** @type {?} */
    MessageSideNavComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AppSideNavComponent extends AbstractSideNavComponent {
    /**
     * @param {?} coreService
     * @param {?} router
     * @param {?} elementRef
     */
    constructor(coreService, router, elementRef) {
        super(elementRef);
        this.coreService = coreService;
        this.router = router;
        this.elementRef = elementRef;
        this.applications = [];
        this.widgetApps = [];
        this.systemUrl = 'about:blank';
        this.SYSTEM_APPS = ['social', 'calendar'];
        this.listApp();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        window.addEventListener('message', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            var __data = e.data || {};
            /** @type {?} */
            var __eventName = __data['eventName'];
            /** @type {?} */
            var __result = {};
            if (!iNet.isEmpty(__data.result)) {
                if (typeof (__data.result) === 'string') {
                    __result = JSON.parse(__data.result);
                }
                else if (typeof (__data.result) === 'object') {
                    __result = __data.result || {};
                }
                //console.log('[message]', __result);
                switch (__eventName) {
                    case 'open':
                    case 'openApp':
                        this.openApp(__result['application']);
                        this.close();
                        break;
                    case 'openUrl':
                        window.location.href = iNet.getSSOUrl(__result['url']);
                        break;
                    case 'loaded':
                        /** @type {?} */
                        const iFrame = document.querySelectorAll(`iframe[src="${__result['src']}"]`)[0];
                        if (iFrame) {
                            iFrame['height'] = __result['height'];
                            iFrame['valid'] = true;
                        }
                        break;
                }
            }
        }), false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        if (this._router) {
            this._router.unsubscribe();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (currentValue) {
                this.systemUrl = iNet.getPUrl('common/page/apps') + '?appname=system';
                this.open();
            }
            else {
                this.close();
            }
        }), 250);
    }
    /**
     * @private
     * @return {?}
     */
    listApp() {
        this.coreService.getSystemApplication().subscribe((/**
         * @param {?} apps
         * @return {?}
         */
        (apps) => {
            this.applications = apps
                .filter((/**
             * @param {?} app
             * @return {?}
             */
            (app) => (app.organId !== 'community' && app.firmContext)))
                .map((/**
             * @param {?} application
             * @return {?}
             */
            (application) => {
                if (application.homepage.indexOf('http') < 0) {
                    application.homepage = iNet.getPUrl(`${application.module}/${application.homepage}`);
                    application.icon = `${this.coreService.getFileServerPath()}/images/${application.module}/${application.icon}`;
                }
                if (!!application.widget) {
                    application.widget = `${iNet.getPUrl('common/page/apps')}?appname=${application.firmContext}`; //rebuild the widget url
                }
                return application;
            }));
            this.widgetApps = this.applications.filter((/**
             * @param {?} app
             * @return {?}
             */
            (app) => (!!app.widget)));
        }));
    }
    /**
     * @param {?} app
     * @return {?}
     */
    openApp(app) {
        if (this.SYSTEM_APPS.includes(app)) { //system app
            this.router.navigate([app]);
        }
        else {
            /** @type {?} */
            const url = iNet.getSSOUrl(this.getUrlByContext(app));
            if (url) {
                window.location.href = url;
            }
        }
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    getUrlByContext(content) {
        /** @type {?} */
        const app = this.applications.find((/**
         * @param {?} __0
         * @return {?}
         */
        ({ webContext }) => webContext === content));
        return app ? app.homepage : null;
    }
}
AppSideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-app-side-nav',
                template: "<div class=\"slide-nav\" [ngClass]=\"{'opened': opened}\">\n    <ul class=\"list-box list-app\" *ngIf=\"opened\">\n        <iframe id=\"system-app-iframe\" [src]=\"systemUrl | safe\" scrolling=\"no\"></iframe>\n        <iframe *ngFor=\"let widgetApp of widgetApps\" [src]=\"widgetApp.widget | safe\" scrolling=\"no\"></iframe>\n    </ul>\n</div>\n",
                styles: [`
        iframe {
            width: 100%;
            border: none;
            overflow: hidden;
        }
    `]
            }] }
];
/** @nocollapse */
AppSideNavComponent.ctorParameters = () => [
    { type: CoreService },
    { type: Router },
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AppSideNavComponent.prototype._router;
    /** @type {?} */
    AppSideNavComponent.prototype.applications;
    /** @type {?} */
    AppSideNavComponent.prototype.widgetApps;
    /** @type {?} */
    AppSideNavComponent.prototype.systemUrl;
    /** @type {?} */
    AppSideNavComponent.prototype.SYSTEM_APPS;
    /**
     * @type {?}
     * @private
     */
    AppSideNavComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    AppSideNavComponent.prototype.router;
    /** @type {?} */
    AppSideNavComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SocialSideNavComponent extends AbstractSideNavComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
    }
}
SocialSideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-social-side-nav',
                template: "<div class=\"slide-nav\" [ngClass]=\"{'opened': opened}\">\n    <div class=\"m-3\">\n        Social component\n    </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
SocialSideNavComponent.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    SocialSideNavComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CommonToolbarComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
CommonToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-common-toolbar',
                template: "<div class=\"nav-fixed-top app-toolbar\">\n  <ul class=\"nav nav-tabs toolbar-tab\">\n    <li class=\"nav-item\" title=\"{{'COMMON.MENU.USER_PROFILE' | translate}}\">\n      <a routerLink=\"/user-profile\" routerLinkActive=\"active\" class=\"nav-link\"><i class=\"fa fa-user\"></i> <span>{{'COMMON.MENU.USER_PROFILE' | translate}}</span></a>\n    </li>\n    <li class=\"nav-item\" title=\"{{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}\">\n      <a routerLink=\"/company-profile\" routerLinkActive=\"active\" class=\"nav-link\"><i class=\"fa fa-building\"></i> <span>{{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}</span></a>\n    </li>\n  </ul>\n</div>\n"
            }] }
];
/** @nocollapse */
CommonToolbarComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SafePipe {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
SafePipe.decorators = [
    { type: Pipe, args: [{
                name: 'safe'
            },] }
];
/** @nocollapse */
SafePipe.ctorParameters = () => [
    { type: DomSanitizer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    SafePipe.prototype.sanitizer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SafeHtmlPipe {
    /**
     * @param {?} sanitized
     */
    constructor(sanitized) {
        this.sanitized = sanitized;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
SafeHtmlPipe.decorators = [
    { type: Pipe, args: [{
                name: 'safeHtml'
            },] }
];
/** @nocollapse */
SafeHtmlPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    SafeHtmlPipe.prototype.sanitized;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SafePipeModule {
}
SafePipeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SafePipe, SafeHtmlPipe],
                imports: [
                    CommonModule
                ],
                exports: [SafePipe, SafeHtmlPipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SharingInformationService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            application_list: iNet.getPUrl("system/application/list"),
            //firmContext (appname)
            data_rights: iNet.getPUrl("datarights/available"),
            //params: appname
            user_rights_list: iNet.getPUrl("datarights/list"),
            //params: appname, group, myshare: boolean
            data_rights_update: iNet.getPUrl("datarights/update"),
            //params: {member: string, group: string, right: string},
            data_rights_delete: iNet.getPUrl("datarights/delete"),
            //params: appname
            users_suggest: iNet.getPUrl("cloud/profileacct/list")
        };
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getApplicationList(params) {
        this.http.showLoading();
        return this.http.getJSON(this.url.application_list, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getApplicationRights(params) {
        this.http.showLoading();
        return this.http.getJSON(this.url.data_rights, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getUserRights(params) {
        this.http.showLoading();
        return this.http.getJSON(this.url.user_rights_list, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    updateUserRight(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.data_rights_update, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    deleteUserRight(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.data_rights_delete, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getSuggestUser(params) {
        return this.http.postJSON(this.url.users_suggest, params);
    }
}
SharingInformationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SharingInformationService.ctorParameters = () => [
    { type: HttpClientService }
];
/** @nocollapse */ SharingInformationService.ngInjectableDef = defineInjectable({ factory: function SharingInformationService_Factory() { return new SharingInformationService(inject(HttpClientService)); }, token: SharingInformationService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    SharingInformationService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    SharingInformationService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SharingInformationTemplateComponent {
    /**
     * @param {?} sharingInformationService
     * @param {?} notification
     */
    constructor(sharingInformationService, notification) {
        this.sharingInformationService = sharingInformationService;
        this.notification = notification;
        this.page = 0;
        this.limit = 10;
        this.finishLoading = false;
        this.dataTables = [];
        this.searchData = [];
        this.searchTerm$ = new Subject();
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onSearchUsers();
        this.loadTableData();
        this.onDocumentClick = this.onDocumentClick.bind(this);
        document.addEventListener('click', this.onDocumentClick);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        document.removeEventListener('click', this.onDocumentClick);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    mapApplicationData(val) {
        if (val.organId !== 'community' && val.pattern !== 'calista' && val.firmContext && val.pattern) {
            return {
                "appName": val.firmContext,
                "appIcon": val.icon
            };
        }
    }
    /**
     * @return {?}
     */
    loadTableData() {
        this.sharingInformationService.getApplicationList({}).concatMap((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data && data.elements) {
                return of(data.elements.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => this.mapApplicationData(item))).filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item)));
            }
            return of(null);
        }))
            .concatMap((/**
         * @param {?} appInfo
         * @return {?}
         */
        (appInfo) => {
            this.dataTableInfo = appInfo || [];
            /** @type {?} */
            let appNames = appInfo.map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.appName));
            if (appNames.length) {
                /** @type {?} */
                let __sources = appNames.map((/**
                 * @param {?} appname
                 * @param {?} index
                 * @return {?}
                 */
                (appname, index) => this.sharingInformationService.getApplicationRights({ appname: appname })));
                return Observable$1.concat(...__sources);
            }
            return of(null);
        }))
            .concatMap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (data && data.length) {
                this.dataTables.push(data);
                return this.sharingInformationService.getUserRights({ appname: data[0].application });
            }
            else {
                this.dataTableInfo = this.dataTableInfo.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.appName !== data.appname));
            }
            return of(null);
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data && data.total) {
                /** @type {?} */
                let __userData = data.items || [];
                this.dataTables.forEach((/**
                 * @param {?} items
                 * @return {?}
                 */
                (items) => {
                    items.forEach((/**
                     * @param {?} table
                     * @return {?}
                     */
                    table => {
                        table.onSearch = false;
                        table.hidden = false;
                        /** @type {?} */
                        let __users = __userData.filter((/**
                         * @param {?} __user
                         * @return {?}
                         */
                        __user => __user.group == table.category && __user.application == table.application));
                        if (__users.length && __users[0].application == table.application) {
                            table.data = __users || [];
                            table.data = this.mergeValueInArray(table.data);
                        }
                    }));
                }));
            }
        }), (/**
         * @return {?}
         */
        () => {
        }), (/**
         * @return {?}
         */
        () => {
            this.finishLoading = true;
            // console.log(this.dataTables);
        }));
    }
    /**
     * @param {?} subItem
     * @return {?}
     */
    onToggleTable(subItem) {
        if (iNet.isEmpty(subItem.hidden)) {
            subItem.hidden = false;
        }
        else {
            subItem.hidden = !subItem.hidden;
        }
    }
    /**
     * @param {?} subItem
     * @return {?}
     */
    onSetSubItem(subItem) {
        this.subItem = subItem;
    }
    /**
     * @param {?} arr
     * @return {?}
     */
    mergeValueInArray(arr) {
        arr.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            // console.log(arr);
            /** @type {?} */
            let __users = arr.filter((/**
             * @param {?} data
             * @return {?}
             */
            data => data.member === item.member)) || [];
            if (__users.length > 1) {
                arr = arr.filter((/**
                 * @param {?} val
                 * @return {?}
                 */
                val => val.member !== item.member));
                /** @type {?} */
                let __right = __users.map((/**
                 * @param {?} user
                 * @return {?}
                 */
                user => user.right)).join(",");
                /** @type {?} */
                let __uuids = __users.map((/**
                 * @param {?} user
                 * @return {?}
                 */
                user => [user.right, user.uuid]));
                // let __user: any={};
                arr.push(Object.assign({}, __users[0], { right: __right, uuids: __uuids }));
                // console.log(arr);
            }
            arr.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (!item.uuids) {
                    item.uuids = [[item.right, item.uuid]];
                }
            }));
        }));
        return arr;
    }
    /**
     * @param {?} user
     * @param {?} subItem
     * @param {?} $event
     * @return {?}
     */
    onCheckUserRight(user, subItem, $event) {
        /** @type {?} */
        let __checked = $event.target.checked;
        /** @type {?} */
        let __value = $event.target.value;
        if (__checked) {
            this.sharingInformationService.updateUserRight({
                appname: user.application,
                member: user.member,
                right: __value,
                group: user.group,
            }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data && data.member) {
                    subItem.data.push(data);
                    /** @type {?} */
                    let __users = subItem.data.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => item.member === data.member && item.uuid)) || [];
                    if (__users.length > 1) {
                        /** @type {?} */
                        let __right = __users.map((/**
                         * @param {?} user
                         * @return {?}
                         */
                        user => user.right)).join(",");
                        subItem.data.forEach((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => {
                            if (item.member == data.member && item.uuids) {
                                item.right = __right;
                                item.uuids.push([__value, data.uuid]);
                            }
                        }));
                    }
                    if (__users.length === 1) {
                        /** @type {?} */
                        let __right = __users.map((/**
                         * @param {?} user
                         * @return {?}
                         */
                        user => user.right)).join(",");
                        /** @type {?} */
                        let __uuids = __users.map((/**
                         * @param {?} user
                         * @return {?}
                         */
                        user => [user.right, user.uuid]));
                        subItem.data.push(Object.assign({}, __users[0], { right: __right, uuids: __uuids }));
                    }
                    subItem.data = subItem.data.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => item.uuids));
                    // console.log("----->", subItem.data);
                    this.notification.showMessage("Đã chia sẻ dữ liệu cho " + data.member, "success", "Chia sẻ dữ liệu");
                }
                else {
                    this.notification.showMessage("Có lỗi xảy ra khi chia sẻ dữ liệu cho " + user.member, "error", "Chia sẻ dữ liệu");
                }
            }));
        }
        else {
            /** @type {?} */
            let __item = user.uuids.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item[0] == __value))[0] || [];
            this.sharingInformationService.deleteUserRight({
                appname: user.application,
                uuid: __item[1] || user.uuid
            }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data && data.uuid) {
                    /** @type {?} */
                    let __index = user.uuids.findIndex((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => item[1] == data.uuid));
                    user.uuids.splice(__index, 1);
                    /** @type {?} */
                    let __rights = user.right.split(",").filter((/**
                     * @param {?} name
                     * @return {?}
                     */
                    name => name !== __value));
                    user.right = __rights.join(",");
                    if (!user.uuids.length) {
                        // console.log("innnn");
                        /** @type {?} */
                        let index = subItem.data.findIndex((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.member === user.member));
                        index > -1 ? subItem.data.splice(index, 1) : '';
                    }
                    this.notification.showMessage("Đã hủy chia sẻ dữ liệu cho " + user.member, "success", "Chia sẻ dữ liệu");
                }
                else {
                    this.notification.showMessage("Có lỗi xảy ra khi chia dữ liệu cho " + user.member, "error", "Chia sẻ dữ liệu");
                }
            }));
        }
    }
    /**
     * @param {?} $event
     * @param {?} subItem
     * @return {?}
     */
    onKeyUp($event, subItem) {
        /** @type {?} */
        let __keyword = $event.target.value || "";
        this.searchTerm$.next(__keyword);
    }
    /**
     * @return {?}
     */
    onSearchUsers() {
        this.searchTerm$
            .delay(50)
            .debounceTime(200)
            .switchMap((/**
         * @param {?} keyword
         * @return {?}
         */
        (keyword) => {
            this.keyword = keyword;
            return keyword ? this.sharingInformationService.getSuggestUser({ keyword: keyword }) : of(null);
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            let __data = data ? data.items || [] : [];
            if (__data.length) {
                __data = __data.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.username !== iNet.username));
            }
            this.searchData = __data;
            if (this.subItem.data) {
                /** @type {?} */
                let __temp = this.subItem.data.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.member));
                this.searchData = this.searchData.filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                data => !__temp.includes(data.username)));
            }
        }));
    }
    /**
     * @param {?} subItem
     * @param {?} user
     * @return {?}
     */
    onChooseUser(subItem, user) {
        this.keyword = '';
        this.searchTerm$.next("");
        this.searchData = [];
        /** @type {?} */
        let __user = {
            application: subItem.application,
            member: user.username,
            right: "",
            group: subItem.category,
        };
        this.__userOnAdd = __user;
        if (!subItem.data) {
            subItem.data = [];
        }
        subItem.data.push(__user);
    }
    /**
     * @param {?} subItem
     * @return {?}
     */
    onFocusSearchOut(subItem) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.searchData = [];
            subItem.onSearch = false;
        }), 300);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (this.suggestElement && this.suggestElement.nativeElement.contains(event.target)) {
            return;
        }
        this.searchData = [];
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    scrollMouse($event) {
        /** @type {?} */
        const target = $event.target;
        if (this.searchData.length !== this.total && (target.offsetHeight + target.scrollTop >= target.scrollHeight)) {
            this.page++;
            this.sharingInformationService.getSuggestUser({
                pageSize: this.limit,
                pageNumber: this.page,
                keyword: this.keyword
            }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let newData = data.items || [];
                this.searchData = this.searchData.concat(newData);
            }));
        }
    }
}
SharingInformationTemplateComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-sharing-information-template',
                template: "<div *ngIf=\"finishLoading\" class=\"sharing-table-wrapper custom-toolbar\">\n    <div *ngFor=\"let tableInfo of dataTableInfo; let index = index\" class=\"sharing-table-container\">\n        <div class=\"sharing-table-header\">\n            <div class=\"sharing-table-header-wrapper\">\n                <div class=\"d-flex\">\n                    <div class=\"sharing-table-popicon\">\n                        <img class=\"p-1 plugin-icon float-left application-icon\"\n                             [src]=\"tableInfo.appIcon\" onerror=\"this.onerror=null; this.src='https://media.inetcloud.vn/images/unicorn/app.png'\">\n                    </div>\n                    <div class=\"sharing-table-application\">\n                        <span class=\"mr-2\" style=\"text-transform: capitalize\">{{tableInfo.appName}}</span>\n                    </div>\n                </div>\n            </div>\n            <div *ngFor=\"let item of dataTables; let  index=index\" class=\"row m-0 pr-2 pl-2\">\n                <div *ngFor=\"let subItem of item; let subIndex= index\" class=\"col-lg-12\">\n                    <div *ngIf=\"subItem.application == tableInfo.appName\">\n                        <div class=\"right-name\" [style.marginBottom]=\"subItem.hidden?'6px':''\" (click)=\"onToggleTable(subItem)\"\n                             [style.background]=\"subItem.hidden==false?'#ededed':'#ededed'\">\n                            <div class=\"right-icon\">\n                                <i class=\"fa fa-angle-right\" [ngClass]=\"subItem.hidden==false?'fa-angle-down':''\"\n                                   aria-hidden=\"true\"></i>\n                            </div>\n                            {{subItem.category || \"\"}}\n                        </div>\n                        <div [hidden]=\"subItem.hidden\" class=\"table-wrapper col-lg-12 p-0\">\n                            <div class=\"table-responsive custom-toolbar\">\n                                <table class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th id=\"user-name\" scope=\"col\">T\u00E0i kho\u1EA3n</th>\n                                        <th *ngFor=\"let right of subItem.rights; let rightIndex = index\" scope=\"col\"\n                                            style=\"text-transform: capitalize\">{{right}}</th>\n                                        <!--                                        <th></th>-->\n                                    </tr>\n                                    </thead>\n                                    <tbody style=\"position:relative\">\n                                    <tr class=\"user-search p-0 d-flex align-items-center\" style=\"margin-bottom: 36px\">\n                                        <td style=\"width: 100%; border:none;padding: 6px 0 0\">\n                                            <div class=\"input-group input-group-sm p-0 position-absolute\">\n                                                <div class=\"input-group-prepend\">\n                                                    <span class=\"input-group-text\" id=\"basic-addon1\" style=\"height: 30px\">\n                                                        <i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                                </div>\n                                                <input (keyup)=\"onKeyUp($event, subItem)\" type=\"text\"\n                                                       (focusin)=\"subItem.onSearch = true; onSetSubItem(subItem)\"\n                                                       (focusout)=\"onFocusSearchOut(subItem)\"\n                                                       class=\"form-control form-control-sm\"\n                                                       placeholder=\"T\u00ECm t\u00E0i kho\u1EA3n\" aria-label=\"Username\"\n                                                       aria-describedby=\"basic-addon1\" style=\"height: 30px\">\n                                                <div #suggestEle (scroll)=\"scrollMouse($event)\"\n                                                     *ngIf=\"subItem.onSearch && searchData.length\"\n                                                     class=\"form-invitation-popover custom-toolbar\">\n                                                    <div *ngFor=\"let user of searchData; let i=index\"\n                                                         (click)=\"onChooseUser(subItem, user)\"\n                                                         class=\"popover-data d-flex\">\n                                                        <div class=\"user-avatar mr-2\">\n                                                            <img class=\"user-avatar-custom\" userAvatar\n                                                                 [usercode]=\"user.username\">\n                                                        </div>\n                                                        <div class=\"user-info-wrapper\">\n                                                            <div class=\"user-name\">\n                                                                {{user.fullname || \"\"}}\n                                                            </div>\n                                                            <div class=\"user-email\">\n                                                                {{user.username}}\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    <tr *ngFor=\"let user of subItem.data\">\n                                        <td>{{user.member}}</td>\n                                        <td *ngFor=\"let right of subItem.rights;\">\n                                            <div class=\"custom-control custom-checkbox ml-2\">\n                                                <input (click)=\"onCheckUserRight(user, subItem, $event)\"\n                                                       [checked]=\"user.right.includes(right)\" [value]=\"right\"\n                                                       type=\"checkbox\" class=\"custom-control-input\"\n                                                       [id]=\"user.application+user.member+subItem.category+right\">\n                                                <label class=\"custom-control-label\"\n                                                       [for]=\"user.application+user.member+subItem.category+right\"><span\n                                                        class=\"hidden-span\">a</span></label>\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: [".sharing-table-wrapper{background:#fff;padding:0 20px}.sharing-table-wrapper .hidden-span{visibility:hidden}.sharing-table-wrapper table tr td:not(:first-child),.sharing-table-wrapper table tr th:not(:first-child){text-align:center}.sharing-table-wrapper table tbody tr td{padding:6px}.sharing-table-wrapper #user-name{font-weight:400;width:180px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper{display:flex;justify-content:space-between;padding-bottom:4px;color:#366dd0}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper .sharing-table-popicon{margin-right:6px;font-size:21px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper .sharing-table-popicon .application-icon{height:40px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper .sharing-table-application{font-size:1.4em;font-weight:700;display:flex;align-items:center}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover{max-height:150px;width:100%;z-index:5;background:#fff;border:.5px solid #d3d3d3;border-radius:.1rem;overflow-x:hidden;overflow-y:scroll;top:32px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data{padding:6px;cursor:pointer;border-bottom:1px solid #f0f0f0}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data:hover{background:#d5f1ff}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data .user-avatar-custom{width:33px;height:33px;border:1px solid #e3e3e3}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data .user-info-wrapper{display:flex;flex-direction:column}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data .user-info-wrapper .user-email{font-size:80%}.right-name{font-size:16px;padding:6px 3px;border-radius:.2rem;font-weight:700;display:flex;cursor:pointer}.right-name:hover{background:#ededed!important}.right-icon{margin-right:10px}@-webkit-keyframes slidein{0%{margin-top:-12px}100%{margin-top:0}}@keyframes slidein{0%{margin-top:-12px}100%{margin-top:0}}.table-wrapper{-webkit-animation-name:slidein;animation-name:slidein;-webkit-animation-duration:.25s;animation-duration:.25s;display:block}"]
            }] }
];
/** @nocollapse */
SharingInformationTemplateComponent.ctorParameters = () => [
    { type: SharingInformationService },
    { type: NotificationService }
];
SharingInformationTemplateComponent.propDecorators = {
    suggestElement: [{ type: ViewChild, args: ['suggestEle',] }]
};
if (false) {
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.total;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.page;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.limit;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.keyword;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.finishLoading;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.subItem;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.dataTables;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.searchData;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.dataTableInfo;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.searchTerm$;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    SharingInformationTemplateComponent.prototype.__userOnAdd;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.suggestElement;
    /**
     * @type {?}
     * @private
     */
    SharingInformationTemplateComponent.prototype.sharingInformationService;
    /**
     * @type {?}
     * @private
     */
    SharingInformationTemplateComponent.prototype.notification;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SharingInformationModule {
}
SharingInformationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SharingInformationTemplateComponent],
                exports: [
                    SharingInformationTemplateComponent
                ],
                imports: [
                    CommonModule,
                    CoreModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BootstrapLayoutModule {
    /**
     * @param {?} router
     * @param {?} loadingService
     */
    constructor(router, loadingService) {
        /*
        * True to enable layout for controlling the menu,header,etc....
        * This option should generally be enabled when layout are being used inside the framework.
         */
        iNet.enableLayout = true;
        router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event instanceof NavigationStart) {
                loadingService.showLoading();
            }
            if ((event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel)) {
                loadingService.hideLoading();
            }
        }));
    }
}
BootstrapLayoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    CoreModule,
                    BootstrapLayoutRoutingModule,
                    HttpClientModule,
                    InterceptorModule,
                    ModalModule.forRoot(),
                    CloudTranslateModule,
                    NotifyModule,
                    UserProfileModule,
                    OrganizationModule,
                    SafePipeModule,
                    SharingInformationModule,
                ],
                declarations: [
                    AdminNavbarComponent,
                    LayoutComponent,
                    BootstrapUserProfileComponent,
                    BootstrapCompanyProfileComponent,
                    MessageSideNavComponent,
                    AppSideNavComponent,
                    SocialSideNavComponent,
                    AbstractSideNavComponent,
                    CommonToolbarComponent
                ],
                exports: [InterceptorModule, CloudTranslateModule, LayoutComponent, AbstractSideNavComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [AuthenticateGuard, OrganizationService, HttpClientService, NotifyMessageService]
            },] }
];
/** @nocollapse */
BootstrapLayoutModule.ctorParameters = () => [
    { type: Router },
    { type: LoadingIndicatorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Application {
}
if (false) {
    /** @type {?} */
    Application.prototype.dbmsType;
    /** @type {?} */
    Application.prototype.description;
    /** @type {?} */
    Application.prototype.group;
    /** @type {?} */
    Application.prototype.libs;
    /** @type {?} */
    Application.prototype.marketplace;
    /** @type {?} */
    Application.prototype.method;
    /** @type {?} */
    Application.prototype.modules;
    /** @type {?} */
    Application.prototype.name;
    /** @type {?} */
    Application.prototype.photos;
    /** @type {?} */
    Application.prototype.templateID;
    /** @type {?} */
    Application.prototype.trialDay;
    /** @type {?} */
    Application.prototype.trialMode;
    /** @type {?} */
    Application.prototype.uis;
    /** @type {?} */
    Application.prototype.updateVersion;
    /** @type {?} */
    Application.prototype.uuid;
    /** @type {?} */
    Application.prototype.version;
    /** @type {?} */
    Application.prototype.zones;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SystemApplication {
}
if (false) {
    /** @type {?} */
    SystemApplication.prototype.domain;
    /** @type {?} */
    SystemApplication.prototype.firmContext;
    /** @type {?} */
    SystemApplication.prototype.homepage;
    /** @type {?} */
    SystemApplication.prototype.icon;
    /** @type {?} */
    SystemApplication.prototype.module;
    /** @type {?} */
    SystemApplication.prototype.name;
    /** @type {?} */
    SystemApplication.prototype.organId;
    /** @type {?} */
    SystemApplication.prototype.pattern;
    /** @type {?} */
    SystemApplication.prototype.prefixUri;
    /** @type {?} */
    SystemApplication.prototype.webContext;
    /** @type {?} */
    SystemApplication.prototype.widget;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserRole {
}
if (false) {
    /** @type {?} */
    UserRole.prototype.user;
    /** @type {?} */
    UserRole.prototype.admin;
    /** @type {?} */
    UserRole.prototype.community;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Message {
    constructor() {
        this.badge = 1;
        this.sound = 'default';
    }
}
if (false) {
    /** @type {?} */
    Message.prototype.application;
    /** @type {?} */
    Message.prototype.alert;
    /** @type {?} */
    Message.prototype.sender;
    /** @type {?} */
    Message.prototype.content;
    /** @type {?} */
    Message.prototype.badge;
    /** @type {?} */
    Message.prototype.sound;
}
class ChatMessage {
}
if (false) {
    /** @type {?} */
    ChatMessage.prototype.application;
    /** @type {?} */
    ChatMessage.prototype.organization;
    /** @type {?} */
    ChatMessage.prototype.sender;
    /** @type {?} */
    ChatMessage.prototype.sent;
    /** @type {?} */
    ChatMessage.prototype.message;
    /** @type {?} */
    ChatMessage.prototype.messageType;
    /** @type {?} */
    ChatMessage.prototype.alias;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotifyMessage {
}
if (false) {
    /** @type {?} */
    NotifyMessage.prototype.uuid;
    /** @type {?} */
    NotifyMessage.prototype.application;
    /** @type {?} */
    NotifyMessage.prototype.context;
    /** @type {?} */
    NotifyMessage.prototype.activityID;
    /** @type {?} */
    NotifyMessage.prototype.message;
    /** @type {?} */
    NotifyMessage.prototype.sender;
    /** @type {?} */
    NotifyMessage.prototype.fullname;
    /** @type {?} */
    NotifyMessage.prototype.usercode;
    /** @type {?} */
    NotifyMessage.prototype.created;
    /** @type {?} */
    NotifyMessage.prototype.read;
    /** @type {?} */
    NotifyMessage.prototype.mredirectURL;
    /** @type {?} */
    NotifyMessage.prototype.mshortcutURL;
    /** @type {?} */
    NotifyMessage.prototype.redirectURL;
    /** @type {?} */
    NotifyMessage.prototype.shortcutURL;
    /** @type {?} */
    NotifyMessage.prototype.params;
}
class NotifyMessageContent {
    constructor() {
        this.sound = 'default';
    }
}
if (false) {
    /** @type {?} */
    NotifyMessageContent.prototype.action;
    /** @type {?} */
    NotifyMessageContent.prototype.alert;
    /** @type {?} */
    NotifyMessageContent.prototype.badge;
    /** @type {?} */
    NotifyMessageContent.prototype.content;
    /** @type {?} */
    NotifyMessageContent.prototype.msgID;
    /** @type {?} */
    NotifyMessageContent.prototype.sound;
    /** @type {?} */
    NotifyMessageContent.prototype.ttl;
}
class NotifyMessageItem {
}
if (false) {
    /** @type {?} */
    NotifyMessageItem.prototype.uuid;
    /** @type {?} */
    NotifyMessageItem.prototype.alias;
    /** @type {?} */
    NotifyMessageItem.prototype.application;
    /** @type {?} */
    NotifyMessageItem.prototype.channelIds;
    /** @type {?} */
    NotifyMessageItem.prototype.deviceTypes;
    /** @type {?} */
    NotifyMessageItem.prototype.message;
    /** @type {?} */
    NotifyMessageItem.prototype.messageType;
    /** @type {?} */
    NotifyMessageItem.prototype.organization;
    /** @type {?} */
    NotifyMessageItem.prototype.sender;
    /** @type {?} */
    NotifyMessageItem.prototype.sent;
    /** @type {?} */
    NotifyMessageItem.prototype.variants;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResponseUploadFile {
}
if (false) {
    /** @type {?} */
    ResponseUploadFile.prototype.elements;
}
class ResponseFileItem {
}
if (false) {
    /** @type {?} */
    ResponseFileItem.prototype.uuid;
    /** @type {?} */
    ResponseFileItem.prototype.name;
    /** @type {?} */
    ResponseFileItem.prototype.mimetype;
    /** @type {?} */
    ResponseFileItem.prototype.filesize;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebsocketModule {
}
WebsocketModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [],
                exports: [],
                providers: [WebSocketClientService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutocompleteListDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.$el = $(this.el.nativeElement);
    }
    /**
     * @return {?}
     */
    open() {
        this.$el.show();
    }
    /**
     * @return {?}
     */
    hide() {
        this.$el.hide();
        this.$el.find('.active').removeClass('active');
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        this.open();
        switch (e.which) {
            // arrow up
            case 38: /** @type {?} */
            let step = -1;
            // arrow down
            case 40:
                /** @type {?} */
                let $items = this.$el.children();
                if ($items.length < 1) {
                    return;
                }
                /** @type {?} */
                let $active;
                /** @type {?} */
                let index = -1;
                for (let i = 0; i < $items.length; i++) {
                    $active = $items.eq(i);
                    if ($active.hasClass('active')) {
                        $active.removeClass('active');
                        index = i;
                        break;
                    }
                }
                step = step || 1;
                // Active at first or last
                if ((index === 0 && step === -1) || (index === $items.length - 1 && step === 1)) {
                    return;
                }
                index += step;
                if (index < 0) {
                    index = $items.length - 1;
                }
                this.moveToActive($items.eq(index).addClass('active'));
                break;
            // enter
            case 13:
                this.$el.find('.active').trigger('click');
                break;
        }
    }
    // Todo: scroll to active item
    /**
     * @private
     * @param {?} $active
     * @return {?}
     */
    moveToActive($active) {
        // let scrollHeight = this.el.nativeElement.scrollHeight;
        // let height = this.el.nativeElement.clientHeight;
        // if (scrollHeight <= height) {
        //   return;
        // }
        // let scrollTop = this.el.nativeElement.scrollTop;
        // let offset = $active.offset();
        //
        // console.log(scrollTop, scrollHeight, height);
        // console.log(offset);
        // let distanceTop = offset.top - scrollTop;
        // let distanceBottom = offset.top - scrollTop + height + $active.outerHeight();
        // if (distanceTop < 0) {
        //   this.el.nativeElement.scrollTop = scrollTop - distanceTop;
        // } else if(distanceBottom > 0){
        //   this.el.nativeElement.scrollTop = scrollTop - distanceBottom;
        // }
    }
}
AutocompleteListDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appAutocompleteList]',
                exportAs: 'appAutocompleteList'
            },] }
];
/** @nocollapse */
AutocompleteListDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    AutocompleteListDirective.prototype.$el;
    /**
     * @type {?}
     * @private
     */
    AutocompleteListDirective.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutocompleteInputDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.onBackSpaceRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.autoList.open();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        switch (e.which) {
            case 8:
                if (!e.target.value) {
                    this.onBackSpaceRemove.emit(e);
                }
                break;
        }
        this.autoList.onInput(e);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hideList = this.hideList.bind(this);
        // Click out hide list
        document.addEventListener('click', this.hideList);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        document.removeEventListener('click', this.hideList);
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    hideList(e) {
        if (!e.target.isSameNode(this.el.nativeElement)) {
            this.autoList.hide();
        }
    }
}
AutocompleteInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appAutocompleteInput]'
            },] }
];
/** @nocollapse */
AutocompleteInputDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutocompleteInputDirective.propDecorators = {
    autoList: [{ type: Input }],
    onBackSpaceRemove: [{ type: Output }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onInput: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    AutocompleteInputDirective.prototype.autoList;
    /** @type {?} */
    AutocompleteInputDirective.prototype.onBackSpaceRemove;
    /**
     * @type {?}
     * @protected
     */
    AutocompleteInputDirective.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutocompleteModule {
}
AutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    AutocompleteInputDirective,
                    AutocompleteListDirective
                ],
                declarations: [
                    AutocompleteInputDirective,
                    AutocompleteListDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CollapseDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.expanded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._element = $(this._el.nativeElement);
        // Click toggle
        if (this.toggleEl) {
            this.toggleEl.addEventListener('click', this.toggle.bind(this));
        }
        this.expanded = !this.expanded;
        this.toggle();
    }
    /**
     * @return {?}
     */
    show() {
        this.expanded = true;
        this._element.collapse('show').parent().addClass('collapse-expanded');
    }
    /**
     * @return {?}
     */
    hide() {
        this.expanded = false;
        this._element.collapse('hide').parent().removeClass('collapse-expanded');
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.expanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}
CollapseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appCollapse]'
            },] }
];
/** @nocollapse */
CollapseDirective.ctorParameters = () => [
    { type: ElementRef }
];
CollapseDirective.propDecorators = {
    expanded: [{ type: Input }],
    toggleEl: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CollapseDirective.prototype.expanded;
    /** @type {?} */
    CollapseDirective.prototype.toggleEl;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CollapseModule {
}
CollapseModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CollapseDirective
                ],
                exports: [
                    CollapseDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DialogAction {
    /**
     * @param {?} title
     * @param {?} cls
     * @param {?} iconCls
     * @param {?=} fn
     */
    constructor(title, cls, iconCls, fn) {
        this.title = title;
        this.cls = cls;
        this.iconCls = iconCls;
        if (fn) {
            this.fn = fn;
        }
    }
}
if (false) {
    /** @type {?} */
    DialogAction.prototype.title;
    /** @type {?} */
    DialogAction.prototype.iconCls;
    /** @type {?} */
    DialogAction.prototype.cls;
    /** @type {?} */
    DialogAction.prototype.fn;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfirmDialogComponent {
    /**
     * @param {?} modalService
     * @param {?} translate
     */
    constructor(modalService, translate) {
        this.modalService = modalService;
        this.translate = translate;
        this.id = iNet.generateId();
        this.iconCls = '';
        this.title = '';
        this.content = '';
        this.cls = '';
        this.actions = [];
        this.translateSubscription = translate.get(['TOOLBAR']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            const { TOOLBAR } = res || { 'TOOLBAR': { 'CLOSE': 'Close' } };
            this.toolbarTranslations = TOOLBAR;
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.getActions().length < 1) {
            const { CLOSE } = this.toolbarTranslations;
            /** @type {?} */
            let closeAction = new DialogAction(CLOSE, 'btn-danger', 'fa fa-check', this.hide);
            this.setActions([closeAction]);
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.modalRef.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.modalRef = this.modalService.show(this.confirmModal);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    pushAction(action) {
        this.actions.push(action);
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    setActions(actions) {
        this.actions = actions;
    }
    /**
     * @return {?}
     */
    getActions() {
        return this.actions;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setData(v) {
        this.data = v;
    }
    /**
     * @return {?}
     */
    getData() {
        return this.data;
    }
    /**
     * @return {?}
     */
    getId() {
        return this.id;
    }
}
ConfirmDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-confirm-dialog',
                template: "<ng-template #confirmModal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\"><i class=\"{{iconCls}}\"></i> {{title}}</h4>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"content\"></div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" *ngFor=\"let action of actions\" class=\"btn btn-sm {{action.cls}}\"\n                (click)=\"action?.fn.bind(this)()\"><i class=\"{{action.iconCls}}\"></i> {{action.title}}</button>\n    </div>\n</ng-template>\n"
            }] }
];
/** @nocollapse */
ConfirmDialogComponent.ctorParameters = () => [
    { type: BsModalService },
    { type: TranslateService }
];
ConfirmDialogComponent.propDecorators = {
    confirmModal: [{ type: ViewChild, args: ['confirmModal',] }],
    id: [{ type: Input, args: ['id',] }],
    iconCls: [{ type: Input, args: ['iconCls',] }],
    title: [{ type: Input, args: ['title',] }],
    content: [{ type: Input, args: ['content',] }],
    cls: [{ type: Input, args: ['cls',] }],
    actions: [{ type: Input, args: ['actions',] }]
};
if (false) {
    /** @type {?} */
    ConfirmDialogComponent.prototype.confirmModal;
    /** @type {?} */
    ConfirmDialogComponent.prototype.id;
    /** @type {?} */
    ConfirmDialogComponent.prototype.iconCls;
    /** @type {?} */
    ConfirmDialogComponent.prototype.title;
    /** @type {?} */
    ConfirmDialogComponent.prototype.content;
    /** @type {?} */
    ConfirmDialogComponent.prototype.cls;
    /** @type {?} */
    ConfirmDialogComponent.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.modalRef;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.data;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.toolbarTranslations;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.modalService;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DialogModule {
}
DialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ModalModule$1.forRoot(),
                    TranslateModule
                ],
                declarations: [ConfirmDialogComponent],
                exports: [ConfirmDialogComponent],
                providers: [BsModalService$1]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FILES_FORMAT = [
    'unknown', 'text', 'archive', 'audio', 'video',
    'png', 'jpg', 'gif', 'tiff', 'svg', 'ai', 'psd', 'dwg',
    'avi', 'fla', 'mp2', 'mp3', 'mp4', 'aac', 'flac', 'wma', 'wav', 'mxf',
    'iso', 'mdf', 'nrg',
    'zip', '7z', 'arj', 'rar',
    'pdf', 'doc', 'rtf', 'txt', 'xls', 'ppt',
    'css', 'csv', 'html', 'json', 'js', 'xml',
    'dbf', 'exe'
];
/** @type {?} */
const FILES_EDIT_FORMAT = [
    'doc', 'docx', 'odt', 'ods', 'xls', 'xlsx',
    'ppt', 'pps', 'pptm', 'pptx', 'pot', 'potx',
    'dot', 'dotx', 'docm', 'dotx', 'csv', 'sxw'
];
/** @type {?} */
const FILES_VIEW_FORMAT = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];
/** @type {?} */
const UNKNOWN = 'unknown';
class FileFormatService {
    constructor() { }
    /**
     * @return {?}
     */
    getImagePath() {
        /** @type {?} */
        let path = iNet.commonImageFolder;
        /** @type {?} */
        const lastIndex = path.lastIndexOf('/');
        if (lastIndex === path.length - 1) {
            return path.substring(0, lastIndex);
        }
        return path;
    }
    /**
     * @return {?}
     */
    getFileFormatPath() {
        return `${this.getImagePath()}/format`;
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    getUrlByExt(ext) {
        /** @type {?} */
        const path = this.getFileFormatPath();
        if (FILES_FORMAT.indexOf(ext) > -1) {
            return `${path}/${ext.toLowerCase()}.svg`;
        }
        return `${path}/${UNKNOWN}.svg`;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getUrlByName(name) {
        return this.getUrlByExt(this.getExtByName(name));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getExtByName(name) {
        return name.split('.').pop().toLowerCase() || UNKNOWN;
    }
    /**
     * @return {?}
     */
    getEditFormats() {
        return FILES_EDIT_FORMAT;
    }
    /**
     * @return {?}
     */
    getViewFormats() {
        return FILES_VIEW_FORMAT;
    }
}
FileFormatService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FileFormatService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileExtPipe {
    /**
     * @param {?} formatService
     */
    constructor(formatService) {
        this.formatService = formatService;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    transform(name) {
        return this.formatService.getExtByName(name);
    }
}
FileExtPipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileExt'
            },] }
];
/** @nocollapse */
FileExtPipe.ctorParameters = () => [
    { type: FileFormatService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileExtPipe.prototype.formatService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileIconPipe {
    /**
     * @param {?} formatService
     */
    constructor(formatService) {
        this.formatService = formatService;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    transform(name) {
        return this.formatService.getUrlByName(name);
    }
}
FileIconPipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileIcon'
            },] }
];
/** @nocollapse */
FileIconPipe.ctorParameters = () => [
    { type: FileFormatService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileIconPipe.prototype.formatService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ViewerService {
    /**
     * @param {?} router
     * @param {?} formatService
     * @param {?} http
     */
    constructor(router, formatService, http) {
        this.router = router;
        this.formatService = formatService;
        this.http = http;
        this.routerPath = 'viewer'; //Navigate with the router path
        //Navigate with the router path
        this.downloadUrl = iNet.getPUrl('docx/download');
        // Observable sources
        this.emitLoadSource = new Subject();
        // Observable when document loaded
        this.loadEmitted = this.emitLoadSource.asObservable();
        return ViewerService.instance = ViewerService.instance || this;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setRouterPath(v) {
        this.routerPath = v;
    }
    /**
     * @return {?}
     */
    getRouterPath() {
        return this.routerPath;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setDownloadUrl(v) {
        this.downloadUrl = v;
    }
    /**
     * @return {?}
     */
    getDownloadUrl() {
        return this.downloadUrl;
    }
    /**
     * @param {?} ext
     * @param {?} docId
     * @param {?=} extras
     * @return {?}
     */
    open(ext, docId, extras) {
        if (this.hasEdit(ext) || (this.hasView(ext) && this.hasViewerInBrowser())) {
            this.router.navigate([this.getRouterPath(), ext, docId], extras);
        }
        else { //error pages
            this.router.navigate([this.getRouterPath(), docId]);
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    hasNameInPlugin(name) {
        /** @type {?} */
        let plugins = navigator.plugins || [];
        /** @type {?} */
        let plugin = {};
        for (let i = 0; i < plugins.length; i++) {
            plugin = plugins[i] || {};
            if ((plugin['name']).search(name) > -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    hasViewerInBrowser() {
        if (iNet.isWebKit) { //Chrome or Safari
            if (iNet.isChrome) {
                return this.hasNameInPlugin('PDF Viewer');
            }
            else if (iNet.isSafari) {
                return (this.hasNameInPlugin('Adobe Acrobat') || this.hasNameInPlugin('PDF'));
            }
        }
        else if (iNet.isGecko) { //Firefox
            return this.hasNameInPlugin('Adobe Acrobat');
        }
        return false;
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    hasEdit(ext) {
        return this.formatService.getEditFormats().indexOf(ext) > -1;
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    hasView(ext) {
        return this.formatService.getViewFormats().indexOf(ext) > -1;
    }
    /**
     * @param {?} docId
     * @return {?}
     */
    downloadById(docId) {
        this.http.downloadFile(this.getDownloadUrl(), { docID: docId });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setFiles(v) {
        ViewerService.files = v;
    }
    /**
     * @return {?}
     */
    getFiles() {
        return ViewerService.files;
    }
    /**
     * Returns true if this url is viewer module, false otherwise
     * @param {?} url - the give URL
     * @return {?}
     */
    isViewerModuleByUrl(url) {
        return (url.indexOf('/' + this.getRouterPath()) === 0);
    }
    /**
     * Fire event when document loaded
     *
     * @param {?} $event
     * @param {?} viewer
     * @return {?}
     */
    sendEvent($event, viewer) {
        this.emitLoadSource.next({ $event, viewer });
    }
}
ViewerService.instance = null;
ViewerService.files = [];
ViewerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ViewerService.ctorParameters = () => [
    { type: Router },
    { type: FileFormatService },
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    ViewerService.instance;
    /**
     * @type {?}
     * @private
     */
    ViewerService.files;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.routerPath;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.downloadUrl;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.emitLoadSource;
    /** @type {?} */
    ViewerService.prototype.loadEmitted;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.formatService;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ViewerDirective {
    /**
     * @param {?} viewerService
     */
    constructor(viewerService) {
        this.viewerService = viewerService;
    }
    /**
     * @return {?}
     */
    onClick() {
        this.viewerService.setFiles(this.files);
        this.viewerService.open(this.ext, this.docId, this.extras);
    }
}
ViewerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appViewer]'
            },] }
];
/** @nocollapse */
ViewerDirective.ctorParameters = () => [
    { type: ViewerService }
];
ViewerDirective.propDecorators = {
    ext: [{ type: Input, args: ['ext',] }],
    docId: [{ type: Input, args: ['docId',] }],
    files: [{ type: Input, args: ['files',] }],
    extras: [{ type: Input, args: ['extras',] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    ViewerDirective.prototype.ext;
    /** @type {?} */
    ViewerDirective.prototype.docId;
    /** @type {?} */
    ViewerDirective.prototype.files;
    /** @type {?} */
    ViewerDirective.prototype.extras;
    /**
     * @type {?}
     * @private
     */
    ViewerDirective.prototype.viewerService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileListComponent {
    constructor() {
        this.files = [];
        this.removable = true;
        this.onClick = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._initFileEl();
    }
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    clickFile(file, event) {
        this.onClick.emit({ file, event });
    }
    /**
     * @param {?} file
     * @return {?}
     */
    removeFile(file) {
        /** @type {?} */
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
            this.onRemove.emit(file);
        }
    }
    /**
     * @param {?} files
     * @return {?}
     */
    addFiles(files) {
        // Read as base64 if image
        for (let i = 0; i < files.length; i++) {
            /** @type {?} */
            let file = files[i];
            if (this._fileIsImage(file)) {
                file['image'] = true;
                this._readImageBase64(file);
            }
            this.files.push(file);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initFileEl() {
        if (this.fileEl) {
            this.fileEl.addEventListener('change', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                /** @type {?} */
                const files = this.fileEl.files;
                if (files.length > 0) {
                    // Read as base64 if image
                    this.addFiles(files);
                    // Reset file
                    this.fileEl.value = '';
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    _readImageBase64(file) {
        /** @type {?} */
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (/**
         * @return {?}
         */
        function () {
            file.url = reader.result;
        });
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    _fileIsImage(file) {
        return file.type && file.type.indexOf('image') > -1;
    }
}
FileListComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-list',
                template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                styles: [":host{display:block}.file-item{display:inline-block;text-align:center;width:80px;height:80px;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;border:1px solid #ddd;overflow:hidden;padding:0 5px;cursor:pointer;background:#fff}.file-item__image{max-width:100%;position:absolute;left:50%;top:50%;transform:translate3d(-50%,-50%,0)}.file-item__image_type{max-width:20px;max-height:20px;margin-bottom:5px;margin-top:10px}.file-item__name{font-size:12px;line-height:13px;max-height:40px;overflow:hidden}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
            }] }
];
FileListComponent.propDecorators = {
    fileEl: [{ type: Input }],
    files: [{ type: Input }],
    removable: [{ type: Input }],
    template: [{ type: Input }],
    onClick: [{ type: Output }],
    onRemove: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    FileListComponent.prototype.fileEl;
    /** @type {?} */
    FileListComponent.prototype.files;
    /** @type {?} */
    FileListComponent.prototype.removable;
    /** @type {?} */
    FileListComponent.prototype.template;
    /** @type {?} */
    FileListComponent.prototype.onClick;
    /** @type {?} */
    FileListComponent.prototype.onRemove;
}
/**
 * @record
 */
function FileListItem() { }
if (false) {
    /** @type {?|undefined} */
    FileListItem.prototype.id;
    /** @type {?|undefined} */
    FileListItem.prototype.url;
    /** @type {?|undefined} */
    FileListItem.prototype.image;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileModule {
}
FileModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [ViewerDirective, FileIconPipe, FileExtPipe, FileListComponent],
                exports: [ViewerDirective, FileIconPipe, FileExtPipe, FileListComponent],
                providers: [FileFormatService, ViewerService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
class FileLikeObject {
    /**
     * @param {?} fileOrInput
     */
    constructor(fileOrInput) {
        this.rawFile = fileOrInput;
        /** @type {?} */
        let isInput = isElement(fileOrInput);
        /** @type {?} */
        let fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        /** @type {?} */
        let postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        /** @type {?} */
        let method = '_createFrom' + postfix;
        ((/** @type {?} */ (this)))[method](fakePathOrObject);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    _createFromFakePath(path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    _createFromObject(object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    }
}
if (false) {
    /** @type {?} */
    FileLikeObject.prototype.lastModifiedDate;
    /** @type {?} */
    FileLikeObject.prototype.size;
    /** @type {?} */
    FileLikeObject.prototype.type;
    /** @type {?} */
    FileLikeObject.prototype.name;
    /** @type {?} */
    FileLikeObject.prototype.rawFile;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileItem {
    /**
     * @param {?} uploader
     * @param {?} some
     * @param {?} options
     */
    constructor(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'FileUpload';
        }
        this.url = uploader.options.url;
    }
    /**
     * @return {?}
     */
    upload() {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.uploader.cancelItem(this);
    }
    /**
     * @return {?}
     */
    remove() {
        this.uploader.removeFromQueue(this);
    }
    /**
     * @return {?}
     */
    onBeforeUpload() {
        return void 0;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    onBuildForm(form) {
        return { form };
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    onProgress(progress) {
        return { progress };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onSuccess(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onError(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCancel(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onComplete(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @return {?}
     */
    _onBeforeUpload() {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    }
    /**
     * @param {?} form
     * @return {?}
     */
    _onBuildForm(form) {
        this.onBuildForm(form);
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    _onProgress(progress) {
        this.progress = progress;
        this.onProgress(progress);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onSuccess(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onError(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCancel(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onComplete(response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    }
    /**
     * @return {?}
     */
    _prepareToUploading() {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    }
}
if (false) {
    /** @type {?} */
    FileItem.prototype.file;
    /** @type {?} */
    FileItem.prototype._file;
    /** @type {?} */
    FileItem.prototype.alias;
    /** @type {?} */
    FileItem.prototype.url;
    /** @type {?} */
    FileItem.prototype.method;
    /** @type {?} */
    FileItem.prototype.headers;
    /** @type {?} */
    FileItem.prototype.withCredentials;
    /** @type {?} */
    FileItem.prototype.formData;
    /** @type {?} */
    FileItem.prototype.isReady;
    /** @type {?} */
    FileItem.prototype.isUploading;
    /** @type {?} */
    FileItem.prototype.isUploaded;
    /** @type {?} */
    FileItem.prototype.isSuccess;
    /** @type {?} */
    FileItem.prototype.isCancel;
    /** @type {?} */
    FileItem.prototype.isError;
    /** @type {?} */
    FileItem.prototype.progress;
    /** @type {?} */
    FileItem.prototype.index;
    /** @type {?} */
    FileItem.prototype._xhr;
    /** @type {?} */
    FileItem.prototype._form;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.uploader;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.some;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.options;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileType {
    /**
     * @param {?} file
     * @return {?}
     */
    static getMimeClass(file) {
        /** @type {?} */
        let mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    }
    /**
     * @param {?} inputFilename
     * @return {?}
     */
    static fileTypeDetection(inputFilename) {
        /** @type {?} */
        let types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'zip': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'bz2': 'compress',
            'gz': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        /** @type {?} */
        let chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        /** @type {?} */
        let extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    }
}
/*  MS office  */
FileType.mime_doc = [
    'application/msword',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12'
];
FileType.mime_xsl = [
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
];
FileType.mime_ppt = [
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
];
/* PSD */
FileType.mime_psd = [
    'image/photoshop',
    'image/x-photoshop',
    'image/psd',
    'application/photoshop',
    'application/psd',
    'zz-application/zz-winassoc-psd'
];
/* Compressed files */
FileType.mime_compress = [
    'application/x-gtar',
    'application/x-gcompress',
    'application/compress',
    'application/x-tar',
    'application/x-rar-compressed',
    'application/octet-stream',
    'application/x-zip-compressed',
    'application/zip-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    'application/x-bzip2'
];
if (false) {
    /** @type {?} */
    FileType.mime_doc;
    /** @type {?} */
    FileType.mime_xsl;
    /** @type {?} */
    FileType.mime_ppt;
    /** @type {?} */
    FileType.mime_psd;
    /** @type {?} */
    FileType.mime_compress;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function isFile(value) {
    return (File && value instanceof File);
}
/**
 * @record
 */
function Headers() { }
if (false) {
    /** @type {?} */
    Headers.prototype.name;
    /** @type {?} */
    Headers.prototype.value;
}
/**
 * @record
 */
function FileUploaderOptions() { }
if (false) {
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.allowedMimeType;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.allowedFileType;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.autoUpload;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.isHTML5;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.filters;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.headers;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.method;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.authToken;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.maxFileSize;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.queueLimit;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.removeAfterUpload;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.url;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.disableMultipart;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.itemAlias;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.authTokenHeader;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.additionalParameter;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.parametersBeforeFiles;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.formatDataFunction;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.formatDataFunctionIsAsync;
}
class FileUploader {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false,
            formatDataFunction: (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item._file),
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this.options = Object.assign(this.options, options);
        this.authToken = this.options.authToken;
        this.authTokenHeader = this.options.authTokenHeader || 'Authorization';
        this.autoUpload = this.options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (let i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    }
    /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    addToQueue(files, options, filters) {
        /** @type {?} */
        let list = [];
        for (let file of files) {
            list.push(file);
        }
        /** @type {?} */
        let arrayOfFilters = this._getFilters(filters);
        /** @type {?} */
        let count = this.queue.length;
        /** @type {?} */
        let addedFileItems = [];
        list.map((/**
         * @param {?} some
         * @return {?}
         */
        (some) => {
            if (!options) {
                options = this.options;
            }
            /** @type {?} */
            let temp = new FileLikeObject(some);
            if (this._isValidFile(temp, arrayOfFilters, options)) {
                /** @type {?} */
                let fileItem = new FileItem(this, some, options);
                addedFileItems.push(fileItem);
                this.queue.push(fileItem);
                this._onAfterAddingFile(fileItem);
            }
            else {
                /** @type {?} */
                let filter = arrayOfFilters[this._failFilterIndex];
                this._onWhenAddingFileFailed(temp, filter, options);
            }
        }));
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    removeFromQueue(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    }
    /**
     * @return {?}
     */
    clearQueue() {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    uploadItem(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        /** @type {?} */
        let transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        ((/** @type {?} */ (this)))[transport](item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    cancelItem(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        /** @type {?} */
        let prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    }
    /**
     * @return {?}
     */
    uploadAll() {
        /** @type {?} */
        let items = this.getNotUploadedItems().filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.isUploading));
        if (!items.length) {
            return;
        }
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item._prepareToUploading()));
        items[0].upload();
    }
    /**
     * @return {?}
     */
    cancelAll() {
        /** @type {?} */
        let items = this.getNotUploadedItems();
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.cancel()));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFile(value) {
        return isFile(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFileLikeObject(value) {
        return value instanceof FileLikeObject;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getIndexOfItem(value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    }
    /**
     * @return {?}
     */
    getNotUploadedItems() {
        return this.queue.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.isUploaded));
    }
    /**
     * @return {?}
     */
    getReadyItems() {
        return this.queue
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => (item.isReady && !item.isUploading)))
            .sort((/**
         * @param {?} item1
         * @param {?} item2
         * @return {?}
         */
        (item1, item2) => item1.index - item2.index));
    }
    /**
     * @return {?}
     */
    destroy() {
        return void 0;
    }
    /**
     * @param {?} fileItems
     * @return {?}
     */
    onAfterAddingAll(fileItems) {
        return { fileItems };
    }
    /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    onBuildItemForm(fileItem, form) {
        return { fileItem, form };
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onAfterAddingFile(fileItem) {
        return { fileItem };
    }
    /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    onWhenAddingFileFailed(item, filter, options) {
        return { item, filter, options };
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onBeforeUploadItem(fileItem) {
        return { fileItem };
    }
    /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    onProgressItem(fileItem, progress) {
        return { fileItem, progress };
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    onProgressAll(progress) {
        return { progress };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onSuccessItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onErrorItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCancelItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCompleteItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @return {?}
     */
    onCompleteAll() {
        return void 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _mimeTypeFilter(item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _fileSizeFilter(item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _fileTypeFilter(item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onErrorItem(item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCompleteItem(item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        /** @type {?} */
        let nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    }
    /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    _headersGetter(parsedHeaders) {
        return (/**
         * @param {?} name
         * @return {?}
         */
        (name) => {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        });
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _xhrTransport(item) {
        /** @type {?} */
        let that = this;
        /** @type {?} */
        let xhr = item._xhr = new XMLHttpRequest();
        /** @type {?} */
        let sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            /** @type {?} */
            const appendFile = (/**
             * @return {?}
             */
            () => sendable.append(item.alias, item._file, item.file.name));
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => {
                    /** @type {?} */
                    let paramVal = this.options.additionalParameter[key];
                    // Allow an additional parameter to include the filename
                    if (typeof paramVal === 'string' && paramVal.indexOf('{{file_name}}') >= 0) {
                        paramVal = paramVal.replace('{{file_name}}', item.file.name);
                    }
                    sendable.append(key, paramVal);
                }));
            }
            if (this.options.parametersBeforeFiles) {
                appendFile();
            }
        }
        else {
            sendable = this.options.formatDataFunction(item);
        }
        xhr.upload.onprogress = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            this._onProgressItem(item, progress);
        });
        xhr.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            /** @type {?} */
            let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            /** @type {?} */
            let method = '_on' + gist + 'Item';
            ((/** @type {?} */ (this)))[method](item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onerror = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            this._onErrorItem(item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onabort = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            this._onCancelItem(item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            for (let header of this.options.headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (item.headers.length) {
            for (let header of item.headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.onreadystatechange = (/**
         * @return {?}
         */
        function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                that.response.emit(xhr.responseText);
            }
        });
        if (this.options.formatDataFunctionIsAsync) {
            sendable.then((/**
             * @param {?} result
             * @return {?}
             */
            (result) => xhr.send(JSON.stringify(result))));
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    }
    /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    _getTotalProgress(value = 0) {
        if (this.options.removeAfterUpload) {
            return value;
        }
        /** @type {?} */
        let notUploaded = this.getNotUploadedItems().length;
        /** @type {?} */
        let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        /** @type {?} */
        let ratio = 100 / this.queue.length;
        /** @type {?} */
        let current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    }
    /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    _getFilters(filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            /** @type {?} */
            let names = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter((/**
             * @param {?} filter
             * @return {?}
             */
            (filter) => names.indexOf(filter.name) !== -1));
        }
        return this.options.filters;
    }
    /**
     * @protected
     * @return {?}
     */
    _render() {
        return void 0;
    }
    /**
     * @protected
     * @return {?}
     */
    _queueLimitFilter() {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    }
    /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    _isValidFile(file, filters, options) {
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            this._failFilterIndex++;
            return filter.fn.call(this, file, options);
        }));
    }
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    _isSuccessCode(status) {
        return (status >= 200 && status < 300) || status === 304;
    }
    /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    _transformResponse(response, headers) {
        return response;
    }
    /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    _parseHeaders(headers) {
        /** @type {?} */
        let parsed = {};
        /** @type {?} */
        let key;
        /** @type {?} */
        let val;
        /** @type {?} */
        let i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map((/**
         * @param {?} line
         * @return {?}
         */
        (line) => {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }));
        return parsed;
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    _onWhenAddingFileFailed(item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _onAfterAddingFile(item) {
        this.onAfterAddingFile(item);
    }
    /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    _onAfterAddingAll(items) {
        this.onAfterAddingAll(items);
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _onBeforeUploadItem(item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    _onBuildItemForm(item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    _onProgressItem(item, progress) {
        /** @type {?} */
        let total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onSuccessItem(item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCancelItem(item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    }
}
if (false) {
    /** @type {?} */
    FileUploader.prototype.authToken;
    /** @type {?} */
    FileUploader.prototype.isUploading;
    /** @type {?} */
    FileUploader.prototype.queue;
    /** @type {?} */
    FileUploader.prototype.progress;
    /** @type {?} */
    FileUploader.prototype._nextIndex;
    /** @type {?} */
    FileUploader.prototype.autoUpload;
    /** @type {?} */
    FileUploader.prototype.authTokenHeader;
    /** @type {?} */
    FileUploader.prototype.response;
    /** @type {?} */
    FileUploader.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    FileUploader.prototype._failFilterIndex;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileDropDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.fileOver = new EventEmitter();
        this.onFileDrop = new EventEmitter();
        this.element = element;
    }
    /**
     * @return {?}
     */
    getOptions() {
        return this.uploader.options;
    }
    /**
     * @return {?}
     */
    getFilters() {
        return {};
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        /** @type {?} */
        let transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        /** @type {?} */
        let options = this.getOptions();
        /** @type {?} */
        let filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragOver(event) {
        /** @type {?} */
        let transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragLeave(event) {
        if (((/** @type {?} */ (this))).element) {
            if (event.currentTarget === ((/** @type {?} */ (this))).element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    }
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    _getTransfer(event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    }
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    _preventAndStop(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @protected
     * @param {?} types
     * @return {?}
     */
    _haveFiles(types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    }
}
FileDropDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng2FileDrop]' },] }
];
/** @nocollapse */
FileDropDirective.ctorParameters = () => [
    { type: ElementRef }
];
FileDropDirective.propDecorators = {
    uploader: [{ type: Input }],
    fileOver: [{ type: Output }],
    onFileDrop: [{ type: Output }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    FileDropDirective.prototype.uploader;
    /** @type {?} */
    FileDropDirective.prototype.fileOver;
    /** @type {?} */
    FileDropDirective.prototype.onFileDrop;
    /**
     * @type {?}
     * @protected
     */
    FileDropDirective.prototype.element;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileSelectDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.onFileSelected = new EventEmitter();
        this.element = element;
    }
    /**
     * @return {?}
     */
    getOptions() {
        return this.uploader.options;
    }
    /**
     * @return {?}
     */
    getFilters() {
        return {};
    }
    /**
     * @return {?}
     */
    isEmptyAfterSelection() {
        return !!this.element.nativeElement.attributes.multiple;
    }
    /**
     * @return {?}
     */
    onChange() {
        /** @type {?} */
        let files = this.element.nativeElement.files;
        /** @type {?} */
        let options = this.getOptions();
        /** @type {?} */
        let filters = this.getFilters();
        this.uploader.addToQueue(files, options, filters);
        this.onFileSelected.emit(files);
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    }
}
FileSelectDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng2FileSelect]' },] }
];
/** @nocollapse */
FileSelectDirective.ctorParameters = () => [
    { type: ElementRef }
];
FileSelectDirective.propDecorators = {
    uploader: [{ type: Input }],
    onFileSelected: [{ type: Output }],
    onChange: [{ type: HostListener, args: ['change',] }]
};
if (false) {
    /** @type {?} */
    FileSelectDirective.prototype.uploader;
    /** @type {?} */
    FileSelectDirective.prototype.onFileSelected;
    /**
     * @type {?}
     * @protected
     */
    FileSelectDirective.prototype.element;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileUploadModule {
}
FileUploadModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [FileDropDirective, FileSelectDirective],
                exports: [FileDropDirective, FileSelectDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FrontViewDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.isShow = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._$el = $(this._el.nativeElement);
        this._$el.click((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.target.isSameNode(this._el.nativeElement)) {
                this.hide();
            }
        }));
        document.body.appendChild(this._el.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._el.nativeElement.remove();
    }
    /**
     * @return {?}
     */
    show() {
        this.isShow = true;
        this._$el.show();
        this.onShow.emit();
    }
    /**
     * @return {?}
     */
    hide() {
        this.isShow = false;
        this._$el.hide();
        this.onHide.emit();
    }
}
FrontViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appFrontView]',
                exportAs: 'appFrontView'
            },] }
];
/** @nocollapse */
FrontViewDirective.ctorParameters = () => [
    { type: ElementRef }
];
FrontViewDirective.propDecorators = {
    onShow: [{ type: Output }],
    onHide: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    FrontViewDirective.prototype.onShow;
    /** @type {?} */
    FrontViewDirective.prototype.onHide;
    /** @type {?} */
    FrontViewDirective.prototype.isShow;
    /**
     * @type {?}
     * @private
     */
    FrontViewDirective.prototype._$el;
    /** @type {?} */
    FrontViewDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FrontViewComponent {
    constructor() {
        this.onDestroy = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.viewer.show();
    }
    /**
     * @param {?} viewUrl
     * @return {?}
     */
    setViewUrl(viewUrl) {
        this.viewUrl = viewUrl;
        this.iframe.nativeElement.src = viewUrl;
    }
    /**
     * @return {?}
     */
    onHide() {
        this.onDestroy.emit();
    }
}
FrontViewComponent.decorators = [
    { type: Component, args: [{
                template: "<div appFrontView #viewer=\"appFrontView\" (onHide)=\"onHide()\" class=\"front-view\">\n  <div class=\"front-view__container\">\n    <div class=\"front-view__side\">\n      <i (click)=\"viewer.hide()\" class=\"fa fa-times front-view__action\" title=\"Close\"></i>\n    </div>\n    <div class=\"front-view__content\">\n      <iframe #iframe class=\"front-view__iframe\"></iframe>\n    </div>\n  </div>\n</div>",
                styles: [".front-view{position:fixed;top:0;right:0;bottom:0;left:0;z-index:10000;background:rgba(0,0,0,.5);display:none}.front-view__container{position:absolute;background:#fff;top:20px;right:20px;bottom:20px;left:20px;border-radius:4px;border:1px solid rgba(0,0,0,.2);overflow:hidden}.front-view__side{position:absolute;top:0;bottom:0;left:0;width:50px;border-right:1px solid rgba(0,0,0,.2);padding:5px 0}.front-view__action{width:100%;line-height:40px;text-align:center;color:rgba(0,0,0,.5);cursor:pointer}.front-view__action:hover{color:#2067b0}.front-view__content{position:absolute;top:0;right:0;bottom:0;left:50px;overflow:hidden}.front-view__iframe{width:100%;height:100%;border:0}"]
            }] }
];
/** @nocollapse */
FrontViewComponent.ctorParameters = () => [];
FrontViewComponent.propDecorators = {
    onDestroy: [{ type: Output }],
    viewer: [{ type: ViewChild, args: ['viewer',] }],
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};
if (false) {
    /** @type {?} */
    FrontViewComponent.prototype.onDestroy;
    /** @type {?} */
    FrontViewComponent.prototype.viewer;
    /** @type {?} */
    FrontViewComponent.prototype.iframe;
    /** @type {?} */
    FrontViewComponent.prototype.viewUrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FrontViewService {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} injector
     * @param {?} appRef
     */
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    viewInline(url) {
        /** @type {?} */
        let viewerFactory = this.componentFactoryResolver.resolveComponentFactory(FrontViewComponent);
        /** @type {?} */
        let viewerComponentRef = viewerFactory.create(this.injector);
        viewerComponentRef.instance.setViewUrl(url);
        viewerComponentRef.instance.onDestroy.subscribe((/**
         * @return {?}
         */
        () => {
            this.appRef.detachView(viewerComponentRef.hostView);
            viewerComponentRef.destroy();
        }));
        this.appRef.attachView(viewerComponentRef.hostView);
    }
}
FrontViewService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FrontViewService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FrontViewService.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    FrontViewService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    FrontViewService.prototype.appRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FrontViewModule {
}
FrontViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    FrontViewDirective,
                    FrontViewComponent
                ],
                declarations: [
                    FrontViewDirective,
                    FrontViewComponent
                ],
                entryComponents: [
                    FrontViewComponent
                ],
                providers: [FrontViewService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListViewRow {
    /**
     * @param {?} $implicit
     * @param {?=} index
     * @param {?=} count
     */
    constructor($implicit, index = 0, count = 0) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
        this.selected = false;
        this.active = false;
    }
    /**
     * @return {?}
     */
    get first() { return this.index === 0; }
    /**
     * @return {?}
     */
    get last() { return this.index === this.count - 1; }
    /**
     * @return {?}
     */
    get even() { return this.index % 2 === 0; }
    /**
     * @return {?}
     */
    get odd() { return !this.even; }
}
if (false) {
    /** @type {?} */
    ListViewRow.prototype.selected;
    /** @type {?} */
    ListViewRow.prototype.active;
    /** @type {?} */
    ListViewRow.prototype.$implicit;
    /** @type {?} */
    ListViewRow.prototype.index;
    /** @type {?} */
    ListViewRow.prototype.count;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListViewComponent {
    constructor() {
        this.listItems = [];
        this.selectedItems = [];
        this.activeItem = -1;
        this.items = [];
        this.onSelectionChanged = new EventEmitter();
        this.idProperty = 'uuid';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /*
        console.log('[listItems]', this.listItems);
        console.log('[template]', this.template);
        console.log('[toolbar]', this.toolbar);
        */
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const count = this.items.length;
        this.listItems = this.items.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            return new ListViewRow(item, index, count);
        }));
        this.autoSelectItem();
    }
    /**
     * @private
     * @return {?}
     */
    autoSelectItem() {
        if (this.autoSelect && this.listItems.length > 0) {
            this.selectedItems = [];
            this.selectItem(0); //active first item
        }
    }
    /**
     * @return {?}
     */
    requestFocus() {
        this.listBody.nativeElement.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyPress(event) {
        /** @type {?} */
        const keyCode = event.which;
        /** @type {?} */
        let row = this.activeItem < 0 ? {} : this.listItems[this.activeItem];
        row.active = false;
        /** @type {?} */
        const prevActiveItem = this.activeItem;
        switch (keyCode) {
            case 40:
                if (this.activeItem === this.items.length - 1) {
                    this.activeItem = 0;
                    break;
                }
                this.activeItem++;
                break;
            case 38:
            case 9:
                if (this.activeItem === 0) {
                    this.activeItem = this.items.length - 1;
                    break;
                }
                this.activeItem--;
                break;
            case 32:
                this.toggleItem(this.activeItem);
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.activeItem == prevActiveItem) {
            return;
        }
        if (event.altKey) {
            this.updateItemState();
            return;
        }
        //const isSelected = row.selected;
        if (event.shiftKey) {
            row.selected = true;
        }
        else {
            row.selected = false;
            this.selectedItems = [];
        }
        this.selectItem(this.activeItem);
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClick(event, index) {
        if (event.metaKey || event.ctrlKey) {
            this.toggleItem(index);
        }
        else {
            this.selectedItems = [];
            this.selectItem(index);
        }
    }
    /**
     * @return {?}
     */
    updateItemState() {
        this.listItems.forEach((/**
         * @param {?} row
         * @param {?} index
         * @return {?}
         */
        (row, index) => {
            row.selected = this.selectedItems.indexOf(this.items[index]) >= 0;
            row.active = index == this.activeItem;
        }));
        if (this.activeItem >= 0) {
            this.scrollItemIntoView(this.activeItem);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    scrollItemIntoView(index) {
        /** @type {?} */
        const activeItemEl = (/** @type {?} */ (((/** @type {?} */ (this.listBody.nativeElement))).children.item(index)));
        /** @type {?} */
        const scrollTop = this.listBody.nativeElement.scrollTop;
        /** @type {?} */
        const scrollEnd = scrollTop + this.listBody.nativeElement.offsetHeight;
        if (activeItemEl.offsetTop < scrollTop) {
            this.listBody.nativeElement.scrollTop = activeItemEl.offsetTop;
        }
        else if (activeItemEl.offsetTop + activeItemEl.offsetHeight > scrollEnd) {
            this.listBody.nativeElement.scrollTop = activeItemEl.offsetTop + activeItemEl.offsetHeight - this.listBody.nativeElement.offsetHeight;
        }
        else if (activeItemEl.offsetTop > scrollEnd) {
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    toggleItem(index) {
        if (this.selectedItems.indexOf(this.items[index]) >= 0) {
            this.deselectItem(index);
        }
        else {
            this.selectItem(index);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    deselectItem(index) {
        this.selectedItems.splice(this.selectedItems.indexOf(this.items[index]), 1);
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectItem(index) {
        if (this.singleSelect) {
            this.selectedItems = [];
        }
        this.activeItem = index;
        // (<EmbeddedViewRef<ListViewRow>>this._vr.get(index)).rootNodes[0].scrollIntoView(false);
        if (this.selectedItems.indexOf(this.items[index]) < 0) {
            this.selectedItems.push(this.items[index]);
        }
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @return {?}
     */
    selectAll() {
        if (this.singleSelect) {
            this.autoSelectItem();
        }
        else {
            this.selectedItems = this.items.map((/**
             * @param {?} l
             * @return {?}
             */
            l => l));
            this.updateItemState();
        }
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.selectedItems = [];
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    selectById(id) {
        //this.selectedItems = [];
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let index = this.items.findIndex((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj[this.getIdProperty()] == id));
            if (index > -1) {
                this.selectItem(index);
            }
        }), 10);
    }
    /**
     * @return {?}
     */
    getIdProperty() {
        return this.idProperty;
    }
}
ListViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'list-view',
                template: "<div class=\"toolbar\">\n    <ng-template [ngTemplateOutlet]=\"toolbar\"></ng-template>\n</div>\n<div class=\"search-container\">\n    <ng-template [ngTemplateOutlet]=\"search\"></ng-template>\n</div>\n<div #listBody class=\"list-body content\" tabindex=\"0\" (keydown)=\"handleKeyPress($event)\">\n    <i class=\"list-item-body flex-column\" style=\"text-align: center;padding-top: 10px;\" *ngIf=\"listItems?.length < 1\">\n        {{'grid.emptyMsg' | translate}}\n    </i>\n    <a *ngFor=\"let item of listItems; let index = index\" class=\"list-item-body flex-column\"\n       (click)=\"handleClick($event, index)\" [attr.data-index]=\"index\">\n        <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"item\"></ng-template>\n    </a>\n</div>\n<div class=\"footer\">\n    <ng-template [ngTemplateOutlet]=\"footer\"></ng-template>\n</div>"
            }] }
];
/** @nocollapse */
ListViewComponent.ctorParameters = () => [];
ListViewComponent.propDecorators = {
    items: [{ type: Input }],
    onSelectionChanged: [{ type: Output }],
    listBody: [{ type: ViewChild, args: ["listBody",] }],
    toolbar: [{ type: ContentChild, args: ['toolbarTpl',] }],
    template: [{ type: ContentChild, args: ['contentTpl',] }],
    search: [{ type: ContentChild, args: ['searchTpl',] }],
    footer: [{ type: ContentChild, args: ['footerTpl',] }],
    idProperty: [{ type: Input, args: ['idProperty',] }],
    autoSelect: [{ type: Input, args: ['autoSelect',] }],
    singleSelect: [{ type: Input, args: ['singleSelect',] }]
};
if (false) {
    /** @type {?} */
    ListViewComponent.prototype.listItems;
    /** @type {?} */
    ListViewComponent.prototype.selectedItems;
    /** @type {?} */
    ListViewComponent.prototype.activeItem;
    /** @type {?} */
    ListViewComponent.prototype.items;
    /** @type {?} */
    ListViewComponent.prototype.onSelectionChanged;
    /** @type {?} */
    ListViewComponent.prototype.listBody;
    /** @type {?} */
    ListViewComponent.prototype.toolbar;
    /** @type {?} */
    ListViewComponent.prototype.template;
    /** @type {?} */
    ListViewComponent.prototype.search;
    /** @type {?} */
    ListViewComponent.prototype.footer;
    /** @type {?} */
    ListViewComponent.prototype.idProperty;
    /** @type {?} */
    ListViewComponent.prototype.autoSelect;
    /** @type {?} */
    ListViewComponent.prototype.singleSelect;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListViewDirective {
    /**
     * @param {?} _element
     * @param {?} _vr
     * @param {?} _tr
     */
    constructor(_element, _vr, _tr) {
        this._element = _element;
        this._vr = _vr;
        this._tr = _tr;
        this.selectedItems = [];
        this.activeItem = 0;
        this.listOf = [];
        this.onSelectionChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        //console.log('[ListViewDirective]', this._element);
        // document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._vr.clear();
        /** @type {?} */
        const count = this.listOf.length;
        /** @type {?} */
        const rows = this.listOf.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            /** @type {?} */
            const row = { item, index, count };
            /** @type {?} */
            let view = this._vr.createEmbeddedView(this._tr, row);
            // view.rootNodes[0].addEventListener('click', (event) => this.handleClick(event, index));
            return row;
        }));
        // this.updateItemState();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
ListViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[listOf]',
                exportAs: 'listView'
            },] }
];
/** @nocollapse */
ListViewDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: TemplateRef }
];
ListViewDirective.propDecorators = {
    listOf: [{ type: Input }],
    onSelectionChanged: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ListViewDirective.prototype.selectedItems;
    /** @type {?} */
    ListViewDirective.prototype.activeItem;
    /** @type {?} */
    ListViewDirective.prototype.listOf;
    /** @type {?} */
    ListViewDirective.prototype.onSelectionChanged;
    /**
     * @type {?}
     * @private
     */
    ListViewDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    ListViewDirective.prototype._vr;
    /**
     * @type {?}
     * @private
     */
    ListViewDirective.prototype._tr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListViewModule {
}
ListViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule
                ],
                declarations: [ListViewComponent, ListViewDirective],
                exports: [ListViewComponent, ListViewDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OpenGraphService {
    constructor() {
        this.regex = /(https?:\/\/[^\s]+)/;
    }
    /**
     * @param {?} link
     * @param {?} callback
     * @return {?}
     */
    loadPreviewLink(link, callback) {
        if (!link) {
            callback(null, {
                error: 'Link is empty'
            });
            return;
        }
        if (!this.isLink(link)) {
            callback(null, {
                error: 'Link invalid'
            });
            return;
        }
        $.ajax({
            type: 'post',
            url: iNet.getUrl('opengraph/fetch'),
            data: {
                url: link
            },
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                callback(this.convertOpenData(data, link));
            }),
            error: (/**
             * @param {?} xhr
             * @return {?}
             */
            function (xhr) {
                callback(null, xhr);
            })
        });
    }
    /**
     * @param {?} link
     * @return {?}
     */
    isLink(link) {
        return this.regex.test(link);
    }
    /**
     * @param {?} src
     * @param {?} callback
     * @return {?}
     */
    loadImageInfo(src, callback) {
        /** @type {?} */
        let img = new Image();
        img.onload = img.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            let imageInfo = {
                width: img.width,
                height: img.height
            };
            if (imageInfo.width && imageInfo.height) {
                imageInfo.available = true;
                imageInfo.landscape = imageInfo.width / imageInfo.height > 1.1;
            }
            callback(imageInfo);
        });
        img.src = src;
    }
    /**
     * @private
     * @param {?} properties
     * @param {?} url
     * @return {?}
     */
    convertOpenData(properties, url) {
        if (properties.length < 1) {
            return;
        }
        /** @type {?} */
        let openData = (/** @type {?} */ ({}));
        properties.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            openData[item.property] = item.content;
        }));
        if (!openData.url) {
            openData.url = url;
        }
        return openData;
    }
}
OpenGraphService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OpenGraphService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OpenGraphService.prototype.regex;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LinkPreviewComponent {
    /**
     * @param {?} openGraphService
     */
    constructor(openGraphService) {
        this.openGraphService = openGraphService;
        this.removable = true;
        this.onLoad = new EventEmitter();
        this.onDelete = new EventEmitter();
        this._hidden = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.openGraphService.isLink(this.link)) {
            this.loadPreview();
        }
        else if (this.openGraphData) {
            this.loadImageInfo();
        }
        else {
            this.setHidden(true);
        }
    }
    /**
     * @return {?}
     */
    isPreview() {
        return !this.isHidden() && (!!this.link || !!this.openGraphData);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        if (!data || !data.title) {
            return;
        }
        this.openGraphData = data;
        this.loadImageInfo();
        this.setHidden(false);
    }
    /**
     * @return {?}
     */
    getData() {
        return this.openGraphData;
    }
    /**
     * @param {?} link
     * @return {?}
     */
    setLink(link) {
        if (this.link === link) {
            return;
        }
        this.link = link;
        this.loadPreview();
    }
    /**
     * @return {?}
     */
    removePreView() {
        this.onDelete.emit(this);
        this.clearData();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getDomain(url) {
        if (!url) {
            return '';
        }
        /** @type {?} */
        let domain = url.split('/')[2] || '';
        return domain.replace('www.', '');
    }
    /**
     * @return {?}
     */
    clearData() {
        this.link = null;
        this.openGraphData = null;
        this.setHidden(true);
    }
    /**
     * @private
     * @return {?}
     */
    loadPreview() {
        this.setHidden(false);
        if (this.openGraphService.isLink(this.link)) {
            this.openGraphService.loadPreviewLink(this.link, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (data) {
                    this.setData(data);
                }
                else {
                    this.setHidden(true);
                }
            }));
        }
        else {
            this.setHidden(true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    loadImageInfo() {
        if (this.openGraphData && this.openGraphData.image) {
            this.openGraphService.loadImageInfo(this.openGraphData.image, (/**
             * @param {?} imageInfo
             * @return {?}
             */
            (imageInfo) => {
                this.openGraphData.imageInfo = imageInfo;
            }));
        }
    }
    /**
     * @private
     * @param {?} hidden
     * @return {?}
     */
    setHidden(hidden) {
        this._hidden = hidden;
    }
    /**
     * @private
     * @return {?}
     */
    isHidden() {
        return this._hidden;
    }
}
LinkPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-link-preview',
                template: "<div *ngIf=\"!_hidden\" class=\"link-preview\">\n    <div *ngIf=\"!openGraphData; else preview\">\n        <i class=\"fa fa-spinner fa-spin link-preview-spinner\"></i>\n        <div class=\"link-preview-content\">\u0110ang t\u1EA3i ch\u1EBF \u0111\u1ED9 xem tr\u01B0\u1EDBc...</div>\n    </div>\n    <ng-template #preview>\n        <div *ngIf=\"openGraphData?.imageInfo?.available\"\n             [ngClass]=\"openGraphData.imageInfo.landscape ? 'landscape' : 'portrait'\"\n             class=\"link-preview-image\">\n            <img [src]=\"openGraphData.image\">\n        </div>\n        <div class=\"link-preview-content\">\n            <div class=\"link-preview-title\">{{openGraphData.title}}</div>\n            <div class=\"link-preview-text\">{{openGraphData.description}}</div>\n            <div class=\"link-preview-url\">{{getDomain(openGraphData.url)}}</div>\n        </div>\n        <a [href]=\"openGraphData.url\" target=\"_blank\" rel=\"noopener nofollow\" class=\"link-preview-anchor\"></a>\n    </ng-template>\n    <i *ngIf=\"removable\" (click)=\"removePreView()\" class=\"fa fa-times link-preview-remove\"></i>\n</div>",
                styles: [".link-preview{margin-bottom:15px;display:block;overflow:hidden;border:1px solid rgba(0,0,0,.1);position:relative;color:#555}.link-preview-spinner{float:left;width:44px;height:44px;font-size:20px;line-height:44px;text-align:center}.link-preview-anchor{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;opacity:0}.link-preview-remove{position:absolute;top:8px;right:8px;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;z-index:2;cursor:pointer;font-size:14px}.link-preview-remove:hover{background:rgba(0,0,0,.4)}.link-preview-image{overflow:hidden}.link-preview-image.landscape{margin-bottom:5px;border-bottom:1px solid rgba(0,0,0,.1);max-height:250px}.link-preview-image.landscape img{width:100%}.link-preview-image.portrait{float:left;width:160px;height:160px;position:relative}.link-preview-image.portrait img{position:absolute;min-width:100%;min-height:100%;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}.link-preview-content{overflow:hidden;padding:10px 30px 10px 15px}.link-preview-title{color:#333;font-size:18px;line-height:22px}.link-preview-text{overflow:hidden;margin-top:7px;font-size:14px;line-height:18px}.link-preview-url{margin-top:7px;text-transform:uppercase;font-size:12px;color:#888}"]
            }] }
];
/** @nocollapse */
LinkPreviewComponent.ctorParameters = () => [
    { type: OpenGraphService }
];
LinkPreviewComponent.propDecorators = {
    link: [{ type: Input }],
    openGraphData: [{ type: Input }],
    removable: [{ type: Input }],
    onLoad: [{ type: Output }],
    onDelete: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LinkPreviewComponent.prototype.link;
    /** @type {?} */
    LinkPreviewComponent.prototype.openGraphData;
    /** @type {?} */
    LinkPreviewComponent.prototype.removable;
    /** @type {?} */
    LinkPreviewComponent.prototype.onLoad;
    /** @type {?} */
    LinkPreviewComponent.prototype.onDelete;
    /** @type {?} */
    LinkPreviewComponent.prototype._hidden;
    /**
     * @type {?}
     * @private
     */
    LinkPreviewComponent.prototype.openGraphService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function OpenGraphData() { }
if (false) {
    /** @type {?} */
    OpenGraphData.prototype.title;
    /** @type {?} */
    OpenGraphData.prototype.description;
    /** @type {?} */
    OpenGraphData.prototype.image;
    /** @type {?} */
    OpenGraphData.prototype.url;
    /** @type {?|undefined} */
    OpenGraphData.prototype.imageInfo;
}
/**
 * @record
 */
function OpenGraphImageInfo() { }
if (false) {
    /** @type {?} */
    OpenGraphImageInfo.prototype.width;
    /** @type {?} */
    OpenGraphImageInfo.prototype.height;
    /** @type {?|undefined} */
    OpenGraphImageInfo.prototype.landscape;
    /** @type {?|undefined} */
    OpenGraphImageInfo.prototype.available;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OpenGraphModule {
}
OpenGraphModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    LinkPreviewComponent
                ],
                declarations: [
                    LinkPreviewComponent
                ],
                providers: [
                    OpenGraphService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PhotoSwipeOptions() { }
if (false) {
    /** @type {?|undefined} */
    PhotoSwipeOptions.prototype.index;
    /** @type {?|undefined} */
    PhotoSwipeOptions.prototype.clickElement;
    /** @type {?|undefined} */
    PhotoSwipeOptions.prototype.getThumbBoundsFn;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Photo() { }
if (false) {
    /** @type {?} */
    Photo.prototype.src;
    /** @type {?|undefined} */
    Photo.prototype.w;
    /** @type {?|undefined} */
    Photo.prototype.h;
    /** @type {?|undefined} */
    Photo.prototype.sizeDynamic;
    /** @type {?|undefined} */
    Photo.prototype.id;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use PhotoSwipe http://photoswipe.com/documentation/api.html
 */
class PhotoSwipeComponent {
    constructor() {
        this.onDestroy = new EventEmitter();
    }
    /**
     * @param {?} items
     * @param {?=} options
     * @return {?}
     */
    open(items, options) {
        options = options || {
            index: 0 // start at first slide
        };
        if (options.clickElement) {
            options.getThumbBoundsFn = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                /** @type {?} */
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                /** @type {?} */
                let rect = options.clickElement.getBoundingClientRect();
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            });
        }
        // Initializes and opens PhotoSwipe
        this.gallery = new PhotoSwipe$1(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, items, options);
        this.gallery.listen('destroy', (/**
         * @return {?}
         */
        () => {
            this.onDestroy.emit(true);
        }));
        // Dynamic load image
        this.gallery.listen('gettingData', (/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => {
            if (item.sizeDynamic) { // unknown size
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    let img = new Image();
                    img.onload = (/**
                     * @return {?}
                     */
                    () => {
                        item.w = img.width; // set image width
                        item.h = img.height; // set image height
                        this.gallery.invalidateCurrItems(); // re init Items
                        this.gallery.updateSize(true); // re init Items
                    });
                    img.src = item.src; // let's download image
                }), 300);
                delete item.sizeDynamic;
            }
        }));
        this.gallery.init();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.gallery.destroy();
    }
}
PhotoSwipeComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-photoswipe',
                template: "<!-- Root element of PhotoSwipe. Must have class pswp. -->\n<div #photoSwipe class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n\n  <!-- Background of PhotoSwipe.\n       It's a separate element as animating opacity is faster than rgba(). -->\n  <div class=\"pswp__bg\"></div>\n\n  <!-- Slides wrapper with overflow:hidden. -->\n  <div class=\"pswp__scroll-wrap\">\n\n    <!-- Container that holds slides.\n        PhotoSwipe keeps only 3 of them in the DOM to save memory.\n        Don't modify these 3 pswp__item elements, data is added later on. -->\n    <div class=\"pswp__container\">\n      <div class=\"pswp__item\"></div>\n      <div class=\"pswp__item\"></div>\n      <div class=\"pswp__item\"></div>\n    </div>\n\n    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n    <div class=\"pswp__ui pswp__ui--hidden\">\n\n      <div class=\"pswp__top-bar\">\n\n        <!--  Controls are self-explanatory. Order can be changed. -->\n\n        <div class=\"pswp__counter\"></div>\n\n        <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n\n        <!--<button class=\"pswp__button pswp__button&#45;&#45;share\" title=\"Share\"></button>-->\n\n        <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n\n        <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n\n        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\n        <!-- element will get class pswp__preloader--active when preloader is running -->\n        <div class=\"pswp__preloader\">\n          <div class=\"pswp__preloader__icn\">\n            <div class=\"pswp__preloader__cut\">\n              <div class=\"pswp__preloader__donut\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n        <div class=\"pswp__share-tooltip\"></div>\n      </div>\n\n      <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">\n      </button>\n\n      <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">\n      </button>\n\n      <div class=\"pswp__caption\">\n        <div class=\"pswp__caption__center\"></div>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: ["", "/*! PhotoSwipe main CSS by Dmitry Semenov | photoswipe.com | MIT license */.pswp{display:none;position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;touch-action:none;z-index:1500;-webkit-text-size-adjust:100%;-webkit-backface-visibility:hidden;outline:0}.pswp *{box-sizing:border-box}.pswp img{max-width:none}.pswp--animate_opacity{opacity:.001;will-change:opacity;transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--open{display:block}.pswp--zoom-allowed .pswp__img{cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.pswp--zoomed-in .pswp__img{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.pswp--dragging .pswp__img{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.pswp__bg{position:absolute;left:0;top:0;width:100%;height:100%;background:#000;opacity:0;transform:translateZ(0);-webkit-backface-visibility:hidden;will-change:opacity}.pswp__scroll-wrap{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden}.pswp__container,.pswp__zoom-wrap{touch-action:none;position:absolute;left:0;right:0;top:0;bottom:0;-webkit-backface-visibility:hidden}.pswp__container,.pswp__img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}.pswp__zoom-wrap{position:absolute;width:100%;transform-origin:left top;transition:transform 333ms cubic-bezier(.4,0,.22,1)}.pswp__bg{will-change:opacity;transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--animated-in .pswp__bg,.pswp--animated-in .pswp__zoom-wrap{transition:none}.pswp__item{position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden}.pswp__img{position:absolute;width:auto;height:auto;top:0;left:0}.pswp__img--placeholder{-webkit-backface-visibility:hidden}.pswp__img--placeholder--blank{background:#222}.pswp--ie .pswp__img{width:100%!important;height:auto!important;left:0;top:0}.pswp__error-msg{position:absolute;left:0;top:50%;width:100%;text-align:center;font-size:14px;line-height:16px;margin-top:-8px;color:#ccc}.pswp__error-msg a{color:#ccc;text-decoration:underline}", "/*! PhotoSwipe Default UI CSS by Dmitry Semenov | photoswipe.com | MIT license */.pswp__button{position:relative;cursor:pointer;overflow:visible;-webkit-appearance:none;display:block;border:0;padding:0;margin:0;float:right;opacity:.75;transition:opacity .2s;box-shadow:none}.pswp__button:focus,.pswp__button:hover{opacity:1}.pswp__button:active{outline:0;opacity:.9}.pswp__button::-moz-focus-inner{padding:0;border:0}.pswp__ui--over-close .pswp__button--close{opacity:1}.pswp__button,.pswp__button--arrow--left:before,.pswp__button--arrow--right:before{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABYCAQAAACjBqE3AAAB6klEQVR4Ae3bsWpUQRTG8YkkanwCa7GzVotsI/gEgk9h4Vu4ySLYmMYgbJrc3lrwZbJwC0FMt4j7F6Y4oIZrsXtgxvx/1c0ufEX4cnbmLCmSJEmSJEmSJEmSJP3XCBPvbJU+8doWmDFwyZpLBmYlNJebz0KwzykwsuSYJSNwykEJreV2BaBMaLIQZ2xYcFgqDlmw4ayE/FwL0dDk4Qh4W37DAjgqIT+3HRbigjH+iikVdxgZStgyN0Su2sXIeTwTT+esdpcbIlfNAuZ/TxresG4zV8kYWSZNiKUTokMMSWeIwTNEn4fK2TW3gRNgVkJLuVksROA9G+bEvoATNlBCa7nZXEwdxEZxzpKRKFh+bsv8LmPFmhX1OwfIz81jIRJQ5eeqG9B+riRJkiRJkiRJkiRJkiRJkiRJUkvA/8RQoEpKlJWINFkJ62AlrEP/mNBibnv2yz/A3t7Uq3LcpoxP8COjC1T5vxoAD5VdoEqdDrd5QuW1swtUSaueh3zkiuBiqgtA2OlkeMcP/uDqugsJdbjHF65VdPMKwS0+WQc/MgKvrIOHysB9vgPwk8+85hmPbnQdvHZyDMAFD7L3EOpgMcVdvnHFS0/vlatrXvCVx0U9gt3fxvnA0/hB4nmRJEmSJEmSJEmSJGmHfgFLaDPoMu5xWwAAAABJRU5ErkJggg==) 0 0/264px 88px no-repeat;width:44px;height:44px}/*!* Serve SVG sprite if browser supports SVG and resolution is more than 105dpi *!*/.pswp__button--close{background-position:0 -44px}.pswp__button--share{background-position:-44px -44px}.pswp__button--fs{display:none}.pswp--supports-fs .pswp__button--fs{display:block}.pswp--fs .pswp__button--fs{background-position:-44px 0}.pswp__button--zoom{display:none;background-position:-88px 0}.pswp--zoom-allowed .pswp__button--zoom{display:block}.pswp--zoomed-in .pswp__button--zoom{background-position:-132px 0}.pswp--touch .pswp__button--arrow--left,.pswp--touch .pswp__button--arrow--right{visibility:hidden}.pswp__button--arrow--left,.pswp__button--arrow--right{background:0 0;top:50%;margin-top:-50px;width:70px;height:100px;position:absolute}.pswp__button--arrow--left{left:0}.pswp__button--arrow--right{right:0}.pswp__button--arrow--left:before,.pswp__button--arrow--right:before{content:'';top:35px;background-color:rgba(0,0,0,.3);height:30px;width:32px;position:absolute}.pswp__button--arrow--left:before{left:6px;background-position:-138px -44px}.pswp__button--arrow--right:before{right:6px;background-position:-94px -44px}.pswp__counter,.pswp__share-modal{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pswp__share-modal{display:block;background:rgba(0,0,0,.5);width:100%;height:100%;top:0;left:0;padding:10px;position:absolute;z-index:1600;opacity:0;transition:opacity .25s ease-out;-webkit-backface-visibility:hidden;will-change:opacity}.pswp__share-modal--hidden{display:none}.pswp__share-tooltip{z-index:1620;position:absolute;background:#fff;top:56px;border-radius:2px;display:block;width:auto;right:44px;box-shadow:0 2px 5px rgba(0,0,0,.25);transform:translateY(6px);transition:transform .25s;-webkit-backface-visibility:hidden;will-change:transform}.pswp__share-tooltip a{display:block;padding:8px 12px;color:#000;text-decoration:none;font-size:14px;line-height:18px}.pswp__share-tooltip a:hover{text-decoration:none;color:#000}.pswp__share-tooltip a:first-child{border-radius:2px 2px 0 0}.pswp__share-tooltip a:last-child{border-radius:0 0 2px 2px}.pswp__share-modal--fade-in{opacity:1}.pswp__share-modal--fade-in .pswp__share-tooltip{transform:translateY(0)}.pswp--touch .pswp__share-tooltip a{padding:16px 12px}a.pswp__share--facebook:before{content:'';display:block;width:0;height:0;position:absolute;top:-12px;right:15px;border:6px solid transparent;border-bottom-color:#fff;-webkit-pointer-events:none;-moz-pointer-events:none;pointer-events:none}a.pswp__share--facebook:hover{background:#3e5c9a;color:#fff}a.pswp__share--facebook:hover:before{border-bottom-color:#3e5c9a}a.pswp__share--twitter:hover{background:#55acee;color:#fff}a.pswp__share--pinterest:hover{background:#ccc;color:#ce272d}a.pswp__share--download:hover{background:#ddd}.pswp__counter{position:absolute;left:0;top:0;height:44px;font-size:13px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.pswp__caption{position:absolute;left:0;bottom:0;width:100%;min-height:44px}.pswp__caption small{font-size:11px;color:#bbb}.pswp__caption__center{text-align:left;max-width:420px;margin:0 auto;font-size:13px;padding:10px;line-height:20px;color:#ccc}.pswp__caption--empty{display:none}.pswp__caption--fake{visibility:hidden}.pswp__preloader{width:44px;height:44px;position:absolute;top:0;left:50%;margin-left:-22px;opacity:0;transition:opacity .25s ease-out;will-change:opacity;direction:ltr}.pswp__preloader__icn{width:20px;height:20px;margin:12px}.pswp__preloader--active{opacity:1}.pswp__preloader--active .pswp__preloader__icn{background:url(data:image/gif;base64,R0lGODlhFAAUAPMIAIeHhz8/P1dXVycnJ8/Pz7e3t5+fn29vb////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAIACwAAAAAFAAUAEAEUxDJSatFxtwaggWAdIyHJAhXoRYSQUhDPGx0TbmujahbXGWZWqdDAYEsp5NupLPkdDwE7oXwWVasimzWrAE1tKFHErQRK8eL8mMUlRBJVI307uoiACH5BAUHAAgALAEAAQASABIAAAROEMkpS6E4W5upMdUmEQT2feFIltMJYivbvhnZ3R0A4NMwIDodz+cL7nDEn5CH8DGZh8MtEMBEoxkqlXKVIgQCibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpjaE4W5spANUmFQX2feFIltMJYivbvhnZ3d1x4BNBIDodz+cL7nDEn5CH8DGZAsFtMMBEoxkqlXKVIgIBibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpAaA4W5vpOdUmGQb2feFIltMJYivbvhnZ3Z0g4FNRIDodz+cL7nDEn5CH8DGZgcCNQMBEoxkqlXKVIgYDibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpz6E4W5upENUmAQD2feFIltMJYivbvhnZ3V0Q4JNhIDodz+cL7nDEn5CH8DGZg8GtUMBEoxkqlXKVIggEibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkphaA4W5tpCNUmHQf2feFIltMJYivbvhnZ3d0w4BMAIDodz+cL7nDEn5CH8DGZBMLNYMBEoxkqlXKVIgoFibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpQ6A4W5vpGNUmCQL2feFIltMJYivbvhnZ3R1B4NNxIDodz+cL7nDEn5CH8DGZhcINAMBEoxkqlXKVIgwGibbK9YLBYvLtHH5K0J0IACH5BAUHAAcALAEAAQASABIAAANCeLo6wzA6FxkhbaoQ4L3ZxnXLh0EjWZ4RV71VUcCLIByyTNt2PsO8m452sBGJBsNxkUwuD03lAQBASqnUJ7aq5UYSADs=) no-repeat}.pswp--css_animation .pswp__preloader--active{opacity:1}.pswp--css_animation .pswp__preloader--active .pswp__preloader__icn{-webkit-animation:.5s linear infinite clockwise;animation:.5s linear infinite clockwise}.pswp--css_animation .pswp__preloader--active .pswp__preloader__donut{-webkit-animation:1s cubic-bezier(.4,0,.22,1) infinite donut-rotate;animation:1s cubic-bezier(.4,0,.22,1) infinite donut-rotate}.pswp--css_animation .pswp__preloader__icn{background:0 0;opacity:.75;width:14px;height:14px;position:absolute;left:15px;top:15px;margin:0}.pswp--css_animation .pswp__preloader__cut{position:relative;width:7px;height:14px;overflow:hidden}.pswp--css_animation .pswp__preloader__donut{box-sizing:border-box;width:14px;height:14px;border:2px solid #fff;border-radius:50%;border-left-color:transparent;border-bottom-color:transparent;position:absolute;top:0;left:0;background:0 0;margin:0}@media screen and (max-width:1024px){.pswp__preloader{position:relative;left:auto;top:auto;margin:0;float:right}}@-webkit-keyframes clockwise{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes clockwise{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes donut-rotate{0%,100%{transform:rotate(0)}50%{transform:rotate(-140deg)}}@keyframes donut-rotate{0%,100%{transform:rotate(0)}50%{transform:rotate(-140deg)}}.pswp__ui{-webkit-font-smoothing:auto;visibility:visible;opacity:1;z-index:1550}.pswp__top-bar{position:absolute;left:0;top:0;height:44px;width:100%}.pswp--has_mouse .pswp__button--arrow--left,.pswp--has_mouse .pswp__button--arrow--right,.pswp__caption,.pswp__top-bar{-webkit-backface-visibility:hidden;will-change:opacity;transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--has_mouse .pswp__button--arrow--left,.pswp--has_mouse .pswp__button--arrow--right{visibility:visible}.pswp__caption,.pswp__top-bar{background-color:rgba(0,0,0,.5)}.pswp__ui--fit .pswp__caption,.pswp__ui--fit .pswp__top-bar{background-color:rgba(0,0,0,.3)}.pswp__ui--idle .pswp__button--arrow--left,.pswp__ui--idle .pswp__button--arrow--right,.pswp__ui--idle .pswp__top-bar{opacity:0}.pswp__ui--hidden .pswp__button--arrow--left,.pswp__ui--hidden .pswp__button--arrow--right,.pswp__ui--hidden .pswp__caption,.pswp__ui--hidden .pswp__top-bar{opacity:.001}.pswp__ui--one-slide .pswp__button--arrow--left,.pswp__ui--one-slide .pswp__button--arrow--right,.pswp__ui--one-slide .pswp__counter{display:none}.pswp__element--disabled{display:none!important}.pswp--minimal--dark .pswp__top-bar{background:0 0}"]
            }] }
];
/** @nocollapse */
PhotoSwipeComponent.ctorParameters = () => [];
PhotoSwipeComponent.propDecorators = {
    onDestroy: [{ type: Output }],
    photoSwipe: [{ type: ViewChild, args: ['photoSwipe',] }]
};
if (false) {
    /** @type {?} */
    PhotoSwipeComponent.prototype.onDestroy;
    /** @type {?} */
    PhotoSwipeComponent.prototype.photoSwipe;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipeComponent.prototype.gallery;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PhotoSwipe {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} injector
     * @param {?} appRef
     * @param {?} router
     */
    constructor(componentFactoryResolver, injector, appRef, router) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.router = router;
    }
    /**
     * @param {?} items
     * @param {?=} options
     * @param {?=} container
     * @return {?}
     */
    open(items, options, container) {
        if (!items || items.length < 1) {
            return;
        }
        /** @type {?} */
        const containerEl = container && container.nativeElement || document.body;
        if (!this.photoSwipeFactory) {
            this.photoSwipeFactory = this.componentFactoryResolver.resolveComponentFactory(PhotoSwipeComponent);
        }
        this.photoSwipeComponentRef = this.photoSwipeFactory.create(this.injector);
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.photoSwipeComponentRef.hostView);
        // Append DOM element
        containerEl.appendChild(this.photoSwipeComponentRef.hostView['rootNodes'][0]);
        this.photoSwipeComponentRef.instance.open(items, options);
        this.photoSwipeComponentRef.instance.onDestroy.subscribe((/**
         * @return {?}
         */
        () => {
            // Remove
            this.appRef.detachView(this.photoSwipeComponentRef.hostView);
            this.photoSwipeComponentRef.destroy();
            this.photoSwipeComponentRef = null;
            this.routerSubscribe.unsubscribe();
            this.routerSubscribe = null;
        }));
        this.subscribeRouterChange();
    }
    /**
     * @private
     * @return {?}
     */
    subscribeRouterChange() {
        this.routerSubscribe = this.router.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.closeOpening();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    closeOpening() {
        if (this.photoSwipeComponentRef) {
            this.photoSwipeComponentRef.instance.destroy();
        }
    }
}
PhotoSwipe.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PhotoSwipe.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: Router }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.photoSwipeFactory;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.photoSwipeComponentRef;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.routerSubscribe;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipe.prototype.router;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PhotoSwipeModule {
}
PhotoSwipeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    PhotoSwipeComponent
                ],
                entryComponents: [PhotoSwipeComponent],
                providers: [PhotoSwipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalSelectComponent {
    /**
     * @param {?} coreService
     * @param {?} modalService
     */
    constructor(coreService, modalService) {
        this.coreService = coreService;
        this.modalService = modalService;
        this.selectUsers = [];
        this.users = [];
    }
    /**
     * @return {?}
     */
    setDefault() {
        this.selectUsers = [];
    }
    /**
     * @return {?}
     */
    searchUser() {
        clearTimeout(this.timer);
        /** @type {?} */
        let value = this.key || '';
        this.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            this.coreService.searchFirmAccount({ keyword: value, pageSize: 10 }, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let users = data && data['items'] || [];
                this.setUsers(users);
            }));
        }), 300);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addUser(item) {
        if (this.isSingle) {
            if (this.selectUsers[0]) {
                this.users.push(this.selectUsers[0]);
            }
            this.selectUsers[0] = item;
        }
        else {
            for (let i = 0; i < this.selectUsers.length; i++) {
                if (this.selectUsers[i].username === item.username) {
                    return;
                }
            }
            this.selectUsers.push(item);
        }
        this.setUsers(this.users);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeUser(item) {
        for (let i = 0; i < this.selectUsers.length; i++) {
            if (this.selectUsers[i].username === item.username) {
                this.users.push(item);
                this.selectUsers.splice(i, 1);
                return;
            }
        }
    }
    /**
     * @return {?}
     */
    show() {
        this.searchUser();
        this.modalRef = this.modalService.show(this.selectModal);
    }
    /**
     * @return {?}
     */
    hide() {
        this.modalRef.hide();
    }
    /**
     * @private
     * @param {?} user
     * @return {?}
     */
    hasUser(user) {
        for (let item of this.selectUsers) {
            if (item.username === user.username) {
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    setUsers(users) {
        this.users = users.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !this.hasUser(item)));
    }
}
ModalSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-modal-select',
                template: "<ng-template #selectModal>\n    <div class=\"modal-header border-0\">\n        <h5 class=\"modal-title pull-left\"><i class=\"fa fa-users\"></i> Ch\u1ECDn ng\u01B0\u1EDDi d\u00F9ng </h5>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body p-0 font-size\">\n        <div class=\"col-sm-12 border-bottom\">\n            <div class=\"input-group input-group-sm\" style=\"padding-bottom: 10px;\">\n                <input (input)=\"searchUser()\"\n                       [(ngModel)]=\"key\" type=\"text\" class=\"form-control\" placeholder=\"T\u00ECm ki\u1EBFm\">\n                <div class=\"input-group-append\">\n                    <span class=\"input-group-text\" (click)=\"searchUser()\">\n                        <i class=\"fa fa-search\"></i>\n                    </span>\n                </div>\n            </div>\n        </div>\n        <nav class=\"nav nav-tabs\">\n            <span class=\"nav-item nav-link active rounded-0\" href=\"#nav-book\" data-toggle=\"tab\"  role=\"tab\">\n                <i class=\"fa fa-group\"></i> T\u1EA5t c\u1EA3\n            </span>\n            <span class=\"nav-item nav-link rounded-0\" href=\"#nav-book-select\" data-toggle=\"tab\" role=\"tab\">\n                <i class=\"fa fa-check-circle\"></i> \u0110\u00E3 ch\u1ECDn\n                <span [hidden]=\"selectUsers?.length<1\" class=\"ml-1 badge badge-primary rounded-circle\">{{ selectUsers?.length }}</span>\n            </span>\n        </nav>\n        <div class=\"tab-content\">\n            <div id=\"nav-book\" class=\"tab-pane fade active show\" role=\"tabpanel\" aria-labelledby=\"nav-home-tab\" aria-expanded=\"true\">\n                <ul class=\"list-group rounded-0\"\n                    [ngClass]=\"{'p-3':users?.length > 0}\">\n                    <li *ngFor=\"let user of users\"\n                        (click)=\"addUser(user)\"\n                        class=\"list-group-item rounded-0\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <img userAvatar [usercode]=\"user?.username\" class=\"rounded-circle\">\n                            </div>\n                            <div class=\"col-sm-10\">\n                                <span class=\"name\">{{user.fullname}}</span>\n                                <br>\n                                <span class=\"email text-muted\"><i class=\"fa fa-envelope\"></i>&nbsp;{{user.username}}</span>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </li>\n                    <li *ngIf=\"users?.length<1\" class=\"list-group-item rounded-0 border-0\">\n                        <i>Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EEF li\u1EC7u</i>\n                    </li>\n                </ul>\n            </div>\n            <div id=\"nav-book-select\"\n                 class=\"tab-pane fade\" role=\"tabpanel\" aria-labelledby=\"nav-profile-tab\" aria-expanded=\"false\">\n                <ul class=\"list-group rounded-0\"\n                    [ngClass]=\"{'p-3':selectUsers?.length > 0}\">\n                    <li *ngFor=\"let user of selectUsers\"\n                        (click)=\"removeUser(user)\"\n                        class=\"list-group-item rounded-0 selected\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <img userAvatar [usercode]=\"user?.username\" class=\"rounded-circle\">\n                            </div>\n                            <div class=\"col-sm-10\">\n                                <span class=\"name\">{{user.fullname}}</span>\n                                <br>\n                                <span class=\"email\"><i class=\"fa fa-envelope\"></i>&nbsp;{{user.username}}</span>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </li>\n                    <li *ngIf=\"selectUsers?.length<1\" class=\"list-group-item rounded-0 border-0\">\n                        <i>Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EEF li\u1EC7u</i>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"hide()\"><i class=\"fa fa-remove\"></i> \u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                styles: [".tab-content{height:391px;overflow-x:hidden}.font-size{font-size:13px}.nav-tabs .nav-link.active{border-top:2px solid #4c8fbd!important;background:#fff}.nav-tabs .nav-link{background-color:#f9f9f9;color:#6b6b6b;cursor:pointer;border-bottom:1px solid #e9ecef}.list-group-item .name{font-weight:700}.list-group-item .email{white-space:nowrap}.list-group-item:hover{background-color:#f5f5f5;cursor:pointer}.list-group-item img{max-width:50px!important;height:50px;width:50px;padding:1px;border:1px solid #ebebeb;background-size:cover;background-repeat:no-repeat;background-position:center;content:\"\";display:block}.list-group-item.selected{background-color:#63abf7!important;border:1px solid #779!important;color:#fff}"]
            }] }
];
/** @nocollapse */
ModalSelectComponent.ctorParameters = () => [
    { type: CoreService },
    { type: BsModalService$1 }
];
ModalSelectComponent.propDecorators = {
    selectUsers: [{ type: Input, args: ['selectUsers',] }],
    isSingle: [{ type: Input, args: ['isSingle',] }],
    selectModal: [{ type: ViewChild, args: ['selectModal',] }]
};
if (false) {
    /** @type {?} */
    ModalSelectComponent.prototype.selectUsers;
    /** @type {?} */
    ModalSelectComponent.prototype.isSingle;
    /** @type {?} */
    ModalSelectComponent.prototype.selectModal;
    /** @type {?} */
    ModalSelectComponent.prototype.modalRef;
    /** @type {?} */
    ModalSelectComponent.prototype.users;
    /** @type {?} */
    ModalSelectComponent.prototype.key;
    /**
     * @type {?}
     * @private
     */
    ModalSelectComponent.prototype.timer;
    /**
     * @type {?}
     * @private
     */
    ModalSelectComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    ModalSelectComponent.prototype.modalService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectUserComponent {
    /**
     * @param {?} coreService
     */
    constructor(coreService) {
        this.coreService = coreService;
        this.id = iNet.generateId();
        this.selectUsers = [];
        this.onAdd = new EventEmitter();
        this.isMouseEnter = false;
        this.isFocus = false;
        this.users = [];
    }
    /**
     * @return {?}
     */
    valid() {
        return this.isValid && this.selectUsers.length > 0;
    }
    /**
     * @return {?}
     */
    clearValid() {
        this.isFocus = false;
    }
    /**
     * @return {?}
     */
    validInput() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.valid()) {
                this.isFocus = false;
            }
            else {
                this.isFocus = true;
            }
        }), 250);
    }
    /**
     * @return {?}
     */
    searchUser() {
        clearTimeout(this.timer);
        this.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let value = this.getKeyword();
            if (value === this.searchValue) {
                return;
            }
            if (!value) {
                this.users.length = 0;
                this.searchValue = value;
                return;
            }
            this.coreService.searchFirmAccount({ keyword: value, pageSize: 10 }, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let users = data && data['items'] || [];
                this.setUser(users);
            }));
        }), 300);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeUser(item) {
        for (let i = 0; i < this.selectUsers.length; i++) {
            if (this.selectUsers[i].username === item.username) {
                this.selectUsers.splice(i, 1);
                this.validInput();
                this.onAdd.emit(item);
                return;
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    setDefault() {
        this.inputUser.nativeElement.value = '';
        this.searchValue = '';
        this.users = [];
        this.selectUsers = [];
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addUser(item) {
        if (this.isSingle) {
            this.selectUsers[0] = item;
        }
        else {
            for (let selectMember of this.selectUsers) {
                if (selectMember.username === item.username) {
                    return;
                }
            }
            this.selectUsers.push(item);
        }
        this.inputUser.nativeElement.value = '';
        this.searchValue = '';
        this.focusInput();
        this.validInput();
    }
    /**
     * @param {?} e
     * @param {?} el
     * @return {?}
     */
    clickUser(e, el) {
        if (e.target.isSameNode(el)) {
            this.focusInput();
        }
    }
    /**
     * @return {?}
     */
    removeLastUser() {
        this.selectUsers.splice(-1);
    }
    /**
     * @return {?}
     */
    openModal() {
        this.modalSelect.show();
    }
    /**
     * @private
     * @param {?} user
     * @return {?}
     */
    hasUser(user) {
        for (let selectMember of this.selectUsers) {
            if (selectMember.username === user.username) {
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    setUser(users) {
        this.users = users.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !this.hasUser(item)));
    }
    /**
     * @private
     * @return {?}
     */
    focusInput() {
        this.inputUser.nativeElement.focus();
    }
    /**
     * @private
     * @return {?}
     */
    getKeyword() {
        return this.inputUser.nativeElement.value.trim();
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.isMouseEnter = true;
    }
    /**
     * @return {?}
     */
    onMouseDown() {
        this.isMouseEnter = false;
    }
}
SelectUserComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-select-user',
                template: "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"border select-multiple-content\"\n             #shareUserContainer\n             (click)=\"clickUser($event, shareUserContainer)\"\n             [ngClass]=\"{'select-valid': isValid && isFocus && selectUsers?.length < 1}\"\n             (mouseenter)=\"onMouseEnter()\"\n             (mouseleave)=\"onMouseDown()\">\n            <span *ngIf=\"isValid && isFocus && isMouseEnter && selectUsers?.length < 1\" class=\"select-tooltip\">\n                B\u1EA1n c\u1EA7n ch\u1ECDn \u00EDt nh\u1EA5t m\u1ED9t ng\u01B0\u1EDDi.\n            </span>\n            <span *ngFor=\"let user of selectUsers\" class=\"select-multiple-item border\">\n                <img userAvatar [usercode]=\"user?.username\" width=\"28\" height=\"28\">\n                <span>{{user.fullname}}</span>\n                <span (click)=\"removeUser(user)\" class=\"badge badge-muted text-muted rounded-circle m-1\">\n                    <i class=\"fa fa-times\" style=\"cursor: pointer;\"></i>\n                </span>\n            </span>\n            <span class=\"autocomplete-container\">\n                <input type=\"text\" class=\"auto-tag-input\" style=\"width: 80px !important;\"\n                       #inputUser\n                       appAutocompleteInput\n                       [autoList]=\"autoList\"\n                       (input)=\"searchUser()\"\n                       (onBackSpaceRemove)=\"removeLastUser()\"\n                       (blur)=\"validInput()\">\n            </span>\n        </div>\n        <ul class=\"list-group autocomplete-list\"\n            appAutocompleteList\n            #autoList=\"appAutocompleteList\">\n            <li *ngFor=\"let item of users\" (click)=\"addUser(item)\" class=\"list-group-item auto-item-image rounded-0\">\n                <img userAvatar [usercode]=\"item?.username\">\n                <div>{{item.fullname}}</div>\n            </li>\n        </ul>\n        <i (click)=\"openModal()\" class=\"icon-user\" style=\"position: absolute;top: 0;right: 10px;padding: 16px;cursor: pointer;\"></i>\n    </div>\n    <app-modal-select\n        [selectUsers]=\"selectUsers\"\n        [isSingle]=\"isSingle\">\n    </app-modal-select>\n</div>",
                styles: [".autocomplete-container{position:relative}.autocomplete-list{display:none;position:absolute;left:0;right:0;z-index:1;overflow:auto;max-height:500px}.autocomplete-list>li{padding:10px;cursor:pointer;border-width:0 1px}.autocomplete-list>li:first-child{border-top-width:1px}.autocomplete-list>li:last-child{border-bottom-width:1px}.auto-item-image i,.auto-item-image img{float:left;width:30px;height:30px;margin-right:10px}.auto-item-image i{text-align:center;line-height:30px;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.auto-item-image div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.auto-tag{padding:2px 7px 7px;min-height:38px;height:auto}.auto-tag-input{border:0;padding:0;margin-top:5px;height:24px;line-height:22px}.auto-tag-input:focus{outline:0}.auto-tag-item{font-size:14px;line-height:24px;margin-right:5px;margin-top:5px;padding:0 5px;float:left;background:#e9ebee;border:1px solid rgba(0,0,0,.2);border-radius:2px}.auto-tag-item i{float:right;margin-right:-5px;height:24px;width:24px;line-height:24px;text-align:center;cursor:pointer}", ".select-multiple-content{width:100%;min-height:46px;padding:3px}.select-multiple-item{color:#343434;background:#e0e0e0;margin:4px;display:inline-block;font-size:.875em}.list-group-item img{height:34px!important;width:34px!important}.badge-muted{color:#e0e0e0!important;background:#9e9e9e}.auto-tag-input{margin-top:0!important;height:37px!important}.auto-item-image>img{margin-top:-5px}.autocomplete-list{padding:0 15px;overflow:hidden}.select-valid{border:1px solid red!important}.select-tooltip{position:absolute;bottom:150%;margin-bottom:-15px;padding:7px;width:50%;left:25%;border-radius:3px;background-color:#dc3545;color:#fff;content:attr(data-tooltip);text-align:center;font-size:14px;line-height:1.2}"]
            }] }
];
/** @nocollapse */
SelectUserComponent.ctorParameters = () => [
    { type: CoreService }
];
SelectUserComponent.propDecorators = {
    id: [{ type: Input, args: ['id',] }],
    selectUsers: [{ type: Input, args: ['selectUsers',] }],
    isSingle: [{ type: Input, args: ['isSingle',] }],
    isValid: [{ type: Input, args: ['isValid',] }],
    onAdd: [{ type: Output }],
    modalSelect: [{ type: ViewChild, args: [ModalSelectComponent,] }],
    inputUser: [{ type: ViewChild, args: ['inputUser',] }]
};
if (false) {
    /** @type {?} */
    SelectUserComponent.prototype.id;
    /** @type {?} */
    SelectUserComponent.prototype.selectUsers;
    /** @type {?} */
    SelectUserComponent.prototype.isSingle;
    /** @type {?} */
    SelectUserComponent.prototype.isValid;
    /** @type {?} */
    SelectUserComponent.prototype.onAdd;
    /** @type {?} */
    SelectUserComponent.prototype.modalSelect;
    /** @type {?} */
    SelectUserComponent.prototype.inputUser;
    /** @type {?} */
    SelectUserComponent.prototype.isMouseEnter;
    /** @type {?} */
    SelectUserComponent.prototype.isFocus;
    /** @type {?} */
    SelectUserComponent.prototype.users;
    /**
     * @type {?}
     * @private
     */
    SelectUserComponent.prototype.timer;
    /**
     * @type {?}
     * @private
     */
    SelectUserComponent.prototype.searchValue;
    /**
     * @type {?}
     * @private
     */
    SelectUserComponent.prototype.coreService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectUserModule {
}
SelectUserModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    CoreModule,
                    AutocompleteModule,
                    ModalModule.forRoot()
                ],
                declarations: [SelectUserComponent, ModalSelectComponent],
                exports: [SelectUserComponent, ModalSelectComponent],
                providers: [BsModalService$1]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StickyBar {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.topSpace = 5;
        this.bottomSpace = 5;
        this.onScroll = this.onScroll.bind(this);
        this.init(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    init(options) {
        for (const k in options) {
            this[k] = options[k];
        }
        if (!this.bar) {
            console.error('[StickyBar] Missing scroller or bar element');
            return;
        }
        this.container = this.bar.parentElement;
        this.temp = document.createElement('div');
        this.temp.style.cssText = 'position: relative; overflow: hidden';
        this.container.insertBefore(this.temp, this.bar);
        // this.temp.appendChild(this.bar);
        this.sensor = new ResizeSensor(this.temp, (/**
         * @return {?}
         */
        () => {
            if (this.preventResize) {
                this.preventResize = false;
                return;
            }
            if (!this.isFixed()) {
                return;
            }
            this.clearFixed();
            this.onScroll();
        }));
        (this.scroller || window).addEventListener('scroll', this.onScroll);
    }
    /**
     * @return {?}
     */
    onScroll() {
        /** @type {?} */
        let scrollerBounding;
        if (this.scroller) {
            scrollerBounding = this.scroller.getBoundingClientRect();
            scrollerBounding['scrollHeight'] = this.scroller.scrollHeight;
            scrollerBounding['scrollTop'] = this.scroller.scrollTop;
        }
        else {
            scrollerBounding = {
                scrollHeight: document.documentElement.scrollHeight,
                scrollTop: pageYOffset || scrollY,
                top: 0,
                height: innerHeight
            };
        }
        /** @type {?} */
        const barBounding = this.bar.getBoundingClientRect();
        /** @type {?} */
        const staticBounding = this.temp.getBoundingClientRect();
        /** @type {?} */
        const isCanScrollFixed = scrollerBounding.scrollHeight >
            scrollerBounding.scrollTop + staticBounding.top + barBounding.height + 50;
        if (!isCanScrollFixed) {
            if (this.isFixed()) {
                this.clearFixed();
            }
            return;
        }
        /** @type {?} */
        const barTop = this.isFixed() ? staticBounding.top : barBounding.top;
        /** @type {?} */
        const barAboveTop = barTop - this.topSpace <= scrollerBounding.top;
        /** @type {?} */
        const barAboveBottom = barTop + barBounding.height + this.bottomSpace <= scrollerBounding.top + scrollerBounding.height;
        if (barAboveTop && barAboveBottom) {
            if (!this.isFixed()) {
                /** @type {?} */
                let topFixed = scrollerBounding.top + this.topSpace;
                // content fixed's height greater than scroller's height
                /** @type {?} */
                const distance = barBounding.height + this.bottomSpace + this.topSpace - scrollerBounding.height;
                if (distance > 0) {
                    topFixed -= distance;
                }
                this.preventResize = true;
                this.resizeDimension();
                this.setCssBar({
                    top: topFixed + 'px',
                    position: 'fixed'
                });
                this.setFixed(true);
            }
        }
        else if (this.isFixed()) {
            /** @type {?} */
            const barAboveTopStatic = barTop <= scrollerBounding.top;
            /** @type {?} */
            const barAboveBottomStatic = barTop + barBounding.height <= scrollerBounding.top + scrollerBounding.height;
            if (barAboveTopStatic && barAboveBottomStatic) {
                return;
            }
            this.clearFixed();
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.sensor) {
            (this.scroller || window).removeEventListener('scroll', this.onScroll);
            this.resetBarCss();
            this.sensor.detach();
            this.temp.remove();
            Object.keys(this).forEach((/**
             * @param {?} k
             * @return {?}
             */
            k => delete this[k]));
        }
    }
    /**
     * @private
     * @return {?}
     */
    resizeDimension() {
        this.bar.style.width = this.temp.clientWidth + 'px';
        this.temp.style.height = this.getHeightBar() + 'px';
    }
    /**
     * @private
     * @return {?}
     */
    getHeightBar() {
        return parseFloat(getComputedStyle(this.bar).height);
    }
    /**
     * @private
     * @param {?} fixed
     * @return {?}
     */
    setFixed(fixed) {
        this.fixed = fixed;
    }
    /**
     * @private
     * @return {?}
     */
    isFixed() {
        return this.fixed;
    }
    /**
     * @private
     * @return {?}
     */
    clearFixed() {
        this.resetBarCss();
        this.temp.style.height = '';
        this.setFixed(false);
    }
    /**
     * @private
     * @return {?}
     */
    resetBarCss() {
        this.setCssBar({
            top: '',
            position: '',
            transform: '',
            width: ''
        });
    }
    /**
     * @private
     * @param {?} css
     * @return {?}
     */
    setCssBar(css) {
        for (const k in css) {
            this.bar.style[k] = css[k];
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.temp;
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.sensor;
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.fixed;
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.preventResize;
    /** @type {?} */
    StickyBar.prototype.container;
    /** @type {?} */
    StickyBar.prototype.scroller;
    /** @type {?} */
    StickyBar.prototype.bar;
    /** @type {?} */
    StickyBar.prototype.topSpace;
    /** @type {?} */
    StickyBar.prototype.bottomSpace;
}
/**
 * @record
 */
function StickyBarOptions() { }
if (false) {
    /** @type {?} */
    StickyBarOptions.prototype.bar;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.scroller;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.container;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.topSpace;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.bottomSpace;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ErrorPageComponent {
    /**
     * @param {?} route
     * @param {?} http
     * @param {?} viewerService
     * @param {?} location
     */
    constructor(route, http, viewerService, location) {
        this.route = route;
        this.http = http;
        this.viewerService = viewerService;
        this.location = location;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.sub = this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        params => {
            this.docId = params.id;
        }));
    }
    /**
     * @return {?}
     */
    download() {
        this.viewerService.downloadById(this.docId);
    }
    /**
     * @return {?}
     */
    back() {
        this.location.back();
    }
}
ErrorPageComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-error-page',
                template: "<div class=\"error-page\">\n  <div class=\"error-content text-center\">\n    <div>\n      <div class=\"error-subtitle\" [innerHTML]=\"'COMMON.MODULE.VIEWER.UNSUPPORTED' | translate\"></div>\n      <button class=\"btn btn-primary\" (click)=\"download()\"> <i class=\"fa fa-download\"></i> {{'TOOLBAR.DOWNLOAD' | translate}}</button>\n      <button class=\"btn btn-danger ml-1\" (click)=\"back()\"> <i class=\"fa fa-remove\"></i> {{'TOOLBAR.CLOSE' | translate}}</button>\n    </div>\n  </div>\n</div>",
                styles: [".error-page{position:relative}.error-content{padding:40px 1rem}.error-subtitle{font-size:20px;font-weight:300;padding-bottom:10px}"]
            }] }
];
/** @nocollapse */
ErrorPageComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: HttpClientService },
    { type: ViewerService },
    { type: Location }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.docId;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.viewerService;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.location;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ViewerComponent {
    /**
     * @param {?} route
     * @param {?} router
     * @param {?} location
     * @param {?} http
     * @param {?} viewerService
     */
    constructor(route, router, location, http, viewerService) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.http = http;
        this.viewerService = viewerService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        //this.routerHeight = document.getElementsByTagName('router-outlet')[0].nextElementSibling.scrollHeight;
        this.sub = this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        params => {
            this.docId = params.id;
            this.ext = params.ext;
            if (this.viewerService.hasView(this.ext)) {
                this.url = this.getViewUrl();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    /**
     * @return {?}
     */
    back() {
        this.location.back();
    }
    /**
     * @return {?}
     */
    download() {
        this.viewerService.downloadById(this.docId);
    }
    /**
     * @return {?}
     */
    getParams() {
        return { docID: this.docId };
    }
    /**
     * @param {?=} viewMode
     * @return {?}
     */
    getViewUrl(viewMode) {
        /** @type {?} */
        let __url = this.viewerService.getDownloadUrl();
        /** @type {?} */
        let __viewMode = viewMode || 'pdf';
        /** @type {?} */
        let __params = this.getParams();
        __params['view'] = __viewMode;
        __params['time'] = new Date().valueOf();
        __url = iNet.urlAppend(__url, this.http.convertToHttpParams(__params));
        return __url;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onLoad($event) {
        if (this.viewerService.hasView(this.ext)) {
            try {
                /** @type {?} */
                const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow.document;
                if (doc) {
                    /** @type {?} */
                    const image = doc.getElementsByTagName('img')[0];
                    if (image) {
                        image.style.width = '100%'; //set width of image inside of iframe
                    }
                }
            }
            catch (ex) { }
        }
        this.viewerService.sendEvent($event, this);
    }
}
ViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-viewer',
                template: `
        <div class="viewer-container">
            <iframe #iframe [src]="url | safe" allowfullscreen style="height: 100%;width: 100%; border: none;"
                    (load)="onLoad($event)">
            </iframe>
        </div>`,
                styles: [`
        .viewer-container {
            height: calc(100vh - 65px);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
            overflow: hidden;
        }
    `]
            }] }
];
/** @nocollapse */
ViewerComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: Location },
    { type: HttpClientService },
    { type: ViewerService }
];
ViewerComponent.propDecorators = {
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};
if (false) {
    /** @type {?} */
    ViewerComponent.prototype.url;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.docId;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.ext;
    /** @type {?} */
    ViewerComponent.prototype.iframe;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.viewerService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ViewerModule {
}
ViewerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    CoreModule,
                    CloudTranslateModule,
                    FileModule,
                    SafePipeModule
                ],
                declarations: [ViewerComponent, ErrorPageComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [HttpClientService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const routes$1 = [
    { path: ':ext/:id', component: ViewerComponent },
    { path: ':id', component: ErrorPageComponent }
];
class ViewerRoutingModule {
}
ViewerRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes$1)],
                exports: [RouterModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NavigationTab {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} router
     */
    constructor(componentFactoryResolver, router) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.router = router;
        this.prefix = '';
        this.onChange = new EventEmitter();
        this.onLoad = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._router = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationEnd)))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._activeTab();
        }));
        this._activeTab();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._router) {
            this._router.unsubscribe();
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    activeTab(tab) {
        if (tab.active) {
            return;
        }
        this.router.navigate([this.getFullPath(tab)]);
        this.onChange.emit(tab);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getTabByPath(path) {
        // get tab with path matching
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.getFullPath(this.tabs[i]) === path) {
                return this.tabs[i];
            }
        }
        return this.tabs[0];
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    getFullPath(tab) {
        return this.prefix + tab.path;
    }
    /**
     * @private
     * @param {?} tab
     * @return {?}
     */
    _loadComponent(tab) {
        if (this.tabActive === tab) {
            return;
        }
        this.tabActive = tab;
        this.viewContainerRef.clear();
        if (tab.component) {
            /** @type {?} */
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.component);
            this.componentRef = this.viewContainerRef.createComponent(componentFactory);
            this.onLoad.emit(this.componentRef);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _activeTab() {
        /** @type {?} */
        let tab = this.getTabByPath(this.router.url);
        if (tab) {
            this.tabs.forEach((/**
             * @param {?} _tab
             * @return {?}
             */
            _tab => _tab.active = false));
            this._loadComponent(tab);
            tab.active = true;
        }
    }
}
NavigationTab.decorators = [
    { type: Component, args: [{
                selector: '[navigationTab]',
                template: "<div class=\"navigation-tab\">\n  <ul class=\"nav navigation-tab__content\">\n    <li *ngFor=\"let tab of tabs\" class=\"nav-item\" [ngClass]=\"{'active': tab.active}\">\n      <span class=\"nav-link\" (click)=\"activeTab(tab)\">{{tab.name}}</span>\n    </li>\n  </ul>\n</div>\n",
                styles: [".navigation-tab{padding-top:3px;overflow:auto}.nav-item,.navigation-tab__content{white-space:nowrap;display:inline-block}.nav-item{display:inline-block;color:rgba(0,0,0,.3);text-transform:uppercase;cursor:pointer;font-size:14px;font-weight:700}.nav-item:hover{color:rgba(0,0,0,.7)}.nav-item.active{color:#0062cc;border-bottom:2px solid #0062cc}"]
            }] }
];
/** @nocollapse */
NavigationTab.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Router }
];
NavigationTab.propDecorators = {
    tabs: [{ type: Input }],
    viewContainerRef: [{ type: Input }],
    prefix: [{ type: Input }],
    onChange: [{ type: Output }],
    onLoad: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NavigationTab.prototype.tabs;
    /** @type {?} */
    NavigationTab.prototype.viewContainerRef;
    /** @type {?} */
    NavigationTab.prototype.prefix;
    /** @type {?} */
    NavigationTab.prototype.onChange;
    /** @type {?} */
    NavigationTab.prototype.onLoad;
    /** @type {?} */
    NavigationTab.prototype.tabActive;
    /** @type {?} */
    NavigationTab.prototype.componentRef;
    /**
     * @type {?}
     * @private
     */
    NavigationTab.prototype._router;
    /**
     * @type {?}
     * @private
     */
    NavigationTab.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    NavigationTab.prototype.router;
}
/**
 * @record
 */
function NavigationData() { }
if (false) {
    /** @type {?} */
    NavigationData.prototype.name;
    /** @type {?} */
    NavigationData.prototype.component;
    /** @type {?} */
    NavigationData.prototype.path;
    /** @type {?|undefined} */
    NavigationData.prototype.active;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NavigationTabModule {
}
NavigationTabModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [NavigationTab],
                declarations: [NavigationTab]
            },] }
];

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
/**
 * @record
 */
function DataTableParams() { }
if (false) {
    /** @type {?|undefined} */
    DataTableParams.prototype.offset;
    /** @type {?|undefined} */
    DataTableParams.prototype.limit;
    /** @type {?|undefined} */
    DataTableParams.prototype.page;
    /** @type {?|undefined} */
    DataTableParams.prototype.sortBy;
    /** @type {?|undefined} */
    DataTableParams.prototype.sortAsc;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function DataTableTranslations() { }
if (false) {
    /** @type {?} */
    DataTableTranslations.prototype.headerReload;
    /** @type {?} */
    DataTableTranslations.prototype.headerColumnSelector;
    /** @type {?} */
    DataTableTranslations.prototype.indexColumn;
    /** @type {?} */
    DataTableTranslations.prototype.selectColumn;
    /** @type {?} */
    DataTableTranslations.prototype.selectRow;
    /** @type {?} */
    DataTableTranslations.prototype.selectAllRows;
    /** @type {?} */
    DataTableTranslations.prototype.expandColumn;
    /** @type {?} */
    DataTableTranslations.prototype.expandRow;
    /** @type {?} */
    DataTableTranslations.prototype.paginationLimit;
    /** @type {?} */
    DataTableTranslations.prototype.paginationRange;
    /** @type {?} */
    DataTableTranslations.prototype.firstText;
    /** @type {?} */
    DataTableTranslations.prototype.prevText;
    /** @type {?} */
    DataTableTranslations.prototype.nextText;
    /** @type {?} */
    DataTableTranslations.prototype.lastText;
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
class AppSelect2Directive {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.element = $(this._el.nativeElement).select2(this.options).change((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onChange.emit(e.target.value);
        }));
        this.updateSelect();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateSelect();
        }
        if (changes.initValue) {
            this.updateValue();
        }
    }
    /**
     * @return {?}
     */
    updateSelect() {
        if (this.element && this.options) {
            this.element.empty().select2(this.options);
            this.updateValue();
        }
    }
    /**
     * @return {?}
     */
    updateValue() {
        if (this.element && this.initValue) {
            this.element.val(this.initValue).trigger('change');
        }
    }
}
AppSelect2Directive.decorators = [
    { type: Directive, args: [{
                selector: 'select[appSelect2]'
            },] }
];
/** @nocollapse */
AppSelect2Directive.ctorParameters = () => [
    { type: ElementRef }
];
AppSelect2Directive.propDecorators = {
    initValue: [{ type: Input }],
    options: [{ type: Input }],
    onChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AppSelect2Directive.prototype.initValue;
    /** @type {?} */
    AppSelect2Directive.prototype.options;
    /** @type {?} */
    AppSelect2Directive.prototype.onChange;
    /** @type {?} */
    AppSelect2Directive.prototype.element;
    /**
     * @type {?}
     * @private
     */
    AppSelect2Directive.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AppSelect2Module {
}
AppSelect2Module.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [AppSelect2Directive],
                declarations: [AppSelect2Directive]
            },] }
];

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateUtils {
    /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    static format(date, format) {
        if (!format) {
            format = this.VN_DATETIME_FORMAT;
        }
        return this.datePipe.transform(date, format);
    }
}
DateUtils.datePipe = new DatePipe('en-US');
DateUtils.DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
DateUtils.VN_DATETIME_FORMAT = 'HH:mm dd/MM/yyyy';
DateUtils.DATE_FORMAT = 'dd/MM/yyyy';
DateUtils.TIME_FORMAT = 'HH:mm';
if (false) {
    /**
     * @type {?}
     * @private
     */
    DateUtils.datePipe;
    /** @type {?} */
    DateUtils.DATETIME_FORMAT;
    /** @type {?} */
    DateUtils.VN_DATETIME_FORMAT;
    /** @type {?} */
    DateUtils.DATE_FORMAT;
    /** @type {?} */
    DateUtils.TIME_FORMAT;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = moment$1;
/** @type {?} */
const times = {
    minute: 60 * 1000,
    date: 24 * 60 * 1000,
    week: 7 * 24 * 60 * 1000,
    month: 30 * 24 * 60 * 1000,
    year: 365 * 24 * 60 * 1000
};
class DateFormatUtils {
    /**
     * @param {?} date
     * @return {?}
     */
    static fromNow(date) {
        /** @type {?} */
        let _date = new Date(date);
        /** @type {?} */
        let deltaFromNow;
        if (!_date.getTime()) {
            _date = new Date();
        }
        deltaFromNow = new Date().getTime() - _date.getTime();
        deltaFromNow /= 100; // By second
        if (deltaFromNow > 0) {
            if (deltaFromNow < times.date) {
                return Math.ceil(deltaFromNow / times.minute) + ' ' + this.textResources.minute;
            }
            else if (deltaFromNow < times.week) {
                return Math.ceil(deltaFromNow / times.date) + ' ' + this.textResources.date;
            }
            else if (deltaFromNow < times.month) {
                return Math.ceil(deltaFromNow / times.week) + ' ' + this.textResources.week;
            }
            else if (deltaFromNow < times.year) {
                return Math.ceil(deltaFromNow / times.month) + ' ' + this.textResources.month;
            }
        }
        return this.format(_date, this.textResources.year);
    }
    /**
     * @param {?} date
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    static format(date, format, locale) {
        return moment(date).locale(locale || this.locale).format(format);
    }
}
DateFormatUtils.locale = 'vi';
DateFormatUtils.textResources = {
    minute: 'phút',
    date: 'ngày',
    week: 'tuần',
    month: 'tháng',
    year: 'DD/MM/YYYY HH:mm'
};
if (false) {
    /** @type {?} */
    DateFormatUtils.locale;
    /** @type {?} */
    DateFormatUtils.textResources;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumberUtilsService {
    /**
     * @param {?} value
     * @return {?}
     */
    isNumeric(value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        if (typeof value === 'number') {
            return true;
        }
        if (!/^[0-9.,]+$/.test(value)) {
            return false;
        }
        if (!/^(?=.*\d)\d*[\.\,]?\d*$/.test(value)) {
            return false;
        }
        return !isNaN(parseFloat(value) - 0);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    addSeparator(value, separator = ',') {
        if (value && separator) {
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        return value;
    }
    /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    removeSeparator(value, separator = ',') {
        if (value && typeof value !== 'number') {
            switch (separator) {
                case ' ':
                    value = value.toString().replace(/[\s]/g, '');
                    break;
                case ',':
                    value = value.toString().replace(/\,/g, '');
                    break;
                default:
                    value = value.toString().replace(/separator/g, '');
                    break;
            }
        }
        return value;
    }
}
NumberUtilsService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumberSeparatorDirective {
    /**
     * @param {?} utilsService
     * @param {?} elementRef
     * @param {?} name
     */
    constructor(utilsService, elementRef, name) {
        this.utilsService = utilsService;
        this.elementRef = elementRef;
        this.name = name;
        this.separator = ',';
        this.ngModel = new EventEmitter();
        this.el = this.elementRef.nativeElement;
        if (this.el) {
            this.el.type = 'text';
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        // self value
        /** @type {?} */
        let v = c.value;
        if (v == 0 && !this.numberMin && !this.numberMax) {
            this.el.value = "0";
            return null;
        }
        if (v) {
            // console.log('validate[value]', v, this.el.value, v !== this.el.value);
            // first update
            if (this.el && (v !== this.el.value)) {
                this.el.value = this.addSeparator(this.el.value);
            }
            // control value
            v = parseInt(v.toString().replace(/[^0-9.,]/g, ''), 10);
            // number validator
            if (!this.isValidParam(v)) {
                this.el.value = null;
                return {
                    pattern: true
                };
            }
            // min validator
            if (v && this.isValidParam(this.numberMax) && v > parseInt(this.numberMax, 10)) {
                return {
                    max: false
                };
            }
            // max validator
            if (v && this.isValidParam(this.numberMin) && v < parseInt(this.numberMin, 10)) {
                return {
                    min: false
                };
            }
        }
        return null;
    }
    /**
     * @private
     * @param {?} param
     * @return {?}
     */
    isValidParam(param) {
        return param && this.utilsService.isNumeric(param);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getNumber(value) {
        value = value.replace(/[^0-9.,]/g, '');
        return value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    checkLength(value) {
        if (this.isValidParam(this.numberLength) && value.length > parseInt(this.numberLength, 10)) {
            value = value.slice(0, parseInt(this.numberLength, 10));
        }
        return value;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInput($event) {
        // console.log('onInput[data]', data.target.value);
        /** @type {?} */
        let value = this.utilsService.removeSeparator($event.target.value, this.separator);
        value = this.getNumber(value);
        if (this.utilsService.isNumeric(value)) {
            value = this.checkLength(value);
            $event.target.value = this.utilsService.addSeparator(value, this.separator);
        }
    }
    /*
    
        @HostListener("change", ["$event.target.value"])
        onChange(value) {
            this.el.value = this.addSeparator(value);
        }
    
        onInputChange(value) {
            const control = this.injector.get(NgControl);
            const newValue = this.utilsService.removeSeparator(value, this.separator);
            console.log('[newValue]', newValue);
            control.valueAccessor.writeValue(newValue);
        }
    
        */
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    addSeparator(v) {
        /** @type {?} */
        let value = this.utilsService.removeSeparator(v, this.separator);
        value = this.getNumber(value);
        if (this.utilsService.isNumeric(value)) {
            value = this.checkLength(value);
            return this.utilsService.addSeparator(value, this.separator);
        }
        return v;
    }
}
NumberSeparatorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appNumberSeparator]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NumberSeparatorDirective)), multi: true }
                ]
                /*
                host: {
                    '(ngModelChange)' : 'onInputChange($event)'
                }
                */
            },] }
];
/** @nocollapse */
NumberSeparatorDirective.ctorParameters = () => [
    { type: NumberUtilsService },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['name',] }] }
];
NumberSeparatorDirective.propDecorators = {
    separator: [{ type: Input, args: ['separator',] }],
    numberMin: [{ type: Input, args: ['numberMin',] }],
    numberMax: [{ type: Input, args: ['numberMax',] }],
    numberLength: [{ type: Input, args: ['numberLength',] }],
    ngModel: [{ type: Output }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NumberSeparatorDirective.prototype.separator;
    /** @type {?} */
    NumberSeparatorDirective.prototype.numberMin;
    /** @type {?} */
    NumberSeparatorDirective.prototype.numberMax;
    /** @type {?} */
    NumberSeparatorDirective.prototype.numberLength;
    /**
     * @type {?}
     * @private
     */
    NumberSeparatorDirective.prototype.el;
    /** @type {?} */
    NumberSeparatorDirective.prototype.ngModel;
    /**
     * @type {?}
     * @private
     */
    NumberSeparatorDirective.prototype.utilsService;
    /**
     * @type {?}
     * @private
     */
    NumberSeparatorDirective.prototype.elementRef;
    /** @type {?} */
    NumberSeparatorDirective.prototype.name;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumberFormatModule {
}
NumberFormatModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NumberSeparatorDirective],
                exports: [NumberSeparatorDirective],
                providers: [NumberUtilsService]
            },] }
];

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PaginationListComponent {
    constructor() {
        this.changePage = new EventEmitter();
        this.load = new EventEmitter();
        this.itemsPage = [];
        this.startNumber = 0;
        this.endNumber = 0;
        this.totalPage = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    loadPagination() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.getItemsPage();
        }), 50);
    }
    /**
     * @return {?}
     */
    getItemsPage() {
        if (this.total === 0) {
            this.startNumber = 0;
            this.endNumber = 0;
            this.page = 0;
            this.itemsPage = [];
        }
        else {
            if (this.page === 0) {
                this.page++;
            }
            /** @type {?} */
            let totalPage = this.page * this.limit;
            this.startNumber = totalPage - this.limit + 1;
            this.endNumber = totalPage > this.total ? this.total : (this.startNumber + this.limit - 1);
            if (this.page === 1)
                this.itemsPage = this.items.slice(0, totalPage > this.total ? this.total : (this.startNumber + this.limit - 1));
            else {
                this.itemsPage = this.items.slice(this.startNumber - 1, this.endNumber);
            }
        }
        this.totalPage = Math.ceil(this.total / this.limit);
        this.changePage.emit({
            page: this.page,
            items: this.itemsPage
        });
    }
    /**
     * @return {?}
     */
    prevPage() {
        if (this.page > 1) {
            this.page--;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    prevFirstPage() {
        if (this.page !== 1) {
            this.page = 1;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    nextPage() {
        /** @type {?} */
        let maxPage = Math.ceil(this.total / this.limit);
        if (this.page < maxPage) {
            this.page++;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    nextLastPage() {
        /** @type {?} */
        let maxPage = Math.ceil(this.total / this.limit);
        if (this.page !== maxPage) {
            this.page = maxPage;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    reload() {
        this.load.emit({
            page: this.page,
            items: this.getItemsPage()
        });
    }
    /**
     * @return {?}
     */
    inputPageText() {
        /** @type {?} */
        let total = Math.ceil(this.total / this.limit);
        if (this.page < 1) {
            this.page = 1;
        }
        else if (this.page > total) {
            this.page = total;
        }
        this.getItemsPage();
    }
}
PaginationListComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pagination-list',
                template: "<div class=\"btn-group h-100 col-sm-12 pl-0 pr-0\" role=\"group\" aria-label=\"First group\">\n    <span class=\"rounded-left title-show pl-3 pr-3\">\n    <span class=\"mr-2\">Hi\u1EC3n th\u1ECB</span>\n        <b>{{startNumber}} - {{endNumber}} / {{total}}</b>\n    </span>\n\n    <button type=\"button\" (click)=\"prevFirstPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-step-backward\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" (click)=\"prevPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\n    </button>\n    <input type=\"text\" class=\"text-center border-right-0 border-left-0 border\"\n           [(ngModel)]=\"page\"\n           oninput=\"this.value=this.value.replace(/[^0-9]/g,'');\"\n           (keyup.enter)=\"inputPageText()\"\n           (focusout)=\"inputPageText()\"\n           style=\"width: 36px;background: #efefef;\">\n    <button type=\"button\" (click)=\"nextPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" (click)=\"nextLastPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-step-forward\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"btn btn-light border\" (click)=\"reload()\">\n        <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\n    </button>\n</div>\n\n",
                styles: [".title-show{display:flex;align-items:center;justify-content:center;width:auto;color:#333;background:#e9ecef}"]
            }] }
];
/** @nocollapse */
PaginationListComponent.ctorParameters = () => [];
PaginationListComponent.propDecorators = {
    total: [{ type: Input }],
    page: [{ type: Input }],
    items: [{ type: Input }],
    limit: [{ type: Input }],
    changePage: [{ type: Output }],
    load: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PaginationListComponent.prototype.total;
    /** @type {?} */
    PaginationListComponent.prototype.page;
    /** @type {?} */
    PaginationListComponent.prototype.items;
    /** @type {?} */
    PaginationListComponent.prototype.limit;
    /** @type {?} */
    PaginationListComponent.prototype.changePage;
    /** @type {?} */
    PaginationListComponent.prototype.load;
    /** @type {?} */
    PaginationListComponent.prototype.itemsPage;
    /** @type {?} */
    PaginationListComponent.prototype.startNumber;
    /** @type {?} */
    PaginationListComponent.prototype.endNumber;
    /** @type {?} */
    PaginationListComponent.prototype.totalPage;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PaginationListModule {
}
PaginationListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [PaginationListComponent],
                exports: [PaginationListComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateShortcutPipe {
    /**
     * @param {?} date
     * @return {?}
     */
    transform(date) {
        return DateFormatUtils.fromNow(date);
    }
}
DateShortcutPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateShortcut'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
timeago.register('vi', (/**
 * @param {?} number
 * @param {?} index
 * @param {?} total_sec
 * @return {?}
 */
(number, index, total_sec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // total_sec: total seconds between date to be formatted and today's date;
    return [
        ['vừa xong', 'một lúc'],
        ['%s giây trước', '%s giây nữa'],
        ['1 phút trước', '1 phút nữa'],
        ['%s phút trước', '%s phút nữa'],
        ['1 giờ trước', '1 giờ nữa'],
        ['%s giờ trước', '%s giờ nữa'],
        ['1 ngày trước', '1 ngày nữa'],
        ['%s ngày trước', '%s ngày nữa'],
        ['1 tuần trước', '1 tuần nữa'],
        ['%s tuần trước', '%s tuần nữa'],
        ['1 tháng trước', '1 tháng nữa'],
        ['%s tháng trước', '%s tháng nữa'],
        ['1 năm trước', '1 năm nữa'],
        ['%s năm trước', '%s năm nữa']
    ][index];
}));
class TimeAgoPipe {
    /**
     * @param {?} date
     * @param {?=} locale
     * @return {?}
     */
    transform(date, locale) {
        locale = locale || 'vi';
        return timeago().format(date, locale);
    }
}
TimeAgoPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeAgo'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateTimeModule {
}
DateTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    DateShortcutPipe,
                    TimeAgoPipe
                ],
                exports: [
                    DateShortcutPipe,
                    TimeAgoPipe
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function newId() {
    // First character is an 'a', it's good practice to tag id to begin with a letter
    return 'axxxxxxxxxxx'.replace(/[x]/g, (/**
     * @param {?} _
     * @return {?}
     */
    function (_) {
        // tslint:disable-next-line:no-bitwise
        /** @type {?} */
        const val = Math.random() * 16 | 0;
        return val.toString(16);
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
};
/**
 * @param {?} text
 * @return {?}
 */
function stripSpecialChars(text) {
    /** @type {?} */
    const match = (/**
     * @param {?} a
     * @return {?}
     */
    (a) => {
        return diacritics[a] || a;
    });
    return text.replace(/[^\u0000-\u007E]/g, match);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
function isObject(value) {
    return typeof value === 'object' && isDefined(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function isPromise(value) {
    return value instanceof Promise;
}
/**
 * @param {?} value
 * @return {?}
 */
function isFunction(value) {
    return value instanceof Function;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ItemsList {
    /**
     * @param {?} _ngSelect
     * @param {?} _selectionModel
     */
    constructor(_ngSelect, _selectionModel) {
        this._ngSelect = _ngSelect;
        this._selectionModel = _selectionModel;
        this._items = [];
        this._filteredItems = [];
        this._markedIndex = -1;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    /**
     * @return {?}
     */
    get filteredItems() {
        return this._filteredItems;
    }
    /**
     * @return {?}
     */
    get markedIndex() {
        return this._markedIndex;
    }
    /**
     * @return {?}
     */
    get selectedItems() {
        return this._selectionModel.value;
    }
    /**
     * @return {?}
     */
    get markedItem() {
        return this._filteredItems[this._markedIndex];
    }
    /**
     * @return {?}
     */
    get noItemsToSelect() {
        return this._ngSelect.hideSelected && this._items.length === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    get maxItemsSelected() {
        return this._ngSelect.multiple && this._ngSelect.maxSelectedItems <= this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    get lastSelectedItem() {
        /** @type {?} */
        let i = this.selectedItems.length - 1;
        for (; i >= 0; i--) {
            /** @type {?} */
            let item = this.selectedItems[i];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    setItems(items) {
        this._items = items.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => this.mapItem(item, index)));
        if (this._ngSelect.groupBy) {
            this._groups = this._groupBy(this._items, this._ngSelect.groupBy);
            this._items = this._flatten(this._groups);
        }
        else {
            this._groups = new Map();
            this._groups.set(undefined, this._items);
        }
        this._filteredItems = [...this._items];
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (item.selected || this.maxItemsSelected) {
            return;
        }
        /** @type {?} */
        const multiple = this._ngSelect.multiple;
        if (!multiple) {
            this.clearSelected();
        }
        this._selectionModel.select(item, multiple, this._ngSelect.selectableGroupAsModel);
        if (this._ngSelect.hideSelected && multiple) {
            this._hideSelected(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unselect(item) {
        if (!item.selected) {
            return;
        }
        this._selectionModel.unselect(item, this._ngSelect.multiple);
        if (this._ngSelect.hideSelected && isDefined(item.index) && this._ngSelect.multiple) {
            this._showSelected(item);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    findItem(value) {
        /** @type {?} */
        let findBy;
        if (this._ngSelect.compareWith) {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => this._ngSelect.compareWith(item.value, value));
        }
        else if (this._ngSelect.bindValue) {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => !item.children && this.resolveNested(item.value, this._ngSelect.bindValue) === value);
        }
        else {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => item.value === value ||
                !item.children && item.label && item.label === this.resolveNested(value, this._ngSelect.bindLabel));
        }
        return this._items.find((/**
         * @param {?} item
         * @return {?}
         */
        item => findBy(item)));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addItem(item) {
        /** @type {?} */
        const option = this.mapItem(item, this._items.length);
        this._items.push(option);
        this._filteredItems.push(option);
        return option;
    }
    /**
     * @return {?}
     */
    clearSelected() {
        this._selectionModel.clear();
        this._items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            item.selected = false;
            item.marked = false;
        }));
        if (this._ngSelect.hideSelected) {
            this.resetFilteredItems();
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    findByLabel(term) {
        term = stripSpecialChars(term).toLocaleLowerCase();
        return this.filteredItems.find((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const label = stripSpecialChars(item.label).toLocaleLowerCase();
            return label.substr(0, term.length) === term;
        }));
    }
    /**
     * @param {?} term
     * @return {?}
     */
    filter(term) {
        if (!term) {
            this.resetFilteredItems();
            return;
        }
        this._filteredItems = [];
        term = this._ngSelect.searchFn ? term : stripSpecialChars(term).toLocaleLowerCase();
        /** @type {?} */
        const match = this._ngSelect.searchFn || this._defaultSearchFn;
        /** @type {?} */
        const hideSelected = this._ngSelect.hideSelected;
        for (const key of Array.from(this._groups.keys())) {
            /** @type {?} */
            const matchedItems = [];
            for (const item of this._groups.get(key)) {
                if (hideSelected && (item.parent && item.parent.selected || item.selected)) {
                    continue;
                }
                /** @type {?} */
                const searchItem = this._ngSelect.searchFn ? item.value : item;
                if (match(term, searchItem)) {
                    matchedItems.push(item);
                }
            }
            if (matchedItems.length > 0) {
                const [last] = matchedItems.slice(-1);
                if (last.parent) {
                    /** @type {?} */
                    const head = this._items.find((/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => x === last.parent));
                    this._filteredItems.push(head);
                }
                this._filteredItems.push(...matchedItems);
            }
        }
    }
    /**
     * @return {?}
     */
    resetFilteredItems() {
        if (this._filteredItems.length === this._items.length) {
            return;
        }
        if (this._ngSelect.hideSelected && this.selectedItems.length > 0) {
            this._filteredItems = this._items.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !x.selected));
        }
        else {
            this._filteredItems = this._items;
        }
    }
    /**
     * @return {?}
     */
    unmarkItem() {
        this._markedIndex = -1;
    }
    /**
     * @return {?}
     */
    markNextItem() {
        this._stepToItem(+1);
    }
    /**
     * @return {?}
     */
    markPreviousItem() {
        this._stepToItem(-1);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    markItem(item) {
        this._markedIndex = this._filteredItems.indexOf(item);
    }
    /**
     * @param {?=} markDefault
     * @return {?}
     */
    markSelectedOrDefault(markDefault) {
        if (this._filteredItems.length === 0) {
            return;
        }
        /** @type {?} */
        const indexOfLastSelected = this._ngSelect.hideSelected ? -1 : this._filteredItems.indexOf(this.lastSelectedItem);
        if (this.lastSelectedItem && indexOfLastSelected > -1) {
            this._markedIndex = indexOfLastSelected;
        }
        else {
            if (this._ngSelect.excludeGroupsFromDefaultSelection) {
                this._markedIndex = markDefault ? this.filteredItems.findIndex((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !x.disabled && !x.children)) : -1;
            }
            else {
                this._markedIndex = markDefault ? this.filteredItems.findIndex((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !x.disabled)) : -1;
            }
        }
    }
    /**
     * @param {?} option
     * @param {?} key
     * @return {?}
     */
    resolveNested(option, key) {
        if (!isObject(option)) {
            return option;
        }
        if (key.indexOf('.') === -1) {
            return option[key];
        }
        else {
            /** @type {?} */
            let keys = key.split('.');
            /** @type {?} */
            let value = option;
            for (let i = 0, len = keys.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[keys[i]];
            }
            return value;
        }
    }
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    mapItem(item, index) {
        /** @type {?} */
        const label = isDefined(item.$ngOptionLabel) ? item.$ngOptionLabel : this.resolveNested(item, this._ngSelect.bindLabel);
        /** @type {?} */
        const value = isDefined(item.$ngOptionValue) ? item.$ngOptionValue : item;
        return {
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: newId(),
        };
    }
    /**
     * @return {?}
     */
    mapSelectedItems() {
        /** @type {?} */
        const multiple = this._ngSelect.multiple;
        for (const selected of this.selectedItems) {
            /** @type {?} */
            const value = this._ngSelect.bindValue ? this.resolveNested(selected.value, this._ngSelect.bindValue) : selected.value;
            /** @type {?} */
            const item = isDefined(value) ? this.findItem(value) : null;
            this._selectionModel.unselect(selected, multiple);
            this._selectionModel.select(item || selected, multiple, this._ngSelect.selectableGroupAsModel);
        }
        if (this._ngSelect.hideSelected) {
            this._filteredItems = this.filteredItems.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => this.selectedItems.indexOf(x) === -1));
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _showSelected(item) {
        this._filteredItems.push(item);
        if (item.parent) {
            /** @type {?} */
            const parent = item.parent;
            /** @type {?} */
            const parentExists = this._filteredItems.find((/**
             * @param {?} x
             * @return {?}
             */
            x => x === parent));
            if (!parentExists) {
                this._filteredItems.push(parent);
            }
        }
        else if (item.children) {
            for (const child of item.children) {
                child.selected = false;
                this._filteredItems.push(child);
            }
        }
        this._filteredItems = [...this._filteredItems.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => (a.index - b.index)))];
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _hideSelected(item) {
        this._filteredItems = this._filteredItems.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== item));
        if (item.parent) {
            /** @type {?} */
            const children = item.parent.children;
            if (children.every((/**
             * @param {?} x
             * @return {?}
             */
            x => x.selected))) {
                this._filteredItems = this._filteredItems.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x !== item.parent));
            }
        }
        else if (item.children) {
            this._filteredItems = this.filteredItems.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.parent !== item));
        }
    }
    /**
     * @private
     * @param {?} search
     * @param {?} opt
     * @return {?}
     */
    _defaultSearchFn(search, opt) {
        /** @type {?} */
        const label = stripSpecialChars(opt.label).toLocaleLowerCase();
        return label.indexOf(search) > -1;
    }
    /**
     * @private
     * @param {?} steps
     * @return {?}
     */
    _getNextItemIndex(steps) {
        if (steps > 0) {
            return (this._markedIndex === this._filteredItems.length - 1) ? 0 : (this._markedIndex + 1);
        }
        return (this._markedIndex <= 0) ? (this._filteredItems.length - 1) : (this._markedIndex - 1);
    }
    /**
     * @private
     * @param {?} steps
     * @return {?}
     */
    _stepToItem(steps) {
        if (this._filteredItems.length === 0 || this._filteredItems.every((/**
         * @param {?} x
         * @return {?}
         */
        x => x.disabled))) {
            return;
        }
        this._markedIndex = this._getNextItemIndex(steps);
        if (this.markedItem.disabled) {
            this._stepToItem(steps);
        }
    }
    /**
     * @private
     * @param {?} items
     * @param {?} prop
     * @return {?}
     */
    _groupBy(items, prop) {
        /** @type {?} */
        const groups = new Map();
        if (items.length === 0) {
            return groups;
        }
        // Check if items are already grouped by given key.
        if (Array.isArray(items[0].value[(/** @type {?} */ (prop))])) {
            for (const item of items) {
                /** @type {?} */
                const children = (item.value[(/** @type {?} */ (prop))] || []).map((/**
                 * @param {?} x
                 * @param {?} index
                 * @return {?}
                 */
                (x, index) => this.mapItem(x, index)));
                groups.set(item, children);
            }
            return groups;
        }
        /** @type {?} */
        const isFnKey = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        const keyFn = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            let key = isFnKey ? ((/** @type {?} */ (prop)))(item.value) : item.value[(/** @type {?} */ (prop))];
            return isDefined(key) ? key : undefined;
        });
        // Group items by key.
        for (const item of items) {
            /** @type {?} */
            let key = keyFn(item);
            /** @type {?} */
            const group = groups.get(key);
            if (group) {
                group.push(item);
            }
            else {
                groups.set(key, [item]);
            }
        }
        return groups;
    }
    /**
     * @private
     * @param {?} groups
     * @return {?}
     */
    _flatten(groups) {
        /** @type {?} */
        const isGroupByFn = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        const items = [];
        /** @type {?} */
        const withoutGroup = groups.get(undefined) || [];
        items.push(...withoutGroup);
        /** @type {?} */
        let i = withoutGroup.length;
        for (const key of Array.from(groups.keys())) {
            if (!isDefined(key)) {
                continue;
            }
            /** @type {?} */
            const isObjectKey = isObject(key);
            /** @type {?} */
            const parent = {
                label: isObjectKey ? '' : (/** @type {?} */ (key)),
                children: undefined,
                parent: null,
                index: i++,
                disabled: !this._ngSelect.selectableGroup,
                htmlId: newId(),
            };
            /** @type {?} */
            const groupKey = isGroupByFn ? this._ngSelect.bindLabel : (/** @type {?} */ (this._ngSelect.groupBy));
            /** @type {?} */
            const groupValue = this._ngSelect.groupValue || ((/**
             * @return {?}
             */
            () => {
                if (isObjectKey) {
                    return ((/** @type {?} */ (key))).value;
                }
                return { [groupKey]: key };
            }));
            /** @type {?} */
            const children = groups.get(key).map((/**
             * @param {?} x
             * @return {?}
             */
            x => {
                x.parent = parent;
                x.children = undefined;
                x.index = i++;
                return x;
            }));
            parent.children = children;
            parent.value = groupValue(key, children.map((/**
             * @param {?} x
             * @return {?}
             */
            x => x.value)));
            items.push(parent);
            items.push(...children);
        }
        return items;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._groups;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._items;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._filteredItems;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._markedIndex;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._ngSelect;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._selectionModel;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function NgOption() { }
if (false) {
    /** @type {?|undefined} */
    NgOption.prototype.index;
    /** @type {?|undefined} */
    NgOption.prototype.htmlId;
    /** @type {?|undefined} */
    NgOption.prototype.selected;
    /** @type {?|undefined} */
    NgOption.prototype.disabled;
    /** @type {?|undefined} */
    NgOption.prototype.marked;
    /** @type {?|undefined} */
    NgOption.prototype.label;
    /** @type {?|undefined} */
    NgOption.prototype.value;
    /** @type {?|undefined} */
    NgOption.prototype.parent;
    /** @type {?|undefined} */
    NgOption.prototype.children;
    /* Skipping unhandled member: [name: string]: any;*/
}
/** @enum {number} */
const KeyCode = {
    Tab: 9,
    Enter: 13,
    Esc: 27,
    Space: 32,
    ArrowUp: 38,
    ArrowDown: 40,
    Backspace: 8,
};
KeyCode[KeyCode.Tab] = 'Tab';
KeyCode[KeyCode.Enter] = 'Enter';
KeyCode[KeyCode.Esc] = 'Esc';
KeyCode[KeyCode.Space] = 'Space';
KeyCode[KeyCode.ArrowUp] = 'ArrowUp';
KeyCode[KeyCode.ArrowDown] = 'ArrowDown';
KeyCode[KeyCode.Backspace] = 'Backspace';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function DefaultSelectionModelFactory() {
    return new DefaultSelectionModel();
}
/**
 * @record
 */
function SelectionModel() { }
if (false) {
    /** @type {?} */
    SelectionModel.prototype.value;
    /**
     * @param {?} item
     * @param {?} multiple
     * @param {?} selectableGroupAsModel
     * @return {?}
     */
    SelectionModel.prototype.select = function (item, multiple, selectableGroupAsModel) { };
    /**
     * @param {?} item
     * @param {?} multiple
     * @return {?}
     */
    SelectionModel.prototype.unselect = function (item, multiple) { };
    /**
     * @return {?}
     */
    SelectionModel.prototype.clear = function () { };
}
class DefaultSelectionModel {
    constructor() {
        this._selected = [];
    }
    /**
     * @return {?}
     */
    get value() {
        return this._selected;
    }
    /**
     * @param {?} item
     * @param {?} multiple
     * @param {?} groupAsModel
     * @return {?}
     */
    select(item, multiple, groupAsModel) {
        item.selected = true;
        if (groupAsModel || !item.children) {
            this._selected.push(item);
        }
        if (multiple) {
            if (item.parent) {
                /** @type {?} */
                const childrenCount = item.parent.children.length;
                /** @type {?} */
                const selectedCount = item.parent.children.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x.selected)).length;
                item.parent.selected = childrenCount === selectedCount;
            }
            else if (item.children) {
                this._setChildrenSelectedState(item.children, true);
                this._removeChildren(item);
                if (!groupAsModel) {
                    this._selected = [...this._selected, ...item.children];
                }
            }
        }
    }
    /**
     * @param {?} item
     * @param {?} multiple
     * @return {?}
     */
    unselect(item, multiple) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== item));
        item.selected = false;
        if (multiple) {
            if (item.parent && item.parent.selected) {
                /** @type {?} */
                const children = item.parent.children;
                this._removeParent(item.parent);
                this._removeChildren(item.parent);
                this._selected.push(...children.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x !== item)));
                item.parent.selected = false;
            }
            else if (item.children) {
                this._setChildrenSelectedState(item.children, false);
                this._removeChildren(item);
            }
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.disabled));
    }
    /**
     * @private
     * @param {?} children
     * @param {?} selected
     * @return {?}
     */
    _setChildrenSelectedState(children, selected) {
        children.forEach((/**
         * @param {?} x
         * @return {?}
         */
        x => x.selected = selected));
    }
    /**
     * @private
     * @param {?} parent
     * @return {?}
     */
    _removeChildren(parent) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.parent !== parent));
    }
    /**
     * @private
     * @param {?} parent
     * @return {?}
     */
    _removeParent(parent) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== parent));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DefaultSelectionModel.prototype._selected;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WindowService {
    /**
     * @param {?} fn
     * @return {?}
     */
    requestAnimationFrame(fn) {
        return window.requestAnimationFrame(fn);
    }
    /**
     * @param {?} handler
     * @param {?} timeout
     * @return {?}
     */
    setTimeout(handler, timeout) {
        return window.setTimeout(handler, timeout);
    }
}
WindowService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ WindowService.ngInjectableDef = defineInjectable({ factory: function WindowService_Factory() { return new WindowService(); }, token: WindowService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ItemsDimensions() { }
if (false) {
    /** @type {?} */
    ItemsDimensions.prototype.itemsLength;
    /** @type {?} */
    ItemsDimensions.prototype.viewWidth;
    /** @type {?} */
    ItemsDimensions.prototype.viewHeight;
    /** @type {?} */
    ItemsDimensions.prototype.childWidth;
    /** @type {?} */
    ItemsDimensions.prototype.childHeight;
    /** @type {?} */
    ItemsDimensions.prototype.itemsPerCol;
}
/**
 * @record
 */
function ItemsRangeResult() { }
if (false) {
    /** @type {?} */
    ItemsRangeResult.prototype.scrollHeight;
    /** @type {?} */
    ItemsRangeResult.prototype.topPadding;
    /** @type {?} */
    ItemsRangeResult.prototype.start;
    /** @type {?} */
    ItemsRangeResult.prototype.end;
}
class VirtualScrollService {
    /**
     * @param {?} d
     * @param {?} dropdownEl
     * @param {?} bufferAmount
     * @return {?}
     */
    calculateItems(d, dropdownEl, bufferAmount) {
        /** @type {?} */
        const scrollHeight = d.childHeight * d.itemsLength;
        if (dropdownEl.scrollTop > scrollHeight) {
            dropdownEl.scrollTop = scrollHeight;
        }
        /** @type {?} */
        const scrollTop = Math.max(0, dropdownEl.scrollTop);
        /** @type {?} */
        const indexByScrollTop = scrollTop / scrollHeight * d.itemsLength;
        /** @type {?} */
        let end = Math.min(d.itemsLength, Math.ceil(indexByScrollTop) + (d.itemsPerCol + 1));
        /** @type {?} */
        const maxStartEnd = end;
        /** @type {?} */
        const maxStart = Math.max(0, maxStartEnd - d.itemsPerCol - 1);
        /** @type {?} */
        let start = Math.min(maxStart, Math.floor(indexByScrollTop));
        /** @type {?} */
        let topPadding = d.childHeight * Math.ceil(start) - (d.childHeight * Math.min(start, bufferAmount));
        topPadding = !isNaN(topPadding) ? topPadding : 0;
        start = !isNaN(start) ? start : -1;
        end = !isNaN(end) ? end : -1;
        start -= bufferAmount;
        start = Math.max(0, start);
        end += bufferAmount;
        end = Math.min(d.itemsLength, end);
        return {
            topPadding: topPadding,
            scrollHeight: scrollHeight,
            start: start,
            end: end
        };
    }
    /**
     * @param {?} itemsLength
     * @param {?} index
     * @param {?} panelEl
     * @param {?} contentEl
     * @return {?}
     */
    calculateDimensions(itemsLength, index, panelEl, contentEl) {
        /** @type {?} */
        const panelRect = panelEl.getBoundingClientRect();
        /** @type {?} */
        const itemRect = contentEl.children[index] ? contentEl.children[index].getBoundingClientRect() : {
            width: panelRect.width,
            height: panelRect.height,
            top: 0,
        };
        /** @type {?} */
        const itemsPerCol = Math.max(1, Math.floor(panelRect.height / itemRect.height));
        return {
            itemsLength: itemsLength,
            viewWidth: panelRect.width,
            viewHeight: panelRect.height,
            childWidth: itemRect.width,
            childHeight: itemRect.height,
            itemsPerCol: itemsPerCol,
        };
    }
}
VirtualScrollService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ VirtualScrollService.ngInjectableDef = defineInjectable({ factory: function VirtualScrollService_Factory() { return new VirtualScrollService(); }, token: VirtualScrollService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TOP_CSS_CLASS = 'ng-select-top';
/** @type {?} */
const BOTTOM_CSS_CLASS = 'ng-select-bottom';
class NgDropdownPanelComponent {
    /**
     * @param {?} _renderer
     * @param {?} _zone
     * @param {?} _virtualScrollService
     * @param {?} _window
     * @param {?} _elementRef
     * @param {?} _document
     */
    constructor(_renderer, _zone, _virtualScrollService, _window, _elementRef, _document) {
        this._renderer = _renderer;
        this._zone = _zone;
        this._virtualScrollService = _virtualScrollService;
        this._window = _window;
        this._document = _document;
        this.items = [];
        this.position = 'auto';
        this.bufferAmount = 4;
        this.virtualScroll = false;
        this.filterValue = null;
        this.update = new EventEmitter();
        this.scroll = new EventEmitter();
        this.scrollToEnd = new EventEmitter();
        this.outsideClick = new EventEmitter();
        this._destroy$ = new Subject();
        this._startupLoop = true;
        this._isScrolledToMarked = false;
        this._scrollToEndFired = false;
        this._disposeScrollListener = (/**
         * @return {?}
         */
        () => { });
        this._disposeDocumentResizeListener = (/**
         * @return {?}
         */
        () => { });
        this._dropdown = _elementRef.nativeElement;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleMousedown($event) {
        /** @type {?} */
        const target = (/** @type {?} */ ($event.target));
        if (target.tagName === 'INPUT') {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._select = this._dropdown.parentElement;
        this._handleScroll();
        if (this._document) {
            merge(fromEvent(this._document, 'touchstart', { capture: true }), fromEvent(this._document, 'mousedown', { capture: true }))
                .pipe(takeUntil(this._destroy$))
                .subscribe((/**
             * @param {?} $event
             * @return {?}
             */
            ($event) => this._handleOutsideClick($event)));
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.items) {
            this._isScrolledToMarked = false;
            this._handleItemsChange(changes.items);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._disposeDocumentResizeListener();
        this._disposeScrollListener();
        this._destroy$.next();
        this._destroy$.complete();
        if (this.appendTo) {
            this._renderer.removeChild(this._dropdown.parentNode, this._dropdown);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._whenContentReady().then((/**
         * @return {?}
         */
        () => {
            if (this.appendTo) {
                this._appendDropdown();
                this._handleDocumentResize();
            }
            this.updateDropdownPosition();
        }));
    }
    /**
     * @return {?}
     */
    refresh() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this._window.requestAnimationFrame((/**
                 * @return {?}
                 */
                () => {
                    this._updateItems().then(resolve);
                }));
            }));
        }));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    scrollInto(item) {
        if (!item) {
            return;
        }
        /** @type {?} */
        const index = this.items.indexOf(item);
        if (index < 0 || index >= this.items.length) {
            return;
        }
        /** @type {?} */
        const d = this._calculateDimensions(this.virtualScroll ? 0 : index);
        /** @type {?} */
        const scrollEl = this.scrollElementRef.nativeElement;
        /** @type {?} */
        const buffer = Math.floor(d.viewHeight / d.childHeight) - 1;
        if (this.virtualScroll) {
            scrollEl.scrollTop = (index * d.childHeight) - (d.childHeight * Math.min(index, buffer));
        }
        else {
            /** @type {?} */
            const contentEl = this.contentElementRef.nativeElement;
            /** @type {?} */
            const childrenHeight = Array.from(contentEl.children).slice(0, index).reduce((/**
             * @param {?} c
             * @param {?} n
             * @return {?}
             */
            (c, n) => c + n.clientHeight), 0);
            scrollEl.scrollTop = childrenHeight - (d.childHeight * Math.min(index, buffer));
        }
    }
    /**
     * @return {?}
     */
    scrollIntoTag() {
        /** @type {?} */
        const el = this.scrollElementRef.nativeElement;
        /** @type {?} */
        const d = this._calculateDimensions();
        el.scrollTop = d.childHeight * (d.itemsLength + 1);
    }
    /**
     * @return {?}
     */
    updateDropdownPosition() {
        this._currentPosition = this._calculateCurrentPosition(this._dropdown);
        if (this._currentPosition === 'top') {
            this._renderer.addClass(this._dropdown, TOP_CSS_CLASS);
            this._renderer.removeClass(this._dropdown, BOTTOM_CSS_CLASS);
            this._renderer.addClass(this._select, TOP_CSS_CLASS);
            this._renderer.removeClass(this._select, BOTTOM_CSS_CLASS);
        }
        else {
            this._renderer.addClass(this._dropdown, BOTTOM_CSS_CLASS);
            this._renderer.removeClass(this._dropdown, TOP_CSS_CLASS);
            this._renderer.addClass(this._select, BOTTOM_CSS_CLASS);
            this._renderer.removeClass(this._select, TOP_CSS_CLASS);
        }
        if (this.appendTo) {
            this._updateAppendedDropdownPosition();
        }
        this._dropdown.style.opacity = '1';
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleOutsideClick($event) {
        if (this._select.contains($event.target)) {
            return;
        }
        if (this._dropdown.contains($event.target)) {
            return;
        }
        /** @type {?} */
        const path = $event.path || ($event.composedPath && $event.composedPath());
        if ($event.target && $event.target.shadowRoot && path && path[0] && this._select.contains(path[0])) {
            return;
        }
        this.outsideClick.emit();
    }
    /**
     * @private
     * @return {?}
     */
    _handleScroll() {
        this._disposeScrollListener = this._renderer.listen(this.scrollElementRef.nativeElement, 'scroll', (/**
         * @return {?}
         */
        () => {
            this.refresh();
            this._fireScrollToEnd();
        }));
    }
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    _handleItemsChange(items) {
        this._scrollToEndFired = false;
        this._previousStart = undefined;
        this._previousEnd = undefined;
        if (items !== undefined && items.previousValue === undefined ||
            (items.previousValue !== undefined && items.previousValue.length === 0)) {
            this._startupLoop = true;
        }
        this.items = items.currentValue || [];
        this.refresh().then((/**
         * @return {?}
         */
        () => {
            if (this.appendTo && this._currentPosition === 'top') {
                this._updateAppendedDropdownPosition();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateItems() {
        NgZone.assertNotInAngularZone();
        if (!this.virtualScroll) {
            this._zone.run((/**
             * @return {?}
             */
            () => {
                this.update.emit(this.items.slice());
                this._scrollToMarked();
            }));
            return Promise.resolve();
        }
        /** @type {?} */
        const loop = (/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            /** @type {?} */
            const d = this._calculateDimensions();
            /** @type {?} */
            const res = this._virtualScrollService.calculateItems(d, this.scrollElementRef.nativeElement, this.bufferAmount || 0);
            ((/** @type {?} */ (this.paddingElementRef.nativeElement))).style.height = `${res.scrollHeight}px`;
            ((/** @type {?} */ (this.contentElementRef.nativeElement))).style.transform = 'translateY(' + res.topPadding + 'px)';
            if (res.start !== this._previousStart || res.end !== this._previousEnd) {
                this._zone.run((/**
                 * @return {?}
                 */
                () => {
                    this.update.emit(this.items.slice(res.start, res.end));
                    this.scroll.emit({ start: res.start, end: res.end });
                }));
                this._previousStart = res.start;
                this._previousEnd = res.end;
                if (this._startupLoop === true) {
                    loop(resolve);
                }
            }
            else if (this._startupLoop === true) {
                this._startupLoop = false;
                this._scrollToMarked();
                resolve();
            }
        });
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => loop(resolve)));
    }
    /**
     * @private
     * @return {?}
     */
    _fireScrollToEnd() {
        if (this._scrollToEndFired) {
            return;
        }
        /** @type {?} */
        const scroll = this.scrollElementRef.nativeElement;
        /** @type {?} */
        const padding = this.virtualScroll ?
            this.paddingElementRef.nativeElement :
            this.contentElementRef.nativeElement;
        if (scroll.scrollTop + this._dropdown.clientHeight >= padding.clientHeight) {
            this.scrollToEnd.emit();
            this._scrollToEndFired = true;
        }
    }
    /**
     * @private
     * @param {?=} index
     * @return {?}
     */
    _calculateDimensions(index = 0) {
        return this._virtualScrollService.calculateDimensions(this.items.length, index, this.scrollElementRef.nativeElement, this.contentElementRef.nativeElement);
    }
    /**
     * @private
     * @return {?}
     */
    _handleDocumentResize() {
        if (!this.appendTo) {
            return;
        }
        this._disposeDocumentResizeListener = this._renderer.listen('window', 'resize', (/**
         * @return {?}
         */
        () => {
            this._updateAppendedDropdownPosition();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _scrollToMarked() {
        if (this._isScrolledToMarked || !this.markedItem) {
            return;
        }
        this._isScrolledToMarked = true;
        this.scrollInto(this.markedItem);
    }
    /**
     * @private
     * @param {?} dropdownEl
     * @return {?}
     */
    _calculateCurrentPosition(dropdownEl) {
        if (this.position !== 'auto') {
            return this.position;
        }
        /** @type {?} */
        const selectRect = this._select.getBoundingClientRect();
        /** @type {?} */
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        /** @type {?} */
        const offsetTop = selectRect.top + window.pageYOffset;
        /** @type {?} */
        const height = selectRect.height;
        /** @type {?} */
        const dropdownHeight = dropdownEl.getBoundingClientRect().height;
        if (offsetTop + height + dropdownHeight > scrollTop + document.documentElement.clientHeight) {
            return 'top';
        }
        else {
            return 'bottom';
        }
    }
    /**
     * @private
     * @return {?}
     */
    _appendDropdown() {
        /** @type {?} */
        const parent = document.querySelector(this.appendTo);
        if (!parent) {
            throw new Error(`appendTo selector ${this.appendTo} did not found any parent element`);
        }
        parent.appendChild(this._dropdown);
    }
    /**
     * @private
     * @return {?}
     */
    _updateAppendedDropdownPosition() {
        /** @type {?} */
        const parent = document.querySelector(this.appendTo) || document.body;
        this._dropdown.style.display = 'none';
        /** @type {?} */
        const selectRect = this._select.getBoundingClientRect();
        /** @type {?} */
        const boundingRect = parent.getBoundingClientRect();
        this._dropdown.style.display = '';
        /** @type {?} */
        const offsetTop = selectRect.top - boundingRect.top;
        /** @type {?} */
        const offsetLeft = selectRect.left - boundingRect.left;
        /** @type {?} */
        const topDelta = this._currentPosition === 'bottom' ? selectRect.height : -this._dropdown.clientHeight;
        this._dropdown.style.top = offsetTop + topDelta + 'px';
        this._dropdown.style.bottom = 'auto';
        this._dropdown.style.left = offsetLeft + 'px';
        this._dropdown.style.width = selectRect.width + 'px';
        this._dropdown.style.minWidth = selectRect.width + 'px';
    }
    /**
     * @private
     * @return {?}
     */
    _whenContentReady() {
        if (this.items.length === 0) {
            return Promise.resolve();
        }
        /** @type {?} */
        const ready = (/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            /** @type {?} */
            const ngOption = this._dropdown.querySelector('.ng-option');
            if (ngOption) {
                resolve();
                return;
            }
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                setTimeout((/**
                 * @return {?}
                 */
                () => ready(resolve)), 5);
            }));
        });
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => ready(resolve)));
    }
}
NgDropdownPanelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'ng-dropdown-panel',
                template: `
        <div *ngIf="headerTemplate" class="ng-dropdown-header">
            <ng-container [ngTemplateOutlet]="headerTemplate" [ngTemplateOutletContext]="{ searchTerm: filterValue }"></ng-container>
        </div>
        <div #scroll class="ng-dropdown-panel-items scroll-host">
            <div #padding [class.total-padding]="virtualScroll"></div>
            <div #content [class.scrollable-content]="virtualScroll && items.length > 0">
                <ng-content></ng-content>
            </div>
        </div>
        <div *ngIf="footerTemplate" class="ng-dropdown-footer">
            <ng-container [ngTemplateOutlet]="footerTemplate" [ngTemplateOutletContext]="{ searchTerm: filterValue }"></ng-container>
        </div>
    `
            }] }
];
/** @nocollapse */
NgDropdownPanelComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: VirtualScrollService },
    { type: WindowService },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
NgDropdownPanelComponent.propDecorators = {
    items: [{ type: Input }],
    markedItem: [{ type: Input }],
    position: [{ type: Input }],
    appendTo: [{ type: Input }],
    bufferAmount: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    headerTemplate: [{ type: Input }],
    footerTemplate: [{ type: Input }],
    filterValue: [{ type: Input }],
    update: [{ type: Output }],
    scroll: [{ type: Output }],
    scrollToEnd: [{ type: Output }],
    outsideClick: [{ type: Output }],
    contentElementRef: [{ type: ViewChild, args: ['content', { read: ElementRef },] }],
    scrollElementRef: [{ type: ViewChild, args: ['scroll', { read: ElementRef },] }],
    paddingElementRef: [{ type: ViewChild, args: ['padding', { read: ElementRef },] }],
    handleMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgDropdownPanelComponent.prototype.items;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.markedItem;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.position;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.appendTo;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.bufferAmount;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.virtualScroll;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.headerTemplate;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.footerTemplate;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.filterValue;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.update;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.scroll;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.scrollToEnd;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.outsideClick;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.contentElementRef;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.scrollElementRef;
    /** @type {?} */
    NgDropdownPanelComponent.prototype.paddingElementRef;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._destroy$;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._dropdown;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._select;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._previousStart;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._previousEnd;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._startupLoop;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._isScrolledToMarked;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._scrollToEndFired;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._currentPosition;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._disposeScrollListener;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._disposeDocumentResizeListener;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._virtualScrollService;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._window;
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelComponent.prototype._document;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgOptionComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.stateChange$ = new Subject();
        this._disabled = false;
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = this._isDisabled(value); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.disabled) {
            this.stateChange$.next({
                value: this.value,
                disabled: this._disabled
            });
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _isDisabled(value) {
        return value != null && `${value}` !== 'false';
    }
}
NgOptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-option',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `<ng-content></ng-content>`
            }] }
];
/** @nocollapse */
NgOptionComponent.ctorParameters = () => [
    { type: ElementRef }
];
NgOptionComponent.propDecorators = {
    value: [{ type: Input }],
    disabled: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgOptionComponent.prototype.value;
    /** @type {?} */
    NgOptionComponent.prototype.stateChange$;
    /**
     * @type {?}
     * @private
     */
    NgOptionComponent.prototype._disabled;
    /** @type {?} */
    NgOptionComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgOptionTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgOptionTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-option-tmp]' },] }
];
/** @nocollapse */
NgOptionTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgOptionTemplateDirective.prototype.template;
}
class NgOptgroupTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgOptgroupTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-optgroup-tmp]' },] }
];
/** @nocollapse */
NgOptgroupTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgOptgroupTemplateDirective.prototype.template;
}
class NgLabelTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgLabelTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-label-tmp]' },] }
];
/** @nocollapse */
NgLabelTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgLabelTemplateDirective.prototype.template;
}
class NgMultiLabelTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgMultiLabelTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-multi-label-tmp]' },] }
];
/** @nocollapse */
NgMultiLabelTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgMultiLabelTemplateDirective.prototype.template;
}
class NgHeaderTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-header-tmp]' },] }
];
/** @nocollapse */
NgHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgHeaderTemplateDirective.prototype.template;
}
class NgFooterTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgFooterTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-footer-tmp]' },] }
];
/** @nocollapse */
NgFooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgFooterTemplateDirective.prototype.template;
}
class NgNotFoundTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgNotFoundTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-notfound-tmp]' },] }
];
/** @nocollapse */
NgNotFoundTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgNotFoundTemplateDirective.prototype.template;
}
class NgTypeToSearchTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgTypeToSearchTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-typetosearch-tmp]' },] }
];
/** @nocollapse */
NgTypeToSearchTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgTypeToSearchTemplateDirective.prototype.template;
}
class NgLoadingTextTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgLoadingTextTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-loadingtext-tmp]' },] }
];
/** @nocollapse */
NgLoadingTextTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgLoadingTextTemplateDirective.prototype.template;
}
class NgTagTemplateDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgTagTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng-tag-tmp]' },] }
];
/** @nocollapse */
NgTagTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgTagTemplateDirective.prototype.template;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConsoleService {
    /**
     * @param {?} message
     * @return {?}
     */
    warn(message) {
        console.warn(message);
    }
}
ConsoleService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ ConsoleService.ngInjectableDef = defineInjectable({ factory: function ConsoleService_Factory() { return new ConsoleService(); }, token: ConsoleService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgSelectConfig {
    constructor() {
        this.notFoundText = 'No items found';
        this.typeToSearchText = 'Type to search';
        this.addTagText = 'Add item';
        this.loadingText = 'Loading...';
        this.clearAllText = 'Clear all';
        this.disableVirtualScroll = true;
        this.openOnEnter = true;
    }
}
NgSelectConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgSelectConfig.ngInjectableDef = defineInjectable({ factory: function NgSelectConfig_Factory() { return new NgSelectConfig(); }, token: NgSelectConfig, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgSelectConfig.prototype.placeholder;
    /** @type {?} */
    NgSelectConfig.prototype.notFoundText;
    /** @type {?} */
    NgSelectConfig.prototype.typeToSearchText;
    /** @type {?} */
    NgSelectConfig.prototype.addTagText;
    /** @type {?} */
    NgSelectConfig.prototype.loadingText;
    /** @type {?} */
    NgSelectConfig.prototype.clearAllText;
    /** @type {?} */
    NgSelectConfig.prototype.disableVirtualScroll;
    /** @type {?} */
    NgSelectConfig.prototype.openOnEnter;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SELECTION_MODEL_FACTORY = new InjectionToken('ng-select-selection-model');
class NgSelectComponent {
    /**
     * @param {?} classes
     * @param {?} tabIndex
     * @param {?} autoFocus
     * @param {?} config
     * @param {?} newSelectionModel
     * @param {?} _elementRef
     * @param {?} _cd
     * @param {?} _console
     */
    constructor(classes, tabIndex, autoFocus, config, newSelectionModel, _elementRef, _cd, _console) {
        this.classes = classes;
        this.tabIndex = tabIndex;
        this.autoFocus = autoFocus;
        this._cd = _cd;
        this._console = _console;
        this.clearable = true;
        this.markFirst = true;
        this.dropdownPosition = 'auto';
        this.loading = false;
        this.closeOnSelect = true;
        this.hideSelected = false;
        this.selectOnTab = false;
        this.bufferAmount = 4;
        this.selectableGroup = false;
        this.selectableGroupAsModel = true;
        this.searchFn = null;
        this.excludeGroupsFromDefaultSelection = false;
        this.clearOnBackspace = true;
        this.labelForId = null;
        this.autoCorrect = 'off';
        this.autoCapitalize = 'off';
        this.multiple = false;
        this.addTag = false;
        this.searchable = true;
        this.isOpen = false;
        // output events
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
        this.openEvent = new EventEmitter();
        this.closeEvent = new EventEmitter();
        this.searchEvent = new EventEmitter();
        this.clearEvent = new EventEmitter();
        this.addEvent = new EventEmitter();
        this.removeEvent = new EventEmitter();
        this.scroll = new EventEmitter();
        this.scrollToEnd = new EventEmitter();
        this.disabled = false;
        this.viewPortItems = [];
        this.filterValue = null;
        this.dropdownId = newId();
        this._items = [];
        this._defaultLabel = 'label';
        this._primitive = true;
        this._pressedKeys = [];
        this._destroy$ = new Subject();
        this._keyPress$ = new Subject();
        this._onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this.clearItem = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const option = this.selectedItems.find((/**
             * @param {?} x
             * @return {?}
             */
            x => x.value === item));
            this.unselect(option);
        });
        this._mergeGlobalConfig(config);
        this.itemsList = new ItemsList(this, newSelectionModel());
        this.element = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get items() { return this._items; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set items(value) {
        this._itemsAreUsed = true;
        this._items = value;
    }
    ;
    /**
     * @return {?}
     */
    get compareWith() { return this._compareWith; }
    /**
     * @param {?} fn
     * @return {?}
     */
    set compareWith(fn) {
        if (!isFunction(fn)) {
            throw Error('`compareWith` must be a function.');
        }
        this._compareWith = fn;
    }
    /**
     * @return {?}
     */
    get clearSearchOnAdd() { return isDefined(this._clearSearchOnAdd) ? this._clearSearchOnAdd : this.closeOnSelect; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set clearSearchOnAdd(value) {
        this._clearSearchOnAdd = value;
    }
    ;
    /**
     * @return {?}
     */
    get filtered() { return !!this.filterValue && this.searchable; }
    ;
    /**
     * @return {?}
     */
    get selectedItems() {
        return this.itemsList.selectedItems;
    }
    /**
     * @return {?}
     */
    get selectedValues() {
        return this.selectedItems.map((/**
         * @param {?} x
         * @return {?}
         */
        x => x.value));
    }
    /**
     * @return {?}
     */
    get hasValue() {
        return this.selectedItems.length > 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._handleKeyPresses();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.multiple) {
            this.itemsList.clearSelected();
        }
        if (changes.items) {
            this._setItems(changes.items.currentValue || []);
        }
        if (changes.isOpen) {
            this._manualOpen = isDefined(changes.isOpen.currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this._itemsAreUsed) {
            this._setItemsFromNgOptions();
        }
        if (isDefined(this.autoFocus)) {
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleKeyDown($event) {
        if (KeyCode[$event.which]) {
            switch ($event.which) {
                case KeyCode.ArrowDown:
                    this._handleArrowDown($event);
                    break;
                case KeyCode.ArrowUp:
                    this._handleArrowUp($event);
                    break;
                case KeyCode.Space:
                    this._handleSpace($event);
                    break;
                case KeyCode.Enter:
                    this._handleEnter($event);
                    break;
                case KeyCode.Tab:
                    this._handleTab($event);
                    break;
                case KeyCode.Esc:
                    this.close();
                    $event.preventDefault();
                    $event.stopPropagation();
                    break;
                case KeyCode.Backspace:
                    this._handleBackspace();
                    break;
            }
        }
        else if ($event.key && $event.key.length === 1) {
            this._keyPress$.next($event.key.toLocaleLowerCase());
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleMousedown($event) {
        /** @type {?} */
        const target = (/** @type {?} */ ($event.target));
        if (target.tagName !== 'INPUT') {
            $event.preventDefault();
        }
        $event.stopPropagation();
        if (target.classList.contains('ng-clear-wrapper')) {
            this.handleClearClick();
            return;
        }
        if (target.classList.contains('ng-arrow-wrapper')) {
            this.handleArrowClick();
            return;
        }
        if (target.classList.contains('ng-value-icon')) {
            return;
        }
        if (!this.focused) {
            this.focus();
        }
        if (this.searchable) {
            this.open();
        }
        else {
            this.toggle();
        }
    }
    /**
     * @return {?}
     */
    handleArrowClick() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    handleClearClick() {
        if (this.hasValue) {
            this.clearModel();
        }
        this._clearSearch();
        this.focus();
        if (this._isTypeahead) {
            this.typeahead.next(null);
        }
        this.clearEvent.emit();
    }
    /**
     * @return {?}
     */
    clearModel() {
        if (!this.clearable) {
            return;
        }
        this.itemsList.clearSelected();
        this._updateNgModel();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.itemsList.clearSelected();
        this._handleWriteValue(value);
        this._cd.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    }
    /**
     * @return {?}
     */
    toggle() {
        if (!this.isOpen) {
            this.open();
        }
        else {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    open() {
        if (this.disabled || this.isOpen || this.itemsList.maxItemsSelected || this._manualOpen) {
            return;
        }
        if (!this._isTypeahead && !this.addTag && this.itemsList.noItemsToSelect) {
            return;
        }
        this.isOpen = true;
        this.itemsList.markSelectedOrDefault(this.markFirst);
        this.openEvent.emit();
        if (!this.filterValue) {
            this.focus();
        }
        this.detectChanges();
    }
    /**
     * @return {?}
     */
    close() {
        if (!this.isOpen || this._manualOpen) {
            return;
        }
        this.isOpen = false;
        this._clearSearch();
        this._onTouched();
        this.closeEvent.emit();
        this._cd.markForCheck();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    toggleItem(item) {
        if (!item || item.disabled || this.disabled) {
            return;
        }
        if (this.multiple && item.selected) {
            this.unselect(item);
        }
        else {
            this.select(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (!item.selected) {
            this.itemsList.select(item);
            if (this.clearSearchOnAdd) {
                this._clearSearch();
            }
            if (this.multiple) {
                this.addEvent.emit(item.value);
            }
            this._updateNgModel();
        }
        if (this.closeOnSelect || this.itemsList.noItemsToSelect) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this.filterInput.nativeElement.focus();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unselect(item) {
        if (!item) {
            return;
        }
        this.itemsList.unselect(item);
        this.focus();
        this._updateNgModel();
        this.removeEvent.emit(item);
    }
    /**
     * @return {?}
     */
    selectTag() {
        /** @type {?} */
        let tag;
        if (isFunction(this.addTag)) {
            tag = ((/** @type {?} */ (this.addTag)))(this.filterValue);
        }
        else {
            tag = this._primitive ? this.filterValue : { [this.bindLabel]: this.filterValue };
        }
        /** @type {?} */
        const handleTag = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._isTypeahead || !this.isOpen ? this.itemsList.mapItem(item, null) : this.itemsList.addItem(item));
        if (isPromise(tag)) {
            tag.then((/**
             * @param {?} item
             * @return {?}
             */
            item => this.select(handleTag(item)))).catch((/**
             * @return {?}
             */
            () => { }));
        }
        else if (tag) {
            this.select(handleTag(tag));
        }
    }
    /**
     * @return {?}
     */
    showClear() {
        return this.clearable && (this.hasValue || this.filterValue) && !this.disabled;
    }
    /**
     * @return {?}
     */
    get showAddTag() {
        if (!this.filterValue) {
            return false;
        }
        /** @type {?} */
        const term = this.filterValue.toLowerCase();
        return this.addTag &&
            (!this.itemsList.filteredItems.some((/**
             * @param {?} x
             * @return {?}
             */
            x => x.label.toLowerCase() === term)) &&
                (!this.hideSelected && this.isOpen || !this.selectedItems.some((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x.label.toLowerCase() === term)))) &&
            !this.loading;
    }
    /**
     * @return {?}
     */
    showNoItemsFound() {
        /** @type {?} */
        const empty = this.itemsList.filteredItems.length === 0;
        return ((empty && !this._isTypeahead && !this.loading) ||
            (empty && this._isTypeahead && this.filterValue && !this.loading)) &&
            !this.showAddTag;
    }
    /**
     * @return {?}
     */
    showTypeToSearch() {
        /** @type {?} */
        const empty = this.itemsList.filteredItems.length === 0;
        return empty && this._isTypeahead && !this.filterValue && !this.loading;
    }
    /**
     * @param {?} term
     * @return {?}
     */
    filter(term) {
        this.filterValue = term;
        this.open();
        if (this._isTypeahead) {
            this.typeahead.next(this.filterValue);
        }
        else {
            this.itemsList.filter(this.filterValue);
            if (this.isOpen) {
                this.itemsList.markSelectedOrDefault(this.markFirst);
            }
        }
        this.searchEvent.emit(term);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputFocus($event) {
        if (this.focused) {
            return;
        }
        this.element.classList.add('ng-select-focused');
        this.focusEvent.emit($event);
        this.focused = true;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputBlur($event) {
        this.element.classList.remove('ng-select-focused');
        this.blurEvent.emit($event);
        if (!this.isOpen && !this.disabled) {
            this._onTouched();
        }
        this.focused = false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onItemHover(item) {
        if (item.disabled) {
            return;
        }
        this.itemsList.markItem(item);
    }
    /**
     * @return {?}
     */
    detectChanges() {
        if (!((/** @type {?} */ (this._cd))).destroyed) {
            this._cd.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    updateDropdownPosition() {
        if (this.dropdownPanel) {
            this.dropdownPanel.updateDropdownPosition();
        }
    }
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    _setItems(items) {
        /** @type {?} */
        const firstItem = items[0];
        this.bindLabel = this.bindLabel || this._defaultLabel;
        this._primitive = isDefined(firstItem) ? !isObject(firstItem) : this._primitive;
        this.itemsList.setItems(items);
        if (items.length > 0 && this.hasValue) {
            this.itemsList.mapSelectedItems();
        }
        if (this.isOpen && isDefined(this.filterValue) && !this._isTypeahead) {
            this.itemsList.filter(this.filterValue);
        }
        if (this._isTypeahead || this.isOpen) {
            this.itemsList.markSelectedOrDefault(this.markFirst);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _setItemsFromNgOptions() {
        /** @type {?} */
        const handleNgOptions = (/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            this.items = options.map((/**
             * @param {?} option
             * @return {?}
             */
            option => ({
                $ngOptionValue: option.value,
                $ngOptionLabel: option.elementRef.nativeElement.innerHTML,
                disabled: option.disabled
            })));
            this.itemsList.setItems(this.items);
            if (this.hasValue) {
                this.itemsList.mapSelectedItems();
            }
            this.detectChanges();
        });
        /** @type {?} */
        const handleOptionChange = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const changedOrDestroyed = merge(this.ngOptions.changes, this._destroy$);
            merge(...this.ngOptions.map((/**
             * @param {?} option
             * @return {?}
             */
            option => option.stateChange$)))
                .pipe(takeUntil(changedOrDestroyed))
                .subscribe((/**
             * @param {?} option
             * @return {?}
             */
            option => {
                /** @type {?} */
                const item = this.itemsList.findItem(option.value);
                item.disabled = option.disabled;
                this._cd.markForCheck();
            }));
        });
        this.ngOptions.changes
            .pipe(startWith(this.ngOptions), takeUntil(this._destroy$))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        options => {
            this.bindLabel = this._defaultLabel;
            handleNgOptions(options);
            handleOptionChange();
        }));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _isValidWriteValue(value) {
        if (!isDefined(value) || (this.multiple && value === '') || Array.isArray(value) && value.length === 0) {
            return false;
        }
        /** @type {?} */
        const validateBinding = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!isDefined(this.compareWith) && isObject(item) && this.bindValue) {
                this._console.warn(`Binding object(${JSON.stringify(item)}) with bindValue is not allowed.`);
                return false;
            }
            return true;
        });
        if (this.multiple) {
            if (!Array.isArray(value)) {
                this._console.warn('Multiple select ngModel should be array.');
                return false;
            }
            return value.every((/**
             * @param {?} item
             * @return {?}
             */
            item => validateBinding(item)));
        }
        else {
            return validateBinding(value);
        }
    }
    /**
     * @private
     * @param {?} ngModel
     * @return {?}
     */
    _handleWriteValue(ngModel) {
        if (!this._isValidWriteValue(ngModel)) {
            return;
        }
        /** @type {?} */
        const select = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            /** @type {?} */
            let item = this.itemsList.findItem(val);
            if (item) {
                this.itemsList.select(item);
            }
            else {
                /** @type {?} */
                const isValObject = isObject(val);
                /** @type {?} */
                const isPrimitive = !isValObject && !this.bindValue;
                if ((isValObject || isPrimitive)) {
                    this.itemsList.select(this.itemsList.mapItem(val, null));
                }
                else if (this.bindValue) {
                    item = {
                        [this.bindLabel]: null,
                        [this.bindValue]: val
                    };
                    this.itemsList.select(this.itemsList.mapItem(item, null));
                }
            }
        });
        if (this.multiple) {
            ((/** @type {?} */ (ngModel))).forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => select(item)));
        }
        else {
            select(ngModel);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _handleKeyPresses() {
        if (this.searchable) {
            return;
        }
        this._keyPress$
            .pipe(takeUntil(this._destroy$), tap((/**
         * @param {?} letter
         * @return {?}
         */
        letter => this._pressedKeys.push(letter))), debounceTime(200), filter((/**
         * @return {?}
         */
        () => this._pressedKeys.length > 0)), map((/**
         * @return {?}
         */
        () => this._pressedKeys.join(''))))
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        term => {
            /** @type {?} */
            const item = this.itemsList.findByLabel(term);
            if (item) {
                if (this.isOpen) {
                    this.itemsList.markItem(item);
                    this._cd.markForCheck();
                }
                else {
                    this.select(item);
                }
            }
            this._pressedKeys = [];
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateNgModel() {
        /** @type {?} */
        const model = [];
        for (const item of this.selectedItems) {
            if (this.bindValue) {
                /** @type {?} */
                let value = null;
                if (item.children) {
                    value = item.value[(/** @type {?} */ (this.groupBy))];
                }
                else {
                    value = this.itemsList.resolveNested(item.value, this.bindValue);
                }
                model.push(value);
            }
            else {
                model.push(item.value);
            }
        }
        /** @type {?} */
        const selected = this.selectedItems.map((/**
         * @param {?} x
         * @return {?}
         */
        x => x.value));
        if (this.multiple) {
            this._onChange(model);
            this.changeEvent.emit(selected);
        }
        else {
            this._onChange(isDefined(model[0]) ? model[0] : null);
            this.changeEvent.emit(selected[0]);
        }
        this._cd.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    _clearSearch() {
        if (!this.filterValue) {
            return;
        }
        this.filterValue = null;
        this.itemsList.resetFilteredItems();
    }
    /**
     * @private
     * @return {?}
     */
    _scrollToMarked() {
        if (!this.isOpen || !this.dropdownPanel) {
            return;
        }
        this.dropdownPanel.scrollInto(this.itemsList.markedItem);
    }
    /**
     * @private
     * @return {?}
     */
    _scrollToTag() {
        if (!this.isOpen || !this.dropdownPanel) {
            return;
        }
        this.dropdownPanel.scrollIntoTag();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleTab($event) {
        if (!this.isOpen) {
            return;
        }
        if (this.selectOnTab) {
            if (this.itemsList.markedItem) {
                this.toggleItem(this.itemsList.markedItem);
                $event.preventDefault();
            }
            else if (this.showAddTag) {
                this.selectTag();
                $event.preventDefault();
            }
            else {
                this.close();
            }
        }
        else {
            this.close();
        }
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleEnter($event) {
        if (this.isOpen || this._manualOpen) {
            if (this.itemsList.markedItem) {
                this.toggleItem(this.itemsList.markedItem);
            }
            else if (this.showAddTag) {
                this.selectTag();
            }
        }
        else if (this.openOnEnter) {
            this.open();
        }
        else {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleSpace($event) {
        if (this.isOpen || this._manualOpen) {
            return;
        }
        this.open();
        $event.preventDefault();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleArrowDown($event) {
        if (this._nextItemIsTag(+1)) {
            this.itemsList.unmarkItem();
            this._scrollToTag();
        }
        else {
            this.itemsList.markNextItem();
            this._scrollToMarked();
        }
        this.open();
        $event.preventDefault();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleArrowUp($event) {
        if (!this.isOpen) {
            return;
        }
        if (this._nextItemIsTag(-1)) {
            this.itemsList.unmarkItem();
            this._scrollToTag();
        }
        else {
            this.itemsList.markPreviousItem();
            this._scrollToMarked();
        }
        $event.preventDefault();
    }
    /**
     * @private
     * @param {?} nextStep
     * @return {?}
     */
    _nextItemIsTag(nextStep) {
        /** @type {?} */
        const nextIndex = this.itemsList.markedIndex + nextStep;
        return this.addTag && this.filterValue
            && this.itemsList.markedItem
            && (nextIndex < 0 || nextIndex === this.itemsList.filteredItems.length);
    }
    /**
     * @private
     * @return {?}
     */
    _handleBackspace() {
        if (this.filterValue || !this.clearable || !this.clearOnBackspace || !this.hasValue) {
            return;
        }
        if (this.multiple) {
            this.unselect(this.itemsList.lastSelectedItem);
        }
        else {
            this.clearModel();
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _isTypeahead() {
        return this.typeahead && this.typeahead.observers.length > 0;
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    _mergeGlobalConfig(config) {
        this.placeholder = this.placeholder || config.placeholder;
        this.notFoundText = this.notFoundText || config.notFoundText;
        this.typeToSearchText = this.typeToSearchText || config.typeToSearchText;
        this.addTagText = this.addTagText || config.addTagText;
        this.loadingText = this.loadingText || config.loadingText;
        this.clearAllText = this.clearAllText || config.clearAllText;
        this.virtualScroll = isDefined(this.virtualScroll)
            ? this.virtualScroll
            : isDefined(config.disableVirtualScroll) ? !config.disableVirtualScroll : false;
        this.openOnEnter = isDefined(this.openOnEnter) ? this.openOnEnter : config.openOnEnter;
    }
}
NgSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-select',
                template: "<div (mousedown)=\"handleMousedown($event)\" [class.ng-has-value]=\"hasValue\" class=\"ng-select-container\">\n    <div class=\"ng-value-container\">\n        <div class=\"ng-placeholder\">{{placeholder}}</div>\n\n        <ng-container *ngIf=\"!multiLabelTemplate && selectedItems.length > 0\">\n            <div [class.ng-value-disabled]=\"item.disabled\" class=\"ng-value\" *ngFor=\"let item of selectedItems\">\n                <ng-template #defaultLabelTemplate>\n                    <span class=\"ng-value-icon left\" (click)=\"unselect(item);\" aria-hidden=\"true\">\u00D7</span>\n                    <span class=\"ng-value-label\">{{item.label}}</span>\n                </ng-template>\n\n                <ng-template\n                    [ngTemplateOutlet]=\"labelTemplate || defaultLabelTemplate\"\n                    [ngTemplateOutletContext]=\"{ item: item.value, clear: clearItem, label: item.label }\">\n                </ng-template>\n            </div>\n        </ng-container>\n\n        <ng-template *ngIf=\"multiLabelTemplate && selectedValues.length > 0\"\n                [ngTemplateOutlet]=\"multiLabelTemplate\"\n                [ngTemplateOutletContext]=\"{ items: selectedValues, clear: clearItem }\">\n        </ng-template>\n\n        <div class=\"ng-input\">\n            <input #filterInput\n                   type=\"text\"\n                   [attr.autocomplete]=\"labelForId ? 'off' : dropdownId\"\n                   [attr.id]=\"labelForId\"\n                   [attr.tabindex]=\"tabIndex\"\n                   [attr.autocorrect]=\"autoCorrect\"\n                   [attr.autocapitalize]=\"autoCapitalize\"\n                   [readOnly]=\"!searchable\"\n                   [disabled]=\"disabled\"\n                   [value]=\"filterValue ? filterValue : ''\"\n                   (input)=\"filter(filterInput.value)\"\n                   (focus)=\"onInputFocus($event)\"\n                   (blur)=\"onInputBlur($event)\"\n                   (change)=\"$event.stopPropagation()\"\n                   role=\"combobox\"\n                   [attr.aria-expanded]=\"isOpen\"\n                   [attr.aria-owns]=\"isOpen ? dropdownId : null\"\n                   [attr.aria-activedescendant]=\"isOpen ? itemsList?.markedItem?.htmlId : null\">\n        </div>\n    </div>\n\n    <div class=\"ng-spinner-loader\" *ngIf=\"loading\"></div>\n\n    <span *ngIf=\"showClear()\" class=\"ng-clear-wrapper\" title=\"{{clearAllText}}\">\n        <span class=\"ng-clear\" aria-hidden=\"true\">\u00D7</span>\n    </span>\n\n    <span class=\"ng-arrow-wrapper\">\n        <span class=\"ng-arrow\"></span>\n    </span>\n</div>\n\n<ng-dropdown-panel *ngIf=\"isOpen\"\n    class=\"ng-dropdown-panel\"\n    [virtualScroll]=\"virtualScroll\"\n    [bufferAmount]=\"bufferAmount\"\n    [appendTo]=\"appendTo\"\n    [position]=\"dropdownPosition\"\n    [headerTemplate]=\"headerTemplate\"\n    [footerTemplate]=\"footerTemplate\"\n    [filterValue]=\"filterValue\"\n    [items]=\"itemsList.filteredItems\"\n    [markedItem]=\"itemsList.markedItem\"\n    (update)=\"viewPortItems = $event\"\n    (scroll)=\"scroll.emit($event)\"\n    (scrollToEnd)=\"scrollToEnd.emit($event)\"\n    (outsideClick)=\"close()\"\n    [class.ng-select-multiple]=\"multiple\"\n    [ngClass]=\"classes\"\n    [id]=\"dropdownId\">\n\n    <ng-container>\n        <div class=\"ng-option\" [attr.role]=\"item.children ? 'group' : 'option'\" (click)=\"toggleItem(item)\" (mouseover)=\"onItemHover(item)\"\n                *ngFor=\"let item of viewPortItems\"\n                [class.ng-option-disabled]=\"item.disabled\"\n                [class.ng-option-selected]=\"item.selected\"\n                [class.ng-optgroup]=\"item.children\"\n                [class.ng-option]=\"!item.children\"\n                [class.ng-option-child]=\"!!item.parent\"\n                [class.ng-option-marked]=\"item === itemsList.markedItem\"\n                [attr.aria-selected]=\"item.selected\"\n                [attr.id]=\"item?.htmlId\">\n\n            <ng-template #defaultOptionTemplate>\n                <span class=\"ng-option-label\">{{item.label}}</span>\n            </ng-template>\n\n            <ng-template\n                [ngTemplateOutlet]=\"item.children ? (optgroupTemplate || defaultOptionTemplate) : (optionTemplate || defaultOptionTemplate)\"\n                [ngTemplateOutletContext]=\"{ item: item.value, item$:item, index: item.index, searchTerm: filterValue }\">\n            </ng-template>\n        </div>\n\n        <div class=\"ng-option\" [class.ng-option-marked]=\"!itemsList.markedItem\" (mouseover)=\"itemsList.unmarkItem()\" role=\"option\" (click)=\"selectTag()\" *ngIf=\"showAddTag\">\n            <ng-template #defaultTagTemplate>\n                <span><span class=\"ng-tag-label\">{{addTagText}}</span>\"{{filterValue}}\"</span>\n            </ng-template>\n\n            <ng-template\n                [ngTemplateOutlet]=\"tagTemplate || defaultTagTemplate\"\n                [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\">\n            </ng-template>\n        </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"showNoItemsFound()\">\n        <ng-template #defaultNotFoundTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{notFoundText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"notFoundTemplate || defaultNotFoundTemplate\"\n            [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\">\n        </ng-template>\n    </ng-container>\n\n    <ng-container *ngIf=\"showTypeToSearch()\">\n        <ng-template #defaultTypeToSearchTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{typeToSearchText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"typeToSearchTemplate || defaultTypeToSearchTemplate\">\n        </ng-template>\n    </ng-container>\n\n    <ng-container *ngIf=\"loading && itemsList.filteredItems.length === 0\">\n        <ng-template #defaultLoadingTextTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{loadingText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"loadingTextTemplate || defaultLoadingTextTemplate\"\n            [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\">\n        </ng-template>\n    </ng-container>\n\n</ng-dropdown-panel>\n",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgSelectComponent)),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'listbox',
                    'class': 'ng-select',
                    '[class.ng-select-single]': '!multiple',
                },
                styles: [".ng-select{position:relative;display:block;box-sizing:border-box}.ng-select div,.ng-select input,.ng-select span{box-sizing:border-box}.ng-select [hidden]{display:none}.ng-select.ng-select-searchable .ng-select-container .ng-value-container .ng-input{opacity:1}.ng-select.ng-select-opened .ng-select-container{z-index:1001}.ng-select.ng-select-disabled .ng-select-container .ng-value-container .ng-placeholder,.ng-select.ng-select-disabled .ng-select-container .ng-value-container .ng-value{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.ng-select.ng-select-disabled .ng-arrow-wrapper{cursor:default}.ng-select.ng-select-filtered .ng-placeholder{display:none}.ng-select .ng-select-container{color:#333;cursor:default;display:flex;outline:0;overflow:hidden;position:relative;width:100%}.ng-select .ng-select-container .ng-value-container{display:flex;flex:1}.ng-select .ng-select-container .ng-value-container .ng-input{opacity:0}.ng-select .ng-select-container .ng-value-container .ng-input>input{box-sizing:content-box;background:none;border:0;box-shadow:none;outline:0;cursor:default;width:100%}.ng-select .ng-select-container .ng-value-container .ng-input>input::-ms-clear{display:none}.ng-select .ng-select-container .ng-value-container .ng-input>input[readonly]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:0;padding:0}.ng-select.ng-select-single.ng-select-filtered .ng-select-container .ng-value-container .ng-value{visibility:hidden}.ng-select.ng-select-single .ng-select-container .ng-value-container,.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-value{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-value .ng-value-icon{display:none}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input{position:absolute;width:100%;top:5px;left:0;padding-left:10px;padding-right:50px}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value .ng-value-icon{display:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container{flex-wrap:wrap;padding-top:5px;padding-left:7px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-icon{display:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon{cursor:pointer}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-input{flex:1;z-index:2;padding:0 0 3px 3px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{position:absolute;z-index:1;top:5px;padding-bottom:5px;padding-left:3px}.ng-select .ng-clear-wrapper{cursor:pointer;position:relative;width:17px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#999}.ng-select .ng-clear-wrapper .ng-clear{display:inline-block;font-size:18px;line-height:1;pointer-events:none}.ng-select .ng-spinner-loader{border-radius:50%;width:17px;height:17px;margin-right:5px;font-size:10px;position:relative;text-indent:-9999em;border-top:2px solid rgba(66,66,66,.2);border-right:2px solid rgba(66,66,66,.2);border-bottom:2px solid rgba(66,66,66,.2);border-left:2px solid #424242;transform:translateZ(0);-webkit-animation:.8s linear infinite load8;animation:.8s linear infinite load8}.ng-select .ng-spinner-loader:after{border-radius:50%;width:17px;height:17px}@-webkit-keyframes load8{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes load8{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.ng-select .ng-arrow-wrapper{cursor:pointer;position:relative;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ng-select .ng-arrow-wrapper .ng-arrow{pointer-events:none;display:inline-block;height:0;width:0;position:relative}.ng-dropdown-panel .ng-dropdown-panel-items{display:block;height:auto;box-sizing:border-box;max-height:240px;overflow-y:auto}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{box-sizing:border-box;cursor:pointer;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option .highlighted{font-weight:700;text-decoration:underline}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.disabled{cursor:default}.ng-dropdown-panel .scroll-host{overflow:hidden;overflow-y:auto;position:relative;display:block;-webkit-overflow-scrolling:touch}.ng-dropdown-panel .scrollable-content{top:0;left:0;width:100%;height:100%;position:absolute}.ng-dropdown-panel .total-padding{width:1px;opacity:0}.ng-select.ng-select-opened>.ng-select-container{background:#fff;border-color:#b3b3b3 #ccc #d9d9d9}.ng-select.ng-select-opened>.ng-select-container:hover{box-shadow:none}.ng-select.ng-select-opened>.ng-select-container .ng-arrow{top:-2px;border-color:transparent transparent #999;border-width:0 5px 5px}.ng-select.ng-select-opened>.ng-select-container .ng-arrow:hover{border-color:transparent transparent #666}.ng-select.ng-select-opened.ng-select-bottom>.ng-select-container{border-bottom-right-radius:0;border-bottom-left-radius:0}.ng-select.ng-select-opened.ng-select-top>.ng-select-container{border-top-right-radius:0;border-top-left-radius:0}.ng-select.ng-select-focused:not(.ng-select-opened)>.ng-select-container{border-color:#007eff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 3px rgba(0,126,255,.1)}.ng-select.ng-select-disabled>.ng-select-container{background-color:#f9f9f9}.ng-select .ng-has-value .ng-placeholder{display:none}.ng-select .ng-select-container{background-color:#fff;border-radius:4px;border:1px solid #ccc;min-height:36px;align-items:center}.ng-select .ng-select-container:hover{box-shadow:0 1px 0 rgba(0,0,0,.06)}.ng-select .ng-select-container .ng-value-container{align-items:center;padding-left:10px}.ng-select .ng-select-container .ng-value-container .ng-placeholder{color:#aaa}.ng-select.ng-select-single .ng-select-container{height:36px}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value{background-color:#f9f9f9;border:1px solid #e3e3e3}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value .ng-value-label{padding:0 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{white-space:nowrap;font-size:.9em;margin-bottom:5px;background-color:#f5faff;border-radius:2px;border:1px solid #c2e0ff;margin-right:5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled{background-color:#f9f9f9;border:1px solid #e3e3e3}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-label{padding-left:5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon,.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-label{display:inline-block;padding:0 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon:hover{background-color:#d8eafd}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.left{border-right:1px solid #c2e0ff}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.right{border-left:1px solid #c2e0ff}.ng-select .ng-clear-wrapper:hover .ng-clear{color:#d0021b}.ng-select .ng-spinner-zone{padding:5px 5px 0 0}.ng-select .ng-arrow-wrapper{width:25px;padding-right:5px}.ng-select .ng-arrow-wrapper:hover .ng-arrow{border-top-color:#666}.ng-select .ng-arrow-wrapper .ng-arrow{border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 2.5px}.ng-dropdown-panel{box-sizing:border-box;position:absolute;opacity:0;width:100%;z-index:1050;-webkit-overflow-scrolling:touch;background-color:#fff;border:1px solid #ccc;box-shadow:0 1px 0 rgba(0,0,0,.06);left:0}.ng-dropdown-panel.ng-select-bottom{top:100%;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-color:#e6e6e6;margin-top:-1px}.ng-dropdown-panel.ng-select-bottom .ng-dropdown-panel-items .ng-option:last-child{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.ng-dropdown-panel.ng-select-top{bottom:100%;border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-color:#e6e6e6;margin-bottom:-1px}.ng-dropdown-panel.ng-select-top .ng-dropdown-panel-items .ng-option:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.ng-dropdown-panel .ng-dropdown-header{border-bottom:1px solid #ccc;padding:5px 7px}.ng-dropdown-panel .ng-dropdown-footer{border-top:1px solid #ccc;padding:5px 7px}.ng-dropdown-panel .ng-dropdown-panel-items{margin-bottom:1px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:8px 10px;font-weight:500;color:rgba(0,0,0,.54);cursor:pointer}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-disabled{cursor:default}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-marked{background-color:#ebf5ff}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-selected{background-color:#f5faff;font-weight:600}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{background-color:#fff;color:rgba(0,0,0,.87);padding:8px 10px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected{color:#333;background-color:#f5faff}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label{font-weight:600}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-marked{background-color:#ebf5ff;color:#333}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-disabled{color:#ccc}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-child{padding-left:22px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option .ng-tag-label{font-size:80%;font-weight:400;padding-right:5px}"]
            }] }
];
/** @nocollapse */
NgSelectComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['class',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Attribute, args: ['autofocus',] }] },
    { type: NgSelectConfig },
    { type: undefined, decorators: [{ type: Inject, args: [SELECTION_MODEL_FACTORY,] }] },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ConsoleService }
];
NgSelectComponent.propDecorators = {
    bindLabel: [{ type: Input }],
    bindValue: [{ type: Input }],
    clearable: [{ type: Input }],
    markFirst: [{ type: Input }],
    placeholder: [{ type: Input }],
    notFoundText: [{ type: Input }],
    typeToSearchText: [{ type: Input }],
    addTagText: [{ type: Input }],
    loadingText: [{ type: Input }],
    clearAllText: [{ type: Input }],
    dropdownPosition: [{ type: Input }],
    appendTo: [{ type: Input }],
    loading: [{ type: Input }],
    closeOnSelect: [{ type: Input }],
    hideSelected: [{ type: Input }],
    selectOnTab: [{ type: Input }],
    openOnEnter: [{ type: Input }],
    maxSelectedItems: [{ type: Input }],
    groupBy: [{ type: Input }],
    groupValue: [{ type: Input }],
    bufferAmount: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    selectableGroup: [{ type: Input }],
    selectableGroupAsModel: [{ type: Input }],
    searchFn: [{ type: Input }],
    excludeGroupsFromDefaultSelection: [{ type: Input }],
    clearOnBackspace: [{ type: Input }],
    labelForId: [{ type: Input }],
    autoCorrect: [{ type: Input }],
    autoCapitalize: [{ type: Input }],
    typeahead: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-typeahead',] }],
    multiple: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-multiple',] }],
    addTag: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-taggable',] }],
    searchable: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-searchable',] }],
    isOpen: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-opened',] }],
    items: [{ type: Input }],
    compareWith: [{ type: Input }],
    clearSearchOnAdd: [{ type: Input }],
    blurEvent: [{ type: Output, args: ['blur',] }],
    focusEvent: [{ type: Output, args: ['focus',] }],
    changeEvent: [{ type: Output, args: ['change',] }],
    openEvent: [{ type: Output, args: ['open',] }],
    closeEvent: [{ type: Output, args: ['close',] }],
    searchEvent: [{ type: Output, args: ['search',] }],
    clearEvent: [{ type: Output, args: ['clear',] }],
    addEvent: [{ type: Output, args: ['add',] }],
    removeEvent: [{ type: Output, args: ['remove',] }],
    scroll: [{ type: Output, args: ['scroll',] }],
    scrollToEnd: [{ type: Output, args: ['scrollToEnd',] }],
    optionTemplate: [{ type: ContentChild, args: [NgOptionTemplateDirective, { read: TemplateRef },] }],
    optgroupTemplate: [{ type: ContentChild, args: [NgOptgroupTemplateDirective, { read: TemplateRef },] }],
    labelTemplate: [{ type: ContentChild, args: [NgLabelTemplateDirective, { read: TemplateRef },] }],
    multiLabelTemplate: [{ type: ContentChild, args: [NgMultiLabelTemplateDirective, { read: TemplateRef },] }],
    headerTemplate: [{ type: ContentChild, args: [NgHeaderTemplateDirective, { read: TemplateRef },] }],
    footerTemplate: [{ type: ContentChild, args: [NgFooterTemplateDirective, { read: TemplateRef },] }],
    notFoundTemplate: [{ type: ContentChild, args: [NgNotFoundTemplateDirective, { read: TemplateRef },] }],
    typeToSearchTemplate: [{ type: ContentChild, args: [NgTypeToSearchTemplateDirective, { read: TemplateRef },] }],
    loadingTextTemplate: [{ type: ContentChild, args: [NgLoadingTextTemplateDirective, { read: TemplateRef },] }],
    tagTemplate: [{ type: ContentChild, args: [NgTagTemplateDirective, { read: TemplateRef },] }],
    dropdownPanel: [{ type: ViewChild, args: [forwardRef((/**
                 * @return {?}
                 */
                () => NgDropdownPanelComponent)),] }],
    ngOptions: [{ type: ContentChildren, args: [NgOptionComponent, { descendants: true },] }],
    filterInput: [{ type: ViewChild, args: ['filterInput',] }],
    disabled: [{ type: HostBinding, args: ['class.ng-select-disabled',] }],
    filtered: [{ type: HostBinding, args: ['class.ng-select-filtered',] }],
    handleKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgSelectComponent.prototype.bindLabel;
    /** @type {?} */
    NgSelectComponent.prototype.bindValue;
    /** @type {?} */
    NgSelectComponent.prototype.clearable;
    /** @type {?} */
    NgSelectComponent.prototype.markFirst;
    /** @type {?} */
    NgSelectComponent.prototype.placeholder;
    /** @type {?} */
    NgSelectComponent.prototype.notFoundText;
    /** @type {?} */
    NgSelectComponent.prototype.typeToSearchText;
    /** @type {?} */
    NgSelectComponent.prototype.addTagText;
    /** @type {?} */
    NgSelectComponent.prototype.loadingText;
    /** @type {?} */
    NgSelectComponent.prototype.clearAllText;
    /** @type {?} */
    NgSelectComponent.prototype.dropdownPosition;
    /** @type {?} */
    NgSelectComponent.prototype.appendTo;
    /** @type {?} */
    NgSelectComponent.prototype.loading;
    /** @type {?} */
    NgSelectComponent.prototype.closeOnSelect;
    /** @type {?} */
    NgSelectComponent.prototype.hideSelected;
    /** @type {?} */
    NgSelectComponent.prototype.selectOnTab;
    /** @type {?} */
    NgSelectComponent.prototype.openOnEnter;
    /** @type {?} */
    NgSelectComponent.prototype.maxSelectedItems;
    /** @type {?} */
    NgSelectComponent.prototype.groupBy;
    /** @type {?} */
    NgSelectComponent.prototype.groupValue;
    /** @type {?} */
    NgSelectComponent.prototype.bufferAmount;
    /** @type {?} */
    NgSelectComponent.prototype.virtualScroll;
    /** @type {?} */
    NgSelectComponent.prototype.selectableGroup;
    /** @type {?} */
    NgSelectComponent.prototype.selectableGroupAsModel;
    /** @type {?} */
    NgSelectComponent.prototype.searchFn;
    /** @type {?} */
    NgSelectComponent.prototype.excludeGroupsFromDefaultSelection;
    /** @type {?} */
    NgSelectComponent.prototype.clearOnBackspace;
    /** @type {?} */
    NgSelectComponent.prototype.labelForId;
    /** @type {?} */
    NgSelectComponent.prototype.autoCorrect;
    /** @type {?} */
    NgSelectComponent.prototype.autoCapitalize;
    /** @type {?} */
    NgSelectComponent.prototype.typeahead;
    /** @type {?} */
    NgSelectComponent.prototype.multiple;
    /** @type {?} */
    NgSelectComponent.prototype.addTag;
    /** @type {?} */
    NgSelectComponent.prototype.searchable;
    /** @type {?} */
    NgSelectComponent.prototype.isOpen;
    /** @type {?} */
    NgSelectComponent.prototype.blurEvent;
    /** @type {?} */
    NgSelectComponent.prototype.focusEvent;
    /** @type {?} */
    NgSelectComponent.prototype.changeEvent;
    /** @type {?} */
    NgSelectComponent.prototype.openEvent;
    /** @type {?} */
    NgSelectComponent.prototype.closeEvent;
    /** @type {?} */
    NgSelectComponent.prototype.searchEvent;
    /** @type {?} */
    NgSelectComponent.prototype.clearEvent;
    /** @type {?} */
    NgSelectComponent.prototype.addEvent;
    /** @type {?} */
    NgSelectComponent.prototype.removeEvent;
    /** @type {?} */
    NgSelectComponent.prototype.scroll;
    /** @type {?} */
    NgSelectComponent.prototype.scrollToEnd;
    /** @type {?} */
    NgSelectComponent.prototype.optionTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.optgroupTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.labelTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.multiLabelTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.headerTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.footerTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.notFoundTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.typeToSearchTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.loadingTextTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.tagTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.dropdownPanel;
    /** @type {?} */
    NgSelectComponent.prototype.ngOptions;
    /** @type {?} */
    NgSelectComponent.prototype.filterInput;
    /** @type {?} */
    NgSelectComponent.prototype.disabled;
    /** @type {?} */
    NgSelectComponent.prototype.itemsList;
    /** @type {?} */
    NgSelectComponent.prototype.viewPortItems;
    /** @type {?} */
    NgSelectComponent.prototype.filterValue;
    /** @type {?} */
    NgSelectComponent.prototype.dropdownId;
    /** @type {?} */
    NgSelectComponent.prototype.element;
    /** @type {?} */
    NgSelectComponent.prototype.focused;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._items;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._itemsAreUsed;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._defaultLabel;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._primitive;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._manualOpen;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._pressedKeys;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._compareWith;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._clearSearchOnAdd;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._destroy$;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._keyPress$;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._onTouched;
    /** @type {?} */
    NgSelectComponent.prototype.clearItem;
    /** @type {?} */
    NgSelectComponent.prototype.classes;
    /** @type {?} */
    NgSelectComponent.prototype.tabIndex;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype.autoFocus;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._cd;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._console;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgOptionHighlightDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.element = this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this._canHighlight) {
            this._highlightLabel();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.label = this.element.innerHTML;
        if (this._canHighlight) {
            this._highlightLabel();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _highlightLabel() {
        /** @type {?} */
        const label = this.label;
        if (!this.term) {
            this._setInnerHtml(label);
            return;
        }
        /** @type {?} */
        const indexOfTerm = stripSpecialChars(label)
            .toLowerCase()
            .indexOf(stripSpecialChars(this.term).toLowerCase());
        if (indexOfTerm > -1) {
            this._setInnerHtml(label.substring(0, indexOfTerm)
                + `<span class="highlighted">${label.substr(indexOfTerm, this.term.length)}</span>`
                + label.substring(indexOfTerm + this.term.length, label.length));
        }
        else {
            this._setInnerHtml(label);
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _canHighlight() {
        return isDefined(this.term) && isDefined(this.label);
    }
    /**
     * @private
     * @param {?} html
     * @return {?}
     */
    _setInnerHtml(html) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    }
}
NgOptionHighlightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngOptionHighlight]'
            },] }
];
/** @nocollapse */
NgOptionHighlightDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NgOptionHighlightDirective.propDecorators = {
    term: [{ type: Input, args: ['ngOptionHighlight',] }]
};
if (false) {
    /** @type {?} */
    NgOptionHighlightDirective.prototype.term;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.label;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = DefaultSelectionModelFactory;
class NgSelectModule {
}
NgSelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgDropdownPanelComponent,
                    NgOptionComponent,
                    NgSelectComponent,
                    NgOptionHighlightDirective,
                    NgOptgroupTemplateDirective,
                    NgOptionTemplateDirective,
                    NgLabelTemplateDirective,
                    NgMultiLabelTemplateDirective,
                    NgHeaderTemplateDirective,
                    NgFooterTemplateDirective,
                    NgNotFoundTemplateDirective,
                    NgTypeToSearchTemplateDirective,
                    NgLoadingTextTemplateDirective,
                    NgTagTemplateDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    NgSelectComponent,
                    NgOptionComponent,
                    NgOptionHighlightDirective,
                    NgOptgroupTemplateDirective,
                    NgOptionTemplateDirective,
                    NgLabelTemplateDirective,
                    NgMultiLabelTemplateDirective,
                    NgHeaderTemplateDirective,
                    NgFooterTemplateDirective,
                    NgNotFoundTemplateDirective,
                    NgTypeToSearchTemplateDirective,
                    NgLoadingTextTemplateDirective,
                    NgTagTemplateDirective
                ],
                providers: [
                    { provide: SELECTION_MODEL_FACTORY, useValue: ɵ0 }
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PluginManagerService {
    constructor() {
        this.loaded = false;
        this.pluginManager = iNet.PluginManager;
        this.plugins = {};
        // Observable sources
        this.subject = new Subject$2();
        return PluginManagerService.instance = PluginManagerService.instance || this;
    }
    /**
     * @param {?} pluginId
     * @param {?} component
     * @return {?}
     */
    register(pluginId, component) {
        this.plugins[pluginId] = component;
    }
    /**
     * @param {?} pluginId
     * @return {?}
     */
    destroyById(pluginId) {
        this.clearMessage(); // clear all
        delete this.plugins[pluginId];
    }
    /**
     * @return {?}
     */
    getPlugins() {
        return this.plugins;
    }
    /**
     * @param {?} pluginId
     * @return {?}
     */
    hasPluginId(pluginId) {
        return this.plugins.hasOwnProperty(pluginId);
    }
    /**
     * @param {?} pluginId
     * @return {?}
     */
    getPluginById(pluginId) {
        return this.plugins[pluginId];
    }
    /**
     * @param {?} message
     * @param {?} contentWindow
     * @return {?}
     */
    sendMessageTo(message, contentWindow) {
        if (this.pluginManager) {
            this.pluginManager.sendMessageTo(message, contentWindow);
            // console.log('[PluginManagerService]--sendMessage--', message);
        }
    }
    /**
     * @return {?}
     */
    listen() {
        if (!this.pluginManager) {
            console.warn(`\tCould not find PluginManager, plugins may not work as expected. Please update to the latest version of iNet Core.
            For more info refer to: http://cdn.inetcloud.vn/data/api/lib/inet-core.min.js`);
        }
        else if (!this.loaded) {
            // console.log('Listen to message from window of Unicorn');
            console.log('PluginManager is listening on ' + window.origin);
            this.pluginManager.bindEvent(window, 'message', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                console.log('[PluginManager Recieve]--message--', e);
                this.sendMessage(e); // call to feed values
            }).bind(this));
            this.loaded = true;
        }
    }
    /**
     * @return {?}
     */
    getMessage() {
        return this.subject.asObservable();
    }
    /**
     * @return {?}
     */
    clearMessage() {
        this.subject.next();
    }
    /**
     * @param {?} pluginId
     * @return {?}
     */
    getContentWindowById(pluginId) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const iframe = document.getElementById(pluginId);
                resolve(iframe ? iframe['contentWindow'] || iframe['contentDocument'] : null);
            }));
        }));
    }
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    sendMessage(message) {
        // console.log('[PluginManager Send messages to component]--message--', message);
        this.subject.next(message);
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
        (p, key) => p.set(key, (obj[key] === undefined || iNet.isObject(obj[key])) ? '' : obj[key])), new HttpParams());
    }
    /*
           loadById(pluginId: string, targetId: string, params?: any | null) {
    
               const me = this;
               let url = iNet.getPUrl(`common/page/plugins/${pluginId}`);
               if (params) {
                   url = iNet.urlAppend(url, this.convertToHttpParams(params).toString());
               }
               const client = new XMLHttpRequest();
               client.onload = function () {
                   if (!!this.responseText) {
                       // console.log(this.responseText, me);
                       me.createDynamicPluginTemplate(pluginId, this.responseText, targetId);
                   }
               };
               client.open('GET', url, true);
               client.send();
    
        }
        */
    /*
        executeScripts(html: string) {
            const $el = $('<template></template>').html(html);
            const $scripts = $el.find('script');
            for (let i = 0; i < $scripts.length; i++) {
                const $script = $($scripts[i]);
                const newScript = document.createElement('script');
                if (!!$script.attr('src')) { // external scripts
                    newScript.src = $script.attr('src');
                } else { // inline script
                    const inlineScript = document.createTextNode($script[0].innerHTML);
                    newScript.appendChild(inlineScript);
                }
                document.documentElement.appendChild(newScript);
            }
        }
        */
    /**
     * @param {?} pluginId
     * @param {?} targetId
     * @return {?}
     */
    testCreatePluginTemplate(pluginId, targetId) {
        /*
        const html = `
            <script>console.log("execute inline script");</script>
            <b>HTML and Javascript Content</b>
            <script src="http://cdn.inetcloud.vn/data/api/lib/test/test.js"></script>
        `;

        this.createDynamicPluginTemplate(pluginId, html, targetId);
        */
        // this.executeScripts(html);
    }
}
PluginManagerService.instance = null;
PluginManagerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PluginManagerService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    PluginManagerService.instance;
    /**
     * @type {?}
     * @private
     */
    PluginManagerService.prototype.loaded;
    /** @type {?} */
    PluginManagerService.prototype.pluginManager;
    /**
     * @type {?}
     * @private
     */
    PluginManagerService.prototype.plugins;
    /**
     * @type {?}
     * @private
     */
    PluginManagerService.prototype.subject;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CloudPluginComponent {
    /**
     * @param {?} coreService
     * @param {?} pluginManagerService
     */
    constructor(coreService, pluginManagerService) {
        this.coreService = coreService;
        this.pluginManagerService = pluginManagerService;
        this.params = {};
        this.autoHeight = false;
        this.load = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.pluginManagerService.register(this.pluginId, this);
        if (!iNet.isEmptyObject(this.params)) {
            // const __params = this.pluginManagerService.convertToHttpParams(this.params).toString();
            /** @type {?} */
            const __params = this.pluginManagerService.convertToHttpParams({
                application: this.params['application'],
                secrd: this.params['queryStr']
            }).toString();
            this.url = iNet.urlAppend(this.url, __params);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.pluginManagerService.destroyById(this.pluginId);
        // console.log('[CloudPluginComponent]--ngOnDestroy--', this.pluginId);
    }
    /**
     * @private
     * @return {?}
     */
    getContentWindow() {
        return this.pluginManagerService.getContentWindowById(this.pluginId);
    }
    /**
     * @return {?}
     */
    reload() {
        this.getContentWindow().then((/**
         * @param {?} contentWindow
         * @return {?}
         */
        contentWindow => {
            if (contentWindow && this.coreService.getEnvironment().production) {
                contentWindow['location'].reload(true);
            }
        }));
    }
    /**
     * @return {?}
     */
    resize() {
        // console.log('[resize]');
        if (this.autoHeight && this.coreService.getEnvironment().production) {
            this.getContentWindow().then((/**
             * @param {?} contentWindow
             * @return {?}
             */
            contentWindow => {
                if (contentWindow) {
                    /** @type {?} */
                    const height = contentWindow['document']['body']['offsetHeight'] || contentWindow['document']['body']['scrollHeight'];
                    if (height) {
                        document.getElementById(this.pluginId).style.height = `${height}px`;
                    }
                }
            }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onLoad($event) {
        if (document.getElementById(this.pluginId)) {
            this.getContentWindow().then((/**
             * @param {?} contentWindow
             * @return {?}
             */
            contentWindow => {
                if (contentWindow) {
                    this.resize();
                    // The plugin has finished loading
                    // console.log('[onLoad]--pluginId', this.pluginId, contentWindow);
                    // this.pluginManagerService.sendMessageTo({pluginId: this.pluginId, eventName: 'loaded'}, contentWindow);
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.pluginManagerService.sendMessageTo({ pluginId: this.pluginId, eventName: 'loaded' }, contentWindow);
                    }), 100);
                }
            }));
        }
    }
}
CloudPluginComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-cloud-plugin',
                template: `<iframe *ngIf="pluginId && url" id="{{pluginId}}" [src]="url | safe" (load)="onLoad($event)"></iframe>`,
                styles: [`
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `]
            }] }
];
/** @nocollapse */
CloudPluginComponent.ctorParameters = () => [
    { type: CoreService },
    { type: PluginManagerService }
];
CloudPluginComponent.propDecorators = {
    pluginId: [{ type: Input }],
    url: [{ type: Input }],
    params: [{ type: Input }],
    autoHeight: [{ type: Input }],
    load: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CloudPluginComponent.prototype.pluginId;
    /** @type {?} */
    CloudPluginComponent.prototype.url;
    /** @type {?} */
    CloudPluginComponent.prototype.params;
    /** @type {?} */
    CloudPluginComponent.prototype.autoHeight;
    /** @type {?} */
    CloudPluginComponent.prototype.load;
    /**
     * @type {?}
     * @private
     */
    CloudPluginComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    CloudPluginComponent.prototype.pluginManagerService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PluginToolbarDirective {
    // The name of the field, Defaults to 'toolbar'.
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} coreService
     * @param {?} notifyService
     * @param {?} pluginManagerService
     */
    constructor(el, renderer, coreService, notifyService, pluginManagerService) {
        this.el = el;
        this.renderer = renderer;
        this.coreService = coreService;
        this.notifyService = notifyService;
        this.pluginManagerService = pluginManagerService;
        this.idProperty = 'toolbar'; // The name of the field, Defaults to 'toolbar'.
        // console.log('[PluginToolbarDirective]constructor');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // console.log('[PluginToolbarDirective]ngOnInit');
        // subscribe messages
        this.subscription = this.pluginManagerService.getMessage().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        message => {
            if (!message) {
                return;
            }
            this.message = message || {};
            /** @type {?} */
            const data = this.message['data'] || {};
            // console.log('data', data, this.getIdProperty(), data.hasOwnProperty(this.getIdProperty()));
            if (data.hasOwnProperty(this.getIdProperty())) {
                /** @type {?} */
                const toolbar = data[this.getIdProperty()] || [];
                /** @type {?} */
                let pluginId = data['pluginId'];
                // console.log('[PluginToolbarDirective]--pluginId--', pluginId);
                /** @type {?} */
                let container;
                if (this.coreService.getEnvironment().production && this.message.source) { // production
                    if (this.message.source.frameElement) {
                        pluginId = this.message.source.frameElement.id;
                        if (pluginId) {
                            container = this.initContainerById(pluginId);
                            if (window.origin === this.message.source.origin && this.pluginManagerService.hasPluginId(pluginId)) {
                                this.generateToolbar(container, toolbar);
                                this.notificationDetectByData(data);
                            }
                        }
                        else {
                            console.warn(`Could not find plugin id`);
                        }
                    }
                }
                else { // For testing with localhost
                    if (pluginId && this.pluginManagerService.hasPluginId(pluginId)) {
                        container = this.initContainerById(pluginId);
                        this.generateToolbar(container, toolbar);
                    }
                    this.notificationDetectByData(data);
                }
            }
        }));
    }
    /**
     * @private
     * @param {?=} data
     * @return {?}
     */
    notificationDetectByData(data = {}) {
        if (data.hasOwnProperty('notify')) {
            const { title, type, msg } = data['notify'];
            this.notifyService.showMessage(msg, type, title);
        }
    }
    /**
     * @return {?}
     */
    getIdProperty() {
        return this.idProperty;
    }
    /**
     * @return {?}
     */
    clear() {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
    }
    /**
     * @param {?} pluginId
     * @return {?}
     */
    initContainerById(pluginId) {
        /** @type {?} */
        const prefix = `plugin-${this.getIdProperty()}-${pluginId}-`;
        /** @type {?} */
        const containerId = prefix + 'container';
        /** @type {?} */
        let element = document.getElementById(containerId);
        /** @type {?} */
        let exists = false;
        if (element) {
            element.innerHTML = '';
            exists = true;
        }
        else {
            element = this.renderer.createElement('span');
            this.renderer.setProperty(element, 'id', containerId);
            // this.renderer.setProperty(element, 'innerHTML', '');
        }
        return new ToolbarContainer(prefix, pluginId, element, exists);
    }
    /**
     * @param {?} container
     * @param {?=} buttons
     * @return {?}
     */
    generateToolbar(container, buttons = []) {
        /** @type {?} */
        const pluginId = container.pluginId;
        /** @type {?} */
        const plugin = this.pluginManagerService.getPluginById(pluginId);
        if (plugin && plugin.resize) {
            plugin.resize();
        }
        for (const button of buttons) {
            if (button) {
                /** @type {?} */
                const buttonEl = this.renderer.createElement('button');
                /** @type {?} */
                const buttonId = container.prefix + button['id'];
                this.renderer.setProperty(buttonEl, 'id', buttonId);
                this.renderer.addClass(buttonEl, 'btn');
                this.renderer.addClass(buttonEl, 'btn-sm');
                this.renderer.addClass(buttonEl, 'ml-1');
                /** @type {?} */
                const classes = (button['cls'] || '').split(' ');
                for (const cls of classes) {
                    this.renderer.addClass(buttonEl, cls);
                }
                /** @type {?} */
                const iconEl = this.renderer.createElement('i');
                /** @type {?} */
                const iconClasses = (button['iconCls'] || '').split(' ');
                for (const iconCls of iconClasses) {
                    this.renderer.addClass(iconEl, iconCls);
                }
                /** @type {?} */
                const text = this.renderer.createText(' ' + button['text'] || '');
                this.renderer.listen(buttonEl, 'click', (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    // console.log('[' + pluginId + '] plugin call ' + button['eventName']);
                    this.pluginManagerService.getContentWindowById(pluginId).then((/**
                     * @param {?} contentWindow
                     * @return {?}
                     */
                    contentWindow => {
                        if (contentWindow) {
                            this.pluginManagerService.sendMessageTo({ id: buttonId, pluginId: pluginId, eventName: button['eventName'] }, contentWindow);
                        }
                    }));
                }));
                this.renderer.appendChild(buttonEl, iconEl);
                this.renderer.appendChild(buttonEl, text);
                this.renderer.appendChild(container.element, buttonEl);
            }
        }
        if (!container.exists) {
            this.renderer.appendChild(this.el.nativeElement, container.element);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clear();
        // console.log('[PluginToolbarDirective]destroy');
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
PluginToolbarDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appPluginToolbar]'
            },] }
];
/** @nocollapse */
PluginToolbarDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: CoreService },
    { type: NotificationService },
    { type: PluginManagerService }
];
PluginToolbarDirective.propDecorators = {
    idProperty: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PluginToolbarDirective.prototype.message;
    /** @type {?} */
    PluginToolbarDirective.prototype.subscription;
    /** @type {?} */
    PluginToolbarDirective.prototype.idProperty;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.notifyService;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.pluginManagerService;
}
class ToolbarContainer {
    /**
     * @param {?} prefix
     * @param {?} pluginId
     * @param {?} element
     * @param {?} exists
     */
    constructor(prefix, pluginId, element, exists) {
        this.prefix = prefix;
        this.pluginId = pluginId;
        this.element = element;
        this.exists = exists;
    }
}
if (false) {
    /** @type {?} */
    ToolbarContainer.prototype.pluginId;
    /** @type {?} */
    ToolbarContainer.prototype.element;
    /** @type {?} */
    ToolbarContainer.prototype.prefix;
    /** @type {?} */
    ToolbarContainer.prototype.exists;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PluginManagerModule {
    /**
     * @param {?} pluginManagerService
     */
    constructor(pluginManagerService) {
        this.pluginManagerService = pluginManagerService;
        this.pluginManagerService.listen();
    }
}
PluginManagerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CloudPluginComponent, PluginToolbarDirective],
                imports: [
                    CommonModule,
                    SafePipeModule
                ],
                exports: [CloudPluginComponent, PluginToolbarDirective],
                providers: [PluginManagerService, CoreService, NotificationService]
            },] }
];
/** @nocollapse */
PluginManagerModule.ctorParameters = () => [
    { type: PluginManagerService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PluginManagerModule.prototype.pluginManagerService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CustomPaginationComponent {
    constructor() {
        this.pageSize = 10;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.firstLoad = true;
        this.params = {};
        this.pageCount = 0;
        this.onLoad = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.processOnTotalChanged();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.firstLoad) {
            this.load();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToFirstPage(event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToLastPage(event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToNextPage(event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToPreviousPage(event) {
        if (this.pageNumber > 1) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToCurrentPage(event) {
        this.pageNumber = event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        event.currentTarget.value = this.pageNumber;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @return {?}
     */
    get maxPage() {
        return Math.ceil(this.totalItems / this.pageSize);
    }
    /**
     * @return {?}
     */
    getQuery() {
        /** @type {?} */
        let query = {
            pageNumber: (this.pageNumber < 1) ? 0 : this.pageNumber - 1,
            pageSize: this.pageSize
        };
        query = Object.assign({}, this.getParams(), query);
        return query;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setTotalItems(v) {
        this.totalItems = v;
        this.processOnTotalChanged();
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    setParams(params = {}) {
        this.params = params;
    }
    /**
     * @return {?}
     */
    getParams() {
        return this.params || {};
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    reload(event) {
        this.onLoad.emit(this.getQuery());
    }
    /**
     * @return {?}
     */
    load() {
        /** @type {?} */
        let query = { newPage: 1, pageSize: this.pageSize };
        query = Object.assign({}, this.getParams(), query);
        this.processOnPaginationChanged(null, query);
    }
    /**
     * @param {?=} event
     * @param {?=} pageNumber
     * @return {?}
     */
    onPageChanged(event, pageNumber) {
        this.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: -1 });
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    processOnPaginationChanged(event, args) {
        this.pageNumber = args.newPage;
        this.onLoad.emit(this.getQuery());
        return 'onPaginationChanged';
    }
    /**
     * @return {?}
     */
    processOnTotalChanged() {
        this.pageCount = this.maxPage || 0;
        this.pageNumber = this.pageCount > 0 ? 1 : 0;
        this.query = this.getQuery();
    }
}
CustomPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-custom-pagination',
                template: "<div class=\"pagination-box\">\n    <div class=\"pagination-range\">\n        <ng-template [ngTemplateOutlet]=\"basicSearch\"></ng-template>\n    </div>\n    <div class=\"pagination-controllers\">\n        <div class=\"pagination-pages mr-1\" >\n            <button [disabled]=\"pageNumber === 1 || totalItems === 0\" class=\"btn btn-sm btn-default pagination-firstpage\"\n                    [title]=\"'grid.firstText' | translate\"\n                    (click)=\"changeToFirstPage($event)\">\n                <i class=\"fa fa-step-backward\"></i>\n            </button>\n            <button [disabled]=\"pageNumber === 1 || totalItems === 0\" class=\"btn btn-sm btn-default pagination-prevpage ml-1\"\n                    [title]=\"'grid.prevText' | translate\"\n                    (click)=\"changeToPreviousPage($event)\">\n                <i class=\"fa fa-chevron-left\"></i>\n            </button>\n            <div class=\"pagination-page ml-1\" >\n                <div class=\"input-group input-group-sm\">\n                    <input #pageInput value=\"{{pageNumber}}\" [disabled]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\" type=\"number\" class=\"form-control\" min=\"0\" step=\"1\"/>\n                    <div class=\"input-group-append\">\n                        <span class=\"input-group-text\"><span>/</span><span>{{pageCount}}</span></span>\n                    </div>\n                </div>\n            </div>\n            <button [disabled]=\"pageNumber === pageCount || totalItems === 0\" class=\"btn btn-sm btn-default pagination-nextpage ml-1\"\n                    [title]=\"'grid.nextText' | translate\"\n                    (click)=\"changeToNextPage($event)\">\n                <i class=\"fa fa-chevron-right\"></i>\n            </button>\n            <button [disabled]=\"pageNumber === pageCount || totalItems === 0\"  (click)=\"changeToLastPage($event)\"\n                    [title]=\"'grid.lastText' | translate\"\n                    class=\"btn btn-sm btn-default pagination-lastpage ml-1\">\n                <i class=\"fa fa-step-forward\"></i>\n            </button>\n            <button   [title]=\"'grid.refreshText' | translate\"  (click)=\"reload($event)\" type=\"button\" class=\"btn btn-sm btn-default pagination-reload ml-1\">\n                <i class=\"fa fa-refresh\"></i>\n            </button>\n        </div>\n    </div>\n    <ng-template [ngTemplateOutlet]=\"advanceSearch\"></ng-template>\n</div>\n",
                styles: [".pagination-box{position:relative;display:block;min-height:37px;background-color:#e9ecef;border:1px solid #ced4da;padding:2px}.pagination-range{margin-left:3px;display:inline-block;max-width:calc(100vw - 35%)}.pagination-controllers{float:right}.pagination-controllers input{min-width:60px;text-align:right;max-width:80px}.pagination-limit{margin-right:10px;display:inline-table;width:180px;float:left}.pagination-pages{display:inline-block}.pagination-page{display:inline-table}.pagination-box button{outline:0!important}.column-selector-button,.pagination-firstpage,.pagination-lastpage,.pagination-nextpage,.pagination-prevpage,.pagination-reload{vertical-align:top}"]
            }] }
];
/** @nocollapse */
CustomPaginationComponent.ctorParameters = () => [];
CustomPaginationComponent.propDecorators = {
    pageSize: [{ type: Input, args: ["pageSize",] }],
    pageNumber: [{ type: Input, args: ["pageNumber",] }],
    totalItems: [{ type: Input, args: ["totalItems",] }],
    firstLoad: [{ type: Input, args: ["firstLoad",] }],
    params: [{ type: Input, args: ["params",] }],
    basicSearch: [{ type: ContentChild, args: ['basicSearch',] }],
    advanceSearch: [{ type: ContentChild, args: ['advanceSearch',] }],
    onLoad: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CustomPaginationComponent.prototype.pageSize;
    /** @type {?} */
    CustomPaginationComponent.prototype.pageNumber;
    /** @type {?} */
    CustomPaginationComponent.prototype.totalItems;
    /** @type {?} */
    CustomPaginationComponent.prototype.firstLoad;
    /** @type {?} */
    CustomPaginationComponent.prototype.params;
    /** @type {?} */
    CustomPaginationComponent.prototype.basicSearch;
    /** @type {?} */
    CustomPaginationComponent.prototype.advanceSearch;
    /** @type {?} */
    CustomPaginationComponent.prototype.query;
    /** @type {?} */
    CustomPaginationComponent.prototype.pageCount;
    /** @type {?} */
    CustomPaginationComponent.prototype.onLoad;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CustomPaginationModule {
}
CustomPaginationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CustomPaginationComponent],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    TranslateModule
                ],
                exports: [CustomPaginationComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const EXT_HASH_ALG = {
    SHA1: "SHA1",
    SHA256: "SHA256",
};
/** @enum {string} */
const EXT_ACTION = {
    EXIT: "EXIT",
    GET_INFO: "GET_INFO",
    GET_CERTS: "GET_CERTS",
    SIGN_HASH: "SIGN_HASH",
};
/** @type {?} */
const NATIVE_APP_URL = "http://download.inetcloud.vn/download/products/token-signer/token-signer-latest.msi";
/** @type {?} */
const EXT_CHROME_URL = "https://chrome.google.com/webstore/detail/oambjgnagjajdpefjbmnoahbbbggfnin";
/** @type {?} */
const EXT_FIREFOX_URL = "";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CertUtils {
    /**
     * @param {?} subject
     * @return {?}
     */
    static parseCertString(subject) {
        /** @type {?} */
        const data = {};
        subject.split(',').forEach((/**
         * @param {?} str
         * @return {?}
         */
        (str) => {
            /** @type {?} */
            const values = str.trim().split('=');
            if (data[values[0]]) {
                data[values[0]] += ', ' + values[1];
            }
            else {
                data[values[0]] = values[1];
            }
        }));
        return data;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebTokenSigner {
    constructor() {
        this.isChrome = /Google Inc/.test(navigator.vendor);
        this.isFirefox = /Firefox/.test(navigator.userAgent);
        this.isWindows = navigator.platform.indexOf('Win') > -1;
        this.osSupported = this.isWindows;
        this.browserSupported = this.isChrome || this.isFirefox;
        this.appInstalled = false;
        this.appInfo = {
            version: null,
            nativeVersion: null,
            nativeLatestVersion: null
        };
        this.textOsUnSupport = 'Tính năng đang hỗ trợ cho máy tính dùng Windows';
        this.textBrowserUnSupport = 'Tính năng đang hỗ trợ cho Chrome và FireFox';
        this.textExtNotInstalled = `
    Cần cài đặt extension <a href="${this.isChrome ? EXT_CHROME_URL : EXT_FIREFOX_URL}" target="_blank">TokenSigner</a> trên trình duyệt Web
    `;
        this.textAppNotInstalled = `
    Cần cài đặt ứng dụng ký <a href="${NATIVE_APP_URL}" target="_blank">TokenSigner</a> trên máy tính
    `;
        this.title = "Chứng thư số";
        this.description = "Chọn chứng thư số để ký";
        this.textOk = 'Đồng ý';
        this.textCancel = 'Đóng';
        this.certNotFound = 'Không tìm thấy chứng thư số';
        this.textIssuer = 'Nhà cung cấp';
        this.textValid = 'Hiệu lực';
        this.zIndex = 1100;
        this._onEscapeKey = this._onEscapeKey.bind(this);
    }
    /**
     * @return {?}
     */
    get extInstalled() {
        return !!window['_ExtTokenBridge'];
    }
    ;
    /**
     * @param {?=} silent
     * @return {?}
     */
    checkReady(silent) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (this.appInstalled) {
                return resolve(true);
            }
            if (!this.osSupported) {
                if (!silent) {
                    this._createCertDialog(null, this.textOsUnSupport);
                }
                return resolve(false);
            }
            if (!this.browserSupported) {
                if (!silent) {
                    this._createCertDialog(null, this.textBrowserUnSupport);
                }
                return resolve(false);
            }
            if (!this.extInstalled) {
                if (!silent) {
                    this._createCertDialog(null, this.textExtNotInstalled);
                }
                return resolve(false);
            }
            this._loadAppInfo().then((/**
             * @return {?}
             */
            () => {
                if (!this.appInstalled && !silent) {
                    this._createCertDialog(null, this.textAppNotInstalled);
                }
                resolve(this.appInstalled);
            }));
        }));
    }
    /**
     * @return {?}
     */
    checkNativeUpdate() {
        return this.appInstalled && this.appInfo.nativeVersion < this.appInfo.nativeLatestVersion;
    }
    /**
     * @return {?}
     */
    loadCerts() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.checkReady(true).then((/**
             * @param {?} ready
             * @return {?}
             */
            (ready) => {
                if (ready) {
                    this._postExt(EXT_ACTION.GET_CERTS).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    (data) => {
                        /** @type {?} */
                        const certs = data && data.data || [];
                        certs.forEach((/**
                         * @param {?} cert
                         * @return {?}
                         */
                        cert => {
                            cert.subjectData = CertUtils.parseCertString(cert.subject);
                            cert.issuerData = CertUtils.parseCertString(cert.issuer);
                        }));
                        resolve(certs);
                    }));
                }
                else {
                    resolve([]);
                }
            }));
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signHash(data) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (data && (data.hash || data.hashs)) {
                this.checkReady().then((/**
                 * @param {?} ready
                 * @return {?}
                 */
                (ready) => {
                    if (ready) {
                        data.hashAlg = data.hashAlg || EXT_HASH_ALG.SHA1;
                        this._postExt(EXT_ACTION.SIGN_HASH, data).then(resolve);
                    }
                    else {
                        resolve(null);
                    }
                }));
            }
            else {
                resolve({
                    error: "HASH_MISSING"
                });
            }
        }));
    }
    /**
     * @param {?=} forceSelect
     * @return {?}
     */
    selectCert(forceSelect) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.checkReady().then((/**
             * @param {?} ready
             * @return {?}
             */
            (ready) => {
                if (ready) {
                    this.loadCerts().then((/**
                     * @param {?} certs
                     * @return {?}
                     */
                    (certs) => {
                        if (certs.length > 1 || forceSelect) {
                            this._certCallback = resolve;
                            this._createCertDialog(certs);
                        }
                        else {
                            resolve(certs[0]);
                        }
                    }));
                }
                else {
                    resolve(null);
                }
            }));
        }));
    }
    /**
     * @param {?} dateStr
     * @return {?}
     */
    dateDisplay(dateStr) {
        /** @type {?} */
        const date = new Date(dateStr);
        return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    }
    /**
     * @private
     * @param {?} action
     * @param {?=} data
     * @return {?}
     */
    _postExt(action, data) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (this.extInstalled) {
                window["_ExtTokenBridge"].postToExtension(action, data).then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    resolve(response);
                }));
            }
            else {
                resolve({
                    error: "EXTENSION_NOT_INSTALL"
                });
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _loadAppInfo() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this._postExt(EXT_ACTION.GET_INFO).then((/**
             * @param {?} reply
             * @return {?}
             */
            (reply) => {
                if (reply && reply.data) {
                    Object.assign(this.appInfo, reply.data);
                }
                this.appInstalled = !!this.appInfo.nativeVersion;
                resolve();
            }));
        }));
    }
    /**
     * @private
     * @param {?} certs
     * @param {?=} message
     * @return {?}
     */
    _createCertDialog(certs, message) {
        if (this._dialog) {
            return;
        }
        this._dialog = document.createElement('div');
        this._dialog.classList.add('webtoken-dialog');
        this._dialog.style.zIndex = this.zIndex;
        this._certs = certs;
        /** @type {?} */
        let msg;
        if (message) {
            msg = '<div class="webtoken-dialog__message">' + message + '</div>';
        }
        else {
            msg = certs.length < 1 ? `<div class="webtoken-dialog__message">${this.certNotFound}</div>` : this._buildCertHtml(certs);
        }
        this._dialog.innerHTML = `
        <style>
        .webtoken-dialog {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, .3);
        }
        .webtoken-dialog__container {
            width: 400px;
            margin: auto;
            background: #fff;
            overflow: hidden;
            color: #333;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            border-radius: 4px;
        }
        .webtoken-dialog__header {
            padding: 10px 15px;
            border-bottom: 1px solid #ddd;
        }
        .webtoken-dialog__title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .webtoken-dialog__desc {
            font-size: 14px;
            line-height: 20px;
        }
        .webtoken-dialog__close {
            float: right;
            width: 30px;
            cursor: pointer;
            text-align: center;
            line-height: 30px;
            margin: -5px 0;
            font-size: 20px;
        }
        .webtoken-dialog__body {
            max-height: 250px;
            overflow: auto;
            font-size: 14px;
            line-height: 20px;
        }
        .webtoken-dialog__message {
            padding: 20px;            
        }
        .webtoken-cert__item {
            padding: 10px 20px;
            cursor: pointer;
            line-height: 20px;
        }
        .webtoken-cert__item.active {
            background: #ddd !important;
        }
        .webtoken-cert__item:hover {
            background: #f5f5f5;
        }
        .webtoken-cert__title {
            font-size: 18px;
            margin-bottom: 2px;
        }
        .webtoken-cert__text {
            font-size: 14px;
        }
        .webtoken-dialog__footer {
            padding: 10px 20px;
            border-top: 1px solid #ddd;
            text-align: right;
        }
        .webtoken-dialog__button {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            min-width: 60px;
            margin-left: 10px;
            cursor: pointer;
            border-radius: 4px;
            font-weight: bold;
            background: #fff;
            border: 1px solid #ddd;
        }
        .webtoken-dialog__button:hover {
            opacity: 8;
        }
        .btn-ok {
            background: #007bff;
            border-color: #007bff;
            color: #fff;
        }
        </style>
        <div class="webtoken-dialog__container">
        <div class="webtoken-dialog__header">
        <div class="webtoken-dialog__close">×</div>
        <div class="webtoken-dialog__title">${this.title}</div>
        ${message ? '' : `<div class="webtoken-dialog__desc">${this.description}</div>`}
        </div>
        <div class="webtoken-dialog__body">${msg}</div>
        <div class="webtoken-dialog__footer">
        <button class="btn-close webtoken-dialog__button">${this.textCancel}</button>
        ${message ? '' : `<button class="btn-ok webtoken-dialog__button">${this.textOk}</button>`}
        </div>
        </div>
        `;
        /** @type {?} */
        const certEl = this._dialog.getElementsByClassName('webtoken-cert__item');
        // Close dialog
        this._dialog.addEventListener('click', (/**
         * @return {?}
         */
        () => this._closeDialog()));
        this._dialog.getElementsByClassName('webtoken-dialog__close')[0].addEventListener('click', (/**
         * @return {?}
         */
        () => this._closeDialog()));
        // Prevent close dialog
        this._dialog.getElementsByClassName('webtoken-dialog__container')[0].addEventListener('click', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.stopPropagation();
        }));
        this._dialog.getElementsByClassName('btn-close')[0].addEventListener('click', (/**
         * @return {?}
         */
        () => this._closeDialog()));
        if (certs && certs.length > 0) {
            // Ok select
            this._dialog.getElementsByClassName('btn-ok')[0].addEventListener('click', (/**
             * @return {?}
             */
            () => {
                if (this._certEl) {
                    /** @type {?} */
                    let index = Number(this._certEl.getAttribute('index'));
                    if (this._certs[index]) {
                        this._certCallback(this._certs[index]);
                    }
                }
                else {
                    this._certCallback(null);
                }
                this._closeDialog();
            }));
            // On click cert item
            for (let i = 0; i < certEl.length; i++) {
                certEl[i].addEventListener('click', (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => this._onClickCertEl(e)));
            }
            // Select first cert
            certEl[0].click();
        }
        // Esc key close dialog
        document.addEventListener('keydown', this._onEscapeKey);
        document.body.appendChild(this._dialog);
    }
    /**
     * @private
     * @param {?} certs
     * @return {?}
     */
    _buildCertHtml(certs) {
        /** @type {?} */
        let html = '';
        certs.forEach((/**
         * @param {?} cert
         * @param {?} index
         * @return {?}
         */
        (cert, index) => {
            html += `
            <div class="webtoken-cert__item" index="${index}">
            <div class="webtoken-cert__title">${cert.subjectData.CN}</div>
            <div class="webtoken-cert__text">${this.textIssuer}: ${cert.issuerData.CN}</div>
            <div class="webtoken-cert__text">${this.textValid}: ${this.dateDisplay(cert.validFrom)} - ${this.dateDisplay(cert.validTo)}</div>
            </div>
            `;
        }));
        return html;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    _onClickCertEl(e) {
        /** @type {?} */
        let certEl = this._findCerEl(e.target);
        if (certEl.classList.contains('active')) {
            return;
        }
        if (this._certEl) {
            this._certEl.classList.remove('active');
        }
        certEl.classList.add('active');
        this._certEl = certEl;
    }
    /**
     * @private
     * @param {?} certEl
     * @return {?}
     */
    _findCerEl(certEl) {
        if (!certEl.classList.contains('webtoken-cert__item')) {
            return this._findCerEl(certEl.parentNode);
        }
        return certEl;
    }
    /**
     * @private
     * @return {?}
     */
    _closeDialog() {
        document.body.removeChild(this._dialog);
        document.removeEventListener('keydown', this._onEscapeKey);
        this._dialog = null;
        this._certEl = null;
        this._certCallback = null;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    _onEscapeKey(e) {
        if (e.which === 27) {
            this._closeDialog();
        }
    }
}
if (false) {
    /** @type {?} */
    WebTokenSigner.prototype.isChrome;
    /** @type {?} */
    WebTokenSigner.prototype.isFirefox;
    /** @type {?} */
    WebTokenSigner.prototype.isWindows;
    /** @type {?} */
    WebTokenSigner.prototype.osSupported;
    /** @type {?} */
    WebTokenSigner.prototype.browserSupported;
    /** @type {?} */
    WebTokenSigner.prototype.appInstalled;
    /** @type {?} */
    WebTokenSigner.prototype.appInfo;
    /** @type {?} */
    WebTokenSigner.prototype.textOsUnSupport;
    /** @type {?} */
    WebTokenSigner.prototype.textBrowserUnSupport;
    /** @type {?} */
    WebTokenSigner.prototype.textExtNotInstalled;
    /** @type {?} */
    WebTokenSigner.prototype.textAppNotInstalled;
    /** @type {?} */
    WebTokenSigner.prototype.title;
    /** @type {?} */
    WebTokenSigner.prototype.description;
    /** @type {?} */
    WebTokenSigner.prototype.textOk;
    /** @type {?} */
    WebTokenSigner.prototype.textCancel;
    /** @type {?} */
    WebTokenSigner.prototype.certNotFound;
    /** @type {?} */
    WebTokenSigner.prototype.textIssuer;
    /** @type {?} */
    WebTokenSigner.prototype.textValid;
    /** @type {?} */
    WebTokenSigner.prototype.zIndex;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._certEl;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._certs;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._certCallback;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const JSEncrypt = JSEncrypt$1;
class TokenSimulator {
    /**
     * @param {?} action
     * @param {?=} data
     * @return {?}
     */
    static postToExtension(action, data) {
        /** @type {?} */
        const promise = new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            switch (action) {
                case EXT_ACTION.GET_INFO:
                    resolve({ data: {
                            version: '0.0.1',
                            nativeVersion: 1,
                            nativeLatestVersion: 1,
                        } });
                    break;
                case EXT_ACTION.SIGN_HASH:
                    this._sign(data, resolve);
                    break;
                case EXT_ACTION.GET_CERTS:
                    resolve({ data: this._certs });
                    break;
            }
        }));
        return promise;
    }
    /**
     * @param {?} data
     * @param {?} resolve
     * @return {?}
     */
    static _sign(data, resolve) {
        try {
            /** @type {?} */
            const cert = this._getCert(data.serial);
            /** @type {?} */
            const response = {
                serial: cert.serial,
                cert: cert.cert,
                hashAlg: data.hashAlg || EXT_HASH_ALG.SHA1
            };
            /** @type {?} */
            const jsEncrypt = new JSEncrypt(null);
            jsEncrypt.setPrivateKey(cert.pk);
            if (data.hashs) {
                response.signatures = [];
                data.hashs.forEach((/**
                 * @param {?} hash
                 * @return {?}
                 */
                (hash) => {
                    response.signatures.push(jsEncrypt.sign(hash, (/**
                     * @param {?} str
                     * @return {?}
                     */
                    (str) => this._base64toHEX(str)), data.hashAlg.toLocaleLowerCase()));
                }));
            }
            else {
                response.signature = jsEncrypt.sign(data.hash, (/**
                 * @param {?} str
                 * @return {?}
                 */
                (str) => {
                    return this._base64toHEX(str);
                }), data.hashAlg.toLocaleLowerCase());
            }
            resolve((/** @type {?} */ ({
                data: response
            })));
        }
        catch (e) {
            resolve((/** @type {?} */ ({
                error: "SIGN_ERROR",
                errorMsg: e.message
            })));
        }
    }
    /**
     * @param {?} serial
     * @return {?}
     */
    static _getCert(serial) {
        for (let i = 0; i < this._certs.length; i++) {
            if (this._certs[i].serial === serial) {
                return this._certs[i];
            }
        }
        return this._certs[0];
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    static _base64toHEX(base64) {
        /** @type {?} */
        var raw = atob(base64);
        /** @type {?} */
        var HEX = '';
        for (let i = 0; i < raw.length; i++) {
            /** @type {?} */
            var _hex = raw.charCodeAt(i).toString(16);
            HEX += (_hex.length == 2 ? _hex : '0' + _hex);
        }
        return HEX;
    }
}
TokenSimulator._certs = [
    {
        subject: "C=VN, ST=HCM, L=HCM, O=Calista, OU=Calista, , CN=iNet Solutions Corporation",
        issuer: "C=VN, CN=Viettel-CA, O=iNet, OU=iNet Solutions",
        validFrom: "2019-07-06",
        validTo: "2030-07-07",
        serial: "843F1DF405009A62",
        cert: "MIICezCCAeQCCQCEPx30BQCaYjANBgkqhkiG9w0BAQsFADCBgTELMAkGA1UEBhMC" +
            "Vk4xDDAKBgNVBAgMA0hDTTEMMAoGA1UEBwwDSENNMRAwDgYDVQQKDAdDYWxpc3Rh" +
            "MRAwDgYDVQQLDAdDYWxpc3RhMRAwDgYDVQQDDAdDYWxpc3RhMSAwHgYJKoZIhvcN" +
            "AQkBFhFpbmZvQGluZXRjbG91ZC52bjAeFw0xOTA3MDgwNjM2MDNaFw0yMDA3MDcw" +
            "NjM2MDNaMIGBMQswCQYDVQQGEwJWTjEMMAoGA1UECAwDSENNMQwwCgYDVQQHDANI" +
            "Q00xEDAOBgNVBAoMB0NhbGlzdGExEDAOBgNVBAsMB0NhbGlzdGExEDAOBgNVBAMM" +
            "B0NhbGlzdGExIDAeBgkqhkiG9w0BCQEWEWluZm9AaW5ldGNsb3VkLnZuMIGfMA0G" +
            "CSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxetXFs9aXIX89WX/cqc6pvAqfA1bSTwEC" +
            "Qchv7Te/gHQJanYXBPOCpihJwa9jnKnI/S6y5KK+A6Ud/xO3CS6XWrJkd2AfGv1B" +
            "o5of/4S3Y+AXiygimG9h/UOqZVgQQgkQbQd/c1uBEBznL0nvfZcUsTPI1DpDC9UK" +
            "ZiUEWsaCTQIDAQABMA0GCSqGSIb3DQEBCwUAA4GBAITGgS2WPloMGmY6Z2zYyS3y" +
            "as+/B59nevh6so3JRmFduQ1Qu9OwTWU0pySd4g/5ZpuUPZkhlUzFOX+VKOxYmqpr" +
            "4T2u9yXtNau94NYFPOpvzQGsEaR5OP14Oy2u/RXUoucPsZ1GPX8QggsOTK1I4xXs" +
            "sOVgB1hlg0hdAKFQuXTC",
        pk: "MIICXAIBAAKBgQCxetXFs9aXIX89WX/cqc6pvAqfA1bSTwECQchv7Te/gHQJanYX" +
            "BPOCpihJwa9jnKnI/S6y5KK+A6Ud/xO3CS6XWrJkd2AfGv1Bo5of/4S3Y+AXiygi" +
            "mG9h/UOqZVgQQgkQbQd/c1uBEBznL0nvfZcUsTPI1DpDC9UKZiUEWsaCTQIDAQAB" +
            "AoGAM3xy73uQUR+CjgWctiL8tPi8DA0n7rLElCcJQo8KkR9uihy8TUk+azRQk7UA" +
            "cGFOT+RC29q/62ebSuxoh7y+KuZObhNT2wkqE7cjbB97HlAgZrQOf4rYG+vGN3nB" +
            "a3ZIzGq/NK+lxmpY7ZvAnA4v3yUWUmSsmbD3c5v/LzBSWgECQQDj1RSkFs27anTb" +
            "HfKW2IDbDwL/l2zHPiRdd4v7DUlzhsoKEA/YgqSM+b/jsJ5i3JrKmqftFYvNhQUo" +
            "SDcBXxjhAkEAx2wXaNTknWP7rfF++AGcqh61lSLkxABMRqEKU1XbAihmHd5KZw3H" +
            "V+VgN4hoOhOLOyPF5E1nE9rdm4rkFcm67QJBAMFKeP2Rvy9+7O8tZC/oNMIk5UVV" +
            "Aduz9AQ8NU1kA2n49BY/dEIa7GISTWNt56I2STkUpt10xyww66Q2SDxoouECQDKq" +
            "CYB+pd4+qpBUjFdhwXWO+7758HjDQp2nCEKHy25O6TKpaOmpnH1+LuWs6B3pHTRX" +
            "ME2CRK/MqQR9UtkeOTkCQBV7PYWgWshl/vz6pvu4bDtIwL1IxAd4+Ig50gYHPZtG" +
            "whnZfWGcgraHy6W7GHhfskABTC9nm9DgdYLO6XpfvVQ="
    },
    {
        subject: "C=VN, ST=HCM, L=HCM, O=Vinaco, OU=Vinaco, CN=Vinaco Corporation",
        issuer: "C=VN, CN=Viettel-CA, O=iNet, OU=iNet Solutions",
        validFrom: "2019-07-06",
        validTo: "2030-07-07",
        serial: "99184098D6747AFA",
        cert: "MIICczCCAdwCCQCZGECY1nR6+jANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJW" +
            "TjEMMAoGA1UECAwDSENNMQwwCgYDVQQHDANIQ00xDzANBgNVBAoMBlZpbmFjbzEP" +
            "MA0GA1UECwwGVmluYWNvMQ8wDQYDVQQDDAZWaW5hY28xIDAeBgkqhkiG9w0BCQEW" +
            "EWluZm9AaW5ldGNsb3VkLnZuMB4XDTE5MDcwODA2MzQxMFoXDTIwMDcwNzA2MzQx" +
            "MFowfjELMAkGA1UEBhMCVk4xDDAKBgNVBAgMA0hDTTEMMAoGA1UEBwwDSENNMQ8w" +
            "DQYDVQQKDAZWaW5hY28xDzANBgNVBAsMBlZpbmFjbzEPMA0GA1UEAwwGVmluYWNv" +
            "MSAwHgYJKoZIhvcNAQkBFhFpbmZvQGluZXRjbG91ZC52bjCBnzANBgkqhkiG9w0B" +
            "AQEFAAOBjQAwgYkCgYEA3K8A4TKSOGQQepR0ZWPIdi0ABnLXtYKqUdS84XIvCbCD" +
            "60v7Rj8x/0YpLd99MMVfS1B3ZBF2XoCeE/qAg8BdtjSgnvHpyQX4vy9DRnKj56jJ" +
            "TR0PX5njeG3xpToXjubusB70LVDqDSNERsmBga66oBbIDOtQj58dm3Dms4cyfCcC" +
            "AwEAATANBgkqhkiG9w0BAQsFAAOBgQDPHQKecmW65R1Sng0A/HWHC71UvEGdshgK" +
            "fODIlICjo0bX3n67Eu+m+VRFCKjWas9bYoPLQRx2m2F0qkdiim3iuKZf+0wYvXBk" +
            "iDuPpoKG2Zq+aAFIh7H1qjgR34H96g3frl8dN5BQK4PFibrq24lxQuW2OvVwSOiz" +
            "bar1/bl+jw==",
        pk: "MIICWwIBAAKBgQDcrwDhMpI4ZBB6lHRlY8h2LQAGcte1gqpR1Lzhci8JsIPrS/tG" +
            "PzH/Rikt330wxV9LUHdkEXZegJ4T+oCDwF22NKCe8enJBfi/L0NGcqPnqMlNHQ9f" +
            "meN4bfGlOheO5u6wHvQtUOoNI0RGyYGBrrqgFsgM61CPnx2bcOazhzJ8JwIDAQAB" +
            "AoGAKKkJ5XQ24rL1IlC1/XRcHAIAji+ctPHFRdyHjJZIOmXOeI0AWBoOsTURI0WZ" +
            "QGItQ6gox0Q8Zf8WoSG3ig7odPEswLVqH/cr/0IsQ4yIMKlsw5JqizLq5Opcik61" +
            "dH6wpLjVrNRcv2h/JVvmKdAo5K+KEwZ8UNmmEZK5O5cAssECQQD1qubI7/y4OWwQ" +
            "PUYD9ZCocLWDLn34oBxN8ayNnLp/N4/D78jhpsDKSSPIcTFFSZVf4FplcEZS8f94" +
            "fikFZmKHAkEA5fcZkwad0z/w5OahX0YHFRe3vNt7up4KEocXXgVETM79Yp6tiMbE" +
            "+aEOtslBSfGAPiEIm46tXb9f0/ffid5hYQJAFm1uukNmf+8GFYlyfeQKO8ZmW75/" +
            "05XSX69DgH4hbIHHBy052pfdm9oHgUIMLHYmQ+V4ezA/y0y6dOaXmh2ZuwJAN815" +
            "UDsXyy5F51WrrPHSQCUMOfDMmmFFMm/DlNYUV8sWo3q7w2fwXl7dsi8t/6JxqyHa" +
            "89xwZ0JMH6STguIKoQJAV/UVZO/8kpxbygpR4jlyA4cSrbb7bId8fk421CXivjcI" +
            "JPRTHaTtJleJhITyPf48F/wwr0d62ENnuLLLv2QiRw=="
    }
];
if (false) {
    /** @type {?} */
    TokenSimulator._certs;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebTokenService {
    constructor() {
        this._signer = new WebTokenSigner();
    }
    /**
     * @return {?}
     */
    initForDevMode() {
        console.warn("Init WebTokenSigner for dev mode. Not used it in production mode");
        this._signer.appInstalled = true;
        if (!window["_ExtTokenBridge"]) {
            window["_ExtTokenBridge"] = TokenSimulator;
        }
    }
    /**
     * @return {?}
     */
    ready() {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.checkReady().then((/**
             * @param {?} supported
             * @return {?}
             */
            (supported) => subscriber.next(supported)));
        }));
    }
    /**
     * @param {?=} forceSelect
     * @return {?}
     */
    selectCert(forceSelect) {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.selectCert(forceSelect).then((/**
             * @param {?} cert
             * @return {?}
             */
            (cert) => subscriber.next(cert)));
        }));
    }
    /**
     * @param {?} serial
     * @return {?}
     */
    getCertBySerial(serial) {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this.loadCerts().subscribe((/**
             * @param {?} certs
             * @return {?}
             */
            (certs) => {
                for (let i = 0; i < certs.length; i++) {
                    if (certs[i].serial === serial) {
                        return subscriber.next(certs[i]);
                    }
                }
                subscriber.next(null);
            }));
        }));
    }
    /**
     * @param {?=} serial
     * @return {?}
     */
    selectCertUnlock(serial) {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (serial) {
                this.getCertBySerial(serial).subscribe((/**
                 * @param {?} cert
                 * @return {?}
                 */
                (cert) => this._unlockCert(cert, subscriber)));
            }
            else {
                this.selectCert().subscribe((/**
                 * @param {?} cert
                 * @return {?}
                 */
                (cert) => this._unlockCert(cert, subscriber)));
            }
        }));
    }
    /**
     * @private
     * @param {?} cert
     * @param {?} subscriber
     * @return {?}
     */
    _unlockCert(cert, subscriber) {
        if (cert) {
            this.unlockCert(cert).subscribe((/**
             * @param {?} unlocked
             * @return {?}
             */
            (unlocked) => {
                cert.unlocked = unlocked;
                subscriber.next(cert);
            }));
        }
        else {
            subscriber.next(cert);
        }
    }
    /**
     * @param {?} cert
     * @return {?}
     */
    unlockCert(cert) {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            // Sign fake data to unlock token
            /** @type {?} */
            const fakeData = {
                hash: "cA/metLrX7NUOfviDVsGYeRxAIo=",
                hashAlg: EXT_HASH_ALG.SHA1,
                serial: cert.serial
            };
            this.signHash(fakeData).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response && response.data && response.data.signature) {
                    subscriber.next(true);
                }
                else {
                    subscriber.next(false);
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    loadCerts() {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.loadCerts().then((/**
             * @param {?} data
             * @return {?}
             */
            (data) => subscriber.next(data)));
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signHash(data) {
        return Observable$1.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.signHash(data).then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => subscriber.next(response)));
        }));
    }
}
WebTokenService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebTokenService.prototype._signer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebTokenModule {
}
WebTokenModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [WebTokenService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ReplyData() { }
if (false) {
    /** @type {?|undefined} */
    ReplyData.prototype.error;
    /** @type {?|undefined} */
    ReplyData.prototype.errorMsg;
    /** @type {?|undefined} */
    ReplyData.prototype.data;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function SignedReplyData() { }
if (false) {
    /** @type {?|undefined} */
    SignedReplyData.prototype.data;
}
/**
 * @record
 */
function SignedData() { }
if (false) {
    /** @type {?|undefined} */
    SignedData.prototype.signature;
    /** @type {?|undefined} */
    SignedData.prototype.signatures;
    /** @type {?|undefined} */
    SignedData.prototype.serial;
    /** @type {?|undefined} */
    SignedData.prototype.cert;
    /** @type {?|undefined} */
    SignedData.prototype.hashAlg;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MessageSignHash() { }
if (false) {
    /** @type {?|undefined} */
    MessageSignHash.prototype.hash;
    /** @type {?|undefined} */
    MessageSignHash.prototype.hashs;
    /** @type {?|undefined} */
    MessageSignHash.prototype.hashAlg;
    /** @type {?|undefined} */
    MessageSignHash.prototype.serial;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CertData() { }
if (false) {
    /** @type {?|undefined} */
    CertData.prototype.subject;
    /** @type {?|undefined} */
    CertData.prototype.issuer;
    /** @type {?|undefined} */
    CertData.prototype.validFrom;
    /** @type {?|undefined} */
    CertData.prototype.validTo;
    /** @type {?|undefined} */
    CertData.prototype.serial;
    /** @type {?|undefined} */
    CertData.prototype.cert;
    /** @type {?|undefined} */
    CertData.prototype.subjectData;
    /** @type {?|undefined} */
    CertData.prototype.issuerData;
    /** @type {?|undefined} */
    CertData.prototype.unlocked;
    /* Skipping unhandled member: [propName: string]: string | any;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CertSubject() { }
if (false) {
    /** @type {?|undefined} */
    CertSubject.prototype.CN;
    /** @type {?|undefined} */
    CertSubject.prototype.O;
    /** @type {?|undefined} */
    CertSubject.prototype.OU;
    /** @type {?|undefined} */
    CertSubject.prototype.L;
    /** @type {?|undefined} */
    CertSubject.prototype.C;
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
 * time in which the message has to be cleared
 * @type {?}
 */
const DURATION = 7000;
class MessageService {
    constructor() {
        /**
         * variable to hold the user message
         */
        this.message = new Subject();
    }
    /**
     * returns the message sent by the editor
     * @return {?}
     */
    getMessage() {
        return this.message.asObservable();
    }
    /**
     * sends message to the editor
     *
     * @param {?} message message to be sent
     * @return {?}
     */
    sendMessage(message) {
        this.message.next(message);
        this.clearMessageIn(DURATION);
    }
    /**
     * a short interval to clear message
     *
     * @private
     * @param {?} milliseconds time in seconds in which the message has to be cleared
     * @return {?}
     */
    clearMessageIn(milliseconds) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.message.next(undefined);
        }), milliseconds);
    }
}
MessageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MessageService.ctorParameters = () => [];
if (false) {
    /**
     * variable to hold the user message
     * @type {?}
     * @private
     */
    MessageService.prototype.message;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEditorMessageComponent {
    /**
     * @param {?} _messageService service to send message to the editor
     */
    constructor(_messageService) {
        this._messageService = _messageService;
        /**
         * property that holds the message to be displayed on the editor
         */
        this.ngxMessage = undefined;
        this._messageService.getMessage().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        (message) => this.ngxMessage = message));
    }
    /**
     * clears editor message
     * @return {?}
     */
    clearMessage() {
        this.ngxMessage = undefined;
    }
}
NgxEditorMessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-ngx-editor-message',
                template: "<div class=\"ngx-editor-message\" *ngIf=\"ngxMessage\" (dblclick)=\"clearMessage()\">\n  {{ ngxMessage }}\n</div>\n",
                styles: [".ngx-editor-message{font-size:80%;background-color:#f1f1f1;border:1px solid #ddd;border-top:transparent;padding:0 .5rem .1rem;transition:.5s ease-in}"]
            }] }
];
/** @nocollapse */
NgxEditorMessageComponent.ctorParameters = () => [
    { type: MessageService }
];
if (false) {
    /**
     * property that holds the message to be displayed on the editor
     * @type {?}
     */
    NgxEditorMessageComponent.prototype.ngxMessage;
    /**
     * @type {?}
     * @private
     */
    NgxEditorMessageComponent.prototype._messageService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * enable or disable toolbar based on configuration
 *
 * @param {?} value toolbar item
 * @param {?} toolbar toolbar configuration object
 * @return {?}
 */
function canEnableToolbarOptions(value, toolbar) {
    if (value) {
        if (toolbar['length'] === 0) {
            return true;
        }
        else {
            /** @type {?} */
            const found = toolbar.filter((/**
             * @param {?} array
             * @return {?}
             */
            array => {
                return array.indexOf(value) !== -1;
            }));
            return found.length ? true : false;
        }
    }
    else {
        return false;
    }
}
/**
 * set editor configuration
 *
 * @param {?} value configuration via [config] property
 * @param {?} ngxEditorConfig default editor configuration
 * @param {?} input direct configuration inputs via directives
 * @return {?}
 */
function getEditorConfiguration(value, ngxEditorConfig, input) {
    for (const i in ngxEditorConfig) {
        if (i) {
            if (input[i] !== undefined) {
                value[i] = input[i];
            }
            if (!value.hasOwnProperty(i)) {
                value[i] = ngxEditorConfig[i];
            }
        }
    }
    return value;
}
/**
 * return vertical if the element is the resizer property is set to basic
 *
 * @param {?} resizer type of resizer, either basic or stack
 * @return {?}
 */
function canResize(resizer) {
    if (resizer === 'basic') {
        return 'vertical';
    }
    return false;
}
/**
 * save selection when the editor is focussed out
 * @return {?}
 */
function saveSelection() {
    if (window.getSelection) {
        /** @type {?} */
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    }
    else if (document.getSelection && document.createRange) {
        return document.createRange();
    }
    return null;
}
/**
 * restore selection when the editor is focussed in
 *
 * @param {?} range saved selection when the editor is focussed out
 * @return {?}
 */
function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            /** @type {?} */
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        }
        else if (document.getSelection && range.select) {
            range.select();
            return true;
        }
    }
    else {
        return false;
    }
}

var Utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    canEnableToolbarOptions: canEnableToolbarOptions,
    getEditorConfiguration: getEditorConfiguration,
    canResize: canResize,
    saveSelection: saveSelection,
    restoreSelection: restoreSelection
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CommandExecutorService {
    /**
     *
     * @param {?} _http HTTP Client for making http requests
     */
    constructor(_http) {
        this._http = _http;
        /**
         * saves the selection from the editor when focussed out
         */
        this.savedSelection = undefined;
    }
    /**
     * executes command from the toolbar
     *
     * @param {?} command command to be executed
     * @return {?}
     */
    execute(command) {
        if (!this.savedSelection && command !== 'enableObjectResizing') {
            throw new Error('Range out of Editor');
        }
        if (command === 'enableObjectResizing') {
            document.execCommand('enableObjectResizing', true);
        }
        if (command === 'blockquote') {
            document.execCommand('formatBlock', false, 'blockquote');
        }
        if (command === 'removeBlockquote') {
            document.execCommand('formatBlock', false, 'div');
        }
        document.execCommand(command, false, null);
    }
    /**
     * inserts image in the editor
     *
     * @param {?} imageURI url of the image to be inserted
     * @return {?}
     */
    insertImage(imageURI) {
        if (this.savedSelection) {
            if (imageURI) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    /** @type {?} */
                    const inserted = document.execCommand('insertImage', false, imageURI);
                    if (!inserted) {
                        throw new Error('Invalid URL');
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * inserts image in the editor
     *
     * @param {?} videParams url of the image to be inserted
     * @return {?}
     */
    insertVideo(videParams) {
        if (this.savedSelection) {
            if (videParams) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isYoutubeLink(videParams.videoUrl)) {
                        /** @type {?} */
                        const youtubeURL = '<iframe width="' + videParams.width + '" height="' + videParams.height + '"'
                            + 'src="' + videParams.videoUrl + '"></iframe>';
                        this.insertHtml(youtubeURL);
                    }
                    else if (this.checkTagSupportInBrowser('video')) {
                        if (this.isValidURL(videParams.videoUrl)) {
                            /** @type {?} */
                            const videoSrc = '<video width="' + videParams.width + '" height="' + videParams.height + '"'
                                + ' controls="true"><source src="' + videParams.videoUrl + '"></video>';
                            this.insertHtml(videoSrc);
                        }
                        else {
                            throw new Error('Invalid video URL');
                        }
                    }
                    else {
                        throw new Error('Unable to insert video');
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * checks the input url is a valid youtube URL or not
     *
     * @private
     * @param {?} url Youtue URL
     * @return {?}
     */
    isYoutubeLink(url) {
        /** @type {?} */
        const ytRegExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
        return ytRegExp.test(url);
    }
    /**
     * check whether the string is a valid url or not
     * @private
     * @param {?} url url
     * @return {?}
     */
    isValidURL(url) {
        /** @type {?} */
        const urlRegExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return urlRegExp.test(url);
    }
    /**
     * uploads image to the server
     *
     * @param {?} file file that has to be uploaded
     * @param {?} endPoint enpoint to which the image has to be uploaded
     * @return {?}
     */
    uploadImage(file, endPoint) {
        if (!endPoint) {
            throw new Error('Image Endpoint isn`t provided or invalid');
        }
        /** @type {?} */
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
            /** @type {?} */
            const req = new HttpRequest('POST', endPoint, formData, {
                reportProgress: true
            });
            return this._http.request(req);
        }
        else {
            throw new Error('Invalid Image');
        }
    }
    /**
     * inserts link in the editor
     *
     * @param {?} params parameters that holds the information for the link
     * @return {?}
     */
    createLink(params) {
        if (this.savedSelection) {
            /**
             * check whether the saved selection contains a range or plain selection
             */
            if (params.urlNewTab) {
                /** @type {?} */
                const newUrl = '<a href="' + params.urlLink + '" target="_blank">' + params.urlText + '</a>';
                if (document.getSelection().type !== 'Range') {
                    /** @type {?} */
                    const restored = restoreSelection(this.savedSelection);
                    if (restored) {
                        this.insertHtml(newUrl);
                    }
                }
                else {
                    throw new Error('Only new links can be inserted. You cannot edit URL`s');
                }
            }
            else {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    document.execCommand('createLink', false, params.urlLink);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    insertColor(color, where) {
        if (this.savedSelection) {
            /** @type {?} */
            const restored = restoreSelection(this.savedSelection);
            if (restored && this.checkSelection()) {
                if (where === 'textColor') {
                    document.execCommand('foreColor', false, color);
                }
                else {
                    document.execCommand('hiliteColor', false, color);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * set email param
     *
     * @param {?} v
     * @return {?}
     */
    setEmailParam(v) {
        if (this.savedSelection) {
            /** @type {?} */
            const deletedValue = this.deleteAndGetElement();
            if (v) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    /** @type {?} */
                    const paramerter = `<div><b>` + v + `</b></div>`;
                    this.insertHtml(paramerter);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * set font size for text
     *
     * @param {?} fontSize font-size to be set
     * @return {?}
     */
    setFontSize(fontSize) {
        if (this.savedSelection && this.checkSelection()) {
            /** @type {?} */
            const deletedValue = this.deleteAndGetElement();
            if (deletedValue) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isNumeric(fontSize)) {
                        /** @type {?} */
                        const fontPx = '<span style="font-size: ' + fontSize + 'px;">' + deletedValue + '</span>';
                        this.insertHtml(fontPx);
                    }
                    else {
                        /** @type {?} */
                        const fontPx = '<span style="font-size: ' + fontSize + ';">' + deletedValue + '</span>';
                        this.insertHtml(fontPx);
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * set font name/family for text
     *
     * @param {?} fontName font-family to be set
     * @return {?}
     */
    setFontName(fontName) {
        if (this.savedSelection && this.checkSelection()) {
            /** @type {?} */
            const deletedValue = this.deleteAndGetElement();
            if (deletedValue) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isNumeric(fontName)) {
                        /** @type {?} */
                        const fontFamily = '<span style="font-family: ' + fontName + 'px;">' + deletedValue + '</span>';
                        this.insertHtml(fontFamily);
                    }
                    else {
                        /** @type {?} */
                        const fontFamily = '<span style="font-family: ' + fontName + ';">' + deletedValue + '</span>';
                        this.insertHtml(fontFamily);
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * insert HTML
     * @private
     * @param {?} html
     * @return {?}
     */
    insertHtml(html) {
        /** @type {?} */
        const isHTMLInserted = document.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    }
    /**
     * check whether the value is a number or string
     * if number return true
     * else return false
     * @private
     * @param {?} value
     * @return {?}
     */
    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }
    /**
     * delete the text at selected range and return the value
     * @private
     * @return {?}
     */
    deleteAndGetElement() {
        /** @type {?} */
        let slectedText;
        if (this.savedSelection) {
            slectedText = this.savedSelection.toString();
            this.savedSelection.deleteContents();
            return slectedText;
        }
        return false;
    }
    /**
     * check any slection is made or not
     * @private
     * @return {?}
     */
    checkSelection() {
        /** @type {?} */
        const slectedText = this.savedSelection.toString();
        if (slectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    }
    /**
     * check tag is supported by browser or not
     *
     * @private
     * @param {?} tag HTML tag
     * @return {?}
     */
    checkTagSupportInBrowser(tag) {
        return !(document.createElement(tag) instanceof HTMLUnknownElement);
    }
}
CommandExecutorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CommandExecutorService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /**
     * saves the selection from the editor when focussed out
     * @type {?}
     */
    CommandExecutorService.prototype.savedSelection;
    /**
     * @type {?}
     * @private
     */
    CommandExecutorService.prototype._http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEditorToolbarComponent {
    /**
     * @param {?} _popOverConfig
     * @param {?} _formBuilder
     * @param {?} _messageService
     * @param {?} _commandExecutorService
     */
    constructor(_popOverConfig, _formBuilder, _messageService, _commandExecutorService) {
        this._popOverConfig = _popOverConfig;
        this._formBuilder = _formBuilder;
        this._messageService = _messageService;
        this._commandExecutorService = _commandExecutorService;
        /**
         * set to false when image is being uploaded
         */
        this.uploadComplete = true;
        /**
         * upload percentage
         */
        this.updloadPercentage = 0;
        /**
         * set to true when the image is being uploaded
         */
        this.isUploading = false;
        /**
         * which tab to active for color insetion
         */
        this.selectedColorTab = 'textColor';
        /**
         * font family name
         */
        this.fontName = '';
        /**
         * font size
         */
        this.fontSize = '';
        /**
         * hex color code
         */
        this.hexColor = '';
        /**
         * show/hide image uploader
         */
        this.isImageUploader = false;
        /**
         * Emits an event when a toolbar button is clicked
         */
        this.execute = new EventEmitter();
        this._popOverConfig.outsideClick = true;
        this._popOverConfig.placement = 'bottom';
        this._popOverConfig.container = 'body';
    }
    /**
     * enable or diable toolbar based on configuration
     *
     * @param {?} value name of the toolbar buttons
     * @return {?}
     */
    canEnableToolbarOptions(value) {
        return canEnableToolbarOptions(value, this.config['toolbar']);
    }
    /**
     * triggers command from the toolbar to be executed and emits an event
     *
     * @param {?} command name of the command to be executed
     * @return {?}
     */
    triggerCommand(command) {
        this.execute.emit(command);
    }
    /**
     * create URL insert form
     * @return {?}
     */
    buildUrlForm() {
        this.urlForm = this._formBuilder.group({
            urlLink: ['', [Validators.required]],
            urlText: ['', [Validators.required]],
            urlNewTab: [true]
        });
    }
    /**
     * inserts link in the editor
     * @return {?}
     */
    insertLink() {
        try {
            this._commandExecutorService.createLink(this.urlForm.value);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        /** reset form to default */
        this.buildUrlForm();
        /** close inset URL pop up */
        this.urlPopover.hide();
    }
    /**
     * create insert image form
     * @return {?}
     */
    buildImageForm() {
        this.imageForm = this._formBuilder.group({
            imageUrl: ['', [Validators.required]]
        });
    }
    /**
     * create insert image form
     * @return {?}
     */
    buildVideoForm() {
        this.videoForm = this._formBuilder.group({
            videoUrl: ['', [Validators.required]],
            height: [''],
            width: ['']
        });
    }
    /**
     * Executed when file is selected
     *
     * @param {?} e onChange event
     * @return {?}
     */
    onFileChange(e) {
        this.uploadComplete = false;
        this.isUploading = true;
        if (e.target.files.length > 0) {
            /** @type {?} */
            const file = e.target.files[0];
            try {
                this._commandExecutorService.uploadImage(file, this.config.imageEndPoint).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    if (event.type) {
                        this.updloadPercentage = Math.round(100 * event.loaded / event.total);
                    }
                    if (event instanceof HttpResponse) {
                        try {
                            this._commandExecutorService.insertImage(event.body.url);
                        }
                        catch (error) {
                            this._messageService.sendMessage(error.message);
                        }
                        this.uploadComplete = true;
                        this.isUploading = false;
                    }
                }));
            }
            catch (error) {
                this._messageService.sendMessage(error.message);
                this.uploadComplete = true;
                this.isUploading = false;
            }
        }
    }
    /**
     * insert image in the editor
     * @return {?}
     */
    insertImage() {
        try {
            this._commandExecutorService.insertImage(this.imageForm.value.imageUrl);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        /** reset form to default */
        this.buildImageForm();
        /** close inset URL pop up */
        this.imagePopover.hide();
    }
    /**
     * insert image in the editor
     * @return {?}
     */
    insertVideo() {
        try {
            this._commandExecutorService.insertVideo(this.videoForm.value);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        /** reset form to default */
        this.buildVideoForm();
        /** close inset URL pop up */
        this.videoPopover.hide();
    }
    /**
     * inser text/background color
     * @param {?} color
     * @param {?} where
     * @return {?}
     */
    insertColor(color, where) {
        try {
            this._commandExecutorService.insertColor(color, where);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.colorPopover.hide();
    }
    /**
     * set email param
     * @param {?} email
     * @return {?}
     */
    setEmailParam(email) {
        try {
            this._commandExecutorService.setEmailParam(email);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.emailParamPopover.hide();
    }
    /**
     * set font size
     * @param {?} fontSize
     * @return {?}
     */
    setFontSize(fontSize) {
        try {
            this._commandExecutorService.setFontSize(fontSize);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.fontSizePopover.hide();
    }
    /**
     * set font Name/family
     * @param {?} fontName
     * @return {?}
     */
    setFontName(fontName) {
        try {
            this._commandExecutorService.setFontName(fontName);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.fontSizePopover.hide();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildUrlForm();
        this.buildImageForm();
        this.buildVideoForm();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    mouseEnter(item) {
        this.params = item.parameter;
    }
    /**
     * @return {?}
     */
    mouseLeave() {
        this.params = '';
    }
}
NgxEditorToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-ngx-editor-toolbar',
                template: "<div class=\"ngx-toolbar\" *ngIf=\"config['showToolbar']\">\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('bold')\" (click)=\"triggerCommand('bold')\"\n      title=\"Bold\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-bold\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('italic')\" (click)=\"triggerCommand('italic')\"\n      title=\"Italic\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-italic\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('underline')\" (click)=\"triggerCommand('underline')\"\n      title=\"Underline\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-underline\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('strikeThrough')\" (click)=\"triggerCommand('strikeThrough')\"\n      title=\"Strikethrough\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-strikethrough\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('superscript')\" (click)=\"triggerCommand('superscript')\"\n      title=\"Superscript\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-superscript\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('subscript')\" (click)=\"triggerCommand('subscript')\"\n      title=\"Subscript\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-subscript\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('fontName')\" (click)=\"fontName = ''\"\n      title=\"Font Family\" [popover]=\"fontNameTemplate\" #fontNamePopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-font\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('fontSize')\" (click)=\"fontSize = ''\"\n      title=\"Font Size\" [popover]=\"fontSizeTemplate\" #fontSizePopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-text-height\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('color')\" (click)=\"hexColor = ''\"\n      title=\"Color Picker\" [popover]=\"insertColorTemplate\" #colorPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-tint\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyLeft')\" (click)=\"triggerCommand('justifyLeft')\"\n      title=\"Justify Left\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-left\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyCenter')\" (click)=\"triggerCommand('justifyCenter')\"\n      title=\"Justify Center\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-center\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyRight')\" (click)=\"triggerCommand('justifyRight')\"\n      title=\"Justify Right\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyFull')\" (click)=\"triggerCommand('justifyFull')\"\n      title=\"Justify\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-justify\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('indent')\" (click)=\"triggerCommand('indent')\"\n      title=\"Indent\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-indent\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('outdent')\" (click)=\"triggerCommand('outdent')\"\n      title=\"Outdent\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-outdent\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('cut')\" (click)=\"triggerCommand('cut')\"\n      title=\"Cut\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-scissors\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('copy')\" (click)=\"triggerCommand('copy')\"\n      title=\"Copy\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-files-o\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('delete')\" (click)=\"triggerCommand('delete')\"\n      title=\"Delete\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('removeFormat')\" (click)=\"triggerCommand('removeFormat')\"\n      title=\"Clear Formatting\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-eraser\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('undo')\" (click)=\"triggerCommand('undo')\"\n      title=\"Undo\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-undo\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('redo')\" (click)=\"triggerCommand('redo')\"\n      title=\"Redo\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('paragraph')\" (click)=\"triggerCommand('insertParagraph')\"\n      title=\"Paragraph\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-paragraph\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('blockquote')\" (click)=\"triggerCommand('blockquote')\"\n      title=\"Blockquote\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-quote-left\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('removeBlockquote')\" (click)=\"triggerCommand('removeBlockquote')\"\n      title=\"Remove Blockquote\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-quote-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('horizontalLine')\" (click)=\"triggerCommand('insertHorizontalRule')\"\n      title=\"Horizontal Line\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('unorderedList')\" (click)=\"triggerCommand('insertUnorderedList')\"\n      title=\"Unordered List\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('orderedList')\" (click)=\"triggerCommand('insertOrderedList')\"\n      title=\"Ordered List\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-list-ol\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('link')\" (click)=\"buildUrlForm()\"\n      [popover]=\"insertLinkTemplate\" title=\"Insert Link\" #urlPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-link\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('unlink')\" (click)=\"triggerCommand('unlink')\"\n      title=\"Unlink\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-chain-broken\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('image')\" (click)=\"buildImageForm()\"\n      title=\"Insert Image\" [popover]=\"insertImageTemplate\" #imagePopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-picture-o\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('video')\" (click)=\"buildVideoForm()\"\n      title=\"Insert Video\" [popover]=\"insertVideoTemplate\" #videoPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-youtube-play\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('emailParam')\" (click)=\"triggerCommand('emailParam')\"\n            title=\"Ch\u00E8n tham s\u1ED1 c\u1EA5u h\u00ECnh\" [popover]=\"emailParamTemplate\" #parameterEmailPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n            [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-usd\" aria-hidden=\"true\"></i>&nbsp;Tham s\u1ED1 c\u1EA5u h\u00ECnh\n    </button>\n  </div>\n</div>\n\n\n<!-- URL Popover template -->\n<ng-template #emailParamTemplate>\n  <div class=\"ngxe-popover extra-gt p-0\">\n    <ul class=\"list-group custom-textarea \">\n      <li (mouseleave)=\"mouseLeave()\" (mouseenter)=\"mouseEnter(item)\" *ngFor=\"let item of emailParams\"\n          class=\"list-group-item  border-0 custom-pointer p-1 pb-2\" (click)=\"setEmailParam(item.parameter)\" data-toggle=\"tooltip\" [title]=\"item.description\">\n        <b>{{item.parameter}}</b> = {{item.description}}</li>\n    </ul>\n  </div>\n</ng-template>\n\n\n<!-- URL Popover template -->\n<ng-template #insertLinkTemplate>\n  <div class=\"ngxe-popover extra-gt\">\n    <form [formGroup]=\"urlForm\" (ngSubmit)=\"urlForm.valid && insertLink()\" autocomplete=\"off\">\n      <div class=\"form-group\">\n        <label for=\"urlInput\" class=\"small\">URL</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"URLInput\" placeholder=\"URL\" formControlName=\"urlLink\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"urlTextInput\" class=\"small\">Text</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"urlTextInput\" placeholder=\"Text\" formControlName=\"urlText\"\n          required>\n      </div>\n      <div class=\"form-check\">\n        <input type=\"checkbox\" class=\"form-check-input\" id=\"urlNewTab\" formControlName=\"urlNewTab\">\n        <label class=\"form-check-label\" for=\"urlNewTab\">Open in new tab</label>\n      </div>\n      <button type=\"submit\" class=\"btn-primary btn-sm btn\">Submit</button>\n    </form>\n  </div>\n</ng-template>\n\n<!-- Image Uploader Popover template -->\n<ng-template #insertImageTemplate>\n  <div class=\"ngxe-popover imgc-ctnr\">\n    <div class=\"imgc-topbar btn-ctnr\">\n      <button type=\"button\" class=\"btn\" [ngClass]=\"{active: isImageUploader}\" (click)=\"isImageUploader = true\">\n        <i class=\"fa fa-upload\"></i>\n      </button>\n      <button type=\"button\" class=\"btn\" [ngClass]=\"{active: !isImageUploader}\" (click)=\"isImageUploader = false\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n    </div>\n    <div class=\"imgc-ctnt is-image\">\n      <div *ngIf=\"isImageUploader; else insertImageLink\"> </div>\n      <div *ngIf=\"!isImageUploader; else imageUploder\"> </div>\n      <ng-template #imageUploder>\n        <div class=\"ngx-insert-img-ph\">\n          <p *ngIf=\"uploadComplete\">Choose Image</p>\n          <p *ngIf=\"!uploadComplete\">\n            <span>Uploading Image</span>\n            <br>\n            <span>{{ updloadPercentage }} %</span>\n          </p>\n          <div class=\"ngxe-img-upl-frm\">\n            <input type=\"file\" (change)=\"onFileChange($event)\" accept=\"image/*\" [disabled]=\"isUploading\" [style.cursor]=\"isUploading ? 'not-allowed': 'allowed'\">\n          </div>\n        </div>\n      </ng-template>\n      <ng-template #insertImageLink>\n        <form class=\"extra-gt\" [formGroup]=\"imageForm\" (ngSubmit)=\"imageForm.valid && insertImage()\" autocomplete=\"off\">\n          <div class=\"form-group\">\n            <label for=\"imageURLInput\" class=\"small\">URL</label>\n            <input type=\"text\" class=\"form-control-sm\" id=\"imageURLInput\" placeholder=\"URL\" formControlName=\"imageUrl\"\n              required>\n          </div>\n          <button type=\"submit\" class=\"btn-primary btn-sm btn\">Submit</button>\n        </form>\n      </ng-template>\n      <div class=\"progress\" *ngIf=\"!uploadComplete\">\n        <div class=\"progress-bar progress-bar-striped progress-bar-animated bg-success\" [ngClass]=\"{'bg-danger': updloadPercentage<20, 'bg-warning': updloadPercentage<50, 'bg-success': updloadPercentage>=100}\"\n          [style.width.%]=\"updloadPercentage\"></div>\n      </div>\n    </div>\n  </div>\n</ng-template>\n\n\n<!-- Insert Video Popover template -->\n<ng-template #insertVideoTemplate>\n  <div class=\"ngxe-popover imgc-ctnr\">\n    <div class=\"imgc-topbar btn-ctnr\">\n      <button type=\"button\" class=\"btn active\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n\n    </div>\n    <div class=\"imgc-ctnt is-image\">\n      <form class=\"extra-gt\" [formGroup]=\"videoForm\" (ngSubmit)=\"videoForm.valid && insertVideo()\" autocomplete=\"off\">\n        <div class=\"form-group\">\n          <label for=\"videoURLInput\" class=\"small\">URL</label>\n          <input type=\"text\" class=\"form-control-sm\" id=\"videoURLInput\" placeholder=\"URL\" formControlName=\"videoUrl\"\n            required>\n        </div>\n        <div class=\"row form-group\">\n          <div class=\"col\">\n            <input type=\"text\" class=\"form-control-sm\" formControlName=\"height\" placeholder=\"height (px)\" pattern=\"[0-9]\">\n          </div>\n          <div class=\"col\">\n            <input type=\"text\" class=\"form-control-sm\" formControlName=\"width\" placeholder=\"width (px)\" pattern=\"[0-9]\">\n          </div>\n          <label class=\"small\">Height/Width</label>\n        </div>\n        <button type=\"submit\" class=\"btn-primary btn-sm btn\">Submit</button>\n      </form>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Insert color template -->\n<ng-template #insertColorTemplate>\n  <div class=\"ngxe-popover imgc-ctnr\">\n    <div class=\"imgc-topbar two-tabs\">\n      <span (click)=\"selectedColorTab ='textColor'\" [ngClass]=\"{active: selectedColorTab ==='textColor'}\">Text</span>\n      <span (click)=\"selectedColorTab ='backgroundColor'\" [ngClass]=\"{active: selectedColorTab ==='backgroundColor'}\">Background</span>\n    </div>\n    <div class=\"imgc-ctnt is-color extra-gt1\">\n      <form autocomplete=\"off\">\n        <div class=\"form-group\">\n          <label for=\"hexInput\" class=\"small\">Hex Color</label>\n          <input type=\"text\" class=\"form-control-sm\" id=\"hexInput\" name=\"hexInput\" maxlength=\"7\" placeholder=\"HEX Color\"\n            [(ngModel)]=\"hexColor\" required>\n        </div>\n        <button type=\"button\" class=\"btn-primary btn-sm btn\" (click)=\"insertColor(hexColor, selectedColorTab)\">Submit</button>\n      </form>\n    </div>\n  </div>\n</ng-template>\n\n<!-- font size template -->\n<ng-template #fontSizeTemplate>\n  <div class=\"ngxe-popover extra-gt1\">\n    <form autocomplete=\"off\">\n      <div class=\"form-group\">\n        <label for=\"fontSize\" class=\"small\">Font Size</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"fontSize\" name=\"fontSize\" placeholder=\"Font size in px/rem\"\n          [(ngModel)]=\"fontSize\" required>\n      </div>\n      <button type=\"button\" class=\"btn-primary btn-sm btn\" (click)=\"setFontSize(fontSize)\">Submit</button>\n    </form>\n  </div>\n</ng-template>\n\n<!-- font family/name template -->\n<ng-template #fontNameTemplate>\n  <div class=\"ngxe-popover extra-gt1\">\n    <form autocomplete=\"off\">\n      <div class=\"form-group\">\n        <label for=\"fontSize\" class=\"small\">Font Size</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"fontName\" name=\"fontName\" placeholder=\"Ex: 'Times New Roman', Times, serif\"\n          [(ngModel)]=\"fontName\" required>\n      </div>\n      <button type=\"button\" class=\"btn-primary btn-sm btn\" (click)=\"setFontName(fontName)\">Submit</button>\n    </form>\n  </div>\n</ng-template>\n",
                providers: [PopoverConfig],
                styles: ["::ng-deep .ngxePopover.popover{position:absolute;top:0;left:0;z-index:1060;display:block;max-width:276px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem}::ng-deep .ngxePopover.popover .arrow{position:absolute;display:block;width:1rem;height:.5rem;margin:0 .3rem}::ng-deep .ngxePopover.popover .arrow::after,::ng-deep .ngxePopover.popover .arrow::before{position:absolute;display:block;content:\"\";border-color:transparent;border-style:solid}::ng-deep .ngxePopover.popover .popover-header{padding:.5rem .75rem;margin-bottom:0;font-size:1rem;color:inherit;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}::ng-deep .ngxePopover.popover .popover-header:empty{display:none}::ng-deep .ngxePopover.popover .popover-body{padding:.5rem .75rem;color:#212529}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top],::ng-deep .ngxePopover.popover.bs-popover-top{margin-bottom:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow,::ng-deep .ngxePopover.popover.bs-popover-top .arrow{bottom:calc((.5rem + 1px) * -1)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::before{border-width:.5rem .5rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::before{bottom:0;border-top-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::after{bottom:1px;border-top-color:#fff}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right],::ng-deep .ngxePopover.popover.bs-popover-right{margin-left:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow,::ng-deep .ngxePopover.popover.bs-popover-right .arrow{left:calc((.5rem + 1px) * -1);width:.5rem;height:1rem;margin:.3rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::before{border-width:.5rem .5rem .5rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::before{left:0;border-right-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::after{left:1px;border-right-color:#fff}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom],::ng-deep .ngxePopover.popover.bs-popover-bottom{margin-top:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow{left:45%!important;top:calc((.5rem + 1px) * -1)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::before{border-width:0 .5rem .5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::before{top:0;border-bottom-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::after{top:1px;border-bottom-color:#fff}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .popover-header::before,::ng-deep .ngxePopover.popover.bs-popover-bottom .popover-header::before{position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-.5rem;content:\"\";border-bottom:1px solid #f7f7f7}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left],::ng-deep .ngxePopover.popover.bs-popover-left{margin-right:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow,::ng-deep .ngxePopover.popover.bs-popover-left .arrow{right:calc((.5rem + 1px) * -1);width:.5rem;height:1rem;margin:.3rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::before{border-width:.5rem 0 .5rem .5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::before{right:0;border-left-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::after{right:1px;border-left-color:#fff}::ng-deep .ngxePopover .btn{display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}::ng-deep .ngxePopover .btn.btn-sm{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}::ng-deep .ngxePopover .btn:active,::ng-deep .ngxePopover .btn:focus{outline:0;box-shadow:none}::ng-deep .ngxePopover .btn.btn-primary{color:#fff;background-color:#007bff;border-color:#007bff}::ng-deep .ngxePopover .btn.btn-primary:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}::ng-deep .ngxePopover .btn:not(:disabled):not(.disabled){cursor:pointer}::ng-deep .ngxePopover form .form-group{margin-bottom:1rem}::ng-deep .ngxePopover form .form-group input{overflow:visible}::ng-deep .ngxePopover form .form-group .form-control-sm{width:100%;outline:0;border:none;border-bottom:1px solid #bdbdbd;border-radius:0;margin-bottom:1px;padding:.25rem .5rem;font-size:.875rem;line-height:1.5}::ng-deep .ngxePopover form .form-group.row{display:flex;flex-wrap:wrap;margin-left:0;margin-right:0}::ng-deep .ngxePopover form .form-group.row .col{flex-basis:0;flex-grow:1;max-width:100%;padding:0}::ng-deep .ngxePopover form .form-group.row .col:first-child{padding-right:15px}::ng-deep .ngxePopover form .form-check{position:relative;display:block;padding-left:1.25rem}::ng-deep .ngxePopover form .form-check .form-check-input{position:absolute;margin-top:.3rem;margin-left:-1.25rem}.ngx-toolbar{display:flex;flex-wrap:wrap;background-color:#f5f5f5;font-size:.8rem;padding:.2rem .2rem 0;border:1px solid #ddd}.ngx-toolbar .ngx-toolbar-set{display:flex;border-radius:5px;background-color:#fff;margin-right:.2rem;margin-bottom:.2rem}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button{background-color:transparent;padding:.4rem;min-width:2.5rem;border:1px solid #ddd;border-right:transparent}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button.focus,.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:focus{outline:0}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:last-child{border-right:1px solid #ddd;border-top-right-radius:5px;border-bottom-right-radius:5px}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:first-child{border-top-left-radius:5px;border-bottom-left-radius:5px}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:disabled{background-color:#f5f5f5;pointer-events:none;cursor:not-allowed}::ng-deep .popover{border-top-right-radius:0;border-top-left-radius:0}::ng-deep .ngxe-popover{min-width:15rem;white-space:nowrap}::ng-deep .ngxe-popover .extra-gt,::ng-deep .ngxe-popover.extra-gt{padding-top:.5rem!important}::ng-deep .ngxe-popover .extra-gt1,::ng-deep .ngxe-popover.extra-gt1{padding-top:.75rem!important}::ng-deep .ngxe-popover .extra-gt2,::ng-deep .ngxe-popover.extra-gt2{padding-top:1rem!important}::ng-deep .ngxe-popover .form-group label{display:none;margin:0}::ng-deep .ngxe-popover .form-group .form-control-sm{width:100%;outline:0;border:none;border-bottom:1px solid #bdbdbd;border-radius:0;margin-bottom:1px;padding-left:0;padding-right:0}::ng-deep .ngxe-popover .form-group .form-control-sm:active,::ng-deep .ngxe-popover .form-group .form-control-sm:focus{border-bottom:2px solid #1e88e5;box-shadow:none;margin-bottom:0}::ng-deep .ngxe-popover .form-group .form-control-sm.ng-dirty.ng-invalid:not(.ng-pristine){border-bottom:2px solid red}::ng-deep .ngxe-popover .form-check{margin-bottom:1rem}::ng-deep .ngxe-popover .btn:focus{box-shadow:none!important}::ng-deep .ngxe-popover.imgc-ctnr{margin:-.5rem -.75rem}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar{box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 1px 1px rgba(0,0,0,.16);border-bottom:0}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.btn-ctnr button{background-color:transparent;border-radius:0}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.btn-ctnr button:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.btn-ctnr button.active{color:#007bff;transition:.2s}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.two-tabs span{width:50%;display:inline-flex;justify-content:center;padding:.4rem 0;margin:0 -1px 2px}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.two-tabs span:hover{cursor:pointer}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.two-tabs span.active{margin-bottom:-2px;border-bottom:2px solid #007bff;color:#007bff}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt{padding:.5rem}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .progress{height:.5rem;margin:.5rem -.5rem -.6rem}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image p{margin:0}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph{border:2px dashed #bdbdbd;padding:1.8rem 0;position:relative;letter-spacing:1px;text-align:center}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph:hover{background:#ebebeb}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph .ngxe-img-upl-frm{opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;z-index:2147483640;overflow:hidden;margin:0;padding:0;width:100%}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph .ngxe-img-upl-frm input{cursor:pointer;position:absolute;right:0;top:0;bottom:0;margin:0}.custom-textarea{overflow-y:auto;overflow-x:hidden;max-width:100%;min-width:0;max-height:200px}.custom-textarea .list-group-item:hover{background:#f0f8ff}.custom-textarea::-webkit-scrollbar{width:6px}.custom-textarea::-webkit-scrollbar-track{background:#fff}.custom-textarea::-webkit-scrollbar-thumb{background:#888;border-radius:3px}.custom-textarea::-webkit-scrollbar-thumb:hover{background:#555}.custom-textarea ul li{background:#f7f7f7}.custom-pointer{cursor:pointer;white-space:normal}"]
            }] }
];
/** @nocollapse */
NgxEditorToolbarComponent.ctorParameters = () => [
    { type: PopoverConfig },
    { type: FormBuilder },
    { type: MessageService },
    { type: CommandExecutorService }
];
NgxEditorToolbarComponent.propDecorators = {
    config: [{ type: Input }],
    emailParams: [{ type: Input }],
    urlPopover: [{ type: ViewChild, args: ['urlPopover',] }],
    imagePopover: [{ type: ViewChild, args: ['imagePopover',] }],
    videoPopover: [{ type: ViewChild, args: ['videoPopover',] }],
    fontSizePopover: [{ type: ViewChild, args: ['fontSizePopover',] }],
    colorPopover: [{ type: ViewChild, args: ['colorPopover',] }],
    emailParamPopover: [{ type: ViewChild, args: ['emailParamPopover',] }],
    execute: [{ type: Output }]
};
if (false) {
    /**
     * holds values of the insert link form
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.urlForm;
    /**
     * holds values of the insert image form
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.imageForm;
    /**
     * holds values of the insert video form
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.videoForm;
    /**
     * set to false when image is being uploaded
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.uploadComplete;
    /**
     * upload percentage
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.updloadPercentage;
    /**
     * set to true when the image is being uploaded
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.isUploading;
    /**
     * which tab to active for color insetion
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.selectedColorTab;
    /**
     * font family name
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.fontName;
    /**
     * font size
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.fontSize;
    /**
     * hex color code
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.hexColor;
    /**
     * show/hide image uploader
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.isImageUploader;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.params;
    /**
     * Editor configuration
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.config;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.emailParams;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.urlPopover;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.imagePopover;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.videoPopover;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.fontSizePopover;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.colorPopover;
    /** @type {?} */
    NgxEditorToolbarComponent.prototype.emailParamPopover;
    /**
     * Emits an event when a toolbar button is clicked
     * @type {?}
     */
    NgxEditorToolbarComponent.prototype.execute;
    /**
     * @type {?}
     * @private
     */
    NgxEditorToolbarComponent.prototype._popOverConfig;
    /**
     * @type {?}
     * @private
     */
    NgxEditorToolbarComponent.prototype._formBuilder;
    /**
     * @type {?}
     * @private
     */
    NgxEditorToolbarComponent.prototype._messageService;
    /**
     * @type {?}
     * @private
     */
    NgxEditorToolbarComponent.prototype._commandExecutorService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * toolbar default configuration
 * @type {?}
 */
const ngxEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    imageEndPoint: '',
    toolbar: [
        ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
        ['fontName', 'fontSize', 'color'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
        ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
        ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
        ['link', 'unlink', 'image', 'video']
    ]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEditorComponent {
    /**
     * @param {?} _messageService service to send message to the editor message component
     * @param {?} _commandExecutor executes command from the toolbar
     * @param {?} _renderer access and manipulate the dom element
     */
    constructor(_messageService, _commandExecutor, _renderer) {
        this._messageService = _messageService;
        this._commandExecutor = _commandExecutor;
        this._renderer = _renderer;
        /**
         * The editor can be resized vertically.
         *
         * `basic` resizer enables the html5 reszier. Check here https://www.w3schools.com/cssref/css3_pr_resize.asp
         *
         * `stack` resizer enable a resizer that looks like as if in https://stackoverflow.com
         */
        this.resizer = 'stack';
        /**
         * The config property is a JSON object
         *
         * All avaibale inputs inputs can be provided in the configuration as JSON
         * inputs provided directly are considered as top priority
         */
        this.config = ngxEditorConfig;
        /**
         * emits `blur` event when focused out from the textarea
         */
        this.blur = new EventEmitter();
        /**
         * emits `focus` event when focused in to the textarea
         */
        this.focus = new EventEmitter();
        this.Utils = Utils;
    }
    /**
     * events
     * @return {?}
     */
    onTextAreaFocus() {
        this.focus.emit('focus');
    }
    /**
     * focus the text area when the editor is focussed
     * @return {?}
     */
    onEditorFocus() {
        this.textArea.nativeElement.focus();
    }
    /**
     * Executed from the contenteditable section while the input property changes
     * @param {?} innerHTML
     * @return {?}
     */
    onContentChange(innerHTML) {
        if (typeof this.onChange === 'function') {
            this.onChange(innerHTML);
            this.togglePlaceholder(innerHTML);
        }
    }
    /**
     * @return {?}
     */
    onTextAreaBlur() {
        /** save selection if focussed out */
        this._commandExecutor.savedSelection = saveSelection();
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
        this.blur.emit('blur');
    }
    /**
     * resizing text area
     *
     * @param {?} offsetY vertical height of the eidtable portion of the editor
     * @return {?}
     */
    resizeTextArea(offsetY) {
        /** @type {?} */
        let newHeight = parseInt(this.height, 10);
        newHeight += offsetY;
        this.height = newHeight + 'px';
        this.textArea.nativeElement.style.height = this.height;
    }
    /**
     * editor actions, i.e., executes command from toolbar
     *
     * @param {?} commandName name of the command to be executed
     * @return {?}
     */
    executeCommand(commandName) {
        try {
            this._commandExecutor.execute(commandName);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
    }
    /**
     * Write a new value to the element.
     *
     * @param {?} value value to be executed when there is a change in contenteditable
     * @return {?}
     */
    writeValue(value) {
        this.togglePlaceholder(value);
        if (value === null || value === undefined || value === '' || value === '<br>') {
            value = null;
        }
        this.refreshView(value);
    }
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * refresh view/HTML of the editor
     *
     * @param {?} value html string from the editor
     * @return {?}
     */
    refreshView(value) {
        /** @type {?} */
        const normalizedValue = value === null ? '' : value;
        this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
    }
    /**
     * toggles placeholder based on input string
     *
     * @param {?} value A HTML string from the editor
     * @return {?}
     */
    togglePlaceholder(value) {
        if (!value || value === '<br>' || value === '') {
            this._renderer.addClass(this.ngxWrapper.nativeElement, 'show-placeholder');
        }
        else {
            this._renderer.removeClass(this.ngxWrapper.nativeElement, 'show-placeholder');
        }
    }
    /**
     * returns a json containing input params
     * @return {?}
     */
    getCollectiveParams() {
        return {
            editable: this.editable,
            spellcheck: this.spellcheck,
            placeholder: this.placeholder,
            translate: this.translate,
            height: this.height,
            minHeight: this.minHeight,
            width: this.width,
            minWidth: this.minWidth,
            enableToolbar: this.enableToolbar,
            showToolbar: this.showToolbar,
            imageEndPoint: this.imageEndPoint,
            toolbar: this.toolbar
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /**
         * set configuartion
         */
        this.config = this.Utils.getEditorConfiguration(this.config, ngxEditorConfig, this.getCollectiveParams());
        this.height = this.height || this.textArea.nativeElement.offsetHeight;
        this.executeCommand('enableObjectResizing');
    }
}
NgxEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-ngx-editor',
                template: "<div class=\"ngx-editor\" id=\"ngxEditor\" [style.width]=\"config['width']\" [style.minWidth]=\"config['minWidth']\" tabindex=\"0\"\n  (focus)=\"onEditorFocus()\">\n\n  <app-ngx-editor-toolbar [emailParams]=\"emailParams\" [config]=\"config\" (execute)=\"executeCommand($event)\"></app-ngx-editor-toolbar>\n\n  <!-- text area -->\n  <div class=\"ngx-wrapper\" #ngxWrapper>\n    <div class=\"ngx-editor-textarea\" [attr.contenteditable]=\"config['editable']\" (input)=\"onContentChange($event.target['innerHTML'])\"\n      [attr.translate]=\"config['translate']\" [attr.spellcheck]=\"config['spellcheck']\" [style.height]=\"config['height']\"\n      [style.minHeight]=\"config['minHeight']\" [style.resize]=\"Utils?.canResize(resizer)\" (focus)=\"onTextAreaFocus()\"\n      (blur)=\"onTextAreaBlur()\" #ngxTextArea></div>\n\n    <span class=\"ngx-editor-placeholder\">{{ placeholder || config['placeholder'] }}</span>\n  </div>\n\n  <app-ngx-editor-message></app-ngx-editor-message>\n  <app-ngx-grippie *ngIf=\"resizer === 'stack'\"></app-ngx-grippie>\n\n</div>\n",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgxEditorComponent)),
                        multi: true
                    }],
                styles: [".ngx-editor{position:relative}.ngx-editor ::ng-deep [contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#868e96;opacity:1}.ngx-editor .ngx-wrapper{position:relative}.ngx-editor .ngx-wrapper .ngx-editor-textarea{min-height:5rem;padding:.5rem .8rem 1rem;border:1px solid #ddd;background-color:transparent;overflow-x:hidden;overflow-y:auto;z-index:2;position:relative}.ngx-editor .ngx-wrapper .ngx-editor-textarea.focus,.ngx-editor .ngx-wrapper .ngx-editor-textarea:focus{outline:0}.ngx-editor .ngx-wrapper .ngx-editor-textarea ::ng-deep blockquote{margin-left:1rem;border-left:.2em solid #dfe2e5;padding-left:.5rem}.ngx-editor .ngx-wrapper ::ng-deep p{margin-bottom:0}.ngx-editor .ngx-wrapper .ngx-editor-placeholder{display:none;position:absolute;top:0;padding:.5rem .8rem 1rem .9rem;z-index:1;color:#6c757d;opacity:1}.ngx-editor .ngx-wrapper.show-placeholder .ngx-editor-placeholder{display:block}"]
            }] }
];
/** @nocollapse */
NgxEditorComponent.ctorParameters = () => [
    { type: MessageService },
    { type: CommandExecutorService },
    { type: Renderer2 }
];
NgxEditorComponent.propDecorators = {
    editable: [{ type: Input }],
    spellcheck: [{ type: Input }],
    placeholder: [{ type: Input }],
    translate: [{ type: Input }],
    height: [{ type: Input }],
    minHeight: [{ type: Input }],
    width: [{ type: Input }],
    minWidth: [{ type: Input }],
    toolbar: [{ type: Input }],
    resizer: [{ type: Input }],
    config: [{ type: Input }],
    showToolbar: [{ type: Input }],
    enableToolbar: [{ type: Input }],
    imageEndPoint: [{ type: Input }],
    emailParams: [{ type: Input }],
    blur: [{ type: Output }],
    focus: [{ type: Output }],
    textArea: [{ type: ViewChild, args: ['ngxTextArea',] }],
    ngxWrapper: [{ type: ViewChild, args: ['ngxWrapper',] }]
};
if (false) {
    /**
     * Specifies weather the textarea to be editable or not
     * @type {?}
     */
    NgxEditorComponent.prototype.editable;
    /**
     * The spellcheck property specifies whether the element is to have its spelling and grammar checked or not.
     * @type {?}
     */
    NgxEditorComponent.prototype.spellcheck;
    /**
     * Placeholder for the textArea
     * @type {?}
     */
    NgxEditorComponent.prototype.placeholder;
    /**
     * The translate property specifies whether the content of an element should be translated or not.
     *
     * Check https://www.w3schools.com/tags/att_global_translate.asp for more information and browser support
     * @type {?}
     */
    NgxEditorComponent.prototype.translate;
    /**
     * Sets height of the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.height;
    /**
     * Sets minimum height for the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.minHeight;
    /**
     * Sets Width of the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.width;
    /**
     * Sets minimum width of the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.minWidth;
    /**
     * Toolbar accepts an array which specifies the options to be enabled for the toolbar
     *
     * Check ngxEditorConfig for toolbar configuration
     *
     * Passing an empty array will enable all toolbar
     * @type {?}
     */
    NgxEditorComponent.prototype.toolbar;
    /**
     * The editor can be resized vertically.
     *
     * `basic` resizer enables the html5 reszier. Check here https://www.w3schools.com/cssref/css3_pr_resize.asp
     *
     * `stack` resizer enable a resizer that looks like as if in https://stackoverflow.com
     * @type {?}
     */
    NgxEditorComponent.prototype.resizer;
    /**
     * The config property is a JSON object
     *
     * All avaibale inputs inputs can be provided in the configuration as JSON
     * inputs provided directly are considered as top priority
     * @type {?}
     */
    NgxEditorComponent.prototype.config;
    /**
     * Weather to show or hide toolbar
     * @type {?}
     */
    NgxEditorComponent.prototype.showToolbar;
    /**
     * Weather to enable or disable the toolbar
     * @type {?}
     */
    NgxEditorComponent.prototype.enableToolbar;
    /**
     * Endpoint for which the image to be uploaded
     * @type {?}
     */
    NgxEditorComponent.prototype.imageEndPoint;
    /** @type {?} */
    NgxEditorComponent.prototype.emailParams;
    /**
     * emits `blur` event when focused out from the textarea
     * @type {?}
     */
    NgxEditorComponent.prototype.blur;
    /**
     * emits `focus` event when focused in to the textarea
     * @type {?}
     */
    NgxEditorComponent.prototype.focus;
    /** @type {?} */
    NgxEditorComponent.prototype.textArea;
    /** @type {?} */
    NgxEditorComponent.prototype.ngxWrapper;
    /** @type {?} */
    NgxEditorComponent.prototype.Utils;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype._messageService;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype._commandExecutor;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxGrippieComponent {
    /**
     * Constructor
     *
     * @param {?} _editorComponent Editor component
     */
    constructor(_editorComponent) {
        this._editorComponent = _editorComponent;
        /**
         * previous value befor resizing the editor
         */
        this.oldY = 0;
        /**
         * set to true on mousedown event
         */
        this.grabber = false;
    }
    /**
     *
     * @param {?} event Mouseevent
     *
     * Update the height of the editor when the grabber is dragged
     * @return {?}
     */
    onMouseMove(event) {
        if (!this.grabber) {
            return;
        }
        this._editorComponent.resizeTextArea(event.clientY - this.oldY);
        this.oldY = event.clientY;
    }
    /**
     *
     * @param {?} event Mouseevent
     *
     * set the grabber to false on mouse up action
     * @return {?}
     */
    onMouseUp(event) {
        this.grabber = false;
    }
    /**
     * @param {?} event
     * @param {?=} resizer
     * @return {?}
     */
    onResize(event, resizer) {
        this.grabber = true;
        this.oldY = event.clientY;
        event.preventDefault();
    }
}
NgxGrippieComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-ngx-grippie',
                template: "<div class=\"ngx-editor-grippie\">\n  <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" viewBox=\"651.6 235 26 5\"\n    width=\"26\" height=\"5\">\n    <g id=\"sprites\">\n      <path d=\" M 651.6 235 L 653.6 235 L 653.6 237 L 651.6 237 M 654.6 238 L 656.6 238 L 656.6 240 L 654.6 240 M 660.6 238 L 662.6 238 L 662.6 240 L 660.6 240 M 666.6 238 L 668.6 238 L 668.6 240 L 666.6 240 M 672.6 238 L 674.6 238 L 674.6 240 L 672.6 240 M 657.6 235 L 659.6 235 L 659.6 237 L 657.6 237 M 663.6 235 L 665.6 235 L 665.6 237 L 663.6 237 M 669.6 235 L 671.6 235 L 671.6 237 L 669.6 237 M 675.6 235 L 677.6 235 L 677.6 237 L 675.6 237\"\n        fill=\"rgb(147,153,159)\" />\n    </g>\n  </svg>\n</div>\n",
                styles: [".ngx-editor-grippie{height:9px;background-color:#f1f1f1;position:relative;text-align:center;cursor:s-resize;border:1px solid #ddd;border-top:transparent}.ngx-editor-grippie svg{position:absolute;top:1.5px;width:50%;right:25%}"]
            }] }
];
/** @nocollapse */
NgxGrippieComponent.ctorParameters = () => [
    { type: NgxEditorComponent }
];
NgxGrippieComponent.propDecorators = {
    onMouseMove: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }],
    onMouseUp: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }],
    onResize: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
if (false) {
    /**
     * height of the editor
     * @type {?}
     */
    NgxGrippieComponent.prototype.height;
    /**
     * previous value befor resizing the editor
     * @type {?}
     */
    NgxGrippieComponent.prototype.oldY;
    /**
     * set to true on mousedown event
     * @type {?}
     */
    NgxGrippieComponent.prototype.grabber;
    /**
     * @type {?}
     * @private
     */
    NgxGrippieComponent.prototype._editorComponent;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEditorModule {
}
NgxEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ReactiveFormsModule, PopoverModule.forRoot()],
                declarations: [NgxEditorComponent, NgxGrippieComponent, NgxEditorMessageComponent, NgxEditorToolbarComponent],
                exports: [NgxEditorComponent],
                providers: [CommandExecutorService, MessageService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EmailTemplate {
    constructor() {
        this.templateId = this.uuid;
    }
}
if (false) {
    /** @type {?} */
    EmailTemplate.prototype.uuid;
    /** @type {?} */
    EmailTemplate.prototype.templateId;
    /** @type {?} */
    EmailTemplate.prototype.emailCode;
    /** @type {?} */
    EmailTemplate.prototype.emailName;
    /** @type {?} */
    EmailTemplate.prototype.emailSubject;
    /** @type {?} */
    EmailTemplate.prototype.emailContent;
    /** @type {?} */
    EmailTemplate.prototype.application;
    /** @type {?} */
    EmailTemplate.prototype.srvVariable;
    /** @type {?} */
    EmailTemplate.prototype.note;
    /** @type {?} */
    EmailTemplate.prototype.inactive;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EmailTemplateService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            list_params: iNet.getPUrl('discovery/formsubmit'),
            load: iNet.getPUrl('gl/firm/email/load'),
            update: iNet.getPUrl('gl/firm/email/update')
        };
    }
    /**
     * @param {?} application
     * @param {?} discovery
     * @return {?}
     */
    listParams(application, discovery) {
        this.http.showLoading();
        return this.http.postJSON(this.url.list_params, { application: application, discovery: discovery });
    }
    /**
     * @param {?} uuid
     * @return {?}
     */
    loadById(uuid) {
        this.http.showLoading();
        return this.http.postJSON(this.url.load, { templateId: uuid });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.update, params);
    }
}
EmailTemplateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
EmailTemplateService.ctorParameters = () => [
    { type: HttpClientService }
];
/** @nocollapse */ EmailTemplateService.ngInjectableDef = defineInjectable({ factory: function EmailTemplateService_Factory() { return new EmailTemplateService(inject(HttpClientService)); }, token: EmailTemplateService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    EmailTemplateService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EmailTemplateEditComponent {
    /**
     * @param {?} fb
     * @param {?} notification
     * @param {?} translate
     * @param {?} emailTemplateService
     */
    constructor(fb, notification, translate, emailTemplateService) {
        this.fb = fb;
        this.notification = notification;
        this.translate = translate;
        this.emailTemplateService = emailTemplateService;
        this.email = new EmailTemplate();
        this.visibleProperty = false; //False to hide the Property Panel.
        this.emailParams = [];
        this.editorConfig = {
            "editable": true,
            "spellcheck": true,
            "height": "calc(100vh - 205px)",
            "minHeight": "100%",
            "width": "100%",
            "minWidth": "0",
            "translate": "yes",
            "enableToolbar": true,
            "showToolbar": true,
            "placeholder": "",
            "imageEndPoint": "",
            "toolbar": [
                ["bold", "italic", "underline", "strikeThrough"],
                ["fontName", "fontSize", "color"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
                ["emailParam"]
            ]
        };
        this.onValidate = new EventEmitter();
        this.onUpdate = new EventEmitter();
        this.onToggleProperty = new EventEmitter();
        this.formChanged = new Subject();
        this.translateSubscription = translate.get(['COMMON.MODULE.EMAIL_TEMPLATE']).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.columnsTranslations = data['COMMON.MODULE.EMAIL_TEMPLATE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initForm();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    initForm() {
        this.emailTemplateForm = this.fb.group({
            templateId: [null],
            emailCode: [null, Validators.required],
            emailName: [null, Validators.required],
            emailSubject: [null],
            emailContent: [null],
            inactive: [null]
        });
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.onValidate.emit(v);
        }));
        this.emailTemplateForm.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this.formChanged.next(this.emailTemplateForm.valid);
        }));
    }
    /**
     * @param {?} emailId
     * @return {?}
     */
    loadById(emailId) {
        if (emailId) {
            this.emailTemplateService.loadById(emailId)
                .switchMap((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.setData(Object.assign({}, this.email, data));
                    return this.emailTemplateService.listParams(this.email.application, this.email.srvVariable);
                }
                else {
                    return of(null);
                }
            }))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            result => {
                this.emailParams = result.items || [];
            }));
        }
    }
    /**
     * @return {?}
     */
    toggleProperty() {
        this.visibleProperty = !this.visibleProperty;
        this.onToggleProperty.emit(this.visibleProperty);
        return this.visibleProperty;
    }
    /**
     * @param {?} emailTemplate
     * @return {?}
     */
    setData(emailTemplate) {
        this.email = emailTemplate;
        this.email.templateId = this.email.uuid;
        this.email.inactive = !this.email.inactive; //active
        this.emailTemplateForm.patchValue(emailTemplate);
    }
    /**
     * @return {?}
     */
    clearData() {
        this.emailTemplateForm.reset();
    }
    /**
     * @param {?} placeholderContent
     * @return {?}
     */
    setEditorPlaceholder(placeholderContent) {
        this.editorConfig.placeholder = placeholderContent;
    }
    /**
     * @private
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const data = this.emailTemplateForm.getRawValue();
        data.inactive = !data.inactive; //active
        return data;
    }
    /**
     * @return {?}
     */
    update() {
        if (this.emailTemplateForm.valid && this.email && this.email.uuid) {
            const { UPDATE_SUCCESS, UPDATE_ERROR, EMAIL } = this.columnsTranslations;
            this.emailTemplateService.update(this.getData()).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.setData(Object.assign({}, this.email, data));
                    this.notification.showMessage(UPDATE_SUCCESS, 'success', EMAIL);
                }
                else {
                    this.notification.showMessage(UPDATE_ERROR, 'error', EMAIL);
                }
                this.onUpdate.emit(data);
            }));
        }
    }
}
EmailTemplateEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-email-template-edit',
                template: "<div class=\"row center-body m-0\">\n    <div class=\"row justify-content-center mt-0 mb-0 reponsive-card h-100\" style=\"width: 100%\">\n        <div class=\" card-body-shadow box col-sm-12 p-0\">\n            <div class=\"row ml-0 mr-0 h-100\">\n                <form [formGroup]=\"emailTemplateForm\" class=\"w-100\">\n                    <div class=\" form-group row m-0 w-100\">\n                        <div class=\"pl-0 pr-0 mt-1 mb-0\"\n                             [ngClass]=\"{'col-sm-9':visibleProperty,'col-sm-12':!visibleProperty}\">\n                            <div class=\"col-sm-12 p-0\">\n                                <div class=\"col-sm-12 p-0\">\n                                    <app-ngx-editor [emailParams]=\"emailParams\"\n                                                    [config]=\"editorConfig\" [formControl]=\"emailTemplateForm.controls['emailContent']\"\n                                                    [spellcheck]=\"true\" formControlName=\"emailContent\"></app-ngx-editor>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-3 px-0 pl-3 mt-2 mb-0\" [hidden]=\"!visibleProperty\">\n                            <div class=\"form-group row m-0 col-sm-12 mb-2 pl-0\">\n                                <label for=\"emailCode\" class=\"col-sm-4 text-left p-0 col-form-label \">\n                                    {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_CODE'| translate}}<span class=\"required\"> :</span>\n                                </label>\n                                <div class=\"col-sm-12 p-0 pl-1\">\n                                    <input type=\"text\"\n                                           class=\"form-control form-control-sm\"\n                                           name=\"emailCode\" [formControl]=\"emailTemplateForm.controls['emailCode']\"\n                                           [ngClass]=\"{'is-invalid': emailTemplateForm.controls['emailCode'].hasError('required') && emailTemplateForm.controls['emailCode'].touched}\"\n                                           required id=\"emailCode\" value=\"\" readonly>\n                                    <div *ngIf=\"emailTemplateForm.controls['emailCode'].hasError('required') && emailTemplateForm.controls['emailCode'].touched\"\n                                         class=\"text-danger mt-2 text-df\">\n                                        <div>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                            {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_CODE_REQUIRED' | translate}}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-12 form-group row m-0 mb-2 pl-0\">\n                                <label for=\"emailName\"\n                                       class=\"col-sm-4 text-left p-0 col-form-label \">\n                                    {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_NAME' | translate}}<span class=\"required\"> :</span></label>\n                                <div class=\"col-sm-12 p-0\">\n                                    <input type=\"text\" class=\"form-control form-control-sm \"\n                                           formControlName=\"emailName\" [formControl]=\"emailTemplateForm.controls['emailName']\"\n                                           [ngClass]=\"{'is-invalid': emailTemplateForm.controls['emailName'].hasError('required') && emailTemplateForm.controls['emailName'].touched}\"\n                                           id=\"emailName\" name=\"emailName\" value=\"\" required>\n                                    <div *ngIf=\"emailTemplateForm.controls['emailName'].hasError('required') && emailTemplateForm.controls['emailName'].touched\"\n                                         class=\"text-danger mt-2 text-df\">\n                                        <div>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                            {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_NAME_REQUIRED' | translate}}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"form-group row m-0 col-sm-12 pl-0 pr-0 mb-2\">\n                                <div class=\"col-sm-12 form-group row m-0 pl-0\">\n                                    <label class=\"col-sm-4 text-left p-0 col-form-label \">\n                                        {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_SUBJECT' | translate}}:</label>\n                                    <div class=\"col-sm-12 p-0\">\n                                    <textarea type=\"text\" rows=\"5\" style=\"resize: none;\"\n                                              class=\"form-control form-control-sm \"\n                                              [formControl]=\"emailTemplateForm.controls['emailSubject']\"\n                                              name=\"emailSubject\" id=\"emailSubject\"></textarea>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group row m-0 col-sm-12 pl-0 pr-0 mb-2\">\n                                <label class=\"control-label col-form-label col-sm-4 pr-0 pl-0 pt-0\">{{'COMMON.MODULE.EMAIL_TEMPLATE.ACTIVE'\n                                    |translate}} : </label>\n                                <div class=\"col-sm-8\">\n                                    <input id=\"inactive\" name=\"inactive\"\n                                           [formControl]=\"emailTemplateForm.controls['inactive']\"\n                                           class=\"switch switch-success\" type=\"checkbox\"/>\n                                    <span class=\"lbl\"></span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: ["input[type=checkbox].switch{width:55px;height:25px}input[type=checkbox].switch+.lbl{margin:0 4px;min-height:24px}input[type=checkbox].switch+.lbl::before{font-family:'Open Sans';content:\"ON\\a0\\a0\\a0\\a0\\a0\\a0\\a0\\a0\\a0OFF\";color:#999;text-shadow:0 0 0 #999;font-weight:400;font-size:11px;line-height:17px;height:20px;overflow:hidden;border-radius:12px;background-color:#f5f5f5;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,.15);border:1px solid #ccc;text-align:left;padding:0;width:52px;text-indent:-21px;margin-right:0;transition:text-indent .3s;top:auto}input[type=checkbox].switch+.lbl::after{font-family:'Open Sans';content:'III';font-size:12px;font-weight:400;letter-spacing:0;color:#aaa;text-shadow:none;background-color:#fff;border-radius:100%;width:22px;height:22px;line-height:22px;text-align:center;position:absolute;top:-2px;left:-3px;box-shadow:0 1px 1px 1px rgba(0,0,0,.3);transition:left .3s}input[type=checkbox].switch:checked+.lbl::before{text-indent:8px;color:#fff;text-shadow:0 0 0 #fff;background-color:#8ab2c9;border-color:#6a8ca8}input[type=checkbox].switch:checked+.lbl::after{left:34px;background-color:#fff;color:#98a0a5}input[type=checkbox].switch.switch-success+.lbl{position:relative}input[type=checkbox].switch.switch-success+.lbl::before{font-family:FontAwesome;content:\"\\f00d\";text-shadow:0 -1px 0 rgba(0,0,0,.25);box-shadow:none;border-width:0;font-weight:lighter;font-size:16px;border-radius:12px;display:inline-block;background-color:#888;color:#f2f2f2;width:52px;height:22px;line-height:21px;text-indent:32px;transition:background .1s}input[type=checkbox].switch.switch-success+.lbl::after{content:'';text-shadow:0 -1px 0 rgba(0,0,0,.25);position:absolute;top:2px;left:3px;border-radius:12px;box-shadow:0 -1px 0 rgba(0,0,0,.25);width:18px;height:18px;text-align:center;background-color:#f2f2f2;border:4px solid #f2f2f2;transition:left .2s}input[type=checkbox].switch.switch-success:checked+.lbl::before{content:\"\\f00c\";text-indent:6px;color:#fff;border-color:#b7d3e5;background-color:#2abb2a}input[type=checkbox].switch.switch-success:checked+.lbl::after{left:32px;background-color:#fff;border:4px solid #fff;text-shadow:0 -1px 0 rgba(0,200,0,.25)}@media (max-width:700px){:host .reponsive-card{padding:0 30px}}:host .pointer{pointer-events:none}:host .custom-center-span{display:flex;align-items:center}:host .center-body{flex-direction:row;justify-content:center;align-content:start}:host .cursor{cursor:pointer}:host .cursor:hover{color:#f22858}:host .custom-textarea{overflow-y:auto;max-width:100%;min-width:0}:host .custom-textarea::-webkit-scrollbar{width:6px}:host .custom-textarea::-webkit-scrollbar-track{background:#fff}:host .custom-textarea::-webkit-scrollbar-thumb{background:#888;border-radius:3px}:host .custom-textarea::-webkit-scrollbar-thumb:hover{background:#555}:host .list-height{max-height:390px}:host .custom-textarea ul li{background:#f7f7f7}"]
            }] }
];
/** @nocollapse */
EmailTemplateEditComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: NotificationService },
    { type: TranslateService },
    { type: EmailTemplateService }
];
EmailTemplateEditComponent.propDecorators = {
    visibleProperty: [{ type: Input, args: ['visibleProperty',] }],
    emailId: [{ type: Input }],
    onValidate: [{ type: Output }],
    onUpdate: [{ type: Output }],
    onToggleProperty: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    EmailTemplateEditComponent.prototype.email;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.emailTemplateForm;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.visibleProperty;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.emailId;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.emailParams;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.editorConfig;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.onValidate;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.onUpdate;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.onToggleProperty;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.columnsTranslations;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.emailTemplateService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GlobalEmailTemplateModule {
}
GlobalEmailTemplateModule.decorators = [
    { type: NgModule, args: [{
                declarations: [EmailTemplateEditComponent],
                imports: [
                    CommonModule,
                    FormsModule,
                    CoreModule,
                    ReactiveFormsModule,
                    TranslateModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    NgxEditorModule
                ],
                providers: [EmailTemplateService],
                exports: [EmailTemplateEditComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ReportTemplateService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.url = {
            view: iNet.getPUrl('gl/exceltmpl/view'),
            delete: iNet.getPUrl('gl/exceltmpl/delete'),
            update: iNet.getPUrl('gl/exceltmpl/update'),
            add: iNet.getPUrl('gl/exceltmpl/create'),
            list: iNet.getPUrl('gl/exceltmpl/list'),
            application: iNet.getPUrl('cloud/subfirm/application'),
            organ: iNet.getPUrl('plugin/firmprofile/view'),
            modules: iNet.getPUrl('gl/exceltmpl/modules'),
            download: iNet.getPUrl('gl/filecontents/download')
        };
    }
    /**
     * @param {?} params
     * @return {?}
     */
    list(params) {
        this.http.showLoading();
        return this.http.postJSON(this.url.list, params);
    }
    /**
     * @param {?} uuid
     * @return {?}
     */
    delete(uuid) {
        this.http.showLoading();
        return this.http.getJSON(this.url.delete, { uuid: uuid });
    }
    /**
     * @param {?} uuid
     * @return {?}
     */
    view(uuid) {
        this.http.showLoading();
        return this.http.postJSON(this.url.view, { uuid: uuid });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    add(params) {
        this.http.showLoading();
        return this.http.post(this.url.add, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
        this.http.showLoading();
        return this.http.post(this.url.update, params);
    }
    /**
     * @return {?}
     */
    application() {
        this.http.showLoading();
        return this.http.getJSON(this.url.application);
    }
    /**
     * @return {?}
     */
    organId() {
        this.http.showLoading();
        return this.http.postJSON(this.url.organ);
    }
    /**
     * @param {?} application
     * @return {?}
     */
    modules(application) {
        this.http.showLoading();
        return this.http.getJSON(this.url.modules, { application: application });
    }
    /**
     * @param {?} contentUuid
     * @return {?}
     */
    downloadFile(contentUuid) {
        return this.http.downloadFile(this.url.download, { docID: contentUuid });
    }
}
ReportTemplateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ReportTemplateService.ctorParameters = () => [
    { type: HttpClientService }
];
/** @nocollapse */ ReportTemplateService.ngInjectableDef = defineInjectable({ factory: function ReportTemplateService_Factory() { return new ReportTemplateService(inject(HttpClientService)); }, token: ReportTemplateService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ReportTemplateService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ReportTemplateEditComponent {
    /**
     * @param {?} location
     * @param {?} fb
     * @param {?} notification
     * @param {?} service
     * @param {?} translate
     * @param {?} route
     */
    constructor(location, fb, notification, service, translate, route) {
        this.location = location;
        this.fb = fb;
        this.notification = notification;
        this.service = service;
        this.translate = translate;
        this.route = route;
        this.validForm = new EventEmitter();
        this.applicationList = [];
        this.typeList = [];
        this.moduleList = [];
        this.versionList = [{ name: 1, description: 'Phiên bản 1' }, { name: 2, description: 'Phiên bản 2' }];
        this.attachments = [];
        this.translateSubscription = this.translate.get(['COMMON.MODULE.REPORT_TEMPLATE']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.formTranslations = res['COMMON.MODULE.REPORT_TEMPLATE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subRouter = this.route.queryParamMap.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        params => {
            this.applicationParams = params.get('application');
            this.moduleParams = params.get('module');
            this.typeParams = params.get('type');
        }));
        this.initForm();
        this.initData();
        this.loadApplication();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }
    /**
     * @param {?} templateId
     * @return {?}
     */
    loadById(templateId) {
        if (templateId) {
            this.service.view(templateId).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.templateId = templateId;
                    this.applicationParams = data.application;
                    this.templateFormGroup.patchValue(data);
                    this.fileName = data.name;
                    this.validForm.emit(true);
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    initData() {
        this.version.setValue(2);
        this.application.setValue(this.applicationParams);
        this.module.setValue(this.moduleParams);
        this.type.setValue(this.typeParams);
    }
    /**
     * @return {?}
     */
    reset() {
        this.templateFormGroup.reset();
        this.templateId = '';
        this.fileName = '';
        this.initData();
        this.loadApplication();
        this.changeFormValid();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeFile($event) {
        /** @type {?} */
        const files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            const upload = files[0];
            if (upload) {
                this.name.setValue(upload['name']);
                this.fileName = upload['name'];
            }
        }
        else {
        }
        this.changeFormValid();
    }
    /**
     * @return {?}
     */
    clearForm() {
        this.fileName = '';
        if (this.fileUpload.value) {
            this.fileUpload.setValue('');
        }
        this.changeFormValid();
    }
    /**
     * @private
     * @return {?}
     */
    loadApplication() {
        if (!this.appName) {
            this.service.application().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.applicationList = data.items || [];
                    this.application.setValue(this.applicationParams || this.application.value);
                    this.loadModules(this.applicationParams || this.application.value);
                }
            }));
        }
        else {
            this.applicationParams = this.appName;
            /** @type {?} */
            const app = { id: this.appName, description: this.appDesc || this.appName, name: this.appName };
            this.applicationList = [app];
            this.application.setValue(this.appName);
            this.templateFormGroup.controls['application'].disable();
            this.loadModules(this.appName);
        }
        this.service.organId().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.organId.setValue(data.organId);
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeApps($event) {
        this.loadModules($event.name);
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    loadModules($event) {
        /** @type {?} */
        const __modulesList = [];
        this.service.modules($event).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            Object.keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                /** @type {?} */
                let item = Object.assign({ type: key }, data[key]);
                __modulesList.push(item);
            }));
            this.moduleList = __modulesList;
            if (this.moduleList.length > 0) {
                this.module.setValue(this.module.value || this.moduleList[0].type);
                this.changeModules($event);
            }
            else {
                this.module.setValue('');
                this.description.setValue('');
                this.clearForm();
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeModules($event) {
        /** @type {?} */
        let __typesList = [];
        /** @type {?} */
        const types = this.moduleList.find((/**
         * @param {?} ele
         * @return {?}
         */
        ele => {
            return ele.type === this.module.value;
        }));
        Object.keys(types).forEach((/**
         * @param {?} ele
         * @return {?}
         */
        ele => {
            __typesList = types[ele];
        }));
        this.typeList = __typesList;
        if (this.typeList.length > 0) {
            this.type.setValue(this.type.value || this.typeList[0].type);
        }
    }
    /**
     * @return {?}
     */
    save() {
        /** @type {?} */
        const formData = new FormData(this.templateFormElementRef.nativeElement);
        formData.append('application', this.application.value);
        formData.append('module', this.module.value);
        formData.append('type', this.type.value);
        formData.append('version', this.version.value);
        formData.append('organId', this.organId.value);
        if (!iNet.isEmpty(this.templateId)) {
            formData.append('uuid', this.uuid.value);
            this.service.update(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.templateFormGroup.patchValue(data);
                    this.templateId = data.uuid;
                    this.fileName = data.name;
                    this.validForm.emit(true);
                    this.notification.showMessage(this.formTranslations['UPDATE_SUCCESS'], 'success', this.formTranslations['TITLE']);
                }
                else {
                    this.notification.showMessage(this.formTranslations['UPDATE_ERROR'], 'error', this.formTranslations['TITLE']);
                }
            }));
        }
        else {
            this.service.add(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.templateFormGroup.patchValue(data);
                    this.templateId = data.uuid;
                    this.fileName = data.name;
                    this.validForm.emit(true);
                    this.notification.showMessage(this.formTranslations['ADD_SUCCESS'], 'success', this.formTranslations['TITLE']);
                }
                else {
                    this.notification.showMessage(this.formTranslations['ADD_ERROR'], 'error', this.formTranslations['TITLE']);
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    initForm() {
        this.templateFormGroup = this.fb.group({
            uuid: [],
            application: ['', Validators.required],
            module: ['', Validators.required],
            type: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            version: ['', Validators.required],
            organId: [],
            fileUpload: [],
        });
    }
    /**
     * @return {?}
     */
    get uuid() {
        return this.templateFormGroup.get('uuid');
    }
    /**
     * @return {?}
     */
    get application() {
        return this.templateFormGroup.get('application');
    }
    /**
     * @return {?}
     */
    get module() {
        return this.templateFormGroup.get('module');
    }
    /**
     * @return {?}
     */
    get type() {
        return this.templateFormGroup.get('type');
    }
    /**
     * @return {?}
     */
    get name() {
        return this.templateFormGroup.get('name');
    }
    /**
     * @return {?}
     */
    get description() {
        return this.templateFormGroup.get('description');
    }
    /**
     * @return {?}
     */
    get version() {
        return this.templateFormGroup.get('version');
    }
    /**
     * @return {?}
     */
    get organId() {
        return this.templateFormGroup.get('organId');
    }
    /**
     * @return {?}
     */
    get fileUpload() {
        return this.templateFormGroup.get('fileUpload');
    }
    /**
     * @return {?}
     */
    changeFormValid() {
        /** @type {?} */
        let __valid;
        this.fileName === '' ? __valid = true : __valid = false;
        __valid ? this.validForm.emit(false) : this.validForm.emit(this.templateFormGroup.valid);
    }
}
ReportTemplateEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-report-template-edit',
                template: "<div id=\"report-template-content\" class=\"row center-body m-0\">\n    <div class=\"row justify-content-center mt-1 mb-0 reponsive-card \" style=\"width: 65%\">\n        <div class=\"card shadow box col-sm-12 mt-4\">\n            <div class=\"row ml-0 mr-0 \">\n                <form #templateForm [formGroup]=\"templateFormGroup\" class=\"w-100\">\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0 mt-4\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.APPLICATION' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select #application\n                                           class=\"col -sm-12 pl-0 pr-0\"\n                                           required\n                                           [clearable]=\"false\"\n                                           id=\"application\"\n                                           bindLabel=\"description\"\n                                           bindValue=\"name\"\n                                           [items]=\"applicationList\"\n                                           formControlName=\"application\"\n                                           name=\"application\"\n                                           (changeEvent)=\"changeFormValid()\"\n                                           (change)=\"changeApps($event)\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"application['invalid'] && (application['dirty'] || application['touched'])\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"application['errors']['required']\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.APPLICATION_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left  col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.MODULE' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col-sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"module\"\n                                        [items]=\"moduleList\"\n                                        formControlName=\"module\"\n                                        bindValue=\"type\"\n                                        bindLabel=\"name\"\n                                        name=\"module\"\n                                        (change)=\"changeModules($event)\"\n                                        (changeEvent)=\"changeFormValid()\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"module.invalid && (module.dirty || module.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"module.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.MODULE_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.TYPE' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col-sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"type\"\n                                        [items]=\"typeList\"\n                                        formControlName=\"type\"\n                                        name=\"type\"\n                                        bindValue=\"type\"\n                                        bindLabel=\"name\"\n                                        (changeEvent)=\"changeFormValid()\">\n                                    <ng-template ng-label-tmp let-item=\"item\">\n                                        {{item['name'] | translate}}\n                                    </ng-template>\n                                    <ng-template ng-option-tmp let-item=\"item\">\n                                        {{item['name'] | translate}}\n                                    </ng-template>\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"type.invalid && (type.dirty || type.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"type.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.TYPE_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left  col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.NAME' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <input type=\"text\"\n                                       class=\"form-control form-control-sm \"\n                                       formControlName=\"name\" readonly\n                                       [ngClass]=\"{'is-invalid': name.errors && name.touched}\"\n                                        (keyup)=\"changeFormValid()\"\n                                       id=\"name\" name=\"name\" value=\"\">\n                                <!-- validate -->\n                                <div *ngIf=\"name.invalid && (name.dirty || name.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"name.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.NAME_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.VERSION' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col -sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"version\"\n                                        bindLabel=\"description\"\n                                        bindValue=\"name\"\n                                        [items]=\"versionList\"\n                                        formControlName=\"version\"\n                                        name=\"version\"\n                                        (changeEvent)=\"changeFormValid()\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"version.invalid && (version.dirty || version.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"version.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.VERSION_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 form-group row m-0 mb-3 pl-0\">\n                        <label for=\"description\"\n                               class=\"col-sm-2 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.DESCRIPTION' | translate }} <span\n                                class=\"required\"> :</span></label>\n                        <div class=\"col-sm-10 p-0\">\n                  <textarea #descr type=\"text\" (keyup)=\"changeFormValid()\" style=\"resize: none\" rows=\"3\"\n                            class=\"form-control form-control-sm \"\n                            formControlName=\"description\"\n                            [ngClass]=\"{'is-invalid': description.errors && description.touched}\"\n                            id=\"description\" name=\"description\" value=\"\" required></textarea>\n                            <!-- validate -->\n                            <div *ngIf=\"description.invalid && (description.dirty || description.touched)\"\n                                 class=\"text-danger mt-2 text-df\">\n                                <div *ngIf=\"description.errors.required\">\n                                    <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                    {{ 'COMMON.MODULE.REPORT_TEMPLATE.DESCRIPTION_REQUIRED' | translate }}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 form-group row m-0 mb-3 pl-0\">\n                        <label class=\"control-label col-form-label col-sm-2 pl-0 \">\n                            {{ 'COMMON.MODULE.REPORT_TEMPLATE.FILE_UPLOAD' | translate }} <span\n                                class=\"required\"> :</span>\n                        </label>\n                        <div class=\"col-sm-10 p-0\">\n                            <label class=\"i-file-input\">\n                                <input #file type=\"file\" (change)=\"changeFile($event);changeFormValid()\" formControlName=\"fileUpload\"\n                                       name=\"fileUpload\"\n                                       class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                                <span class=\"i-file-container\" [ngClass]=\"{'selected': fileName}\"\n                                      [attr.data-title]=\"'COMMON.MODULE.REPORT_TEMPLATE.CHOOSE' | translate\">\n                                                            <span class=\"i-file-name\"\n                                                                  [attr.data-title]=\"fileName || ('COMMON.MODULE.REPORT_TEMPLATE.NO_FILE' | translate)\">\n                                                                <i class=\"file-icon fa fa-upload\"></i>\n                                                            </span>\n                                                        </span>\n                                <a class=\"remove\" *ngIf=\"fileName\" href=\"javascript:;\" (click)=\"clearForm()\">\n\n                                    <i class=\"fa fa-times\"></i>\n                                </a>\n                            </label>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n",
                styles: [":host #report-template-content{height:calc(100vh - 115px)}@media (max-width:700px){:host .reponsive-card{padding:0 30px}}:host .pointer{pointer-events:none}:host .custom-center-span{display:flex;align-items:center}:host .center-body{flex-direction:row;justify-content:center;align-content:start}:host .shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}"]
            }] }
];
/** @nocollapse */
ReportTemplateEditComponent.ctorParameters = () => [
    { type: Location },
    { type: FormBuilder },
    { type: NotificationService },
    { type: ReportTemplateService },
    { type: TranslateService },
    { type: ActivatedRoute }
];
ReportTemplateEditComponent.propDecorators = {
    templateId: [{ type: Input }],
    validForm: [{ type: Output }],
    appName: [{ type: Input }],
    appDesc: [{ type: Input }],
    templateFormElementRef: [{ type: ViewChild, args: ['templateForm',] }]
};
if (false) {
    /** @type {?} */
    ReportTemplateEditComponent.prototype.templateId;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.validForm;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.appName;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.appDesc;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.applicationList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.typeList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.moduleList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.versionList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.templateFormGroup;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.attachments;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.fileName;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.applicationParams;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.moduleParams;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.typeParams;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.subRouter;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.formTranslations;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.templateFormElementRef;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.service;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.route;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GlobalReportTemplateModule {
}
GlobalReportTemplateModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ReportTemplateEditComponent],
                imports: [
                    CommonModule,
                    FormsModule,
                    CoreModule,
                    ReactiveFormsModule,
                    TranslateModule,
                    HttpClientModule,
                    NgSelectModule,
                    FileModule,
                    FileUploadModule
                ],
                providers: [ReportTemplateService],
                exports: [ReportTemplateEditComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimePickerModalComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.arrowkeys = true;
        this.hourStep = 1;
        this.minuteStep = 15;
        this.mousewheel = true;
        this.readonlyInput = false;
        this.secondsStep = 10;
        this.showMinutes = true;
        this.showSpinners = true;
        this.onChange = new EventEmitter();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set time(date) {
        this._timeDate = date;
        this.timeStr = TimePickerModalComponent._formatDate(date);
        this.onChange.emit(this.timeStr);
    }
    /**
     * @return {?}
     */
    get time() {
        return this._timeDate;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.$modal = $(this.el.nativeElement).detach().addClass('modal');
        this.$modalContent = this.$modal.find('.time-picker-modal');
        // Touched close
        this.$modal.on('mousedown click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.target.isSameNode(this.$modal[0])) {
                this.close();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.$modal.remove();
    }
    /**
     * @return {?}
     */
    close() {
        this.$modal.detach();
    }
    /**
     * @param {?} css
     * @return {?}
     */
    open(css) {
        this.$modalContent.css(css);
        document.body.appendChild(this.$modal[0]);
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    static _formatDate(date) {
        if (!date || !date.getTime()) {
            return '';
        }
        else {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    }
}
TimePickerModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker-modal',
                template: "<div class=\"time-picker-modal\">\n    <timepicker #timePicker [(ngModel)]=\"time\"\n                [arrowkeys]=\"arrowkeys\"\n                [max]=\"max\"\n                [min]=\"min\"\n                [minuteStep]=\"minuteStep\"\n                [mousewheel]=\"mousewheel\"\n                [readonlyInput]=\"readonlyInput\"\n                [secondsStep]=\"secondsStep\"\n                [showMeridian]=\"showMeridian\"\n                [showMinutes]=\"showMinutes\"\n                [showSeconds]=\"showSeconds\"\n                [showSpinners]=\"showSpinners\">\n\n    </timepicker>\n</div>",
                styles: [":host(.modal){display:block;z-index:1101}.time-picker-modal{position:absolute;border:1px solid rgba(0,0,0,.2);background:#fff;border-radius:4px;padding:10px}"]
            }] }
];
/** @nocollapse */
TimePickerModalComponent.ctorParameters = () => [
    { type: ElementRef }
];
TimePickerModalComponent.propDecorators = {
    arrowkeys: [{ type: Input }],
    hourStep: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    minuteStep: [{ type: Input }],
    mousewheel: [{ type: Input }],
    readonlyInput: [{ type: Input }],
    secondsStep: [{ type: Input }],
    showMeridian: [{ type: Input }],
    showMinutes: [{ type: Input }],
    showSeconds: [{ type: Input }],
    showSpinners: [{ type: Input }],
    time: [{ type: Input }],
    onChange: [{ type: Output }],
    timePicker: [{ type: ViewChild, args: ['timePicker',] }]
};
if (false) {
    /** @type {?} */
    TimePickerModalComponent.prototype.arrowkeys;
    /** @type {?} */
    TimePickerModalComponent.prototype.hourStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.max;
    /** @type {?} */
    TimePickerModalComponent.prototype.min;
    /** @type {?} */
    TimePickerModalComponent.prototype.minuteStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.mousewheel;
    /** @type {?} */
    TimePickerModalComponent.prototype.readonlyInput;
    /** @type {?} */
    TimePickerModalComponent.prototype.secondsStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.showMeridian;
    /** @type {?} */
    TimePickerModalComponent.prototype.showMinutes;
    /** @type {?} */
    TimePickerModalComponent.prototype.showSeconds;
    /** @type {?} */
    TimePickerModalComponent.prototype.showSpinners;
    /** @type {?} */
    TimePickerModalComponent.prototype.onChange;
    /** @type {?} */
    TimePickerModalComponent.prototype.timePicker;
    /** @type {?} */
    TimePickerModalComponent.prototype.timeStr;
    /** @type {?} */
    TimePickerModalComponent.prototype.$modal;
    /** @type {?} */
    TimePickerModalComponent.prototype.$modalContent;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalComponent.prototype._timeDate;
    /** @type {?} */
    TimePickerModalComponent.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => TimePickerModalDirective)),
    multi: true
};
class TimePickerModalDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.open();
        this.onChange();
    }
    /**
     * @return {?}
     */
    onChange() {
        this.timePickerModal.time = this.getDateInput();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.timePickerModal) {
            console.error('[TimePickerModalDirective] Missing timePickerModal');
        }
        this.timePickerModal.onChange.subscribe((/**
         * @param {?} timeStr
         * @return {?}
         */
        (timeStr) => {
            this.writeValue(timeStr);
            if (this.propagateChange) {
                this.propagateChange(timeStr);
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.el.nativeElement.value = value;
        this.valueChange.emit(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @return {?}
     */
    open() {
        /** @type {?} */
        let bounding = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        let css = {
            left: bounding.left
        };
        if (bounding.top + 150 < innerHeight) {
            // Show bottom
            css['top'] = bounding.top + bounding.height + 2;
        }
        else {
            // Show top
            css['bottom'] = bounding.top - 2;
        }
        this.timePickerModal.open(css);
    }
    /**
     * @return {?}
     */
    close() {
        this.timePickerModal.close();
    }
    /**
     * @private
     * @return {?}
     */
    getDateInput() {
        /** @type {?} */
        let value = this.getValue();
        if (!value) {
            return null;
        }
        /** @type {?} */
        let date = new Date();
        date.setMinutes(0);
        // HH:mm:ss format
        /** @type {?} */
        let times;
        if (value.indexOf(':') > -1) {
            times = value.split(':');
        }
        else {
            times = [];
            for (let i = 0; i < value.length + 1; i += 2) {
                times.push(value.substr(i, 2));
            }
        }
        times[0] = Number(times[0]);
        times[1] = Number(times[1]) || 0;
        // Invalid time
        if (!times[0] && times[0] !== 0) {
            return null;
        }
        date.setHours(times[0]);
        date.setMinutes(times[1]);
        return date;
    }
    /**
     * @private
     * @return {?}
     */
    getValue() {
        return this.el.nativeElement.value.trim();
    }
}
TimePickerModalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[timePicker]',
                providers: [DEFAULT_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
TimePickerModalDirective.ctorParameters = () => [
    { type: ElementRef }
];
TimePickerModalDirective.propDecorators = {
    valueChange: [{ type: Output }],
    timePickerModal: [{ type: Input }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onChange: [{ type: HostListener, args: ['change',] }]
};
if (false) {
    /** @type {?} */
    TimePickerModalDirective.prototype.valueChange;
    /** @type {?} */
    TimePickerModalDirective.prototype.timePickerModal;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalDirective.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalDirective.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * TimePickerModal: https://valor-software.com/ngx-bootstrap/#/timepicker#timepicker-config
 *
 * <input type="text" class="form-control" timePicker [timePickerModal]="timeEndModal" [(ngModel)]="timeStr">
 * <time-picker-modal #timeEndModal></time-picker-modal>
 *
 */
class TimePickerModalModule {
}
TimePickerModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    TimepickerModule.forRoot(),
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    TimePickerModalDirective,
                    TimePickerModalComponent
                ],
                exports: [
                    TimePickerModalDirective,
                    TimePickerModalComponent,
                ]
            },] }
];

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AccessRoleComponent, Address, AdminNavbarComponent, AppSelect2Directive, AppSelect2Module, Application, AuthenticateGuard, AutoUnsubscribe, AutocompleteInputDirective, AutocompleteListDirective, AutocompleteModule, BootstrapLayoutModule, CertUtils, ChatMessage, CloudPluginComponent, CloudTransLoader, CloudTranslateModule, CloudTranslateService, CollapseDirective, CollapseModule, ConfirmDialogComponent, ConsoleService, Contact, CropperAvatarDialogComponent, CustomPaginationComponent, CustomPaginationModule, DATA_TABLE_DIRECTIVES, DEFAULT_VALUE_ACCESSOR, DataTable, DataTableColumn, DataTableHeader, DataTablePagination, DataTableResource, DataTableRow, DateFormatUtils, DateTimeModule, DateUtils, DefaultSelectionModel, DefaultSelectionModelFactory, DialogAction, DialogModule, DictionaryService, EXT_ACTION, EXT_CHROME_URL, EXT_FIREFOX_URL, EXT_HASH_ALG, EmailTemplate, EmailTemplateEditComponent, ErrorPageComponent, FileDropDirective, FileExtPipe, FileFormatService, FileIconPipe, FileListComponent, FileModule, FileSelectDirective, FileType, FileUploadModule, FileUploader, FrontViewComponent, FrontViewDirective, FrontViewModule, FrontViewService, GlobalContactService, GlobalEmailTemplateModule, GlobalReportTemplateModule, GridModule, Hide, HttpsRequestInterceptor, ImageCropperComponent, ImageCropperModule, ImageUtils, InterceptorModule, ItemsList, KeyCode, LinkPreviewComponent, ListViewComponent, ListViewDirective, ListViewModule, LocationService, Logger, Message, MinPipe, ModalSelectComponent, NATIVE_APP_URL, NavigationTab, NavigationTabModule, NgDropdownPanelComponent, NgFooterTemplateDirective, NgHeaderTemplateDirective, NgLabelTemplateDirective, NgLoadingTextTemplateDirective, NgMultiLabelTemplateDirective, NgNotFoundTemplateDirective, NgOptgroupTemplateDirective, NgOptionComponent, NgOptionHighlightDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig, NgSelectModule, NgTagTemplateDirective, NgTypeToSearchTemplateDirective, NgxEditorComponent, NgxEditorMessageComponent, NgxEditorModule, NgxEditorToolbarComponent, NgxGrippieComponent, NotifyMessage, NotifyMessageContent, NotifyMessageItem, NotifyModule, NotifyService, NumberFormatModule, NumberSeparatorDirective, NumberUtilsService, OpenGraphModule, OpenGraphService, Organization, OrganizationGeneralInformationComponent, OrganizationInformation, OrganizationInformationComponent, OrganizationModule, OrganizationService, PaginationListComponent, PaginationListModule, PhotoSwipe, PhotoSwipeComponent, PhotoSwipeModule, PixelConverter, PluginManagerModule, PluginManagerService, PluginToolbarDirective, ReportTemplateEditComponent, ResponseFileItem, ResponseUploadFile, SELECTION_MODEL_FACTORY, SafeHtmlPipe, SafePipe, SafePipeModule, SelectUserComponent, SelectUserModule, StickyBar, SystemApplication, TimePickerModalComponent, TimePickerModalDirective, TimePickerModalModule, ToolbarContainer, UserProfileComponent, UserProfileInfoComponent, UserProfileModule, UserRole, ViewerComponent, ViewerDirective, ViewerModule, ViewerRoutingModule, ViewerService, VirtualScrollService, WebTokenModule, WebTokenService, WebTokenSigner, WebsocketModule, WindowService, defaultTranslations, drag, isDefined, isFunction, isObject, isPromise, newId, stripSpecialChars, systemEnLocale, systemViLocale, NotifyMessageService as ɵa, BootstrapLayoutRoutingModule as ɵb, CommonToolbarComponent as ɵba, DateShortcutPipe as ɵbb, TimeAgoPipe as ɵbc, MessageService as ɵbd, CommandExecutorService as ɵbe, EmailTemplateService as ɵbf, ReportTemplateService as ɵbg, BootstrapUserProfileComponent as ɵc, BootstrapCompanyProfileComponent as ɵd, ToastrModule as ɵe, Toast as ɵf, ToastrService as ɵg, TOAST_CONFIG as ɵi, Overlay as ɵj, OverlayContainer as ɵk, ToastPackage as ɵl, ToastRef as ɵm, OverlayRef as ɵn, BasePortalHost as ɵo, DefaultGlobalConfig as ɵp, ToastContainerDirective as ɵq, ToastContainerModule as ɵr, SharingInformationModule as ɵs, SharingInformationTemplateComponent as ɵt, SharingInformationService as ɵu, LayoutComponent as ɵv, MessageSideNavComponent as ɵw, AbstractSideNavComponent as ɵx, AppSideNavComponent as ɵy, SocialSideNavComponent as ɵz };
//# sourceMappingURL=inet-ui.js.map
