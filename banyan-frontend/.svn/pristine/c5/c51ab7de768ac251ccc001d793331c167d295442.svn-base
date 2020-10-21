/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output, TemplateRef, ElementRef, Input, ViewChild } from '@angular/core';
import { CoreService, UserProfileService } from 'inet-core';
import { TranslateService } from "@ngx-translate/core";
import { OrganizationService } from "../../../organization/organization.service";
import { Router } from "@angular/router";
import { CloudTranslateService } from "../../../translate/cloud-translate.service";
import { NotifyMessageService } from "../../../common/notify-message.service";
var AdminNavbarComponent = /** @class */ (function () {
    function AdminNavbarComponent(coreService, router, userProfileService, orgService, cloudTranslateService, messageService, translate) {
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
    AdminNavbarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        //this.brandName = !iNet.isEmpty(this.applicationName) ? `${this.applicationName} - ${this.orgName}` : this.orgName;
        //this.externalUrl = window.location.protocol + '\/\/' + window.location.host + '\/' + iNet.firmPrefix;
        this.langs = this.translate.getLangs(); // Languages
        this.currentLanguage = this.cloudTranslateService.getCurrentLang();
        if (!iNet.isEmpty(iNet.prefix)) {
            this.userProfileService.getFullName().then((/**
             * @param {?} fullname
             * @return {?}
             */
            function (fullname) {
                _this.displayName = fullname || iNet.displayName || iNet.username;
            }));
            this.userProfileService.getAvatarUrl().then((/**
             * @param {?} url
             * @return {?}
             */
            function (url) {
                _this.avatarUrl = url;
            }));
            this.countMessage();
            //Load logo for header
            this.logoUrl = this.orgService.getLogoUrl();
        }
    };
    /**
     * @return {?}
     */
    AdminNavbarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AdminNavbarComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        if (this.coreService.getEnvironment()['production']) {
            this.coreService.logout();
        }
    };
    /**
     * @return {?}
     */
    AdminNavbarComponent.prototype.toggleMenu = /**
     * @return {?}
     */
    function () {
        this.onToggleMenu.emit();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AdminNavbarComponent.prototype.toggleMessageSideNav = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onToggleMessageSideNav.emit();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AdminNavbarComponent.prototype.toggleAppSideNav = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onToggleAppSideNav.emit();
    };
    // toggleSocialSideNav($event) {
    //     this.onToggleSocialSideNav.emit();
    // }
    // toggleChatSideNav($event) {
    //     this.onToggleChatSideNav.emit();
    // }
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
    AdminNavbarComponent.prototype.toggleNoteNav = 
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
    function ($event) {
        this.onToggleNoteSideNav.emit();
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    AdminNavbarComponent.prototype.changeLanguage = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        this.translate.use(lang).subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.currentLanguage = lang;
            _this.cloudTranslateService.setCurrentLang(lang);
            if (_this.coreService.getEnvironment()['production']) {
                _this.coreService.updateLanguage(lang, (/**
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
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AdminNavbarComponent.prototype.updateImageUrl = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.avatarUrl = UserProfileService.DEFAULT_AVATAR_URL;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AdminNavbarComponent.prototype.updateBlankImage = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event) {
            this.logoUrl = iNet.BLANK_IMAGE_URL;
        }
    };
    /**
     * @return {?}
     */
    AdminNavbarComponent.prototype.countMessage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.messageService.count().then((/**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            _this.messageCount = (count && count > 0) ? count.toString() : '';
        }));
    };
    /**
     * @param {?} v
     * @return {?}
     */
    AdminNavbarComponent.prototype.setMessageCount = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.messageCount = v;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AdminNavbarComponent.prototype.clickLogo = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onClickLogo.emit(this.homeRouterLink);
    };
    AdminNavbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-admin-navbar',
                    template: "<nav class=\"navbar navbar-expand-md\">\n    <div class=\"navbar-header logo-area\" (click)=\"clickLogo($event)\" [routerLink]=\"homeRouterLink\">\n        <ng-container>\n            <img *ngIf=\"!hideLogo && logoUrl\" alt=\"Logo\" class=\"logo\" [title]=\"brandName\" [src]=\"logoUrl\"\n                 (error)=\"updateBlankImage($event)\">\n            <a *ngIf=\"!hideBrandName\" #brandLink class=\"navbar-brand\">{{brandName}}</a>\n        </ng-container>\n    </div>\n    <ng-template [ngTemplateOutlet]=\"navbarMenuTpl\"></ng-template>\n    <div class=\"navbar-collapse collapse in\" id=\"navbar-collapse\" aria-expanded=\"true\" style=\"\">\n        <ul class=\"navbar-nav navbar-right ml-auto\">\n            <ng-template [ngTemplateOutlet]=\"navbarItemTpl\"></ng-template>\n            <li *ngIf=\"visibleNoteIcon\" class=\"nav-item\"><a href=\"javascript:;\" (click)=\"toggleNoteNav($event)\"><i\n                    class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></a></li>\n            <li *ngIf=\"visibleMessageIcon\" class=\"nav-item\" [ngClass]=\"{'icon-animated-heartbeat': messageCount}\">\n                <a href=\"javascript:;\" (click)=\"toggleMessageSideNav($event)\">\n                    <i class=\"fa fa-bell rotate-15\"></i><span class=\"number\">{{messageCount}}</span>\n                </a>\n            </li>\n            <li *ngIf=\"visibleAppIcon\" class=\"nav-item\"><a href=\"javascript:;\" (click)=\"toggleAppSideNav($event)\"><i\n                    class=\"fa fa-th-large\"></i></a></li>\n            <li id=\"user-profile\" class=\"light-blue user-profile\">\n                <a *ngIf=\"displayName\" class=\"dropdown-toggle\" href=\"javascript:;\" data-toggle=\"dropdown\">\n                    <img [src]=\"avatarUrl\" [alt]=\"displayName\" class=\"nav-user-photo\" (error)=\"updateImageUrl($event)\">\n                    <!--span class=\"user-info\" [title]=\"displayName\"><small>{{'COMMON.WELCOME' | translate}},</small>{{displayName}}</span-->\n                </a>\n                <div class=\"dropdown-menu\">\n                    <a *ngIf=\"!hideProfileMenu\" class=\"dropdown-item\" href=\"javascript:;\" routerLink=\"user-profile\">\n                        <i class=\"fa fa-user\"></i> {{'COMMON.MENU.USER_PROFILE' | translate}}\n                    </a>\n                    <a *ngIf=\"!hideCompanyMenu\" class=\"dropdown-item\" href=\"javascript:;\" routerLink=\"company-profile\">\n                        <i class=\"fa fa-building\"></i> {{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}\n                    </a>\n                    <ng-template [ngTemplateOutlet]=\"profileItemTpl\"></ng-template>\n                    <a class=\"dropdown-submenu pull-left\">\n                        <a class=\"dropdown-item dropdown-toggle\" href=\"#\">\n                            <i class=\"fa fa-language\"></i> {{'COMMON.MENU.LANGUAGE' | translate}}\n                            <small class=\"text-lowercase\">({{ currentLanguage | translate }})</small>\n                        </a>\n                        <div class=\"dropdown-menu\">\n                            <a class=\"dropdown-item\" href=\"javascript:;\" *ngFor=\"let lang of langs\"\n                               (click)=\"changeLanguage(lang)\" [ngClass]=\"{'active': currentLanguage==lang}\">\n                                <i class=\"fa\"\n                                   [ngClass]=\"{'fa-check': currentLanguage==lang}\"></i> {{ lang | translate }}\n                            </a>\n                        </div>\n                        <div class=\"dropdown-divider\"></div>\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:;\" (click)=\"logout()\">\n                        <i class=\"fa fa-sign-out\"></i> {{'COMMON.MENU.LOGOUT' | translate}}\n                    </a>\n                </div>\n            </li>\n        </ul>\n    </div>\n</nav>\n",
                    styles: ["@-webkit-keyframes heartbeat{from{transform:scale(1);transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes heartbeat{from{transform:scale(1);transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.navbar .rotate-15{transform:rotate(15deg)}.navbar .icon-animated-heartbeat{-webkit-animation:1.5s ease-in-out infinite both heartbeat;animation:1.5s ease-in-out infinite both heartbeat}@media (max-width:767px){.navbar .navbar-right{margin-top:-10px;margin-bottom:1px;margin-left:-7px}.navbar .navbar-header{display:inline-block;width:100%}}@media (min-width:768px){.navbar .navbar-right{float:right!important;margin-right:-15px}}"]
                }] }
    ];
    /** @nocollapse */
    AdminNavbarComponent.ctorParameters = function () { return [
        { type: CoreService },
        { type: Router },
        { type: UserProfileService },
        { type: OrganizationService },
        { type: CloudTranslateService },
        { type: NotifyMessageService },
        { type: TranslateService }
    ]; };
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
    return AdminNavbarComponent;
}());
export { AdminNavbarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGF5b3V0L2Jvb3RzdHJhcC9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUVOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsS0FBSyxFQUFFLFNBQVMsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFJNUU7SUEyQ0ksOEJBQW9CLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxrQkFBc0MsRUFDdEMsVUFBK0IsRUFDL0IscUJBQTRDLEVBQzVDLGNBQW9DLEVBQ3JDLFNBQTJCO1FBTjFCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3JDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBdkNyQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsb0JBQWUs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O0NBQUEsQUEvSUQsSUErSUM7U0ExSVksb0JBQW9COzs7SUFFN0IsNkNBQWdEOztJQUNoRCw4Q0FBaUQ7O0lBQ2pELDZDQUFnRDs7SUFDaEQsMkNBQXNDOztJQUN0QyxpREFBNEM7O0lBQzVDLCtDQUEwQzs7SUFDMUMsK0NBQTBDOztJQUMxQywwQ0FBcUM7O0lBQ3JDLCtDQUFpQzs7SUFDakMsOENBQWdDOztJQUNoQyw4Q0FBZ0M7O0lBQ2hDLDRDQUFtQzs7SUFDbkMsNkNBQXVDOztJQUN2Qyx3Q0FBbUM7O0lBQ25DLDRDQUFrRDs7SUFDbEQsc0RBQTREOztJQUM1RCxrREFBd0Q7O0lBRXhELHFEQUEyRDs7SUFDM0QsbURBQXlEOztJQUN6RCwyQ0FBbUQ7O0lBQ25ELCtDQUErRDs7SUFDL0Qsa0RBQWtFOztJQUNsRSw4Q0FBOEQ7O0lBQzlELCtDQUEwQzs7SUFFMUMseUNBQXlDOztJQUN6QywyQ0FBK0I7O0lBQy9CLHlDQUFpRDs7SUFFakQseUNBQThDOztJQUM5QyxxQ0FBMEI7O0lBQzFCLCtDQUF3Qjs7SUFFeEIsdUNBQWdCOzs7OztJQUVKLDJDQUFnQzs7Ozs7SUFDaEMsc0NBQXNCOzs7OztJQUN0QixrREFBOEM7Ozs7O0lBQzlDLDBDQUF1Qzs7Ozs7SUFDdkMscURBQW9EOzs7OztJQUNwRCw4Q0FBNEM7O0lBQzVDLHlDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIE9uSW5pdCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LCBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvcmVTZXJ2aWNlLCBVc2VyUHJvZmlsZVNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5pbXBvcnQge09yZ2FuaXphdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0Nsb3VkVHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL3RyYW5zbGF0ZS9jbG91ZC10cmFuc2xhdGUuc2VydmljZVwiO1xuaW1wb3J0IHtOb3RpZnlNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ub3RpZnktbWVzc2FnZS5zZXJ2aWNlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYWRtaW4tbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmF2YmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uYXZiYXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTmF2YmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbmF2YmFySXRlbVRwbDogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQElucHV0KCkgcHJvZmlsZUl0ZW1UcGw6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBJbnB1dCgpIG5hdmJhck1lbnVUcGw6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBJbnB1dCgpIGhpZGVUb2dnbGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGlkZVRvZ2dsZXJCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlQ29tcGFueU1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlUHJvZmlsZU1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlU2VhcmNoOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgYXBwbGljYXRpb25OYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaG9tZVJvdXRlckxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBub3RlUm91dGVyTGluazogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1lc3NhZ2VDb3VudDogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCkgaGlkZUJyYW5kTmFtZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgaGlkZUxvZ286IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgb25Ub2dnbGVNZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBvblRvZ2dsZU1lc3NhZ2VTaWRlTmF2ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBvblRvZ2dsZUFwcFNpZGVOYXYgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgLy8gQE91dHB1dCgpIG9uVG9nZ2xlQ2hhdFNpZGVOYXYgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uVG9nZ2xlU29jaWFsU2lkZU5hdiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25Ub2dnbGVOb3RlU2lkZU5hdiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25DbGlja0xvZ28gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBASW5wdXQoKSB2aXNpYmxlQ2hhdEljb246IGJvb2xlYW4gPSAhaU5ldC5pc0VtcHR5KGlOZXQucHJlZml4KTtcbiAgICBASW5wdXQoKSB2aXNpYmxlTWVzc2FnZUljb246IGJvb2xlYW4gPSAhaU5ldC5pc0VtcHR5KGlOZXQucHJlZml4KTtcbiAgICBASW5wdXQoKSB2aXNpYmxlQXBwSWNvbjogYm9vbGVhbiA9ICFpTmV0LmlzRW1wdHkoaU5ldC5wcmVmaXgpO1xuICAgIEBJbnB1dCgpIHZpc2libGVOb3RlSWNvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vZXh0ZXJuYWxVcmwgPSAnamF2YXNjcmlwdDo7JztcbiAgICBhdmF0YXJVcmw6IHN0cmluZyA9IGlOZXQuQkxBTktfSU1BR0VfVVJMO1xuICAgIGRpc3BsYXlOYW1lID0gaU5ldC5kaXNwbGF5TmFtZTtcbiAgICBASW5wdXQoKSBicmFuZE5hbWU6IHN0cmluZyA9ICBpTmV0Lm9yZ05hbWUgfHwgJyc7XG5cbiAgICBAVmlld0NoaWxkKCdicmFuZExpbmsnKSBicmFuZExpbms6IEVsZW1lbnRSZWY7XG4gICAgbGFuZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBjdXJyZW50TGFuZ3VhZ2U6IHN0cmluZztcblxuICAgIGxvZ29Vcmw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VyUHJvZmlsZVNlcnZpY2U6IFVzZXJQcm9maWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG9yZ1NlcnZpY2U6IE9yZ2FuaXphdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjbG91ZFRyYW5zbGF0ZVNlcnZpY2U6IENsb3VkVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBOb3RpZnlNZXNzYWdlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vdGhpcy5icmFuZE5hbWUgPSAhaU5ldC5pc0VtcHR5KHRoaXMuYXBwbGljYXRpb25OYW1lKSA/IGAke3RoaXMuYXBwbGljYXRpb25OYW1lfSAtICR7dGhpcy5vcmdOYW1lfWAgOiB0aGlzLm9yZ05hbWU7XG4gICAgICAgIC8vdGhpcy5leHRlcm5hbFVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICdcXC9cXC8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyAnXFwvJyArIGlOZXQuZmlybVByZWZpeDtcbiAgICAgICAgdGhpcy5sYW5ncyA9IHRoaXMudHJhbnNsYXRlLmdldExhbmdzKCk7IC8vIExhbmd1YWdlc1xuICAgICAgICB0aGlzLmN1cnJlbnRMYW5ndWFnZSA9IHRoaXMuY2xvdWRUcmFuc2xhdGVTZXJ2aWNlLmdldEN1cnJlbnRMYW5nKCk7XG4gICAgICAgIGlmKCFpTmV0LmlzRW1wdHkoaU5ldC5wcmVmaXgpKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlU2VydmljZS5nZXRGdWxsTmFtZSgpLnRoZW4oZnVsbG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU5hbWUgPSBmdWxsbmFtZSB8fCBpTmV0LmRpc3BsYXlOYW1lIHx8IGlOZXQudXNlcm5hbWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVXJsKCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gdXJsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNvdW50TWVzc2FnZSgpO1xuICAgICAgICAgICAgLy9Mb2FkIGxvZ28gZm9yIGhlYWRlclxuXG4gICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSB0aGlzLm9yZ1NlcnZpY2UuZ2V0TG9nb1VybCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBpZiAodGhpcy5jb3JlU2VydmljZS5nZXRFbnZpcm9ubWVudCgpWydwcm9kdWN0aW9uJ10pIHtcbiAgICAgICAgICAgIHRoaXMuY29yZVNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVNZW51KCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlTWVudS5lbWl0KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTWVzc2FnZVNpZGVOYXYoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25Ub2dnbGVNZXNzYWdlU2lkZU5hdi5lbWl0KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQXBwU2lkZU5hdigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vblRvZ2dsZUFwcFNpZGVOYXYuZW1pdCgpO1xuICAgIH1cblxuICAgIC8vIHRvZ2dsZVNvY2lhbFNpZGVOYXYoJGV2ZW50KSB7XG4gICAgLy8gICAgIHRoaXMub25Ub2dnbGVTb2NpYWxTaWRlTmF2LmVtaXQoKTtcbiAgICAvLyB9XG5cbiAgICAvLyB0b2dnbGVDaGF0U2lkZU5hdigkZXZlbnQpIHtcbiAgICAvLyAgICAgdGhpcy5vblRvZ2dsZUNoYXRTaWRlTmF2LmVtaXQoKTtcbiAgICAvLyB9XG5cbiAgICB0b2dnbGVOb3RlTmF2KCRldmVudCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlTm90ZVNpZGVOYXYuZW1pdCgpXG4gICAgfVxuXG4gICAgY2hhbmdlTGFuZ3VhZ2UobGFuZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLnVzZShsYW5nKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGFuZ3VhZ2UgPSBsYW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvdWRUcmFuc2xhdGVTZXJ2aWNlLnNldEN1cnJlbnRMYW5nKGxhbmcpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvcmVTZXJ2aWNlLmdldEVudmlyb25tZW50KClbJ3Byb2R1Y3Rpb24nXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcmVTZXJ2aWNlLnVwZGF0ZUxhbmd1YWdlKGxhbmcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbWFnZVVybCgkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSBVc2VyUHJvZmlsZVNlcnZpY2UuREVGQVVMVF9BVkFUQVJfVVJMO1xuICAgIH1cblxuICAgIHVwZGF0ZUJsYW5rSW1hZ2UoJGV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nb1VybCA9IGlOZXQuQkxBTktfSU1BR0VfVVJMO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY291bnRNZXNzYWdlKCl7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuY291bnQoKS50aGVuKChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb3VudCA9IChjb3VudCAmJiBjb3VudCA+IDApID8gY291bnQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldE1lc3NhZ2VDb3VudCh2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlQ291bnQgPSB2O1xuICAgIH1cbiAgICBjbGlja0xvZ28oJGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGlja0xvZ28uZW1pdCh0aGlzLmhvbWVSb3V0ZXJMaW5rKTtcbiAgICB9XG59XG4iXX0=