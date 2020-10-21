/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
var NavigationTab = /** @class */ (function () {
    function NavigationTab(componentFactoryResolver, router) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.router = router;
        this.prefix = '';
        this.onChange = new EventEmitter();
        this.onLoad = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NavigationTab.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._router = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this._activeTab();
        }));
        this._activeTab();
    };
    /**
     * @return {?}
     */
    NavigationTab.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._router) {
            this._router.unsubscribe();
        }
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    NavigationTab.prototype.activeTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (tab.active) {
            return;
        }
        this.router.navigate([this.getFullPath(tab)]);
        this.onChange.emit(tab);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    NavigationTab.prototype.getTabByPath = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        // get tab with path matching
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.getFullPath(this.tabs[i]) === path) {
                return this.tabs[i];
            }
        }
        return this.tabs[0];
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    NavigationTab.prototype.getFullPath = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        return this.prefix + tab.path;
    };
    /**
     * @private
     * @param {?} tab
     * @return {?}
     */
    NavigationTab.prototype._loadComponent = /**
     * @private
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (this.tabActive === tab) {
            return;
        }
        this.tabActive = tab;
        this.viewContainerRef.clear();
        if (tab.component) {
            /** @type {?} */
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.component);
            this.componentRef = this.viewContainerRef.createComponent(componentFactory);
            this.onLoad.emit(this.componentRef);
        }
    };
    /**
     * @private
     * @return {?}
     */
    NavigationTab.prototype._activeTab = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tab = this.getTabByPath(this.router.url);
        if (tab) {
            this.tabs.forEach((/**
             * @param {?} _tab
             * @return {?}
             */
            function (_tab) { return _tab.active = false; }));
            this._loadComponent(tab);
            tab.active = true;
        }
    };
    NavigationTab.decorators = [
        { type: Component, args: [{
                    selector: '[navigationTab]',
                    template: "<div class=\"navigation-tab\">\n  <ul class=\"nav navigation-tab__content\">\n    <li *ngFor=\"let tab of tabs\" class=\"nav-item\" [ngClass]=\"{'active': tab.active}\">\n      <span class=\"nav-link\" (click)=\"activeTab(tab)\">{{tab.name}}</span>\n    </li>\n  </ul>\n</div>\n",
                    styles: [".navigation-tab{padding-top:3px;overflow:auto}.nav-item,.navigation-tab__content{white-space:nowrap;display:inline-block}.nav-item{display:inline-block;color:rgba(0,0,0,.3);text-transform:uppercase;cursor:pointer;font-size:14px;font-weight:700}.nav-item:hover{color:rgba(0,0,0,.7)}.nav-item.active{color:#0062cc;border-bottom:2px solid #0062cc}"]
                }] }
    ];
    /** @nocollapse */
    NavigationTab.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Router }
    ]; };
    NavigationTab.propDecorators = {
        tabs: [{ type: Input }],
        viewContainerRef: [{ type: Input }],
        prefix: [{ type: Input }],
        onChange: [{ type: Output }],
        onLoad: [{ type: Output }]
    };
    return NavigationTab;
}());
export { NavigationTab };
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
export function NavigationData() { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9uYXZpZ2F0aW9uLXRhYi9uYXZpZ2F0aW9uLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QztJQWtCRSx1QkFDVSx3QkFBa0QsRUFDbEQsTUFBYztRQURkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVpmLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFbkIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFVdkMsQ0FBQzs7OztJQUVMLGdDQUFROzs7SUFBUjtRQUFBLGlCQVNDO1FBUEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDOUIsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxhQUFhLEVBQTlCLENBQThCLEVBQUMsQ0FBQzthQUNyRCxTQUFTOzs7O1FBQUMsVUFBQyxLQUFvQjtZQUM5QixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxFQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFB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QixvQ0FLQzs7O0lBSkMsOEJBQVk7O0lBQ1osbUNBQWM7O0lBQ2QsOEJBQVk7O0lBQ1osZ0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvbkVuZCwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuYXZpZ2F0aW9uVGFiXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLXRhYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25hdmlnYXRpb24tdGFiLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uVGFiIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0YWJzOiBOYXZpZ2F0aW9uRGF0YVtdO1xuICBASW5wdXQoKSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICBASW5wdXQoKSBwcmVmaXg6IHN0cmluZyA9ICcnO1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgdGFiQWN0aXZlOiBOYXZpZ2F0aW9uRGF0YTtcbiAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcblxuICBwcml2YXRlIF9yb3V0ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLl9yb3V0ZXIgPSB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFiKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2FjdGl2ZVRhYigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3JvdXRlcikge1xuICAgICAgdGhpcy5fcm91dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlVGFiKHRhYjogTmF2aWdhdGlvbkRhdGEpIHtcbiAgICBpZiAodGFiLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5nZXRGdWxsUGF0aCh0YWIpXSk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRhYik7XG4gIH1cblxuICBnZXRUYWJCeVBhdGgocGF0aDogc3RyaW5nKSB7XG5cbiAgICAvLyBnZXQgdGFiIHdpdGggcGF0aCBtYXRjaGluZ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nZXRGdWxsUGF0aCh0aGlzLnRhYnNbaV0pID09PSBwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhYnNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudGFic1swXTtcbiAgfVxuXG4gIGdldEZ1bGxQYXRoKHRhYjogTmF2aWdhdGlvbkRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0YWIucGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQodGFiOiBOYXZpZ2F0aW9uRGF0YSkge1xuICAgIGlmICh0aGlzLnRhYkFjdGl2ZSA9PT0gdGFiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudGFiQWN0aXZlID0gdGFiO1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGlmICh0YWIuY29tcG9uZW50KSB7XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRhYi5jb21wb25lbnQpO1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgdGhpcy5vbkxvYWQuZW1pdCh0aGlzLmNvbXBvbmVudFJlZik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiKCkge1xuICAgIGxldCB0YWIgPSB0aGlzLmdldFRhYkJ5UGF0aCh0aGlzLnJvdXRlci51cmwpO1xuICAgIGlmICh0YWIpIHtcbiAgICAgIHRoaXMudGFicy5mb3JFYWNoKF90YWIgPT4gX3RhYi5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICB0aGlzLl9sb2FkQ29tcG9uZW50KHRhYik7XG4gICAgICB0YWIuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uRGF0YSB7XG4gIG5hbWU6IHN0cmluZ1xuICBjb21wb25lbnQ6IGFueVxuICBwYXRoOiBzdHJpbmdcbiAgYWN0aXZlPzogYm9vbGVhblxufVxuIl19