/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { PhotoSwipeComponent } from './photoswipe.component';
import { Router } from '@angular/router';
var PhotoSwipe = /** @class */ (function () {
    function PhotoSwipe(componentFactoryResolver, injector, appRef, router) {
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
    PhotoSwipe.prototype.open = /**
     * @param {?} items
     * @param {?=} options
     * @param {?=} container
     * @return {?}
     */
    function (items, options, container) {
        var _this = this;
        if (!items || items.length < 1) {
            return;
        }
        /** @type {?} */
        var containerEl = container && container.nativeElement || document.body;
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
        function () {
            // Remove
            _this.appRef.detachView(_this.photoSwipeComponentRef.hostView);
            _this.photoSwipeComponentRef.destroy();
            _this.photoSwipeComponentRef = null;
            _this.routerSubscribe.unsubscribe();
            _this.routerSubscribe = null;
        }));
        this.subscribeRouterChange();
    };
    /**
     * @private
     * @return {?}
     */
    PhotoSwipe.prototype.subscribeRouterChange = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.routerSubscribe = this.router.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.closeOpening();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    PhotoSwipe.prototype.closeOpening = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.photoSwipeComponentRef) {
            this.photoSwipeComponentRef.instance.destroy();
        }
    };
    PhotoSwipe.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PhotoSwipe.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ApplicationRef },
        { type: Router }
    ]; };
    return PhotoSwipe;
}());
export { PhotoSwipe };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9zd2lwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9waG90b3N3aXBlL3Bob3Rvc3dpcGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBRSx3QkFBd0IsRUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV2QztJQU1FLG9CQUNVLHdCQUFrRCxFQUNsRCxRQUFrQixFQUNsQixNQUFzQixFQUN0QixNQUFjO1FBSGQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDcEIsQ0FBQzs7Ozs7OztJQUVMLHlCQUFJOzs7Ozs7SUFBSixVQUFLLEtBQWMsRUFBRSxPQUFhLEVBQUUsU0FBc0I7UUFBMUQsaUJBaUNDO1FBL0JDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUIsT0FBTztTQUNSOztZQUVLLFdBQVcsR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsSUFBSTtRQUV6RSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNyRztRQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRSwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELHFCQUFxQjtRQUNyQixXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7O1FBQUM7WUFDdkQsU0FBUztZQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU3RCxLQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsS0FBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztZQUVuQyxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFTywwQ0FBcUI7Ozs7SUFBN0I7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsQ0FBQztZQUNwRCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUNPLGlDQUFZOzs7O0lBQXBCO1FBQ0UsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoRDtJQUNILENBQUM7O2dCQXpERixVQUFVOzs7O2dCQUxhLHdCQUF3QjtnQkFBMEIsUUFBUTtnQkFBMUUsY0FBYztnQkFHZCxNQUFNOztJQTREZCxpQkFBQztDQUFBLEFBMURELElBMERDO1NBekRZLFVBQVU7Ozs7OztJQUNyQix1Q0FBK0I7Ozs7O0lBQy9CLDRDQUFvQzs7Ozs7SUFDcEMscUNBQTZCOzs7OztJQUczQiw4Q0FBMEQ7Ozs7O0lBQzFELDhCQUEwQjs7Ozs7SUFDMUIsNEJBQThCOzs7OztJQUM5Qiw0QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGhvdG9Td2lwZUNvbXBvbmVudH0gZnJvbSAnLi9waG90b3N3aXBlLmNvbXBvbmVudCc7XG5pbXBvcnQge1Bob3RvfSBmcm9tICcuL21vZGVsL3Bob3RvJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGhvdG9Td2lwZSB7XG4gIHByaXZhdGUgcGhvdG9Td2lwZUZhY3Rvcnk6IGFueTtcbiAgcHJpdmF0ZSBwaG90b1N3aXBlQ29tcG9uZW50UmVmOiBhbnk7XG4gIHByaXZhdGUgcm91dGVyU3Vic2NyaWJlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG9wZW4oaXRlbXM6IFBob3RvW10sIG9wdGlvbnM/OiBhbnksIGNvbnRhaW5lcj86IEVsZW1lbnRSZWYpIHtcblxuICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gY29udGFpbmVyICYmIGNvbnRhaW5lci5uYXRpdmVFbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgICBpZiAoIXRoaXMucGhvdG9Td2lwZUZhY3RvcnkpIHtcbiAgICAgIHRoaXMucGhvdG9Td2lwZUZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQaG90b1N3aXBlQ29tcG9uZW50KTtcbiAgICB9XG4gICAgdGhpcy5waG90b1N3aXBlQ29tcG9uZW50UmVmID0gdGhpcy5waG90b1N3aXBlRmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAvLyBBdHRhY2ggY29tcG9uZW50IHRvIHRoZSBhcHBSZWYgc28gdGhhdCBpdCdzIGluc2lkZSB0aGUgbmcgY29tcG9uZW50IHRyZWVcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAvLyBBcHBlbmQgRE9NIGVsZW1lbnRcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYuaG9zdFZpZXdbJ3Jvb3ROb2RlcyddWzBdKTtcblxuICAgIHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZi5pbnN0YW5jZS5vcGVuKGl0ZW1zLCBvcHRpb25zKTtcblxuICAgIHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZi5pbnN0YW5jZS5vbkRlc3Ryb3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIFJlbW92ZVxuICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgICB0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgdGhpcy5waG90b1N3aXBlQ29tcG9uZW50UmVmID0gbnVsbDtcblxuICAgICAgdGhpcy5yb3V0ZXJTdWJzY3JpYmUudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucm91dGVyU3Vic2NyaWJlID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHRoaXMuc3Vic2NyaWJlUm91dGVyQ2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVJvdXRlckNoYW5nZSgpIHtcbiAgICB0aGlzLnJvdXRlclN1YnNjcmliZSA9IHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VPcGVuaW5nKCk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZU9wZW5pbmcoKSB7XG4gICAgaWYgKHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZikge1xuICAgICAgdGhpcy5waG90b1N3aXBlQ29tcG9uZW50UmVmLmluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==