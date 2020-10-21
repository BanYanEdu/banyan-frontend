/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { FrontViewComponent } from "./component/viewer.component";
var FrontViewService = /** @class */ (function () {
    function FrontViewService(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    FrontViewService.prototype.viewInline = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        /** @type {?} */
        var viewerFactory = this.componentFactoryResolver.resolveComponentFactory(FrontViewComponent);
        /** @type {?} */
        var viewerComponentRef = viewerFactory.create(this.injector);
        viewerComponentRef.instance.setViewUrl(url);
        viewerComponentRef.instance.onDestroy.subscribe((/**
         * @return {?}
         */
        function () {
            _this.appRef.detachView(viewerComponentRef.hostView);
            viewerComponentRef.destroy();
        }));
        this.appRef.attachView(viewerComponentRef.hostView);
    };
    FrontViewService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FrontViewService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ApplicationRef }
    ]; };
    return FrontViewService;
}());
export { FrontViewService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnQtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9mcm9udC12aWV3L2Zyb250LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRWhFO0lBRUksMEJBQ1ksd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCO1FBRnRCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUM5QixDQUFDOzs7OztJQUVMLHFDQUFVOzs7O0lBQVYsVUFBVyxHQUFXO1FBQXRCLGlCQVNDOztZQVJPLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUM7O1lBQ3pGLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1RCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7O1FBQUM7WUFDNUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkFqQkosVUFBVTs7OztnQkFIYSx3QkFBd0I7Z0JBQWMsUUFBUTtnQkFBOUQsY0FBYzs7SUFxQnRCLHVCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FqQlksZ0JBQWdCOzs7Ozs7SUFFckIsb0RBQTBEOzs7OztJQUMxRCxvQ0FBMEI7Ozs7O0lBQzFCLGtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGcm9udFZpZXdDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudC92aWV3ZXIuY29tcG9uZW50XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcm9udFZpZXdTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICApIHsgfVxuXG4gICAgdmlld0lubGluZSh1cmw6IHN0cmluZykge1xuICAgICAgICBsZXQgdmlld2VyRmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEZyb250Vmlld0NvbXBvbmVudCk7XG4gICAgICAgIGxldCB2aWV3ZXJDb21wb25lbnRSZWYgPSB2aWV3ZXJGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgdmlld2VyQ29tcG9uZW50UmVmLmluc3RhbmNlLnNldFZpZXdVcmwodXJsKTtcbiAgICAgICAgdmlld2VyQ29tcG9uZW50UmVmLmluc3RhbmNlLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh2aWV3ZXJDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICAgICAgdmlld2VyQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodmlld2VyQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB9XG59XG4iXX0=