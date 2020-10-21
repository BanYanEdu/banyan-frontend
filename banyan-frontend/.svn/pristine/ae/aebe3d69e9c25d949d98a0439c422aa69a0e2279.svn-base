/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
export class SocialActivityViewComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._routerObserver = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationEnd)))
            .subscribe((/**
         * @return {?}
         */
        () => this._updateActivityId()));
        this._updateActivityId();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._routerObserver.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _updateActivityId() {
        /** @type {?} */
        const params = this.route.snapshot.paramMap;
        if (params.get('id')) {
            this.activityId = params.get('id');
        }
    }
}
SocialActivityViewComponent.decorators = [
    { type: Component, args: [{
                template: "<div style=\"padding:15px;\">\n    <div class=\"social-home__right\">\n        <social-right-layout></social-right-layout>\n    </div>\n    <div class=\"social-home__left\">\n        <social-activity-view [activityId]=\"activityId\"></social-activity-view>\n    </div>\n</div>\n",
                styles: [".social-home{padding:15px}.social-home__right{display:none}.social-home__left{width:75%}"]
            }] }
];
/** @nocollapse */
SocialActivityViewComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
if (false) {
    /** @type {?} */
    SocialActivityViewComponent.prototype.activityId;
    /**
     * @type {?}
     * @private
     */
    SocialActivityViewComponent.prototype._routerObserver;
    /**
     * @type {?}
     * @private
     */
    SocialActivityViewComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    SocialActivityViewComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWFjdGl2aXR5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvcm91dGluZy9hY3Rpdml0eS12aWV3L3NvY2lhbC1hY3Rpdml0eS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBTXRDLE1BQU0sT0FBTywyQkFBMkI7Ozs7O0lBSXRDLFlBQ1ksS0FBcUIsRUFDckIsTUFBYztRQURkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdEIsQ0FBQzs7OztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNwQyxJQUFJLENBQUMsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsRUFBQyxDQUFDO2FBQ3JELFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRU8saUJBQWlCOztjQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUTtRQUMzQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7O1lBN0JGLFNBQVMsU0FBQztnQkFDVCxrU0FBb0Q7O2FBRXJEOzs7O1lBTk8sY0FBYztZQUFpQixNQUFNOzs7O0lBUTNDLGlEQUFtQjs7Ozs7SUFDbkIsc0RBQXdCOzs7OztJQUdwQiw0Q0FBNkI7Ozs7O0lBQzdCLDZDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7ZmlsdGVyfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnLi9zb2NpYWwtYWN0aXZpdHktdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi9ob21lL3NvY2lhbC1ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTb2NpYWxBY3Rpdml0eVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGFjdGl2aXR5SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfcm91dGVyT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9yb3V0ZXJPYnNlcnZlciA9IHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl91cGRhdGVBY3Rpdml0eUlkKCkpO1xuICAgIHRoaXMuX3VwZGF0ZUFjdGl2aXR5SWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3JvdXRlck9ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVBY3Rpdml0eUlkKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXA7XG4gICAgaWYgKHBhcmFtcy5nZXQoJ2lkJykpIHtcbiAgICAgIHRoaXMuYWN0aXZpdHlJZCA9IHBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgfVxuICB9XG59XG4iXX0=