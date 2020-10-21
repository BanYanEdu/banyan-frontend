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
export class AdminNavbarComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGF5b3V0L2Jvb3RzdHJhcC9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUVOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsS0FBSyxFQUFFLFNBQVMsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFTNUUsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7OztJQXNDN0IsWUFBb0IsV0FBd0IsRUFDeEIsTUFBYyxFQUNkLGtCQUFzQyxFQUN0QyxVQUErQixFQUMvQixxQkFBNEMsRUFDNUMsY0FBb0MsRUFDckMsU0FBMkI7UUFOMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7UUFDL0IsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFDckMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUF2Q3JDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLHNCQUFpQixH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QW1DOztJQUNuQyw0Q0FBa0Q7O0lBQ2xELHNEQUE0RDs7SUFDNUQsa0RBQXdEOztJQUV4RCxxREFBMkQ7O0lBQzNELG1EQUF5RDs7SUFDekQsMkNBQW1EOztJQUNuRCwrQ0FBK0Q7O0lBQy9ELGtEQUFrRTs7SUFDbEUsOENBQThEOztJQUM5RCwrQ0FBMEM7O0lBRTFDLHlDQUF5Qzs7SUFDekMsMkNBQStCOztJQUMvQix5Q0FBaUQ7O0lBRWpELHlDQUE4Qzs7SUFDOUMscUNBQTBCOztJQUMxQiwrQ0FBd0I7O0lBRXhCLHVDQUFnQjs7Ozs7SUFFSiwyQ0FBZ0M7Ozs7O0lBQ2hDLHNDQUFzQjs7Ozs7SUFDdEIsa0RBQThDOzs7OztJQUM5QywwQ0FBdUM7Ozs7O0lBQ3ZDLHFEQUFvRDs7Ozs7SUFDcEQsOENBQTRDOztJQUM1Qyx5Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBPbkluaXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCwgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb3JlU2VydmljZSwgVXNlclByb2ZpbGVTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHtPcmdhbml6YXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtDbG91ZFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi90cmFuc2xhdGUvY2xvdWQtdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZ5TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbm90aWZ5LW1lc3NhZ2Uuc2VydmljZVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWFkbWluLW5hdmJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbk5hdmJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG5hdmJhckl0ZW1UcGw6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBJbnB1dCgpIHByb2ZpbGVJdGVtVHBsOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBASW5wdXQoKSBuYXZiYXJNZW51VHBsOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBASW5wdXQoKSBoaWRlVG9nZ2xlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhpZGVUb2dnbGVyQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGlkZUNvbXBhbnlNZW51OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGlkZVByb2ZpbGVNZW51OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGlkZVNlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGFwcGxpY2F0aW9uTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhvbWVSb3V0ZXJMaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbm90ZVJvdXRlckxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBtZXNzYWdlQ291bnQ6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgpIGhpZGVCcmFuZE5hbWU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGhpZGVMb2dvOiBib29sZWFuID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIG9uVG9nZ2xlTWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25Ub2dnbGVNZXNzYWdlU2lkZU5hdiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25Ub2dnbGVBcHBTaWRlTmF2ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8vIEBPdXRwdXQoKSBvblRvZ2dsZUNoYXRTaWRlTmF2ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBvblRvZ2dsZVNvY2lhbFNpZGVOYXYgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uVG9nZ2xlTm90ZVNpZGVOYXYgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uQ2xpY2tMb2dvID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQElucHV0KCkgdmlzaWJsZUNoYXRJY29uOiBib29sZWFuID0gIWlOZXQuaXNFbXB0eShpTmV0LnByZWZpeCk7XG4gICAgQElucHV0KCkgdmlzaWJsZU1lc3NhZ2VJY29uOiBib29sZWFuID0gIWlOZXQuaXNFbXB0eShpTmV0LnByZWZpeCk7XG4gICAgQElucHV0KCkgdmlzaWJsZUFwcEljb246IGJvb2xlYW4gPSAhaU5ldC5pc0VtcHR5KGlOZXQucHJlZml4KTtcbiAgICBASW5wdXQoKSB2aXNpYmxlTm90ZUljb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL2V4dGVybmFsVXJsID0gJ2phdmFzY3JpcHQ6Oyc7XG4gICAgYXZhdGFyVXJsOiBzdHJpbmcgPSBpTmV0LkJMQU5LX0lNQUdFX1VSTDtcbiAgICBkaXNwbGF5TmFtZSA9IGlOZXQuZGlzcGxheU5hbWU7XG4gICAgQElucHV0KCkgYnJhbmROYW1lOiBzdHJpbmcgPSAgaU5ldC5vcmdOYW1lIHx8ICcnO1xuXG4gICAgQFZpZXdDaGlsZCgnYnJhbmRMaW5rJykgYnJhbmRMaW5rOiBFbGVtZW50UmVmO1xuICAgIGxhbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgY3VycmVudExhbmd1YWdlOiBzdHJpbmc7XG5cbiAgICBsb2dvVXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlclByb2ZpbGVTZXJ2aWNlOiBVc2VyUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvcmdTZXJ2aWNlOiBPcmdhbml6YXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2xvdWRUcmFuc2xhdGVTZXJ2aWNlOiBDbG91ZFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTm90aWZ5TWVzc2FnZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHVibGljIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3RoaXMuYnJhbmROYW1lID0gIWlOZXQuaXNFbXB0eSh0aGlzLmFwcGxpY2F0aW9uTmFtZSkgPyBgJHt0aGlzLmFwcGxpY2F0aW9uTmFtZX0gLSAke3RoaXMub3JnTmFtZX1gIDogdGhpcy5vcmdOYW1lO1xuICAgICAgICAvL3RoaXMuZXh0ZXJuYWxVcmwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnXFwvXFwvJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgJ1xcLycgKyBpTmV0LmZpcm1QcmVmaXg7XG4gICAgICAgIHRoaXMubGFuZ3MgPSB0aGlzLnRyYW5zbGF0ZS5nZXRMYW5ncygpOyAvLyBMYW5ndWFnZXNcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZ3VhZ2UgPSB0aGlzLmNsb3VkVHJhbnNsYXRlU2VydmljZS5nZXRDdXJyZW50TGFuZygpO1xuICAgICAgICBpZighaU5ldC5pc0VtcHR5KGlOZXQucHJlZml4KSkge1xuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0RnVsbE5hbWUoKS50aGVuKGZ1bGxuYW1lID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlOYW1lID0gZnVsbG5hbWUgfHwgaU5ldC5kaXNwbGF5TmFtZSB8fCBpTmV0LnVzZXJuYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldEF2YXRhclVybCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9IHVybDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jb3VudE1lc3NhZ2UoKTtcbiAgICAgICAgICAgIC8vTG9hZCBsb2dvIGZvciBoZWFkZXJcblxuICAgICAgICAgICAgdGhpcy5sb2dvVXJsID0gdGhpcy5vcmdTZXJ2aWNlLmdldExvZ29VcmwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZVNlcnZpY2UuZ2V0RW52aXJvbm1lbnQoKVsncHJvZHVjdGlvbiddKSB7XG4gICAgICAgICAgICB0aGlzLmNvcmVTZXJ2aWNlLmxvZ291dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudSgpIHtcbiAgICAgICAgdGhpcy5vblRvZ2dsZU1lbnUuZW1pdCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU1lc3NhZ2VTaWRlTmF2KCRldmVudCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlTWVzc2FnZVNpZGVOYXYuZW1pdCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUFwcFNpZGVOYXYoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25Ub2dnbGVBcHBTaWRlTmF2LmVtaXQoKTtcbiAgICB9XG5cbiAgICAvLyB0b2dnbGVTb2NpYWxTaWRlTmF2KCRldmVudCkge1xuICAgIC8vICAgICB0aGlzLm9uVG9nZ2xlU29jaWFsU2lkZU5hdi5lbWl0KCk7XG4gICAgLy8gfVxuXG4gICAgLy8gdG9nZ2xlQ2hhdFNpZGVOYXYoJGV2ZW50KSB7XG4gICAgLy8gICAgIHRoaXMub25Ub2dnbGVDaGF0U2lkZU5hdi5lbWl0KCk7XG4gICAgLy8gfVxuXG4gICAgdG9nZ2xlTm90ZU5hdigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vblRvZ2dsZU5vdGVTaWRlTmF2LmVtaXQoKVxuICAgIH1cblxuICAgIGNoYW5nZUxhbmd1YWdlKGxhbmc6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS51c2UobGFuZykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExhbmd1YWdlID0gbGFuZztcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3VkVHJhbnNsYXRlU2VydmljZS5zZXRDdXJyZW50TGFuZyhsYW5nKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3JlU2VydmljZS5nZXRFbnZpcm9ubWVudCgpWydwcm9kdWN0aW9uJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3JlU2VydmljZS51cGRhdGVMYW5ndWFnZShsYW5nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW1hZ2VVcmwoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuYXZhdGFyVXJsID0gVXNlclByb2ZpbGVTZXJ2aWNlLkRFRkFVTFRfQVZBVEFSX1VSTDtcbiAgICB9XG5cbiAgICB1cGRhdGVCbGFua0ltYWdlKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSBpTmV0LkJMQU5LX0lNQUdFX1VSTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvdW50TWVzc2FnZSgpe1xuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmNvdW50KCkudGhlbigoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ291bnQgPSAoY291bnQgJiYgY291bnQgPiAwKSA/IGNvdW50LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlQ291bnQodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUNvdW50ID0gdjtcbiAgICB9XG4gICAgY2xpY2tMb2dvKCRldmVudCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tMb2dvLmVtaXQodGhpcy5ob21lUm91dGVyTGluayk7XG4gICAgfVxufVxuIl19