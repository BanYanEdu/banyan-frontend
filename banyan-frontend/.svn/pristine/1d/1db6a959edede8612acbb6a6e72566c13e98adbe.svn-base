/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { PhotoSwipeComponent } from './photoswipe.component';
import { Router } from '@angular/router';
export class PhotoSwipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9zd2lwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9waG90b3N3aXBlL3Bob3Rvc3dpcGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBRSx3QkFBd0IsRUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd2QyxNQUFNLE9BQU8sVUFBVTs7Ozs7OztJQUtyQixZQUNVLHdCQUFrRCxFQUNsRCxRQUFrQixFQUNsQixNQUFzQixFQUN0QixNQUFjO1FBSGQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDcEIsQ0FBQzs7Ozs7OztJQUVMLElBQUksQ0FBQyxLQUFjLEVBQUUsT0FBYSxFQUFFLFNBQXNCO1FBRXhELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUIsT0FBTztTQUNSOztjQUVLLFdBQVcsR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsSUFBSTtRQUV6RSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNyRztRQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRSwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELHFCQUFxQjtRQUNyQixXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQzVELFNBQVM7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFN0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFFbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRU8scUJBQXFCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFDTyxZQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7WUF6REYsVUFBVTs7OztZQUxhLHdCQUF3QjtZQUEwQixRQUFRO1lBQTFFLGNBQWM7WUFHZCxNQUFNOzs7Ozs7O0lBSVosdUNBQStCOzs7OztJQUMvQiw0Q0FBb0M7Ozs7O0lBQ3BDLHFDQUE2Qjs7Ozs7SUFHM0IsOENBQTBEOzs7OztJQUMxRCw4QkFBMEI7Ozs7O0lBQzFCLDRCQUE4Qjs7Ozs7SUFDOUIsNEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Bob3RvU3dpcGVDb21wb25lbnR9IGZyb20gJy4vcGhvdG9zd2lwZS5jb21wb25lbnQnO1xuaW1wb3J0IHtQaG90b30gZnJvbSAnLi9tb2RlbC9waG90byc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBob3RvU3dpcGUge1xuICBwcml2YXRlIHBob3RvU3dpcGVGYWN0b3J5OiBhbnk7XG4gIHByaXZhdGUgcGhvdG9Td2lwZUNvbXBvbmVudFJlZjogYW55O1xuICBwcml2YXRlIHJvdXRlclN1YnNjcmliZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBvcGVuKGl0ZW1zOiBQaG90b1tdLCBvcHRpb25zPzogYW55LCBjb250YWluZXI/OiBFbGVtZW50UmVmKSB7XG5cbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXJFbCA9IGNvbnRhaW5lciAmJiBjb250YWluZXIubmF0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gICAgaWYgKCF0aGlzLnBob3RvU3dpcGVGYWN0b3J5KSB7XG4gICAgICB0aGlzLnBob3RvU3dpcGVGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGhvdG9Td2lwZUNvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZiA9IHRoaXMucGhvdG9Td2lwZUZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgLy8gQXR0YWNoIGNvbXBvbmVudCB0byB0aGUgYXBwUmVmIHNvIHRoYXQgaXQncyBpbnNpZGUgdGhlIG5nIGNvbXBvbmVudCB0cmVlXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgLy8gQXBwZW5kIERPTSBlbGVtZW50XG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5waG90b1N3aXBlQ29tcG9uZW50UmVmLmhvc3RWaWV3Wydyb290Tm9kZXMnXVswXSk7XG5cbiAgICB0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYuaW5zdGFuY2Uub3BlbihpdGVtcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYuaW5zdGFuY2Uub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBSZW1vdmVcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5waG90b1N3aXBlQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgICAgdGhpcy5waG90b1N3aXBlQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZiA9IG51bGw7XG5cbiAgICAgIHRoaXMucm91dGVyU3Vic2NyaWJlLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnJvdXRlclN1YnNjcmliZSA9IG51bGw7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmliZVJvdXRlckNoYW5nZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVSb3V0ZXJDaGFuZ2UoKSB7XG4gICAgdGhpcy5yb3V0ZXJTdWJzY3JpYmUgPSB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlT3BlbmluZygpO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgY2xvc2VPcGVuaW5nKCkge1xuICAgIGlmICh0aGlzLnBob3RvU3dpcGVDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMucGhvdG9Td2lwZUNvbXBvbmVudFJlZi5pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iXX0=