/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
import { BsModalService } from "ngx-bootstrap";
export class ActivityComponent {
    /**
     * @param {?} socialService
     * @param {?} modalService
     */
    constructor(socialService, modalService) {
        this.socialService = socialService;
        this.modalService = modalService;
        this.onUpdated = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.editing = false;
        this.viewDate = this.socialService.viewDate;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.policiesDisplay) {
            /** @type {?} */
            let title = [];
            /** @type {?} */
            let maxDisplay = 8;
            for (let i = 0; i < this.activity._policies.length; i++) {
                title.push(this.activity._policies[i].display);
                if (title.length >= maxDisplay) {
                    title.push('và ' + (this.activity._policies.length - maxDisplay) + ' người khác...');
                    break;
                }
            }
            $(this.policiesDisplay.nativeElement)['tooltip']({
                title: title.join('<br>'),
                html: true
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.declineDelete();
    }
    /**
     * @return {?}
     */
    activityEdit() {
        this.editing = true;
    }
    /**
     * @return {?}
     */
    activityCancelEdit() {
        this.editing = false;
    }
    /**
     * @return {?}
     */
    activityDelete() {
        this._modalRef = this.modalService.show(this.tmpConfirmDelete, { class: 'modal-sm' });
    }
    /**
     * @return {?}
     */
    confirmDelete() {
        this.socialService.activityRemove({ activity: this.activity.uuid }, (/**
         * @param {?} activity
         * @return {?}
         */
        (activity) => {
            if (activity && activity.uuid) {
                this.onDeleted.emit(activity);
            }
        }));
    }
    /**
     * @return {?}
     */
    declineDelete() {
        if (this._modalRef) {
            this._modalRef.hide();
            this._modalRef = null;
        }
    }
    /**
     * @return {?}
     */
    activityLike() {
        /** @type {?} */
        const params = {
            activity: this.activity.uuid
        };
        this.activity.likeStatus = !this.activity.likeStatus;
        if (this.activity.likeStatus) {
            this.activity.likeCount++;
            this.socialService.activityLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            data => {
            }));
        }
        else {
            this.activity.likeCount--;
            this.socialService.activityUnLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            data => {
            }));
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    activityUpdate(data) {
        this.socialService.activityUpdate(data, (/**
         * @param {?} activity
         * @return {?}
         */
        (activity) => {
            if (activity && activity.uuid) {
                this.onUpdated.emit(activity);
                this.editing = false;
            }
        }));
    }
}
ActivityComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialActivity]',
                template: "<div class=\"social-card\">\n    <i *ngIf=\"activity._localNewsPin\" class=\"social-mark fa fa-thumb-tack\" title=\"Tin \u0111\u01B0\u1EE3c ghim\"></i>\n    <div>\n        <img userAvatar [usercode]=\"activity.creator\" class=\"activity-info__avatar\">\n\n        <div actionMore dropdown\n             *ngIf=\"activity._editable\"\n             [data]=\"activity\"\n             (onEdit)=\"activityEdit()\"\n             (onDelete)=\"activityDelete()\" class=\"social-action-more\"></div>\n\n        <div style=\"overflow:hidden\">\n            <div class=\"activity-info__name\">\n                <b>{{ activity.fullname }}</b>\n                <span data-placement=\"bottom\" #policiesDisplay *ngIf=\"activity._policiesStr\">\n                    <i class=\"ml-1 fa fa-caret-right\"></i>\n                    {{ activity._policiesStr }}\n                </span>\n            </div>\n            <div class=\"activity-info__time\">\n                <span [title]=\"activity.posted | date:viewDate\">{{ activity.posted | dateShortcut }}</span>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"!editing; else activityPost\">\n        <div messageBody [feed]=\"activity\" style=\"margin-top:20px\"></div>\n        <div class=\"social-block\">\n            <button class=\"social-flat-btn\" (click)=\"activityLike()\" [ngClass]=\"{'active': activity.likeStatus}\">\n                <i class=\"fa fa-thumbs-up\"></i>\n                <span *ngIf=\"activity.likeCount\">{{activity.likeCount}}</span>\n            </button>\n            <button class=\"social-flat-btn\" (click)=\"commentList.focusForm()\">\n                <i class=\"fa fa-comment\"></i>\n                <span>{{activity.comments?.length || ''}}</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"social-block activity-comment\" socialCommentList #commentList [activity]=\"activity\"></div>\n</div>\n\n<ng-template #activityPost>\n    <div activityPost\n         [activity]=\"activity\"\n         [linkPreviewEnable]=\"true\"\n         [shareMemberEnable]=\"true\"\n         (onPost)=\"activityUpdate($event)\"\n         (onCancel)=\"activityCancelEdit()\" class=\"social-block\"></div>\n</ng-template>\n\n<ng-template #tmpConfirmDelete>\n    <div class=\"modal-body text-center\">\n        <p>B\u1EA3n tin s\u1EBD b\u1ECB xo\u00E1 v\u00E0 kh\u00F4ng th\u1EC3 ph\u1EE5c h\u1ED3i</p>\n        <button type=\"button\" class=\"btn btn-secondary m-1\" (click)=\"declineDelete()\" >Hu\u1EF7</button>\n        <button type=\"button\" class=\"btn btn-danger m-1\" (click)=\"confirmDelete()\" >Xo\u00E1</button>\n    </div>\n</ng-template>\n",
                styles: [".social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-block{display:block;margin-top:10px}.social-card{position:relative;border-radius:2px;padding:15px;background:#fff;font-size:14px;margin-bottom:15px}.activity-info__avatar{float:left;width:40px;height:40px;border-radius:50%;overflow:hidden;margin-right:10px}.activity-info__name{color:#2067b0}.activity-info__time{font-size:12px;color:#6c757d}.activity-comment{border-top:1px solid rgba(0,0,0,.05);padding-top:5px;margin-bottom:-10px}"]
            }] }
];
/** @nocollapse */
ActivityComponent.ctorParameters = () => [
    { type: SocialService },
    { type: BsModalService }
];
ActivityComponent.propDecorators = {
    activity: [{ type: Input }],
    onUpdated: [{ type: Output }],
    onDeleted: [{ type: Output }],
    policiesDisplay: [{ type: ViewChild, args: ['policiesDisplay',] }],
    tmpConfirmDelete: [{ type: ViewChild, args: ['tmpConfirmDelete',] }]
};
if (false) {
    /** @type {?} */
    ActivityComponent.prototype.activity;
    /** @type {?} */
    ActivityComponent.prototype.onUpdated;
    /** @type {?} */
    ActivityComponent.prototype.onDeleted;
    /** @type {?} */
    ActivityComponent.prototype.policiesDisplay;
    /** @type {?} */
    ActivityComponent.prototype.tmpConfirmDelete;
    /** @type {?} */
    ActivityComponent.prototype.viewDate;
    /** @type {?} */
    ActivityComponent.prototype.editing;
    /**
     * @type {?}
     * @private
     */
    ActivityComponent.prototype._modalRef;
    /**
     * @type {?}
     * @private
     */
    ActivityComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    ActivityComponent.prototype.modalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvYWN0aXZpdHkvYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ1ksU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxXQUFXLEVBQ3pGLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBYSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRekQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFjMUIsWUFDWSxhQUE0QixFQUM1QixZQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFiOUIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDcEMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFNOUMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVFyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFOztnQkFDbEIsS0FBSyxHQUFHLEVBQUU7O2dCQUNWLFVBQVUsR0FBRyxDQUFDO1lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENB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SixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZ21GQUF3Qzs7YUFFM0M7Ozs7WUFUTyxhQUFhO1lBRUQsY0FBYzs7O3VCQVM3QixLQUFLO3dCQUVMLE1BQU07d0JBQ04sTUFBTTs4QkFFTixTQUFTLFNBQUMsaUJBQWlCOytCQUMzQixTQUFTLFNBQUMsa0JBQWtCOzs7O0lBTjdCLHFDQUFrQzs7SUFFbEMsc0NBQThDOztJQUM5QyxzQ0FBOEM7O0lBRTlDLDRDQUEwRDs7SUFDMUQsNkNBQWtFOztJQUVsRSxxQ0FBaUI7O0lBQ2pCLG9DQUF5Qjs7Ozs7SUFFekIsc0NBQThCOzs7OztJQUcxQiwwQ0FBb0M7Ozs7O0lBQ3BDLHlDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi9zb2NpYWwuc2VydmljZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tICcuLi9tb2RlbC9BY3Rpdml0eSc7XG5pbXBvcnQge0JzTW9kYWxSZWYsIEJzTW9kYWxTZXJ2aWNlfSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tzb2NpYWxBY3Rpdml0eV0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY3Rpdml0eS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBhY3Rpdml0eTogU29jaWFsQWN0aXZpdHk7XG5cbiAgICBAT3V0cHV0KCkgb25VcGRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uRGVsZXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgncG9saWNpZXNEaXNwbGF5JykgcG9saWNpZXNEaXNwbGF5OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3RtcENvbmZpcm1EZWxldGUnKSB0bXBDb25maXJtRGVsZXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgdmlld0RhdGU6IHN0cmluZztcbiAgICBlZGl0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9tb2RhbFJlZjogQnNNb2RhbFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBCc01vZGFsU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5zb2NpYWxTZXJ2aWNlLnZpZXdEYXRlO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9saWNpZXNEaXNwbGF5KSB7XG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBbXTtcbiAgICAgICAgICAgIGxldCBtYXhEaXNwbGF5ID0gODtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3Rpdml0eS5fcG9saWNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aXRsZS5wdXNoKHRoaXMuYWN0aXZpdHkuX3BvbGljaWVzW2ldLmRpc3BsYXkpO1xuICAgICAgICAgICAgICAgIGlmICh0aXRsZS5sZW5ndGggPj0gbWF4RGlzcGxheSkge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZS5wdXNoKCd2w6AgJyArICh0aGlzLmFjdGl2aXR5Ll9wb2xpY2llcy5sZW5ndGggLSBtYXhEaXNwbGF5KSArICcgbmfGsOG7nWkga2jDoWMuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh0aGlzLnBvbGljaWVzRGlzcGxheS5uYXRpdmVFbGVtZW50KVsndG9vbHRpcCddKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUuam9pbignPGJyPicpLFxuICAgICAgICAgICAgICAgIGh0bWw6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVjbGluZURlbGV0ZSgpO1xuICAgIH1cblxuICAgIGFjdGl2aXR5RWRpdCgpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eUNhbmNlbEVkaXQoKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGFjdGl2aXR5RGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9tb2RhbFJlZiA9IHRoaXMubW9kYWxTZXJ2aWNlLnNob3codGhpcy50bXBDb25maXJtRGVsZXRlLCB7Y2xhc3M6ICdtb2RhbC1zbSd9KTtcbiAgICB9XG5cbiAgICBjb25maXJtRGVsZXRlKCkge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlSZW1vdmUoe2FjdGl2aXR5OiB0aGlzLmFjdGl2aXR5LnV1aWR9LCAoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSA9PiB7XG4gICAgICAgICAgICBpZiAoYWN0aXZpdHkgJiYgYWN0aXZpdHkudXVpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVkLmVtaXQoYWN0aXZpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWNsaW5lRGVsZXRlKCkge1xuICAgICAgICBpZiAodGhpcy5fbW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGFsUmVmLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuX21vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjdGl2aXR5TGlrZSgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgYWN0aXZpdHk6IHRoaXMuYWN0aXZpdHkudXVpZFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjdGl2aXR5Lmxpa2VTdGF0dXMgPSAhdGhpcy5hY3Rpdml0eS5saWtlU3RhdHVzO1xuICAgICAgICBpZiAodGhpcy5hY3Rpdml0eS5saWtlU3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5Lmxpa2VDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5TGlrZShwYXJhbXMsIGRhdGEgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5Lmxpa2VDb3VudC0tO1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5VW5MaWtlKHBhcmFtcywgZGF0YSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjdGl2aXR5VXBkYXRlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5VXBkYXRlKGRhdGEsIChhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpdml0eSAmJiBhY3Rpdml0eS51dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblVwZGF0ZWQuZW1pdChhY3Rpdml0eSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==