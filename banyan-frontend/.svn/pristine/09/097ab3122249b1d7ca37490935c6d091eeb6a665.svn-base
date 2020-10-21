/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input } from '@angular/core';
import { SocialService } from '../social.service';
import { ActivityPostComponent } from '../activity-post/activity-post.component';
export class ActivityListComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
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
        (params, callback) => this.doLoadWall(params, callback));
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
        activityId => {
            if (activityId) {
                this.socialService.activityLoad({
                    activity: activityId
                }, (/**
                 * @param {?} activity
                 * @return {?}
                 */
                (activity) => {
                    if (activity && activity.uuid) {
                        this._addActivity(activity, true);
                    }
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initScroller();
        this.loadWall(true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeEventScroller();
        this._activityChange.unsubscribe();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeActivityById(id) {
        for (let i = 0; i < this.activities.length; i++) {
            /** @type {?} */
            const activity = this.activities[i];
            if (activity.uuid === id) {
                this.activities.splice(i, 1);
                return;
            }
        }
    }
    /**
     * @param {?=} init
     * @return {?}
     */
    loadWall(init) {
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
        (data, err) => this._renderWall(data)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    doLoadWall(params, callback) {
        this.socialService.activityWall(params, callback);
    }
    /**
     * @return {?}
     */
    clearWall() {
        this.activities.length = 0;
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    _renderWall(data) {
        if (data) {
            /** @type {?} */
            const activities = data['items'] || [];
            activities.forEach((/**
             * @param {?} activity
             * @return {?}
             */
            activity => this._addActivity(activity)));
            this.hasMore = data['total'] > this.activities.length;
        }
        this.showLoading = false;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._loading = false;
            this._scrollBottomListener();
        }), 1000);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    activityCreate(params) {
        if (params.activity) {
            this.socialService.activityUpdate(params, this._activityPosted.bind(this));
        }
        else {
            this.socialService.activityPost(params, this._activityPosted.bind(this));
        }
    }
    /**
     * @param {?} activity
     * @return {?}
     */
    activityUpdated(activity) {
        // Replace by activity updated
        for (let i = 0; i < this.activities.length; i++) {
            if (this.activities[i].uuid === activity.uuid) {
                this.activities[i] = activity;
                return;
            }
        }
        this.activities.unshift(activity);
    }
    /**
     * @param {?} activity
     * @return {?}
     */
    activityDeleted(activity) {
        this.removeActivityById(activity.uuid);
    }
    /**
     * @return {?}
     */
    initScroller() {
        this._scrollBottomListener = this._scrollBottomListener.bind(this);
        if (this.scroller) {
            this.initEventScroller(this.scroller);
        }
    }
    /**
     * @return {?}
     */
    scrollToTop() {
        if (this.scroller) {
            this.scroller.scrollTop = 0;
        }
    }
    /**
     * @param {?} scroller
     * @return {?}
     */
    initEventScroller(scroller) {
        this.scroller = scroller;
        this.scroller.addEventListener('scroll', this._scrollBottomListener);
    }
    /**
     * @return {?}
     */
    removeEventScroller() {
        if (this.scroller) {
            this.scroller.removeEventListener('scroll', this._scrollBottomListener);
        }
    }
    /**
     * @private
     * @param {?=} e
     * @return {?}
     */
    _scrollBottomListener(e) {
        if (this._loading || !this.hasMore) {
            return;
        }
        /** @type {?} */
        const scroller = e && e.target || this.scroller;
        /** @type {?} */
        const target = scroller.scrollingElement || scroller;
        if (target) {
            // Scroll bottom to load more
            /** @type {?} */
            const bottom = target.scrollHeight - target.scrollTop - target.clientHeight;
            if (bottom < 150) {
                this.params.pageNumber++;
                this.loadWall();
            }
        }
    }
    /**
     * @private
     * @param {?} activity
     * @param {?} err
     * @return {?}
     */
    _activityPosted(activity, err) {
        if (activity && activity.uuid) {
            this.activityPost.resetForm();
            this.activityPost.hideForm(true);
            this._addActivity(activity, true);
        }
    }
    /**
     * @private
     * @param {?} activity
     * @param {?=} insertAtFirst
     * @return {?}
     */
    _addActivity(activity, insertAtFirst) {
        this.removeActivityById(activity.uuid);
        if (insertAtFirst) {
            this.activities.unshift(activity);
        }
        else {
            this.activities.push(activity);
        }
    }
}
ActivityListComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialActivityList]',
                template: "<div *ngIf=\"postEnable\" class=\"social-card\"\n     activityPost\n     #activityPost\n     [shareMemberEnable]=\"true\"\n     [linkPreviewEnable]=\"true\"\n     (onPost)=\"activityCreate($event)\">\n</div>\n\n<div class=\"social-welcome\" *ngIf=\"!showLoading && activities.length < 1\">\n    <i class=\"fa fa-bell-o\"></i>\n    <div>Ch\u01B0a c\u00F3 n\u1ED9i dung n\u00E0o</div>\n</div>\n\n<div class=\"social-loading\" *ngIf=\"showLoading\">\n    <i class=\"fa fa-spinner fa-spin\"></i>\n</div>\n\n<div *ngFor=\"let activity of activities\"\n     socialActivity\n     [activity]=\"activity\"\n     (onDeleted)=\"activityDeleted($event)\"\n     (onUpdated)=\"activityUpdated($event)\">\n</div>\n\n<div class=\"card\" *ngIf=\"hasMore\">\n    <div class=\"card-body text-center\">\n        \u0110ang t\u1EA3i d\u1EEF li\u1EC7u..\n    </div>\n</div>\n",
                styles: [".social-block{display:block;margin-top:10px}.social-card{position:relative;border-radius:2px;padding:15px;background:#fff;font-size:14px;margin-bottom:15px}.social-mark{position:absolute;top:-2px;left:-2px;padding:7px 9px;color:#fff}.social-mark:before{position:absolute;z-index:1}.social-mark:after{content:'';position:absolute;top:0;left:0;border-bottom:45px solid transparent;border-left:45px solid #faa807}.social-welcome{text-align:center;color:rgba(0,0,0,.54);margin-top:80px}.social-welcome i{font-size:60px;margin-bottom:20px;width:100px;height:100px;line-height:100px;border-radius:50%;background:rgba(0,0,0,.1)}.social-loading{text-align:center;margin-top:40px;color:rgba(0,0,0,.54)}.social-loading i{font-size:40px}.activity-column-active{margin:-7.5px}.activity-column-active .activity-column{float:left;width:50%;padding:0 7.5px}"]
            }] }
];
/** @nocollapse */
ActivityListComponent.ctorParameters = () => [
    { type: SocialService }
];
ActivityListComponent.propDecorators = {
    activityPost: [{ type: ViewChild, args: ['activityPost',] }],
    postEnable: [{ type: Input }],
    scroller: [{ type: Input }],
    type: [{ type: Input }],
    application: [{ type: Input }],
    loader: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9hY3Rpdml0eS1saXN0L2FjdGl2aXR5LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLFNBQVMsRUFBVSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBUS9FLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFtQjlCLFlBQ1csYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFsQjlCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsYUFBUSxHQUFzQixRQUFRLENBQUM7UUFDdkMsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixXQUFNOzs7OztRQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUM7UUFFcEYsZUFBVSxHQUFxQixFQUFFLENBQUM7UUFDbEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQW1CO1lBQ3JCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsVUFBVSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQVFFLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFVLENBQUMsRUFBRTtZQUM1RSxJQUFJLFVBQVUsRUFBRTtnQkFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztvQkFD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USxDQUFDLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLFlBQVksQ0FBQyxRQUF3QixFQUFFLGFBQXVCO1FBQ2xFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDOzs7WUEzTEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGcyQkFBNkM7O2FBRWhEOzs7O1lBVk8sYUFBYTs7OzJCQVloQixTQUFTLFNBQUMsY0FBYzt5QkFDeEIsS0FBSzt1QkFDTCxLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLOzs7O0lBTE4sNkNBQStEOztJQUMvRCwyQ0FBb0M7O0lBQ3BDLHlDQUFnRDs7SUFDaEQscUNBQTJCOztJQUMzQiw0Q0FBa0M7O0lBQ2xDLHVDQUFvRjs7SUFFcEYsMkNBQWtDOztJQUNsQyw0Q0FBNEI7O0lBQzVCLHdDQUF5Qjs7SUFDekIsdUNBR0U7Ozs7O0lBRUYsZ0RBQXNDOzs7OztJQUN0Qyx5Q0FBMEI7O0lBR3RCLDhDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgT25Jbml0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7QWN0aXZpdHlQYXJhbXN9IGZyb20gJy4uL21vZGVsL0FjdGl2aXR5UGFyYW1zJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gJy4uL21vZGVsL0FjdGl2aXR5JztcbmltcG9ydCB7QWN0aXZpdHlQb3N0Q29tcG9uZW50fSBmcm9tICcuLi9hY3Rpdml0eS1wb3N0L2FjdGl2aXR5LXBvc3QuY29tcG9uZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tzb2NpYWxBY3Rpdml0eUxpc3RdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWN0aXZpdHktbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHktbGlzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBWaWV3Q2hpbGQoJ2FjdGl2aXR5UG9zdCcpIGFjdGl2aXR5UG9zdDogQWN0aXZpdHlQb3N0Q29tcG9uZW50O1xuICAgIEBJbnB1dCgpIHBvc3RFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNjcm9sbGVyOiBIVE1MRWxlbWVudCB8IGFueSA9IGRvY3VtZW50O1xuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgpIGFwcGxpY2F0aW9uOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBsb2FkZXI6IEZ1bmN0aW9uID0gKHBhcmFtcywgY2FsbGJhY2spID0+IHRoaXMuZG9Mb2FkV2FsbChwYXJhbXMsIGNhbGxiYWNrKTtcblxuICAgIGFjdGl2aXRpZXM6IFNvY2lhbEFjdGl2aXR5W10gPSBbXTtcbiAgICBzaG93TG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgaGFzTW9yZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHBhcmFtczogQWN0aXZpdHlQYXJhbXMgPSB7XG4gICAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgICBwYWdlTnVtYmVyOiAwXG4gICAgfTtcblxuICAgIHByaXZhdGUgX2FjdGl2aXR5Q2hhbmdlOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfbG9hZGluZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZVxuICAgICkge1xuICAgICAgICAvLyBSZWNlaXZlIGFjdGl2aXR5IG5vdGlmeSByZWFsIHRpbWVcbiAgICAgICAgdGhpcy5fYWN0aXZpdHlDaGFuZ2UgPSB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlDaGFuZ2Uuc3Vic2NyaWJlKGFjdGl2aXR5SWQgPT4ge1xuICAgICAgICAgICAgaWYgKGFjdGl2aXR5SWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlMb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6IGFjdGl2aXR5SWRcbiAgICAgICAgICAgICAgICB9LCAoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpdml0eSAmJiBhY3Rpdml0eS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRBY3Rpdml0eShhY3Rpdml0eSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFNjcm9sbGVyKCk7XG4gICAgICAgIHRoaXMubG9hZFdhbGwodHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRTY3JvbGxlcigpO1xuICAgICAgICB0aGlzLl9hY3Rpdml0eUNoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZUFjdGl2aXR5QnlJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3Rpdml0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpdml0eSA9IHRoaXMuYWN0aXZpdGllc1tpXTtcbiAgICAgICAgICAgIGlmIChhY3Rpdml0eS51dWlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFdhbGwoaW5pdD86IGJvb2xlYW4pIHtcblxuICAgICAgICBpZiAoaW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcldhbGwoKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnBhZ2VOdW1iZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy50eXBlID0gdGhpcy50eXBlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBsaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmFwcGxpY2F0aW9uID0gdGhpcy5hcHBsaWNhdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIodGhpcy5wYXJhbXMsIChkYXRhLCBlcnIpID0+IHRoaXMuX3JlbmRlcldhbGwoZGF0YSkpO1xuICAgIH1cblxuICAgIGRvTG9hZFdhbGwocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlXYWxsKHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGNsZWFyV2FsbCgpIHtcbiAgICAgICAgdGhpcy5hY3Rpdml0aWVzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVuZGVyV2FsbChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpdml0aWVzID0gZGF0YVsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgICAgIGFjdGl2aXRpZXMuZm9yRWFjaChhY3Rpdml0eSA9PiB0aGlzLl9hZGRBY3Rpdml0eShhY3Rpdml0eSkpO1xuICAgICAgICAgICAgdGhpcy5oYXNNb3JlID0gZGF0YVsndG90YWwnXSA+IHRoaXMuYWN0aXZpdGllcy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxCb3R0b21MaXN0ZW5lcigpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eUNyZWF0ZShwYXJhbXM6IGFueSkge1xuICAgICAgICBpZiAocGFyYW1zLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlVcGRhdGUocGFyYW1zLCB0aGlzLl9hY3Rpdml0eVBvc3RlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5hY3Rpdml0eVBvc3QocGFyYW1zLCB0aGlzLl9hY3Rpdml0eVBvc3RlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjdGl2aXR5VXBkYXRlZChhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpIHtcblxuICAgICAgICAvLyBSZXBsYWNlIGJ5IGFjdGl2aXR5IHVwZGF0ZWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXRpZXNbaV0udXVpZCA9PT0gYWN0aXZpdHkudXVpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllc1tpXSA9IGFjdGl2aXR5O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2aXRpZXMudW5zaGlmdChhY3Rpdml0eSk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlEZWxldGVkKGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSkge1xuICAgICAgICB0aGlzLnJlbW92ZUFjdGl2aXR5QnlJZChhY3Rpdml0eS51dWlkKTtcbiAgICB9XG5cbiAgICBpbml0U2Nyb2xsZXIoKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbEJvdHRvbUxpc3RlbmVyID0gdGhpcy5fc2Nyb2xsQm90dG9tTGlzdGVuZXIuYmluZCh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50U2Nyb2xsZXIodGhpcy5zY3JvbGxlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxUb1RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRFdmVudFNjcm9sbGVyKHNjcm9sbGVyOiBIVE1MRWxlbWVudCB8IGFueSkge1xuICAgICAgICB0aGlzLnNjcm9sbGVyID0gc2Nyb2xsZXI7XG4gICAgICAgIHRoaXMuc2Nyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsQm90dG9tTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50U2Nyb2xsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbEJvdHRvbUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Njcm9sbEJvdHRvbUxpc3RlbmVyKGU/OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmcgfHwgIXRoaXMuaGFzTW9yZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjcm9sbGVyID0gZSAmJiBlLnRhcmdldCB8fCB0aGlzLnNjcm9sbGVyO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBzY3JvbGxlci5zY3JvbGxpbmdFbGVtZW50IHx8IHNjcm9sbGVyO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG5cbiAgICAgICAgICAgIC8vIFNjcm9sbCBib3R0b20gdG8gbG9hZCBtb3JlXG4gICAgICAgICAgICBjb25zdCBib3R0b20gPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbFRvcCAtIHRhcmdldC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmIChib3R0b20gPCAxNTApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5wYWdlTnVtYmVyKys7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkV2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWN0aXZpdHlQb3N0ZWQoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5LCBlcnI6IGFueSkge1xuICAgICAgICBpZiAoYWN0aXZpdHkgJiYgYWN0aXZpdHkudXVpZCkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eVBvc3QucmVzZXRGb3JtKCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5UG9zdC5oaWRlRm9ybSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEFjdGl2aXR5KGFjdGl2aXR5LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZEFjdGl2aXR5KGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSwgaW5zZXJ0QXRGaXJzdD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBY3Rpdml0eUJ5SWQoYWN0aXZpdHkudXVpZCk7XG4gICAgICAgIGlmIChpbnNlcnRBdEZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMudW5zaGlmdChhY3Rpdml0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMucHVzaChhY3Rpdml0eSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=