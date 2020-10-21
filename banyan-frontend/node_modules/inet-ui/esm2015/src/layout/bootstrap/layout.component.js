/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { AdminNavbarComponent } from "./navbar/navbar.component";
export class LayoutComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGF5b3V0L2Jvb3RzdHJhcC9sYXlvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFlBQVksRUFDQSxZQUFZLEVBQ3hCLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUFFLFNBQVMsRUFDekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQVEvRCxNQUFNLE9BQU8sZUFBZTs7OztJQXlDeEIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF4Q2xCLGVBQVUsR0FBVyxjQUFjLENBQUM7UUFVM0MsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0Isc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUN2QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLHVCQUFrQixHQUFrQixFQUFFLENBQUM7UUFDdEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3ZDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMxQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUVoQyxvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isb0JBQWUsR0FBWSxLQUFLLENBQUM7SUFJTCxDQUFDOzs7O0lBRXRDLFFBQVE7UUFDSixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsRUFBQzthQUM1RSxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFvQixFQUFFLEVBQUU7O2tCQUMxQixHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUc7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztJQUNYLENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBQyxHQUFXO1FBQzNCLElBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O2dCQUNuQixhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQy9CLElBQUksYUFBYSxFQUFFO2dCQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyRCxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDOzJCQUNqRyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDekMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDdEIsTUFBTTtxQkFDVDtpQkFDSjthQUNKO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBSSxhQUFhLENBQUM7U0FDckM7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbEIsR0FBRyxFQUFFLEdBQUc7WUFDUixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ1gsNkJBQTZCO1FBQzdCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLOzs7UUFBQzs7a0JBQ1IsS0FBSyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7O2tCQUMxQixTQUFTLEdBQUcsUUFBUTs7a0JBQ3BCLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVsQyxTQUFTLENBQUMsRUFBRSxDQUFDLGtCQUFrQjs7O1lBQUU7Z0JBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxFQUFDLENBQUM7WUFFSCxTQUFTLENBQUMsRUFBRSxDQUFDLGtCQUFrQjs7O1lBQUU7O3NCQUN2QixjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzlDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxNQUFNO1FBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdkMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDNUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7SUFFTyxZQUFZLENBQUMsQ0FBVTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLE1BQU07UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFFLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFNO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUUsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsTUFBTTtRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUUsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFFLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBRSxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUNELGtCQUFrQixDQUFDLE1BQU07UUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFFLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDekMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsTUFBTTtRQUNoQixJQUFJLENBQUMscUJBQXFCLEdBQUUsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRSxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUdELGNBQWMsQ0FBQyxNQUFNO1FBQ2pCLElBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLE1BQU07UUFDaEIsSUFBRyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkM7SUFDTCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxNQUFNO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7OztZQWhMSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG9yRkFBc0M7YUFDekM7Ozs7WUFUc0IsTUFBTTs7O3lCQVd4QixLQUFLLFNBQUMsT0FBTzttQkFDYixZQUFZLFNBQUMsTUFBTTs0QkFDbkIsWUFBWSxTQUFDLFlBQVk7NkJBQ3pCLFlBQVksU0FBQyxhQUFhO3lCQUMxQixZQUFZLFNBQUMsWUFBWTtzQkFDekIsWUFBWSxTQUFDLFNBQVM7NkJBRXRCLEtBQUssU0FBQyxnQkFBZ0I7c0JBQ3RCLEtBQUs7MEJBRUwsS0FBSztnQ0FDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLO29DQUNMLEtBQUs7Z0NBQ0wsS0FBSzttQ0FDTCxLQUFLO2lDQUNMLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzZCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FFTCxLQUFLOzBCQUNMLE1BQU07dUJBQ04sTUFBTTswQkFDTixNQUFNOzZCQUNOLEtBQUs7OEJBRUwsS0FBSztpQ0FDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFHTCxTQUFTLFNBQUMsb0JBQW9COzs7O0lBdkMvQixxQ0FBb0Q7O0lBQ3BELCtCQUFvRDs7SUFDcEQsd0NBQW1FOztJQUNuRSx5Q0FBcUU7O0lBQ3JFLHFDQUFnRTs7SUFDaEUsa0NBQTBEOztJQUUxRCx5Q0FBZ0Q7O0lBQ2hELGtDQUF5Qjs7SUFFekIsc0NBQXNDOztJQUN0Qyw0Q0FBMkM7O0lBQzNDLHNDQUFxQzs7SUFDckMsdUNBQXVDOztJQUN2Qyx5Q0FBeUM7O0lBQ3pDLGdEQUFnRDs7SUFDaEQsNENBQTRDOztJQUM1QywrQ0FBK0M7O0lBQy9DLDZDQUE2Qzs7SUFDN0MscUNBQXFDOztJQUNyQywwQ0FBMEM7O0lBQzFDLDBDQUEwQzs7SUFDMUMsd0NBQXdDOztJQUN4QyxtQ0FBbUM7O0lBQ25DLHlDQUF5Qzs7SUFDekMsMkNBQTJDOztJQUUzQyw2Q0FBZ0Q7O0lBQ2hELHNDQUEyQzs7SUFDM0MsbUNBQWlEOztJQUNqRCxzQ0FBbUQ7O0lBQ25ELHlDQUF5Qzs7SUFFekMsMENBQXlDOztJQUN6Qyw2Q0FBNEM7O0lBQzVDLHlDQUF3Qzs7SUFDeEMsMENBQTBDOzs7OztJQUUxQyxrQ0FBOEI7O0lBQzlCLDBDQUF1RTs7Ozs7SUFDM0QsaUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IHtBZG1pbk5hdmJhckNvbXBvbmVudH0gZnJvbSBcIi4vbmF2YmFyL25hdmJhci5jb21wb25lbnRcIjtcblxuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1sYXlvdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9sYXlvdXQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIExheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoJ3RoZW1lJykgdGhlbWVDbGFzczogc3RyaW5nID0gJ3RoZW1lLXNpbHZlcic7XG4gICAgQENvbnRlbnRDaGlsZCgnbWVudScpIG1lbnU6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGQoJ25hdmJhckl0ZW0nKSBuYXZiYXJJdGVtVHBsOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkKCdwcm9maWxlSXRlbScpIHByb2ZpbGVJdGVtVHBsOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkKCduYXZiYXJNZW51JykgbmF2YmFyTWVudTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZCgndG9vbGJhcicpIHRvb2xiYXI6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuXG4gICAgQElucHV0KCdob21lUm91dGVyTGluaycpIGhvbWVSb3V0ZXJMaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXBwTmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaGlkZVRvZ2dsZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlVG9nZ2xlckJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdmlzaWJsZU1lbnU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkU2xpZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZXhwYW5kZWRNZXNzYWdlU2xpZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZXhwYW5kZWRBcHBTbGlkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBleHBhbmRlZFNvY2lhbFNsaWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkQ2hhdFNsaWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhpZGVTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlQ29tcGFueU1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlUHJvZmlsZU1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRlQnJhbmROYW1lIDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgaGlkZUxvZ286IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB2aXNpYmxlT3ZlcmxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGZ1bGxTY3JlZW5MYXlvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGZ1bGxMYXlvdXRXaXRoVXJsczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIEBPdXRwdXQoKSByb3V0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25Ub2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgQE91dHB1dCgpIG9uQ2xpY2tMb2dvID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQElucHV0KCkgdmlzaWJsZVRvb2xiYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHZpc2libGVDaGF0SWNvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdmlzaWJsZU1lc3NhZ2VJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB2aXNpYmxlQXBwSWNvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdmlzaWJsZU5vdGVJY29uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9yb3V0ZXI6IFN1YnNjcmlwdGlvbjtcbiAgICBAVmlld0NoaWxkKEFkbWluTmF2YmFyQ29tcG9uZW50KSBuYXZiYXJDb21wb25lbnQ6IEFkbWluTmF2YmFyQ29tcG9uZW50O1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRNZW51ID0gKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhwYW5kZWRNZW51Jyk9PT0nMScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZnVsbExheW91dFdpdGhVcmxzLnB1c2goJy91c2VyLXByb2ZpbGUnKTtcbiAgICAgICAgdGhpcy5fcm91dGVyID0gdGhpcy5yb3V0ZXIuZXZlbnRzLmZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGV2ZW50LnVybDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlVXJsKHVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlVXJsKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmKCF0aGlzLmZ1bGxTY3JlZW5MYXlvdXQpIHtcbiAgICAgICAgICAgIGxldCBfX3Zpc2libGVNZW51ID0gISF0aGlzLm1lbnU7XG4gICAgICAgICAgICBpZiAoX192aXNpYmxlTWVudSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mdWxsTGF5b3V0V2l0aFVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh1cmwgIT09ICcvJyAmJiB0aGlzLmZ1bGxMYXlvdXRXaXRoVXJsc1tpXSAhPT0gJy8nICYmIHVybC5pbmRleE9mKHRoaXMuZnVsbExheW91dFdpdGhVcmxzW2ldKSA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICh1cmwgPT09IHRoaXMuZnVsbExheW91dFdpdGhVcmxzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX192aXNpYmxlTWVudSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZpc2libGVNZW51ID0gIF9fdmlzaWJsZU1lbnU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGVNZW51ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlVG9nZ2xlciA9ICF0aGlzLnZpc2libGVNZW51O1xuICAgICAgICB0aGlzLnJvdXRlQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB2aXNpYmxlTWVudTogdGhpcy52aXNpYmxlTWVudSxcbiAgICAgICAgICAgIGhpZGVUb2dnbGVyOiB0aGlzLmhpZGVUb2dnbGVyLFxuICAgICAgICAgICAgZXhwYW5kZWRNZW51OiB0aGlzLmV4cGFuZGVkTWVudSxcbiAgICAgICAgICAgIGxheW91dDogdGhpc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vVXNpbmcgalF1ZXJ5IHRvIGhhbmRsZSBtZW51XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0ICRtZW51ID0gJCgnI21haW5uYXYtbWVudScpO1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2xzID0gJ2FjdGl2ZSc7XG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudHMgPSAkbWVudS5maW5kKCdsaScpO1xuXG4gICAgICAgICAgICAkZWxlbWVudHMub24oJ2hpZGUuYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhhY3RpdmVDbHMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRlbGVtZW50cy5vbignc2hvdy5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCAkY3VycmVudEFjdGl2ZSA9ICRtZW51LmZpbmQoJ2xpLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICRjdXJyZW50QWN0aXZlLmZpbmQoJ2FbZGF0YS10b2dnbGVdJykudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoYWN0aXZlQ2xzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVNZW51KCRldmVudCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkTWVudSA9ICF0aGlzLmV4cGFuZGVkTWVudTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdleHBhbmRlZE1lbnUnLCB0aGlzLmV4cGFuZGVkTWVudSA/ICcxJyA6ICcwJyApO1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgICAgdGhpcy5vblRvZ2dsZS5lbWl0KHRoaXMuZXhwYW5kZWRNZW51KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNsaWRlcih2OiBib29sZWFuKXtcbiAgICAgICAgdGhpcy5leHBhbmRlZFNsaWRlciA9IHY7XG4gICAgICAgIHRoaXMudmlzaWJsZU92ZXJsYXkgPSB2O1xuICAgIH1cblxuICAgIG9uVG9nZ2xlTWVzc2FnZVNsaWRlcigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZEFwcFNsaWRlcj0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRTb2NpYWxTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZENoYXRTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZE1lc3NhZ2VTbGlkZXIgPSAhIHRoaXMuZXhwYW5kZWRNZXNzYWdlU2xpZGVyO1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih0aGlzLmV4cGFuZGVkTWVzc2FnZVNsaWRlcik7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVBcHBTbGlkZXIoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGF0U2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRTb2NpYWxTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZE1lc3NhZ2VTbGlkZXI9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQXBwU2xpZGVyID0gISB0aGlzLmV4cGFuZGVkQXBwU2xpZGVyO1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih0aGlzLmV4cGFuZGVkQXBwU2xpZGVyKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZVNvY2lhbFNsaWRlcigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZEFwcFNsaWRlcj0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGF0U2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRNZXNzYWdlU2xpZGVyPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZFNvY2lhbFNsaWRlciA9ICEgdGhpcy5leHBhbmRlZFNvY2lhbFNsaWRlcjtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIodGhpcy5leHBhbmRlZFNvY2lhbFNsaWRlcik7XG4gICAgfVxuICAgIG9uVG9nZ2xlTm90ZVNsaWRlcigkZXZlbnQpe1xuICAgICAgICB0aGlzLmV4cGFuZGVkQXBwU2xpZGVyPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZFNvY2lhbFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhdFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkTWVzc2FnZVNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih0aGlzLmV4cGFuZGVkTWVzc2FnZVNsaWRlcik7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbm90ZScsJ2xpc3QnXSlcbiAgICB9XG5cbiAgICBvbkNsb3NlU2xpZGVyKCRldmVudCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkTWVzc2FnZVNsaWRlcj0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRBcHBTbGlkZXI9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhdFNsaWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkU29jaWFsU2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRTbGlkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aXNpYmxlT3ZlcmxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT1NZXNzYWdlIGNvdW50PT09PT09PT09PT09PT09PT1cbiAgICBvbkNsZWFyTWVzc2FnZSgkZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5uYXZiYXJDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubmF2YmFyQ29tcG9uZW50LnNldE1lc3NhZ2VDb3VudCgnJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWRNZXNzYWdlKCRldmVudCkge1xuICAgICAgICBpZih0aGlzLm5hdmJhckNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5uYXZiYXJDb21wb25lbnQuY291bnRNZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0xvZ28oJGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGlja0xvZ28uZW1pdCh0aGlzLmhvbWVSb3V0ZXJMaW5rKTtcbiAgICB9XG5cbn1cbiJdfQ==