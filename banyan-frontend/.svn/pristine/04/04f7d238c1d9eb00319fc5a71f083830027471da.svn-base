/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
var SocialActivityViewComponent = /** @class */ (function () {
    function SocialActivityViewComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    /**
     * @return {?}
     */
    SocialActivityViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._routerObserver = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._updateActivityId(); }));
        this._updateActivityId();
    };
    /**
     * @return {?}
     */
    SocialActivityViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._routerObserver.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    SocialActivityViewComponent.prototype._updateActivityId = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = this.route.snapshot.paramMap;
        if (params.get('id')) {
            this.activityId = params.get('id');
        }
    };
    SocialActivityViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<div style=\"padding:15px;\">\n    <div class=\"social-home__right\">\n        <social-right-layout></social-right-layout>\n    </div>\n    <div class=\"social-home__left\">\n        <social-activity-view [activityId]=\"activityId\"></social-activity-view>\n    </div>\n</div>\n",
                    styles: [".social-home{padding:15px}.social-home__right{display:none}.social-home__left{width:75%}"]
                }] }
    ];
    /** @nocollapse */
    SocialActivityViewComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return SocialActivityViewComponent;
}());
export { SocialActivityViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWFjdGl2aXR5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvcm91dGluZy9hY3Rpdml0eS12aWV3L3NvY2lhbC1hY3Rpdml0eS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDO0lBUUUscUNBQ1ksS0FBcUIsRUFDckIsTUFBYztRQURkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdEIsQ0FBQzs7OztJQUVMLDhDQUFROzs7SUFBUjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDcEMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxhQUFhLEVBQTlCLENBQThCLEVBQUMsQ0FBQzthQUNyRCxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEVBQXhCLENBQXdCLEVBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsaURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVPLHVEQUFpQjs7OztJQUF6Qjs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUTtRQUMzQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7Z0JBN0JGLFNBQVMsU0FBQztvQkFDVCxrU0FBb0Q7O2lCQUVyRDs7OztnQkFOTyxjQUFjO2dCQUFpQixNQUFNOztJQWlDN0Msa0NBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTFCWSwyQkFBMkI7OztJQUN0QyxpREFBbUI7Ozs7O0lBQ25CLHNEQUF3Qjs7Ozs7SUFHcEIsNENBQTZCOzs7OztJQUM3Qiw2Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vc29jaWFsLWFjdGl2aXR5LXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi4vaG9tZS9zb2NpYWwtaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU29jaWFsQWN0aXZpdHlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBhY3Rpdml0eUlkOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JvdXRlck9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fcm91dGVyT2JzZXJ2ZXIgPSB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdXBkYXRlQWN0aXZpdHlJZCgpKTtcbiAgICB0aGlzLl91cGRhdGVBY3Rpdml0eUlkKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9yb3V0ZXJPYnNlcnZlci51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZpdHlJZCgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwO1xuICAgIGlmIChwYXJhbXMuZ2V0KCdpZCcpKSB7XG4gICAgICB0aGlzLmFjdGl2aXR5SWQgPSBwYXJhbXMuZ2V0KCdpZCcpO1xuICAgIH1cbiAgfVxufVxuIl19