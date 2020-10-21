/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { FrontViewComponent } from "./component/viewer.component";
export class FrontViewService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnQtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9mcm9udC12aWV3L2Zyb250LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBR2hFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7OztJQUN6QixZQUNZLHdCQUFrRCxFQUNsRCxRQUFrQixFQUNsQixNQUFzQjtRQUZ0Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFDOUIsQ0FBQzs7Ozs7SUFFTCxVQUFVLENBQUMsR0FBVzs7WUFDZCxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDOztZQUN6RixrQkFBa0IsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUQsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7OztZQWpCSixVQUFVOzs7O1lBSGEsd0JBQXdCO1lBQWMsUUFBUTtZQUE5RCxjQUFjOzs7Ozs7O0lBTWQsb0RBQTBEOzs7OztJQUMxRCxvQ0FBMEI7Ozs7O0lBQzFCLGtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGcm9udFZpZXdDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudC92aWV3ZXIuY29tcG9uZW50XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcm9udFZpZXdTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICApIHsgfVxuXG4gICAgdmlld0lubGluZSh1cmw6IHN0cmluZykge1xuICAgICAgICBsZXQgdmlld2VyRmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEZyb250Vmlld0NvbXBvbmVudCk7XG4gICAgICAgIGxldCB2aWV3ZXJDb21wb25lbnRSZWYgPSB2aWV3ZXJGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgdmlld2VyQ29tcG9uZW50UmVmLmluc3RhbmNlLnNldFZpZXdVcmwodXJsKTtcbiAgICAgICAgdmlld2VyQ29tcG9uZW50UmVmLmluc3RhbmNlLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh2aWV3ZXJDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICAgICAgdmlld2VyQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodmlld2VyQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB9XG59XG4iXX0=