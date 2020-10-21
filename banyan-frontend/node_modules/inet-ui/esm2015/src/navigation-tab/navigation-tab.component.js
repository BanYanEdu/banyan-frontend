/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
export class NavigationTab {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9uYXZpZ2F0aW9uLXRhYi9uYXZpZ2F0aW9uLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU90QyxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFheEIsWUFDVSx3QkFBa0QsRUFDbEQsTUFBYztRQURkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVpmLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFbkIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFVdkMsQ0FBQzs7OztJQUVMLFFBQVE7UUFFTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUM5QixJQUFJLENBQUMsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsRUFBQyxDQUFDO2FBQ3JELFNBQVM7Ozs7UUFBQyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxFQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFB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dG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmF2aWdhdGlvblRhYl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdGlvbi10YWIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uYXZpZ2F0aW9uLXRhYi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblRhYiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdGFiczogTmF2aWdhdGlvbkRhdGFbXTtcbiAgQElucHV0KCkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgQElucHV0KCkgcHJlZml4OiBzdHJpbmcgPSAnJztcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG9uTG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHRhYkFjdGl2ZTogTmF2aWdhdGlvbkRhdGE7XG4gIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgcHJpdmF0ZSBfcm91dGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5fcm91dGVyID0gdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYigpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9hY3RpdmVUYWIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9yb3V0ZXIpIHtcbiAgICAgIHRoaXMuX3JvdXRlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2ZVRhYih0YWI6IE5hdmlnYXRpb25EYXRhKSB7XG4gICAgaWYgKHRhYi5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuZ2V0RnVsbFBhdGgodGFiKV0pO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0YWIpO1xuICB9XG5cbiAgZ2V0VGFiQnlQYXRoKHBhdGg6IHN0cmluZykge1xuXG4gICAgLy8gZ2V0IHRhYiB3aXRoIHBhdGggbWF0Y2hpbmdcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2V0RnVsbFBhdGgodGhpcy50YWJzW2ldKSA9PT0gcGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YWJzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRhYnNbMF07XG4gIH1cblxuICBnZXRGdWxsUGF0aCh0YWI6IE5hdmlnYXRpb25EYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGFiLnBhdGg7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkQ29tcG9uZW50KHRhYjogTmF2aWdhdGlvbkRhdGEpIHtcbiAgICBpZiAodGhpcy50YWJBY3RpdmUgPT09IHRhYikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRhYkFjdGl2ZSA9IHRhYjtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBpZiAodGFiLmNvbXBvbmVudCkge1xuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0YWIuY29tcG9uZW50KTtcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgIHRoaXMub25Mb2FkLmVtaXQodGhpcy5jb21wb25lbnRSZWYpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYigpIHtcbiAgICBsZXQgdGFiID0gdGhpcy5nZXRUYWJCeVBhdGgodGhpcy5yb3V0ZXIudXJsKTtcbiAgICBpZiAodGFiKSB7XG4gICAgICB0aGlzLnRhYnMuZm9yRWFjaChfdGFiID0+IF90YWIuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCh0YWIpO1xuICAgICAgdGFiLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbkRhdGEge1xuICBuYW1lOiBzdHJpbmdcbiAgY29tcG9uZW50OiBhbnlcbiAgcGF0aDogc3RyaW5nXG4gIGFjdGl2ZT86IGJvb2xlYW5cbn1cbiJdfQ==