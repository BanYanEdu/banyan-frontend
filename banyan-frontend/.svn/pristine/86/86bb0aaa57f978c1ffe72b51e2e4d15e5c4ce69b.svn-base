/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SocialService } from "../social.service";
import { Router } from "@angular/router";
var SocialLatestComponent = /** @class */ (function () {
    function SocialLatestComponent(socialService, router) {
        this.socialService = socialService;
        this.router = router;
        this.viewMoreEnable = true;
        this.activities = [];
    }
    /**
     * @return {?}
     */
    SocialLatestComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._loadLatest();
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    SocialLatestComponent.prototype.viewActivity = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        // this.onViewItem.emit(activity);
        this.router.navigate(['social/activity/' + (activity['activityID'] || activity['uuid'])]);
    };
    /**
     * @return {?}
     */
    SocialLatestComponent.prototype.viewMore = /**
     * @return {?}
     */
    function () {
        // this.onViewMore.emit();
        this.router.navigate(['social']);
    };
    /**
     * @private
     * @return {?}
     */
    SocialLatestComponent.prototype._loadLatest = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.activityWall({
            pageSize: 3
        }, (/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            /** @type {?} */
            var items = result && result['items'] || [];
            if (items.length > 0) {
                _this._updateWithCommentLatest(items, (/**
                 * @return {?}
                 */
                function () {
                    items.sort((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) { return (b.lastUpdate || b.posted) - (a.lastUpdate || a.posted); }));
                    _this.activities = items;
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} activities
     * @param {?} callback
     * @return {?}
     */
    SocialLatestComponent.prototype._updateWithCommentLatest = /**
     * @private
     * @param {?} activities
     * @param {?} callback
     * @return {?}
     */
    function (activities, callback) {
        var _this = this;
        /** @type {?} */
        var promises = [];
        activities.forEach((/**
         * @param {?} activity
         * @param {?} index
         * @return {?}
         */
        function (activity, index) {
            promises.push(new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                _this.socialService.commentWall({ pageSize: 1, activity: activity.uuid }, (/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    /** @type {?} */
                    var items = result && result['items'] || [];
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
        function () { return callback(); }));
    };
    SocialLatestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-latest',
                    template: "<div *ngFor=\"let item of activities\" (click)=\"viewActivity(item)\" class=\"social-latest__item\">\n    <img userAvatar [usercode]=\"item.creator\" class=\"social-latest__avatar\">\n    <div class=\"social-latest__content\">\n        <div>\n            <div class=\"social-latest__time\">{{ (item.lastUpdate || item.posted) | dateShortcut }}</div>\n            <b>{{item.fullname}}</b>\n        </div>\n        <div [innerHTML]=\"item._displayMessage\" class=\"social-latest__message\"></div>\n    </div>\n</div>\n<div *ngIf=\"viewMoreEnable && activities.length\" (click)=\"viewMore()\"\n     class=\"social-latest__item text-center text-primary\">Xem th\u00EAm</div>\n",
                    styles: [".social-latest__item{padding:7px 10px;cursor:pointer;border-top:1px solid rgba(0,0,0,.05)}.social-latest__avatar{width:30px;height:30px;border-radius:50%;float:left}.social-latest__content{overflow:hidden;padding-left:10px}.social-latest__time{float:right;font-size:90%;opacity:.7}.social-latest__message{line-height:16px;max-height:32px;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    SocialLatestComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: Router }
    ]; };
    SocialLatestComponent.propDecorators = {
        viewMoreEnable: [{ type: Input }]
    };
    return SocialLatestComponent;
}());
export { SocialLatestComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWxhdGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy93aWRnZXQvc29jaWFsLWxhdGVzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkM7SUFVSSwrQkFBb0IsYUFBNEIsRUFBVSxNQUFjO1FBQXBELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUovRCxtQkFBYyxHQUFZLElBQUksQ0FBQztRQUV4QyxlQUFVLEdBQXFCLEVBQUUsQ0FBQztJQUV5QyxDQUFDOzs7O0lBRTVFLHdDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELDRDQUFZOzs7O0lBQVosVUFBYSxRQUF3QjtRQUNqQyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQzs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNJLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTywyQ0FBVzs7OztJQUFuQjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDNUIsUUFBUSxFQUFFLENBQUM7U0FDZDs7OztRQUFHLFVBQUMsTUFBTTs7Z0JBQ0QsS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUM3QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixLQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSzs7O2dCQUFFO29CQUNqQyxLQUFLLENBQUMsSUFBSTs7Ozs7b0JBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUF2RCxDQUF1RCxFQUFDLENBQUM7b0JBQzlFLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRU8sd0RBQXdCOzs7Ozs7SUFBaEMsVUFBaUMsVUFBNEIsRUFBRSxRQUFrQjtRQUFqRixpQkFlQzs7WUFkUyxRQUFRLEdBQUcsRUFBRTtRQUNuQixVQUFVLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLFFBQVEsRUFBRSxLQUFLO1lBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPOzs7O1lBQUMsVUFBQyxPQUFPO2dCQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUM7Ozs7Z0JBQUUsVUFBQyxNQUFNOzt3QkFDcEUsS0FBSyxHQUFvQixNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQzlELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ2xCLHFDQUFxQzt3QkFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxFQUFDLENBQUM7WUFDUCxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUk7OztRQUFDLGNBQU0sT0FBQSxRQUFRLEVBQUUsRUFBVixDQUFVLEVBQUMsQ0FBQztJQUNqRCxDQUFDOztnQkF2REosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6Qiw0cUJBQTZDOztpQkFFaEQ7Ozs7Z0JBUk8sYUFBYTtnQkFFYixNQUFNOzs7aUNBUVQsS0FBSzs7SUFrRFYsNEJBQUM7Q0FBQSxBQXhERCxJQXdEQztTQW5EWSxxQkFBcUI7OztJQUM5QiwrQ0FBd0M7O0lBRXhDLDJDQUFrQzs7Ozs7SUFFdEIsOENBQW9DOzs7OztJQUFFLHVDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gXCIuLi9tb2RlbC9BY3Rpdml0eVwiO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tIFwiLi4vc29jaWFsLnNlcnZpY2VcIjtcbmltcG9ydCB7U29jaWFsQ29tbWVudH0gZnJvbSBcIi4uL21vZGVsL0NvbW1lbnRcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc29jaWFsLWxhdGVzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NvY2lhbC1sYXRlc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NvY2lhbC1sYXRlc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNvY2lhbExhdGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgdmlld01vcmVFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgYWN0aXZpdGllczogU29jaWFsQWN0aXZpdHlbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRMYXRlc3QoKTtcbiAgICB9XG5cbiAgICB2aWV3QWN0aXZpdHkoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSB7XG4gICAgICAgIC8vIHRoaXMub25WaWV3SXRlbS5lbWl0KGFjdGl2aXR5KTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzb2NpYWwvYWN0aXZpdHkvJyArIChhY3Rpdml0eVsnYWN0aXZpdHlJRCddIHx8IGFjdGl2aXR5Wyd1dWlkJ10pXSk7XG4gICAgfVxuXG4gICAgdmlld01vcmUoKSB7XG4gICAgICAgIC8vIHRoaXMub25WaWV3TW9yZS5lbWl0KCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc29jaWFsJ10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRMYXRlc3QoKSB7XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5hY3Rpdml0eVdhbGwoe1xuICAgICAgICAgICAgcGFnZVNpemU6IDNcbiAgICAgICAgfSwgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gcmVzdWx0ICYmIHJlc3VsdFsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlV2l0aENvbW1lbnRMYXRlc3QoaXRlbXMsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuc29ydCgoYSwgYikgPT4gKGIubGFzdFVwZGF0ZSB8fCBiLnBvc3RlZCkgLSAoYS5sYXN0VXBkYXRlIHx8IGEucG9zdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllcyA9IGl0ZW1zO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVXaXRoQ29tbWVudExhdGVzdChhY3Rpdml0aWVzOiBTb2NpYWxBY3Rpdml0eVtdLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgYWN0aXZpdGllcy5mb3JFYWNoKChhY3Rpdml0eSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuY29tbWVudFdhbGwoe3BhZ2VTaXplOiAxLCBhY3Rpdml0eTogYWN0aXZpdHkudXVpZH0sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXM6IFNvY2lhbENvbW1lbnRbXSA9IHJlc3VsdCAmJiByZXN1bHRbJ2l0ZW1zJ10gfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIGFjdGl2aXR5IGJ5IGxhdGVzdCBjb21tZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0aWVzW2luZGV4XSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IGNhbGxiYWNrKCkpO1xuICAgIH1cbn1cbiJdfQ==