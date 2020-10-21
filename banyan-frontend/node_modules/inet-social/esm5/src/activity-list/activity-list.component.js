/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input } from '@angular/core';
import { SocialService } from '../social.service';
import { ActivityPostComponent } from '../activity-post/activity-post.component';
var ActivityListComponent = /** @class */ (function () {
    function ActivityListComponent(socialService) {
        var _this = this;
        this.socialService = socialService;
        this.postEnable = true;
        this.scroller = document;
        this.type = '';
        this.application = '';
        this.loader = (/**
         * @param {?} params
         * @param {?} callback
         * @return {?}
         */
        function (params, callback) { return _this.doLoadWall(params, callback); });
        this.activities = [];
        this.showLoading = true;
        this.hasMore = false;
        this.params = {
            pageSize: 5,
            pageNumber: 0
        };
        // Receive activity notify real time
        this._activityChange = this.socialService.activityChange.subscribe((/**
         * @param {?} activityId
         * @return {?}
         */
        function (activityId) {
            if (activityId) {
                _this.socialService.activityLoad({
                    activity: activityId
                }, (/**
                 * @param {?} activity
                 * @return {?}
                 */
                function (activity) {
                    if (activity && activity.uuid) {
                        _this._addActivity(activity, true);
                    }
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initScroller();
        this.loadWall(true);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeEventScroller();
        this._activityChange.unsubscribe();
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ActivityListComponent.prototype.removeActivityById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        for (var i = 0; i < this.activities.length; i++) {
            /** @type {?} */
            var activity = this.activities[i];
            if (activity.uuid === id) {
                this.activities.splice(i, 1);
                return;
            }
        }
    };
    /**
     * @param {?=} init
     * @return {?}
     */
    ActivityListComponent.prototype.loadWall = /**
     * @param {?=} init
     * @return {?}
     */
    function (init) {
        var _this = this;
        if (init) {
            this.clearWall();
            this.params.pageNumber = 0;
            this.showLoading = true;
            if (this.type) {
                this.params.type = this.type;
            }
            if (this.application) {
                this.params.application = this.application;
            }
        }
        this._loading = true;
        this.loader(this.params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) { return _this._renderWall(data); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    ActivityListComponent.prototype.doLoadWall = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.socialService.activityWall(params, callback);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.clearWall = /**
     * @return {?}
     */
    function () {
        this.activities.length = 0;
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    ActivityListComponent.prototype._renderWall = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data) {
            /** @type {?} */
            var activities = data['items'] || [];
            activities.forEach((/**
             * @param {?} activity
             * @return {?}
             */
            function (activity) { return _this._addActivity(activity); }));
            this.hasMore = data['total'] > this.activities.length;
        }
        this.showLoading = false;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this._loading = false;
            _this._scrollBottomListener();
        }), 1000);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ActivityListComponent.prototype.activityCreate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (params.activity) {
            this.socialService.activityUpdate(params, this._activityPosted.bind(this));
        }
        else {
            this.socialService.activityPost(params, this._activityPosted.bind(this));
        }
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityListComponent.prototype.activityUpdated = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        // Replace by activity updated
        for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i].uuid === activity.uuid) {
                this.activities[i] = activity;
                return;
            }
        }
        this.activities.unshift(activity);
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityListComponent.prototype.activityDeleted = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        this.removeActivityById(activity.uuid);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.initScroller = /**
     * @return {?}
     */
    function () {
        this._scrollBottomListener = this._scrollBottomListener.bind(this);
        if (this.scroller) {
            this.initEventScroller(this.scroller);
        }
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.scrollToTop = /**
     * @return {?}
     */
    function () {
        if (this.scroller) {
            this.scroller.scrollTop = 0;
        }
    };
    /**
     * @param {?} scroller
     * @return {?}
     */
    ActivityListComponent.prototype.initEventScroller = /**
     * @param {?} scroller
     * @return {?}
     */
    function (scroller) {
        this.scroller = scroller;
        this.scroller.addEventListener('scroll', this._scrollBottomListener);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.removeEventScroller = /**
     * @return {?}
     */
    function () {
        if (this.scroller) {
            this.scroller.removeEventListener('scroll', this._scrollBottomListener);
        }
    };
    /**
     * @private
     * @param {?=} e
     * @return {?}
     */
    ActivityListComponent.prototype._scrollBottomListener = /**
     * @private
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (this._loading || !this.hasMore) {
            return;
        }
        /** @type {?} */
        var scroller = e && e.target || this.scroller;
        /** @type {?} */
        var target = scroller.scrollingElement || scroller;
        if (target) {
            // Scroll bottom to load more
            /** @type {?} */
            var bottom = target.scrollHeight - target.scrollTop - target.clientHeight;
            if (bottom < 150) {
                this.params.pageNumber++;
                this.loadWall();
            }
        }
    };
    /**
     * @private
     * @param {?} activity
     * @param {?} err
     * @return {?}
     */
    ActivityListComponent.prototype._activityPosted = /**
     * @private
     * @param {?} activity
     * @param {?} err
     * @return {?}
     */
    function (activity, err) {
        if (activity && activity.uuid) {
            this.activityPost.resetForm();
            this.activityPost.hideForm(true);
            this._addActivity(activity, true);
        }
    };
    /**
     * @private
     * @param {?} activity
     * @param {?=} insertAtFirst
     * @return {?}
     */
    ActivityListComponent.prototype._addActivity = /**
     * @private
     * @param {?} activity
     * @param {?=} insertAtFirst
     * @return {?}
     */
    function (activity, insertAtFirst) {
        this.removeActivityById(activity.uuid);
        if (insertAtFirst) {
            this.activities.unshift(activity);
        }
        else {
            this.activities.push(activity);
        }
    };
    ActivityListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialActivityList]',
                    template: "<div *ngIf=\"postEnable\" class=\"social-card\"\n     activityPost\n     #activityPost\n     [shareMemberEnable]=\"true\"\n     [linkPreviewEnable]=\"true\"\n     (onPost)=\"activityCreate($event)\">\n</div>\n\n<div class=\"social-welcome\" *ngIf=\"!showLoading && activities.length < 1\">\n    <i class=\"fa fa-bell-o\"></i>\n    <div>Ch\u01B0a c\u00F3 n\u1ED9i dung n\u00E0o</div>\n</div>\n\n<div class=\"social-loading\" *ngIf=\"showLoading\">\n    <i class=\"fa fa-spinner fa-spin\"></i>\n</div>\n\n<div *ngFor=\"let activity of activities\"\n     socialActivity\n     [activity]=\"activity\"\n     (onDeleted)=\"activityDeleted($event)\"\n     (onUpdated)=\"activityUpdated($event)\">\n</div>\n\n<div class=\"card\" *ngIf=\"hasMore\">\n    <div class=\"card-body text-center\">\n        \u0110ang t\u1EA3i d\u1EEF li\u1EC7u..\n    </div>\n</div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.social-card{position:relative;border-radius:2px;padding:15px;background:#fff;font-size:14px;margin-bottom:15px}.social-mark{position:absolute;top:-2px;left:-2px;padding:7px 9px;color:#fff}.social-mark:before{position:absolute;z-index:1}.social-mark:after{content:'';position:absolute;top:0;left:0;border-bottom:45px solid transparent;border-left:45px solid #faa807}.social-welcome{text-align:center;color:rgba(0,0,0,.54);margin-top:80px}.social-welcome i{font-size:60px;margin-bottom:20px;width:100px;height:100px;line-height:100px;border-radius:50%;background:rgba(0,0,0,.1)}.social-loading{text-align:center;margin-top:40px;color:rgba(0,0,0,.54)}.social-loading i{font-size:40px}.activity-column-active{margin:-7.5px}.activity-column-active .activity-column{float:left;width:50%;padding:0 7.5px}"]
                }] }
    ];
    /** @nocollapse */
    ActivityListComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    ActivityListComponent.propDecorators = {
        activityPost: [{ type: ViewChild, args: ['activityPost',] }],
        postEnable: [{ type: Input }],
        scroller: [{ type: Input }],
        type: [{ type: Input }],
        application: [{ type: Input }],
        loader: [{ type: Input }]
    };
    return ActivityListComponent;
}());
export { ActivityListComponent };
if (false) {
    /** @type {?} */
    ActivityListComponent.prototype.activityPost;
    /** @type {?} */
    ActivityListComponent.prototype.postEnable;
    /** @type {?} */
    ActivityListComponent.prototype.scroller;
    /** @type {?} */
    ActivityListComponent.prototype.type;
    /** @type {?} */
    ActivityListComponent.prototype.application;
    /** @type {?} */
    ActivityListComponent.prototype.loader;
    /** @type {?} */
    ActivityListComponent.prototype.activities;
    /** @type {?} */
    ActivityListComponent.prototype.showLoading;
    /** @type {?} */
    ActivityListComponent.prototype.hasMore;
    /** @type {?} */
    ActivityListComponent.prototype.params;
    /**
     * @type {?}
     * @private
     */
    ActivityListComponent.prototype._activityChange;
    /**
     * @type {?}
     * @private
     */
    ActivityListComponent.prototype._loading;
    /** @type {?} */
    ActivityListComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9hY3Rpdml0eS1saXN0L2FjdGl2aXR5LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLFNBQVMsRUFBVSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRy9FO0lBd0JJLCtCQUNXLGFBQTRCO1FBRHZDLGlCQWVDO1FBZFUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFsQjlCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsYUFBUSxHQUFzQixRQUFRLENBQUM7UUFDdkMsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixXQUFNOzs7OztRQUFhLFVBQUMsTUFBTSxFQUFFLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFqQyxDQUFpQyxFQUFDO1FBRXBGLGVBQVUsR0FBcUIsRUFBRSxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsV0FBTSxHQUFtQjtZQUNyQixRQUFRLEVBQUUsQ0FBQztZQUNYLFVBQVUsRUFBRSxDQUFDO1NBQ2hCLENBQUM7UUFRRSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxVQUFVO1lBQ3pFLElBQUksVUFBVSxFQUFFO2dCQUNaLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO29CQUM1QixRQUFR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bEMsNENBQTRCOztJQUM1Qix3Q0FBeUI7O0lBQ3pCLHVDQUdFOzs7OztJQUVGLGdEQUFzQzs7Ozs7SUFDdEMseUNBQTBCOztJQUd0Qiw4Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi9zb2NpYWwuc2VydmljZSc7XG5pbXBvcnQge0FjdGl2aXR5UGFyYW1zfSBmcm9tICcuLi9tb2RlbC9BY3Rpdml0eVBhcmFtcyc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tICcuLi9tb2RlbC9BY3Rpdml0eSc7XG5pbXBvcnQge0FjdGl2aXR5UG9zdENvbXBvbmVudH0gZnJvbSAnLi4vYWN0aXZpdHktcG9zdC9hY3Rpdml0eS1wb3N0LmNvbXBvbmVudCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsQWN0aXZpdHlMaXN0XScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2aXR5LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FjdGl2aXR5LWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBAVmlld0NoaWxkKCdhY3Rpdml0eVBvc3QnKSBhY3Rpdml0eVBvc3Q6IEFjdGl2aXR5UG9zdENvbXBvbmVudDtcbiAgICBASW5wdXQoKSBwb3N0RW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzY3JvbGxlcjogSFRNTEVsZW1lbnQgfCBhbnkgPSBkb2N1bWVudDtcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBhcHBsaWNhdGlvbjogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCkgbG9hZGVyOiBGdW5jdGlvbiA9IChwYXJhbXMsIGNhbGxiYWNrKSA9PiB0aGlzLmRvTG9hZFdhbGwocGFyYW1zLCBjYWxsYmFjayk7XG5cbiAgICBhY3Rpdml0aWVzOiBTb2NpYWxBY3Rpdml0eVtdID0gW107XG4gICAgc2hvd0xvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGhhc01vcmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwYXJhbXM6IEFjdGl2aXR5UGFyYW1zID0ge1xuICAgICAgICBwYWdlU2l6ZTogNSxcbiAgICAgICAgcGFnZU51bWJlcjogMFxuICAgIH07XG5cbiAgICBwcml2YXRlIF9hY3Rpdml0eUNoYW5nZTogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX2xvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgLy8gUmVjZWl2ZSBhY3Rpdml0eSBub3RpZnkgcmVhbCB0aW1lXG4gICAgICAgIHRoaXMuX2FjdGl2aXR5Q2hhbmdlID0gdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5Q2hhbmdlLnN1YnNjcmliZShhY3Rpdml0eUlkID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpdml0eUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5TG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5OiBhY3Rpdml0eUlkXG4gICAgICAgICAgICAgICAgfSwgKGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZpdHkgJiYgYWN0aXZpdHkudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkQWN0aXZpdHkoYWN0aXZpdHksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRTY3JvbGxlcigpO1xuICAgICAgICB0aGlzLmxvYWRXYWxsKHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50U2Nyb2xsZXIoKTtcbiAgICAgICAgdGhpcy5fYWN0aXZpdHlDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVBY3Rpdml0eUJ5SWQoaWQ6IHN0cmluZykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZpdHkgPSB0aGlzLmFjdGl2aXRpZXNbaV07XG4gICAgICAgICAgICBpZiAoYWN0aXZpdHkudXVpZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRXYWxsKGluaXQ/OiBib29sZWFuKSB7XG5cbiAgICAgICAgaWYgKGluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJXYWxsKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5wYWdlTnVtYmVyID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMudHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwbGljYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5hcHBsaWNhdGlvbiA9IHRoaXMuYXBwbGljYXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubG9hZGVyKHRoaXMucGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB0aGlzLl9yZW5kZXJXYWxsKGRhdGEpKTtcbiAgICB9XG5cbiAgICBkb0xvYWRXYWxsKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5V2FsbChwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjbGVhcldhbGwoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZpdGllcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbmRlcldhbGwoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZpdGllcyA9IGRhdGFbJ2l0ZW1zJ10gfHwgW107XG4gICAgICAgICAgICBhY3Rpdml0aWVzLmZvckVhY2goYWN0aXZpdHkgPT4gdGhpcy5fYWRkQWN0aXZpdHkoYWN0aXZpdHkpKTtcbiAgICAgICAgICAgIHRoaXMuaGFzTW9yZSA9IGRhdGFbJ3RvdGFsJ10gPiB0aGlzLmFjdGl2aXRpZXMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93TG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsQm90dG9tTGlzdGVuZXIoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlDcmVhdGUocGFyYW1zOiBhbnkpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5hY3Rpdml0eSkge1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5VXBkYXRlKHBhcmFtcywgdGhpcy5fYWN0aXZpdHlQb3N0ZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlQb3N0KHBhcmFtcywgdGhpcy5fYWN0aXZpdHlQb3N0ZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpdml0eVVwZGF0ZWQoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSB7XG5cbiAgICAgICAgLy8gUmVwbGFjZSBieSBhY3Rpdml0eSB1cGRhdGVkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3Rpdml0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0aWVzW2ldLnV1aWQgPT09IGFjdGl2aXR5LnV1aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXNbaV0gPSBhY3Rpdml0eTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpdml0aWVzLnVuc2hpZnQoYWN0aXZpdHkpO1xuICAgIH1cblxuICAgIGFjdGl2aXR5RGVsZXRlZChhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBY3Rpdml0eUJ5SWQoYWN0aXZpdHkudXVpZCk7XG4gICAgfVxuXG4gICAgaW5pdFNjcm9sbGVyKCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxCb3R0b21MaXN0ZW5lciA9IHRoaXMuX3Njcm9sbEJvdHRvbUxpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRFdmVudFNjcm9sbGVyKHRoaXMuc2Nyb2xsZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsVG9Ub3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RXZlbnRTY3JvbGxlcihzY3JvbGxlcjogSFRNTEVsZW1lbnQgfCBhbnkpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxlciA9IHNjcm9sbGVyO1xuICAgICAgICB0aGlzLnNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbEJvdHRvbUxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZW1vdmVFdmVudFNjcm9sbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxCb3R0b21MaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zY3JvbGxCb3R0b21MaXN0ZW5lcihlPzogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLl9sb2FkaW5nIHx8ICF0aGlzLmhhc01vcmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY3JvbGxlciA9IGUgJiYgZS50YXJnZXQgfHwgdGhpcy5zY3JvbGxlcjtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsZXIuc2Nyb2xsaW5nRWxlbWVudCB8fCBzY3JvbGxlcjtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuXG4gICAgICAgICAgICAvLyBTY3JvbGwgYm90dG9tIHRvIGxvYWQgbW9yZVxuICAgICAgICAgICAgY29uc3QgYm90dG9tID0gdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5zY3JvbGxUb3AgLSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoYm90dG9tIDwgMTUwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMucGFnZU51bWJlcisrO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFdhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FjdGl2aXR5UG9zdGVkKGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSwgZXJyOiBhbnkpIHtcbiAgICAgICAgaWYgKGFjdGl2aXR5ICYmIGFjdGl2aXR5LnV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlQb3N0LnJlc2V0Rm9ybSgpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eVBvc3QuaGlkZUZvcm0odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRBY3Rpdml0eShhY3Rpdml0eSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRBY3Rpdml0eShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHksIGluc2VydEF0Rmlyc3Q/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZpdHlCeUlkKGFjdGl2aXR5LnV1aWQpO1xuICAgICAgICBpZiAoaW5zZXJ0QXRGaXJzdCkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0aWVzLnVuc2hpZnQoYWN0aXZpdHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0aWVzLnB1c2goYWN0aXZpdHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19