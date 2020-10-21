/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SocialService } from '../social.service';
export class ActivityViewComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.activityId.currentValue !== changes.activityId.previousValue) {
            this._load();
        }
    }
    /**
     * @param {?} activity
     * @return {?}
     */
    activityUpdated(activity) {
        this.activity = activity;
    }
    /**
     * @private
     * @return {?}
     */
    _load() {
        this.notFound = false;
        this.socialService.activityLoad({
            activity: this.activityId
        }, (/**
         * @param {?} activity
         * @return {?}
         */
        (activity) => {
            if (activity && activity.uuid) {
                this.activity = activity;
            }
            else {
                this.notFound = true;
            }
        }));
    }
}
ActivityViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'social-activity-view',
                template: "<div *ngIf=\"activity\" socialActivity [activity]=\"activity\" (onUpdated)=\"activityUpdated($event)\"></div>\n<h4 *ngIf=\"notFound\" class=\"text-center\" style=\"margin-top:70px\">Kh\u00F4ng t\u00ECm th\u1EA5y tin</h4>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ActivityViewComponent.ctorParameters = () => [
    { type: SocialService }
];
ActivityViewComponent.propDecorators = {
    activityId: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9hY3Rpdml0eS12aWV3L2FjdGl2aXR5LXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBUWhELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFLaEMsWUFDVSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDOzs7OztJQUVKLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ3hFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsUUFBd0I7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTyxLQUFLO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzFCOzs7O1FBQUUsQ0FBQyxRQUF3QixFQUFFLEVBQUU7WUFDOUIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQW5DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsME9BQTZDOzthQUU5Qzs7OztZQVBPLGFBQWE7Ozt5QkFTbEIsS0FBSzs7OztJQUFOLDJDQUE0Qjs7SUFFNUIseUNBQXlCOztJQUN6Qix5Q0FBa0I7Ozs7O0lBRWhCLDhDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSAnLi4vc29jaWFsLnNlcnZpY2UnO1xuaW1wb3J0IHtTb2NpYWxBY3Rpdml0eX0gZnJvbSAnLi4vbW9kZWwvQWN0aXZpdHknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzb2NpYWwtYWN0aXZpdHktdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hY3Rpdml0eS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHktdmlldy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYWN0aXZpdHlJZDogc3RyaW5nO1xuXG4gIGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eTtcbiAgbm90Rm91bmQ6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmFjdGl2aXR5SWQuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmFjdGl2aXR5SWQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGhpcy5fbG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2aXR5VXBkYXRlZChhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpIHtcbiAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkKCkge1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlMb2FkKHtcbiAgICAgIGFjdGl2aXR5OiB0aGlzLmFjdGl2aXR5SWRcbiAgICB9LCAoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSA9PiB7XG4gICAgICBpZiAoYWN0aXZpdHkgJiYgYWN0aXZpdHkudXVpZCkge1xuICAgICAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdEZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19