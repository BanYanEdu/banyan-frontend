/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { AdminNavbarComponent } from "./navbar/navbar.component";
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(router) {
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
    LayoutComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (window.localStorage) {
            this.expandedMenu = (window.localStorage.getItem('expandedMenu') === '1');
        }
        // this.fullLayoutWithUrls.push('/user-profile');
        this._router = this.router.events.filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; }))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var url = event.url;
            _this.onChangeUrl(url);
        }));
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    LayoutComponent.prototype.onChangeUrl = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (!this.fullScreenLayout) {
            /** @type {?} */
            var __visibleMenu = !!this.menu;
            if (__visibleMenu) {
                for (var i = 0; i < this.fullLayoutWithUrls.length; i++) {
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
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        //Using jQuery to handle menu
        $(document).ready((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var $menu = $('#mainnav-menu');
            /** @type {?} */
            var activeCls = 'active';
            /** @type {?} */
            var $elements = $menu.find('li');
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
                var $currentActive = $menu.find('li.active');
                $currentActive.find('a[data-toggle]').trigger("click");
                $(this).addClass(activeCls);
            }));
        }));
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._router.unsubscribe();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onToggleMenu = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.expandedMenu = !this.expandedMenu;
        window.localStorage.setItem('expandedMenu', this.expandedMenu ? '1' : '0');
        window.dispatchEvent(new Event('resize'));
        this.onToggle.emit(this.expandedMenu);
    };
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    LayoutComponent.prototype.updateSlider = /**
     * @private
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.expandedSlider = v;
        this.visibleOverlay = v;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onToggleMessageSlider = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.expandedAppSlider = false;
        this.expandedSocialSlider = false;
        this.expandedChatSlider = false;
        this.expandedMessageSlider = !this.expandedMessageSlider;
        this.updateSlider(this.expandedMessageSlider);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onToggleAppSlider = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.expandedChatSlider = false;
        this.expandedSocialSlider = false;
        this.expandedMessageSlider = false;
        this.expandedAppSlider = !this.expandedAppSlider;
        this.updateSlider(this.expandedAppSlider);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onToggleSocialSlider = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.expandedAppSlider = false;
        this.expandedChatSlider = false;
        this.expandedMessageSlider = false;
        this.expandedSocialSlider = !this.expandedSocialSlider;
        this.updateSlider(this.expandedSocialSlider);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onToggleNoteSlider = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.expandedAppSlider = false;
        this.expandedSocialSlider = false;
        this.expandedChatSlider = false;
        this.expandedMessageSlider = false;
        this.updateSlider(this.expandedMessageSlider);
        this.router.navigate(['note', 'list']);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onCloseSlider = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.expandedMessageSlider = false;
        this.expandedAppSlider = false;
        this.expandedChatSlider = false;
        this.expandedSocialSlider = false;
        this.expandedSlider = false;
        this.visibleOverlay = false;
    };
    //====================Message count=================
    //====================Message count=================
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onClearMessage = 
    //====================Message count=================
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.navbarComponent) {
            this.navbarComponent.setMessageCount('');
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.onLoadMessage = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.navbarComponent) {
            this.navbarComponent.countMessage();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LayoutComponent.prototype.clickLogo = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onClickLogo.emit(this.homeRouterLink);
    };
    LayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-layout',
                    template: "<div id=\"container\" [class]=\"themeClass\" [ngClass]=\"{'mainnav-lg': expandedMenu, 'mainnav-sm': !expandedMenu}\">\n    <div toastContainer></div>\n    <app-admin-navbar (onToggleMenu)=\"onToggleMenu($event)\"\n                      (onToggleMessageSideNav)=\"onToggleMessageSlider($event)\"\n                      (onToggleAppSideNav)=\"onToggleAppSlider($event)\"\n                      (onToggleSocialSideNav)=\"onToggleSocialSlider($event)\"\n                      (onToggleNoteSideNav)=\"onToggleNoteSlider($event)\"\n                      (onClickLogo)=\"clickLogo($event)\"\n                      [hideSearch]=\"hideSearch\" [applicationName]=\"appName\"\n                      [homeRouterLink]=\"homeRouterLink\" [navbarItemTpl]=\"navbarItemTpl\" [profileItemTpl]=\"profileItemTpl\"\n                      [navbarMenuTpl]=\"navbarMenu\" [visibleAppIcon]=\"visibleAppIcon\" [visibleChatIcon]=\"visibleChatIcon\"\n                      [visibleMessageIcon]=\"visibleMessageIcon\" [visibleNoteIcon]=\"visibleNoteIcon\"\n                      [hideToggler]=\"hideToggler\" [hideTogglerButton]=\"hideTogglerButton\"\n                      [hideBrandName]=\"hideBrandName\" [hideLogo]=\"hideLogo\"\n                      [hideCompanyMenu]=\"hideCompanyMenu\" [hideProfileMenu]=\"hideProfileMenu\">\n    </app-admin-navbar>\n    <app-admin-message-side-nav [opened]=\"expandedMessageSlider\" (onClear)=\"onClearMessage($event)\"\n                          (onClose)=\"onCloseSlider($event)\"\n                          (onLoad)=\"onLoadMessage($event)\"></app-admin-message-side-nav>\n    <app-admin-app-side-nav [opened]=\"expandedAppSlider\" (onClose)=\"onCloseSlider($event)\"></app-admin-app-side-nav>\n    <app-admin-social-side-nav [opened]=\"expandedSocialSlider\" (onClose)=\"onCloseSlider($event)\"></app-admin-social-side-nav>\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <nav id=\"mainnav-container\" *ngIf=\"visibleMenu\">\n                <div id=\"mainnav\">\n                    <ng-template [ngTemplateOutlet]=\"menu\"></ng-template>\n                </div>\n            </nav>\n            <div id=\"content-container\" [ngClass]=\"{'pl-0': !visibleMenu , 'tb-visible': !!toolbar && visibleToolbar}\">\n                <ng-template [ngTemplateOutlet]=\"toolbar\"></ng-template>\n                <router-outlet></router-outlet>\n                <div id=\"loading-indicator\" title=\"{{'INDICATOR.PROCESSING' | translate}}\">\n                    <span>{{'INDICATOR.PROCESSING' | translate}}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"overlay\" [ngClass]=\"{'d-block': expandedSlider || visibleOverlay}\"></div>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    LayoutComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
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
    return LayoutComponent;
}());
export { LayoutComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGF5b3V0L2Jvb3RzdHJhcC9sYXlvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFlBQVksRUFDQSxZQUFZLEVBQ3hCLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUFFLFNBQVMsRUFDekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUkvRDtJQTZDSSx5QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF4Q2xCLGVBQVUsR0FBVyxjQUFjLENBQUM7UUFVM0MsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0Isc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUN2QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLHVCQUFrQixHQUFrQixFQUFFLENBQUM7UUFDdEMs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eUNBQXdDOztJQUN4QywwQ0FBMEM7Ozs7O0lBRTFDLGtDQUE4Qjs7SUFDOUIsMENBQXVFOzs7OztJQUMzRCxpQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvbkVuZCwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anMvU3Vic2NyaXB0aW9uXCI7XG5pbXBvcnQge0FkbWluTmF2YmFyQ29tcG9uZW50fSBmcm9tIFwiLi9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudFwiO1xuXG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWxheW91dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xheW91dC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgndGhlbWUnKSB0aGVtZUNsYXNzOiBzdHJpbmcgPSAndGhlbWUtc2lsdmVyJztcbiAgICBAQ29udGVudENoaWxkKCdtZW51JykgbWVudTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZCgnbmF2YmFySXRlbScpIG5hdmJhckl0ZW1UcGw6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGQoJ3Byb2ZpbGVJdGVtJykgcHJvZmlsZUl0ZW1UcGw6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGQoJ25hdmJhck1lbnUnKSBuYXZiYXJNZW51OiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkKCd0b29sYmFyJykgdG9vbGJhcjogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG5cbiAgICBASW5wdXQoJ2hvbWVSb3V0ZXJMaW5rJykgaG9tZVJvdXRlckxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcHBOYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBoaWRlVG9nZ2xlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhpZGVUb2dnbGVyQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB2aXNpYmxlTWVudTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZXhwYW5kZWRNZW51OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZXhwYW5kZWRTbGlkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBleHBhbmRlZE1lc3NhZ2VTbGlkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBleHBhbmRlZEFwcFNsaWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkU29jaWFsU2xpZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZXhwYW5kZWRDaGF0U2xpZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGlkZVNlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhpZGVDb21wYW55TWVudTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhpZGVQcm9maWxlTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhpZGVCcmFuZE5hbWUgOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBoaWRlTG9nbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHZpc2libGVPdmVybGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZnVsbFNjcmVlbkxheW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZnVsbExheW91dFdpdGhVcmxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQE91dHB1dCgpIHJvdXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvblRvZ2dsZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBAT3V0cHV0KCkgb25DbGlja0xvZ28gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBASW5wdXQoKSB2aXNpYmxlVG9vbGJhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgdmlzaWJsZUNoYXRJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB2aXNpYmxlTWVzc2FnZUljb246IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHZpc2libGVBcHBJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB2aXNpYmxlTm90ZUljb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3JvdXRlcjogU3Vic2NyaXB0aW9uO1xuICAgIEBWaWV3Q2hpbGQoQWRtaW5OYXZiYXJDb21wb25lbnQpIG5hdmJhckNvbXBvbmVudDogQWRtaW5OYXZiYXJDb21wb25lbnQ7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZE1lbnUgPSAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleHBhbmRlZE1lbnUnKT09PScxJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5mdWxsTGF5b3V0V2l0aFVybHMucHVzaCgnL3VzZXItcHJvZmlsZScpO1xuICAgICAgICB0aGlzLl9yb3V0ZXIgPSB0aGlzLnJvdXRlci5ldmVudHMuZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZXZlbnQudXJsO1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VVcmwodXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFuZ2VVcmwodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYoIXRoaXMuZnVsbFNjcmVlbkxheW91dCkge1xuICAgICAgICAgICAgbGV0IF9fdmlzaWJsZU1lbnUgPSAhIXRoaXMubWVudTtcbiAgICAgICAgICAgIGlmIChfX3Zpc2libGVNZW51KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZ1bGxMYXlvdXRXaXRoVXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHVybCAhPT0gJy8nICYmIHRoaXMuZnVsbExheW91dFdpdGhVcmxzW2ldICE9PSAnLycgJiYgdXJsLmluZGV4T2YodGhpcy5mdWxsTGF5b3V0V2l0aFVybHNbaV0pID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKHVybCA9PT0gdGhpcy5mdWxsTGF5b3V0V2l0aFVybHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3Zpc2libGVNZW51ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU1lbnUgPSAgX192aXNpYmxlTWVudTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU1lbnUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVUb2dnbGVyID0gIXRoaXMudmlzaWJsZU1lbnU7XG4gICAgICAgIHRoaXMucm91dGVDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHZpc2libGVNZW51OiB0aGlzLnZpc2libGVNZW51LFxuICAgICAgICAgICAgaGlkZVRvZ2dsZXI6IHRoaXMuaGlkZVRvZ2dsZXIsXG4gICAgICAgICAgICBleHBhbmRlZE1lbnU6IHRoaXMuZXhwYW5kZWRNZW51LFxuICAgICAgICAgICAgbGF5b3V0OiB0aGlzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy9Vc2luZyBqUXVlcnkgdG8gaGFuZGxlIG1lbnVcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgJG1lbnUgPSAkKCcjbWFpbm5hdi1tZW51Jyk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVDbHMgPSAnYWN0aXZlJztcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtZW50cyA9ICRtZW51LmZpbmQoJ2xpJyk7XG5cbiAgICAgICAgICAgICRlbGVtZW50cy5vbignaGlkZS5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKGFjdGl2ZUNscyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdzaG93LmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50QWN0aXZlID0gJG1lbnUuZmluZCgnbGkuYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJGN1cnJlbnRBY3RpdmUuZmluZCgnYVtkYXRhLXRvZ2dsZV0nKS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yb3V0ZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZU1lbnUoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRNZW51ID0gIXRoaXMuZXhwYW5kZWRNZW51O1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2V4cGFuZGVkTWVudScsIHRoaXMuZXhwYW5kZWRNZW51ID8gJzEnIDogJzAnICk7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzaXplJykpO1xuICAgICAgICB0aGlzLm9uVG9nZ2xlLmVtaXQodGhpcy5leHBhbmRlZE1lbnUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2xpZGVyKHY6IGJvb2xlYW4pe1xuICAgICAgICB0aGlzLmV4cGFuZGVkU2xpZGVyID0gdjtcbiAgICAgICAgdGhpcy52aXNpYmxlT3ZlcmxheSA9IHY7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVNZXNzYWdlU2xpZGVyKCRldmVudCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkQXBwU2xpZGVyPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZFNvY2lhbFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhdFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkTWVzc2FnZVNsaWRlciA9ICEgdGhpcy5leHBhbmRlZE1lc3NhZ2VTbGlkZXI7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHRoaXMuZXhwYW5kZWRNZXNzYWdlU2xpZGVyKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUFwcFNsaWRlcigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZENoYXRTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZFNvY2lhbFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkTWVzc2FnZVNsaWRlcj0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRBcHBTbGlkZXIgPSAhIHRoaXMuZXhwYW5kZWRBcHBTbGlkZXI7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHRoaXMuZXhwYW5kZWRBcHBTbGlkZXIpO1xuICAgIH1cblxuICAgIG9uVG9nZ2xlU29jaWFsU2xpZGVyKCRldmVudCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkQXBwU2xpZGVyPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZENoYXRTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZE1lc3NhZ2VTbGlkZXI9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkU29jaWFsU2xpZGVyID0gISB0aGlzLmV4cGFuZGVkU29jaWFsU2xpZGVyO1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih0aGlzLmV4cGFuZGVkU29jaWFsU2xpZGVyKTtcbiAgICB9XG4gICAgb25Ub2dnbGVOb3RlU2xpZGVyKCRldmVudCl7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRBcHBTbGlkZXI9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkU29jaWFsU2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGF0U2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRNZXNzYWdlU2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHRoaXMuZXhwYW5kZWRNZXNzYWdlU2xpZGVyKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydub3RlJywnbGlzdCddKVxuICAgIH1cblxuICAgIG9uQ2xvc2VTbGlkZXIoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRNZXNzYWdlU2xpZGVyPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZEFwcFNsaWRlcj0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGF0U2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRTb2NpYWxTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpc2libGVPdmVybGF5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PU1lc3NhZ2UgY291bnQ9PT09PT09PT09PT09PT09PVxuICAgIG9uQ2xlYXJNZXNzYWdlKCRldmVudCkge1xuICAgICAgICBpZih0aGlzLm5hdmJhckNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5uYXZiYXJDb21wb25lbnQuc2V0TWVzc2FnZUNvdW50KCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZE1lc3NhZ2UoJGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMubmF2YmFyQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm5hdmJhckNvbXBvbmVudC5jb3VudE1lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrTG9nbygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrTG9nby5lbWl0KHRoaXMuaG9tZVJvdXRlckxpbmspO1xuICAgIH1cblxufVxuIl19