/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocialComment } from '../model/Comment';
import { SocialService } from '../social.service';
export class CommentComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
        this.editable = true;
        this.onUpdated = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.viewDate = this.socialService.viewDate;
    }
    /**
     * @return {?}
     */
    commentCancelEdit() {
        this.editing = false;
    }
    /**
     * @return {?}
     */
    commentEdit() {
        this.editing = true;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    commentUpdate(params) {
        this.socialService.commentUpdate(params, (/**
         * @param {?} comment
         * @return {?}
         */
        (comment) => {
            if (comment && comment.uuid) {
                this.commentCancelEdit();
                this.onUpdated.emit(comment);
            }
        }));
    }
    /**
     * @return {?}
     */
    commentDelete() {
        this.socialService.commentRemove({
            comment: this.comment.uuid,
            activity: this.comment.activityID
        }, (/**
         * @param {?} comment
         * @return {?}
         */
        (comment) => {
            if (comment && comment.uuid) {
                this.onDeleted.emit(comment);
            }
        }));
    }
    /**
     * @return {?}
     */
    commentLike() {
        /** @type {?} */
        const params = {
            activity: this.comment.activityID,
            comment: this.comment.uuid,
        };
        this.comment.likeStatus = !this.comment.likeStatus;
        if (this.comment.likeStatus) {
            this.comment.likeCount++;
            this.socialService.commentLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            data => { }));
        }
        else {
            this.comment.likeCount--;
            this.socialService.commentUnLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            data => { }));
        }
    }
}
CommentComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialComment]',
                template: "<div class=\"social-comment\">\n\n    <img userAvatar [usercode]=\"comment.creator\" class=\"social-comment__avatar\">\n\n    <div *ngIf=\"!editing; else commentPost;\">\n        <div actionMore dropdown\n             *ngIf=\"comment._editable\"\n             [data]=\"comment\"\n             (onEdit)=\"commentEdit()\"\n             (onDelete)=\"commentDelete()\" class=\"social-action-more\"></div>\n        <div class=\"social-comment__content\">\n            <b class=\"social-comment__name\">{{ comment.fullname }} </b>\n            <span [innerHTML]=\"comment._displayMessage\"></span>\n            <div *ngIf=\"comment.attachments.length\" attachmentList [attachments]=\"comment.attachments\" class=\"social-block\"></div>\n\n            <div class=\"social-comment__action\">\n            <span [title]=\"comment.posted | date:viewDate\">\n                {{comment.posted | dateShortcut}}\n            </span>\n                <button class=\"social-flat-btn\" (click)=\"commentLike()\" [ngClass]=\"{'active': comment.likeStatus}\">\n                    <i class=\"fa fa-thumbs-up\"></i>\n                    <span *ngIf=\"comment.likeCount\">{{comment.likeCount}}</span>\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #commentPost>\n        <div commentPost\n             [commentEdit]=\"comment\"\n             (onPost)=\"commentUpdate($event)\"\n             (onCancel)=\"commentCancelEdit()\" class=\"social-comment__content\"></div>\n    </ng-template>\n\n</div>\n",
                styles: [".social-block{display:block;margin-top:10px}.social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-comment{padding:7px 0;color:#212121;font-size:13px}.social-comment__avatar{width:30px;height:30px;border-radius:50%;margin-right:10px;float:left}.social-comment__content{overflow:hidden;line-height:16px}.social-comment__name{color:#2067b0}.social-comment__action{color:#6c757d;font-size:12px}.social-comment__more{cursor:pointer;color:#2067b0;margin-left:40px;padding-bottom:10px}"]
            }] }
];
/** @nocollapse */
CommentComponent.ctorParameters = () => [
    { type: SocialService }
];
CommentComponent.propDecorators = {
    comment: [{ type: Input }],
    editable: [{ type: Input }],
    onUpdated: [{ type: Output }],
    onDeleted: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CommentComponent.prototype.comment;
    /** @type {?} */
    CommentComponent.prototype.editable;
    /** @type {?} */
    CommentComponent.prototype.onUpdated;
    /** @type {?} */
    CommentComponent.prototype.onDeleted;
    /** @type {?} */
    CommentComponent.prototype.viewDate;
    /** @type {?} */
    CommentComponent.prototype.editing;
    /**
     * @type {?}
     * @private
     */
    CommentComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9jb21tZW50L2NvbW1lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFPaEQsTUFBTSxPQUFPLGdCQUFnQjs7OztJQVV6QixZQUNZLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBVC9CLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFeEIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQzlDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQVFwRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLE1BQU07UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTTs7OztRQUFFLENBQUMsT0FBc0IsRUFBRSxFQUFFO1lBQ2hFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7U0FDcEM7Ozs7UUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRTtZQUMxQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7O2NBQ0QsTUFBTSxHQUFHO1lBQ1gsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTTs7OztZQUFFLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTTs7OztZQUFFLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDOzs7WUE5REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLGtnREFBdUM7O2FBRTFDOzs7O1lBTk8sYUFBYTs7O3NCQVFoQixLQUFLO3VCQUNMLEtBQUs7d0JBRUwsTUFBTTt3QkFDTixNQUFNOzs7O0lBSlAsbUNBQWdDOztJQUNoQyxvQ0FBa0M7O0lBRWxDLHFDQUF3RDs7SUFDeEQscUNBQXdEOztJQUV4RCxvQ0FBaUI7O0lBQ2pCLG1DQUFpQjs7Ozs7SUFHYix5Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsQ29tbWVudH0gZnJvbSAnLi4vbW9kZWwvQ29tbWVudCc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uL3NvY2lhbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsQ29tbWVudF0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb21tZW50LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tZW50Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjb21tZW50OiBTb2NpYWxDb21tZW50O1xuICAgIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBvblVwZGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNvY2lhbENvbW1lbnQ+KCk7XG4gICAgQE91dHB1dCgpIG9uRGVsZXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U29jaWFsQ29tbWVudD4oKTtcblxuICAgIHZpZXdEYXRlOiBzdHJpbmc7XG4gICAgZWRpdGluZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuc29jaWFsU2VydmljZS52aWV3RGF0ZTtcbiAgICB9XG5cbiAgICBjb21tZW50Q2FuY2VsRWRpdCgpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY29tbWVudEVkaXQoKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgY29tbWVudFVwZGF0ZShwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmNvbW1lbnRVcGRhdGUocGFyYW1zLCAoY29tbWVudDogU29jaWFsQ29tbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbW1lbnQgJiYgY29tbWVudC51dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50Q2FuY2VsRWRpdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25VcGRhdGVkLmVtaXQoY29tbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbW1lbnREZWxldGUoKSB7XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5jb21tZW50UmVtb3ZlKHtcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRoaXMuY29tbWVudC51dWlkLFxuICAgICAgICAgICAgYWN0aXZpdHk6IHRoaXMuY29tbWVudC5hY3Rpdml0eUlEXG4gICAgICAgIH0sIChjb21tZW50OiBTb2NpYWxDb21tZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tbWVudCAmJiBjb21tZW50LnV1aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVsZXRlZC5lbWl0KGNvbW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21tZW50TGlrZSgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgYWN0aXZpdHk6IHRoaXMuY29tbWVudC5hY3Rpdml0eUlELFxuICAgICAgICAgICAgY29tbWVudDogdGhpcy5jb21tZW50LnV1aWQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29tbWVudC5saWtlU3RhdHVzID0gIXRoaXMuY29tbWVudC5saWtlU3RhdHVzO1xuICAgICAgICBpZiAodGhpcy5jb21tZW50Lmxpa2VTdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudC5saWtlQ291bnQrKztcbiAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5jb21tZW50TGlrZShwYXJhbXMsIGRhdGEgPT4ge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21tZW50Lmxpa2VDb3VudC0tO1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmNvbW1lbnRVbkxpa2UocGFyYW1zLCBkYXRhID0+IHt9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==