/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SocialService } from '../social.service';
var ActivityViewComponent = /** @class */ (function () {
    function ActivityViewComponent(socialService) {
        this.socialService = socialService;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ActivityViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.activityId.currentValue !== changes.activityId.previousValue) {
            this._load();
        }
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityViewComponent.prototype.activityUpdated = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        this.activity = activity;
    };
    /**
     * @private
     * @return {?}
     */
    ActivityViewComponent.prototype._load = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.notFound = false;
        this.socialService.activityLoad({
            activity: this.activityId
        }, (/**
         * @param {?} activity
         * @return {?}
         */
        function (activity) {
            if (activity && activity.uuid) {
                _this.activity = activity;
            }
            else {
                _this.notFound = true;
            }
        }));
    };
    ActivityViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-activity-view',
                    template: "<div *ngIf=\"activity\" socialActivity [activity]=\"activity\" (onUpdated)=\"activityUpdated($event)\"></div>\n<h4 *ngIf=\"notFound\" class=\"text-center\" style=\"margin-top:70px\">Kh\u00F4ng t\u00ECm th\u1EA5y tin</h4>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ActivityViewComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    ActivityViewComponent.propDecorators = {
        activityId: [{ type: Input }]
    };
    return ActivityViewComponent;
}());
export { ActivityViewComponent };
if (false) {
    /** @type {?} */
    ActivityViewComponent.prototype.activityId;
    /** @type {?} */
    ActivityViewComponent.prototype.activity;
    /** @type {?} */
    ActivityViewComponent.prototype.notFound;
    /**
     * @type {?}
     * @private
     */
    ActivityViewComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9hY3Rpdml0eS12aWV3L2FjdGl2aXR5LXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2hEO0lBVUUsK0JBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbkMsQ0FBQzs7Ozs7SUFFSiwyQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUN4RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7O0lBRUQsK0NBQWU7Ozs7SUFBZixVQUFnQixRQUF3QjtRQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVPLHFDQUFLOzs7O0lBQWI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUMxQjs7OztRQUFFLFVBQUMsUUFBd0I7WUFDMUIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDN0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQW5DRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsME9BQTZDOztpQkFFOUM7Ozs7Z0JBUE8sYUFBYTs7OzZCQVNsQixLQUFLOztJQThCUiw0QkFBQztDQUFBLEFBcENELElBb0NDO1NBL0JZLHFCQUFxQjs7O0lBQ2hDLDJDQUE0Qjs7SUFFNUIseUNBQXlCOztJQUN6Qix5Q0FBa0I7Ozs7O0lBRWhCLDhDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSAnLi4vc29jaWFsLnNlcnZpY2UnO1xuaW1wb3J0IHtTb2NpYWxBY3Rpdml0eX0gZnJvbSAnLi4vbW9kZWwvQWN0aXZpdHknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzb2NpYWwtYWN0aXZpdHktdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hY3Rpdml0eS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHktdmlldy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYWN0aXZpdHlJZDogc3RyaW5nO1xuXG4gIGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eTtcbiAgbm90Rm91bmQ6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmFjdGl2aXR5SWQuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmFjdGl2aXR5SWQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGhpcy5fbG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2aXR5VXBkYXRlZChhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpIHtcbiAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkKCkge1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlMb2FkKHtcbiAgICAgIGFjdGl2aXR5OiB0aGlzLmFjdGl2aXR5SWRcbiAgICB9LCAoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSA9PiB7XG4gICAgICBpZiAoYWN0aXZpdHkgJiYgYWN0aXZpdHkudXVpZCkge1xuICAgICAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdEZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19