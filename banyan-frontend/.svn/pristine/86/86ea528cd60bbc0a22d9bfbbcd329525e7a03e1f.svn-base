/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SocialService } from "../social.service";
import { Router } from "@angular/router";
export class SocialLatestComponent {
    /**
     * @param {?} socialService
     * @param {?} router
     */
    constructor(socialService, router) {
        this.socialService = socialService;
        this.router = router;
        this.viewMoreEnable = true;
        this.activities = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._loadLatest();
    }
    /**
     * @param {?} activity
     * @return {?}
     */
    viewActivity(activity) {
        // this.onViewItem.emit(activity);
        this.router.navigate(['social/activity/' + (activity['activityID'] || activity['uuid'])]);
    }
    /**
     * @return {?}
     */
    viewMore() {
        // this.onViewMore.emit();
        this.router.navigate(['social']);
    }
    /**
     * @private
     * @return {?}
     */
    _loadLatest() {
        this.socialService.activityWall({
            pageSize: 3
        }, (/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            /** @type {?} */
            const items = result && result['items'] || [];
            if (items.length > 0) {
                this._updateWithCommentLatest(items, (/**
                 * @return {?}
                 */
                () => {
                    items.sort((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    (a, b) => (b.lastUpdate || b.posted) - (a.lastUpdate || a.posted)));
                    this.activities = items;
                }));
            }
        }));
    }
    /**
     * @private
     * @param {?} activities
     * @param {?} callback
     * @return {?}
     */
    _updateWithCommentLatest(activities, callback) {
        /** @type {?} */
        const promises = [];
        activities.forEach((/**
         * @param {?} activity
         * @param {?} index
         * @return {?}
         */
        (activity, index) => {
            promises.push(new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                this.socialService.commentWall({ pageSize: 1, activity: activity.uuid }, (/**
                 * @param {?} result
                 * @return {?}
                 */
                (result) => {
                    /** @type {?} */
                    const items = result && result['items'] || [];
                    if (items.length > 0) {
                        // Replace activity by latest comment
                        activities[index] = items[0];
                    }
                    resolve();
                }));
            })));
        }));
        Promise.all(promises).then((/**
         * @return {?}
         */
        () => callback()));
    }
}
SocialLatestComponent.decorators = [
    { type: Component, args: [{
                selector: 'social-latest',
                template: "<div *ngFor=\"let item of activities\" (click)=\"viewActivity(item)\" class=\"social-latest__item\">\n    <img userAvatar [usercode]=\"item.creator\" class=\"social-latest__avatar\">\n    <div class=\"social-latest__content\">\n        <div>\n            <div class=\"social-latest__time\">{{ (item.lastUpdate || item.posted) | dateShortcut }}</div>\n            <b>{{item.fullname}}</b>\n        </div>\n        <div [innerHTML]=\"item._displayMessage\" class=\"social-latest__message\"></div>\n    </div>\n</div>\n<div *ngIf=\"viewMoreEnable && activities.length\" (click)=\"viewMore()\"\n     class=\"social-latest__item text-center text-primary\">Xem th\u00EAm</div>\n",
                styles: [".social-latest__item{padding:7px 10px;cursor:pointer;border-top:1px solid rgba(0,0,0,.05)}.social-latest__avatar{width:30px;height:30px;border-radius:50%;float:left}.social-latest__content{overflow:hidden;padding-left:10px}.social-latest__time{float:right;font-size:90%;opacity:.7}.social-latest__message{line-height:16px;max-height:32px;overflow:hidden}"]
            }] }
];
/** @nocollapse */
SocialLatestComponent.ctorParameters = () => [
    { type: SocialService },
    { type: Router }
];
SocialLatestComponent.propDecorators = {
    viewMoreEnable: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SocialLatestComponent.prototype.viewMoreEnable;
    /** @type {?} */
    SocialLatestComponent.prototype.activities;
    /**
     * @type {?}
     * @private
     */
    SocialLatestComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    SocialLatestComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWxhdGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy93aWRnZXQvc29jaWFsLWxhdGVzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFPdkMsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFLOUIsWUFBb0IsYUFBNEIsRUFBVSxNQUFjO1FBQXBELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUovRCxtQkFBYyxHQUFZLElBQUksQ0FBQztRQUV4QyxlQUFVLEdBQXFCLEVBQUUsQ0FBQztJQUV5QyxDQUFDOzs7O0lBRTVFLFFBQVE7UUFDSixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsUUFBd0I7UUFDakMsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVPLFdBQVc7UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUM1QixRQUFRLEVBQUUsQ0FBQztTQUNkOzs7O1FBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7a0JBQ0wsS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUM3QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSzs7O2dCQUFFLEdBQUcsRUFBRTtvQkFDdEMsS0FBSyxDQUFDLElBQUk7Ozs7O29CQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7b0JBQzlFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRU8sd0JBQXdCLENBQUMsVUFBNEIsRUFBRSxRQUFrQjs7Y0FDdkUsUUFBUSxHQUFHLEVBQUU7UUFDbkIsVUFBVSxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU87Ozs7WUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUM7Ozs7Z0JBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7MEJBQ3hFLEtBQUssR0FBb0IsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUM5RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNsQixxQ0FBcUM7d0JBQ3JDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsRUFBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDO0lBQ2pELENBQUM7OztZQXZESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLDRxQkFBNkM7O2FBRWhEOzs7O1lBUk8sYUFBYTtZQUViLE1BQU07Ozs2QkFRVCxLQUFLOzs7O0lBQU4sK0NBQXdDOztJQUV4QywyQ0FBa0M7Ozs7O0lBRXRCLDhDQUFvQzs7Ozs7SUFBRSx1Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tIFwiLi4vbW9kZWwvQWN0aXZpdHlcIjtcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSBcIi4uL3NvY2lhbC5zZXJ2aWNlXCI7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gXCIuLi9tb2RlbC9Db21tZW50XCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NvY2lhbC1sYXRlc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zb2NpYWwtbGF0ZXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zb2NpYWwtbGF0ZXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTb2NpYWxMYXRlc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHZpZXdNb3JlRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGFjdGl2aXRpZXM6IFNvY2lhbEFjdGl2aXR5W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9sb2FkTGF0ZXN0KCk7XG4gICAgfVxuXG4gICAgdmlld0FjdGl2aXR5KGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSkge1xuICAgICAgICAvLyB0aGlzLm9uVmlld0l0ZW0uZW1pdChhY3Rpdml0eSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc29jaWFsL2FjdGl2aXR5LycgKyAoYWN0aXZpdHlbJ2FjdGl2aXR5SUQnXSB8fCBhY3Rpdml0eVsndXVpZCddKV0pO1xuICAgIH1cblxuICAgIHZpZXdNb3JlKCkge1xuICAgICAgICAvLyB0aGlzLm9uVmlld01vcmUuZW1pdCgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3NvY2lhbCddKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkTGF0ZXN0KCkge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlXYWxsKHtcbiAgICAgICAgICAgIHBhZ2VTaXplOiAzXG4gICAgICAgIH0sICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHJlc3VsdCAmJiByZXN1bHRbJ2l0ZW1zJ10gfHwgW107XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVdpdGhDb21tZW50TGF0ZXN0KGl0ZW1zLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnNvcnQoKGEsIGIpID0+IChiLmxhc3RVcGRhdGUgfHwgYi5wb3N0ZWQpIC0gKGEubGFzdFVwZGF0ZSB8fCBhLnBvc3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSBpdGVtcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlV2l0aENvbW1lbnRMYXRlc3QoYWN0aXZpdGllczogU29jaWFsQWN0aXZpdHlbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIGFjdGl2aXRpZXMuZm9yRWFjaCgoYWN0aXZpdHksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmNvbW1lbnRXYWxsKHtwYWdlU2l6ZTogMSwgYWN0aXZpdHk6IGFjdGl2aXR5LnV1aWR9LCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zOiBTb2NpYWxDb21tZW50W10gPSByZXN1bHQgJiYgcmVzdWx0WydpdGVtcyddIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVwbGFjZSBhY3Rpdml0eSBieSBsYXRlc3QgY29tbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdGllc1tpbmRleF0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG59XG4iXX0=