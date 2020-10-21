/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
import { BsModalService } from "ngx-bootstrap";
var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(socialService, modalService) {
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
    ActivityComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.policiesDisplay) {
            /** @type {?} */
            var title = [];
            /** @type {?} */
            var maxDisplay = 8;
            for (var i = 0; i < this.activity._policies.length; i++) {
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
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.declineDelete();
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityEdit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityCancelEdit = /**
     * @return {?}
     */
    function () {
        this.editing = false;
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityDelete = /**
     * @return {?}
     */
    function () {
        this._modalRef = this.modalService.show(this.tmpConfirmDelete, { class: 'modal-sm' });
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.confirmDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.activityRemove({ activity: this.activity.uuid }, (/**
         * @param {?} activity
         * @return {?}
         */
        function (activity) {
            if (activity && activity.uuid) {
                _this.onDeleted.emit(activity);
            }
        }));
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.declineDelete = /**
     * @return {?}
     */
    function () {
        if (this._modalRef) {
            this._modalRef.hide();
            this._modalRef = null;
        }
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityLike = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            activity: this.activity.uuid
        };
        this.activity.likeStatus = !this.activity.likeStatus;
        if (this.activity.likeStatus) {
            this.activity.likeCount++;
            this.socialService.activityLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
            }));
        }
        else {
            this.activity.likeCount--;
            this.socialService.activityUnLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
            }));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ActivityComponent.prototype.activityUpdate = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.socialService.activityUpdate(data, (/**
         * @param {?} activity
         * @return {?}
         */
        function (activity) {
            if (activity && activity.uuid) {
                _this.onUpdated.emit(activity);
                _this.editing = false;
            }
        }));
    };
    ActivityComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialActivity]',
                    template: "<div class=\"social-card\">\n    <i *ngIf=\"activity._localNewsPin\" class=\"social-mark fa fa-thumb-tack\" title=\"Tin \u0111\u01B0\u1EE3c ghim\"></i>\n    <div>\n        <img userAvatar [usercode]=\"activity.creator\" class=\"activity-info__avatar\">\n\n        <div actionMore dropdown\n             *ngIf=\"activity._editable\"\n             [data]=\"activity\"\n             (onEdit)=\"activityEdit()\"\n             (onDelete)=\"activityDelete()\" class=\"social-action-more\"></div>\n\n        <div style=\"overflow:hidden\">\n            <div class=\"activity-info__name\">\n                <b>{{ activity.fullname }}</b>\n                <span data-placement=\"bottom\" #policiesDisplay *ngIf=\"activity._policiesStr\">\n                    <i class=\"ml-1 fa fa-caret-right\"></i>\n                    {{ activity._policiesStr }}\n                </span>\n            </div>\n            <div class=\"activity-info__time\">\n                <span [title]=\"activity.posted | date:viewDate\">{{ activity.posted | dateShortcut }}</span>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"!editing; else activityPost\">\n        <div messageBody [feed]=\"activity\" style=\"margin-top:20px\"></div>\n        <div class=\"social-block\">\n            <button class=\"social-flat-btn\" (click)=\"activityLike()\" [ngClass]=\"{'active': activity.likeStatus}\">\n                <i class=\"fa fa-thumbs-up\"></i>\n                <span *ngIf=\"activity.likeCount\">{{activity.likeCount}}</span>\n            </button>\n            <button class=\"social-flat-btn\" (click)=\"commentList.focusForm()\">\n                <i class=\"fa fa-comment\"></i>\n                <span>{{activity.comments?.length || ''}}</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"social-block activity-comment\" socialCommentList #commentList [activity]=\"activity\"></div>\n</div>\n\n<ng-template #activityPost>\n    <div activityPost\n         [activity]=\"activity\"\n         [linkPreviewEnable]=\"true\"\n         [shareMemberEnable]=\"true\"\n         (onPost)=\"activityUpdate($event)\"\n         (onCancel)=\"activityCancelEdit()\" class=\"social-block\"></div>\n</ng-template>\n\n<ng-template #tmpConfirmDelete>\n    <div class=\"modal-body text-center\">\n        <p>B\u1EA3n tin s\u1EBD b\u1ECB xo\u00E1 v\u00E0 kh\u00F4ng th\u1EC3 ph\u1EE5c h\u1ED3i</p>\n        <button type=\"button\" class=\"btn btn-secondary m-1\" (click)=\"declineDelete()\" >Hu\u1EF7</button>\n        <button type=\"button\" class=\"btn btn-danger m-1\" (click)=\"confirmDelete()\" >Xo\u00E1</button>\n    </div>\n</ng-template>\n",
                    styles: [".social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-block{display:block;margin-top:10px}.social-card{position:relative;border-radius:2px;padding:15px;background:#fff;font-size:14px;margin-bottom:15px}.activity-info__avatar{float:left;width:40px;height:40px;border-radius:50%;overflow:hidden;margin-right:10px}.activity-info__name{color:#2067b0}.activity-info__time{font-size:12px;color:#6c757d}.activity-comment{border-top:1px solid rgba(0,0,0,.05);padding-top:5px;margin-bottom:-10px}"]
                }] }
    ];
    /** @nocollapse */
    ActivityComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: BsModalService }
    ]; };
    ActivityComponent.propDecorators = {
        activity: [{ type: Input }],
        onUpdated: [{ type: Output }],
        onDeleted: [{ type: Output }],
        policiesDisplay: [{ type: ViewChild, args: ['policiesDisplay',] }],
        tmpConfirmDelete: [{ type: ViewChild, args: ['tmpConfirmDelete',] }]
    };
    return ActivityComponent;
}());
export { ActivityComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvYWN0aXZpdHkvYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ1ksU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxXQUFXLEVBQ3pGLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBYSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHekQ7SUFtQkksMkJBQ1ksYUFBNEIsRUFDNUIsWUFBNEI7UUFENUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBYjlCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3BDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBTTlDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFRckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFOztnQkFDbEIsS0FBSyxHQUFHLEVBQUU7O2dCQUNWLFVBQVUsR0FBRyxDQUFDO1lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFD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QUFDO2FBQ3hCO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOztnQkFsR0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGdtRkFBd0M7O2lCQUUzQzs7OztnQkFUTyxhQUFhO2dCQUVELGNBQWM7OzsyQkFTN0IsS0FBSzs0QkFFTCxNQUFNOzRCQUNOLE1BQU07a0NBRU4sU0FBUyxTQUFDLGlCQUFpQjttQ0FDM0IsU0FBUyxTQUFDLGtCQUFrQjs7SUF1RmpDLHdCQUFDO0NBQUEsQUFuR0QsSUFtR0M7U0E5RlksaUJBQWlCOzs7SUFDMUIscUNBQWtDOztJQUVsQyxzQ0FBOEM7O0lBQzlDLHNDQUE4Qzs7SUFFOUMsNENBQTBEOztJQUMxRCw2Q0FBa0U7O0lBRWxFLHFDQUFpQjs7SUFDakIsb0NBQXlCOzs7OztJQUV6QixzQ0FBOEI7Ozs7O0lBRzFCLDBDQUFvQzs7Ozs7SUFDcEMseUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gJy4uL21vZGVsL0FjdGl2aXR5JztcbmltcG9ydCB7QnNNb2RhbFJlZiwgQnNNb2RhbFNlcnZpY2V9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3NvY2lhbEFjdGl2aXR5XScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2aXR5LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hY3Rpdml0eS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eTtcblxuICAgIEBPdXRwdXQoKSBvblVwZGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb25EZWxldGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdwb2xpY2llc0Rpc3BsYXknKSBwb2xpY2llc0Rpc3BsYXk6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndG1wQ29uZmlybURlbGV0ZScpIHRtcENvbmZpcm1EZWxldGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICB2aWV3RGF0ZTogc3RyaW5nO1xuICAgIGVkaXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX21vZGFsUmVmOiBCc01vZGFsUmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IEJzTW9kYWxTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudmlld0RhdGUgPSB0aGlzLnNvY2lhbFNlcnZpY2Uudmlld0RhdGU7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5wb2xpY2llc0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFtdO1xuICAgICAgICAgICAgbGV0IG1heERpc3BsYXkgPSA4O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2aXR5Ll9wb2xpY2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRpdGxlLnB1c2godGhpcy5hY3Rpdml0eS5fcG9saWNpZXNbaV0uZGlzcGxheSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLmxlbmd0aCA+PSBtYXhEaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnB1c2goJ3bDoCAnICsgKHRoaXMuYWN0aXZpdHkuX3BvbGljaWVzLmxlbmd0aCAtIG1heERpc3BsYXkpICsgJyBuZ8aw4budaSBraMOhYy4uLicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHRoaXMucG9saWNpZXNEaXNwbGF5Lm5hdGl2ZUVsZW1lbnQpWyd0b29sdGlwJ10oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZS5qb2luKCc8YnI+JyksXG4gICAgICAgICAgICAgICAgaHRtbDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZWNsaW5lRGVsZXRlKCk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlFZGl0KCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIGFjdGl2aXR5Q2FuY2VsRWRpdCgpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlEZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX21vZGFsUmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvdyh0aGlzLnRtcENvbmZpcm1EZWxldGUsIHtjbGFzczogJ21vZGFsLXNtJ30pO1xuICAgIH1cblxuICAgIGNvbmZpcm1EZWxldGUoKSB7XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5hY3Rpdml0eVJlbW92ZSh7YWN0aXZpdHk6IHRoaXMuYWN0aXZpdHkudXVpZH0sIChhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpdml0eSAmJiBhY3Rpdml0eS51dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZWQuZW1pdChhY3Rpdml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlY2xpbmVEZWxldGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZpdHlMaWtlKCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBhY3Rpdml0eTogdGhpcy5hY3Rpdml0eS51dWlkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aXZpdHkubGlrZVN0YXR1cyA9ICF0aGlzLmFjdGl2aXR5Lmxpa2VTdGF0dXM7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5Lmxpa2VTdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkubGlrZUNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlMaWtlKHBhcmFtcywgZGF0YSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkubGlrZUNvdW50LS07XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlVbkxpa2UocGFyYW1zLCBkYXRhID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZpdHlVcGRhdGUoZGF0YSkge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuYWN0aXZpdHlVcGRhdGUoZGF0YSwgKGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSkgPT4ge1xuICAgICAgICAgICAgaWYgKGFjdGl2aXR5ICYmIGFjdGl2aXR5LnV1aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVXBkYXRlZC5lbWl0KGFjdGl2aXR5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19